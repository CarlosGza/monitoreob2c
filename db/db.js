const dbconfig = require('./config.json')
const sql = require('mssql')
const fs = require('fs')
let connProd
let connQA
let connDev

async function getConnPROD() {
  if (connProd) {
    // log('ya existe conexion Prod')
    return connProd
  }
  // log('crea nueva conexion Prod')
  connProd = new sql.ConnectionPool(dbconfig.prod)
  await connProd.connect()
  return connProd
}

async function getConnQA() {
  if (connQA) {
    // log('ya existe conexion QA')
    return connQA
  }
  // log('crea nueva conexion QA')
  connQA = new sql.ConnectionPool(dbconfig.qa)
  await connQA.connect()
  return connQA
}

async function getConnDEV() {
  if (connDev) {
    // log('ya existe conexion Dev')
    return connDev
  }
  // log('crea nueva conexion Dev')
  connDev = new sql.ConnectionPool(dbconfig.dev)
  await connDev.connect()
  return connDev
}

module.exports = {
  getConnPROD,
	getConnQA,
	getConnDEV
}
