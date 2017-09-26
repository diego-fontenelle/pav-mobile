import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario.provider";
import { LoginPage } from "../login/login";
import { Usuario } from "../../models/usuario";

@Component({
  selector: 'page-cadastrar-usuario',
  templateUrl: 'cadastrar.html'
})
export class CadastrarPage {

  public usuario: any = new Usuario;
  public confirmarSenha: any;
  constructor(
    public navCtrl: NavController,
    public usuarioProvider: UsuarioProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    
  }

  create() {
    if( this.usuario.senha === this.confirmarSenha) {
      let loading = this.loadingCtrl.create();
      this.usuario.dados_pessoais.email = this.usuario.login;
      // Right now we only need 1 estado
      this.usuario.dados_pessoais.endereco.cidade.estado._id = '59b5cb6d6c1fee2767cc65e3';
      loading.present().then(
        () =>  
          this.usuarioProvider.create(this.usuario)
            .subscribe(
              data => { 
                console.log(data);
                const toast = this.toastCtrl.create({
                  message: 'Usuário cadastrado, você já pode fazer login',
                  showCloseButton: true,
                  closeButtonText: 'Ok',
                  position: 'bottom',
                  duration: 2000
                });
                loading.dismiss();
                toast.present();
                setTimeout( () => { this.navCtrl.push(LoginPage) }, 2000);
              },
              error => {
                const toast = this.toastCtrl.create({
                  message: 'Erro ao cadastrar usuário, tente novamente',
                  showCloseButton: true,
                  closeButtonText: 'Ok',
                  position: 'bottom',
                  duration: 3000
                });
                loading.dismiss();
                toast.present();
              }
            )
      )
    }
  }


}
