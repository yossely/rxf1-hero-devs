/**
 * Interface for the 'Races' data
 */
export interface RacesEntity {
  id: string; // Primary ID
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

export interface RacesQualifyingResult {
  number: string;
  position: string;
  driverName: string;
  driverNationality: string;
  Q1: string;
  Q2?: string;
  Q3?: string;
}
