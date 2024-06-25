import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-antecedent',
  templateUrl: './antecedent.component.html',
  styleUrl: './antecedent.component.css'
})
export class AntecedentComponent implements  OnInit{
  public antecedent: any;
  public dataSource: any;
  public displayedColumns:string[] =['id','dateCreation','firstname','Description']

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.http.get("http://localhost:9090/antecedents")
      .subscribe({
        next : data => {
          this.antecedent = data;
          this.dataSource=new MatTableDataSource(this.antecedent);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;

        },
        error: err => {
          console.log(err)
        }
      })
  }

}
