import { Component, Directive, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'ng-template[list-item]',
})
export class ListItemDirective {}
@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <button (click)="onDelete(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;

  @Input() onDelete: (id: number) => void = () => null;
}
