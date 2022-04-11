export const validarEmail = (valor) => {
  const re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return re.exec(valor);
};