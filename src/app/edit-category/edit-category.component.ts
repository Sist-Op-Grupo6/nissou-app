import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../shared/services/category.service'; // Asegúrate de importar el servicio correcto
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa ReactiveFormsModule para trabajar con formularios


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})

export class EditCategoryComponent implements OnInit {

  editCategoryForm: FormGroup = new FormGroup({});
  categoryId: number = 0;

  category: any = {};
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.categoryId = idParam ? +idParam : 0; // Usamos el operador coalescente null para proporcionar 0 si idParam es nulo

    this.editCategoryForm = this.formBuilder.group({
      newCategoryName: ['', Validators.required]
    });

    if (idParam) {
      this.categoryService.getById(this.categoryId).subscribe(category => {
        this.category = category;
        this.editCategoryForm.patchValue({ newCategoryName: category.name });
      });
    }
  }

  // Maneja la actualización de la categoría
  updateCategory(): void {
    if (this.editCategoryForm.valid) {
      const newName = this.editCategoryForm.value.newCategoryName;
      this.categoryService.update(this.categoryId, { name: newName }).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }


}
