import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {Salle} from "../model/salle.model";
import {Rendezvous} from "../model/rendezvous.model";
import {DentistsService} from "../services/dentists.service";

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrl: './rendezvous.component.css'
})
export class RendezvousComponent implements OnInit{
  public rendezvous!: Array<Rendezvous>;
  public dataSource!: MatTableDataSource<Rendezvous>;
  public displayedColumns:string[] =['id','date','typeRendezVous','lastnameD','lastnameP']

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private dentistService:DentistsService) {
  }
  ngOnInit() {
this.dentistService.getAllRendezVous().subscribe({
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
