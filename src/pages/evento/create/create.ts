import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { UsuarioProvider } from "../../../providers/usuario.provider";
import { EventoProvider } from "../../../providers/evento.provider";
import { EventoPage } from "../evento";
import { Evento } from "../../../models/evento";

@Component({
  selector: 'page-create-evento',
  templateUrl: 'create.html'
})
export class CreateEventoPage {

  public evento: any = new Evento;

  constructor(
    public navCtrl: NavController, 
    private eventoProvider: EventoProvider,
    public usuarioProvider: UsuarioProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    this.evento.usuario._id = usuarioProvider.session.id;
    console.log(this.evento.usuario);
  }

  ionViewDidLoad() {
    this.evento.endereco.cidade._id = this.usuarioProvider.session.cidade;
  }

  create() {
    let loading = this.loadingCtrl.create();

    loading.present().then(
      () =>  
        this.eventoProvider.create({evento: this.evento})
          .subscribe(
            data => { 
              console.log(data);
              loading.dismiss();
              this.navCtrl.push(EventoPage);
            },
            error => {
              const toast = this.toastCtrl.create({
                message: 'Erro cadastrar evento, tente novamente',
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
  }


}
