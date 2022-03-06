import { Selector } from 'testcafe'


class StorePage {

    ItemCount: Selector

    constructor(){

        this.ItemCount = Selector('#ItemCount')

    }
}
export default new StorePage()
