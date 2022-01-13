import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mensaje-error',
  templateUrl: './mensaje-error.component.html',
  styleUrls: ['./mensaje-error.component.scss'],
})
export class MensajeErrorComponent implements OnInit {

  @Output() clickBtn = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  accion(){
    this.clickBtn.emit()
  }

}
