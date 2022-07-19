import ItemRepository from "./ItemRepository";
import Order from "./Order";
import OrderRepository from "./OrderRepository";

export default class PlaceOrder {
    constructor(private readonly itemRepository: ItemRepository, private readonly orderRepository: OrderRepository){}

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput>{
        const order = new Order(input.cpf);

        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.get(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }
        await this.orderRepository.save(order);
        const total = order.getTotal();
        return { total }; 
    }   
}

type PlaceOrderInput = {
    cpf: string;
    orderItems: {idItem: number, quantity: number}[];
    coupon?: string;
}

type PlaceOrderOutput = {
    total: number;
}
