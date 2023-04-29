import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()

export class SearchService {
  constructor(private http: HttpClient) {
  }

  getWeather(params: any): Observable<any> {
    return this.http.post('api/get-weather', params);
  }

}
