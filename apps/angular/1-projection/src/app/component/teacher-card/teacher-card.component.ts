import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { map, merge, take, tap } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import {
  ListItemComponent,
  ListItemDirective,
} from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" customClass="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />

      <ng-template list-item let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.firstName"
          [onDelete]="delete"></app-list-item>
      </ng-template>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemDirective],
})
export class TeacherCardComponent {
  teachers = toSignal(
    merge(
      this.http.fetchTeachers$.pipe(
        take(1),
        tap((res) => {
          this.store.addAll(res);
        }),
      ),
      this.store.teachers$.pipe(
        map((res) => {
          return res;
        }),
      ),
    ),
  );

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  delete = (id: number) => {
    this.store.deleteOne(id);
  };
}
