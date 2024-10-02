import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../data/api-response.interface';
import { UserService } from './user.service';
import { CreateUserRequest, UpdateUserRequest, UserResponseDto } from '../data/user-model.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private _userService: UserService) {}

  isLoggedIn(): boolean {
    if (this._userService.getUserToken()) {
      return true;
    }
    return false;
  }

  login(email: string, password: string): Observable<ApiResponse<any>> {
    return this._http.post<ApiResponse<any>>("Auth/login", { email, password });
  }

  registerNewUser(createUserRequest: CreateUserRequest  ): Observable<ApiResponse<UserResponseDto>> {
    return this._http.post<ApiResponse<UserResponseDto>>("auth/register", createUserRequest);
  }

  updateUser(updateUserRequest: UpdateUserRequest  ): Observable<ApiResponse<boolean>> {
    return this._http.post<ApiResponse<boolean>>("auth/updateUser", updateUserRequest);
  }

  logout():Observable<ApiResponse<any>> {
    return this._http.post<ApiResponse<any>>("Auth/logout", {});
  }
}
