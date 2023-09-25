import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EditCategoryComponent } from "./edit-category/edit-category.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
import {AddProductComponent} from "./add-product/add-product.component";

const routes: Routes = [
  { path: "categories", component: CategoryListComponent },
  { path: 'categories/:categoryId/products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'add-products', component: AddProductComponent },
  {
    path: 'products/edit/:id',
    component: EditProductComponent
  },
  {
    path: 'categories/:id/edit',
    component: EditCategoryComponent
  },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
