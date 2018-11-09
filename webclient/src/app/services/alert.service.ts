import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {Router, NavigationStart}from '@angular/router';
import { AppAlert, AlertType } from '../models/AppAlert';
import { filter, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<AppAlert>();

  //continue showing alert after navigation changed
    private keepAfterRouteChange = true;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    // subscribe to alerts
    getAlert(alertId?: string): Observable<any> {
        return this.subject.asObservable()
        .pipe(filter((x: AppAlert) => x && x.alertId === alertId))
    }

    // convenience methods
    success(message: string) {
        this.alert(new AppAlert({ message, type: AlertType.Success }));
    }

    error(message: string) {
        this.alert(new AppAlert({ message, type: AlertType.Error }));
    }

    info(message: string) {
        this.alert(new AppAlert({ message, type: AlertType.Info }));
    }

    warn(message: string) {
        this.alert(new AppAlert({ message, type: AlertType.Warning }));
    }

    // main alert method    
    alert(alert: AppAlert) {
        this.keepAfterRouteChange = alert.keepAfterRouteChange;
        this.subject.next(alert);
        this.clear();
    }

    // clear alerts
    clear(alertId?: string) {
        setTimeout(() => {
            this.subject.next(new AppAlert({ alertId }))
        }, 5000);
    }
}
