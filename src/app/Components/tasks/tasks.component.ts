import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TaskService } from '../../Services/task.service';
import { Observable, defer, map } from 'rxjs';
import { Task } from '../../Models/task.model';
import { Filter, FilterStatus } from '../../Models/filter.model';
import { Sort } from '../../Models/sort.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../Models/user.model';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  providers: [TaskService]
})
export class TasksComponent{

  tasks$: Observable<Task[]> = defer(() => this.taskService.tasks$);
  filter$: Observable<Filter> = defer(() => this.taskService.filter$);
  sort$: Observable<Sort> = defer(() => this.taskService.sort$);
  init$: Observable<any> = defer(() => this.taskService.init$());

  headers: string[] = ['id', 'title', 'deadline', 'priority', 'executors'];
  executorsList: User[] = [
    {name: 'Monica', email: 'mon_ika78@mail.ru'},
    {name: 'Alex', email: 'alex222@mail.ru'},
    {name: 'Bob', email: 'fun_bob33@mail.ru'}
  ];
  priorities: string[] = ['as planned', 'at risk', 'lagging'];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  createNewTask() {
    this.router.navigate(['task-info']);
  }

  viewTask(id: number) {
    this.router.navigate(['task-info/' + id]);
  }

  applyStatusFilter(status: FilterStatus) {
    this.taskService.priorityFilter$ = status;
    this.taskService.getTasks();
  }

  applyExecutorsFilter(executors: string[]) {
    this.taskService.executorsFilter$ = executors;
    this.taskService.getTasks();
  }

  applyDeadlineFilter(deadline: Date) {
    this.taskService.deadlineFilter$ = deadline;
    this.taskService.getTasks();
  }

  sortTasks(field: string) {
    this.taskService.sorting$ = field;
    this.taskService.getTasks();
  }

}