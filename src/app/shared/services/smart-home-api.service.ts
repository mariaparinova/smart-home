import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  DashboardDto,
  DeviceDto,
  LoginRequestDto,
  LoginResponseDto,
  SensorDto,
  SideBarItemDto,
  UserProfileResponseDto,
} from './smart-home-api.models';
import { LoginData, UserProfile } from '../models/user.models';
import { Dashboard, Device, Sensor, SideBarItem } from '../models/dashboard.models';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root',
})
export class SmartHomeApiService {
  private http = inject(HttpClient);
  private apiUrlService = inject(ApiUrlService);

  getToken(userData: { userName: string; password: string }): Observable<LoginData> {
    const { userName, password } = userData;

    const body: LoginRequestDto = {
      userName,
      password,
    };

    return this.http.post<LoginResponseDto>(
      `${this.apiUrlService.getApiBaseUrl()}/api/user/login`,
      body,
    );
  }

  getUser(): Observable<UserProfile> {
    return this.http.get<UserProfileResponseDto>(
      `${this.apiUrlService.getApiBaseUrl()}/api/user/profile`,
    );
  }

  getDashboards(): Observable<SideBarItem[]> {
    return this.http.get<SideBarItemDto[]>(
      `${this.apiUrlService.getApiBaseUrl()}/api/user/dashboards`,
    );
  }

  getDashboard(dashboardId: string): Observable<Dashboard> {
    return this.http
      .get<DashboardDto>(`${this.apiUrlService.getApiBaseUrl()}/api/dashboards/${dashboardId}`)
      .pipe(
        map((dashboardDto) => {
          return { ...dashboardDto, id: dashboardId };
        }),
      );
  }

  getDevices(): Observable<(Device | Sensor)[]> {
    return this.http.get<(DeviceDto | SensorDto)[]>(
      `${this.apiUrlService.getApiBaseUrl()}/api/devices`,
    );
  }

  updateDeviceState({
    deviceId,
    deviceState,
  }: {
    deviceId: string;
    deviceState: boolean;
  }): Observable<Device> {
    const body = { state: deviceState };
    return this.http.patch<DeviceDto>(
      `${this.apiUrlService.getApiBaseUrl()}/api/devices/${deviceId}`,
      body,
    );
  }

  createDashboard(dashboard: SideBarItem): Observable<SideBarItem> {
    return this.http.post<SideBarItemDto>(
      `${this.apiUrlService.getApiBaseUrl()}/api/dashboards`,
      dashboard,
    );
  }

  updateDashboard(dashboard: Dashboard): Observable<Dashboard> {
    const body = {
      tabs: dashboard.tabs,
    };

    return this.http
      .put<DashboardDto>(
        `${this.apiUrlService.getApiBaseUrl()}/api/dashboards/${dashboard.id}`,
        body,
      )
      .pipe(
        map((dashboardDto) => {
          return { ...dashboardDto, id: dashboard.id };
        }),
      );
  }

  deleteDashboard(dashboardId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrlService.getApiBaseUrl()}/api/dashboards/${dashboardId}`,
    );
  }
}
