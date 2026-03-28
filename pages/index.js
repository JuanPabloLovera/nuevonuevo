import { useState } from 'react';
import { callAzureAI, callAzureDB } from '../utils/azure';

export default function Home() {
  const [input, setInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [dbResult, setDbResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ai = await callAzureAI(input);
      setAiResult(ai);
      const db = await callAzureDB(input);
      setDbResult(JSON.stringify(db, null, 2));
    } catch (err) {
      setAiResult('Error al conectar con Azure AI');
      setDbResult('Error al conectar con Cosmos DB');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Negocio Cloud: Azure AI + Cosmos DB</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe algo..."
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ padding: '0.5rem', marginLeft: '1rem' }}>
          Enviar
        </button>
      </form>
      <div style={{ marginTop: '2rem' }}>
        <h2>Azure AI Resultado:</h2>
        <pre>{aiResult}</pre>
        <h2>Cosmos DB Resultado:</h2>
        <pre>{dbResult}</pre>
      </div>
    </div>
  );
}