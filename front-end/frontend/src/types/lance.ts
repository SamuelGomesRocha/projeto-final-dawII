import { Leilao } from "./leilao";
import { Usuario } from "./usuario";

export type Lance = {
   id:{
       idLeilao: Leilao;
       idUser: Usuario
   };
   valorLance: number;
   key: number;
}