import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginServicio } from 'src/app/servicios/login.service';

@Injectable()
@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent {

  usuarioLoggead: boolean;
  loggedInUser: string;
  permitirRegistro: boolean | undefined;

  constructor(private loginServicio: LoginServicio,
              private configuracionServicio: ConfiguracionServicio,
              private router: Router) {
    this.usuarioLoggead = false;
    this.loggedInUser = "";


  }

  ngOnInit(){
    this.loginServicio.getAutenticacion().subscribe((user) => {
      if(user){
        this.loggedInUser = user.email ?? "";
        this.usuarioLoggead = true;
      } else{
        this.loggedInUser = "";
        this.usuarioLoggead = false;
      }
      this.configuracionServicio.getConfiguracion().subscribe((configuracion)=> {
        this.permitirRegistro = configuracion?.permitirRegistro;
      });
    });
    }
    cerrarSesion(){
      this.loginServicio.logout();
      this.usuarioLoggead = false;
      this.router.navigate(["/login"]);

    }
}
