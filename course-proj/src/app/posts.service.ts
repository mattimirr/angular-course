import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class PostsService {
    error = new Subject<string>();
    constructor(private http: HttpClient) {

    }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };

        this.http.post<{ name: string }>(
            'https://ng-angular-project-7a530-default-rtdb.firebaseio.com/posts.json',
            postData,
            {
                observe: 'response'
            }
        ).subscribe(responseData => {
            console.log(responseData);
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>(
            'https://ng-angular-project-7a530-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({ "Custom-header": 'hello' }),
                params: new HttpParams().set('print', 'pretty')
            })
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    deletePosts() {
        return this.http.delete('https://ng-angular-project-7a530-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events'
            }).pipe(tap(event => { 
                console.log(event);
                if(event.type === HttpEventType.Response){
                    console.log(event.body)
                }
            }));
    }
}