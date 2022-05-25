var thisdata = []; // 可视化使用的数据
var chart; // 可视化图表
var datavizWrap = $(".dataviz_wrap");

const promise1 = d3.text("../csv/varname.csv");
const promise2 = d3.text("../csv/case39_falut1.csv");
Promise.all([promise1, promise2]).then((values) => {
    ready(values[0], values[1]);
})

function ready(data1, data2) {

    // 读取数据，合并数据信息
    var mydata = [];
    mydata[0] = [];
    // 获取表头信息
    var dt1 = d3.csvParseRows(data1);
    // 添加time列，并将列名作为数据的第一行（mydata的头部）
    mydata[0][0] = 'time';
    for (var i = 0; i < dt1.length; i++) {
        if (dt1[i][0] === undefined) continue;
        if (dt1[i][0] === "") continue;
        mydata[0].push(dt1[i][0].split("'")[1]);
    }
    // 获取数据信息
    var dt2 = d3.csvParseRows(data2);
    var dtv = []; //无头部的mydata
    // 给每一行加上time
    for (var i = 0; i < dt2.length; i++) {
        dtv[i] = [];
        dtv[i][0] = i;
        for (var j = 0; j < dt2[0].length; j++) {
            dtv[i][j + 1] = +dt2[i][j];
        }
    }
    // 将每一行数据加到data中
    for (var i = 0; i < dtv.length; i++) {
        mydata.push(dtv[i]);
    }
    console.log(mydata);

    // 根据数据含义处理数据
    var mydataPro = [];
    // 记录特殊数据的列下标
    var theta40 = 0, V40 = 0, P40 = 0, Q40 = 0, P1to40 = 0, P40to2 = 0, P2to40 = 0, P40to1 = 0, Q1to40 = 0, Q40to2 = 0, Q2to40 = 0, Q40to1 = 0;
    // 处理 
    for (var i = 0; i < mydata.length; i++) {
        var myrowPro = mydata[i];
        if (i == 0) {
            theta40 = myrowPro.indexOf('theta_Bus 40');
            myrowPro.splice(theta40, 1);
            V40 = myrowPro.indexOf('V_Bus 40');
            myrowPro.splice(V40, 1);
            P40 = myrowPro.indexOf('P_Bus 40');
            myrowPro.splice(P40, 1);
            Q40 = myrowPro.indexOf('Q_Bus 40');
            myrowPro.splice(Q40, 1);
            P1to40 = myrowPro.indexOf('P_Bus  1_Bus 40');
            myrowPro[P1to40] = 'P_Bus  1_Bus  2';
            P2to40 = myrowPro.indexOf('P_Bus  2_Bus 40');
            myrowPro[P2to40] = 'P_Bus  2_Bus  1';
            Q1to40 = myrowPro.indexOf('Q_Bus  1_Bus 40');
            myrowPro[Q1to40] = 'Q_Bus  1_Bus  2';
            Q2to40 = myrowPro.indexOf('Q_Bus  2_Bus 40');
            myrowPro[Q2to40] = 'Q_Bus  2_Bus  1';
            P40to2 = myrowPro.indexOf('P_Bus 40_Bus  2');
            myrowPro.splice(P40to2, 1);
            P40to1 = myrowPro.indexOf('P_Bus 40_Bus  1');
            myrowPro.splice(P40to1, 1);
            Q40to2 = myrowPro.indexOf('Q_Bus 40_Bus  2');
            myrowPro.splice(Q40to2, 1);
            Q40to1 = myrowPro.indexOf('Q_Bus 40_Bus  1');
            myrowPro.splice(Q40to1, 1);
        } else {
            myrowPro.splice(theta40, 1);
            myrowPro.splice(V40, 1);
            myrowPro.splice(P40, 1);
            myrowPro.splice(Q40, 1);
            myrowPro[P1to40] += myrowPro[P40to2];
            myrowPro[P2to40] += myrowPro[P40to1];
            myrowPro[Q1to40] += myrowPro[Q40to2];
            myrowPro[Q2to40] += myrowPro[Q40to1];
            myrowPro.splice(P40to2, 1);
            myrowPro.splice(P40to1, 1);
            myrowPro.splice(Q40to2, 1);
            myrowPro.splice(Q40to1, 1);
        }
        mydataPro.push(myrowPro);
    }


    // 1 theta_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
            if (mydataPro[0][j].search('theta_') == -1) continue;
            var myrow = {};
            myrow.time = mydataPro[i][0];
            myrow.varname = mydataPro[0][j];
            myrow.num = mydataPro[i][j];
            thisdata.push(myrow);
        }
    }
    console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "theta_Bus",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    var myDataviz = document.createElement('div');
    myDataviz.className = "dataviz";
    myDataviz.appendChild(chart);
    datavizWrap.append(myDataviz);

    // 2 V_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
            if (mydataPro[0][j].search('V_') == -1) continue;
            var myrow = {};
            myrow.time = mydataPro[i][0];
            myrow.varname = mydataPro[0][j];
            myrow.num = mydataPro[i][j];
            thisdata.push(myrow);
        }
    }
    console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "V_Bus",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    var myDataviz = document.createElement('div');
    myDataviz.className = "dataviz";
    myDataviz.appendChild(chart);
    datavizWrap.append(myDataviz);

    // 3 P_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
            if (mydataPro[0][j].search('P_') == -1) continue;
            var myrow = {};
            myrow.time = mydataPro[i][0];
            myrow.varname = mydataPro[0][j];
            myrow.num = mydataPro[i][j];
            thisdata.push(myrow);
        }
    }
    console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "P_Bus",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    var myDataviz = document.createElement('div');
    myDataviz.className = "dataviz";
    myDataviz.appendChild(chart);
    datavizWrap.append(myDataviz);

    // 4 Q_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
            if (mydataPro[0][j].search('Q_') == -1) continue;
            var myrow = {};
            myrow.time = mydataPro[i][0];
            myrow.varname = mydataPro[0][j];
            myrow.num = mydataPro[i][j];
            thisdata.push(myrow);
        }
    }
    console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "Q_Bus",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    var myDataviz = document.createElement('div');
    myDataviz.className = "dataviz";
    myDataviz.appendChild(chart);
    datavizWrap.append(myDataviz);


    /*
    // V_Bus方差变化
    var V_Bus = [];
    for (var i = 0; i < mydataPro.length; i++) {
        var vbusrow = [];
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
            if (mydataPro[0][j].search('V_') == -1) continue;
            vbusrow.push(mydataPro[i][j]);
        }
        if (i == 0) {
            vbusrow.push('V_Bus Variance');
            vbusrow.push('time');
        } else {
            var rowVariance = variance(vbusrow);
            vbusrow.push(rowVariance);
            vbusrow.push(mydataPro[i][0]);
        }
        V_Bus.push(vbusrow);
    }
    console.log(V_Bus);
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < V_Bus.length; i++) {
        for (var j = 0; j < V_Bus[i].length - 1; j++) {
            if (V_Bus[0][j].search('Variance') == -1) continue;
            var myrow = {};
            myrow.time = V_Bus[i][V_Bus[i].length - 1];
            myrow.varname = V_Bus[0][j];
            myrow.num = V_Bus[i][j];
            thisdata.push(myrow);
        }
    }
    console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "V_Bus_Variance",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    var myDataviz = document.createElement('div');
    myDataviz.className = "dataviz";
    myDataviz.appendChild(chart);
    datavizWrap.append(myDataviz);
    
    // V_Bus当前时间点与前一时间点的差值
    var V_Bus = [];
    for (var i = 0; i < mydataPro.length; i++) {
        var vbusrow = [];
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
            if (mydataPro[0][j].search('V_') == -1) continue;
            vbusrow.push(mydataPro[i][j]);
        }
        if (i == 0) {
            vbusrow.push('time');
        } else {
            vbusrow.push(mydataPro[i][0]);
        }
        V_Bus.push(vbusrow);
    }
    console.log(V_Bus);
    var V_Bus_Minus = [];
    V_Bus_Minus.push(V_Bus[0]);
    for(var i = 2; i < V_Bus.length; i++) {
        var thisrow = [];
        for(j = 0; j < V_Bus[j].length - 1; j++) {
            thisrow.push(V_Bus[i][j] - V_Bus[i-1][j]);
        }
        thisrow.push(V_Bus[i][V_Bus[i].length - 1]);
        V_Bus_Minus.push(thisrow);
    }
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < V_Bus_Minus.length; i++) {
        for (var j = 0; j < V_Bus_Minus[i].length - 1; j++) {
            var myrow = {};
            myrow.time = V_Bus_Minus[i][V_Bus_Minus[i].length - 1];
            myrow.varname = V_Bus_Minus[0][j];
            myrow.num = V_Bus_Minus[i][j];
            thisdata.push(myrow);
        }
    }
    console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "V_Bus_Different",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    var myDataviz = document.createElement('div');
    myDataviz.className = "dataviz";
    myDataviz.appendChild(chart);
    datavizWrap.append(myDataviz);
    */
}

    function variance(arr) {
        var sum = 0.0;
        var s = 0.0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i]
        }
        var ave = sum / arr.length;
        for (var j = 0; j < arr.length; j++) {
            s += Math.pow((ave - arr[j]), 2);
        }
        return Math.sqrt((s / arr.length), 2);
    }
