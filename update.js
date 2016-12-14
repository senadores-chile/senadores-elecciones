'use strict'

const xlsx = require('xlsx')
const senadoresBase = require('senadores-base')
const fs = require('fs')

function addGasto (gasto, rut, results) {
  let senatorIndex = -1
  results.forEach((res, i) => {
    if (res.senador.rut.toUpperCase() === rut.toUpperCase()) senatorIndex = i
  })
  // For those candidates who lose elections
  if (senatorIndex === -1) return
  let gastos = results[senatorIndex].elecciones.gastos
                  ? results[senatorIndex].elecciones.gastos
                  : []
  gastos.push(gasto)
  results[senatorIndex].elecciones = Object.assign(results[senatorIndex].elecciones, { gastos })
}

function addIngreso (ingreso, rut, results) {
  let senatorIndex = -1
  results.forEach((res, i) => {
    if (res.senador.rut.toUpperCase() === rut.toUpperCase()) senatorIndex = i
  })
  // For those candidates who lose elections
  if (senatorIndex === -1) return
  let ingresos = results[senatorIndex].elecciones.ingresos
                  ? results[senatorIndex].elecciones.ingresos
                  : []
  ingresos.push(ingreso)
  results[senatorIndex].elecciones = Object.assign(results[senatorIndex].elecciones, { ingresos })
}

function getIngresos (results) {
  let workbook = xlsx.readFile('data/DETALLE_INGRESOS_CANDIDATOS_ELECCION2013.xls')

  let sheetName = workbook.SheetNames[0]
  let sheet = workbook.Sheets[sheetName]

  for(let cell in sheet) {
    if(cell[0] !== 'A') continue
    if(sheet[cell].v !== 'SENADOR') continue

    let i = cell.slice(1)
    let rut = sheet[`G${i}`].v
    let ingresos = {
      estado: sheet[`F${i}`].v,
      proveedor: {
        rut: sheet[`N${i}`].v,
        nombre: sheet[`O${i}`].v
      },
      fecha: sheet[`P${i}`] ? sheet[`P${i}`].v : '',
      documento: {
        tipo: sheet[`Q${i}`] ? sheet[`Q${i}`].v : '',
        descripcion: sheet[`R${i}`] ? sheet[`R${i}`].v : '',
        numero: sheet[`S${i}`] ? sheet[`S${i}`].v : ''
      },
      descripcion: sheet[`U${i}`].v,
      glosa: sheet[`V${i}`] ? sheet[`V${i}`].v : '',
      monto: sheet[`W${i}`].v
    }
    // Now, find that senator, and create a new 'ingresos' property, and/or add
    // the result to that property
    addIngreso(ingresos, rut, results)
  }
}

function getGastos (results) {
  let workbook = xlsx.readFile('data/DETALLE_GASTOS_CANDIDATOS_ELECCION2013.xls')

  let sheetName = workbook.SheetNames[0]
  let sheet = workbook.Sheets[sheetName]

  for(let cell in sheet) {
    if(cell[0] !== 'A') continue
    if(sheet[cell].v !== 'SENADOR') continue

    let i = cell.slice(1)
    let rut = sheet[`G${i}`].v
    let gastos = {
      estado: sheet[`F${i}`].v,
      proveedor: {
        rut: sheet[`N${i}`].v,
        nombre: sheet[`O${i}`].v
      },
      fecha: sheet[`P${i}`] ? sheet[`P${i}`].v : '',
      documento: {
        tipo: sheet[`Q${i}`] ? sheet[`Q${i}`].v : '',
        descripcion: sheet[`R${i}`] ? sheet[`R${i}`].v : '',
        numero: sheet[`S${i}`] ? sheet[`S${i}`].v : ''
      },
      descripcion: sheet[`U${i}`].v,
      glosa: sheet[`V${i}`] ? sheet[`V${i}`].v : '',
      monto: sheet[`W${i}`].v
    }
    // Now, find that senator, and create a new 'ingresos' property, and/or add
    // the result to that property
    addGasto(gastos, rut, results)
  }
}

;(function () {
  let results = senadoresBase().map(senador => {
    return { senador, elecciones: {}, representacion: {} }
  })
  getIngresos(results)
  getGastos(results)
  fs.writeFile('senadores-elecciones.json', JSON.stringify(results, null, 2), 'utf8', err => {
    if (err) throw err
    console.log('It\'s saved!')
  })
})()
