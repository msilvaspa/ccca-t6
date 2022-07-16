import Coupon from "../src/Coupon";
import Dimension from "../src/Dimension";
import Item from "../src/Item";
import Order from "../src/Order";

it("nao deve criar um pedido com CPF inválido", () => {
    expect(() => new Order("111.111.111.11")).toThrow("CPF Inválido");
})

it("deve criar um pedido com CPF válido e 3 itens", () => {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000), 1);
    order.addItem(new Item(2, "GuAmplificadoritarra", 5000), 1);
    order.addItem(new Item(3, "Cabo", 30), 3);
    const total = order.getTotal();
    expect(total).toBe(6090);
})

it("deve criar um pedido com cupom de desconto (percentual sobre o pedido)", () => {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Guitarra", 1000), 1);
    order.addItem(new Item(2, "GuAmplificadoritarra", 5000), 1);
    order.addItem(new Item(3, "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(4872);
})

it("deve criar um pedido com cupom de desconto expirado", () => {
    const order = new Order("935.411.347-80", new Date("2020-03-10T10:00:00"));
    order.addItem(new Item(1, "Guitarra", 1000), 1);
    order.addItem(new Item(2, "GuAmplificadoritarra", 5000), 1);
    order.addItem(new Item(3, "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2020-03-01T10:00:00")));
    const total = order.getTotal();
    expect(total).toBe(6090);
})

it("deve criar um pedido com 3 itens e calcular o frete", () => {
    const order = new Order("935.411.347-80", new Date("2020-03-10T10:00:00"));
    order.addItem(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3), 1);
    order.addItem(new Item(2, "GuAmplificadoritarra", 5000, new Dimension(50, 50, 50), 20), 1);
    order.addItem(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1), 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2020-03-01T10:00:00")));
    const freight = order.getFreight();
    const total = order.getTotal();

    // volume = 100/100 * 30/10 * 10/100 = 0.03
    // density = 3/0.03 = 100
    // freight = 0.03 * 1000 * (100/100) = 30

    // volume = 50/100 * 50/100 * 50/100 = 0.125
    // density = 20/0,125 = 160
    // freight = 0.125 * 1000 * (160/100) = 200

    // volume = 10/100 * 10/100 * 10/100 = 0.001
    // density = 1/0.001 = 1000
    // freight = 0.001 * 1000 * (1000/100) = 10

    expect(freight).toBe(260);
    expect(total).toBe(6350)
})
