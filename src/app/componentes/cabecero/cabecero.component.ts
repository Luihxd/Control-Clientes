import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServicio } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent {

  usuarioLoggead: boolean;
  loggedInUser: string;

  constructor(private loginServicio: LoginServicio){
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
      console.log("ng", user);
    });
    }
    cerrarSesion(){
      this.loginServicio.logout();
      this.usuarioLoggead = false;
    }
}
