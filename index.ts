import Gelf from "gelf";



export class GreenLogs {
    private gelf: Gelf
    private hideLog: boolean
    constructor(host: string, hideLog: boolean = false) {
        this.hideLog = hideLog
        this.gelf = new Gelf({ graylogHostname: host });
        SetObjectLog(this.gelf)
        this.gelf.on('error', (err: any) => console.error(err, 'graylog'));
    }

    public emit(logOptions: LogOptions) {
        if (this.hideLog) return;
        let logMessage = this.formatMessage(logOptions);
        console.log('GO TO GELF')
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


//@Decorators
export function LogApplication(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    let originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]): any {
        console.log('Running Method: ' + originalMethod.name)
        const result: any = originalMethod.apply(this, args);
        let msg = messageReturnOfFunction(result)
        console.table(msg)
        return result
    };
}

//@Decorators
export function LogGrayLog(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    let log = GetObjectLog()
    let originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]): any {
        const result: any = originalMethod.apply(this, args);
        let message: any = {
            short_message: 'Running Method: ' + originalMethod.name,
            Method: originalMethod.name,
            Result: messageReturnOfFunction(result)
        }
        log.emit(message)
    };
}

function messageReturnOfFunction(resultMethod: any) {
    if (resultMethod instanceof Promise) return 'Method return: <Promise>'
    if (!resultMethod) return 'No return to the method.'
    if (Array.isArray(resultMethod)) return 'Method returning list with the size of: ' + resultMethod.length
    return `Method return: ${JSON.stringify(resultMethod)}`
}

var logContext: Gelf
function SetObjectLog(context: Gelf) {
    logContext = context
}

function GetObjectLog() {
    return logContext
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





//TODO LIST:
/*
[]-no que impacta nos testes o decorator/emit
[]-CIRCLE CI (https://circleci.com/)
*/








