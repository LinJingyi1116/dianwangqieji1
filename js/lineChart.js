/* 画图 */
var thisdata = []; // 可视化使用的数据
var chart; // 可视化图表
var datavizWrapSyn = $("#dataviz_wrap_Syn");
var datavizWrapExc = $("#dataviz_wrap_Exc");
var datavizWrapBus = $("#dataviz_wrap_Bus");
var datavizWrapBusBus = $("#dataviz_wrap_Bus_Bus");

var varoutName = ["case39_falut1.csv", "varout2.csv"];
var varoutNameIndex = sessionStorage.getItem("varoutNameIndex");
if (varoutNameIndex == undefined || varoutNameIndex == 0) {
    varoutNameIndex = 1;
    sessionStorage.setItem("varoutNameIndex", varoutNameIndex);
    console.log(varoutNameIndex);
} else if (varoutNameIndex > 0 && varoutNameIndex < varoutName.length - 1) {
    varoutNameIndex++;
    sessionStorage.setItem("varoutNameIndex", varoutNameIndex);
    console.log(varoutNameIndex);
} else {
    varoutNameIndex = 0;
    sessionStorage.setItem("varoutNameIndex", varoutNameIndex);
    console.log(varoutNameIndex);
}

var promise1 = d3.text("../csv/varname2.csv");
var promise2 = d3.text("../csv/" + varoutName[varoutNameIndex]);
var promiseST = setTimeout(function () {
    if (varoutNameIndex == varoutName.length - 1) {
        varoutNameIndex = 0;
        sessionStorage.setItem("varoutNameIndex", varoutNameIndex);
        clearTimeout(promiseST);
    } else {
        window.location.reload();
    }
}, 10000);
Promise.all([promise1, promise2, promiseST]).then((values) => {
    ready(values[0], values[1]);
})


/*
var promise1 = d3.text("../csv/varname2.csv");
var promise2 = d3.text("../csv/varout2.csv");
Promise.all([promise1, promise2]).then((values) => {
    ready(values[0], values[1]);
})
*/

