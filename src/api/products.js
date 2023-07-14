export async function getAllProducts() {
  const url = 'https://fakestoreapi.com/products';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const url = `https://fakestoreapi.com/products/${id}`;
  let response = await fetch(url);
  let product = await response.json();
  return product;
}