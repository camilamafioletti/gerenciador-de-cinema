export class DetalhesFilme {
    id: number;
    titulo: string;
    sinopse: string;
    dataLancamento: string;
  
    urlPoster: string;
    urlSlide: string;
  
    mediaNota: number;
    contagemVotos: string;
  
    generos: string[];
  
    constructor(
      id: number,
      titulo: string,
      sinopse: string,
      dataLancamento: string,
  
      urlPoster: string,
      urlSlide: string,
  
      mediaNota: number,
      contagemVotos: string,
  
      generos: string[]
    ) {
      this.id = id;
      this.titulo = titulo;
      this.sinopse = sinopse;
      this.dataLancamento = dataLancamento;
      this.urlPoster = "https://image.tmdb.org/t/p/original" + urlPoster;
      this.urlSlide = "https://image.tmdb.org/t/p/original" + urlSlide;
      this.mediaNota = mediaNota;
      this.contagemVotos = contagemVotos;
      this.generos = generos;
    }
  }
  