const validateCPF = (cpf: string): boolean => {
  const cleanedCpf = cpf.replace(/\D/g, "");

  if (cleanedCpf.length !== 11 || /^(\d)\1+$/.test(cleanedCpf)) {
    return false;
  }

  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanedCpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanedCpf.substring(10, 11))) {
    return false;
  }

  return true;
};

const validateCNPJ = (cnpj: string): boolean => {
  const cleanedCnpj = cnpj.replace(/\D/g, "");

  if (cleanedCnpj.length !== 14 || /^(\d)\1+$/.test(cleanedCnpj)) {
    return false;
  }

  let length = cleanedCnpj.length - 2;
  let numbers = cleanedCnpj.substring(0, length);
  const digits = cleanedCnpj.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  length = length + 1;
  numbers = cleanedCnpj.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) {
    return false;
  }

  return true;
};

export { validateCNPJ, validateCPF };
