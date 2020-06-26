import Gelf from "gelf";

export class GreenLogs {
    private gelf: Gelf
    private hideLog: boolean
    constructor(host: string, hideLog: boolean = false) {
        this.hideLog = hideLog
        this.gelf = new Gelf({ graylogHostname: host });
        this.gelf.on('error', (err: any) => console.error(err, 'graylog'));
    }

    public emit(logOptions: LogOptions) {
        if (this.hideLog) return;
        let logMessage = this.formatMessage(logOptions);
        this.gelf.emit('gelf.log', logMessage);
    }

    private formatMessage(options: LogOptions) {
        let columns = Object.keys(options?.additionalColumns ?? {})
        Object.keys(columns).forEach((key: string) => {
            options[columns[key]] = options?.additionalColumns[columns[key]]
        })
        delete options.additionalColumns
        return options
    }
}


export interface LogOptions {
    short_message?: string;
    full_message?: string;
    level?: number;
    host?: string;
    version?: string;
    timestamp?: number;
    additionalColumns?: Columns;
}

interface Columns {
    [propName: string]: string;
}


//@Decorators
export function LogApplication(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    let originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]): Promise<any> {
        console.log('Running Method: ', originalMethod.name)
        const result: any = await originalMethod.apply(this, args);
        if (!result) {
            console.log('No return to the method.')
            return
        }

        if (Array.isArray(result)) {
            console.log('Method returning list with the size of: ', result.length)
            return
        }
        console.log('Method return: ', result)
    };
}







