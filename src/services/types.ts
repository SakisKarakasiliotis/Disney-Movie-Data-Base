export type Nullable<T> = T | null;

export interface DisneyCharacter {
  _id: number;
  films?: Nullable<string[]>;
  shortFilms?: Nullable<string[]>;
  tvShows?: Nullable<string[]>;
  videoGames?: Nullable<string[]>;
  parkAttractions?: Nullable<string[]>;
  allies?: Nullable<string[]>;
  enemies?: Nullable<string[]>;
  sourceUrl: string
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  url: string
  __v: number
}

export interface DisneyCharacterApiResponse {
  info: {
    count: number;
    totalPages?: number;
    next?: Nullable<string>;
    prev?: Nullable<string>;
  };
  data?: Nullable<DisneyCharacter[]>;
}
