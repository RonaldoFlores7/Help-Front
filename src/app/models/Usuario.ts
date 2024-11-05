import { TipoUsuario } from "./TipoUsuario"

export class Usuario{
    idUsuario:number=0
    nombre:string=""
    apellidos:string=""
    correo:string=""
    contrasenia:string=""
    tu:TipoUsuario=new TipoUsuario()
}