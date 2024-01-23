import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ClienteServicio } from './servicios/clientes.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AgregarClienteModalComponent } from './componentes/clientes/agregar-cliente-modal/agregar-cliente-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginServicio } from './servicios/login.service';
import { EliminarClienteModalComponent } from './componentes/clientes/eliminar-cliente-modal/eliminar-cliente-modal.component';
import { AuthGuard } from './guardianes/auh.guard';
import { ConfiguracionServicio } from './servicios/configuracion.service';

import { FirestoreSettings } from '@angular/fire/firestore';

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    TableroComponent,
    ClientesComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    ConfiguracionComponent,
    NoEncontradoComponent,
    PiePaginaComponent,
    AgregarClienteModalComponent,
    EliminarClienteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    CommonModule,
    ...materialModules,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatCheckboxModule,
    AngularFireAuthModule

  ],
  providers: [ClienteServicio, LoginServicio, AuthGuard, ConfiguracionServicio
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ...materialModules
  ],
})
export class AppModule { }
