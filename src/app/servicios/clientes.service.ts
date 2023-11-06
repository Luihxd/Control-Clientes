import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Cliente } from '../modelos/cliente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteServicio {

  clientesRef: AngularFirestoreCollection<Cliente>;
  clientesDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  constructor(private firestore: AngularFirestore) {
    this.clientesRef = this.firestore.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
    //this.clientes = this.firestore.collection('clientes').snapshotChanges();
  }

  getClientes(): Observable<Cliente[]> {
    //Obtener clientes
    //this.clientesRef = this.firestore.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
    console.log("Aun no hacemos get, ", this.clientes);
    this.clientes = this.clientesRef.snapshotChanges().pipe(
        map(cambios => {
            return cambios.map( accion => {
                const datos = accion.payload.doc.data() as Cliente;
                datos.id = accion.payload.doc.id;
                return datos;
            })
        })
    );
    console.log("Ya hicimos un get, ", this.clientes);
    return this.clientes;

  }

  addCliente(cliente: Cliente): Promise<DocumentReference<Cliente>> {
    return this.clientesRef.add({... cliente})
  }

  updateCliente(id: string, newData: any){
    return this.clientesRef.doc(id).update(newData);
  }

  deleteCliente(id: string){
    return this.clientesRef.doc(id).delete();
  }
}
