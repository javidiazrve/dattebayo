export interface Anime{
    
    _id?: string,
    nombre: string,
    descripcion: string,
    fechaEstreno: string,
    poster: string,
    fotoBackground: string,
    idioma: string,
    status: boolean,
    temporadas: Temporada[]
}

export interface Temporada{
    _id: string,
    temporada: string,
    status: boolean,
    episodios: Episodio[]
}

export interface Episodio{
    _id?:string,
    temporada: string,
    numero: string,
    nombre: string,
    sinopsis: string,
    duracion: string,
    tipo: Number,
    poster: string,
    url: string
}

export interface Usuario{
    favoritos: string[]
}