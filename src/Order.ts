import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
    cpf:Cpf;
    private orderItems: OrderItem[];
    private coupon?:Coupon;
    constructor(cpf: string) {
            this.cpf = new Cpf(cpf);
            this.orderItems = [];
            this.coupon = undefined;
    }

    addItem(item: Item, quantity: number) {
        this.orderItems.push(new OrderItem(item.id,item.price,  quantity));
    }

    getTotal() {
        const total = this.orderItems.reduce((total, item) => total + item.getTotal(), 0);
        if(this.coupon) return total - this.coupon.calculateDiscount(total);
        return total;
    }
    
    addCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }
}