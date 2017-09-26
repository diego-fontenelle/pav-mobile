import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario.provider';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../../pages/home/home';
import { CadastrarPage } from "../cadastrar/cadastrar";
import { TabsPage } from '../../pages/tabs/tabs';
import { TabsPageOng } from '../../pages/tabs-page-ong/tabs-page-ong';
import { ToastController, LoadingController } from 'ionic-angular';

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
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {

  }

  doLogin() {
    // Verificar se user e pw estão preenchidos
    if(this.login && this.senha) {
      // Recuperar usuário por login
      let loading = this.loadingCtrl.create();
      
      loading.present().then(
        () => this.usuarioProvider.login({login: this.login, senha: this.senha})
              .subscribe(
                data => { this.verify(data); loading.dismiss(); },
                error => { 
                  console.log(error);
                  const toast = this.toastCtrl.create({
                    message: 'Erro ao fazer login, tente novamente',
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

  cadastrar() {
    this.navCtrl.push(CadastrarPage);
  }

  verify(data) {
    let usuario = data.usuario;
    // Se foi retornado um usuário, armazena na sessão
    if(usuario) {
      this.usuarioProvider.session = {
        nome: usuario.dados_pessoais.nome, 
        id: usuario._id,
        tipo: usuario.tipo,
        cidade: usuario.dados_pessoais.endereco.cidade
      };
      if(usuario.tipo == 'Doador')
        this.navCtrl.push(TabsPage);
      else {
        this.navCtrl.push(TabsPageOng);
      }
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