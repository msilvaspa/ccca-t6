import OrderItem from "../src/OrderItem"

it("Deve criar um item de pedido",()=>{
    const orderItem = new OrderItem(1,10,2);
    expect(orderItem.getTotal()).toBe(20);
})