import { Selector } from 'testcafe'


class CheckoutPage {

    DiscountText: Selector
    FinalTotal: Selector
    PromotionCode: Selector
    Submit: Selector
    CreditCard: Selector
    PayPal: Selector
    
    constructor(){

        this.DiscountText = Selector('span').withText('Discount')
        this.FinalTotal = Selector('#FinalTotal')
        this.PromotionCode = Selector('#PromoCode')
        this.Submit = Selector('.btn').withText('Submit')
        this.CreditCard = Selector('#CreditCard')
        this.PayPal = Selector('#Paypal')


    }
}
export default new CheckoutPage()
