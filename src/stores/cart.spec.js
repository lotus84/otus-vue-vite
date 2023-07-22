import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCatalogStore } from './catalog';
import { useCartStore } from './cart';
import { getAllProducts } from '../api/products';

vi.mock('../api/products');

const deafultFetchedCatalogItems = [
  { id: 1, price: 10, },
  { id: 2, price: 20, },
];

describe('Data Cart Store Test', () => {
  let store = null;
  let catalogStore = null;

  beforeEach(async () => {
    setActivePinia(createPinia());
    store = useCartStore();
    catalogStore = useCatalogStore();
    getAllProducts.mockResolvedValue(deafultFetchedCatalogItems);
    await catalogStore.getProducts();
  })

  it('initializes with zero cartItems', () => {
    expect(store.cartItems.length).toEqual(0);
  })

  it('test adding a new item to cart', () => {
    store.addItemToCart(1, 1);

    expect(store.cartItems.length).toEqual(1);
    expect(store.cartItems[0]).toEqual({
      id: 1,
      count: 1,
    });
  })

  it('test adding two new items to cart', () => {
    store.addItemToCart(1, 1);
    store.addItemToCart(2, 1);

    expect(store.cartItems.length).toEqual(2);
    expect(store.cartItems[0]).toEqual({
      id: 1,
      count: 1,
    });
    expect(store.cartItems[1]).toEqual({
      id: 2,
      count: 1,
    });
  })

  it('test increasing count by adding a duplicate item to cart', () => {
    store.addItemToCart(1, 1);
    store.addItemToCart(1, 1);

    expect(store.cartItems.length).toEqual(1);
    expect(store.cartItems[0]).toEqual({
      id: 1,
      count: 2,
    });
  })

  it('test delete item from cart by id', () => {
    store.addItemToCart(1, 1);
    store.addItemToCart(2, 1);
    expect(store.cartItems.length).toEqual(2);

    store.deleteItemFromCartById(1);

    expect(store.cartItems.length).toEqual(1);
    expect(store.cartItems[0]).toEqual({
      id: 2,
      count: 1,
    });
  })

  it('test decreasing count by removing a duplicate item from cart', () => {
    store.addItemToCart(1, 1);
    store.addItemToCart(2, 1);
    store.addItemToCart(1, 1);
    expect(store.cartItems.length).toEqual(2);
    expect(store.cartItems[0]).toEqual({
      id: 1,
      count: 2,
    });

    store.removeItemFromCart(1, 1);

    expect(store.cartItems.length).toEqual(2);
    expect(store.cartItems[0]).toEqual({
      id: 1,
      count: 1,
    });
  })

  it('test totalSum items in cart', () => {
    store.addItemToCart(1, 1);
    store.addItemToCart(2, 1);
    store.addItemToCart(2, 1);

    expect(store.cartItems.length).toEqual(2);
    expect(store.cartItems[0]).toEqual({
      id: 1,
      count: 1,
    });
    expect(store.cartItems[1]).toEqual({
      id: 2,
      count: 2,
    });
    expect(store.totalSum).toEqual((deafultFetchedCatalogItems[0].price * 1 + deafultFetchedCatalogItems[1].price * 2).toFixed(2));
  })
})