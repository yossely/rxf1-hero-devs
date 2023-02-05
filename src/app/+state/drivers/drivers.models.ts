/**
 * Interface for the 'Drivers' data
 */
export interface DriversEntity {
  id: string | number; // Primary ID
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
