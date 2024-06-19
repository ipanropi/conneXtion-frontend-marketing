import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-mat-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { HomeTopBarComponent } from './components/home-top-bar/home-top-bar.component';
import { RouterModule } from '@angular/router';
import { HighlighterPipe } from './highlighter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [SafePipe, ConfirmDialogComponent, AlertDialogComponent, FooterComponent, HomeTopBarComponent,
        HighlighterPipe],
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule
    ],
    exports: [
        SafePipe,
        MatDialogModule,
        MatButtonModule,
        FooterComponent,
        HomeTopBarComponent,
        HighlighterPipe
    ]
})
export class SharedModule { }
