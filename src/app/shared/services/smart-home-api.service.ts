import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  DashboardDto,
  LoginRequestDto,
  LoginResponseDto,
  SideBarItemDto,
  UserProfileResponseDto,
} from './smart-home-api.models';
import { LoginData, UserProfile } from '../models/user.models';
import { Dashboard } from '../models/dashboard.models';
import { SideBarItem } from '../models/sidebar.models';

const BASE_URL = 'http://localhost:3004';

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

    return this.http.post<LoginResponseDto>(`${BASE_URL}/api/user/login`, body);
  }

  getUser(): Observable<UserProfile> {
    return this.http.get<UserProfileResponseDto>(`${BASE_URL}/api/user/profile`);
  }

  getDashboards(): Observable<SideBarItem[]> {
    return this.http.get<SideBarItemDto[]>(`${BASE_URL}/api/user/dashboards`);
  }

  getDashboard(dashboardId: string): Observable<Dashboard> {
    return this.http.get<DashboardDto>(`${BASE_URL}/api/dashboards/${dashboardId}`).pipe(
      map((dashboardDto) => {
        return { ...dashboardDto, id: dashboardId };
      }),
    );
  }
}
