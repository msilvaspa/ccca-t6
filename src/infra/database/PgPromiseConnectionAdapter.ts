import Connection from "./Connection";
import pgp from 'pg-promise';

export default class PgPromiseConnectionAdapter implements Connection {
    pgp: pgp.IDatabase<any, any>;

    constructor() {
        this.pgp = pgp()('postgres://postgres:root@localhost:5432/postgres');
        this.pgp.connect()
    }

    query(statement: string, params: any[]): Promise<any> {
        return this.pgp.query(statement, params);
    }

    close(): Promise<void> {
        return this.pgp.$pool.end();
    }
}