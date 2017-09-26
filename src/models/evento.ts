export class Evento {
  
    public nome: String;
    public descricao: String;
    public data: Date;
    public : String;
    public usuario = {
      _id: ''
    };
    public endereco = {
      logradouro: '',
      bairro: '',
      complemento: '',
      cidade: {
        _id: ''
      }
    };
  
    constructor() {
      this.nome = '';
      this.descricao = '';
    }
  
  
  }