export async function callAzureAI(prompt) {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const key = process.env.AZURE_OPENAI_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION;

  const res = await fetch(`${endpoint}/openai/deployments/${deployment}/completions?api-version=${apiVersion}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': key
    },
    body: JSON.stringify({ prompt, max_tokens: 200 })
  });

  const data = await res.json();
  return data.choices?.[0]?.text || 'No response';
}

export async function callAzureDB(queryText) {
  const endpoint = process.env.COSMOS_ENDPOINT;
  const key = process.env.COSMOS_KEY;
  const database = process.env.COSMOS_DATABASE;
  const container = process.env.COSMOS_CONTAINER;

  const res = await fetch(`${endpoint}/dbs/${database}/colls/${container}/docs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': key
    },
    body: JSON.stringify({ query: queryText })
  });

  return await res.json();
}