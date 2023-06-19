import * as express from 'express';
import * as cors from 'cors';
import { v4 as uuid } from 'uuid';
import { combineRouter } from './router/index';
import { ApiResult, getMetaData, Route } from '../lib';

class Application {
    private readonly app: express.Application;

    get instance(): express.Application {
        return this.app;
    }

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.registerRouters();
    }

    private registerRouters() {
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.json({ code: 100, message: 'In action' });
        });

        this.attachRouters();
    }

    private attachRouters() {
        combineRouter.forEach((instance: any) => {
            const controllerInstance = new instance();
            const metaData = getMetaData(controllerInstance);
            const controllerPath = metaData.controller;
            const routes = metaData.routes;

            Object.keys(routes).forEach((methodName: string) => {
                const router: any = express.Router();
                const route: Route = routes[methodName];
                const routeMethod = route.method;

                router[routeMethod](route.url, async (req: express.Request, res: express.Response) => {
                    const response = (controllerInstance as any)[methodName](req, res);

                    if (route.hasFile) {

                        const exts = {
                            video: 'mp4',
                            audio: 'mp3'
                        };

                        const contentTypes = {
                            video: 'video/mp4',
                            audio: 'audio/mpeg'
                        };

                        const title = `${req.query.title || uuid()}.${exts.video}`;

                        res.setHeader('Content-Type', contentTypes.video);
                        res.setHeader('Content-Disposition', `attachment; filename=${title}; filename*=utf-8''${title}`);

                        if (response instanceof Promise) return response.then((path: any) => path.pipe(res));
                        return res.sendFile(response);
                    }
                    else if (response instanceof Promise) return response.then((data: ApiResult) => res.send(data));
                    else res.send(response);
                });

                this.app.use(controllerPath, router);
            });
        });
    }
}

export default new Application();