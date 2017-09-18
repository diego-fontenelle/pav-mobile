export class Doacao {

  public titulo: String;
  public descricao: String;
  public data_criacao: Date;
  public publico_alvo: String;

  constructor() {
    this.titulo = '';
    this.descricao = '';
    this.data_criacao = new Date();
    this.publico_alvo = '';
  }


}