import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrl: './rendezvous.component.css'
})
export class RendezvousComponent implements OnInit{
  public rendezvous: any;
  public dataSource: any;
  public displayedColumns:string[] =['id','date','typeRendezVous','lastnameD','lastnameP']

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.http.get("http://localhost:9090/rendezVous")
      .subscribe({
        next : data => {
          this.rendezvous = data;
          this.dataSource=new MatTableDataSource(this.rendezvous);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;

        },
        error: err => {
          console.log(err)
        }
      })
  }

}
