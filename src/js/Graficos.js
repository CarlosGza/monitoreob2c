
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

/*
let graficaProveedor = [{"Hora":0,"C3ntro - AT&T":0,"Auronix - AT&T":22,"Innovattia - AT&T":0,"Connect - AT&T":10,"C3ntro - Movistar":0,"Auronix - Movistar":6,"Innovattia - Movistar":0,"Connect - Movistar":6,"C3ntro - Telcel":0,"Auronix - Telcel":79,"Innovattia - Telcel":25,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":0,"Innovattia - Otros":0,"Connect - Otros":1},{"Hora":1,"C3ntro - AT&T":0,"Auronix - AT&T":14,"Innovattia - AT&T":0,"Connect - AT&T":6,"C3ntro - Movistar":0,"Auronix - Movistar":2,"Innovattia - Movistar":0,"Connect - Movistar":3,"C3ntro - Telcel":0,"Auronix - Telcel":49,"Innovattia - Telcel":23,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":0,"Innovattia - Otros":0,"Connect - Otros":0},{"Hora":2,"C3ntro - AT&T":0,"Auronix - AT&T":11,"Innovattia - AT&T":0,"Connect - AT&T":6,"C3ntro - Movistar":0,"Auronix - Movistar":8,"Innovattia - Movistar":0,"Connect - Movistar":5,"C3ntro - Telcel":0,"Auronix - Telcel":25,"Innovattia - Telcel":17,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":0,"Innovattia - Otros":0,"Connect - Otros":0},{"Hora":3,"C3ntro - AT&T":0,"Auronix - AT&T":12,"Innovattia - AT&T":0,"Connect - AT&T":3,"C3ntro - Movistar":0,"Auronix - Movistar":1,"Innovattia - Movistar":0,"Connect - Movistar":1,"C3ntro - Telcel":0,"Auronix - Telcel":22,"Innovattia - Telcel":9,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":0,"Innovattia - Otros":0,"Connect - Otros":1},{"Hora":4,"C3ntro - AT&T":0,"Auronix - AT&T":7,"Innovattia - AT&T":0,"Connect - AT&T":4,"C3ntro - Movistar":0,"Auronix - Movistar":16,"Innovattia - Movistar":0,"Connect - Movistar":0,"C3ntro - Telcel":0,"Auronix - Telcel":25,"Innovattia - Telcel":10,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":0,"Innovattia - Otros":0,"Connect - Otros":1},{"Hora":5,"C3ntro - AT&T":0,"Auronix - AT&T":12,"Innovattia - AT&T":0,"Connect - AT&T":6,"C3ntro - Movistar":0,"Auronix - Movistar":6,"Innovattia - Movistar":0,"Connect - Movistar":1,"C3ntro - Telcel":0,"Auronix - Telcel":33,"Innovattia - Telcel":12,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":0,"Innovattia - Otros":0,"Connect - Otros":0},{"Hora":6,"C3ntro - AT&T":0,"Auronix - AT&T":14,"Innovattia - AT&T":0,"Connect - AT&T":2,"C3ntro - Movistar":0,"Auronix - Movistar":6,"Innovattia - Movistar":0,"Connect - Movistar":2,"C3ntro - Telcel":0,"Auronix - Telcel":49,"Innovattia - Telcel":8,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":0,"Innovattia - Otros":0,"Connect - Otros":0},{"Hora":7,"C3ntro - AT&T":0,"Auronix - AT&T":516,"Innovattia - AT&T":2,"Connect - AT&T":268,"C3ntro - Movistar":0,"Auronix - Movistar":757,"Innovattia - Movistar":1,"Connect - Movistar":166,"C3ntro - Telcel":0,"Auronix - Telcel":3036,"Innovattia - Telcel":417,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":4,"Innovattia - Otros":0,"Connect - Otros":1},{"Hora":8,"C3ntro - AT&T":0,"Auronix - AT&T":802,"Innovattia - AT&T":0,"Connect - AT&T":230,"C3ntro - Movistar":0,"Auronix - Movistar":1642,"Innovattia - Movistar":0,"Connect - Movistar":353,"C3ntro - Telcel":0,"Auronix - Telcel":3488,"Innovattia - Telcel":1154,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":7,"Innovattia - Otros":0,"Connect - Otros":1},{"Hora":9,"C3ntro - AT&T":2,"Auronix - AT&T":1811,"Innovattia - AT&T":5,"Connect - AT&T":100,"C3ntro - Movistar":2,"Auronix - Movistar":1097,"Innovattia - Movistar":3,"Connect - Movistar":160,"C3ntro - Telcel":2,"Auronix - Telcel":6451,"Innovattia - Telcel":789,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":5,"Innovattia - Otros":0,"Connect - Otros":1},{"Hora":10,"C3ntro - AT&T":2,"Auronix - AT&T":7042,"Innovattia - AT&T":2,"Connect - AT&T":902,"C3ntro - Movistar":2,"Auronix - Movistar":4789,"Innovattia - Movistar":3,"Connect - Movistar":1107,"C3ntro - Telcel":417,"Auronix - Telcel":22530,"Innovattia - Telcel":3513,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":28,"Innovattia - Otros":0,"Connect - Otros":3},{"Hora":11,"C3ntro - AT&T":2,"Auronix - AT&T":6639,"Innovattia - AT&T":2,"Connect - AT&T":73,"C3ntro - Movistar":2,"Auronix - Movistar":8121,"Innovattia - Movistar":2,"Connect - Movistar":37,"C3ntro - Telcel":2,"Auronix - Telcel":25046,"Innovattia - Telcel":239,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":31,"Innovattia - Otros":0,"Connect - Otros":0},{"Hora":12,"C3ntro - AT&T":2,"Auronix - AT&T":2903,"Innovattia - AT&T":3,"Connect - AT&T":1319,"C3ntro - Movistar":2,"Auronix - Movistar":1888,"Innovattia - Movistar":3,"Connect - Movistar":908,"C3ntro - Telcel":2737,"Auronix - Telcel":10739,"Innovattia - Telcel":2378,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":11,"Innovattia - Otros":0,"Connect - Otros":6},{"Hora":13,"C3ntro - AT&T":2,"Auronix - AT&T":446,"Innovattia - AT&T":1406,"Connect - AT&T":2564,"C3ntro - Movistar":2,"Auronix - Movistar":425,"Innovattia - Movistar":3,"Connect - Movistar":3644,"C3ntro - Telcel":6959,"Auronix - Telcel":2124,"Innovattia - Telcel":5364,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":2,"Innovattia - Otros":0,"Connect - Otros":27},{"Hora":14,"C3ntro - AT&T":2,"Auronix - AT&T":761,"Innovattia - AT&T":2,"Connect - AT&T":1450,"C3ntro - Movistar":2,"Auronix - Movistar":1304,"Innovattia - Movistar":4,"Connect - Movistar":2333,"C3ntro - Telcel":4225,"Auronix - Telcel":3251,"Innovattia - Telcel":3334,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":0,"Innovattia - Otros":0,"Connect - Otros":4},{"Hora":15,"C3ntro - AT&T":2,"Auronix - AT&T":9294,"Innovattia - AT&T":307,"Connect - AT&T":155,"C3ntro - Movistar":2,"Auronix - Movistar":9460,"Innovattia - Movistar":463,"Connect - Movistar":4186,"C3ntro - Telcel":7642,"Auronix - Telcel":10938,"Innovattia - Telcel":2080,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":8,"Innovattia - Otros":1,"Connect - Otros":28},{"Hora":16,"C3ntro - AT&T":2,"Auronix - AT&T":3439,"Innovattia - AT&T":209,"Connect - AT&T":158,"C3ntro - Movistar":2,"Auronix - Movistar":484,"Innovattia - Movistar":577,"Connect - Movistar":7717,"C3ntro - Telcel":58456,"Auronix - Telcel":2159,"Innovattia - Telcel":2480,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":24,"Innovattia - Otros":0,"Connect - Otros":16},{"Hora":17,"C3ntro - AT&T":2,"Auronix - AT&T":220,"Innovattia - AT&T":3,"Connect - AT&T":671,"C3ntro - Movistar":2,"Auronix - Movistar":125,"Innovattia - Movistar":2,"Connect - Movistar":940,"C3ntro - Telcel":2144,"Auronix - Telcel":911,"Innovattia - Telcel":2631,"Connect - Telcel":0,"C3ntro - Otros":0,"Auronix - Otros":1,"Innovattia - Otros":0,"Connect - Otros":9}]
let graficaCarrier = [{"CarrierMovil":"Telcel","Cant":207219},{"CarrierMovil":"Movistar","Cant":55005},{"CarrierMovil":"AT&T","Cant":45995},{"CarrierMovil":"Otros","Cant":243}]
let graficaCliente = [{"ID":31,"Cliente":"RECREMEX","Auronix":109266,"Innovattia":0,"Auronix Bancos":0,"Connect":0,"C3ntro":0,"Total":109266},{"ID":10,"Cliente":"COLL MANAGEMENT","Auronix":12302,"Innovattia":8199,"Auronix Bancos":0,"Connect":7764,"C3ntro":34349,"Total":62614},{"ID":16,"Cliente":"FAMSA","Auronix":2648,"Innovattia":3634,"Auronix Bancos":1000,"Connect":8084,"C3ntro":35995,"Total":51361},{"ID":3,"Cliente":"BANCO INVEX, S.A., INSTITUCION DE BANCA","Auronix":18240,"Innovattia":0,"Auronix Bancos":0,"Connect":0,"C3ntro":0,"Total":18240},{"ID":19,"Cliente":"GABINETE DE COBRANZA ESPECIALIZADA SA DE CV","Auronix":0,"Innovattia":3339,"Auronix Bancos":0,"Connect":3792,"C3ntro":4042,"Total":11173},{"ID":4,"Cliente":"Banregio","Auronix":0,"Innovattia":0,"Auronix Bancos":10357,"Connect":0,"C3ntro":0,"Total":10357},{"ID":11,"Cliente":"COMERCIALIZADORA DE FRECUENCIAS SATELITALES","Auronix":118,"Innovattia":3219,"Auronix Bancos":0,"Connect":2805,"C3ntro":3483,"Total":9625},{"ID":24,"Cliente":"INVERSIONES ACCIONARIAS LANDUS","Auronix":9256,"Innovattia":0,"Auronix Bancos":0,"Connect":0,"C3ntro":0,"Total":9256},{"ID":17,"Cliente":"Fernando Martínez","Auronix":0,"Innovattia":920,"Auronix Bancos":0,"Connect":1404,"C3ntro":3371,"Total":5695},{"ID":34,"Cliente":"Tertius SAPI","Auronix":0,"Innovattia":3206,"Auronix Bancos":0,"Connect":1588,"C3ntro":414,"Total":5208},{"ID":26,"Cliente":"LG+1 LEGAL SOLUTION S.C.","Auronix":0,"Innovattia":1380,"Auronix Bancos":0,"Connect":1953,"C3ntro":839,"Total":4172},{"ID":8,"Cliente":"CAPITAL SAPI DE CV SOFOM ENR","Auronix":0,"Innovattia":1482,"Auronix Bancos":0,"Connect":998,"C3ntro":0,"Total":2480},{"ID":15,"Cliente":"FACIL EMPEÑOS SA DE CV","Auronix":1977,"Innovattia":0,"Auronix Bancos":0,"Connect":0,"C3ntro":0,"Total":1977},{"ID":1,"Cliente":"ATENTO MEXICO HOLDCO","Auronix":0,"Innovattia":91,"Auronix Bancos":1685,"Connect":4,"C3ntro":0,"Total":1780},{"ID":35,"Cliente":"VALKIPRO, S.C","Auronix":1066,"Innovattia":0,"Auronix Bancos":0,"Connect":0,"C3ntro":0,"Total":1066},{"ID":27,"Cliente":"MABE S.A. DE C.V.","Auronix":1,"Innovattia":584,"Auronix Bancos":0,"Connect":206,"C3ntro":27,"Total":818},{"ID":14,"Cliente":"DISH COMERCIALIZADORA DE FRECUENCIAS SATELITALES","Auronix":0,"Innovattia":391,"Auronix Bancos":0,"Connect":419,"C3ntro":0,"Total":810},{"ID":13,"Cliente":"COMERCIALIZADORA DE FRECUENCIAS SATELITALES (ALTAN)","Auronix":0,"Innovattia":259,"Auronix Bancos":0,"Connect":187,"C3ntro":8,"Total":454},{"ID":12,"Cliente":"COMERCIALIZADORA DE FRECUENCIAS SATELITALES (agentes)","Auronix":0,"Innovattia":0,"Auronix Bancos":363,"Connect":0,"C3ntro":0,"Total":363},{"ID":5,"Cliente":"BENEFICIA MX","Auronix":8,"Innovattia":232,"Auronix Bancos":0,"Connect":93,"C3ntro":26,"Total":359},{"ID":29,"Cliente":"Marcatel Demo","Auronix":54,"Innovattia":54,"Auronix Bancos":54,"Connect":36,"C3ntro":54,"Total":252},{"ID":7,"Cliente":"CAME","Auronix":0,"Innovattia":84,"Auronix Bancos":0,"Connect":116,"C3ntro":0,"Total":200},{"ID":25,"Cliente":"KARUM","Auronix":0,"Innovattia":80,"Auronix Bancos":0,"Connect":31,"C3ntro":6,"Total":117},{"ID":21,"Cliente":"GRUPO MEXICANO DE SERVICIOS INTEGRALES","Auronix":0,"Innovattia":85,"Auronix Bancos":0,"Connect":32,"C3ntro":0,"Total":117},{"ID":22,"Cliente":"Heineken de Mexico S.A. de C.V.","Auronix":0,"Innovattia":97,"Auronix Bancos":0,"Connect":13,"C3ntro":2,"Total":112},{"ID":33,"Cliente":"Tendencias Industriales SA de CV","Auronix":0,"Innovattia":68,"Auronix Bancos":0,"Connect":22,"C3ntro":0,"Total":90},{"ID":36,"Cliente":"YANBAL_VALKIPRO","Auronix":0,"Innovattia":66,"Auronix Bancos":0,"Connect":10,"C3ntro":3,"Total":79},{"ID":28,"Cliente":"Marcatel","Auronix":60,"Innovattia":0,"Auronix Bancos":0,"Connect":9,"C3ntro":0,"Total":69},{"ID":30,"Cliente":"Master","Auronix":66,"Innovattia":0,"Auronix Bancos":0,"Connect":0,"C3ntro":0,"Total":66},{"ID":32,"Cliente":"Senda TI","Auronix":58,"Innovattia":0,"Auronix Bancos":0,"Connect":0,"C3ntro":0,"Total":58},{"ID":23,"Cliente":"INSTITUCION DE BANCA MULTIPLE BANCO INVEX, S.A","Auronix":58,"Innovattia":0,"Auronix Bancos":0,"Connect":0,"C3ntro":0,"Total":58},{"ID":20,"Cliente":"Giro Digital, S.A.P.I. de C.V.","Auronix":0,"Innovattia":15,"Auronix Bancos":0,"Connect":26,"C3ntro":0,"Total":41},{"ID":2,"Cliente":"Banco Bancrea SA de CV","Auronix":0,"Innovattia":0,"Auronix Bancos":40,"Connect":0,"C3ntro":0,"Total":40},{"ID":9,"Cliente":"Cerveceria Cuauhtemoc Moctezuma, S.A. de C.V.","Auronix":37,"Innovattia":0,"Auronix Bancos":0,"Connect":0,"C3ntro":0,"Total":37},{"ID":18,"Cliente":"FOMENTO EMPRESARIAL INMOBILIARIO S.A DE C.V","Auronix":25,"Innovattia":0,"Auronix Bancos":0,"Connect":0,"C3ntro":0,"Total":25},{"ID":6,"Cliente":"Blue Messaging ","Auronix":0,"Innovattia":5,"Auronix Bancos":0,"Connect":4,"C3ntro":1,"Total":10}]
let graficaDistProveedor = [{"CarrierMovil":"Auronix","Cant":207219},{"CarrierMovil":"Connect","Cant":55005},{"CarrierMovil":"C3ntro","Cant":45995},{"CarrierMovil":"Innovattia","Cant":40000}]
*/
// INICIA GRAFICA LINEA PROVEEDOR - CARRIER
var horas = [];
var auronixatt = [];
var auronixtelcel = [];
var auronixmovistar = [];
var auronixotros = [];
//var c3ntroatt = [];
var c3ntrotelcel = [];
//var c3ntromovistar = [];
//var c3ntrootros = [];
var innovattiaatt = [];
var innovattiatelcel = [];
var innovattiamovistar = [];
var innovattiaotros = [];
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
    c3ntrotelcel.push(graficaProveedor[i]['C3ntro - Telcel']);
    //c3ntromovistar.push(graficaProveedor[i]['C3ntro - Movistar']);
    //c3ntrootros.push(graficaProveedor[i]['C3ntro - Otros']);
    innovattiaatt.push(graficaProveedor[i]['Innovattia - AT&T']);
    innovattiatelcel.push(graficaProveedor[i]['Innovattia - Telcel']);
    innovattiamovistar.push(graficaProveedor[i]['Innovattia - Movistar']);
    innovattiaotros.push(graficaProveedor[i]['Innovattia - Otros']);
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
            },*/
            {
                label: 'C3ntro - Telcel',
                fill: false,
                backgroundColor: chartColors.green,
                borderColor: chartColors.green,
                data: c3ntrotelcel
            },/*
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
            {
                label: 'Innovattia - AT&T',
                fill: false,
                backgroundColor: chartColors.lightBlue,
                borderColor: chartColors.lightBlue,
                data: innovattiaatt
            },
            {
                label: 'Innovattia - Telcel',
                fill: false,
                backgroundColor: chartColors.brown,
                borderColor: chartColors.brown,
                data: innovattiatelcel
            },
            {
                label: 'Innovattia - Movistar',
                fill: false,
                backgroundColor: chartColors.aqua,
                borderColor: chartColors.aqua,
                data: innovattiamovistar
            },
            {
                label: 'Innovattia - Otros',
                fill: false,
                backgroundColor: chartColors.beige,
                borderColor: chartColors.beige,
                data: innovattiaotros
            },
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

// INICIA GRAFICA DONA PROVEEDOR
var labelProveedor = [];
var dataProveedor = [];
var totalExitosos = 0;
for (i = 0; i < graficaDistProveedor.length; i++) {
    labelProveedor.push(graficaDistProveedor[i]['Proveedor']);
    dataProveedor.push(graficaDistProveedor[i]['Cant']);
    totalExitosos = totalExitosos + graficaDistProveedor[i]['Cant'];
};
var configProveedor = {
    type: 'doughnut',
    data: {
        labels: labelProveedor,
        datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: dataProveedor
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Mensajes por Proveedor',
            fontFamily: 'sans-serif',
            fontSize: 20
        }
    }
}


var canvasDistProveedor = document.getElementById("chartDistProveedor");

//TERMINA GRAFICA DONA PROVEEDOR



// INICIA GRAFICA BARRAS CLIENTES

var labelClientes = [];
var dataAuronix = [];
var dataInnovattia = [];
var dataBancos = [];
var dataConnect = [];
var dataC3ntro = [];

for (i = 0; i < graficaCliente.length; i++) {
    labelClientes.push(graficaCliente[i]['Cliente'].substr(0, 30));
    dataAuronix.push(graficaCliente[i]['Auronix']);
    dataInnovattia.push(graficaCliente[i]['Innovattia']);
    dataBancos.push(graficaCliente[i]['Auronix Bancos']);
    dataConnect.push(graficaCliente[i]['Connect']);
    dataC3ntro.push(graficaCliente[i]['C3ntro']);
};

var dataClientes = {
    labels: labelClientes,
    datasets: [{
        label: 'Auronix',
        backgroundColor: window.chartColors.blue,
        data: dataAuronix
    }, {
        label: 'Innovattia',
        backgroundColor: window.chartColors.red,
        data: dataInnovattia
    }, {
        label: 'Auronix Bancos',
        backgroundColor: window.chartColors.green,
        data: dataBancos
    }, {
        label: 'Connect',
        backgroundColor: window.chartColors.purple,
        data: dataConnect
    }, {
        label: 'C3ntro',
        backgroundColor: window.chartColors.orange,
        data: dataC3ntro
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
var myDoughnutChart = new Chart(canvasDistProveedor, configProveedor);
var myLineChart = new Chart(canvasProveedores, configProveedores);
var myBarChart = new Chart(canvasClientes, configClientes);
