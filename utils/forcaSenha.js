export function forcaSenha(p) {
    var letrasMaiusculas = /[A-Z]/;
    var letrasMinusculas = /[a-z]/;
    var numeros = /[0-9]/;
    var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    var auxMaiuscula = 0;
    var auxMinuscula = 0;
    var auxNumero = 0;
    var auxEspecial = 0;
    var length = 0;
    if (p.length >= 8) {
      length = 1
    }
    for (var i = 0; i < p.length; i++) {

      if (letrasMaiusculas.test(p[i])) {
        auxMaiuscula = 1
      }
      if (letrasMinusculas.test(p[i])) {
        auxMinuscula = 1
      }

      if (numeros.test(p[i])) {
        auxNumero = 1
      }

      if (caracteresEspeciais.test(p[i])) {
        auxEspecial = 1
      }
    }
    return auxEspecial + auxNumero + auxMinuscula + auxMaiuscula + length
  }