import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, merge, take, tap } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import {
  ListItemComponent,
  ListItemDirective,
} from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" customClass="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />

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
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, ListItemDirective],
})
export class StudentCardComponent {
  students = toSignal(
    merge(
      this.http.fetchStudents$.pipe(
        take(1),
        tap((res) => {
          this.store.addAll(res);
        }),
      ),
      this.store.students$.pipe(
        map((res) => {
          return res;
        }),
      ),
    ),
  );

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  addNewItem() {
    this.store.addOne(randStudent());
  }

  delete = (id: number) => {
    this.store.deleteOne(id);
  };
}
