import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  ],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss',
})
export class PostProductComponent {
  protected readonly adminService = inject(AdminService);
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly snackBar = inject(MatSnackBar);

  protected listCategories = this.adminService.categories;
  protected selectedFile!: File | null;
  protected imagePreview!: string | ArrayBuffer | null;

  productForm = this.formBuilder.group({
    categoryId: [Validators.required],
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(5)]],
  });

  addProduct() {
    if (this.productForm.valid) {
      console.log('ADD PRODUCT');
    } else {
      this.productForm.markAllAsTouched();
    }
  }
  onFileSelected(files: File[]) {
    console.log(files[0]);
    this.selectedFile = files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile as File);
  }
}
