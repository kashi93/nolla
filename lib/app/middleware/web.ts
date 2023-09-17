import type { Middleware, Request, Response, Next } from "nolla-core";

export default class Web implements Middleware {
    handle(req: Request, res: Response, next: Next) { 
        return next()
    }
}

