import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Patient} from "../model/patient.model";
import {Dentist} from "../model/dentist.model";
import {Router} from "@angular/router";
import {DentistsService} from "../services/dentists.service";

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrl: './dentist.component.css'
})
export class DentistComponent implements OnInit{
  public dentist!: Array<Dentist>;
  public dataSource!: MatTableDataSource<Dentist>;
  public displayedColumns:string[] =['id','code','firstName','lastName','rendezvous']

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private dentistService:DentistsService, private router: Router) {
  }
  ngOnInit() {
this.dentistService.getAllDentists().subscribe({
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

  dentistDetail(dentist: Dentist) {
    this.router.navigateByUrl(`/admin/dentist-details/${dentist.code}`);
  }
}
