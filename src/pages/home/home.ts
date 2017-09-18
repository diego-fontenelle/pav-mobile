import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DoacaoProvider } from '../../providers/doacao.provider';
import { UsuarioProvider } from '../../providers/usuario.provider';
import { DoacaoEdit } from '../doacao/edit/edit';
import { DoacaoCreate } from '../doacao/create/create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public doacoes: any;
  public doacoesRealizadas: number;
  public user: any;

  constructor(
    public navCtrl: NavController, 
    private doacaoProvider: DoacaoProvider,
    public usuarioProvider: UsuarioProvider
  ) {

    this.user = usuarioProvider.session;
    console.log(this.user);

    this.doacaoProvider.read()
      .subscribe(
        data => { this.doacoes = data; this.doacoes = this.doacoes.body; this.doacoesRealizadas = this.doacoes.length; },
        error => console.error(error)
      );

  }

  refresh(refresher) {
    this.doacaoProvider.read()
    .subscribe(
      data => { 
        this.doacoes = (<any>data).body; 
        this.doacoesRealizadas = this.doacoes.length; 
        refresher.complete();
      },
      error => console.error(error)
    );
  }

  navigate(type, id) {

    switch(type) {
      case 'edit':
        this.navCtrl.push(DoacaoEdit, {
          id: id
        });
        break;

      case 'create':
        this.navCtrl.push(DoacaoCreate);
        break;
    }  
  }


}
