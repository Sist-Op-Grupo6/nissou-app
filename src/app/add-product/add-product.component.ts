import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../shared/services/category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,

    private categoryService: CategoryService,
    private router: Router,
    private location: Location

  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      material: ['', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      categoryId: [0, [Validators.required, this.validateCategoryId.bind(this)]]
    });
  }

  validateCategoryId(control: AbstractControl): boolean {
    const categoryId = control.value;
    const category = this.categoryService.getById(categoryId);
    return !!category;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProductData = this.productForm.value;
      const categoryId = newProductData.categoryId;

      const category = this.categoryService.getById(categoryId);
      if (!category) {
        alert('La categoría especificada no existe. Por favor, elija una categoría válida.');
        return;
      }

      this.productService.create(newProductData).subscribe(() => {
        alert('El producto se ha agregado correctamente.');
        this.location.back();
      });
    }
  }

}
