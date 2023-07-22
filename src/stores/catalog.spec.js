import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCatalogStore } from './catalog';
import { getAllProducts } from '../api/products';

vi.mock('../api/products');

describe('Data Catalog Store Test', () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCatalogStore();
  })

  it('initializes with zero products', () => {
    expect(store.products.length).toEqual(0)
  })

  it('fills products array by API response', async () => {
    const fetchedItems = [{ id: 1 }, { id: 2 }];
    getAllProducts.mockResolvedValue(fetchedItems);

    await store.getProducts();

    expect(store.products).toStrictEqual(fetchedItems);
  });

  it('should find product by id', async () => {
    const productId = 1;
    const fetchedItems = [{ id: 1 }, { id: 2 }];
    getAllProducts.mockResolvedValue(fetchedItems);
    await store.getProducts();

    expect(await store.findProductById(productId)).toStrictEqual(fetchedItems[0]);
  });
})