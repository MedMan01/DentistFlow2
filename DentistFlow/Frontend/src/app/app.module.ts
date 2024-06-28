import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatList, MatListModule} from "@angular/material/list";
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { PaymentsComponent } from './payments/payments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadPaymentComponent } from './load-payment/load-payment.component';
import {MatCard, MatCardModule} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import { AntecedentComponent } from './antecedent/antecedent.component';
import { DentistComponent } from './dentist/dentist.component';
import { PatientComponent } from './patient/patient.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { SalleComponent } from './salle/salle.component';
import { LoadAntecedentComponent } from './load-antecedent/load-antecedent.component';
import {AuthorizationGuard} from "./guards/authorisation.guard";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { DentistDetailsComponent } from './dentist-details/dentist-details.component';
import { RendezvousDetailsComponent } from './rendezvous-details/rendezvous-details.component';
import { NewPaymentComponent } from './payments/new-payment/new-payment.component';
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { NewAntecedentComponent } from './antecedent/new-antecedent/new-antecedent.component';
import { NewPatientComponent } from './patient/new-patient/new-patient.component';
import { NewDentistComponent } from './dentist/new-dentist/new-dentist.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    PaymentsComponent,
    DashboardComponent,
    LoadPaymentComponent,
    AntecedentComponent,
    DentistComponent,
    PatientComponent,
    RendezvousComponent,
    SalleComponent,
    LoadAntecedentComponent,
    PatientDetailsComponent,
    DentistDetailsComponent,
    RendezvousDetailsComponent,
    NewPaymentComponent,
    NewAntecedentComponent,
    NewPatientComponent,
    NewDentistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    provideAnimationsAsync(),
    AuthGuard,
    AuthorizationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
