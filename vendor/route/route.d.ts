declare class Route {
    middleware(middleware: string[] | string, routes: Function): void;
    get(url: string, argv: [controllerClassPath: string, method: string] | Function): {
        name: (name: string) => void;
    };
    post(url: string, argv: [controllerClassPath: string, method: string] | Function): {
        name: (name: string) => void;
    };
    prefix(prefix: string, routes: Function): void;
    controllerNameSpace(controllerNameSpace: string, routes: Function): void;
}
declare const _default: Route;
export default _default;
