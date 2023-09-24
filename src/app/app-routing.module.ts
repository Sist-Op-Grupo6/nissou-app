import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  { path: "categories", component: CategoryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
