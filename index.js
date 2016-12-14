'use strict'

const senadores = require('senadores-base')

// Get travels details for senators
// (any, obj) -> arr
module.exports = function senadoresElecciones (query, options) {
  const defaultOptions = {
    // Can be a function to filter the whole result
    // it would be applied after all the result get fetched
    filtro: null,
    // Can speciy just some part of the results
    // posible values: 'todos', 'campaña', 'ingresos', 'gastos', 'representacion'
    tipo: 'todos',
    cantidadSenadores: 1,
    incluyeSenador: false
  }
  options = Object.assign(defaultOptions, options)

  let senadoresBase = senadores(query)

  return senadoresBase.map(senador => {

  })
}
