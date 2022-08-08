import formatCNPJ from "../formatCNPJ";

describe("Função - Formatar CNPJ", () => {
  it("Formata CNPJ", () => {
    let formatar = formatCNPJ("06990590000123");
    expect(formatar).toEqual("06.990.590/0001-23");
  });
});
