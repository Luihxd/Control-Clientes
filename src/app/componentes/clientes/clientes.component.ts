import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { map } from 'rxjs';
import { Cliente } from 'src/app/modelos/cliente.model';
import { ClienteServicio } from 'src/app/servicios/clientes.service';
import { AgregarClienteModalComponent } from './agregar-cliente-modal/agregar-cliente-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginServicio } from 'src/app/servicios/login.service';
import { EliminarClienteModalComponent } from './eliminar-cliente-modal/eliminar-cliente-modal.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {

  id: string;
  nombre: string;
  apellido: string;
  email: string;
  saldo: number;

  clientes?: Cliente[];
  clienteTemp?: Cliente;
  indexTemp: number = -1;

  constructor(private clienteServicio: ClienteServicio,
              public dialog: MatDialog,
              private loginServicio: LoginServicio){
  }

  ngOnInit(){
    console.log("Antees del get, ");
    this.clienteServicio.getClientes().subscribe(
      clientes=>{
        this.clientes = clientes
        console.log(clientes.length)
      }
    );
  }

  getSaldoTotal(): number{
    let saldoTotal = 0;
    if(this.clientes){
      this.clientes.forEach( cliente =>{
        saldoTotal += cliente?.saldo ?? 0;
      })
    }
    return saldoTotal;
  }

  abrirAgregarClienteDialog(): void {
    const dialogRef = this.dialog.open(AgregarClienteModalComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((res) => {
      //this.nombre = res;
    });
  }

  abrirModificarClienteDialog(cliente: Cliente): void {
    this.id = cliente.id ?? "";
    this.nombre = cliente.nombre ?? "";
    this.apellido = cliente.apellido ?? "";
    this.email = cliente.email ?? "";
    this.saldo = cliente.saldo ?? 0;
    console.log("antes de abrir", this.id);
    const dialogRef = this.dialog.open(AgregarClienteModalComponent, {
      width: '400px',
      data: { data: { id: this.id, nombre: this.nombre, apellido: this.apellido, email: this.email, saldo: this.saldo}}
    });

    dialogRef.afterClosed().subscribe((res) => {

    });
  }

  abrirEliminarClienteDialog(cliente: Cliente): void {
    this.id = cliente.id ?? "";
    this.nombre = cliente.nombre ?? "";
    this.apellido = cliente.apellido ?? "";
    console.log("antes de abrir", this.id);
    const dialogRef = this.dialog.open(EliminarClienteModalComponent, {
      width: '500px',
      data: { data: { id: this.id, nombre: this.nombre, apellido: this.apellido}}
    });

    dialogRef.afterClosed().subscribe((res) => {

    });
  }

}
