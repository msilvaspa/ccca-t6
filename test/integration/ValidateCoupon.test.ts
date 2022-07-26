import ValidadeCoupon from "../../src/application/ValidadeCoupon";
import Coupon from "../../src/domain/entity/Coupon";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";

it('Deve validar um cupom de desconto expirado', async () => {
    const couponRepository = new CouponRepositoryMemory();
    couponRepository.save(new Coupon('VALE20', 20, new Date('2021-03-10T10:00:00')))
    const validateCoupon = new ValidadeCoupon(couponRepository);
    const input = {
        code: 'VALE20',
        date: new Date('2022-03-10T10:00:00')
    }
    const output = await validateCoupon.execute(input);
    expect(output.isExpired).toBeTruthy()
})

it('Deve validar um cupom de desconto válido', async () => {
    const couponRepository = new CouponRepositoryMemory();
    couponRepository.save(new Coupon('VALE20', 20, new Date('2021-03-10T10:00:00')))
    const validateCoupon = new ValidadeCoupon(couponRepository);
    const input = {
        code: 'VALE20',
        date: new Date('2021-03-09T10:00:00')
    }
    const output = await validateCoupon.execute(input);
    expect(output.isExpired).toBeFalsy()
})