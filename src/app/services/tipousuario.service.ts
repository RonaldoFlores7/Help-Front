import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoUsuario } from '../models/TipoUsuario';
import { Subject } from 'rxjs';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {
  private url = `${base_url}/tipoUsuarios`;

  private listaCambio = new Subject<TipoUsuario[]>()

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<TipoUsuario[]>(this.url)
  }
  insert(tu:TipoUsuario) {
    return this.http.post(this.url, tu)
  }
  setList(listaNueva:TipoUsuario[]) {
    this.listaCambio.next(listaNueva)
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number) {
    return this.http.get<TipoUsuario>(`${this.url}/${id}`)
  }
  update(tu:TipoUsuario) {
    return this.http.put(this.url, tu)
  }
} 
