export default class Coupon {
    constructor(readonly code:string, readonly percentage: number, readonly expirationDate: Date = new Date()) {
    }

    isExpired(today: Date) {
        return today.getTime() > this.expirationDate.getTime();
    }
}