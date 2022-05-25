import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.component';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {

  bookData: Books[] = []; //variable para recuperar los datos del servicio
  desplegarColumnas = ['titulo', 'descripcion', 'precio', 'autor'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordenamiento:MatSort; //Ordenamiento de mat-cell
  @ViewChild(MatPaginator) paginacion: MatPaginator; //Paginacion de mat-cell
  private bookSubscription: Subscription;



  constructor(private bookService: BooksService, private dialog:MatDialog) {}

  hacerFiltro(_event: Event) {
    this.dataSource.filter = (_event.currentTarget as HTMLInputElement).value;
  }

  abrirDialog(){

    this.dialog.open(BookNuevoComponent,{
      width: '350px'
    });
  }

  ngOnInit(): void {

    this.dataSource.data = this.bookService.obtenerLibros();
    this.bookSubscription = this.bookService.bookSubject.subscribe( () =>
    { this.dataSource.data = this.bookService.obtenerLibros();
    });
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  ngOnDestroy(){
    this.bookSubscription.unsubscribe();
  }

}
