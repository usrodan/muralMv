import {formatWhatsapp} from "../formatWhatsapp";

describe("Função - Formatar Whatsapp", () => {
  it("Whatsapp", () => {
    let formatar = formatWhatsapp("27999999999");
    expect(formatar).toEqual("(27) 99999-9999");
  });
});
