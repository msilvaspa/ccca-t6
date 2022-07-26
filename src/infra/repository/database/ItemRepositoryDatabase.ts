import Connection from "../../database/Connection";
import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Dimension from "../../../domain/entity/Dimension";

export default class ItemRepositoryDatabase implements ItemRepository {
    constructor(private readonly connection: Connection) { }

    async get(idItem: number): Promise<Item> {
        const [item] = await this.connection.query('select * from ccca.item where id_item = $1', [idItem]);
        if (!item) throw new Error("item not found");
        console.log(item, '\n');

        return new Item(idItem, item.description, item.price, new Dimension(item.width, item.height, item.length), item.weight);
    }

    save(_item: Item): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async list(): Promise<Item[]> {
        const items: Item[] = [];
        const itemsData = await this.connection.query("select * from ccca.item", []);
        for (const item of itemsData) {
            items.push(new Item(item.id_item, item.description, parseFloat(item.price)))
        }
        return items;
    }
}