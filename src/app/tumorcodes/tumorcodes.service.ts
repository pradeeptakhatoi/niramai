import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { TumorCode } from "./tumorcode.model";

const BACKEND_URL = environment.apiUrl + "/tumorcodes/";

@Injectable({ providedIn: "root" })
export class TumorCodesService {
  private posts: TumorCode[] = [];
  private postsUpdated = new Subject<{ data: TumorCode[]; maxRecordsCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number, keyword: string) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&keyword=${keyword}`;
    this.http
      .get<{ message: string; data: any; maxRecordsCount: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.data.map((post: any) => {
              return {
                ...post
              };
            }),
            maxRecordsCount: postData.maxRecordsCount
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          data: [...this.posts],
          maxRecordsCount: transformedPostData.maxRecordsCount
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

}
