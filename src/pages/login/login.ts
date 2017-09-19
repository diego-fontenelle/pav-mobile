import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario.provider';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../../pages/home/home';
import { TabsPage } from '../../pages/tabs/tabs';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public login: any;
  public senha: any;

  constructor(
    public navCtrl: NavController, 
    private usuarioProvider: UsuarioProvider,
    private nativeStorage: NativeStorage,
    public toastCtrl: ToastController) {

  }

  doLogin() {
    // Verificar se user e pw estão preenchidos
    if(this.login && this.senha) {
      // Recuperar usuário por login
      this.usuarioProvider.login({login: this.login, senha: this.senha})
        .subscribe(
          data => this.verify(data),
          error => { 
            console.log(error);
            const toast = this.toastCtrl.create({
              message: 'Erro ao fazer login, tente novamente',
              showCloseButton: true,
              closeButtonText: 'Ok',
              position: 'bottom',
              duration: 3000
            });
      
            toast.present();
          }
        )    
    } else {
      const toast = this.toastCtrl.create({
        message: 'Preencha o login e senha',
        showCloseButton: true,
        closeButtonText: 'Ok',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } 
  }

  verify(data) {
    let usuario = data.usuario;
    // Se foi retornado um usuário, armazena na sessão
    if(usuario) {
      this.usuarioProvider.session = {
        nome: usuario.dados_pessoais.nome, 
        id: usuario._id
      };
      this.navCtrl.push(TabsPage);
    }
      // this.nativeStorage.setItem('usuario', {nome: usuario.nome, id: usuario._id})
      //   .then(
      //     () => { console.log('Stored item!'); this.navCtrl.push(TabsPage) },
      //     error => console.error('Error storing item', error)
      //   ); 
    else {
      const toast = this.toastCtrl.create({
        message: 'Usuário ou senha incorreta',
        showCloseButton: true,
        closeButtonText: 'Ok',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}