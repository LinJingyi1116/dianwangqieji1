var thisdata = []; // 可视化使用的数据
var chart; // 可视化图表
var bG = "0"; //buttonGenerator被点击的按钮的Index
var bB = "0"; //buttonBus被点击的按钮的Index
var bL = "0"; //buttonLine被点击的按钮的Index
var viz = $("#dataviz_wrap_Detail");

var buttonGenerator = $(".generator");
var buttonBus = $(".bus");
var buttonLine = $(".line");
var vizTitle = $(".viz_title");
var buttonLineGB = $(".line_gb");

//const promise1 = d3.text("../csv/varname2.csv");
//const promise2 = d3.text("../csv/varout2.csv");

buttonGenerator.on("click", function () {
    bL = "0";
    bB = "0";
    viz.html("");
    $(this).addClass("generator-active").siblings().removeClass("generator-active").removeClass("bus-active").removeClass("line-active");
    bG = $(this).attr("data-index");
    vizTitle.text("Generator " + bG);
    Promise.all([promise1, promise2]).then((values) => {
        drawViz(values[0], values[1]);
    })
})

buttonBus.on("click", function () {
    bG = "0";
    bL = "0";
    viz.html("");
    $(this).addClass("bus-active").siblings().removeClass("generator-active").removeClass("bus-active").removeClass("line-active");
    bB = $(this).attr("data-index");
    vizTitle.text("Bus " + bB)
    Promise.all([promise1, promise2]).then((values) => {
        drawViz(values[0], values[1]);
    })
})

buttonLine.on("click", function () {
    bB = "0";
    bG = "0";
    viz.html("");
    $(this).addClass("line-active").siblings().removeClass("generator-active").removeClass("bus-active").removeClass("line-active");
    bL = $(this).attr("data-index").split("_")[0];
    vizTitle.text("Bus " + bL.split("-")[0] + "_Bus " + bL.split("-")[1] + " / Bus " + bL.split("-")[1] + "_Bus " + bL.split("-")[0]);
    Promise.all([promise1, promise2]).then((values) => {
        drawViz(values[0], values[1]);
    })
})

buttonLineGB.off("click");


function drawViz(data1, data2) {

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


    if (bG != "0") {

        // 1 delta_Syn
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].search('Syn') == -1) continue;
                if (mydataPro[0][j].endsWith("_" + bG) == false) continue;
                if (mydataPro[0][j].search('delta_') == -1) continue;
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
            yLabel: "delta_Syn",
            width: 370,
            height: 155,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 2 omega_Syng
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].search('Syn') == -1) continue;
                if (mydataPro[0][j].endsWith("_" + bG) == false) continue;
                if (mydataPro[0][j].search('omega_') == -1) continue;
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
            yLabel: "omega_Syn",
            width: 370,
            height: 155,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 3 e1q_Syn
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].search('Syn') == -1) continue;
                if (mydataPro[0][j].endsWith("_" + bG) == false) continue;
                if (mydataPro[0][j].search('e1q_') == -1) continue;
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
            yLabel: "e1q_Syn",
            width: 370,
            height: 155,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 4 e1d_Syn
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].search('Syn') == -1) continue;
                if (mydataPro[0][j].endsWith("_" + bG) == false) continue;
                if (mydataPro[0][j].search('e1d_') == -1) continue;
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
            yLabel: "e1d_Syn",
            width: 370,
            height: 155,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 5 vf_Syn
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].search('Syn') == -1) continue;
                if (mydataPro[0][j].endsWith("_" + bG) == false) continue;
                if (mydataPro[0][j].search('vf_') == -1) continue;
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
            yLabel: "vf_Syn",
            width: 370,
            height: 155,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 6 pm_Syn
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].search('Syn') == -1) continue;
                if (mydataPro[0][j].endsWith("_" + bG) == false) continue;
                if (mydataPro[0][j].search('pm_') == -1) continue;
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
            yLabel: "pm_Syn",
            width: 370,
            height: 155,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 7 p_Syn
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].search('Syn') == -1) continue;
                if (mydataPro[0][j].endsWith("_" + bG) == false) continue;
                if (mydataPro[0][j].search('p_') == -1) continue;
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
            yLabel: "p_Syn",
            width: 370,
            height: 155,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 8 q_Syn
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].search('Syn') == -1) continue;
                if (mydataPro[0][j].endsWith("_" + bG) == false) continue;
                if (mydataPro[0][j].search('q_') == -1) continue;
                if (mydataPro[0][j].search('e1q_') != -1) continue;
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
            yLabel: "q_Syn",
            width: 370,
            height: 155,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

    } else if (bB != "0") {

        // 1 theta_Bus
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
                if (mydataPro[0][j].endsWith(" " + bB) == false) continue;
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
            width: 370,
            height: 320,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 2 V_Bus
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
                if (mydataPro[0][j].endsWith(" " + bB) == false) continue;
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
            width: 370,
            height: 320,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 3 P_Bus
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
                if (mydataPro[0][j].endsWith(" " + bB) == false) continue;
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
            width: 370,
            height: 320,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 4 Q_Bus
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length != 1) continue;
                if (mydataPro[0][j].endsWith(" " + bB) == false) continue;
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
            width: 370,
            height: 320,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

    } else if (bL != "0") {

        // 1 P_Bus_Bus
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length == 1) continue;
                if (mydataPro[0][j].endsWith(" " + bL.split("-")[1]) == false && mydataPro[0][j].endsWith(" " + bL.split("-")[0]) == false) continue;
                if (mydataPro[0][j].endsWith(" " + bL.split("-")[1])) {
                    if(mydataPro[0][j].search(" " + bL.split("-")[0] + "_") == -1) continue;
                }
                if (mydataPro[0][j].endsWith(" " + bL.split("-")[0])) {
                    if(mydataPro[0][j].search(" " + bL.split("-")[1] + "_") == -1) continue;
                }
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
            height: 320,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

        // 2 Q_Bus_Bus
        // 将数据转化为绘制折线图需要的格式
        thisdata = [];
        for (var i = 1; i < mydataPro.length; i++) {
            for (var j = 1; j < mydataPro[i].length; j++) {
                if (mydataPro[0][j].match(/Bus/g) == null || mydataPro[0][j].match(/Bus/g).length == 1) continue;
                if (mydataPro[0][j].endsWith(" " + bL.split("-")[1]) == false && mydataPro[0][j].endsWith(" " + bL.split("-")[0]) == false) continue;
                if (mydataPro[0][j].endsWith(" " + bL.split("-")[1])) {
                    if(mydataPro[0][j].search(" " + bL.split("-")[0] + "_") == -1) continue;
                }
                if (mydataPro[0][j].endsWith(" " + bL.split("-")[0])) {
                    if(mydataPro[0][j].search(" " + bL.split("-")[1] + "_") == -1) continue;
                }
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
            height: 320,
            color: "steelblue"
        })
        // 将图表插入网页元素中
        var myDataviz = document.createElement('div');
        myDataviz.className = "dataviz";
        myDataviz.appendChild(chart);
        viz.append(myDataviz);

    }
}
