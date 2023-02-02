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
    Drivers: ErgastF1APIDriver[]
}

export interface ErgastF1APIBaseResponse {
    MRData: {
        xmlns: string;
        series: string;
        url: string;
        limit: string;
        offset: string;
        total: string;
        DriverTable?: ErgastF1APIDriverTable
    }
}