
var chartColors = {
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
    beige: 'rgb(245,245,220)'
};
//var prove2 = myResponse[0].Proveedor;

// INICIA GRAFICA PROVEEDOR - CARRIER
var horas = [];
var auronixatt = [];
var auronixtelcel = [];
var auronixmovistar = [];
var auronixotros = [];
//var c3ntroatt = [];
//var c3ntrotelcel = [];
//var c3ntromovistar = [];
//var c3ntrootros = [];
//var quiubasatt = [];
var quiubastelcel = [];
//var quiubasmovistar = [];
//var quiubasotros = [];
var connectatt = [];
//var connecttelcel = [];
var connectmovistar = [];
var connectotros = [];

for (i = 0; i < graficaProveedor.length; i++) {

    horas.push(graficaProveedor[i].Hora);
    auronixatt.push(graficaProveedor[i]['Auronix - AT&T']);
    auronixtelcel.push(graficaProveedor[i]['Auronix - Telcel']);
    auronixmovistar.push(graficaProveedor[i]['Auronix - Movistar']);
    auronixotros.push(graficaProveedor[i]['Auronix - Otros']);
    //c3ntroatt.push(graficaProveedor[i]['C3ntro - AT&T']);
    //c3ntrotelcel.push(graficaProveedor[i]['C3ntro - Telcel']);
    //c3ntromovistar.push(graficaProveedor[i]['C3ntro - Movistar']);
    //c3ntrootros.push(graficaProveedor[i]['C3ntro - Otros']);
    //quiubasatt.push(graficaProveedor[i]['Quiubas - AT&T']);
    quiubastelcel.push(graficaProveedor[i]['Quiubas - Telcel']);
    //quiubasmovistar.push(graficaProveedor[i]['Quiubas - Movistar']);
    //quiubasotros.push(graficaProveedor[i]['Quiubas - Otros']);
    connectatt.push(graficaProveedor[i]['Connect - AT&T']);
    //connecttelcel.push(graficaProveedor[i]['Connect - Telcel']);
    connectmovistar.push(graficaProveedor[i]['Connect - Movistar']);
    connectotros.push(graficaProveedor[i]['Connect - Otros']);
};

var configProveedores = {
    type: 'line',
    data: {
        labels: horas,
        datasets: [
            //Auronix
            {
                label: 'Auronix - AT&T',
                fill: false,
                backgroundColor: chartColors.red,
                borderColor: chartColors.red,
                data: auronixatt
            },
            {
                label: 'Auronix - Telcel',
                fill: false,
                backgroundColor: chartColors.blue,
                borderColor: chartColors.blue,
                data: auronixtelcel
            },
            {
                label: 'Auronix - Movistar',
                fill: false,
                backgroundColor: chartColors.orange,
                borderColor: chartColors.orange,
                data: auronixmovistar
            },
            {
                label: 'Auronix - Otros',
                fill: false,
                backgroundColor: chartColors.paleGreen,
                borderColor: chartColors.paleGreen,
                data: auronixotros
            },
            //C3ntro
            /*{
                label: 'C3ntro - AT&T',
                fill: false,
                backgroundColor: chartColors.yellow,
                borderColor: chartColors.yellow,
                data: c3ntroatt
            },
            {
                label: 'C3ntro - Telcel',
                fill: false,
                backgroundColor: chartColors.green,
                borderColor: chartColors.green,
                data: c3ntrotelcel
            },
            {
                label: 'C3ntro - Movistar',
                fill: false,
                backgroundColor: chartColors.purple,
                borderColor: chartColors.purple,
                data: c3ntromovistar
            },
            {
                label: 'C3ntro - Otros',
                fill: false,
                backgroundColor: chartColors.grey,
                borderColor: chartColors.grey,
                data: c3ntrootros
            },*/
            //Quiubas
            /*{
                label: 'Quiubas - AT&T',
                fill: false,
                backgroundColor: chartColors.lightBlue,
                borderColor: chartColors.lightBlue,
                data: quiubasatt
            },*/
            {
                label: 'Quiubas - Telcel',
                fill: false,
                backgroundColor: chartColors.brown,
                borderColor: chartColors.brown,
                data: quiubastelcel
            },
            /*{
                label: 'Quiubas - Movistar',
                fill: false,
                backgroundColor: chartColors.aqua,
                borderColor: chartColors.aqua,
                data: quiubasmovistar
            },
            {
                label: 'Quiubas - Otros',
                fill: false,
                backgroundColor: chartColors.beige,
                borderColor: chartColors.beige,
                data: quiubasotros
            },*/
            //Connect
            {
                label: 'Connect - AT&T',
                fill: false,
                backgroundColor: chartColors.lightBlue,
                borderColor: chartColors.lightBlue,
                data: connectatt
            },
            /*{
                label: 'Connect - Telcel',
                fill: false,
                backgroundColor: chartColors.beige,
                borderColor: chartColors.beige,
                data: connecttelcel
            },*/
            {
                label: 'Connect - Movistar',
                fill: false,
                backgroundColor: chartColors.aqua,
                borderColor: chartColors.aqua,
                data: connectmovistar
            },
            {
                label: 'Connect - Otros',
                fill: false,
                backgroundColor: chartColors.grey,
                borderColor: chartColors.grey,
                data: connectotros
            }
        ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Proveedor - Carrier',
            fontFamily: 'sans-serif',
            fontSize: 20
        },
        legend: {
            position: 'right'
        }
    }
};

