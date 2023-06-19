import { dataList, exception } from '../../lib';

class Hello {

    public async sayHello(name: string) {
        try {
            const port = process.env.PORT ? process.env.PORT : '3000';
            const message = `Hello ${name ? name : 'there'}!, from ${port}`;
            return dataList([message]);
        } catch (error) {
            return exception(error);
        }
    }
}

export default Hello;