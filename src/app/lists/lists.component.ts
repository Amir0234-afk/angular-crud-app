import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  herosDataSource = new MatTableDataSource<heros>(this.herosList);

  constructor(private heroService: HeroService) {
    this.refreshDataSource();
  }

  ngOnChanges() {
    this.refreshDataSource();
  }

  refreshDataSource(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      if (this.searchQuery) {
        heroes = heroes.filter(
          (hero) =>
            hero.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            hero.description
              ?.toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        );
      }
      this.herosDataSource.data = heroes;
      setTimeout(() => (this.herosDataSource.paginator = this.paginator));
    });
  }

  onDelete(hero: heros) {
    this.delete.emit(hero.id);
  }

  onUpdate(hero: heros) {
    this.update.emit(hero);
  }
}
