import { Component, OnInit } from '@angular/core';
import { LoginServicio } from 'src/app/servicios/login.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
password: string;
email: string;

  constructor(private router: Router,
    private loginServicio: LoginServicio,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.email = "";
    this.password = "";
  }
  registro() {
    this.loginServicio.registerUser(this.email, this.password)
    .then((res) => {
      this.router.navigate(["/clientes"]);
    }).catch((error) => {
      this.toastr.error(error.message, "Error al crear el usuario");
    })

  }
}
