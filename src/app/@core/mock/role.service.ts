import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../data/api-response.interface';
import { UserService } from './user.service';
import { AllRolesResponseDto } from '../data/roles.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private _http: HttpClient) {}

  getAllRoles():Observable<ApiResponse<AllRolesResponseDto[]>> {
    return this._http.get<ApiResponse<AllRolesResponseDto[]>>("role/all");
  }
}
