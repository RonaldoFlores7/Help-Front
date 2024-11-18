import { TipoUsuario } from "./TipoUsuario"

export class Usuario{
    idUsuario:number=0
    nombre:string=""
    apellidos:string=""
    correo:string=""
    username:string=""
    password:string=""
    enabled:boolean=false
    tu:TipoUsuario=new TipoUsuario()
}