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