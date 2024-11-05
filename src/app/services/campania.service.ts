import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Campania } from '../models/Campania';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CampaniaService {

  private url = `${base_url}/campanias`;

  private listaCambio = new Subject<Campania[]>();

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Campania[]>(this.url);
  }

  insert(ca: Campania) {
    return this.http.post(this.url, ca);
  }

  setList(listaNueva: Campania[]) {
    this.listaCambio.next(listaNueva);
  }
  
  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number) {
    return this.http.get<Campania>(`${this.url}/${id}`)
  }

  update(ca:Campania) {
    return this.http.put(this.url, ca)
  }
}
