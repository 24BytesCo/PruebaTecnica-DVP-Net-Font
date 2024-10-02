
import { WorkTaskService } from "../../@core/mock/work-task.service";
import {
  TaskToShowInViewModel,
  WorkTaskModel,
} from "../../@core/data/work-task.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TypeAction } from "../../@core/data/action.enum";
import { UserService } from "../../@core/mock/user.service";
import { TaskStateService } from "../../@core/mock/task-state.service";
import { TaskStatesResponse } from "../../@core/data/task-state.model";
import { UserReducerResponseDto } from "../../@core/data/user-model.interface";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { RoleService } from "../../@core/mock/role.service";
import { AllRolesResponseDto } from "../../@core/data/roles.model";

@Component({
  selector: "ngx-task",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  @ViewChild("content", { static: true }) content!: TemplateRef<any>;
  actionSelected: TypeAction;
  allWorkTask: WorkTaskModel[] = [];
  allTaskStates: TaskStatesResponse[] = [];
  allRoles: AllRolesResponseDto[] = [];
  workTaskSelected: WorkTaskModel = {
    Description: "",
    Title: "",
    UserAssignedObj: null,
    UserByCreatedObj: null,
    WorkTaskId: "",
    WorkTaskStateObj: null,
  };
  taskToShowInViewModel: TaskToShowInViewModel[] = [];
  form: FormGroup;
  isUserEmployed: boolean = false;
  isUserSupervisor: boolean = false;
  isUserAdmin: boolean = false;
  codeRoleUserLogued: string;
  users: UserReducerResponseDto[] = [];
  usersSelected: UserReducerResponseDto;
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number;
  searchQuery: string = "";

  constructor(
    private fb: FormBuilder,
    private _workTaskService: WorkTaskService,
    private modalService: NgbModal,
    private _userService: UserService,
    private _rolesService: RoleService
  ) {}

  ngOnInit(): void {
    this.isUserEmployed = this._userService.isUserEmployed();
    this.isUserSupervisor = this._userService.isUserSupervisor();
    this.isUserAdmin = this._userService.isUserAdmin();
    this.codeRoleUserLogued = this._userService.getCodeUserLogued();

    this.validateActions();

    this.getAllRoles();

  }

  getAllUser() {
    this._userService.getAllUsersReducer(this.currentPage, this.pageSize).subscribe((response) => {
      if (response.isSuccessful) {
        this.users = response.data;
        this.totalPages = Math.ceil(response.totalCount / this.pageSize); // Total de páginas
        this.transformDataFromAllUsers(this.users);
      }
    });
  }

  getAllRoles(){

    this._rolesService.getAllRoles().subscribe(response =>
      {
        if (response.isSuccessful) {
          this.allRoles = response.data;
        }
        
      });

  }

  validateActions() {

    if (this.searchQuery && this.searchQuery != "") {
      this.searchTasksDynamic(this.searchQuery);
    } else {
      this.getAllUser();
    }
  }

  transformDataFromAllUsers(allUsers: UserReducerResponseDto[]) {
    this.taskToShowInViewModel = [];
    
    allUsers.forEach((user) => {
      let taskForWiev: TaskToShowInViewModel = {
        iconClass: "nb-person",
        title: user.RoleCode,
        type: "primary",
        state: user.RoleName,
        taskId: user.UserId,
        userAsigned: user.FirstName + " " + user.LastName,
      };

      this.taskToShowInViewModel.push(taskForWiev);
    });
  }
  onSubmit() {}

  openModal(event: TaskToShowInViewModel) {
    this.actionSelected = TypeAction.Edit;
    this.usersSelected = this.users.find(
      (r) => r.UserId == event.taskId
    );
      this.modalService.open(this.content, { size: "lg" });
  }

  openNewModal() {
    this.actionSelected = TypeAction.Create;
    this.usersSelected = null;
    this.modalService.open(this.content, { size: "lg" });
  }

  onCloseModal(event: boolean) {
    if (event) {
      this.modalService.dismissAll(); // Close modal when task is completed
    }
  }

  reloadTask(event: boolean) {

    if (event) {
      this.validateActions();
    }
  }

  // Método para cambiar de página
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.validateActions();
    }
  }

  onSearch(event: any) {

    if (event && event.length > 2) {
      this.searchTasksDynamic(event);
    } else if (event == "") {
      this.currentPage = 1;
      this.validateActions();
    }
  }

  searchTasksDynamic(query: string) {
    this._userService
      .searchTasksDynamic(query, this.currentPage, this.pageSize)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.users = response.data;
          this.totalPages = Math.ceil(response.totalCount / this.pageSize); // Total de páginas
          this.transformDataFromAllUsers(this.users);
        }

      });
  }
}
