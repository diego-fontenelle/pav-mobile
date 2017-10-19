import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { DoacaoProvider } from '../../../providers/doacao.provider';
import { UsuarioProvider } from '../../../providers/usuario.provider';
import { EventoProvider } from '../../../providers/evento.provider';
import { Http } from '@angular/http';
import { HomePageOng } from '../../ong/home';
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
  public eventos: any;
  private eventoSelecionado: any;
  public showEventos: boolean = false;
  // Object with options used to create the alert
  private options = {
    title: 'Escolha um evento',
    message: 'para receber a doação',
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
          console.log(data);
          
          this.eventoProvider.read(data)
            .subscribe(
              data => {
                this.eventoSelecionado = (<any>data).body;
                this.eventoSelecionado.doacoes.push(this.doacao);
                this.eventoProvider.update(this.eventoSelecionado)
                .subscribe(
                  data => { 
                    console.log(data); 
                    this.doacao.status = 'Recebida';
                    this.updateDoacao();
                  }
                );
              }
            )

        }
      }
    ],
    inputs: []
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private doacaoProvider: DoacaoProvider,
    private usuarioProvider: UsuarioProvider,
    private eventoProvider: EventoProvider,
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
      () => { 
        this.ong = this.usuarioProvider.session.tipo == 'Doador' ? false : true;
        if(this.ong)
          this.getEventos();
      }
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

  getEventos() {
    this.eventoProvider.getByUsuario(this.usuarioProvider.session.id)
    .subscribe(
      eventos => this.eventos = (<any>eventos).body,
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
      },
      () => this.eventos.forEach(evento => {
        this.options.inputs.push(
            {
              value: evento._id,
              name: evento.nome,
              label: evento.nome,
              type: 'radio'
            }
          )
        })
    );
  }

  presentConfirm() {    
    // Create the alert with the options
    let alert = this.alertCtrl.create(this.options);
    alert.present();
  }

  updateDoacao() {
    this.doacaoProvider.update(this.doacao).
    subscribe(
      data => { console.log('doação atualizada'); this.navCtrl.push(HomePageOng) }
    )
  }
}
