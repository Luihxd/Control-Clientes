import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, from, map, pipe } from "rxjs";
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'


@Injectable()
export class LoginServicio{

  token: string = "";
  userEmail: string = "";

  constructor(private router: Router,
              private fireauth: AngularFireAuth){
  }

  login(email: string, password: string){
    return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(datos  => resolve(datos.user),
        error => reject(error)
      )
    })
  }

  /*Dado que getAutenticacion es una función síncrona que retorna un valor
  inmediatamente, no es adecuada para manejar la autenticación en tiempo
  real.*/
  /*getAutenticacion(){
    const user = firebase.auth().currentUser;
    if(user){
      this.userEmail = user.email ?? "";
      return user.email;
    }
    return null;
  }*/

  getAutenticacion(): Observable<firebase.User | null>{
    return this.fireauth.authState;
  }

  getIdToken(){
    console.log(this.token);
    return this.token;
  }

  isAutenticado(){
    return this.token != "";
  }

  logout(){
    firebase.auth().signOut().then(
      () => {
        this.token = "";
        this.router.navigate(['/']);
      }
    ).catch((error) => {
      console.log(error);
    })
  }

}



