import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DoacaoProvider } from '../../providers/doacao.provider';
import { DoacaoEdit } from '../doacao/edit/edit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public doacoes: any;
  public doacoesRealizadas: number;

  constructor(public navCtrl: NavController, private doacaoProvider: DoacaoProvider) {

    this.doacaoProvider.read()
      .subscribe(
        data => { this.doacoes = data; this.doacoes = this.doacoes.body; this.doacoesRealizadas = this.doacoes.length; },
        error => console.error(error)
      );

  }

  navigate(id) {
    this.navCtrl.push(DoacaoEdit, {
      id: id
    })
  }


}
