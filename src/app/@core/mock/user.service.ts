import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import * as cryptoJs from "crypto-js"; // Importamos la librería de encriptación
import { environment } from "../../../environments/environment";
import { RoleUserModel, UserModel, UserReducerResponseDto } from "../data/user-model.interface";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "../data/api-response.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userSubject: BehaviorSubject<any | null>;
  public user: UserModel;
  private secretKey = environment.secretKey;
  private userKey = environment.userKey;

  constructor(private _http: HttpClient) {
    const storedUser = sessionStorage.getItem(this.userKey);
    const decryptedUser = storedUser ? this.decryptData(storedUser) : null;
    this.userSubject = new BehaviorSubject(decryptedUser);
    this.user = decryptedUser;
  }

  // Método para guardar los datos del usuario encriptados en sessionStorage
  setUser(userData: UserModel) {
    console.log("userData 000", userData);

    const encryptedData = this.encryptData(userData);
    sessionStorage.setItem(this.userKey, encryptedData);

    this.user = userData;
    console.log("encryptedData", encryptedData);
  }

  // Método para obtener los datos del usuario desencriptados
  getUser(): UserModel | null {
    return this.user;
  }

  getUserRole(): RoleUserModel {
    const role: RoleUserModel = {
      id: this.user.RoleId,
      code: this.user.RoleCode,
      name: this.user.RoleName,
    };

    return role;
  }
  getCodeUserLogued(){
    return this.user?.RoleCode?? null;
  }

  getNameCompleted(){
    return this.user.FirstName + " "+ this.user.LastName;
  }

  isUserAdmin()
  {
    return this.user.RoleCode == "ADMIN";
  }

  isUserEmployed()
  {
    return this.user.RoleCode == "EMP";
  }

  isUserSupervisor()
  {
    return this.user.RoleCode == "SUPV";
  }

  getUserToken(): string | null {
    const storedUser = sessionStorage.getItem(this.userKey);
    if (!storedUser) {
      return null;
    }

    return  this.decryptData(storedUser)?.Token;
  }

  // Método para borrar los datos del usuario (logout)
  clearUser() {
    sessionStorage.removeItem(this.userKey);
    this.userSubject.next(null);
    this.user = 
    {
      Email:'',
      FirstName:'',
      LastName:'',
      RoleCode:'',
      RoleId:'',
      RoleName:'',
      Token:'',
      UserId:''
    };
  }

  // Encriptar los datos antes de almacenarlos
  private encryptData(data: UserModel): string {
    try {
      return cryptoJs.AES.encrypt(
        JSON.stringify(data),
        this.secretKey
      ).toString();
    } catch (e) {
      console.error("Error al encriptar los datos", e);
      return "";
    }
  }

  // Desencriptar los datos antes de utilizarlos
  private decryptData(data: string): any {
    try {
      const bytes = cryptoJs.AES.decrypt(data, this.secretKey);
      
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
      }
      return null;
    } catch (e) {
      console.error("Error al desencriptar los datos", e);
      return null;
    }
  }

  getAllUsersReducer(page = 1, pageSize = 6):Observable<ApiResponse<UserReducerResponseDto[]>> {
    return this._http.get<ApiResponse<any>>(`user/getAllUsersReducer?page=${page}&pageSize=${pageSize}`);
  }

  
  searchTasksDynamic(query:string, page = 1, pageSize = 6):Observable<ApiResponse<UserReducerResponseDto[]>> {
    return this._http.get<ApiResponse<UserReducerResponseDto[]>>(`auth/SearchUsersDynamic?query=${query}&page=${page}&pageSize=${pageSize}`);
  }

  deleteUser(id:string):Observable<ApiResponse<boolean>> {
    return this._http.delete<ApiResponse<boolean>>(`auth/${id}`);
  }
}
