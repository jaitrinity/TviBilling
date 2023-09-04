import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyAlphanumericWithDecimalAndHyphen]'
})
export class OnlyAlphanumericWithDecimalAndHyphen {

  constructor(private el: ElementRef) { }

  @Input() OnlyAlphanumericWithDecimalAndHyphen: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if (this.OnlyAlphanumericWithDecimalAndHyphen) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39) ||
        // Allow decimal point(.) and hyphen(-)
        (e.keyCode === 110) || (e.keyCode == 173 || e.keyCode == 183)) {
          // let it happen, don't do anything
          return;
        }
        
        // prevent pressing Shift and Space key
        if (e.shiftKey || (e.keyCode == 32) ) {
            e.preventDefault();
        }
      }
  }
}