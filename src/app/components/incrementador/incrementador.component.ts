import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input('leyenda') legend: string = 'Leyenda';
  @Input('progreso') progress: number = 50;

  @Output('updateValue') change: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  changeValue(valor: number) {
    if (this.progress >= 100 && valor > 0) {
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && valor < 0) {
      this.progress = 0;
      return;
    }

    this.progress += valor;

    this.change.emit(this.progress);

    this.txtProgress.nativeElement.focus();
  }

  onChanges(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.txtProgress.nativeElement.value = this.progress;

    this.change.emit(this.progress);
  }
}
