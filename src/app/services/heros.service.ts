import { Injectable } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { heros } from '../models/heros';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes: heros[] = [
    new heros(1, 'Dr. Nice', 'is fucking nice'),
    new heros(2, 'Bombasto', 'bombs everything'),
    new heros(3, 'Celeritas', ''),
    new heros(4, 'Magneta', 'shoots pink laser'),
    new heros(5, 'RubberMan', 'elastic'),
    new heros(6, 'Dynama', ''),
    new heros(7, 'Dr. IQ', 'is smart'),
    new heros(8, 'Magma', 'controls magma'),
    new heros(9, 'Tornado', 'controls wind'),
  ];

  private heroesSubject: BehaviorSubject<heros[]> = new BehaviorSubject<
    heros[]
  >(this.heroes);

  constructor() {}

  getHeroes(): Observable<heros[]> {
    return this.heroesSubject.asObservable();
  }

  addHero(name: string, description: string): void {
    const id =
      this.heroes.length > 0
        ? Math.max(...this.heroes.map((hero) => hero.id || 0), 0) + 1
        : 1;
    const newHero = new heros(id, name, description);
    this.heroes.push(newHero);
    this.heroesSubject.next(this.heroes);
  }

  deleteHero(id: number): void {
    this.heroes = this.heroes.filter((hero) => hero.id !== id);
    this.heroesSubject.next(this.heroes);
  }

  updateHero(updatedHero: heros): void {
    const index = this.heroes.findIndex((hero) => hero.id === updatedHero.id);
    if (index !== -1) {
      this.heroes[index] = updatedHero;
      this.heroesSubject.next(this.heroes);
    }
  }
  searchHeroes(query: string): Observable<heros[]> {
    const filteredHeroes = this.heroes.filter(
      (hero) =>
        hero.name?.toLowerCase().includes(query.toLowerCase()) ||
        hero.description?.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredHeroes);
  }
}
