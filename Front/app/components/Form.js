'use client';
import { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    tenure: '',
    MonthlyCharges: '',
    TotalCharges: '',
    Contract: '',
    OnlineSecurity: '',
    TechSupport: '',
    PaperlessBilling: '',
    DeviceProtection: '',
    OnlineBackup: '',
    PaymentMethod: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const labels = {
    tenure: 'Tempo de serviço',
    MonthlyCharges: 'Custos mensais',
    TotalCharges: 'Custos totais',
    Contract: 'Contrato',
    OnlineSecurity: 'Segurança online',
    TechSupport: 'Suporte técnico',
    PaperlessBilling: 'Fatura sem papel',
    DeviceProtection: 'Proteção de dispositivo',
    OnlineBackup: 'Backup online',
    PaymentMethod: 'Método de pagamento'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px' }}>
        {Object.keys(formData).map((field) => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={field} style={{ marginBottom: '5px', fontWeight: 'bold' }}>
              {labels[field]}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
        ))}
        <button type="submit" style={{ gridColumn: 'span 3', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
          Enviar
        </button>
      </form>
      {result && (
        <div style={{ marginTop: '20px', gridColumn: 'span 3' }}>
          <h3>Resultado da Previsão:</h3>
          <p style={{ fontWeight: 'bold', color: result.prediction === 1 ? 'red' : 'green' }}>
            {result.prediction === 1 ? 'O cliente pode cancelar' : 'O cliente não deve cancelar'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Form;


