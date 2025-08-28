'use server';

import bcrypt from 'bcrypt';
import { db } from './db'; 


export async function registerUser(email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: 'Failed to register user.' };
  }
}