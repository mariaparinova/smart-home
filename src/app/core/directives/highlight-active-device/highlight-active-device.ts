import { Directive, input, ElementRef, inject, Renderer2, effect } from '@angular/core';

@Directive({
  selector: '[appHighlightActiveDevice]',
  standalone: true,
})
export class HighlightActiveDevice {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  isActive = input<boolean>(false);

  constructor() {
    effect(() => {
      const active = this.isActive();

      if (active) {
        this.renderer.addClass(this.el.nativeElement, 'active');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'active');
      }
    });
  }
}
