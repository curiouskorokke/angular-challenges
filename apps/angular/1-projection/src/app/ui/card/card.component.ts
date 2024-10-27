import { CommonModule } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { ListItemDirective } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="img"></ng-content>

      <section>
        @for (item of list(); track item.id) {
          <ng-container
            *ngTemplateOutlet="
              listTpl();
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <ng-content select="button"></ng-content>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class CardComponent {
  list = input<any[]>();

  listTpl = contentChild.required(ListItemDirective, { read: TemplateRef });
}
