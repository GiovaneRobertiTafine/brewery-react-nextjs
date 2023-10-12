import { Type } from "../enums/type.enum";

export interface BreweryFilter {
    totalPerType: { [key in TypeIndex]: string };
}

export type TypeIndex = keyof typeof Type | 'TODOS';