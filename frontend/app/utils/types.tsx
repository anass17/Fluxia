
export type ReservationStatus = "Completed" | "Cancelled" | "Coming" | "Ongoing";

export interface Reservation {
  id: string;
  dateTime: string;
  price: number;
  status: ReservationStatus;
  hasOrder: boolean;
}