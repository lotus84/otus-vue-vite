export async function getAllProducts() {
  const url = 'https://fakestoreapi.com/products';
  let response = await fetch(url);
  let products = await response.json();
  return products;
}

export async function createOrderForProducts( orderObject ) {
  const url = 'https://httpbin.org/post';

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(orderObject)
  };

  const response = await fetch(url, requestOptions);

  return response;
}