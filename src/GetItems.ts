import ItemRepository from "./ItemRepository";

export default class GetItems {
    constructor(private readonly itemRepository: ItemRepository) { }

    async execute(): Promise<Output[]> {
        const items = await this.itemRepository.list();
        const output: Output[] = [];
        for (const item of items) {
            output.push({
                idItem: item.id,
                description: item.description,
                price: item.price
            })
        }
        return output;
    }
}
type Output = {
    idItem: number;
    description: string;
    price: number;
}