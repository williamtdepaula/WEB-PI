function phoneMask(number: string) {
  var newNumber = number.replace(/\D/g, "");
  newNumber = newNumber.replace(/^0/, "");
  if (newNumber.length > 10) {
    newNumber = newNumber.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (newNumber.length > 5) {
    if (newNumber.length === 6) {
      // necessário pois senão o "-" fica sempre voltando ao dar backspace
      return newNumber;
    }
    newNumber = newNumber.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (newNumber.length > 2) {
    newNumber = newNumber.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    if (newNumber.length !== 0) {
      newNumber = newNumber.replace(/^(\d*)/, "($1");
    }
  }

  return newNumber
}

function maskRemoveAllSpecialCharacters(value: string) {
  return value.replace(
    /[-.@$!%*#?'"&_/%+,;:’()<>~|\\\][{}=•√π÷×¶∆£¨¢€¥^°=%©®™✓ ]/g,
    '',
  );
}

const maskCpf = (cpf: string) =>
  cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

export {
  phoneMask,
  maskRemoveAllSpecialCharacters,
  maskCpf
}