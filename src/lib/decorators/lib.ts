import { getMetaData } from './meta';

export const Controller = (controller: string): ClassDecorator => {
    return (target: any) => {
        const meta = getMetaData(target.prototype);
        meta.controller = controller;
    };
}

export const MethodDecorator = (method: string, path: string, hasFile: boolean = false): MethodDecorator => {
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        const meta = getMetaData(target);
        meta.routes[methodName] = { method, url: path, hasFile };
        return descriptor;
    }
}

export const GET = (path: string, hasFile: boolean = false) => MethodDecorator('get', path, hasFile);
export const POST = (path: string, hasFile: boolean = false) => MethodDecorator('post', path, hasFile);
export const PUT = (path: string, hasFile: boolean = false) => MethodDecorator('put', path, hasFile);
export const DELETE = (path: string, hasFile: boolean = false) => MethodDecorator('delete', path, hasFile);