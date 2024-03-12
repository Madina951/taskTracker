import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FakeBackend } from "./fake-backend";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    private fakebackend = new FakeBackend();

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('api/tasks') && req.method == 'GET') {
            return this.fakebackend.getTasks$({
                filter: JSON.parse(req.params.get('filter')!), 
                sort: JSON.parse(req.params.get('sort')!)
            });
        }

        if (req.url.includes('api/task') && req.method == 'GET') {
            return this.fakebackend.getTask$({id: +req.params.get('id')!});
        }

        if (req.url.includes('api/task') && req.method == 'POST') {
            return this.fakebackend.saveTask$(req.body, +req.params.get('id')!);
        }

        return next.handle(req);
    }

}