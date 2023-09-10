import { FilmeService } from "../../services/filme.service";
import "./filme-detalhes.css";
import { DetalhesFilme } from "../../models/detalhes-filme";
import { TrailerFilme } from "../../models/trailer-filme";
import { LocalStorageService } from "../../services/storage.service";
import { HistoricoUsuario } from "../../models/favoritos-filme";

export class VisualizarDetalhesFilme {
  // Declaração das propriedades da classe
  titulo: HTMLParagraphElement;
  votos: HTMLParagraphElement;
  dataLancamento: HTMLDataElement;
  imagemFilme: HTMLImageElement;
  trailer: HTMLIFrameElement;
  texto: HTMLParagraphElement;
  FilmeService: FilmeService;
  generos: HTMLDivElement;
  idSelecionado: number;
  localStorageService: LocalStorageService;
  favoritos: HistoricoUsuario;

  constructor() {
    this.registrarElementos();
    this.localStorageService = new LocalStorageService();
    this.favoritos = new HistoricoUsuario();
    this.idSelecionado = this.getIdSelecionado();
    this.FilmeService = new FilmeService();

    this.carregarDetalhesETrailer();
  }

  private getIdSelecionado(): number {
    const params = new URLSearchParams(window.location.search);
    return Number.parseInt(params.get("id") as string) || 0;
  }

  private registrarElementos() {
    this.titulo = document.getElementById("titulo") as HTMLParagraphElement;
    this.votos = document.getElementById("votos") as HTMLParagraphElement;
    this.dataLancamento = document.getElementById("dataLancamento") as HTMLDataElement;
    this.imagemFilme = document.getElementById("img") as HTMLImageElement;
    this.trailer = document.getElementById("iframeTrailer") as HTMLIFrameElement;
    this.texto = document.getElementById("texto") as HTMLParagraphElement;
    this.generos = document.getElementById("generos") as HTMLDivElement;

    const favoritoButton = document.getElementById("favorito") as HTMLButtonElement;
    favoritoButton.addEventListener("click", () => this.toggleFavorito());
  }

  private carregarDetalhesETrailer() {
    this.FilmeService.selecionarDetalhesFilmePorId(this.idSelecionado).then(
      (filme) => {
        this.substituirElementos(filme);
        this.atualizarFavoritoButton();
      }
    );

    this.FilmeService.selecionarTrailersFilmePorId(this.idSelecionado).then(
      (trailer) => this.substituirTrailer(trailer)
    );
  }

  private toggleFavorito() {
    if (this.favoritos.filmes_ids.includes(this.idSelecionado)) {
      this.favoritos.filmes_ids = this.favoritos.filmes_ids.filter((id) => id !== this.idSelecionado);
    } else {
      this.favoritos.filmes_ids.push(this.idSelecionado);
    }

    this.localStorageService.salvarDados(this.favoritos);
    this.atualizarFavoritoButton();
  }

  private atualizarFavoritoButton() {
    const favoritoButton = document.getElementById("favorito") as HTMLButtonElement;
    favoritoButton.textContent = this.favoritos.filmes_ids.includes(this.idSelecionado)
      ? "Remover dos Favoritos"
      : "Adicionar aos Favoritos";
  }

  private substituirTrailer(trailer: TrailerFilme): void {
    this.trailer.src = trailer.sourceUrl;
  }

  private substituirElementos(filme: DetalhesFilme): void {
    this.titulo.textContent = filme.titulo;
    this.votos.textContent = `${filme.contagemVotos} Votos`;
    this.dataLancamento.textContent = filme.dataLancamento;
    this.imagemFilme.src = filme.urlPoster;
    this.texto.textContent = filme.sinopse;

    filme.generos.forEach((genero) => {
      const badge = document.createElement("span");
      badge.className = "badge rounded-pill fs-5 px-4 py-2 bg-warning text-dark";
      badge.textContent = genero;
      this.generos.appendChild(badge);
    });
  }
}

window.addEventListener("load", () => new VisualizarDetalhesFilme());
