import Http from "./Http";
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from "crypto";

export default class FastifyAdapter implements Http {
    app: any;

    constructor() {
        this.app = fastify({ logger: true, genReqId: () => randomUUID() });
    }

    on(method: string, url: string, callback: Function): void {
        this.app[method](url, async (req: FastifyRequest, _res: FastifyReply) => {
            return callback(req.params, req.body)
        });
    }

    async listen(port: number): Promise<void> {
        await this.app.listen({ port })
    }

}