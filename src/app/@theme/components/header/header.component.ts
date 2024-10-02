import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { AuthService } from "../../../@core/mock/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../../@core/mock/user.service";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any = {};

  currentTheme = "default";

  userMenu = [{ title: "Log out", id: 0 }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private layoutService: LayoutService,
    private _authService: AuthService,
    private _userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // Aquí suscribimos al clic del menú de usuario
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: { tag: string; item: any }) => {
        if (event.item.id === 0) {
          this.logout();
        }
      });

      this.user.name = this._userService.getNameCompleted();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this._authService.logout().subscribe((r) => {
      if (r.isSuccessful) {
        this._userService.clearUser();
        this.router.navigate(["/auth/login"]);
      }
    });
  }
}
