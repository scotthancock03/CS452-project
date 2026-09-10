const BASE_URL = 'https://cuddly-funicular-4jx5v79xrp74h7p46-5000.app.github.dev/api';

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export const getItems = () => request('/items');
export const createItem = (data) => request('/items', { method: 'POST', body: JSON.stringify(data) });
export const updateItem = (id, data) => request(`/items/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteItem = (id) => request(`/items/${id}`, { method: 'DELETE' });

export const getTransactions = () => request('/transactions');
export const deleteTransaction = (id) => request(`/transactions/${id}`, { method: 'DELETE' });