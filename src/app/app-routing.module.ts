import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'inicio', component: TableroComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'registrarse', component: RegistrarUsuarioComponent},
  {path: 'configuracion', component: ConfiguracionComponent},
  {path: '**', component: NoEncontradoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
