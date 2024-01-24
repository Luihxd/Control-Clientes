import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { AuthGuard } from './guardianes/auh.guard';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: TableroComponent, canActivate: [AuthGuard]},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'registro', component: RegistrarUsuarioComponent, canActivate: [ConfiguracionGuard]},
  {path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]},
  {path: '**', component: NoEncontradoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
