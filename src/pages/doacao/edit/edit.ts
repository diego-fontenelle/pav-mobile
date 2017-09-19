import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DoacaoProvider } from '../../../providers/doacao.provider';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private doacaoProvider: DoacaoProvider,
    public http: Http
  ) {

    this.doacaoProvider.read(this.navParams.get('id'))
      .subscribe(
        data => { 
          this.doacao = data; 
          this.doacao = this.doacao.body; 
          this.dataCriacao = new Date(this.doacao.data_criacao);
          this.dataCriacao = this.dataCriacao.getDate() + '/' + this.dataCriacao.getMonth() + '/' + this.dataCriacao.getFullYear();
        },
        error => console.error(error)
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
        error => console.error(error)
      )
  }
}
