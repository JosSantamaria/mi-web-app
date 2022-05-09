import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {
  
  @Output() menuToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onmenuToggleDispatch() {
    this.menuToggle.emit();
  }
}
