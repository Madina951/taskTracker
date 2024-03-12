import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, shareReplay, switchMap, tap } from 'rxjs';
import { Task } from '../Models/task.model';
import { Filter } from '../Models/filter.model';
import { Sort } from '../Models/sort.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks$$ = new BehaviorSubject<Task[]>([]);
  private filter$$ = new BehaviorSubject<Filter>(this.getDefaultFilter());
  private sort$$ = new BehaviorSubject<Sort>(this.getDefaultSort());

  constructor(
    private http: HttpService
  ) { }

  get tasks$() {
    return this.tasks$$.asObservable().pipe(shareReplay());
  }

  get filter$() {
    return this.filter$$.asObservable();
  }

  get sort$() {
    return this.sort$$.asObservable();
  }

  set deadlineFilter$(deadline: Date) {
    this.filter$$.next({...this.filter$$.getValue(), deadline});
  }

  set priorityFilter$(status: 'as planned'|'at risk'|'lagging'|'') {
    this.filter$$.next({...this.filter$$.getValue(), status});
  }

  set executorsFilter$(executors: string[]) {
    this.filter$$.next({...this.filter$$.getValue(), executors});
  }

  set sorting$(field: string) {
    const oldField = this.sort$$.getValue().field;
    const oldOrder = this.sort$$.getValue().order;
    
    if (field === oldField && oldOrder === 'ASC') {
      this.sort$$.next({field: field, order: 'DESC'});
    } else {
      this.sort$$.next({field: field, order: 'ASC'});
    }
  }

  init$(): Observable<any> {
    return this.getTasks();
  }

  getDefaultFilter(): Filter {
    return {
      status: '',
      executors: [],
      deadline: new Date()
    };
  }

  getDefaultSort(): Sort {
    return {
      field: 'id',
      order: 'ASC'
    };
  }

  getTasks() {
    return combineLatest([this.filter$$, this.sort$$]).pipe(
      switchMap(([filter, sort]) => this.loadTasks({filter, sort})),
      tap((tasks) => this.tasks$$.next(tasks))
    );
  }

  loadTasks(p: {filter: Filter, sort: Sort}) {
    const params = {
      filter: JSON.stringify(p.filter),
      sort: JSON.stringify(p.sort)
    };
    
    return this.http.get<Task[]>('api/tasks', params);
  }

  saveTask(task: Task, id?: number) {
    return this.http.post<Task>('api/task', task, {id: id});
  }

  getTask(id: number) {
    return this.http.get<Task>('api/task/' + id, {id: id});
  }

  // filterTask(filter: Filter) {
  //   return this.http.get('api/task', {filter: filter});
  // }

}
