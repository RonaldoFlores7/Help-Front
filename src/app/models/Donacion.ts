import { Campania } from "./Campania"
import { TipoDonacion } from "./TipoDonacion"
import { Usuario } from "./Usuario"

export class Donacion{
    idDonacion:number = 0
    telefono:string = ""
    montoTransferido:number =0
    descripcionDonacion:string = ""
    fechaDonacion:Date = new Date(Date.now())
    estado:string = ""
    us:Usuario=new Usuario()
    ca:Campania=new Campania()
    td:TipoDonacion=new TipoDonacion()
}