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
      {path:"rendezvous", component:RendezvousComponent},
      {path:"Salle",component:SalleComponent}

    ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
