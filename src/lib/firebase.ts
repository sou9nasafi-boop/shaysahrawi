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
