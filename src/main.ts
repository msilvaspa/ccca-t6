import FastifyAdapter from './infra/http/FastifyAdapter';
import GetItems from './application/GetItems';
import ItemRepositoryDatabase from './infra/repository/database/ItemRepositoryDatabase';
import PgPromiseConnectionAdapter from './infra/database/PgPromiseConnectionAdapter';
import PlaceOrder from './application/PlaceOrder';
import OrderRepositoryMemory from './infra/repository/memory/OrderRepositoryMemory';
import CouponRepositoryMemory from './infra/repository/memory/CouponRepositoryMemory';
import SimulateFreight from './application/SimulateFreight';
import ValidadeCoupon from './application/ValidadeCoupon';

const http = new FastifyAdapter();

const conn = new PgPromiseConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(conn);
const orderRepository = new OrderRepositoryMemory();
const couponRepository = new CouponRepositoryMemory();

http.on('get', '/items', async () => {
    const getItems = new GetItems(itemRepository)
    const output = await getItems.execute()
    return output;
})

http.on('post', '/order', async (_params: any, { cpf, orderItems, coupon }: any) => {
    const getItems = new PlaceOrder(itemRepository, orderRepository, couponRepository)
    const output = await getItems.execute({ cpf, orderItems, date: new Date(), coupon })
    return output;
})

http.on('get', '/freight', async (_params: any, { orderItems }: any) => {
    const getItems = new SimulateFreight(itemRepository)
    const output = await getItems.execute({ orderItems })
    return output;
})

http.on('get', '/coupon', async (_params: any, { code, date }: any) => {
    const getItems = new ValidadeCoupon(couponRepository)
    const output = await getItems.execute({ code, date })
    return output;
})

http.listen(3000);