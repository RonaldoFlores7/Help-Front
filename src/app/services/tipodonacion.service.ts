import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoDonacion } from '../models/TipoDonacion';
import { Subject } from 'rxjs';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipodonacionService {
  private url = `${base_url}/tipoDonacion`;

  private listaCambio = new Subject<TipoDonacion[]>()

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<TipoDonacion[]>(this.url)
  }
  insert(td:TipoDonacion) {
    return this.http.post(this.url, td)
  }
  setList(listaNueva:TipoDonacion[]) {
    this.listaCambio.next(listaNueva)
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number) {
    return this.http.get<TipoDonacion>(`${this.url}/${id}`)
  }
  update(td:TipoDonacion) {
    return this.http.put(this.url, td)
  }
}
