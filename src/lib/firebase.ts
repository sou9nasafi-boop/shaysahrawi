import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { Product } from '../types';

// Default placeholder config
const defaultFirebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// In AI Studio, firebase-applet-config.json is provided after setup
// We initialize with defaults and will update if config is found
let firebaseConfig = defaultFirebaseConfig;
let firestoreDatabaseId: string | undefined = undefined;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firestoreDatabaseId);

// Products CRUD
export const getProducts = async (): Promise<Product[]> => {
  // Skip if using placeholder config
  if (firebaseConfig.apiKey === "AIzaSy...") {
    return [];
  }
  try {
    const q = query(collection(db, 'products'), orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (e) {
    console.error("Error fetching products:", e);
    return [];
  }
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding product:", e);
    throw e;
  }
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      ...product,
      updatedAt: serverTimestamp()
    });
  } catch (e) {
    console.error("Error updating product:", e);
    throw e;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (e) {
    console.error("Error deleting product:", e);
    throw e;
  }
};

export const trackVisit = async () => {
  try {
    // Fetch IP address
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    
    await addDoc(collection(db, 'visits'), {
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      path: window.location.pathname,
      ip: ipData.ip || 'unknown'
    });
  } catch (e) {
    console.error("Error tracking visit:", e);
  }
};

export const trackOrderClick = async (product: any, weight: string, price: number) => {
  try {
    await addDoc(collection(db, 'orderClicks'), {
      timestamp: serverTimestamp(),
      productId: product.id,
      productName: product.name,
      weight,
      price
    });
  } catch (e) {
    console.error("Error tracking order click:", e);
  }
};

export const sendMessage = async (message: { name: string, phone: string, content: string, city?: string }) => {
  // If using placeholder config, simulate success for UI testing
  if (firebaseConfig.apiKey === "AIzaSy...") {
    console.log("Simulating message send (Firebase not configured):", message);
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  try {
    let ip = 'unknown';
    try {
      // Fetch IP address for admin context with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const ipResponse = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
      clearTimeout(timeoutId);
      const ipData = await ipResponse.json();
      ip = ipData.ip || 'unknown';
    } catch (ipError) {
      console.warn("Could not fetch IP for message:", ipError);
    }

    await addDoc(collection(db, 'messages'), {
      ...message,
      timestamp: serverTimestamp(),
      ip,
      userAgent: navigator.userAgent,
      status: 'new'
    });
  } catch (e) {
    console.error("Error sending message:", e);
    throw e;
  }
};

export const updateMessageStatus = async (id: string, status: 'read' | 'replied') => {
  try {
    const docRef = doc(db, 'messages', id);
    await updateDoc(docRef, { status });
  } catch (e) {
    console.error("Error updating message status:", e);
    throw e;
  }
};
