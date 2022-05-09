import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit {

  @Output() menuToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onCerrarMenu(){
    this.menuToggle.emit();
  }

}
