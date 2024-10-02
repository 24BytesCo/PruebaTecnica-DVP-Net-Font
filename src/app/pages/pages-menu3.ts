import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Gestion Tareas',
    icon: 'layout-outline',
    children: [
      {
        title: 'Administrar tareas',
        link: '/pages/dashboard',
      }
    ],
  }
  

];
