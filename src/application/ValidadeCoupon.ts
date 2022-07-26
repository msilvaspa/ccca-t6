import CouponRepository from "../domain/repository/CouponRepository";

export default class ValidadeCoupon {
    constructor(private readonly couponRepository: CouponRepository) { }

    async execute(input: Input): Promise<Output> {
        const coupon = await this.couponRepository.get(input.code);
        return { isExpired: coupon.isExpired(input.date) }
    }
}

type Input = {
    code: string;
    date: Date;
}

type Output = {
    isExpired: boolean;
}