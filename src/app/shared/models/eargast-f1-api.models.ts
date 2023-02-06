interface ErgastF1APIDriver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  /**
   * Date of birth
   *  format: YYYY-MM-DD
   */
  dateOfBirth: string;
  nationality: string;
}

interface ErgastF1APIDriverTable {
  season: string;
  Drivers: ErgastF1APIDriver[];
}

interface ErgastF1APILocation {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

interface ErgastF1APICircuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: ErgastF1APILocation;
}

interface ErgastF1APIRace {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: ErgastF1APICircuit;
  // Date format: YYYY-MM-DD
  date: string;
  // Time format: hh:mm:ssZ
  time: string;
}

interface ErgastF1APIRaceTable {
  season: string;
  Races: ErgastF1APIRace[];
}

export interface ErgastF1APIBaseResponse {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    DriverTable?: ErgastF1APIDriverTable;
    RaceTable?: ErgastF1APIRaceTable;
  };
}

export interface ErgastF1APIPaginationQueryParams {
  limit: number;
  offset: number;
}
