'use strict'

const base = require('./senadores-elecciones.json')
const filter = require('senadores-base/utils').filter
// Get travels details for senators
// (any, obj) -> arr
module.exports = function senadoresElecciones (query, options) {
  query = query || {}
  const defaultOptions = {
    // A query object, mongo like
    // it would be applied after all the result get fetched
    consulta: {},
    // Can speciy just some part of the results
    // posible values: 'todos', 'elecciones', 'ingresos', 'gastos', 'representacion'
    tipo: 'todos',
    cantidadSenadores: -1,
    incluyeSenador: false
  }
  options = Object.assign(defaultOptions, options)

  let senadores = filter(base, query)
  senadores = senadores.map(item => {
    if (!options.incluyeSenador) delete item.senador
    switch (options.tipo) {
      case 'todos':
        return item
      case 'elecciones':
        return item.senador
                ? { senador: item.senador, elecciones: item.elecciones }
                : item.elecciones
      case 'ingresos':
        return item.senador
                ? { senador: item.senador, elecciones: { ingresos: item.elecciones.ingresos } }
                : item.elecciones.ingresos
      case 'gastos':
        return item.senador
                ? { senador: item.senador, elecciones: { gastos: item.elecciones.gastos } }
                : item.elecciones.gastos
      case 'representacion':
        return item
      default:
        return {}
    }
  })
  senadores = options.cantidadSenadores && options.cantidadSenadores > -1
          ? senadores.slice(0, options.cantidadSenadores)
          : senadores
  return senadores
}