var canvasProveedores = document.getElementById("chartProveedores").getContext('2d');

// TERMINA GRAFICA PROVEEDOR - CARRIER

// INICIA GRAFICA DONA CARRIER
var labelCarrier = [];
var dataCarrier = [];
var totalExitosos = 0;
for (i = 0; i < graficaCarrier.length; i++) {
    labelCarrier.push(graficaCarrier[i]['CarrierMovil']);
    dataCarrier.push(graficaCarrier[i]['Cant']);
    totalExitosos = totalExitosos + graficaCarrier[i]['Cant'];
};
var configCarrier = {
    type: 'doughnut',
    data: {
        labels: labelCarrier,
        datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: dataCarrier
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Mensajes por Carrier',
            fontFamily: 'sans-serif',
            fontSize: 20
        }
    }
}


var canvasCarrier = document.getElementById("chartCarrier");

//TERMINA GRAFICA PIE CARRIER

// INICIA GRAFICA CLIENTES

var labelClientes = [];
var dataAuronix = [];
var dataQuiubas = [];
var dataBancos = [];
var dataConnect = [];

for (i = 0; i < graficaCliente.length; i++) {
    labelClientes.push(graficaCliente[i]['Cliente'].substr(0, 30));
    dataAuronix.push(graficaCliente[i]['Auronix']);
    dataQuiubas.push(graficaCliente[i]['Quiubas']);
    dataBancos.push(graficaCliente[i]['Auronix Bancos']);
    dataConnect.push(graficaCliente[i]['Connect']);
};

var dataClientes = {
    labels: labelClientes,
    datasets: [{
        label: 'Auronix',
        backgroundColor: window.chartColors.blue,
        data: dataAuronix
    }, {
        label: 'Quiubas',
        backgroundColor: window.chartColors.red,
        data: dataQuiubas
    }, {
        label: 'Auronix Bancos',
        backgroundColor: window.chartColors.green,
        data: dataBancos
    }, {
        label: 'Connect',
        backgroundColor: window.chartColors.purple,
        data: dataConnect
    }]
};

var configClientes = {
    type: 'bar',
    data: dataClientes,
    options: {
        title: {
            display: true,
            text: 'Clientes - Proveedor',
            fontFamily: 'sans-serif',
            fontSize: 20

        },
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90,
                    fontSize: 10
                }
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
}

var canvasClientes = document.getElementById('chartClientes').getContext('2d');


// TERMINA GRAFICA CLIENTES

// Renderiza Graficas
var myDoughnutChart = new Chart(canvasCarrier, configCarrier);
var myLineChart = new Chart(canvasProveedores, configProveedores);
var myBarChart = new Chart(canvasClientes, configClientes);
