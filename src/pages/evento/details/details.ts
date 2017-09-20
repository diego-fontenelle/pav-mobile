import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { EventoProvider } from '../../../providers/evento.provider';
import { Doacao } from '../../../models/doacao';
import { Http } from '@angular/http';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  public evento: any;
  public dataCriacao: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    private eventoProvider: EventoProvider,
    public http: Http
  ) {}

  ionViewDidLoad() {
    let loading = this.loadCtrl.create();
    loading.present().then(
      () => this.eventoProvider.read(this.navParams.get('id'))
      .subscribe(
        data => { 
          console.log(data);
          this.evento = (<any>data).body;
          this.dataCriacao = new Date(this.evento.data);
          this.dataCriacao = this.dataCriacao.getDate() + '/' + this.dataCriacao.getMonth() + '/' + this.dataCriacao.getFullYear();
          loading.dismiss();
        },
        error => { 
          console.error(error);
          const toast = this.toastCtrl.create({
            message: 'Erro ao carregar o evento, tente novamente.',
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'bottom',
            duration: 3000
          });
    
          toast.present();
          loading.dismiss();
        }
      )
    );
  }
}
