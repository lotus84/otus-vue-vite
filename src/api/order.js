export async function createOrderForProducts( orderObject ) {
  const url = 'https://httpbin.org/post';

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(orderObject)
  };

  const response = await fetch(url, requestOptions);

  return response;
}