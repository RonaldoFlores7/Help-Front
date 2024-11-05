import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoCampania } from '../models/TipoCampania';
import { Subject } from 'rxjs';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class TipocampaniaService {
  private url = `${base_url}/tipoCampania`;

  private listaCambio = new Subject<TipoCampania[]>()

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<TipoCampania[]>(this.url)
  }
  insert(tc:TipoCampania) {
    return this.http.post(this.url, tc)
  }
  setList(listaNueva:TipoCampania[]) {
    this.listaCambio.next(listaNueva)
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number) {
    return this.http.get<TipoCampania>(`${this.url}/${id}`)
  }
  update(td:TipoCampania) {
    return this.http.put(this.url, td)
  }
}
