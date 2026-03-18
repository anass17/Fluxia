
export type ReservationStatus = "Completed" | "Cancelled" | "Coming" | "Ongoing";

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
  table_number: number;
  hasOrder: boolean;
}

export interface TablePosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}


export interface MenuItem {
  id: string;
  Name: string;
  RecipeCategory: string;
  RecipeIngredientParts: string[];
  Price: number;
  Calories: number;
  FatContent: number;
  SaturatedFatContent: number;
  CholesterolContent: number;
  SodiumContent: number;
  CarbohydrateContent: number;
  FiberContent: number;
  SugarContent: number;
  ProteinContent: number;
}


export type TableStatus = "free" | "occupied" | "need cleaning" | "awaiting";


export interface Table {
  id: string;
  number: number;
  status: TableStatus;
  occupationTime: string;
  estimatedWait?: string;
}