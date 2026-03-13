
export type ReservationStatus = "Completed" | "Cancelled" | "Coming" | "Ongoing";

export interface Reservation {
  id: string;
  dateTime: string;
  price: number;
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