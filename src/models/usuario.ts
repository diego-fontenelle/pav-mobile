export class Usuario {
  public id;
  public login: string;
  public senha: string;
  public primeiro_acesso: boolean;
  public ativo: boolean;
  public data_criacao: Date;
  public tipo: string;
  public dados_pessoais = {
    nome: '',
    sobrenome: '',
    telefone: '',
    email: '',
    endereco: {
      logradouro: '',
      bairro: '',
      complemento: '',
      cidade: {
        _id: '',
        nome: '',
        estado: {
          _id: '',
          nome: '',
        },
      }
    }
  }

  constructor() {
    this.ativo = true;
    this.primeiro_acesso = true;
    this.data_criacao = new Date();
  }

}