import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {
    constructor(private readonly connection: Connection) { }

    async save(order: Order): Promise<void> {
        const [orderData] = await this.connection.query('insert into ccca.order(code, cpf, issue_date, freight, sequence, total, coupon_percentage) values ($1, $1, $3, $4, $5, $6, $7) returning *',
            [order.code.value, order.cpf.value, order.date, order.freight.getTotal(), order.sequence, order.getTotal(), order.coupon?.code]);
        for (const orderItem of order.orderItems) {
            await this.connection.query('insert into ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)', [orderData.id_order, orderItem.id, orderItem.price, orderItem.quantity])
        }
    }

    async count(): Promise<number> {
        const [row] = await this.connection.query('select count(*)::int from ccca.order', []);
        return row.count;
    }
}