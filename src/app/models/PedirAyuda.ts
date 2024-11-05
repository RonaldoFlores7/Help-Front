import { Distrito } from "./Distrito"
import { Usuario } from "./Usuario"

export class PedirAyuda {
    idPedirAyuda:number=0
    tipoDesastre:string=""
    descripcion:string=""
    latitud:number=0
    longitud:number=0
    fechaPedidoAyuda:Date = new Date(Date.now())
    estado:string=""
    u:Usuario = new Usuario()
    d:Distrito = new Distrito()
}