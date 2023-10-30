import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { map } from 'rxjs';
import { Cliente } from 'src/app/modelos/cliente.model';
import { ClienteServicio } from 'src/app/servicios/clientes.service';
import { AgregarClienteModalComponent } from './agregar-cliente-modal/agregar-cliente-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginServicio } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {

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

  abrirAgregarDialog(): void {
    const dialogRef = this.dialog.open(AgregarClienteModalComponent, {
      width: '600px',
      //data: { nombre: this.nombre, apellido: this.apellido, email: this.email, saldo: this.saldo}
      data: {}
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.nombre = res;
    });
  }
  /*setDefault(): void{
    this.clienteTemp = undefined;
    this.indexTemp = -1;
    this.getClientes();

  }

  getClientes(): void{

  }

  setSelectedCliente(cliente: Cliente, index: number){
    this.clienteTemp = cliente;
    this.indexTemp = index;
  }*/
}
