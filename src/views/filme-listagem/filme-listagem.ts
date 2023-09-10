import "./filme-listagem.css";
import { v4 as uuidv4 } from "uuid";
import "bootstrap";
import { FilmeService } from "../../services/filme.service";
import { ListagemFilme } from "../../models/listagem-filme";

console.log(uuidv4());

export class VisualizarListagemFilmes {
  FilmeService: FilmeService;
  pnlPrincipal: HTMLDivElement;

  constructor() {
    this.FilmeService = new FilmeService();
    this.registrarElementos();
    this.FilmeService.selecionarFilmePorPopularidade().then(filmes => this.exibirFilmes("Em Alta", filmes));
    this.FilmeService.selecionarFilmeLancamento().then(filmes => this.exibirFilmes("Lançamentos", filmes));
    this.FilmeService.selecionarFilmeEmBreve().then(filmes => this.exibirFilmes("Em Breve", filmes));
  }

  registrarElementos() {
    this.pnlPrincipal = document.getElementById("pnlPrincipal") as HTMLDivElement;
  }

  private exibirFilmes(titulo: string, filmes: ListagemFilme[]): void {
    const lblTitulo = document.createElement("h2");
    lblTitulo.textContent = titulo;
    lblTitulo.classList.add("fs-2", "text-warning");

    const linhaCards = document.createElement("div");
    linhaCards.classList.add("row", "g-3");
    linhaCards.appendChild(lblTitulo);

    for (let filme of filmes) {
      const coluna = this.criarColuna(filme);
      linhaCards.appendChild(coluna);
    }

    this.pnlPrincipal.appendChild(linhaCards);
  }

  private criarColuna(filme: ListagemFilme): HTMLDivElement {
    const coluna = document.createElement("div");
    coluna.classList.add(
      "app-coluna-poster",
      "col-6",
      "col-md-4",
      "col-lg-2",
      "text-center",
      "card" 
    );

    coluna.addEventListener("click", () => {
      window.location.href = filme.urlDetalhes;
    });

    const card = document.createElement("div");
    card.classList.add("d-grid", "gap-2");

    const imgFilme = document.createElement("img");
    imgFilme.classList.add("img-fluid", "rounded-3");
    imgFilme.src = filme.urlPoster;

    const lblTituloFilme = document.createElement("a");
    lblTituloFilme.classList.add("fs-5", "link-warning", "text-decoration-none");
    lblTituloFilme.textContent = filme.titulo;
    lblTituloFilme.href = filme.urlDetalhes;

    card.appendChild(imgFilme);
    card.appendChild(lblTituloFilme);
    coluna.appendChild(card);

    return coluna;
  }
}

window.addEventListener('load', () => new VisualizarListagemFilmes());
