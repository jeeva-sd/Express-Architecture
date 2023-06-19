import { createPool } from 'mysql2';

export class DB {
    public pool: any = null;

    public connect() {
        if (this.pool) return this.pool;
        else return this.pool = createPool(null); // DB credentials instead of null
    }

    public async execute(query: String, params?: Array<string | number>): Promise<any> {
        const conn = await this.connect();

        return new Promise((resolve, reject) => {
            conn.query(query, params, (err: any, results: any) => {
                if (err) return reject(err);
                else return resolve(results);
            });
        });
    };

    public kill() {
        if (this.pool) {
            setTimeout(() => {
                this.pool.end();
                this.pool = null;
                return console.info('Connection Destroyed.')
            }, 5000);
        }
        else return console.info('No Connection to kill.')
    }
}