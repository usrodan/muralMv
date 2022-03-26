
import { format } from 'date-fns'

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
  } 

export function timezoneBrazil(data){
    return format(convertTZ(new Date(data), "America/Sao_Paulo"), "dd/MM/yyyy")
}