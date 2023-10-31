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
  selector: 'app-agregar-cliente-modal',
  templateUrl: './agregar-cliente-modal.component.html',
  styleUrls: ['./agregar-cliente-modal.component.css']
})
export class AgregarClienteModalComponent {

  cliente: Cliente = {nombre: "", apellido:"", email:"", saldo: 0 }
  mostrarMensaje: boolean = false;
  nombre: string;

  constructor(
    public dialogRef: MatDialogRef<AgregarClienteModalComponent>,
    private clienteServicio: ClienteServicio,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(this.data.data !== undefined){
      this.cliente = this.data.data;
    }else{
      console.log("El objeto es nulo");
    }
  }

  onCerrar(): void {
    this.dialogRef.close();
  }

  onGuardar(clienteForm: NgForm): void {
    //guardar el cliente
    if(clienteForm.valid){
      if(this.data.data !== undefined){
      this.clienteServicio.updateCliente(this.cliente.id ?? '', this.cliente);
      this.toastr.success("Cliente modificado correctamente", "Modificado", {timeOut: 4000})
      this.dialogRef.close();
      return;
      }
      this.clienteServicio.addCliente(this.cliente);
      this.toastr.success("Cliente agregado correctamente", "Agregado", {timeOut: 4000})
      this.dialogRef.close();

    }
      this.toastr.error("Llena el formulario correctamente.", "Error ", {timeOut: 4000});
      this.mostrarMensaje = true;
      return;
  }

  ngOnInit() {}
}
