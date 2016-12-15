import test from 'ava'
import senadoresElecciones from './'

test('senadores-elecciones supported options', t => {
  t.plan(4)

  const elecciones = senadoresElecciones({ partido: 'Independiente' }, {tipo: 'elecciones'})

  t.truthy(elecciones)
  t.is(elecciones.length, 4, `Expected 4, got ${elecciones.length}`)
  t.true(elecciones[0].hasOwnProperty('ingresos'))
  t.true(elecciones[0].hasOwnProperty('gastos'))
})
