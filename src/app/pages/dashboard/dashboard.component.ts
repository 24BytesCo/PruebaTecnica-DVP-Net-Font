import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from "@angular/core";
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

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  @ViewChild("content", { static: true }) content!: TemplateRef<any>;
  actionSelected: TypeAction;
  allWorkTask: WorkTaskModel[] = [];
  allTaskStates: TaskStatesResponse[] = [];
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
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number;
  searchQuery: string = "";

  constructor(
    private fb: FormBuilder,
    private _workTaskService: WorkTaskService,
    private modalService: NgbModal,
    private _userService: UserService,
    private _taskStateService: TaskStateService
  ) {}

  ngOnInit(): void {
    this.isUserEmployed = this._userService.isUserEmployed();
    this.isUserSupervisor = this._userService.isUserSupervisor();
    this.isUserAdmin = this._userService.isUserAdmin();
    this.codeRoleUserLogued = this._userService.getCodeUserLogued();

    this.validateActions();
    this.initForm();
    this.getAllStates();

    if (!this.isUserEmployed) {
      this._userService.getAllUsersReducer().subscribe((response) => {
        if (response.isSuccessful) {
          this.users = response.data;
        }
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  getAllStates() {
    this._taskStateService.allTaskState().subscribe((response) => {
      if (response.isSuccessful) {
        this.allTaskStates = [...response.data];
        console.log("this.allTaskStates", this.allTaskStates);
      }
    });
  }

  validateActions() {
    console.log("this.searchQuery", this.searchQuery);

    if (this.isUserEmployed) {
      this.getAllMyWorkTask();
    } else {
      if (this.searchQuery && this.searchQuery != "") {
        this.searchTasksDynamic(this.searchQuery);
      } else {
        this.getAllWorkTask();
      }
    }
  }

  getAllStatesTask() {}

  getAllWorkTask() {
    this._workTaskService
      .getAllWorkTask(this.currentPage, this.pageSize)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.allWorkTask = [];
          this.allWorkTask = [...response.data];
          console.log("allMyWorkTask", this.allWorkTask);
          this.totalPages = Math.ceil(response.totalCount / this.pageSize); // Total de páginas
          console.log("pageSize", this.pageSize);
          console.log("response.totalCount", response.totalCount);
          console.log("totalPages", this.totalPages);

          this.transformDataFromAlltasks(this.allWorkTask);
        }
      });
  }

  getAllMyWorkTask() {
    this._workTaskService
      .getAllMyWorkTask(this.currentPage, this.pageSize)
      .subscribe((response) => {
        if (response.isSuccessful) {
          console.log("allTask", response);
          this.allWorkTask = response.data;
          console.log("allWorkTask", this.allWorkTask);

          this.totalPages = Math.ceil(response.totalCount / this.pageSize); // Total de páginas

console.log("totalPages", this.totalPages);

          this.transformDataFromAlltasks(this.allWorkTask);
        }
      });
  }

  transformDataFromAlltasks(allTask: WorkTaskModel[]) {
    this.taskToShowInViewModel = [];
    allTask.forEach((task) => {
      let taskForWiev: TaskToShowInViewModel = {
        iconClass: "",
        title: "",
        type: "",
        state: "",
        taskId: "",
        userAsigned: "",
      };

      if (task.WorkTaskStateObj.Code == "PEN") {
        taskForWiev.type = "danger";
        taskForWiev.title = task.Title;
        taskForWiev.iconClass = "nb-flame-circled";
      } else if (task.WorkTaskStateObj.Code == "ENPRO") {
        taskForWiev.type = "info";
        taskForWiev.title = task.Title;
        taskForWiev.iconClass = "nb-compose";
      } else {
        taskForWiev.type = "success";
        taskForWiev.title = task.Title;
        taskForWiev.iconClass = "nb-checkmark-circle";
      }
      taskForWiev.state = task.WorkTaskStateObj.Name;
      taskForWiev.taskId = task.WorkTaskId;
      taskForWiev.userAsigned =
        task.UserAssignedObj.FirstName + " " + task.UserAssignedObj.LastName;
      this.taskToShowInViewModel.push(taskForWiev);
    });
  }
  onSubmit() {}

  openModal(event: TaskToShowInViewModel) {
    console.log("event", event);
    this.actionSelected = TypeAction.Edit;
    this.workTaskSelected = this.allWorkTask.find(
      (r) => r.WorkTaskId == event.taskId
    );
    console.log("workTaskSelected 00", this.workTaskSelected);
    console.log("allTaskStates", this.allTaskStates);
    setTimeout(() => {
      this.modalService.open(this.content, { size: "lg" });
    }, 0); // Retraso mínimo
  }

  openNewModal() {
    this.actionSelected = TypeAction.Create;
    this.workTaskSelected = null;
    console.log("workTaskSelected 00", this.workTaskSelected);

    this.modalService.open(this.content, { size: "lg" });
  }

  onCloseModal(event: boolean) {
    if (event) {
      this.modalService.dismissAll(); // Close modal when task is completed
    }
  }

  reloadTask(event: boolean) {
    console.log("reload", event);

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
    console.log("event", event);

    if (event && event.length > 2) {
      this.searchTasksDynamic(event);
      console.log("Buscando");
    } else if (event == '') {
      this.currentPage = 1;
      this.validateActions();
    } 
  }

  searchTasksDynamic(query: string) {
    this._workTaskService
      .searchTasksDynamic(query, this.currentPage, this.pageSize)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.allWorkTask = response.data;
          this.totalPages = Math.ceil(response.totalCount / this.pageSize); // Total de páginas
          this.transformDataFromAlltasks(this.allWorkTask);
        }

        console.log("response filter", response);
      });
  }
}