function ready(data1, data2) {

    var mydataPro = preprocessing(data1, data2);

    // 1 delta_Syn
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Syn') == -1) continue;
            if (mydataPro[0][j].search('delta_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "delta_Syn",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapSyn);

    // 2 omega_Syn
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Syn') == -1) continue;
            if (mydataPro[0][j].search('omega_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "omega_Syn",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapSyn);

    // 3 e1q_Syn
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Syn') == -1) continue;
            if (mydataPro[0][j].search('e1q_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "e1q_Syn",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapSyn);

    // 4 e1d_Syn
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Syn') == -1) continue;
            if (mydataPro[0][j].search('e1d_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "e1d_Syn",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapSyn);

    // 5 vf_Syn
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Syn') == -1) continue;
            if (mydataPro[0][j].search('vf_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "vf_Syn",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapSyn);

    // 6 pm_Syn
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Syn') == -1) continue;
            if (mydataPro[0][j].search('pm_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "pm_Syn",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapSyn);

    // 7 p_Syn
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Syn') == -1) continue;
            if (mydataPro[0][j].search('p_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "p_Syn",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapSyn);

    // 8 q_Syn
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Syn') == -1) continue;
            if (mydataPro[0][j].search('q_') == -1) continue;
            if (mydataPro[0][j].search('e1q_') != -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "q_Syn",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapSyn);


    // 1 vm_Exc
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Exc') == -1) continue;
            if (mydataPro[0][j].search('vm_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "vm_Exc",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapExc);

    // 2 vr1_Exc
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Exc') == -1) continue;
            if (mydataPro[0][j].search('vr1_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "vr1_Exc",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapExc);

    // 3 vr2_Exc
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Exc') == -1) continue;
            if (mydataPro[0][j].search('vr2_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "vr2_Exc",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapExc);

    // 4 vf_Exc
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Exc') == -1) continue;
            if (mydataPro[0][j].search('vf_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "vf_Exc",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapExc);

    // 5 vref_Exc
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].search('Exc') == -1) continue;
            if (mydataPro[0][j].search('vref_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "vref_Exc",
        width: 750,
        height: 300,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapExc);


    // 1 theta_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
            if (mydataPro[0][j].search('theta_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
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
    appendChart(datavizWrapBus);

    // 2 V_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
            if (mydataPro[0][j].search('V_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
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
    appendChart(datavizWrapBus);

    // 3 P_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
            if (mydataPro[0][j].search('P_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
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
    appendChart(datavizWrapBus);

    // 4 Q_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
            if (mydataPro[0][j].search('Q_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
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
    appendChart(datavizWrapBus);


    // 1 P_Bus_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length == 1) continue;
            if (mydataPro[0][j].search('P_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "P_Bus",
        width: 750,
        height: 650,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapBusBus);

    // 2 Q_Bus_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length == 1) continue;
            if (mydataPro[0][j].search('Q_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "Q_Bus",
        width: 750,
        height: 650,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapBusBus);

    /*
    // 3 I_Bus_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if(mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length == 1) continue;
            if(mydataPro[0][j].search('I_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "I_Bus",
        width: 750,
        height: 650,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapBusBus);

    // 4 S_Bus_Bus
    // 将数据转化为绘制折线图需要的格式
    thisdata = [];
    for (var i = 1; i < mydataPro.length; i++) {
        for (var j = 1; j < mydataPro[i].length; j++) {
            if(mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length == 1) continue;
            if(mydataPro[0][j].search('S_') == -1) continue;
            pushMyrow(mydataPro, thisdata, i, j);
        }
    }
    // console.log(thisdata);
    // 绘图(导入drawLineChart.js)
    chart = LineChart(thisdata, {
        x: d => d.time,
        y: d => d.num,
        z: d => d.varname,
        xType: d3.scaleLinear,
        yLabel: "S_Bus",
        width: 750,
        height: 650,
        color: "steelblue"
    })
    // 将图表插入网页元素中
    appendChart(datavizWrapBusBus);
    */
}

function preprocessing(data1, data2) {
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
        //mydata[0].push(dt1[i][0].split("'")[1]);
        mydata[0].push(dt1[i][0]);
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
    var theta40 = 0, V40 = 0, P40 = 0, Q40 = 0, P1to40 = 0, P40to2 = 0, P2to40 = 0, P40to1 = 0, Q1to40 = 0, Q40to2 = 0, Q2to40 = 0, Q40to1 = 0, I1to40 = 0, I40to2 = 0, I2to40 = 0, I40to1 = 0, S1to40 = 0, S40to2 = 0, S2to40 = 0, S40to1 = 0;
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
            I1to40 = myrowPro.indexOf('I_Bus  1_Bus 40');
            myrowPro[I1to40] = 'I_Bus  1_Bus  2';
            I2to40 = myrowPro.indexOf("I_Bus  2_Bus 40");
            myrowPro[I2to40] = 'I_Bus  2_Bus  1';
            S1to40 = myrowPro.indexOf('S_Bus  1_Bus 40');
            myrowPro[S1to40] = 'S_Bus  1_Bus  2';
            S2to40 = myrowPro.indexOf("S_Bus  2_Bus 40");
            myrowPro[S2to40] = 'S_Bus  2_Bus  1';
            P40to2 = myrowPro.indexOf('P_Bus 40_Bus  2');
            myrowPro.splice(P40to2, 1);
            P40to1 = myrowPro.indexOf('P_Bus 40_Bus  1');
            myrowPro.splice(P40to1, 1);
            Q40to2 = myrowPro.indexOf('Q_Bus 40_Bus  2');
            myrowPro.splice(Q40to2, 1);
            Q40to1 = myrowPro.indexOf('Q_Bus 40_Bus  1');
            myrowPro.splice(Q40to1, 1);
            I40to2 = myrowPro.indexOf('I_Bus 40_Bus  2');
            myrowPro.splice(I40to2, 1);
            I40to1 = myrowPro.indexOf('I_Bus 40_Bus  1');
            myrowPro.splice(I40to1, 1);
            S40to2 = myrowPro.indexOf('S_Bus 40_Bus  2');
            myrowPro.splice(S40to2, 1);
            S40to1 = myrowPro.indexOf('S_Bus 40_Bus  1');
            myrowPro.splice(S40to1, 1);
        } else {
            myrowPro.splice(theta40, 1);
            myrowPro.splice(V40, 1);
            myrowPro.splice(P40, 1);
            myrowPro.splice(Q40, 1);
            myrowPro[P1to40] += myrowPro[P40to2];
            myrowPro[P2to40] += myrowPro[P40to1];
            myrowPro[Q1to40] += myrowPro[Q40to2];
            myrowPro[Q2to40] += myrowPro[Q40to1];
            myrowPro[I1to40] += myrowPro[I40to2];
            myrowPro[I2to40] += myrowPro[I40to1];
            myrowPro[S1to40] += myrowPro[S40to2];
            myrowPro[S2to40] += myrowPro[S40to1];
            myrowPro.splice(P40to2, 1);
            myrowPro.splice(P40to1, 1);
            myrowPro.splice(Q40to2, 1);
            myrowPro.splice(Q40to1, 1);
            myrowPro.splice(I40to2, 1);
            myrowPro.splice(I40to1, 1);
            myrowPro.splice(S40to2, 1);
            myrowPro.splice(S40to1, 1);
        }
        mydataPro.push(myrowPro);
    }
    return mydataPro;
}

function appendChart(datavizWrap) {
    var myDataviz = document.createElement('div');
    myDataviz.className = "dataviz";
    myDataviz.appendChild(chart);
    datavizWrap.append(myDataviz);
}

function pushMyrow(sourceData, targetData, i, j) {
    var myrow = {};
    myrow.time = sourceData[i][0];
    myrow.varname = sourceData[0][j];
    myrow.num = sourceData[i][j];
    targetData.push(myrow);
}


/* 页面跳转 */
$(function () {
    var flag = true; //节流阀 互斥锁
    $(window).scroll(function () {
        if (flag) {
            $(".content section").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top - 41) {
                    $(".header_item").eq(i).addClass("header_item_active").siblings().removeClass("header_item_active");
                }
            })
        }
    })

    $(".header_item").click(function () {
        flag = false;

        $(this).addClass("header_item_active").siblings().removeClass("header_item_active");

        var current = $(".content section").eq($(this).index()).offset().top - 40;
        $("body, html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        });
    })
})
