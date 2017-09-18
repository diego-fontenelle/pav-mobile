import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DoacaoProvider } from '../../../providers/doacao.provider';
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

  constructor(public navCtrl: NavController, private doacaoProvider: DoacaoProvider) {}

  create() {
    this.doacao.usuario._id = '59b993be37bf3a396ce27203';
    this.doacaoProvider.create(this.doacao)
      .subscribe(
        data => { this.msg = (<any>data).message; this.navCtrl.push(HomePage); },
        error => console.error(error)
      );
  }
}
