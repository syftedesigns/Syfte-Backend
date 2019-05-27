import { NgModule } from '@angular/core';
// Modulos
import { CommonModule } from '@angular/common';
import { StaticModule } from '../static/static.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Componentes
import { AllianceComponent } from './alliance/alliance.component';
import { EmployersComponent } from './employers/employers.component';
import { ServicesFinishedComponent } from './employers/services-finished.component';
import { LegacyComponent } from './firebase/legacy/legacy.component';
import { MapComponent } from './firebase/map/map.component';
import { MerchantComponent } from './merchant/merchant.component';
import { RoleComponent } from './role/role.component';
import { ServicesComponent } from './services/services.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './page.routes';
import { HomeComponent } from './dashboard/home.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { EmergenciaComponent } from './emergencia/emergencia.component';
import { PushComponent } from './push/push.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { RenderPagesModule } from '../shared/render-pages.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    StaticModule,
    PagesRoutingModule,
    RouterModule,
    FormsModule,
    AngularMaterialModule,
    RenderPagesModule
  ],
  declarations: [
    AllianceComponent,
    EmployersComponent,
    ServicesFinishedComponent,
    LegacyComponent,
    MapComponent,
    MerchantComponent,
    RoleComponent,
    ServicesComponent,
    DashboardComponent,
    HomeComponent,
    DeliveryComponent,
    EmergenciaComponent,
    PushComponent,
    AdminComponent
  ],
  entryComponents: [
    RoleComponent
  ]
})
export class PageModule { }
