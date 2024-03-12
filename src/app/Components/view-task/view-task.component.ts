import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TaskService } from '../../Services/task.service';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../Models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { map, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../Models/task.model';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent implements OnInit {

  priorities: string[] = ['as planned', 'at risk', 'lagging'];
  executorsList: User[] = [
    {name: 'Monica', email: 'mon_ika78@mail.ru'},
    {name: 'Alex', email: 'alex222@mail.ru'},
    {name: 'Bob', email: 'fun_bob33@mail.ru'}
  ];

  taskForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    executors: new FormControl([], Validators.required),
    description: new FormControl('')
  });

  id: number = this.route.snapshot.params['id']!;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(!this.id) {
      return;
    }

    this.getTask();
  }
  
  saveTask() {
    if (this.taskForm.status !== 'VALID') {
      return;
    }

    if (this.id) {
      return this.updateTask();
    }

    this.taskService.saveTask(this.taskForm.value).pipe(take(1)).subscribe(() => this.router.navigate(['']));
  }

  updateTask() {
    this.taskService.saveTask(this.taskForm.value, this.id).pipe(take(1)).subscribe(() => this.router.navigate(['']));
  }

  getTask() {
    this.taskService.getTask(this.id).pipe(take(1)).subscribe(task => this.taskForm.patchValue(task));
  }

}
