from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from web3 import Web3
import joblib
import uvicorn
import time
import matplotlib.pyplot as plt
import json

app = FastAPI()

transaction_count = []
latencies = []
throughputs = []
communication_latencies = []
total_transactions = 0
last_calculation_time = time.time()

# Load the pre-trained ML model
model = joblib.load('model.pkl')
origins = [
    "http://localhost",
    "http://localhost:3000"
]

# Connect to Ethereum node
web3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
contract_address = "0xCFD6Ab57B6F1cb4200CD3F6865500b64AB42a672"
with open('output/HeartDiseaseStorage.abi') as file:
    contract_abi = file.read()
contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionInput(BaseModel):
    # patient_address: str
    highBP: bool
    highChol: bool
    cholCheck: bool
    bmi: int
    smoker: bool
    stroke: bool
    diabetes: bool
    physActivity: bool
    fruits: bool
    veggies: bool
    hvyAlcoholConsump: bool
    anyHealthcare: bool
    noDocbcCost: bool
    genHlth: int
    mentHlth: int
    physHlth: int
    diffWalk: bool
    sex: bool
    age: int
    education: int
    income: int
    uploadedFile: str


@app.post('/predict')
def predict(payload: PredictionInput):
    try:
        # Measure the time when the request is received
        request_received_time = time.time()
        
        # LR model loaded
        input_data = dict(payload)
        prediction = model.predict([list(input_data.values())[:-1]])[0]

        if prediction == 0:
            input_data['prediction'] = False
        else:
            input_data['prediction'] = True

        # # Convert the prediction to a format suitable for blockchain storage
        # prediction_hash = web3.to_hex(int(prediction))

        # Get the latest block
        latest_block = web3.eth.get_block('latest')
        block_timestamp = latest_block['timestamp']

        # Measure the time before sending the transaction
        start_time = time.time()

        # Call the addHeartDiseaseRecord function on the smart contract
        tx_hash = contract.functions.addHeartDiseaseRecord(input_data).transact(
            {'from': web3.eth.accounts[0], 'gas': latest_block['gasLimit'], 'gasPrice': web3.eth.gas_price})

        # Wait for the transaction to be mined
        tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

        # Measure the time after the transaction is mined
        end_time = time.time()

        # Calculate the latency for this transaction
        latency = end_time - start_time
        
        # Increment the total transactions counter
        total_transactions += 1

        # Check if it's time to calculate throughput
        if total_transactions % 10 == 0 or (end_time - last_calculation_time) >= 10:
            # Calculate throughput (transactions per second)
            throughput = total_transactions / (end_time - last_calculation_time)
            throughputs.append(throughput)
            transaction_count.append(total_transactions)
            last_calculation_time = end_time
            
        # Measure the time before sending the response
        response_sent_time = time.time()

        # Calculate the communication latency
        communication_latency = response_sent_time - request_received_time

        # Append the communication latency to the list
        communication_latencies.append(communication_latency)

        # # Call the getNumRecords function on the smart contract
        # num_records = contract.functions.getNumRecords().call(
        #     {'from': web3.eth.accounts[0]})

        # Append transaction count and latency to their respective lists
        transaction_count.append(len(latencies) + 1)
        latencies.append(latency)

        return {
            "prediction": prediction,
            "block_timestamp": block_timestamp,
            "communication_latency": communication_latency  # Include communication latency in the response
            # "num_records": num_records
        }
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))


@app.post('/plot')
def plot():
    try:
        # Plot the No of transactions vs latency curve
        plt.plot(transaction_count, latencies,
                marker='o', linestyle='-', color='b')
        plt.xlabel('Number of Transactions')
        plt.ylabel('Latency (seconds)')
        plt.title('No of Transactions vs Latency Curve')
        plt.grid(True)
        plt.show()
        
        # Plot the No of transactions vs throughput curve
        plt.plot(transaction_count, throughputs, marker='o', linestyle='-', color='g')
        plt.xlabel('Number of Transactions')
        plt.ylabel('Throughput (Tx/s)')
        plt.title('No of Transactions vs Throughput Curve')
        plt.grid(True)
        plt.show()

    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    uvicorn.run('api:app', reload=True, port=8000)
