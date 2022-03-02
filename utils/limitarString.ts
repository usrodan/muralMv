export default function limitarString(str,n){
    if(str.length > n)  str = str.substring(0,n)+"..." ;
    return str
}