  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import {HomeComponent} from "./home/home.component";
  import {ProfileComponent} from "./profile/profile.component";
  import {LoginComponent} from "./login/login.component";
  import {LoadPaymentComponent} from "./load-payment/load-payment.component";
  import {DashboardComponent} from "./dashboard/dashboard.component";
  import {PaymentsComponent} from "./payments/payments.component";
  import {AdminTemplateComponent} from "./admin-template/admin-template.component";
  import {AuthGuard} from "./guards/auth.guard";
  import {AntecedentComponent} from "./antecedent/antecedent.component";
  import {DentistComponent} from "./dentist/dentist.component";
  import {PatientComponent} from "./patient/patient.component";
  import {RendezvousComponent} from "./rendezvous/rendezvous.component";
  import {SalleComponent} from "./salle/salle.component";
  import {LoadAntecedentComponent} from "./load-antecedent/load-antecedent.component";
  import {AuthorizationGuard} from "./guards/authorisation.guard";
  import {PatientDetailsComponent} from "./patient-details/patient-details.component";
  import {DentistDetailsComponent} from "./dentist-details/dentist-details.component";
  import {RendezvousDetailsComponent} from "./rendezvous-details/rendezvous-details.component";
  import {NewPaymentComponent} from "./payments/new-payment/new-payment.component";
  import {NewAntecedentComponent} from "./antecedent/new-antecedent/new-antecedent.component";
  import {NewPatientComponent} from "./patient/new-patient/new-patient.component";

  const routes: Routes = [
    {path:"", component:LoginComponent},
    {path:"login", component:LoginComponent},
    {path:"admin", component:AdminTemplateComponent,
      canActivate:[AuthGuard],
      children:[
        {path:"home", component:HomeComponent},
        {path:"profile", component:ProfileComponent},
        {path:"loadPayments", component:LoadPaymentComponent,

            canActivate : [AuthorizationGuard], data: {roles: ['ADMIN','DENTIST']}
        },
        {path:"loadAntecedents", component:LoadAntecedentComponent,

          canActivate : [AuthorizationGuard], data: {roles: ['ADMIN','DENTIST']}
        },
        {path:"dashboard", component:DashboardComponent},
        {path:"antecedents", component:AntecedentComponent},
        {path:"dentists", component:DentistComponent},
        {path:"patients", component:PatientComponent},
        {path:"payments", component:PaymentsComponent},
        {path:"patient-details/:id", component:PatientDetailsComponent},
        {path:"dentist-details/:code", component:DentistDetailsComponent},
        {path:"rendezVous-details/:id", component:RendezvousDetailsComponent},
        {path:"new-payment/:rendezvousId", component:NewPaymentComponent},
        {path:"new-antecedent/:patientId", component:NewAntecedentComponent},
        {path:"new-patient", component:NewPatientComponent},
        {path:"rendezvous", component:RendezvousComponent},
        {path:"salles",component:SalleComponent}

      ]}


  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
