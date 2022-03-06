import CheckoutPage from '../page_objects/CheckoutPage';
import StorePage from '../page_objects/StorePage';
import ConfirmationPage from '../page_objects/ConfirmationPage';
import { Selector } from 'testcafe';


fixture `Everly Health Assignment`
    .page `https://testsite.com`
    // Happy path

    // This test is intentional for checking a very high level view of the feature, just to make
    // sure basic funtions are working
    // 1.0
    test('5 item discount', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is shown and that the proper total is shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).ok()
            .expect(CheckoutPage.FinalTotal.withText('$50'))

            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })


    // Test to see if no discount is applied for less than 5 items
    // 1.1
    test('No Discount', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '4')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is NOT shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).notOk('Discount still shows')
            .expect(CheckoutPage.FinalTotal.withText('$80'))

            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })


    // Test to see if a discount is applied at any 5+ number
    // 1.2
    test('Discount at 5+', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '20')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is shown and that the proper total is shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).ok()
            .expect(CheckoutPage.FinalTotal.withText('$200'))
            
            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })



    // Additional Cart Testing
    // This is to test other cases that can happen with cart Inventory, first is multiple items of 5
    // 2.0
    test('Multiple Items of 5', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Select a different item to be tested
            .click(Selector('id').withText('product-02-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is shown and that the proper total is shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).ok()
            .expect(CheckoutPage.FinalTotal.withText('$100'))

            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })

    // Testing the cart if 1 item has at least 5 and the other does not
    // 2.1
    test('1 item with a discount, 1 item with no discount', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Select a different item to be tested
            .click(Selector('id').withText('product-02-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '4')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is shown and that the proper total is shown, should still show for one
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).ok()
            .expect(CheckoutPage.FinalTotal.withText('$120'))

            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })

    // Testing the cart with no items with at least
    // 2.2
    test('1 item with a discount, 1 item with no discount', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '4')

            // Select a different item to be tested
            .click(Selector('id').withText('product-02-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '4')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is NOT shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).notOk('Discount still shows')
            .expect(CheckoutPage.FinalTotal.withText('$160'))

            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })


    // Promotion Code Testing
    // This is test promotion codes and how the discount is applied
    // First a higher discount code that should take over the previous discount
    // 3.0
    test('Coder with Higher Discount', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is shown and that the proper total is shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).ok()
            .expect(CheckoutPage.FinalTotal.withText('$50'))

            // Type into the promotion code field the higher end promotion code
            .typeText(CheckoutPage.PromotionCode, 'HigherDiscountCode')

            // The new Final total will be shown and can be verified to be a different number
            .expect(CheckoutPage.FinalTotal.withText('$20'))

            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })

    // Lower discount code which should not apply
    // 3.1
    test('Coder with Higher Discount', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is shown and that the proper total is shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).ok()
            .expect(CheckoutPage.FinalTotal.withText('$50'))

            // Type into the promotion code field the higher end promotion code
            .typeText(CheckoutPage.PromotionCode, 'LowerDiscountCode')

            // The final total should stay the same
            .expect(CheckoutPage.FinalTotal.withText('$50'))

            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })


    // Now to test the code will work for multiple Items on a higher end
    // 3.2
    test('Higher code with multiple items', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-02-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is shown and that the proper total is shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).ok()
            .expect(CheckoutPage.FinalTotal.withText('$100'))

            // Type into the promotion code field the higher end promotion code
            .typeText(CheckoutPage.PromotionCode, 'HigherDiscountCode')

            // The final total should change with the new discount
            .expect(CheckoutPage.FinalTotal.withText('$80'))

            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })


    // Cart with multiple items and a lower discount code
    // 3.3
    test('Lower Code with Multiple Items', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-02-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is shown and that the proper total is shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).ok()
            .expect(CheckoutPage.FinalTotal.withText('$100'))

            // Type into the promotion code field the higher end promotion code
            .typeText(CheckoutPage.PromotionCode, 'LowerDiscountCode')

            // The final total should not change due to lower discount
            .expect(CheckoutPage.FinalTotal.withText('$100'))

            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })

    // Payment testing
    // Attempt different payment methods to verify the discount still applies
    // 4.0
    test('Different Payment Method', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '5')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is shown and that the proper total is shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).ok()
            .expect(CheckoutPage.FinalTotal.withText('$100'))

            // Enter in credit card information
            .typeText(CheckoutPage.PayPal, 'paypalaccount@gmail.com')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })

    // Edge Case Testing
    // This is to attempt some of the limits the feature may have by using large numbers in extreme cases
    // Process should proceed as normal if no limits exist
    // 5.0
    test('Different Payment Method', async t => {
        await t
            // Navigation to the store page
            .navigateTo('/store')

            // Select the designated product to be the test
            .click(Selector('id').withText('product-01-submit-button'))

            // Selecting the item count, so that the total number of items equals 5
            .typeText(StorePage.ItemCount, '100')

            // Proceed to the checkout page
            .click(Selector('.btn').withText('Check Out'))

            // Verify that a discount field is shown and that the proper total is shown
            // This is presuming that we know what to expect with our test cart items in terms of total
            .expect(CheckoutPage.DiscountText.visible).ok()
            .expect(CheckoutPage.FinalTotal.withText('$50'))

            // Enter in credit card information
            .typeText(CheckoutPage.CreditCard, '8675309')

            // Submit the order and finish the store process
            .click(CheckoutPage.Submit)

            // Once the order has gone through expect confirmation text
            .expect(ConfirmationPage.ConfirmationText.visible).ok()
    })
