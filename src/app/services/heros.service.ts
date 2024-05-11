import { Injectable } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { heros } from '../models/heros';
import { HeroData } from '../models/hero-data';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroData = new HeroData();
  private heroes: heros[] = this.heroData.getHeroes();

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
