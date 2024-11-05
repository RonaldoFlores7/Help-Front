import { Distrito } from "./Distrito"
import { TipoCampania } from "./TipoCampania"
import { TipoDonacion } from "./TipoDonacion"
import { Usuario } from "./Usuario"

export class Campania {
    idCampania:number=0
    fechaInicio:Date = new Date(Date.now())
    fechaFin:Date = new Date(Date.now())
    cuentaDestino:string=""
    lugarDestinoViveres:string=""
    descripcionCampania:string=""
    estadoCampania:string=""
    idDamnificado:Usuario = new Usuario()
    idTipoCampania:TipoCampania = new TipoCampania()
    idTipoDonacion:TipoDonacion = new TipoDonacion()
    idDistrito:Distrito = new Distrito()
}