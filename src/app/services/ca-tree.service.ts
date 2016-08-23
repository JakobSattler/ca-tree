import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

/**
 * Used to get data using HTTP and to (un)check nodes
 */
@Injectable()
export class CaTreeService {

  constructor(private http: Http) {
  }

  getNodes(): Observable<any> {
    return this.http.get('./organisations_flat.json').map(res => res.json());
  }
}
