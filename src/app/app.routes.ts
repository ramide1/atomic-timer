import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadComponent: () => import('./tasks/tasks.page').then((m) => m.TasksPage),
  },
  {
    path: 'free-time-tasks',
    loadComponent: () => import('./free-time-tasks/free-time-tasks.page').then((m) => m.FreeTimeTasksPage),
  }
];