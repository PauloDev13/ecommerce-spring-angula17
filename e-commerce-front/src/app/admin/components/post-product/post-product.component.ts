import { NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton,
    MatIcon,
    MatSelect,
    MatOption,
    NgOptimizedImage,
  ],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss',
})
export class PostProductComponent {
  protected selectedFile!: File;
  protected imagePreview = signal<string | ArrayBuffer | null>(null);
  private formBuilder = inject(NonNullableFormBuilder);

  // FORM PRODUCT
  protected productForm = this.formBuilder.group({
    img: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(5)]],
  });

  private adminService = inject(AdminService);
  protected categories = this.adminService.listCategories;
  protected products = this.adminService.listProducts;
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  addProduct() {
    if (this.productForm.valid) {
      const { categoryId, name, price, description } =
        this.productForm.getRawValue();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('category_id', categoryId);
      formData.append('description', description);
      formData.append('img', this.selectedFile);

      this.adminService
        .createProduct$(formData)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError(err => {
            this.snackBar.open(
              'Error Product create ' + JSON.stringify(err.error),
              'close',
              {
                duration: 3000,
              },
            );
            return EMPTY;
          }),
        )
        .subscribe({
          next: product => {
            this.products.update(products => [...products, product]);

            this.router.navigate(['admin/dashboard']).then(() => {
              this.snackBar.open('Product created successfully', 'close', {
                duration: 3000,
              });
            });
          },
        });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onFileSelected(files: File[]): void {
    this.selectedFile = files[0];

    const fileReader = new FileReader();

    if (this.selectedFile) {
      fileReader.onload = () => {
        this.imagePreview.set(fileReader.result);
      };
      fileReader.onerror = () => {
        this.imagePreview.set('./assets/images/sem-foto.jpg');
      };
      fileReader.readAsDataURL(this.selectedFile);
    }
  }
}
