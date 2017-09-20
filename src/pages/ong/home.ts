import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { DoacaoProvider } from '../../providers/doacao.provider'
import { DoacaoEdit } from "../doacao/edit/edit";


@Component({
  selector: 'page-ong-home',
  templateUrl: 'home.html'
})
export class HomePageOng {

  public doacoes;

  constructor(
    public navCtrl: NavController, 
    public doacaoProvider: DoacaoProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present().then(
      () => this.doacaoProvider.read()
        .subscribe(
          data => {
            this.doacoes = (<any>data).body; 
            loading.dismiss();
          },

          error => {
            console.log(error);
            const toast = this.toastCtrl.create({
              message: 'Erro ao carregar doações, tente novamente.',
              showCloseButton: true,
              closeButtonText: 'Ok',
              position: 'bottom',
              duration: 3000
            });
      
            toast.present();
          }
        )
    );
  }

  refresh(refresher) {
    let loading = this.loadingCtrl.create();
      loading.present().then(
      () => this.doacaoProvider.read()
            .subscribe(
              data => { 
                this.doacoes = (<any>data).body;
                refresher.complete();
                loading.dismiss()
              },
              error => { 
                console.error(error); 
                loading.dismiss() 
                const toast = this.toastCtrl.create({
                  message: 'Erro ao carregar doações, tente novamente.',
                  showCloseButton: true,
                  closeButtonText: 'Ok',
                  position: 'bottom',
                  duration: 3000
                });
          
                toast.present();
              }
            )
    );
  }

  navigate(type, id) {

    switch(type) {
      case 'edit':
        this.navCtrl.push(DoacaoEdit, {
          id: id
        });
        break;
    }  
  }

}
