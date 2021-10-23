import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TumorCodeListComponent } from "./tumorcodes/tumorcode-list/tumorcode-list.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", component: TumorCodeListComponent, canActivate: [AuthGuard] },
  { path: "auth", loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule), }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }