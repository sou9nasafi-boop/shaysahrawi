import { Product, Message } from '../types';
import { supabase } from './supabase';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Format the data to match our frontend types
    return (data || []).map(p => ({
      ...p,
      secondaryImage: p.secondaryimage, // Handle case sensitivity if needed
    })) as Product[];
  } catch (e) {
    console.error("Error fetching products from Supabase:", e);
    return [];
  }
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        category: product.category,
        prices: product.prices,
        description: product.description,
        image: product.image,
        secondaryimage: product.secondaryImage,
        gallery: product.gallery || [],
        features: product.features || []
      }])
      .select()
      .single();
      
    if (error) throw error;
    return data.id;
  } catch (e) {
    console.error("Error adding product to Supabase:", e);
    throw e;
  }
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  try {
    const updateData: any = { ...product };
    if (product.secondaryImage !== undefined) {
      updateData.secondaryimage = product.secondaryImage;
      delete updateData.secondaryImage;
    }
    
    const { error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id);
      
    if (error) throw error;
  } catch (e) {
    console.error("Error updating product in Supabase:", e);
    throw e;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (e) {
    console.error("Error deleting product from Supabase:", e);
    throw e;
  }
};

export const sendMessage = async (message: { name: string, phone: string, content: string, city?: string }) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        name: message.name,
        phone: message.phone,
        content: message.content,
        city: message.city,
        status: 'new',
        user_agent: navigator.userAgent
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (e) {
    console.error("Error sending message to Supabase:", e);
    throw e;
  }
};

export const updateMessageStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ status })
      .eq('id', id);
      
    if (error) throw error;
  } catch (e) {
    console.error("Error updating message status in Supabase:", e);
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

    await supabase
      .from('visits')
      .insert([{
        ip,
        user_agent: navigator.userAgent,
        path: window.location.pathname
      }]);
  } catch (e) {
    console.error("Error tracking visit in Supabase:", e);
  }
};

export const trackOrderClick = async (product: any, weight: string, price: number) => {
  try {
    await supabase
      .from('clicks')
      .insert([{
        product_id: product.id,
        product_name: product.name,
        weight,
        price
      }]);
  } catch (e) {
    console.error("Error tracking order click in Supabase:", e);
  }
};

// Mock Firebase objects to avoid breaking imports
export const db = {};
export const auth = {};
