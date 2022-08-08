import {validateEmail} from '../validateEmail'

describe('Função - validateEmail', () => {
  it('validateEmail - Email válido', () => { 
    const teste =  validateEmail("faccodanilo@gmail.com")  
    expect(teste).toBeTruthy()
  }) 

  it('validateEmail - Email válido', () => { 
    const teste =  validateEmail("06990590000123")  
    expect(teste).toBeNull()
  })
})