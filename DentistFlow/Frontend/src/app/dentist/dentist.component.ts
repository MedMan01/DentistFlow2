import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrl: './dentist.component.css'
})
export class DentistComponent implements OnInit{
  public dentist: any;
  public dataSource: any;
  public displayedColumns:string[] =['id','code','firstName','lastName',]

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.http.get("http://localhost:9090/dentists")
      .subscribe({
        next : data => {
          this.dentist = data;
          this.dataSource=new MatTableDataSource(this.dentist);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;

        },
        error: err => {
          console.log(err)
        }
      })
  }

}
