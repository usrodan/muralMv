import validarCNPJ from '../validarCNPJ'

describe('Função - validarCNPJ', () => {
  it('validarCNPJ - CNPJ VÁLIDO (string)', () => { 
    const teste =  validarCNPJ("06990590000123")  
    expect(teste).toEqual(true)
  })
  it('validarCNPJ - CNPJ VÁLIDO (number)', () => { 
    const teste =  validarCNPJ("06990590000123")  
    expect(teste).toEqual(true)
  })
  it('validarCNPJ - CNPJ INVÁLIDO (string)', () => { 
    const teste =  validarCNPJ("12345678911234")  
    expect(teste).toEqual(false)
  })
  it('validarCNPJ - CNPJ INVÁLIDO (number)', () => { 
    const teste =  validarCNPJ(12345678911234)  
    expect(teste).toEqual(false)
  })
  it('validarCNPJ - CNPJ NÚMEROS REPETIDOS', () => { 
    const teste =  validarCNPJ("111111111111")  
    expect(teste).toEqual(false)
  })
})