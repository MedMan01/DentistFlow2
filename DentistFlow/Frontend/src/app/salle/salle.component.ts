import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrl: './salle.component.css'
})
export class SalleComponent implements OnInit{
  public salle: any;
  public dataSource: any;
  public displayedColumns:string[] =['id','numeroSalle','etatSalle','typeSalle']

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.http.get("http://localhost:9090/salles")
      .subscribe({
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
