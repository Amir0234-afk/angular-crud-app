import { heros } from './heros';

export class HeroData {
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

  getHeroes(): heros[] {
    return this.heroes;
  }
}
