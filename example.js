'use strict'

const elecciones = require('./')

// function paddingRight (s, c, n) {
//   if (!s || !c || s.length >= n) {
//     return s
//   }
//   var max = (n - s.length) / c.length
//   for (var i = 0; i < max; i++) {
//     s += c
//   }
//   return s
// }

/*
  Muestra los gastos e ingresos de campaña de cada senador electo
*/

// console.log(`${paddingRight('Senador', ' ', 40)} ${paddingRight('Ingresos', ' ', 15)} ${paddingRight('Gastos', ' ', 15)}`)
// elecciones({}, { tipo: 'elecciones', incluyeSenador: true }).forEach(result => {
//   // Algunos senadores no tienen registro de gastos ni ingresos en el Servel,
//   // para esos casos mostrar -
//   let ingresos = 0
//   if (result.elecciones && result.elecciones.ingresos) {
//     result.elecciones.ingresos.forEach(ingreso => {
//       ingresos += ingreso.monto
//     })
//   }
//
//   let gastos = 0
//   if (result.elecciones && result.elecciones.gastos) {
//     result.elecciones.gastos.forEach(gasto => {
//       gastos += gasto.monto
//     })
//   }
//
//   console.log(`${paddingRight(result.senador.nombre, ' ', 40)} ${paddingRight(ingresos.toString(), ' ', 15)} ${paddingRight(gastos.toString(), ' ', 15)}`)
// })

console.log(elecciones('Allamand', { tipo: 'elecciones' }))
console.log(elecciones('Allamand', { tipo: 'gastos' }))
console.log(JSON.stringify(elecciones('Allamand', { tipo: 'ingresos' }), null, 2))
