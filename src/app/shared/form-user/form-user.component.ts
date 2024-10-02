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
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import {
  CreateWorkTaskRequest,
  WorkTaskModel,
  WorkTaskUpdateRequest,
} from "../../@core/data/work-task.model";
import { UserService } from "../../@core/mock/user.service";
import { TypeAction } from "../../@core/data/action.enum";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserReducerResponseDto,
} from "../../@core/data/user-model.interface";
import { TaskStatesResponse } from "../../@core/data/task-state.model";
import { ToastService } from "../../@core/mock/toast.service";
import { WorkTaskService } from "../../@core/mock/work-task.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AllRolesResponseDto } from "../../@core/data/roles.model";
import { Observable } from "rxjs";
import { AuthService } from "../../@core/mock/auth.service";

@Component({
  selector: "ngx-form-user",
  templateUrl: "./form-user.component.html",
  styleUrls: ["./form-user.component.scss"],
})
export class FormUserComponent implements OnInit {
  @Input() allRoles: AllRolesResponseDto[] = [];
  @Input() allTaskStates: TaskStatesResponse[];
  @Input() users: UserReducerResponseDto[];
  @Input() usersSelected: UserReducerResponseDto;
  @Input() action: TypeAction;
  @Output() closeModal = new EventEmitter<boolean>(); // Output event
  @Output() reloadTask = new EventEmitter<boolean>();

  @ViewChild("confirmDelete", { static: true }) content!: TemplateRef<any>;

  userForm: FormGroup;
  codeRoleUserLogued: string;
  isUserEmployed: boolean = false;
  isUserSupervisor: boolean = false;
  isUserAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _worktaskService: WorkTaskService,
    private modalService: NgbModal,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isUserEmployed = this._userService.isUserEmployed();
    this.isUserSupervisor = this._userService.isUserSupervisor();
    this.isUserAdmin = this._userService.isUserAdmin();
    this.codeRoleUserLogued = this._userService.getCodeUserLogued();

    this.initForm();
  }

  initForm() {
    if (this.action == TypeAction.Create) {
      this.userForm = this.fb.group({
        firsName: ["", [Validators.required, Validators.maxLength(50)]],
        lastName: ["", [ Validators.maxLength(50)]],
        emailUser: ["", [Validators.required, Validators.email]],
        password: [null, Validators.required],
        roleUser: [null, Validators.required],
      });
    } else {
      this.userForm = this.fb.group({
        firsName: ["", [Validators.required, Validators.maxLength(50)]],
        lastName: ["", [Validators.maxLength(50)]],
        emailUser: ["", [Validators.required, Validators.email]],
        roleUser: ["", Validators.required],
      });
    }

    if (this.action === TypeAction.Edit) {
      this.userForm.get('emailUser').disable();
    }
    this.assignValuesToForm();
  }

  emailAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return null;
    };
  }

  assignValuesToForm() {
    if (this.action !== TypeAction.Create) {
      this.userForm.patchValue({
        firsName: this.usersSelected.FirstName,
        lastName: this.usersSelected.LastName,
        emailUser: this.usersSelected.Email,
        roleUser: this.usersSelected.RoleId,
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid && this.action === TypeAction.Create) {
      this.createNewUser();
    } else if (this.userForm.valid && this.action === TypeAction.Edit) {
      this.updateUser();
    }
    {
    }
  }

  createNewUser() {
    const createUserRequest: CreateUserRequest = {
      firstName: this.userForm.get("firsName").value,
      lastName: this.userForm.get("lastName").value,
      email: this.userForm.get("emailUser").value,
      password: this.userForm.get("password").value,
      roleId: this.userForm.get("roleUser").value,
    };

    this._authService
      .registerNewUser(createUserRequest)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.closeModal.emit(true);
          this.reloadTask.emit(true);
        }
      });
  }

  updateUser() {
    let updateUserRequest: UpdateUserRequest = {
      firstName: this.userForm.get("firsName").value,
      lastName: this.userForm.get("lastName").value,
      roleId: this.userForm.get("roleUser").value,
      userId: this.usersSelected.UserId,
    };

    this._authService.updateUser(updateUserRequest).subscribe((response) => {
      if (response.isSuccessful) {
        this.closeModal.emit(true);
        this.reloadTask.emit(true);
      }
    });
  }

  openDeleteModal() {
    this.modalService.open(this.content, { size: "lg" });
  }

  onCloseModal(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
    }
  }

  onClickDeleteUser() {
    this._userService
      .deleteUser(this.usersSelected.UserId)
      .subscribe((response) => {
        if (response.isSuccessful) {
          this.modalService.dismissAll(this.content);
          this.closeModal.emit(true);
          this.reloadTask.emit(true);
        }
      });
  }
}
