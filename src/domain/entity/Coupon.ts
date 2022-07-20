export default class Coupon {
    constructor(readonly id:string, readonly percentage: number, readonly expirationDate: Date = new Date()) {
    }
    
    calculateDiscount(total: number) {
        return (total * this.percentage)/100;
    }

    isExpired(today: Date) {
        return today.getTime() > this.expirationDate.getTime();
    }
}