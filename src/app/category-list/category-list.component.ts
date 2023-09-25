import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CategoryService} from "../shared/services/category.service";
import {MatTableDataSource} from "@angular/material/table";
import {Category} from "../shared/models/category";
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent {

  constructor(
    private categoryService: CategoryService,
    private router: Router

  ) {}

  displayedColumns: string[] = [
    'id',
    'name',
    'actions'
  ];

  openEditCategory(categoryId: number): void {
    this.router.navigate(['/categories', categoryId, 'edit']);
  }

  deleteCategory(category: any) {
    this.categoryService.getProductsForCategory(category.id).subscribe(products => {
      if (products.length > 0) {
        alert('No se puede eliminar la categoría porque tiene productos asociados.');
      } else {
        this.categoryService.delete(category.id).subscribe(() => {
          this.categories = this.categories.filter(c => c.id !== category.id);
          this.dataSource = new MatTableDataSource(this.categories);
        });
      }
    });
  }

  dataSource: any;

  categories: any = [];

  newCategoryName: string = '';

  addCategory() {
    if (this.newCategoryName.trim() === '') {
      return;
    }
    const newCategory = { name: this.newCategoryName };

    this.categoryService.create(newCategory).subscribe(
      (response: any) => {
        console.log('Categoría agregada:', response);

        this.loadCategories();
      },
      (error: any) => {
        console.error('Error al agregar la categoría:', error);
      }
    );
  }


  loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      console.log(data);
      this.categories = data;
      this.dataSource = new MatTableDataSource(this.categories);
    });
  }

  ngOnInit() {
    this.loadCategories();
  }



}
