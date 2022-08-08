import {forcaSenha} from '../forcaSenha'
describe('Função - Força Senha', () => {
  it('Força 0', () => { 
    let forca0 =  forcaSenha("")  
    expect(forca0).toEqual(0)
  })
  it('Força 1', () => { 
    let forca1 =  forcaSenha("a")  
    expect(forca1).toEqual(1)
  }) 
  it('Força 2', () => { 
    let forca1 =  forcaSenha("a2")  
    expect(forca1).toEqual(2)
  }) 
  it('Força 3', () => { 
    let forca1 =  forcaSenha("aB2")  
    expect(forca1).toEqual(3)
  }) 
  it('Força 4', () => { 
    let forca1 =  forcaSenha("aB2#")  
    expect(forca1).toEqual(4)
  }) 
  it('Força 5', () => { 
    let forca1 =  forcaSenha("aB2#cas!")  
    expect(forca1).toEqual(5)
  })  
})