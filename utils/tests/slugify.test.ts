import slugify from '../slugify'

describe('Função - slugify', () => {
  it('slugify', () => { 
    const teste =  slugify("Teste com acentuação")  
    expect(teste).toEqual("teste-com-acentuacao")
  })
})