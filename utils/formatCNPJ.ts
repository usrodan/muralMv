export default function formatCNPJ(str){
  return str.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5").substring(0, 18)       // Trim - from end of text
}