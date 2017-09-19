import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    private eventoProvider: EventoProvider,
    public http: Http
  ) {

    this.eventoProvider.read(this.navParams.get('id'))
      .subscribe(
        data => { 
          console.log(data);
          this.evento = (<any>data).body;
          this.dataCriacao = new Date(this.evento.data);
          this.dataCriacao = this.dataCriacao.getDate() + '/' + this.dataCriacao.getMonth() + '/' + this.dataCriacao.getFullYear();
        },
        error => console.error(error)
      );

  }
}
