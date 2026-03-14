
export type ReservationStatus = "Completed" | "Cancelled" | "Coming" | "Ongoing";

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
  hasOrder: boolean;
}

export interface TablePosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}