import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { EargastF1APIConstants } from 'src/app/shared/constants';
import { EargastF1APIModels } from 'src/app/shared/models';
import { SeasonsEntity } from '../seasons/seasons.models';
import { RacesEntity, RacesFinalResult } from './races.models';

@Injectable()
export class RacesService {
  constructor(private http: HttpClient) {}

  getRacesListBySeason(
    season: SeasonsEntity['id'],
    pagination?: EargastF1APIModels.ErgastF1APIPaginationQueryParams
  ): Observable<{ races: RacesEntity[]; total: number }> {
    return this.http
      .get<EargastF1APIModels.ErgastF1APIBaseResponse>(
        `${EargastF1APIConstants.ErgastF1APIBaseUrl}/${season}.json`,
        {
          params: {
            limit: pagination?.limit || 10,
            offset: pagination?.offset || 0,
          },
        }
      )
      .pipe(
        map((resp) => {
          const racesRespList = resp.MRData.RaceTable?.Races || [];
          const racesEntityList: RacesEntity[] = racesRespList.map((r) => ({
            id: r.round,
            name: r.raceName,
            url: r.url,
            date: r.date,
          }));
          return {
            races: racesEntityList,
            total: Number(resp.MRData.total),
          };
        })
      );
  }

  getFinalResultsByRace(
    season: SeasonsEntity['id'],
    raceId: RacesEntity['id']
  ): Observable<{ results: RacesFinalResult[] }> {
    return this.http
      .get<EargastF1APIModels.ErgastF1APIBaseResponse>(
        `${EargastF1APIConstants.ErgastF1APIBaseUrl}/${season}/${raceId}/results.json`
      )
      .pipe(
        map((resp) => {
          const raceResultsRespList =
            resp.MRData.RaceTable?.Races[0].Results || [];
          const raceResultsList: RacesFinalResult[] = raceResultsRespList.map(
            (r) => ({
              number: r.number,
              position: r.position,
              points: r.points,
              driverName: `${r.Driver.givenName} ${r.Driver.familyName}`, // TODO: could be extracted to a util
              driverNationality: r.Driver.nationality,
              time: r.Time?.time,
            })
          );
          return {
            results: raceResultsList,
          };
        })
      );
  }
}
