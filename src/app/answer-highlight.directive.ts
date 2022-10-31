import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, filter } from 'rxjs';

@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective {
  constructor(private el: ElementRef, private controlName: NgControl) {
    // console.log(this.el);
  }

  ngOnInit() {
    // console.log(this.controlName.control?.parent);
    //valueChanges is Observable
    this.controlName.control?.parent?.valueChanges
      .pipe(map(({ a, b, answer }) => Math.abs(a + b - answer) / (a + b)))
      .subscribe((value) => {
        // console.log(value);
        if (value < 0.2) {
          this.el.nativeElement.classList.add('close');
        } else {
          this.el.nativeElement.classList.remove('close');
        }
      });
  }
}
