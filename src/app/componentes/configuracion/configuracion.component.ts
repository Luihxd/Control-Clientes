import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';

@Injectable()
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit{
  permitirRegistro: boolean | undefined;

  constructor(private router: Router,
              private configuracionServicio: ConfiguracionServicio,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.configuracionServicio.getConfiguracion().subscribe(
      (configuracion) => {
        if(configuracion != undefined) {
          this.permitirRegistro = configuracion.permitirRegistro;
        }
      }
    );
  }
  guardar(): void {
    let configuracion = {permitirRegistro: this.permitirRegistro};
    this.configuracionServicio.modConfiguracion(configuracion);
    this.toastr.success("Configuración guardada correctamente")
  }
}
