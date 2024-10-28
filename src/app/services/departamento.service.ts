import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Departamento } from '../models/Departamento';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private url = `${base_url}/departamentos`;
  private listaCambio = new Subject<Departamento[]>();
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Departamento[]>(this.url);
  }
  insert(d: Departamento) {
    return this.http.post(this.url, d);
  }

  
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Departamento[]) {
    this.listaCambio.next(listaNueva);
  }
}
