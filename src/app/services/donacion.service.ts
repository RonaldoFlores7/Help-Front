import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Donacion } from '../models/Donacion';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private url = `${base_url}/donaciones`;
  private listaCambio = new Subject<Donacion[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Donacion[]>(this.url);
  }
  
  insert(d: Donacion) {
    return this.http.post(this.url, d);
  }

  setList(listaNueva: Donacion[]) {
    this.listaCambio.next(listaNueva);
  }
  
  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number) {
    return this.http.get<Donacion>(`${this.url}/${id}`)
  }

  update(d:Donacion) {
    return this.http.put(this.url, d)
  }
}