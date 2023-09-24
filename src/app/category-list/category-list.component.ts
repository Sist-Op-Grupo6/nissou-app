import {Component, OnInit} from '@angular/core';
import { CategoryService } from "../shared/services/category.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent {

  constructor(
    private categoryService: CategoryService
  ) {}

  displayedColumns: string[] = [
    'id',
    'name'
  ];

  dataSource: any;

  categories: any = [];

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      console.log(data); // Verifica si los datos se imprimen correctamente
      this.categories = data;
      this.dataSource = new MatTableDataSource(this.categories);
    });
  }
}
