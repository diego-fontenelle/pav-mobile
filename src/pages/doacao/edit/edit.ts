import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DoacaoProvider } from '../../../providers/doacao.provider';
import { UsuarioProvider } from '../../../providers/usuario.provider';
import { Doacao } from '../../../models/doacao';
import { Http } from '@angular/http';
import { HomePage } from '../../home/home';

@Component({
  selector: 'doacao-edit',
  templateUrl: 'edit.html'
})
export class DoacaoEdit {

  public doacao: any;
  public dataCriacao: any;
  public msg: any
  public ong: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private doacaoProvider: DoacaoProvider,
    private usuarioProvider: UsuarioProvider,
    public http: Http
  ) {}

  ionViewDidLoad() {
    this.doacaoProvider.read(this.navParams.get('id'))
    .subscribe(
      data => { 
        this.doacao = data; 
        this.doacao = this.doacao.body; 
        this.dataCriacao = new Date(this.doacao.data_criacao);
        this.dataCriacao = this.dataCriacao.getDate() + '/' + this.dataCriacao.getMonth() + '/' + this.dataCriacao.getFullYear();
      },
      error => { 
        let toast = this.toastCtrl.create({
          message: 'Erro ao recuperar doação, tente novamente.', 
          showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'bottom',
          duration: 3000
        }); 

        toast.present();

        console.error(error); 

      },
      () => this.ong = this.usuarioProvider.session.tipo == 'Doador' ? false : true
    );
  }

  update() {
    this.doacaoProvider.update(this.doacao)
      .subscribe(
        data => { 
          let message = <any>data; 
          this.msg = message.message; 
          this.navCtrl.push(HomePage)
        },
        error => {
          let toast = this.toastCtrl.create({
            message: 'Erro ao atualizar, tente novamente', 
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'bottom',
            duration: 3000
          }); 

          toast.present();
          
          console.error(error); 
        
        }
      )
  }
}
