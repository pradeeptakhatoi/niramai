import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";

import { TumorCode } from "../tumorcode.model";
import { TumorCodesService } from "../tumorcodes.service";
import { AuthService } from "../../auth/auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-tumorcode-list",
  templateUrl: "./tumorcode-list.component.html",
  styleUrls: ["./tumorcode-list.component.scss"]
})
export class TumorCodeListComponent implements OnInit, OnDestroy {
  tumorCodes: TumorCode[] = [];
  isLoading = false;
  keyword = "";
  totalRecords = 0;
  recordsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 25, 50];
  userIsAuthenticated = false;
  userId: any;
  private tumorCodesSub: Subscription | any;
  private authStatusSub: Subscription | any;

  displayedColumns: string[] = ['case_id', "tumor_site", "BMI", "height_in_cm", "weight_in_kg"];

  constructor(
    public tumorCodesService: TumorCodesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.tumorCodesService.getPosts(this.recordsPerPage, this.currentPage, this.keyword);
    this.userId = this.authService.getUserId();
    this.tumorCodesSub = this.tumorCodesService
      .getPostUpdateListener()
      .subscribe((postData: { data: TumorCode[]; maxRecordsCount: number }) => {
        console.log(postData);
        this.isLoading = false;
        this.totalRecords = postData.maxRecordsCount;
        this.tumorCodes = postData.data;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onSearch(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.keyword = form.value.keyword;
    console.log(this.keyword);    
    this.tumorCodesService.getPosts(this.recordsPerPage, this.currentPage, this.keyword);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.recordsPerPage = pageData.pageSize;
    this.tumorCodesService.getPosts(this.recordsPerPage, this.currentPage, this.keyword);
  }

  ngOnDestroy() {
    this.tumorCodesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
