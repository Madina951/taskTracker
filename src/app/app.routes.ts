import { Routes } from '@angular/router';
import { TasksComponent } from './Components/tasks/tasks.component';
import { ViewTaskComponent } from './Components/view-task/view-task.component';

export const routes: Routes = [
    {path: '', component: TasksComponent},
    {path: 'task-info', component: ViewTaskComponent},
    {path: 'task-info/:id', component: ViewTaskComponent}
];
