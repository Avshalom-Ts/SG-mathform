import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter } from 'rxjs';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [
      // console.log(form.value);
      // (form: AbstractControl) => {
      //   // console.log(form.value);
      //   const { a, b, answer } = form.value;
      //   if (a + b === parseInt(answer)) {
      //     return null;
      //   }
      //   return { addition: true };
      // },
      MathValidators.addition('answer', 'a', 'b'),
    ]
  );
  constructor() {}

  get a() {
    return this.mathForm.value.a;
  }
  get b() {
    return this.mathForm.value.b;
  }

  ngOnInit(): void {
    const startTime = new Date();
    let numberSolved = 0;
    // console.log(this.mathForm.statusChanges);
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(1000)
      )
      .subscribe((value) => {
        // console.log(value);
        // if (value === 'INVALID') {
        //   return;//Filter insted
        // }
        //
        // this.mathForm.controls.a.setValue(this.randomNumber());
        // this.mathForm.controls.b.setValue(this.randomNumber());
        // this.mathForm.controls.answer.setValue('');
        //OR patchValue can be modify part of the atributs
        // this.mathForm.patchValue({
        //   b: this.randomNumber(),
        //   answer: '',
        // });
        //OR setValue can be modify all the atributs toggether
        //Before RXjs
        numberSolved++;
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 100);
  }
}
