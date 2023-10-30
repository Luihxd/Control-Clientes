import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,  MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import {MatCardModule} from '@angular/material/card';
import { Cliente } from 'src/app/modelos/cliente.model';
import { NgForm } from '@angular/forms';
import { ClienteServicio } from 'src/app/servicios/clientes.service';
//import {FlashMessagesService} from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


/*export interface ModalData {
  nombre: string;
  apellido: string;
  email: string;
  saldo: number;
}*/


@Component({
  selector: 'app-agregar-cliente-modal',
  templateUrl: './agregar-cliente-modal.component.html',
  styleUrls: ['./agregar-cliente-modal.component.css']
})
export class AgregarClienteModalComponent {

  cliente: Cliente = {nombre: "", apellido:"", email:"", saldo: 0 }
  mostrarMensaje: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AgregarClienteModalComponent>,
    private clienteServicio: ClienteServicio,
    private toastr: ToastrService
  ) {
    //container.style.zIndex = '10000';
  }

  onCerrar(): void {
    this.dialogRef.close();
  }

  onGuardar(clienteForm: NgForm): void {
    //guardar el cliente
    if(clienteForm.valid){
      this.clienteServicio.addCliente(this.cliente);
      this.toastr.success("Cliente agregado correctamente", "Agregado", {timeOut: 4000})
      this.dialogRef.close();
    }else{
      //this.toastr.error("Llena el formulario correctamente", "Error", {timeOut: 4000});
      this.toastr.error("Llena el formulario correctamente.", "Error ", {timeOut: 4000});
      this.mostrarMensaje = true;
      /*const bsModalRef = this.modalService.show("Llena el formulario correctamente");
      setTimeout(() => {
        bsModalRef.hide();
      }, 3000);*/
    }
  }

  ngOnInit() {}
}
