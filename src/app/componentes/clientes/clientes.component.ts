import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { map } from 'rxjs';
import { Cliente } from 'src/app/modelos/cliente.model';
import { ClienteServicio } from 'src/app/servicios/clientes.service';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes?: Cliente[];
  clienteTemp?: Cliente;
  indexTemp: number = -1;

  constructor(private clienteServicio: ClienteServicio){

  }

  ngOnInit(){
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
