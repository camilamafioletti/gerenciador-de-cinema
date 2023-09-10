import { HistoricoUsuario as SalvosFavoritos } from "../models/favoritos-filme"


export class LocalStorageService {
  private endereco: string = 'gerenciador_cinema-ts:historico@1.0.0';

  salvarDados(dados: SalvosFavoritos): void {
    const jsonString = JSON.stringify(dados);

    localStorage.setItem(this.endereco, jsonString);
  }

  carregarDados(): SalvosFavoritos {
    const dadosJson = localStorage.getItem(this.endereco);

    if (dadosJson)
      return JSON.parse(dadosJson) as SalvosFavoritos;

    return new SalvosFavoritos();
  }
}