import { Component } from "@angular/core";

import { UserService } from "../@core/mock/user.service";
import { NbMenuItem } from "@nebular/theme";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu: NbMenuItem[] = []
  constructor(private _userService: UserService) {
    this.menu = this._userService.isUserAdmin()
      ? [
          {
            title: "Dashboard",
            icon: "home-outline",
            link: "/pages/dashboard",
          },
          {
            title: "FEATURES",
            group: true,
          },
          {
            title: "Gestion Tareas",
            icon: "layout-outline",
            children: [
              {
                title: "Administrar tareas",
                link: "/pages/dashboard",
              },
            ],
          },
          {
            title: "Usuarios",
            icon: "layout-outline",
            children: [
              {
                title: "Administrar usuarios",
                link: "/pages/users/manage",
              },
            ],
          },
        ]
      : [
          {
            title: "Dashboard",
            icon: "home-outline",
            link: "/pages/dashboard",
          },
          {
            title: "FEATURES",
            group: true,
          },
          {
            title: "Gestion Tareas",
            icon: "layout-outline",
            children: [
              {
                title: "Administrar tareas",
                link: "/pages/dashboard",
              },
            ],
          },
        ];
  }
}
