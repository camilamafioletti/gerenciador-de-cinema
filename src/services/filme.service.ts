import { CreditosFilme } from "../../src/models/creditos-filme";
import { DetalhesFilme } from "../../src/models/detalhes-filme";
import { TrailerFilme } from "../../src/models/trailer-filme";
import { ListagemFilme } from "../models/listagem-filme";
import { API_KEY } from "../../secrets";

export class FilmeService {
  private readonly BASE_URL = "https://api.themoviedb.org/3/movie";
  private readonly HEADERS = {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  private async fetchJson(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.HEADERS,
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Ocorreu um erro ao tentar obter os dados requisitados.");
      }
    } catch (error) {
      throw new Error(`Erro na solicitação: ${(error as Error).message}`);
    }
  }

  async selecionarFilmePorPopularidade(): Promise<ListagemFilme[]> {
    const url = `${this.BASE_URL}/popular`;
    const data = await this.fetchJson(url);
    return this.MapearFilmes(data);
  }

  async selecionarFilmeLancamento(): Promise<ListagemFilme[]> {
    const url = `${this.BASE_URL}/now_playing`;
    const data = await this.fetchJson(url);
    return this.MapearFilmes(data);
  }

  async selecionarFilmeEmBreve(): Promise<ListagemFilme[]> {
    const url = `${this.BASE_URL}/upcoming`;
    const data = await this.fetchJson(url);
    return this.MapearFilmes(data);
  }

  public async selecionarDetalhesFilmePorId(id: number): Promise<DetalhesFilme> {
    const url = `${this.BASE_URL}/${id}?language=pt-BR`;
    const obj = await this.fetchJson(url);
    return this.mapearDetalhesFilme(obj);
  }

  public async selecionarTrailersFilmePorId(id: number): Promise<TrailerFilme> {
    const url = `${this.BASE_URL}/${id}/videos`;
    const obj = await this.fetchJson(url);
    return this.mapearTrailersFilme(obj);
  }

  async selecionarCreditosFilmePorId(id: string): Promise<DetalhesFilme> {
    const url = `https://api.themoviedb.org/3/network/${id}`;
    const data = await this.fetchJson(url);
    return this.mapearDetalhesFilme(data);
  }

  private mapearTrailersFilme(obj: any): TrailerFilme {
    console.log(obj);
    return new TrailerFilme(
      obj.id,
      `https://www.youtube.com/embed/${obj.results[0].key}`
    );
  }

  private mapearDetalhesFilme(obj: any): DetalhesFilme {
    return new DetalhesFilme(
      obj.id,
      obj.title,
      obj.overview,
      obj.release_date,
      obj.poster_path,
      obj.backdrop_path,
      obj.vote_average,
      obj.vote_count,
      obj.genres.map((genero: any) => genero.name)
    );
  }

  private MapearFilmes(objetos: any): ListagemFilme[] {
    return objetos.results.map((obj: any) => {
      return new ListagemFilme(
        obj.id,
        obj.title,
        obj.overview,
        obj.poster_path,
        obj.backdrop_path
      );
    });
  }
}
