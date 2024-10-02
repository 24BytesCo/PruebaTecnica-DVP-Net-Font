import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../data/api-response.interface';
import { UserService } from './user.service';
import { TaskStatesResponse } from '../data/task-state.model';

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  constructor(private _http: HttpClient) {}

  allTaskState():Observable<ApiResponse<TaskStatesResponse[]>> {
    return this._http.get<ApiResponse<any>>("taskState/all");
  }
}
