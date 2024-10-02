import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../@core/mock/auth.service";
import { UserService } from "../../@core/mock/user.service";

@Component({
  selector: "ngx-app-login-",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(
    private _authService: AuthService, 
    private _router: Router,
    private _userService: UserService 
  
  ) {}

  onSubmit() {
    if (this.email && this.password) {
      this._authService
        .login(this.email, this.password)
        .subscribe((response) => {
          if (response.isSuccessful) {
            this._userService.setUser(response.data)
            console.log("response", response);
            
            // Redirige al dashboard después del login exitoso
            this._router.navigate(["/dashboard"]);
          }
        });
    }
  }
}
