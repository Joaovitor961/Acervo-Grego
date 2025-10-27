export interface Attributes {
  origin?: string;
  symbols?: string[];
  abode?: string;
  powers?: string[];
  family?: {
    parents?: string[];
    siblings?: string[];
    spouse?: string[];
  };
  stories?: string[];
}

export interface BaseEntity {
  id: number;
  name: string;
  description?: string;
  category?: string;
  attributes?: Attributes;
  image?: string; // pode ser caminho relativo
}
