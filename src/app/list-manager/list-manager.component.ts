import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { heros } from '../models/heros';
import { HeroService } from '../services/heros.service';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss'],
})
export class ListManagerComponent {
  heroForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
  });
  herosList: heros[] = [];
  isUpdateMode: boolean = false;
  heroToUpdate: heros | null = null;
  searchText: FormControl;

  @Output() search = new EventEmitter<string>();

  constructor(private heroService: HeroService) {
    this.refreshHeroes();
    this.searchText = new FormControl();
  }

  handleUpdate(hero: heros) {
    this.isUpdateMode = true;
    this.heroToUpdate = hero;
    this.heroForm.setValue({
      name: hero.name,
      description: hero.description,
    });
  }

  refreshHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.herosList = heroes));
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id);
    this.refreshHeroes();
  }

  updateHero(hero: heros) {
    this.heroService.updateHero(hero);
    this.refreshHeroes();
    this.isUpdateMode = false;
    this.heroToUpdate = null;
  }

  addOrUpdateHero() {
    if (this.isUpdateMode) {
      const updatedHero: heros = {
        ...this.heroToUpdate,
        name: this.heroForm.get('name')?.value,
        description: this.heroForm.get('description')?.value,
      };
      this.updateHero(updatedHero);
    } else {
      this.heroService.addHero(
        this.heroForm.get('name')?.value,
        this.heroForm.get('description')?.value
      );
      this.refreshHeroes();
    }
  }
  searchHeroes() {
    const query = this.searchText.value;
    this.search.emit(query);
  }
  
}
