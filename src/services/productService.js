import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const productsRef = collection(db, 'products')

export async function getProducts() {
  const q = query(productsRef, orderBy('name'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
}

export async function createProduct(product) {
  return addDoc(productsRef, { ...product, createdAt: new Date().toISOString() })
}

export async function updateProduct(id, product) {
  return updateDoc(doc(db, 'products', id), product)
}

export async function deleteProduct(id) {
  return deleteDoc(doc(db, 'products', id))
}