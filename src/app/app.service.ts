import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert } from './general-interfaces';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  alerts: Alert[] = [];

  newAlert(alert: Alert) {
    this.alerts.push(alert);
  }

  alertDismiss(index: number) {
    this.alerts.splice(index, 1);
  }
  
}
