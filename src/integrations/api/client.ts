const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

function headers(token?: string) {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  } as Record<string, string>;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  return res.json();
}

export async function signup(email: string, password: string) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Signup failed');
  return res.json();
}

export async function getSession(token: string) {
  const res = await fetch(`${API_BASE}/session`, {
    headers: headers(token),
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

export async function listNotebooks(token: string) {
  const res = await fetch(`${API_BASE}/notebooks`, { headers: headers(token) });
  if (!res.ok) throw new Error('Failed to fetch notebooks');
  return res.json();
}

export async function createNotebook(token: string, name: string) {
  const res = await fetch(`${API_BASE}/notebooks`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create notebook');
  return res.json();
}

export async function listMaterials(token: string, notebookId: string) {
  const res = await fetch(`${API_BASE}/notebooks/${notebookId}/materials`, {
    headers: headers(token),
  });
  if (!res.ok) throw new Error('Failed to fetch materials');
  return res.json();
}

export async function addMaterial(
  token: string,
  notebookId: string,
  material: { type: string; name: string; url?: string; content?: string }
) {
  const res = await fetch(`${API_BASE}/notebooks/${notebookId}/materials`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify(material),
  });
  if (!res.ok) throw new Error('Failed to add material');
  return res.json();
}
