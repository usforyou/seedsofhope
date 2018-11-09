export class AppAlert {
    type: AlertType;
    message: string;
    alertId: string;
    keepAfterRouteChange: boolean;

    constructor(init?:Partial<AppAlert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}