import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

it("nao deve criar um pedido com CPF inválido", ()=>{
    expect(()=> new Order("111.111.111.11")).toThrow("CPF Inválido");
})

it("deve criar um pedido com CPF válido e 3 itens", ()=>{
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000), 1);
    order.addItem(new Item(2, "GuAmplificadoritarra", 5000), 1);
    order.addItem(new Item(3, "Cabo", 30), 3);
    const total = order.getTotal();
    expect(total).toBe(6090);
})

it("deve criar um pedido com cupom de desconto (percentual sobre o pedido)", ()=>{
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000), 1);
    order.addItem(new Item(2, "GuAmplificadoritarra", 5000), 1);
    order.addItem(new Item(3, "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(4872);
})