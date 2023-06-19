import { Request } from 'express';
import { Controller, GET } from '../../lib';
import Hello from '../core/hello';

@Controller('/hello')
class HelloController {
    private hello: Hello;

    constructor() {
        this.hello = this.helloInstance();
    }

    @GET('/')
    public firstHello(req: Request) {
        const name: string | undefined = req.query.name ? String(req.query.name) : undefined;
        return this.hello.sayHello(name);
    }

    private helloInstance(): Hello {
        if (!this.hello) this.hello = new Hello();
        return this.hello;
    }
}

export default HelloController;