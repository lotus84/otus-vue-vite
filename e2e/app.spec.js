// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
});

test.describe('test add items to cart', () => {
  test('should allow me to add one item to cart', async ({ page }) => {
    const cartCounter = page.getByTestId('cart-counter');
    const productItem = page
      .locator('li')
      .filter({ hasText: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops' });

    await productItem.getByRole('button').click();

    await expect(cartCounter).toHaveText('1');
  });

  test('should allow me to add 4 items to cart', async ({ page }) => {
    const cartCounter = page.getByTestId('cart-counter');
    const productItem1 = page
      .locator('li')
      .filter({ hasText: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops' });
    const productItem2 = page
      .locator('li')
      .filter({ hasText: 'Solid Gold Petite Micropave' });

    await productItem1.getByRole('button').click();
    await productItem1.getByRole('button').click();
    await productItem2.getByRole('button').click();
    await productItem2.getByRole('button').click();

    await expect(cartCounter).toHaveText('4');
  });
});

test.describe('test add and remove items in cart', () => {
  test('add 2 items to cart and go to cart page and add and remove items in cart', async ({ page }) => {
    const productItem1 = page.getByTestId('product-item-1');
    const productItem2 = page.getByTestId('product-item-2');
    await productItem1.getByRole('button').click();
    await productItem2.getByRole('button').click();
    await page.getByRole('navigation').getByRole('link', { name: 'Корзина' }).click();
    const cartItemsList = page.getByTestId('cart-items-list');
    const countItem1 = page.getByTestId('cart-item-count-1');
    const countItem2 = page.getByTestId('cart-item-count-2');

    await expect(cartItemsList).toBeAttached();
    await expect(countItem1).toHaveText('1');
    await expect(countItem2).toHaveText('1');

    const increaseButtonItem1 = page.getByTestId('cart-item-increase-button-1');
    const increaseButtonItem2 = page.getByTestId('cart-item-increase-button-2');

    await increaseButtonItem1.click();
    await increaseButtonItem2.click();

    await expect(countItem1).toHaveText('2');
    await expect(countItem2).toHaveText('2');

    const decreaseButtonItem1 = page.getByTestId('cart-item-decrease-button-1');
    const decreaseButtonItem2 = page.getByTestId('cart-item-decrease-button-2');

    await decreaseButtonItem1.click();
    await decreaseButtonItem2.click();

    await expect(countItem1).toHaveText('1');
    await expect(countItem2).toHaveText('1');

    const deleteButtonItem1 = page.getByTestId('cart-item-delete-button-1');
    const deleteButtonItem2 = page.getByTestId('cart-item-delete-button-2');

    await deleteButtonItem1.click();
    await deleteButtonItem2.click();

    await expect(cartItemsList).not.toBeAttached();
  });
});
