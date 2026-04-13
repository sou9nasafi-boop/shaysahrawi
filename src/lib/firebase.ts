import { Product, Message } from '../types';

// API Fallback for synchronization when Firebase is unavailable
const API_BASE = '/api';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (e) {
    console.error("Error fetching products:", e);
    return [];
  }
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    const data = await res.json();
    return data.id;
  } catch (e) {
    console.error("Error adding product:", e);
    throw e;
  }
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  try {
    await fetch(`${API_BASE}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  } catch (e) {
    console.error("Error updating product:", e);
    throw e;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE'
    });
  } catch (e) {
    console.error("Error deleting product:", e);
    throw e;
  }
};

export const sendMessage = async (message: { name: string, phone: string, content: string, city?: string }) => {
  try {
    let ip = 'unknown';
    try {
      // Use a faster IP service or skip if it's slow
      const ipRes = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2000) });
      const ipData = await ipRes.json();
      ip = ipData.ip || 'unknown';
    } catch (ipErr) {
      console.warn("IP fetch failed, using unknown", ipErr);
    }

    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...message, 
        ip, 
        userAgent: navigator.userAgent,
        status: 'new' 
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server responded with ${res.status}: ${errorText}`);
    }

    return await res.json();
  } catch (e) {
    console.error("Detailed error sending message:", e);
    throw e;
  }
};

export const updateMessageStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
  try {
    await fetch(`${API_BASE}/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  } catch (e) {
    console.error("Error updating message status:", e);
    throw e;
  }
};

export const trackVisit = async () => {
  try {
    let ip = 'unknown';
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipRes.json();
      ip = ipData.ip || 'unknown';
    } catch {}

    await fetch(`${API_BASE}/stats/visits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userAgent: navigator.userAgent,
        path: window.location.pathname,
        ip
      })
    });
  } catch (e) {
    console.error("Error tracking visit:", e);
  }
};

export const trackOrderClick = async (product: any, weight: string, price: number) => {
  try {
    await fetch(`${API_BASE}/stats/clicks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        productName: product.name,
        weight,
        price
      })
    });
  } catch (e) {
    console.error("Error tracking order click:", e);
  }
};

// Mock Firebase objects to avoid breaking imports
export const db = {};
export const auth = {};
