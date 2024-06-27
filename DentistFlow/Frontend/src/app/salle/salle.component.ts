import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DentistsService} from "../services/dentists.service";
import {Patient} from "../model/patient.model";
import {Salle} from "../model/salle.model";

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrl: './salle.component.css'
})
export class SalleComponent implements OnInit{
  public salle!: Array<Salle>;
  public dataSource!: MatTableDataSource<Salle>;
  public displayedColumns:string[] =['id','numeroSalle','etatSalle','typeSalle']

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private salleService: DentistsService) {
  }
  ngOnInit() {
this.salleService.getAllSalles().subscribe({
        next : data => {
          this.salle = data;
          this.dataSource=new MatTableDataSource(this.salle);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;

        },
        error: err => {
          console.log(err)
        }
      })
  }

}
