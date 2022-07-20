import Dimension from "../../src/domain/entity/Dimension"

it('Deve criar as dimensoes', ()=>{
    const dimension = new Dimension(100, 30, 10)
    const volume = dimension.getVolume()
    expect(volume).toBe(0.03)
})