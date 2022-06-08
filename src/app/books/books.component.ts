import { AutoresService } from './../autores/autores.service';
import { PaginationBooks } from './pagination-book.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookNuevoComponent } from './book-nuevo.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  //Propiedades
  timeout: any;
  bookData: Books[] = []; //variable para recuperar los datos del servicio
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordenamiento: MatSort; //Ordenamiento de mat-cell
  @ViewChild(MatPaginator) paginacion: MatPaginator; //Paginacion de mat-cell

  private bookSubscription: Subscription;

  //variables locales para paginacion
  totalLibros = 0;
  librosPorPagina = 5;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue = null;

  constructor(private bookService: BooksService, private dialog: MatDialog) {}

  eventoPaginador(event: PageEvent) : void {
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1; //el index en js inicia en 0, se le suma 1
    this.bookService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }



  hacerFiltro(event: any) : void {
    clearTimeout(this.timeout);
    const $this = this;

    this.timeout = setTimeout( () => {
      if (event.KeyCode != 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value,
        };

        $this.filterValue = filterValueLocal;

        $this.bookService.obtenerLibros(
          $this.librosPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );
      } 
    }, 500);
  }

  ordenarColumna(event) : void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.bookService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      event.active,
      event.direction,
      this.filterValue
    );
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(BookNuevoComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.bookService.obtenerLibros(
        this.librosPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }

  ngOnInit(): void {
    this.bookService.obtenerLibros(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );

    this.bookSubscription = this.bookService
      .obtenerActualListener()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalLibros = pagination.totalRows;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}
