import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  CreateWorkTaskRequest,
  WorkTaskModel,
  WorkTaskUpdateRequest,
} from "../../@core/data/work-task.model";
import { UserService } from "../../@core/mock/user.service";
import { TypeAction } from "../../@core/data/action.enum";
import { UserReducerResponseDto } from "../../@core/data/user-model.interface";
import { TaskStatesResponse } from "../../@core/data/task-state.model";
import { ToastService } from "../../@core/mock/toast.service";
import { WorkTaskService } from "../../@core/mock/work-task.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-app-form-work-task",
  templateUrl: "./form-work-task.component.html",
  styleUrls: ["./form-work-task.component.scss"],
})
export class FormWorkTaskComponent implements OnInit {
  @Input() workTaskData: WorkTaskModel;
  @Input() allTaskStates: TaskStatesResponse[];
  @Input() users: UserReducerResponseDto[];
  @Input() action: TypeAction;
  @Output() closeModal = new EventEmitter<boolean>(); // Output event
  @Output() reloadTask = new EventEmitter<boolean>();

  @ViewChild("confirmDelete", { static: true }) content!: TemplateRef<any>;

  taskForm: FormGroup;
  codeRoleUserLogued: string;
  isUserEmployed: boolean = false;
  isUserSupervisor: boolean = false;
  isUserAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _toastService: ToastService,
    private _worktaskService: WorkTaskService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.isUserEmployed = this._userService.isUserEmployed();
    this.isUserSupervisor = this._userService.isUserSupervisor();
    this.isUserAdmin = this._userService.isUserAdmin();
    this.codeRoleUserLogued = this._userService.getCodeUserLogued();

    this.assignValuesToUserEmployed();
    this.initForm();
    this.turnPropertiesOnOrOff();
    this.assignValuesToForm();
  }

  assignValuesToUserEmployed() {
    if (
      (!this.users && this.workTaskData) ||
      (this.users.length == 0 && this.workTaskData)
    ) {
      let userReducerResponseDto: UserReducerResponseDto = {
        UserId: this.workTaskData.UserAssignedObj.UserId,
        FirstName: this.workTaskData.UserAssignedObj.FirstName,
        LastName: this.workTaskData.UserAssignedObj.LastName,
        RoleCode: "",
        RoleId: this.workTaskData.UserAssignedObj.RoleId,
        RoleName: this.workTaskData.UserAssignedObj.RoleName,
      };
      this.users.push(userReducerResponseDto);
    }
  }

  initForm() {
    // Inicializamos el formulario reactivo
    this.taskForm = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      assignedUser: [null, Validators.required],
      taskStatus: [null, Validators.required],
      createdBy: [""],
    });
  }

  assignValuesToForm() {
    if (this.workTaskData) {
      this.taskForm.patchValue({
        title: this.workTaskData.Title,
        description: this.workTaskData.Description,
        createdBy: this.workTaskData.UserByCreatedObj.NameCompleted,
        taskStatus: this.workTaskData.WorkTaskStateObj.WorkTaskStateId,
        assignedUser: this.workTaskData.UserAssignedObj.UserId,
      });
    }

    if (this.action == TypeAction.Create) {
      this.taskForm.patchValue({
        createdBy: this._userService.getNameCompleted(),
        taskStatus: this.allTaskStates.find((r) => r.TaskStateCode == "PEN")
          ?.TaskStateId,
      });
    }

    if (this.action == TypeAction.Create && this.isUserEmployed) {
      this._toastService.showErrorToast(
        "error",
        "No está autorizado para crear tareas"
      );
      this.closeModal.emit(true);
    }
    if (this.action == TypeAction.Create && this.isUserSupervisor) {
      this._toastService.showErrorToast(
        "error",
        "No está autorizado para crear tareas"
      );
      this.closeModal.emit(true);
    }
  }

  turnPropertiesOnOrOff() {
    if (this.isUserEmployed) {
      this.taskForm.get("title")?.disable();
      this.taskForm.get("description")?.disable();
      this.taskForm.get("assignedUser")?.disable();
    } else if (this.isUserSupervisor) {
      this.taskForm.get("title")?.disable();
      this.taskForm.get("description")?.disable();
    }

    if (this.action == TypeAction.Create) {
      this.taskForm.get("taskStatus")?.disable();
    }
    this.taskForm.get("createdBy")?.disable();
  }

  onSubmit() {
    if (this.taskForm.valid && this.action === TypeAction.Create) {
      console.log(this.taskForm.value);
      const createWorkTaskRequest: CreateWorkTaskRequest = {
        name: this.taskForm.get("title").value,
        description: this.taskForm.get("description").value,
        userAssignedId: this.taskForm.get("assignedUser").value,
      };

      this._worktaskService
        .createNewWorktask(createWorkTaskRequest)
        .subscribe((response) => {
          if (response.isSuccessful) {
            this.closeModal.emit(true);
            this.reloadTask.emit(true);
          }
          console.log("response create", response);
        });
    } else if (this.taskForm.valid && this.action === TypeAction.Edit) {
      if (this.isUserSupervisor || this.isUserAdmin) {
        this.updateTaskNotEmployed();
      }else{
        this.updatetaskEmployed();
      }
    }
    {
      console.log("Formulario no válido");
    }
  }

  updatetaskEmployed(){
    const workTaskUpdateRequest: WorkTaskUpdateRequest = {
      Title: this.taskForm.get("title").value,
      description: this.taskForm.get("description").value,
      newUserAssignedId: this.taskForm.get("assignedUser").value,
      newWorkTaskStateId: this.taskForm.get("taskStatus").value,
    };

    this._worktaskService
      .updateWorktaskEmployed(workTaskUpdateRequest, this.workTaskData.WorkTaskId)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.closeModal.emit(true);
          this.reloadTask.emit(true);
        }
        console.log("response edit", response);
      });
  }

  updateTaskNotEmployed (){
    const workTaskUpdateRequest: WorkTaskUpdateRequest = {
      Title: this.taskForm.get("title").value,
      description: this.taskForm.get("description").value,
      newUserAssignedId: this.taskForm.get("assignedUser").value,
      newWorkTaskStateId: this.taskForm.get("taskStatus").value,
    };

    this._worktaskService
      .updateWorktask(workTaskUpdateRequest, this.workTaskData.WorkTaskId)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.closeModal.emit(true);
          this.reloadTask.emit(true);
        }
        console.log("response edit", response);
      });
  }

  openDeleteModal() {
    this.modalService.open(this.content, { size: "lg" });
  }

  onCloseModal(event: boolean) {
    if (event) {
      this.modalService.dismissAll(); // Close modal when task is completed
    }
  }
  
  onClickDeleteTask() {
    this._worktaskService
      .deleteWorkTask(this.workTaskData.WorkTaskId)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.modalService.dismissAll(this.content);
          this.closeModal.emit(true);
          this.reloadTask.emit(true);
        }
      });
  }
}
