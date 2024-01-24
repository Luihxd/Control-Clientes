import { Component, ErrorHandler, Injectable } from '@angular/core';
import { LoginServicio } from 'src/app/servicios/login.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor(private router: Router,
              private loginServicio: LoginServicio,
              private toastr: ToastrService){
              }

  async login(){
    try{
      const result = await this.loginServicio.login(this.email, this.password);
      console.log("login", result);
      await this.router.navigate(["/clientes"]);
    }
    catch(error: any){
      this.toastr.error("No se pudo iniciar sesión", "Error", {timeOut: 4000});
      console.log("Error: ", error);
    }
  }


}
