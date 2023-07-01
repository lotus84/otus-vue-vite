export async function getAllProducts() {
  const url = 'https://fakestoreapi.com/products';
  let response = await fetch(url);
  let products = await response.json();
  return products;
}

export async function getProductById(id) {
  const url = `https://fakestoreapi.com/products/${id}`;
  let response = await fetch(url);
  let product = await response.json();
  return product;
}