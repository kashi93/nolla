import { ExceptionHandler } from "nolla-core";

export class ExceptionKernel extends ExceptionHandler {
    boot() {
        this.reportable(async (error: Error) => {
            console.log(error);
        })
    }
}