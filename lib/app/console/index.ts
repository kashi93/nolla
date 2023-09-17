import type { CommandKernel, FunctionArray, Schedule } from "nolla-core";
import { Frequency } from "nolla-core";

export default class Console implements CommandKernel {
    commands: FunctionArray[] = [];

    schedule($schedule: Schedule) {
        $schedule.command("inspire", {
            frequency: new Frequency().everyTwoMinutes(),
            onSuccess: async function (data) {
                console.log(String(data).trim());
            },
            timezone: "Asia/Kuala_Lumpur"
        })
    }
}