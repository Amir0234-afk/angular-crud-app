import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  form!: FormGroup; // Notice the "!" here

  ngOnInit() {
    this.form = new FormGroup({
      number: new FormControl(''),
      email: new FormControl(''),
    });
  }
}
