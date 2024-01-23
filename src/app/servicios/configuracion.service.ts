import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Configuracion } from "../modelos/configuration.model";
import { Observable } from "rxjs";
import { filter } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable()
export class ConfiguracionServicio{
 configuracionDoc: AngularFirestoreDocument<Configuracion>;
 configuracionObservable: Observable<Configuracion | undefined>;
 id = '1';

 //ID unico de valor 1
 constructor(private firedb: AngularFirestore) {}

 getConfiguracion(): Observable<Configuracion | undefined>{
    this.configuracionDoc = this.firedb.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracionObservable = this.configuracionDoc.valueChanges().pipe(filter((configuracion) => !!configuracion));
    return this.configuracionObservable;
 }

 modConfiguracion(configuracion: Configuracion){
  this.configuracionDoc = this.firedb.doc<Configuracion>(`configuracion/${this.id}`);
  this.configuracionDoc.update(configuracion);
 }
}
