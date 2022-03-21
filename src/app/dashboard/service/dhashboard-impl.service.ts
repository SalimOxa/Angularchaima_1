import { Injectable } from '@angular/core';
import { Service } from '../model/service';
import { LIST_SERVICES_TD } from '../TestData/Student-Test-Data';
import { DhashboardService } from './dhashboard.service';

@Injectable({
  providedIn: 'root'
})
export class DhashboardImplService{
  getServiceDashboard(): Promise<Service[]> {
    return Promise.resolve(LIST_SERVICES_TD);
  }

  constructor() { }
}
