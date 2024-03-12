import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, filter, map, of } from "rxjs";
import { Task } from "../Models/task.model";
import { Filter } from "../Models/filter.model";
import { Sort } from "../Models/sort.model";
import { crossingArrays } from "../Utils/array.util";


export class FakeBackend {
    tasks: Task[] = JSON.parse(localStorage.getItem('tasks')!) || [];

    getTasks$(request: {filter: Filter, sort: Sort}): Observable<HttpResponse<Task[]>> {
        const headers = new HttpHeaders();

        if (!this.tasks) {
            return of([]).pipe(
                map(tasks => this.wrapInHttpResponse([]))
            );
        }

        return of(this.tasks).pipe(
            map(tasks => {
                if (request.filter.executors.length) {
                    tasks = tasks.filter(task => crossingArrays(task.executors, request.filter.executors));
                }

                if (request.filter.status) {
                    tasks = tasks.filter(task => task.priority == request.filter.status);
                }

                if (request.filter.deadline) {
                    const deadLine = new Date(request.filter.deadline);
                    const deadLineDate = deadLine.getDate() + '/' + deadLine.getMonth() +'/' + deadLine.getFullYear();
        
                    tasks = tasks.filter(task => {
                        const task_date = new Date(task.deadline);
                        const task_deadline = task_date.getDate() + '/' + task_date.getMonth() +'/' + task_date.getFullYear();
                        return task_deadline === deadLineDate;
                    });
                }

                if (request.sort) {
                    tasks.sort((a, b) => {
                        const field = request.sort.field;
                        return request.sort.order === 'ASC' ? this.sortByAsc(a, b, field) : this.sortByDesc(a, b, field)
                    });
                }
                
                return this.wrapInHttpResponse(tasks);
            })
        );
    }

    getTask$(request: {id: number}): Observable<HttpResponse<Task>> {
        const headers = new HttpHeaders();

        const task: Task | undefined = this.tasks.find(ts => ts.id == request.id);

        return of(task).pipe(
            map(task => this.wrapInHttpResponse(task))
        );
    }

    saveTask$(task: Task, id?: number): Observable<HttpResponse<any>> {
        task.id = Math.floor(Math.random() * 10000);

        if (id) {
           this.tasks = this.tasks.filter(ts => ts.id != id);
            task.id = id;
        }
        
        this.tasks = [...this.tasks, task];

        localStorage.setItem("tasks", JSON.stringify(this.tasks));

        return of(this.wrapInHttpResponse({}));
    }

    wrapInHttpResponse<T>(resp?: T): HttpResponse<T> {
        return new HttpResponse<T>({body: resp});
    }

    sortByAsc(a: Task, b: Task, field: string){
        if (a?.[field as keyof Task] < b?.[field as keyof Task]) {
            return -1
        } else if (a?.[field as keyof Task] == b?.[field as keyof Task]) {
            return 0;
        } else {
            return 1;
        }
    }

    sortByDesc(a: Task, b: Task, field: string){
        if (a?.[field as keyof Task] > b?.[field as keyof Task]) {
            return -1
        } else if (a?.[field as keyof Task] == b?.[field as keyof Task]) {
            return 0;
        } else {
            return 1;
        }
    }
}