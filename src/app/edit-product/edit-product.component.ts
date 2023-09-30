import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../shared/services/product.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup = new FormGroup({});
  productId: number = 0;

  product: any = {};
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : 0;

    this.editProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productMaterial: ['', Validators.required],
      productPrice: [0, [Validators.required, Validators.min(0)]],
      productCategoryID: ['', Validators.required]
    });

    if (idParam) {
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product;
        this.editProductForm.patchValue({
          name: product.productName,
          description: product.productDescription,
          material: product.productMaterial,
          unitPrice: product.productPrice,
          categoryId: product.productCategoryID
        });
      });
    }
  }

  cancelEdit(): void {
    this.location.back();
  }

  updateProduct(): void {
    if (this.editProductForm.valid) {
      const updatedProduct = {
        id: this.productId,
        name: this.editProductForm.value.productName,
        description: this.editProductForm.value.productDescription,
        material: this.editProductForm.value.productMaterial,
        unitPrice: this.editProductForm.value.productPrice,
        categoryId: this.editProductForm.value.productCategoryID
      };

      this.productService.update(this.productId, updatedProduct).subscribe(() => {
        this.router.navigate(['/products']);
        alert('El producto se ha actualizado.');
        this.location.back();
      });
    }
  }
}
