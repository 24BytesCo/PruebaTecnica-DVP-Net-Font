export interface WorkTaskModel {
    WorkTaskId: string;
    Title: string;
    Description: string;
    UserAssignedObj: UserWorkTask;
    UserByCreatedObj: UserWorkTask;
    WorkTaskStateObj: WorkTaskStateModel;
  }
  
  export interface UserWorkTask {
    UserId: string;
    FirstName: string;
    LastName: string;
    NameCompleted: string;
    RoleId: string;
    RoleName: string;
  }
  
  export interface WorkTaskStateModel {
    WorkTaskStateId: string;
    Code: string;
    Name: string;
    Description: string;
  }

  export interface TaskToShowInViewModel {
    title: string;
    iconClass: string;
    type: string;
    state: string;
    taskId: string;
    userAsigned: string
  }
  
  export interface CreateWorkTaskRequest {
    name: string;
    description: string;
    userAssignedId: string;
  }
  
  export interface WorkTaskUpdateRequest {
    Title: string;
    description: string | null;
    newUserAssignedId: string;
    newWorkTaskStateId: string;
  }
  