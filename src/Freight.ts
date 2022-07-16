import Item from "./Item";

export default class Freight {
    private total = 0;
    private readonly DISTANCE = 1000;
    private readonly FACTOR = 100;
    private readonly MIN_FREIGHT = 10;

    addItem(item: Item, quantity: number) {
        const freight = item.getVolume() * this.DISTANCE * (item.getDensity() / this.FACTOR);
        this.total += freight * quantity;
    }

    getTotal() {
        return (this.total > 0 && this.total < this.MIN_FREIGHT) ? this.MIN_FREIGHT : this.total;
    }
}