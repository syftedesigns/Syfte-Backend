import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoleComponent } from './role/role.component';
import { ServicesComponent } from './services/services.component';
import { MerchantComponent } from './merchant/merchant.component';
import { AllianceComponent } from './alliance/alliance.component';
import { EmployersComponent } from './employers/employers.component';
import { LegacyComponent } from './firebase/legacy/legacy.component';
import { MapComponent } from './firebase/map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { EmergenciaComponent } from './emergencia/emergencia.component';
import { PushComponent } from './push/push.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
    {
        path: '',
        component: EmployersComponent,
        data: {Title: 'Usuarios afiliados'}
    },
    {
        path: 'admin',
        component: AdminComponent,
        data: {Title: 'Asignación de Administradores'}
    },
    /*{
        path: 'roles',
        component: RoleComponent,
        data: {Title: 'Asignación de Roles'}
    },
    {
        path: 'servicios',
        component: ServicesComponent,
        data: {Title: 'Asignación de servicios'}
    },
    {
        path: 'pagos',
        component: MerchantComponent,
        data: {Title: 'Administración'}
    },
    {
        path: 'delivery',
        component: DeliveryComponent,
        data: {Title: 'Servicios delivery completados'}
    },
    {
        path: 'emergencia',
        component: EmergenciaComponent,
        data: {Title: 'Monitoreo de emergencias'}
    },
    {
        path: 'push',
        component: PushComponent,
        data: {Title: 'Mensajeria global'}
    },
    {
        path: 'alianza',
        component: AllianceComponent,
        data: {Title: 'Administración de empresas'}
    },
    {
        path: 'soluclics',
        component: EmployersComponent,
        data: {Title: 'Administración de Soluclics'}
    },
    {
        path: 'legal',
        component: LegacyComponent,
        data: {Title: 'Administración legal'}
    },
    {
        path: 'map',
        component: MapComponent,
        data: {Title: 'Bodegas'}
    },*/
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
