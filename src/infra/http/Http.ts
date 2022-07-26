export default interface Http {
    on(method: string, url: string, callback: (req: any, res: any) => any): void
    listen(port: number): Promise<void>
}