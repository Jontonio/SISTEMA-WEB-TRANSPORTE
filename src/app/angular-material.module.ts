import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// imports of angular material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';


const myImports = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatSelectModule,
  MatDialogModule,
  MatTabsModule,
  MatDividerModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatExpansionModule,
  MatCardModule,
  MatChipsModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [],
  imports: [ CommonModule, ...myImports ],
  exports: [ ...myImports ]
})

export class AngularMaterialModule { }
