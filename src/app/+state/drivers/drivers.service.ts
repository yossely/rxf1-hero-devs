import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EargastF1APIConstants } from 'src/app/shared/constants';

import { EargastF1APIModels } from 'src/app/shared/models';
import { DriversEntity } from './drivers.models';

@Injectable()
export class DriversService {
  constructor(private http: HttpClient) {}

  // TODO: season type - string is correct - where to declare?
  getDriversListBySeason(
    season: string,
    pagination?: EargastF1APIModels.ErgastF1APIPaginationQueryParams
  ): Observable<{ drivers: DriversEntity[]; total: number }> {
    return this.http
      .get<EargastF1APIModels.ErgastF1APIBaseResponse>(
        `${EargastF1APIConstants.ErgastF1APIBaseUrl}/${season}/drivers.json`,
        {
          params: {
            limit: pagination?.limit || 10,
            offset: pagination?.offset || 0,
          },
        }
      )
      .pipe(
        map((resp) => {
          const driversRespList = resp.MRData.DriverTable?.Drivers || [];
          const driversEntityList: DriversEntity[] = driversRespList.map(
            (d) => ({
              id: d.driverId,
              permanentNumber: d.permanentNumber,
              code: d.code,
              url: d.url,
              givenName: d.givenName,
              familyName: d.familyName,
              dateOfBirth: d.dateOfBirth,
              nationality: d.nationality,
            })
          );
          return {
            drivers: driversEntityList,
            total: Number(resp.MRData.total),
          };
        })
      );
  }
}
