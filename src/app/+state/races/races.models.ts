/**
 * Interface for the 'Races' data
 */
export interface RacesEntity {
  id: string | number; // Primary ID
  name: string;
  url: string;
  date: string; // Date format: YYYY-MM-DD
}

export interface RacesFinalResult {
  number: string;
  position: string;
  points: string;
  driverName: string;
  driverNationality: string;
  time?: string;
}
