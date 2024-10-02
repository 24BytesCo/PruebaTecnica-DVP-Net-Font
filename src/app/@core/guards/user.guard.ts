import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../mock/auth.service';
import { UserService } from '../mock/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private _userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this._userService.isUserAdmin()) {
        return true; // El usuario está logueado, se permite el acceso
      } else {
        // Redirigir al login si no está autenticado
        this.router.navigate(['/pages/dashboard']);
        return false; // No se permite el acceso
      }
  }
  
}
