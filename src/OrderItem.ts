import Item from "./Item";

export default class OrderItem {
    constructor(public id: number,public price: number, public quantity: number) {
    }
    getTotal() {
        return this.price * this.quantity;
    }
}