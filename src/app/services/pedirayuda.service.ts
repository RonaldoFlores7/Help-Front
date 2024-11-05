import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PedirAyuda } from '../models/PedirAyuda';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PedirayudaService {
  private url = `${base_url}/pedirAyudas`;

  private listaCambio = new Subject<PedirAyuda[]>();

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<PedirAyuda[]>(this.url);
  }

  insert(pA: PedirAyuda) {
    return this.http.post(this.url, pA);
  }

  setList(listaNueva: PedirAyuda[]) {
    this.listaCambio.next(listaNueva);
  }
  
  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id:number) {
    return this.http.get<PedirAyuda>(`${this.url}/${id}`)
  }

  update(pa:PedirAyuda) {
    return this.http.put(this.url, pa)
  }
}
