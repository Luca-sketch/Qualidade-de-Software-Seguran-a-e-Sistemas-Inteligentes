from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Ativar CORS para todas as rotas

# Carregando o modelo treinado
modelo_filename = 'model/modelo_cart_ajustado.pkl'

if os.path.exists(modelo_filename):
    with open(modelo_filename, 'rb') as f:
        model = pickle.load(f)
    print("Modelo carregado com sucesso!")
else:
    print("Erro: O arquivo do modelo não foi encontrado!")

# Função para transformar os dados recebidos
def transform_data(data):
    # Mapeamento das variáveis categóricas
    mapping = {
        'Contract': {'Month-to-month': 0, 'One year': 1, 'Two year': 2},
        'OnlineSecurity': {'No': 0, 'Yes': 1},
        'TechSupport': {'No': 0, 'Yes': 1},
        'PaperlessBilling': {'No': 0, 'Yes': 1},
        'DeviceProtection': {'No': 0, 'Yes': 1},
        'OnlineBackup': {'No': 0, 'Yes': 1},
        'PaymentMethod': {'Electronic check': 0, 'Mailed check': 1, 'Bank transfer (automatic)': 2, 'Credit card (automatic)': 3}
    }

    # Aplicando o mapeamento
    transformed_data = {
        'tenure': float(data['tenure']),
        'MonthlyCharges': float(data['MonthlyCharges']),
        'TotalCharges': float(data['TotalCharges']),
        'Contract': mapping['Contract'].get(data['Contract'], -1),
        'OnlineSecurity': mapping['OnlineSecurity'].get(data['OnlineSecurity'], -1),
        'TechSupport': mapping['TechSupport'].get(data['TechSupport'], -1),
        'PaperlessBilling': mapping['PaperlessBilling'].get(data['PaperlessBilling'], -1),
        'DeviceProtection': mapping['DeviceProtection'].get(data['DeviceProtection'], -1),
        'OnlineBackup': mapping['OnlineBackup'].get(data['OnlineBackup'], -1),
        'PaymentMethod': mapping['PaymentMethod'].get(data['PaymentMethod'], -1)
    }

    return np.array([list(transformed_data.values())])

# Endpoint para predição
@app.route('/predict', methods=['POST'])
def predict():
    # Recebendo os dados do frontend
    data = request.json
    print(f"Dados recebidos: {data}")

    # Transformando os dados
    input_data = transform_data(data)
    
    # Fazendo a predição
    try:
        prediction = model.predict(input_data)
        print(f"Predição realizada: {prediction[0]}")
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    # Retornando o resultado da predição
    result = {
        'prediction': int(prediction[0])  # Convertendo para int, pois a resposta será um número
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)



