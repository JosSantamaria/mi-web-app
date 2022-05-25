import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Autor } from '../autores/autor.model';
import { AutoresService } from '../autores/autores.service';
import { BooksService } from './books.service';

@Component({
  selector: 'app-book-nuevo',
  templateUrl: './book-nuevo.component.html',
})
export class BookNuevoComponent implements OnInit {
  selectAutor: string;
  selectAutorTexto: string;
  fechaPublicacion: Date;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  autores: Autor[] = [];

  constructor(
    private bookService: BooksService,
    private dialogRef: MatDialog,
    private autoresService: AutoresService //creamos la referencia del dialog a travez de un objeto en el constructor
  ) {}

  ngOnInit(): void {
    this.autores = this.autoresService.obtenerAutores();
  }

  selected(event: MatSelectChange) {
    this.selectAutorTexto = (event.source.selected as MatOption).viewValue;
  }

  guardarLibro(f: NgForm) {
    if (f.valid) {
      //Validamos si estan los datos minimos correctos para el libro

      this.bookService.guardarLibro({
        libroId: 1,
        descripcion: f.value.descripcion,
        titulo: f.value.titulo,
        autor: this.selectAutorTexto,
        precio: f.value.precio,
        fechaPublicacion: new Date(this.fechaPublicacion),
      });

      this.dialogRef.closeAll(); // Selecionamos la referencia al Dialos y llamamos al metodo closeAll()
    }
  }
}
