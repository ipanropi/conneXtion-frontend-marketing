import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-announcement-mat-dialog',
  templateUrl: './announcement-mat-dialog.component.html',
  styleUrls: ['./announcement-mat-dialog.component.scss']
})
export class AnnouncementMatDialogComponent implements OnInit {
  title: string;
  content: string;
  form: any;
  submitted: boolean;
  toUserIds: any = '';
  toBranchIds: any = '';

  constructor(
    public dialogRef: MatDialogRef<AnnouncementMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
    this.toUserIds = this.data.selectedUserIds ? this.data.selectedUserIds : '';
    this.toBranchIds = this.data.selectedBranchIds ? this.data.selectedBranchIds : '';

    // if (this.data.selectedUserIds) {
    //   this.data.selectedUserIds.every(id => {
    //     if (this.toUserIds.length > 0) {
    //       this.toUserIds += ',';
    //     }
    //     this.toUserIds += id.toString();
    //   });
    // }

    // if (this.data.selectedBranchIds) {
    //   this.data.selectedBranchIds.every(id => {
    //     this.toBranchIds += id.toString();
    //   });
    // }


    this.form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  get f() { return this.form.controls; }

  onClose() {
    this.dialogRef.close();
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const announcement = {
      title: this.form.value.title,
      content: this.form.value.content,
      type: 'A',
      toUserIds: this.toUserIds,
      toBranchIds: this.toBranchIds
    };
  }
}
