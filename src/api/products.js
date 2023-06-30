export async function getAllProducts() {
  const url = 'https://fakestoreapi.com/products';
  let response = await fetch(url);
  let products = await response.json();
  return products;
}
