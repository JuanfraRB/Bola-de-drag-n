export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

export interface Planet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
}

export interface Character {
  id: number;
  name: string;
  image: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  affiliation: string;
  originPlanet?: Planet;
  transformations?: Transformation[];
}

export interface ApiResponse <T> {
    items: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
    links: {
        first: string;
        previous: string;
        next: string;
        last: string;
    };
}
