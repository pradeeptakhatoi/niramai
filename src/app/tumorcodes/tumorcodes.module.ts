import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { TumorCodeListComponent } from "./tumorcode-list/tumorcode-list.component";
import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
  declarations: [TumorCodeListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class TumorCodesModule { }
