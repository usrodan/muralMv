import {removeAcento} from '../removeAcento'

describe('Função - Remove Acento', () => {
  it('Remove acentos', () => { 
    const teste =  removeAcento("ÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ")  
    expect(teste).toEqual("aaaaeeeiiioooouuuc")
  })
})