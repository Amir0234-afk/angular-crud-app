import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { heros } from '../models/heros';
import { HeroService } from '../services/heros.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
  @Input() herosList: heros[] = [];
  @Input() searchQuery: string = '';

  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<heros>();

  herosDataSource: MatTableDataSource<heros>;
  isUpdateMode: boolean = false;
  selectedHeroForUpdate: heros | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator.pageSize = 4;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      this.heroService
        .searchHeroes(changes['searchQuery'].currentValue)
        .subscribe((heroes) => {
          this.herosDataSource.data = heroes;
        });
    }
  }

  constructor(private heroService: HeroService) {
    this.herosDataSource = new MatTableDataSource<heros>([]);
    this.refreshDataSource();
  }

  refreshDataSource(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.herosDataSource.data = heroes;
      this.herosDataSource.paginator = this.paginator;
    });
  }

  onDelete(hero: heros) {
    if (hero.id !== undefined) {
      this.delete.emit(hero.id);
    }
  }

  onUpdate(hero: heros) {
    this.isUpdateMode = true;
    this.selectedHeroForUpdate = hero;
    this.update.emit(hero);
  }

  onCancelUpdate() {
    this.isUpdateMode = false;
    this.selectedHeroForUpdate = null;
  }

  onConfirmUpdate(heroName: string, heroDescription: string) {
    if (this.selectedHeroForUpdate) {
      const updatedHero: heros = {
        ...this.selectedHeroForUpdate,
        name: heroName,
        description: heroDescription,
      };

      this.update.emit(updatedHero);
      this.isUpdateMode = false;
      this.selectedHeroForUpdate = null;
    }
  }

  addHero(name: string, description: string) {
    this.heroService.addHero(name, description);
    this.refreshDataSource();
  }
}
