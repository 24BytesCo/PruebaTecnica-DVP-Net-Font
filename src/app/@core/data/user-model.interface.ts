export interface UserModel {
  UserId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Token: string;
  RoleName: string;
  RoleId: string;
  RoleCode: string;
}

export interface RoleUserModel {
  id: string;
  name: string;
  code: string;
}
export interface UserReducerResponseDto {
  UserId: string;
  FirstName: string;
  LastName: string;
  RoleName: string;
  RoleId: string;
  RoleCode: string;
  Email?: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
}

export interface UserResponseDto {
  userId?: string;  
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
  roleName?: string;
  roleId?: string;
  roleCode?: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string | null;
  roleId: string;
  userId: string;
}

