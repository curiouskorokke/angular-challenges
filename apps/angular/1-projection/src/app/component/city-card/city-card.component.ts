import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, merge, take, tap } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import {
  ListItemComponent,
  ListItemDirective,
} from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" customClass="bg-light-green">
      <img src="assets/img/city.png" width="200px" />

      <ng-template list-item let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.name + ',' + item.country"
          [onDelete]="delete"></app-list-item>
      </ng-template>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemDirective],
})
export class CityCardComponent {
  cities = toSignal(
    merge(
      this.http.fetchCities$.pipe(
        take(1),
        tap((res) => {
          this.store.addAll(res);
        }),
      ),
      this.store.cities$.pipe(
        map((res) => {
          return res;
        }),
      ),
    ),
  );
  constructor(
    private readonly store: CityStore,
    private readonly http: FakeHttpService,
  ) {}

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete = (id: number) => {
    this.store.deleteOne(id);
  };
}
