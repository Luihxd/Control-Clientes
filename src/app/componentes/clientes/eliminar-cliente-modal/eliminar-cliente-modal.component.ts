import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,  MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import {MatCardModule} from '@angular/material/card';
import { Cliente } from 'src/app/modelos/cliente.model';
import { NgForm } from '@angular/forms';
import { ClienteServicio } from 'src/app/servicios/clientes.service';
//import {FlashMessagesService} from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-eliminar-cliente-modal',
  templateUrl: './eliminar-cliente-modal.component.html',
  styleUrls: ['./eliminar-cliente-modal.component.css']
})
export class EliminarClienteModalComponent {

  mostrarMensaje: boolean = false;
  id: string;
  nombre: string;
  apellido: string;

  constructor(
    public dialogRef: MatDialogRef<EliminarClienteModalComponent>,
    private clienteServicio: ClienteServicio,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log("data: ", this.data);
    if(this.data !== undefined){
      this.id = this.data.data.id;
      this.nombre = this.data.data.nombre;
      this.apellido = this.data.data.apellido;
    }else{
      console.log("El objeto es nulo");
    }
  }

  onCerrar(): void {
    this.dialogRef.close();
  }

  onEliminar(): void {
    //guardar el cliente
      this.clienteServicio.deleteCliente(this.id ?? '');
      this.toastr.success("Cliente eliminado correctamente", "Eliminado", {timeOut: 4000})
      this.dialogRef.close();
  }

  ngOnInit() {}
}
