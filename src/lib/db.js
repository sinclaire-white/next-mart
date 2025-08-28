// src/lib/db.js
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

export async function getUsers() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function addUser({ email, password }) {
  const users = await getUsers();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: nanoid(),
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  return newUser;
}

export async function getProducts() {
  try {
    const data = await fs.readFile(productsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function addProduct(product) {
  const products = await getProducts();
  const newProduct = {
    id: nanoid(),
    ...product,
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
  return newProduct;
}

export async function getProductById(id) {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}