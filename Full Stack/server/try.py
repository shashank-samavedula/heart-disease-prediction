# import joblib
# import pandas as pd
# from sklearn.metrics import confusion_matrix

# data = pd.read_csv('heart_disease_health_indicators_BRFSS2015.csv')
# X = data.drop('HeartDiseaseorAttack', axis=1)

# # Load the pre-trained ML model
# model = joblib.load('model.pkl')

# row_to_predict = X.iloc[:]
# prediction = model.predict(row_to_predict)
# conf_matrix = confusion_matrix(data['HeartDiseaseorAttack'], prediction)
# print(conf_matrix)

from freeGPT import AsyncClient
from asyncio import run

async def main():
    while True:
        prompt = input("👦: ")
        try:
            resp = await AsyncClient.create_completion("gpt4", prompt)
            print(f"🤖: {resp}")
        except Exception as e:
            print(f"🤖: {e}")

run(main())