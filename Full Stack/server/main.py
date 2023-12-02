import pickle
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

data = pd.read_csv('heart_disease_health_indicators_BRFSS2015.csv')
X = data.drop('HeartDiseaseorAttack', axis=1)
y = data['HeartDiseaseorAttack']

log_reg = LogisticRegression()
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)
log_reg.fit(X_train.values, y_train.values)

y_pred = log_reg.predict(X_test.values)
accuracy = accuracy_score(y_test.values, y_pred)

# Save the trained model as a pickle file
with open('model.pkl', 'wb') as model_file:
    pickle.dump(log_reg, model_file)

print(f"Accuracy: {accuracy:.2f}")
print("Model saved as model.pkl")
