import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get,
  remove,
  update,
  child,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_RPJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product) {
  const id = uuid();
  const date = new Date();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    date: date.toLocaleDateString(),
  });
}

export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function deleteProduct(productId) {
  await remove(ref(database, `products/${productId}`)).catch(console.error);
}

export async function updateProduct(productId, updatedProduct) {
  const updates = {};
  updates[`products/${productId}`] = updatedProduct;

  return update(ref(database), updates);
}

export async function getCarts(userId) {
  return get(ref(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || [];
      return Object.values(items);
    });
}

export async function addOrUpdateToCarts(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCarts(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}

let currentOrderId = 1000;

export async function getOrders() {
  return get(child(ref(database), "orders")) //
    .then((snapshot) => {
      const items = snapshot.val() || [];
      return Object.values(items);
    });
}

export async function addToOrders(order) {
  const date = new Date();
  const orderId = uuid();

  return set(child(ref(database), `orders/${orderId}`), {
    ...order,
    orderId: orderId,
    id: currentOrderId++,
    date: date.toLocaleDateString(),
    state: "order",
  });
}

export async function UpdateOrderStatus(orderId, newStatus) {
  console.log(orderId);
  await update(ref(database, `orders/${orderId}`), { state: newStatus });
}
