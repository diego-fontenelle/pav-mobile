import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { EventoProvider } from '../../../providers/evento.provider';
import { UsuarioProvider } from '../../../providers/usuario.provider';
import { Doacao } from '../../../models/doacao';
import { Http } from '@angular/http';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  public evento: any;
  public dataCriacao: any;
  public doador: any;
  private body: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private eventoProvider: EventoProvider,
    private usuarioProvider: UsuarioProvider,
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
          this.body = {
            usuario: {
              _id: this.usuarioProvider.session.id
            },
      
            _id: this.evento._id
          };
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
    this.doador = this.usuarioProvider.session.tipo == 'Doador' ? true : false;
  }

  avaliarUsuario() {
    let alert = this.alertCtrl.create(
      {
        title: 'Avalie o grupo',
        message: 'Como foi sua experiência com esse grupo ? ',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              return true;
            }
          },
          {
            text: 'Ok',
            handler: data => {
              const body = { 
                _id: this.evento.usuario._id, 
                avaliacao: {
                  usuario: { 
                    _id: this.usuarioProvider.session.id
                  }, 
                  score: data
                }
              }

              this.usuarioProvider.avaliar(body)
                .subscribe(
                  response => {
                    let toast = this.toastCtrl.create({
                      message: (<any>response).message, 
                      showCloseButton: true,
                      closeButtonText: 'Ok',
                      position: 'bottom',
                      duration: 3000
                    }); 
          
                    toast.present();
                  },
                  error => {
                    let toast = this.toastCtrl.create({
                      message: "Por favor, tente novamente", 
                      showCloseButton: true,
                      closeButtonText: 'Ok',
                      position: 'bottom',
                      duration: 3000
                    }); 
          
                    toast.present();
                  }
                )
            }
          }
        ],
        inputs: [
          { value: "1", name: "Ruim", label: "Ruim", type: 'radio' },
          { value: "2", name: "Boa", label: "Boa", type: 'radio' },
          { value: "3", name: "Excelente", label: "Execelente", type: 'radio' }
        ]
      }
    );
    alert.present();
  }

  toggleLike() {
    this.eventoProvider.toggleLike(this.body)
      .subscribe(
        res => console.log(res),
        error => console.log(error)
      )
  }

}
