import FastifyAdapter from './infra/http/FastifyAdapter';
import GetItems from './application/GetItems';
import ItemRepositoryDatabase from './infra/repository/database/ItemRepositoryDatabase';
import PgPromiseConnectionAdapter from './infra/database/PgPromiseConnectionAdapter';

const http = new FastifyAdapter();

const conn = new PgPromiseConnectionAdapter()
const itemRepository = new ItemRepositoryDatabase(conn)

http.on('get', '/items', async (params: any, body: any) => {
    const getItems = new GetItems(itemRepository)
    const output = await getItems.execute()
    return output;
})

http.listen(3000);