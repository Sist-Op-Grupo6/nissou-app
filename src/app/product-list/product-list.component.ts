import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  categoryId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categoryId = 0;
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'material',
    'unitPrice',
    'actions'
  ];

  dataSource: any;
  products: any = [];
  currentCategory: any;

  loadProducts() {
    this.productService.getProductsByCategory(this.categoryId).subscribe(data => {
      console.log(data);
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products);
    });
  }

  deleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.delete(productId).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  openEditProduct(productId: number): void {
    this.router.navigate(['/products/edit', productId]);
  }

  navigateToAddProduct(): void {
    this.router.navigate(['add-products']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId'];
      this.categoryService.getById(this.categoryId).subscribe(category => {
        this.currentCategory = category;
      });
      this.loadProducts();
    });
  }
}
