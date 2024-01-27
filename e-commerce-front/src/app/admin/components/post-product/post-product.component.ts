import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
import { take } from 'rxjs';

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
  protected readonly adminService = inject(AdminService);
  protected readonly formBuilder = inject(NonNullableFormBuilder);
  productForm = this.formBuilder.group({
    categoryId: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(5)]],
  });
  protected readonly router = inject(Router);
  protected readonly snackBar = inject(MatSnackBar);
  protected listCategories = this.adminService.categories;
  protected selectedFile!: File;
  protected imagePreview = signal<string | ArrayBuffer | null>(null);

  addProduct() {
    if (this.productForm.valid) {
      const { categoryId, name, price, description } =
        this.productForm.getRawValue();

      const formData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('category_id', categoryId);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);

      this.adminService
        .createProduct$(formData)
        .pipe(take(1))
        .subscribe({
          next: () => {},
          error: err => {
            console.log('Error', err);
          },
        });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onFileSelected(files: File[]): void {
    this.selectedFile = files[0];
    console.log(this.selectedFile);
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
