import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../data/api-response.interface';
import { UserService } from './user.service';
import { CreateWorkTaskRequest, WorkTaskModel, WorkTaskUpdateRequest } from '../data/work-task.model';

@Injectable({
  providedIn: 'root',
})
export class WorkTaskService {
  constructor(private _http: HttpClient, private _userService: UserService) {}

  getAllWorkTask(page = 1, pageSize = 6):Observable<ApiResponse<WorkTaskModel[]>> {
    return this._http.get<ApiResponse<any>>(`task/all?page=${page}&pageSize=${pageSize}`);
  }

  searchTasksDynamic(query:string,page = 1, pageSize = 6):Observable<ApiResponse<WorkTaskModel[]>> {
    return this._http.get<ApiResponse<any>>(`task/searchTasksDynamic?query=${query}&page=${page}&pageSize=${pageSize}`);
  }

  getAllMyWorkTask(page = 1, pageSize = 6):Observable<ApiResponse<WorkTaskModel[]>> {
    return this._http.get<ApiResponse<any>>(`task/GetAllAssignedToMe?page=${page}&pageSize=${pageSize}`);
  }

  deleteWorkTask(id: string):Observable<ApiResponse<boolean>> {
    return this._http.delete<ApiResponse<any>>("Task/"+id);
  }


  createNewWorktask(body: CreateWorkTaskRequest):Observable<ApiResponse<boolean>> {
    return this._http.post<ApiResponse<any>>("task/create", body);
  }

  updateWorktask(body: WorkTaskUpdateRequest, id:string):Observable<ApiResponse<boolean>> {
    return this._http.put<ApiResponse<any>>("task/"+id, body);
  }
  updateWorktaskEmployed(body: WorkTaskUpdateRequest, id:string):Observable<ApiResponse<boolean>> {
    return this._http.put<ApiResponse<any>>("task/"+id+"/updateTaskState", body);
  }
}
