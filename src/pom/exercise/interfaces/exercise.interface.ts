export interface Exercise {
  id:       string;
  name:     string;
  category: Category;
  image:    string;
  alternativeImage?: string|null;
}

export enum Category {
  ALL = "Todos",
  CORE = "Core",
  CHEST = "Pecho",
  LEGS = "Piernas",
  BACK = "Espalda",
  GLOBAL = "Global"
}
