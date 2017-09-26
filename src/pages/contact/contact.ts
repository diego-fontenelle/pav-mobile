import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario.provider";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public usuario: any;

  constructor(public navCtrl: NavController, public usuarioProvider: UsuarioProvider) {
    this.usuario = this.usuarioProvider.session;
  }

  ionViewDidLoad() {
    
    console.log(this.usuario);
  }

}
