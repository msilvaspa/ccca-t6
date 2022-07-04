export default class Coupon {
    constructor(readonly id:string, readonly percentage: number) {
    }
    calculateDiscount(total: number) {
        return (total * this.percentage)/100;
    }
}