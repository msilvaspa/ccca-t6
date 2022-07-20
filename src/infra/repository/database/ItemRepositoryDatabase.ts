import Connection from "../../database/Connection";
import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryDatabase implements ItemRepository {
    constructor(private readonly connection: Connection) { }

    get(idItem: number): Promise<Item> {
        throw new Error("Method not implemented.");
    }

    save(item: Item): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async list(): Promise<Item[]> {
        const items: Item[] = [];
        const itemsData = await this.connection.query("select * from ccca.item", []);
        // console.log(itemsData);
        
        for (const item of itemsData) {
            items.push(new Item(item.id_item, item.description, parseFloat(item.price)))
        }
        return items;
    }
}