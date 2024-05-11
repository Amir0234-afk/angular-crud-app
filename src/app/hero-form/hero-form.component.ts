import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { heros } from '../models/heros';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent {
  @Input() heroForm!: FormGroup;
  @Input() isUpdateMode!: boolean;
  @Output() submitForm = new EventEmitter<void>();

  addOrUpdateHero() {
    this.submitForm.emit();
  }
}
