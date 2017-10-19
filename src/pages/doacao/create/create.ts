import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DoacaoProvider } from '../../../providers/doacao.provider';
import { UsuarioProvider } from '../../../providers/usuario.provider';
import { Doacao } from '../../../models/doacao';
import { HomePage } from '../../home/home';

@Component({
  selector: 'doacao-create',
  templateUrl: 'create.html'
})
export class DoacaoCreate {

  public doacao: Doacao = new Doacao();
  public dataCriacao: any;
  public msg: any

  constructor(
    public navCtrl: NavController, 
    private doacaoProvider: DoacaoProvider,
    private usuarioProvider: UsuarioProvider,
    public toastCtrl: ToastController
  ) {}

  create() {
    this.doacao.usuario._id = this.usuarioProvider.session.id;
    this.doacaoProvider.create(this.doacao)
      .subscribe(
        data => { this.msg = (<any>data).message; this.navCtrl.push(HomePage); },
        error => {
          let toast = this.toastCtrl.create({
            message: 'Erro ao cadastrar doação, tente novamente.', 
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'bottom',
            duration: 3000
          }); 

          toast.present();
          console.error(error);
        }
      );
  }
}
