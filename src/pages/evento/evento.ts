import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventoProvider } from "../../providers/evento.provider";
import { UsuarioProvider } from "../../providers/usuario.provider";
import { DetailsPage } from './details/details';
import { CreateEventoPage } from "./create/create";
import { LoadingController } from "ionic-angular";

@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html'
})
export class EventoPage {

  public eventos: any;
  public usuario: any;

  constructor(
    public navCtrl: NavController, 
    public eventoProvider: EventoProvider,
    public usuarioProvider: UsuarioProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    this.usuario = this.usuarioProvider.session;
    console.log(this.usuario);

    loading.present().then(
      () => this.eventoProvider.read()
            .subscribe(
              eventos => {
                this.eventos = (<any>eventos).body;
                this.setData();
                loading.dismiss(); 
              },
              error => { console.log(error); loading.dismiss(); }
            )
    );
  }

  setData() {

    this.eventos.forEach(evento => {
      let data = new Date(evento.data);
      evento.data = data.getDate() + '/' + data.getMonth() + '/' + data.getFullYear();
    });

  }


  refresh(refresher) {
    let loading = this.loadingCtrl.create();
    
    loading.present().then(
      () => this.eventoProvider.read()
            .subscribe(
              data => { 
                this.eventos = (<any>data).body;
                refresher.complete();
                loading.dismiss();
              },
              error => { console.error(error); loading.dismiss(); }
            )
    );
  }

  navigate(page, id) {

    switch (page) {
      case 'view':
        this.navCtrl.push(DetailsPage, {
          id: id
        });
        break;

      case 'create':
        this.navCtrl.push(CreateEventoPage)
    
      default:
        break;
    }
  }


}