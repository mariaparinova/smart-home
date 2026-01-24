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
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SmartHomeApiService {
  private http = inject(HttpClient);

  getToken(userData: { userName: string; password: string }): Observable<LoginData> {
    const { userName, password } = userData;

    const body: LoginRequestDto = {
      userName,
      password,
    };

    return this.http.post<LoginResponseDto>(
      `${environment.smartHomeApiBaseUrl}/api/user/login`,
      body,
    );
  }

  getUser(): Observable<UserProfile> {
    return this.http.get<UserProfileResponseDto>(
      `${environment.smartHomeApiBaseUrl}/api/user/profile`,
    );
  }

  getDashboards(): Observable<SideBarItem[]> {
    return this.http.get<SideBarItemDto[]>(
      `${environment.smartHomeApiBaseUrl}/api/user/dashboards`,
    );
  }

  getDashboard(dashboardId: string): Observable<Dashboard> {
    return this.http
      .get<DashboardDto>(`${environment.smartHomeApiBaseUrl}/api/dashboards/${dashboardId}`)
      .pipe(
        map((dashboardDto) => {
          return { ...dashboardDto, id: dashboardId };
        }),
      );
  }

  getDevices(): Observable<(Device | Sensor)[]> {
    return this.http.get<(DeviceDto | SensorDto)[]>(
      `${environment.smartHomeApiBaseUrl}/api/devices`,
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
      `${environment.smartHomeApiBaseUrl}/api/devices/${deviceId}`,
      body,
    );
  }

  createDashboard(dashboard: SideBarItem): Observable<SideBarItem> {
    return this.http.post<SideBarItemDto>(
      `${environment.smartHomeApiBaseUrl}/api/dashboards`,
      dashboard,
    );
  }

  updateDashboard(dashboard: Dashboard): Observable<Dashboard> {
    const body = {
      tabs: dashboard.tabs,
    };

    return this.http
      .put<DashboardDto>(`${environment.smartHomeApiBaseUrl}/api/dashboards/${dashboard.id}`, body)
      .pipe(
        map((dashboardDto) => {
          return { ...dashboardDto, id: dashboard.id };
        }),
      );
  }

  deleteDashboard(dashboardId: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.smartHomeApiBaseUrl}/api/dashboards/${dashboardId}`,
    );
  }
}
