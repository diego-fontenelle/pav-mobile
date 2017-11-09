import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario.provider";
import { LoginPage } from "../login/login"

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public usuario: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public usuarioProvider: UsuarioProvider) {
    this.usuario = this.usuarioProvider.session;
  }

  ionViewDidLoad() {
    
    console.log(this.usuario);
  }

  logout() {
    const toast = this.toastCtrl.create({
      message: 'Login temporariamente desabilitado. Para deslogar é necessário fechar o app',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'bottom',
      duration: 5000
    });

    toast.present();
    // this.usuarioProvider.session = {};
    // this.usuario = {};
    // this.navCtrl.setRoot(LoginPage);
  }

}
