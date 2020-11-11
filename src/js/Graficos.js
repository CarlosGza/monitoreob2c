let chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)',
	paleGreen: 'rgb(152,251,152)',
	lightBlue: 'rgb(173,216,230)',
	brown: 'rgb(128,0,0)',
	aqua: 'rgb(0,255,255)',
	beige: 'rgb(245,245,220)',
}
let chartColors2 = [
	'rgb(54, 162, 235)',
	'rgb(255, 99, 132)',
	'rgb(255, 159, 64)',
	'rgb(255, 205, 86)',
	'rgb(75, 192, 192)',
	'rgb(153, 102, 255)',
	'rgb(201, 203, 207)',
	'rgb(152,251,152)',
	'rgb(173,216,230)',
	'rgb(128,0,0)',
	'rgb(0,255,255)',
	'rgb(245,245,220)',
	'rgb(255, 99, 132)',
	'rgb(255, 159, 64)',
	'rgb(255, 205, 86)',
	'rgb(75, 192, 192)',
	'rgb(54, 162, 235)',
	'rgb(153, 102, 255)',
	'rgb(201, 203, 207)',
	'rgb(152,251,152)',
	'rgb(173,216,230)',
	'rgb(128,0,0)',
	'rgb(0,255,255)',
	'rgb(245,245,220)',
]

function addCommas(nStr) {
	nStr += ''
	x = nStr.split('.')
	x1 = x[0]
	x2 = x.length > 1 ? '.' + x[1] : ''
	var rgx = /(\d+)(\d{3})/
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2')
	}
	return x1 + x2
}

// INICIA GRAFICA LINEA PROVEEDOR - CARRIER

let horas = graficaProveedor.map((row) => {
	return row.Hora
})

let Proveedores = Object.keys(graficaProveedor[0])
Proveedores.shift()

let dataProveedores = Proveedores.map((proveedor) => {
	return graficaProveedor.map((row) => {
		return row[proveedor]
	})
})

let provDatasets = Proveedores.map((proveedor, index) => {
	return {
		label: proveedor,
		fill: false,
		backgroundColor: chartColors2[index],
		borderColor: chartColors2[index],
		data: dataProveedores[index],
	}
})
let vacios = []
dataProveedores.map((proveedor, index) => {
	if (proveedor.reduce((a, b) => a + b, 0) === 0) {
		vacios.push(index)
	}
})
vacios.reverse().map((index) => {
	Proveedores.splice(index, 1)
	dataProveedores.splice(index, 1)
	provDatasets.splice(index, 1)
})

var configProveedores = {
	type: 'line',
	data: {
		labels: horas,
		datasets: provDatasets,
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: 'Proveedor - Horas',
			fontFamily: 'sans-serif',
			fontSize: 20,
		},
		legend: {
			position: 'right',
		},
	},
}

var canvasProveedores = document
	.getElementById('chartProveedores')
	.getContext('2d')

// TERMINA GRAFICA PROVEEDOR - CARRIER

// INICIA GRAFICA DONA PROVEEDOR
var labelProveedor = []
var dataProveedor = []
var totalExitosos = 0
for (i = 0; i < graficaDistProveedor.length; i++) {
	labelProveedor.push(graficaDistProveedor[i]['Proveedor'])
	dataProveedor.push(graficaDistProveedor[i]['Cant'])
	totalExitosos = totalExitosos + graficaDistProveedor[i]['Cant']
}
var configProveedor = {
	type: 'doughnut',
	data: {
		labels: labelProveedor,
		datasets: [
			{
				backgroundColor: chartColors2,
				data: dataProveedor,
			},
		],
	},
	options: {
		title: {
			display: true,
			text: 'Mensajes por Proveedor',
			fontFamily: 'sans-serif',
			fontSize: 20,
		},
	},
}

var canvasDistProveedor = document.getElementById('chartDistProveedor')

//TERMINA GRAFICA DONA PROVEEDOR

// INICIA GRAFICA BARRAS CLIENTES

var labelClientes = graficaCliente.map((row) => {
	console.log(row)
	return row.Cliente.substr(0, 30)
})
let Proveedores2 = Object.keys(graficaCliente[0])
Proveedores2.shift()
Proveedores2.pop()
let dataClientes = Proveedores2.map((proveedor) => {
	return graficaCliente.map((row) => {
		return row[proveedor]
	})
})

var clientDatasets = graficaCliente.map((row, index) => {
	return {
		label: Proveedores2[index],
		backgroundColor: chartColors2[index],
		data: dataClientes[index],
	}
})

var dataClientes2 = {
	labels: labelClientes,
	datasets: clientDatasets,
}

var configClientes = {
	type: 'bar',
	data: dataClientes2,
	options: {
		title: {
			display: true,
			text: 'Clientes - Proveedor',
			fontFamily: 'sans-serif',
			fontSize: 20,
		},
		tooltips: {
			mode: 'index',
			intersect: false,
			callbacks: {
				label: function (tooltipItem, data) {
					return (
						data.datasets[tooltipItem.datasetIndex].label +
						': ' +
						tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					)
				},
			},
		},
		responsive: true,
		scales: {
			xAxes: [
				{
					stacked: true,
					ticks: {
						autoSkip: false,
						maxRotation: 90,
						minRotation: 90,
						fontSize: 10,
					},
				},
			],
			yAxes: [
				{
					stacked: true,
					ticks: {
						callback: function (value, index, values) {
							return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						},
					},
				},
			],
		},
	},
}

var canvasClientes = document.getElementById('chartClientes').getContext('2d')

// TERMINA GRAFICA CLIENTES

// Renderiza Graficas
var myDoughnutChart = new Chart(canvasDistProveedor, configProveedor)
var myLineChart = new Chart(canvasProveedores, configProveedores)
var myBarChart = new Chart(canvasClientes, configClientes)
