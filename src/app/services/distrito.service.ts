import { Injectable } from '@angular/core';
import { Distrito } from '../models/Distrito';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  private url = `${base_url}/distritos`;
  private listaCambio = new Subject<Distrito[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Distrito[]>(this.url);
  }
  insert(d: Distrito) {
    return this.http.post(this.url, d);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Distrito[]) {
    this.listaCambio.next(listaNueva);
  }
}
