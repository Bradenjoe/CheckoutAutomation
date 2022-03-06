import { Selector } from 'testcafe'


class ConfirmationPage {

    ConfirmationText: Selector

    constructor(){

        this.ConfirmationText = Selector('span').withText('Congratulations, Order Submitted')

    }
}
export default new ConfirmationPage()
