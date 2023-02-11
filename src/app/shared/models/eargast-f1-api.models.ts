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

interface ErgastF1APIConstructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

interface ErgastF1APITime {
  millis?: string;
  time: string;
}
interface ErgastF1APIAverageSpeed {
  units: string;
  speed: string;
}

interface ErgastF1APIFastestLap {
  rank: string;
  lap: string;
  Time: ErgastF1APITime;
  AverageSpeed: ErgastF1APIAverageSpeed;
}

interface ErgastF1APIRaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: ErgastF1APIDriver;
  Constructor: ErgastF1APIConstructor;
  grid: string;
  laps: string;
  status: string;
  Time?: ErgastF1APITime;
  FastestLap: ErgastF1APIFastestLap;
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
  Results?: ErgastF1APIRaceResult[];
  QualifyingResults?: ErgastF1APIRaceQualifyingResult[];
}

interface ErgastF1APIRaceTable {
  season: string;
  round?: string;
  Races: ErgastF1APIRace[];
}

export interface ErgastF1APIDriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: ErgastF1APIDriver;
  Constructors: ErgastF1APIConstructor[];
}

export interface ErgastF1APIStandingsList {
  season: string;
  round: string;
  DriverStandings: ErgastF1APIDriverStanding[];
}

interface ErgastF1APIStandingsTable {
  season: string;
  round: string;
  StandingsLists: ErgastF1APIStandingsList[];
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
    StandingsTable?: ErgastF1APIStandingsTable;
  };
}

export interface ErgastF1APIPaginationQueryParams {
  limit: number;
  offset: number;
}

export interface ErgastF1APIRaceQualifyingResult {
  number: string;
  position: string;
  Driver: ErgastF1APIDriver;
  Constructor: ErgastF1APIConstructor;
  Q1: string;
  Q2?: string;
  Q3?: string;
}
