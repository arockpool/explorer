import utils from './utils.js';

// 挖矿指数趋势
var optionsForMinerIndexTrend = function (origin) {
  let color = ['#333FC6', '#F9BC59', '#E7A2F2', '#0DEBCF']
  let data = []
  origin.value.map((item, index) => {
    data.push({
      color: color[index],
      name: item.title,
      data: item.value,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      areaStyle: index == 3 ? {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(13, 235, 207, 0.08)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(13, 235, 207, 0)' // 100% 处的颜色
          }
          ],
          global: false // 缺省为 false
        }
      } : null
    })
  })

  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 5,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#a0aec0',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${Number(Math.round(parseFloat(item.value) + 0.5) / 2)} ${origin.echartTitle[1]}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      show: true,
      type: 'value',
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          return `${Number(Math.round(value) / 2)}星`
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      minInterval: 2,
      maxInterval: 2,
      max: 10,
      min: 2
    },
    series: data
  }
}

// 挖矿指数维度
var optionsForDimensionality = function ({ title, mainColor, splitLineColor, splitAreaColor, areaStyleColor, data }, echartTitle) {
  return {
    baseOption: {
      title: {
        text: title,
        bottom: 4,
        left: 'center',
        textStyle: {
          color: mainColor,
          fontSize: 14,
          fontWeight: 600
        }
      },
      radar: {
        center: ['50%', '50%'],
        radius: '50%',
        splitLine: {
          lineStyle: {
            color: splitLineColor
          }
        },
        splitArea: {
          areaStyle: {
            color: splitAreaColor
          }
        },
        axisLine: {
          show: false
        },
        indicator: [
          // { name: '昨日有效算力', max: 5 },
          // { name: '昨日产出效率', max: 5, },
          // { name: '7日算力增量', max: 5 },
          // { name: '7日算力维护Gas', max: 5 },
          // { name: '7日扇区错误率', max: 5 }
          { name: echartTitle[0], max: 5 },
          { name: echartTitle[1], max: 5, },
          { name: echartTitle[2], max: 5 },
          { name: echartTitle[3], max: 5 },
          { name: echartTitle[4], max: 5 }
        ],
        name: {
          textStyle: {
            color: '#141634',
            fontSize: 10
          }
        }
      },
      series: [{
        color: mainColor,
        symbol: 'emptyCircle',
        type: 'radar',
        areaStyle: {
          color: areaStyleColor
        },
        lineStyle: {
          width: 2
        },
        data: [{
          value: data,
          label: {
            show: true,
            fontSize: 10,
            color: '#141634',
            distance: 0
          }
        }],
        label: {
          show: true,
          color: '#141634'
        }
      }]
    }
  }
}

// 主网信息全网算力走势
var optionsForDataAllPower = function (origin) {
  let color = ['#3A70FF', '#0DEBCF']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 10,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatPower(item.value)[0]} ${utils.formatPower(item.value)[1]}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      // boundaryGap: false,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      nameGap: 40,
      nameTextStyle: {
        color: '#141634',
        fontSize: 10,
        fontWeight: 500,
        padding: [0, 0, 0, -30],
      },
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatPower(value)[0]} ${utils.formatPower(value)[1]}`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }, {
      nameGap: 40,
      nameTextStyle: {
        color: '#141634',
        fontSize: 10,
        fontWeight: 500,
        padding: [0, 0, 0, -30],
      },
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatPower(value)[0]} ${utils.formatPower(value)[1]}`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
      color: '#3A70FF',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      connectNulls: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    },
    {
      color: '#0DEBCF',
      name: origin.echartTitle[1],
      yAxisIndex: 1,
      data: origin.y2,
      type: 'line',
      smooth: true,
      connectNulls: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          // background: linear-gradient(180deg, rgba(58, 112, 255, 0.08) 0%, rgba(58, 112, 255, 0) 100%);
          colorStops: [{
            offset: 0,
            color: 'rgba(58, 112, 255, 0.08)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(58, 112, 255, 0)' // 100% 处的颜色
          }
          ],
          global: false // 缺省为 false
        }
      }
    }
    ]
  }
}

// 主网信息24h手续费率走势 24h
var optionsForServiceCharge = function (origin) {
  let color = ['#F9BC59', '#0DEBCF', '#E7A2F2']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${rez}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatEasyFil(item.value)}${item.seriesIndex > 0 ? '/TiB' : ''}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      // boundaryGap: false,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        // formatter: function(value) {
        //   return utils.formatDate(new Date(value.replace(/-/g, '/')), 'h:m')
        // }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatEasyFil(value));
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }, {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatEasyFil(value)}/TiB`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
      color: '#F9BC59',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(249, 188, 89, 0.08)'
          },
          {
            offset: 1,
            color: 'rgba(249, 188, 89, 0)'
          }
          ],
          global: false
        }
      }
    }, {
      color: '#0DEBCF',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      yAxisIndex: 1
    }, {
      color: '#E7A2F2',
      name: origin.echartTitle[2],
      data: origin.y3,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      yAxisIndex: 1
    }]
  }
}

// 主网信息 24h基础费率走势 7天 1月 3月
var optionsForBasicRate = function (origin) {
  let color = ['#F9BC59', '#0DEBCF', '#E7A2F2']

  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${rez}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatEasyFil(item.value * Math.pow(10, item.seriesIndex > 0 ? 18 : 0))}${item.seriesIndex > 0 ? '/TiB' : ''}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          return utils.formatDate(new Date(value.replace(/-/g, '/')), 'y-m-d')
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatEasyFil(value));
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }, {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatEasyFil(value * Math.pow(10, 18))}/TiB`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
      color: '#F9BC59',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(249, 188, 89, 0.08)'
          },
          {
            offset: 1,
            color: 'rgba(249, 188, 89, 0)'
          }
          ],
          global: false
        }
      }
    }, {
      color: '#0DEBCF',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      yAxisIndex: 1
    }, {
      color: '#E7A2F2',
      name: origin.echartTitle[2],
      data: origin.y3,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      yAxisIndex: 1
    }]
  }
}

// 主网信息挖矿效率走势
var optionsForEfficiency = function (origin) {
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: #0DEBCF;"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatFil(item.value, true)}${origin.unit}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatFil(value, true)}${origin.unit}`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      // interval: 0.01,
      // max: 0.08,
      axisTick: {
        show: false
      }
    },
    series: [{
      color: '#0DEBCF',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(13, 235, 207, 0.08)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(13, 235, 207, 0)' // 100% 处的颜色
          }
          ],
          global: false // 缺省为 false
        }
      }
    }]
  }
}

// 主网信息币价走势
var optionsForCurrencyTrend = function (origin) {
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: #E7A2F2;"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${item.value} USDT</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '价格',
      nameGap: 40,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          return `${value} USDT`
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: [{
      color: '#E7A2F2',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(231, 162, 242, 0.08)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(231, 162, 242, 0)' // 100% 处的颜色
          }
          ],
          global: false // 缺省为 false
        }
      }
    }]
  }
}

// 主网信息 矿工算力走势
var optionsForMinerPower = function (origin) {
  let color = ['#0DEBCF', '#F9BC59']
  return {
    legend: {
      show: true,
      top: 10,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatPower(item.value, 2)[0]} ${utils.formatPower(item.value, 2)[1]}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatPower(value, 1)[0]} ${utils.formatPower(value, 1)[1]}`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      },
      // minInterval: 0.5 * Math.pow(1024, 5)
    }, {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatPower(value, 1)[0]} ${utils.formatPower(value, 1)[1]}`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      },
      // minInterval: 0.5 * Math.pow(1024, 5)
    }],
    series: [{
      yAxisIndex: 1,
      // name: '算力增量',
      name: origin.echartTitle[0],
      color: '#0DEBCF',
      type: 'bar',
      // barMaxWidth: 10,
      data: origin.y1,
      emphasis: {
        itemStyle: {
          color: '#333FC6'
        }
      }
    },
    {
      yAxisIndex: 0,
      color: '#F9BC59',
      // name: '有效算力',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(249, 188, 89, 0.08)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(249, 188, 89, 0)' // 100% 处的颜色
          }
          ],
          global: false // 缺省为 false
        }
      }
    }
    ]
  }
}

// 矿工账号可用余额
var optionsForMinerBalance = function (origin) {
  let color = ['#0EEACE', '#B19DE6', '#F5D298', '#9CCFFF']
  return {
    color: color,
        tooltip: {
      trigger: 'item',
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function(params) {
        return `
        <div style="display: flex; align-items: center;">
          <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[params.dataIndex]};"></div>
          <div style="margin-right:15px">${params.name}:</div>
          <div style="text-align: right; flex: 1; font-weight: 500;">${ utils.formatTrueFil(params.value, true)}</div>
        </div>`;
      },
      backgroundColor: '#fff',
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        // itemStyle: {
        //   borderRadius: 10,
        //   borderColor: '#fff',
        //   borderWidth: 2
        // },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [{
          value: origin.balance,
          // name: '可用余额',
          name: origin.echartTitle[0],
          markLine: {
            symbol: 'circle'
          }
        },
        {
          value: origin.init_pledge,
          // name: '扇区质押'
          name: origin.echartTitle[1],
        },
        {
          value: origin.locked_pledge_balance,
          // name: '奖励锁仓'
          name: origin.echartTitle[2],
        },
        {
          value: origin.precommit_deposits_balance,
          // name: '预存款'
          name: origin.echartTitle[3],
        }
        ]
      }
    ]
  }
}

// 矿工账户变化
var optionsForMinerAccountChange = function (origin) {
  let color = ['#8AA6F1', '#F5D298', '#E5C7E9', '#6CDADA']
  let data = []
  origin.value.map((item, index) => {
    data.push({
      color: color[item.colorIndex ? item.colorIndex : index % color.length],
      name: item.title,
      data: item.value,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    })
  })

  return {
    legend: {
      show: true,
      top: 10,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
          <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatEasyFil(item.value)}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatEasyFil(value, 0));
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: data
  }
}

// 爆块奖励
var optionsForMinerOutputReward = function (origin) {
  let color = ['#FFCDC6', '#3A70FF']
  return {
    legend: {
      show: true,
      top: 10,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${item.seriesType == 'bar' ? item.value : utils.formatEasyFil(item.value)}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      // boundaryGap: false,

      // axisLabel: {
      //   color: '#a0aec0',
      //   fontSize: 9,
      // },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          if (value.length == 10) {
            return value
          } else {
            return utils.formatDate(new Date(value.replace(/-/g, '/')), 'h:m')
          }
        }
      },

      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      // name: '爆块数量',
      position: 'left',
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }, {
      // name: '爆块奖励',
      position: 'right',
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 10,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatEasyFil(value, 0));
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
      // name: '出块数量',
      name: origin.echartTitle[0],
      color: '#FFCDC6',
      type: 'bar',
      // barMaxWidth: 10,
      yAxisIndex: 0, // 第一个y轴
      data: origin.y1,
      emphasis: {
        itemStyle: {
          color: '#333FC6'
        }
      }
    },
    {
      color: '#3A70FF',
      // name: '出块奖励',
      name: origin.echartTitle[1],
      yAxisIndex: 1,
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }
    ]
  }
}

// 钱包账户变化
var optionsForWalletAccountChange = function (origin) {
  let color = ['#8AA6F1']
  let data = []
  origin.value.map((item, index) => {
    data.push({
      color: color[item.colorIndex ? item.colorIndex : index % color.length],
      name: item.title,
      data: item.value,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    })
  })

  return {
    legend: {
      show: true,
      top: 10,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez.replace(/-/g, '/')), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
          <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatEasyFil(item.value)}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatEasyFil(value));
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: data
  }
}

// FIL综合指数
var optionsForFIlExponent = function (origin) {
  let color = ['#333FC6', '#0DEBCF']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${item.seriesIndex == 1 ? (utils.formatPower(item.value)[0] + ' ' + utils.formatPower(item.value)[1]) : utils.formatterAmount(item.value, 2)}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      // boundaryGap: false,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      // name: '综合指数',
      position: 'left',
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatterAmount(value, 0));
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      },
      // scale: true,
      minInterval: 500
    }, {
      // name: '总算力',
      position: 'right',
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatPower(value)[0]} ${utils.formatPower(value)[1]}`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
      name: origin.echartTitle[0],
      color: '#333FC6',
      yAxisIndex: 0,
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(51, 63, 198, 0.08)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(51, 63, 198, 0)' // 100% 处的颜色
          }
          ],
          global: false // 缺省为 false
        }
      },
      lineStyle: {
        width: 2
      }
    },
    {
      name: origin.echartTitle[1],
      color: '#0DEBCF',
      yAxisIndex: 1,
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle'
    }
    ]
  }
}

// FIL分项维度指数
var optionsFIlExponentDimension = function (origin) {
  let color = ['#F9BC59', '#0DEBCF', '#E7A2F2']
  let data = []
  origin.value.map((item, index) => {
    data.push({
      color: color[item.colorIndex ? item.colorIndex : index % color.length],
      name: item.title,
      data: item.value,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    })
  })

  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatterAmount(item.value, 2)}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      // boundaryGap: false,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatterAmount(value, 2));
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: data
  }
}

// fil全网概览饼图
var optionsForFIlOverview = function (origin) {
  return {
    color: ['#00A0FA', '#FF7951', '#EDCD27', '#B05EFF'],
    tooltip: {
      trigger: 'item',
      textStyle: {
        color: '#141634',
        fontSize: 12
      },
      formatter: function (params) {
        return `
        <div style="display: flex; align-items: center;">
          <div style="margin-right:15px">${params.name}:</div>
          <div style="text-align: right; flex: 1;">${utils.formatFil(params.value, true)}</div>
        </div>`;
      },
      backgroundColor: '#fff',
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    legend: {
      show: false,
    },
    series: [{
      type: 'pie',
      radius: ['30%', '60%'],
      center: ['50%', '60%'],
      label: {
        alignTo: 'labelLine',
        show: true,
        fontSize: 16,
        color: '#848599',
        formatter: '{name|{b}}',
        rich: {
          fil: {
            fontSize: 18,
            color: '#141634'
          }
        }
      },
      labelLine: {
        length: 20,
        length2: 40,
      },
      // markLine: {
      //   symbol: 'circle',
      //   symbolSize: 8
      // },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      data: origin.data
    }],
  }
}

// 扇区质押
var optionsForSectorPledge = function (data) {
  let color = ['#ff00ff', '#F9BC59']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 10,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${rez}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${data.color};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatterAmount(item.value[1], 4)} ${data.sunUnit}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      nameGap: 40,
      nameTextStyle: {
        color: '#141634',
        fontSize: 9,
        fontWeight: 500,
        padding: [0, 0, 0, -30],
      },
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${value} ${data.unit}`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }, {
      nameGap: 40,
      nameTextStyle: {
        color: '#141634',
        fontSize: 10,
        fontWeight: 500,
        padding: [0, 0, 0, -30],
      },
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatterAmount(value, 0)} F`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
      color: data.color,
      name: data.echartTitle[0],
      data: data.y1,
      type: 'line',
      smooth: true,
      connectNulls: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      // areaStyle: {
      //   color: {
      //     type: 'linear',
      //     x: 0,
      //     y: 0,
      //     x2: 0,
      //     y2: 1,
      //     colorStops: [{
      //       offset: 0,
      //       color: 'rgba(255, 0, 255, 0.08)' // 0% 处的颜色
      //     },
      //     {
      //       offset: 1,
      //       color: 'rgba(255, 0, 255, 0)' // 100% 处的颜色
      //     }
      //     ],
      //     global: false // 缺省为 false
      //   }
      // }
    }, {
      color: color[1],
      name: data.echartTitle[1],
      data: data.y2,
      type: 'line',
      smooth: true,
      connectNulls: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      yAxisIndex: 1
    }]
  }
}

// 通缩
var optionsForFILCirculation = function (data) {
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 10,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: #03a89e;"></div>
            <div style="margin-right:15px">${data.echartTitle[0]}÷${data.echartTitle[1]}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatterAmount(item.value[1])} TiB/F</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      nameGap: 40,
      nameTextStyle: {
        color: '#141634',
        fontSize: 10,
        fontWeight: 500,
        padding: [0, 0, 0, -30],
      },
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (v) {
          let t = [];
          t.push(`${utils.formatterAmount(v, 4)} TiB/F`);
          return t;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      },
    },
    series: {
      color: '#03a89e',
      name: `${data.echartTitle[0]} (${data.power}) ÷ ${data.echartTitle[1]} (${data.circulation}) = ${utils.formatterAmount(data.result, 4)} TiB/F`,
      data: data.y1,
      type: 'line',
      smooth: true,
      connectNulls: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(3, 168, 158, 0.08)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(3, 168, 158, 0)' // 100% 处的颜色
          }
          ],
          global: false // 缺省为 false
        }
      }
    }
  }
}

// 节点gas消耗
var optionsForGasConsumption = function (origin) {
  let color = ['#3A70FF', '#0DEBCF']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 10,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${item.value} F/TiB</div>
          </div>`;
          rez += strItem;
        });
        // console.log('提示文本',rez);
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      // boundaryGap: false,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      nameGap: 40,
      nameTextStyle: {
        color: '#141634',
        fontSize: 10,
        fontWeight: 500,
        padding: [0, 0, 0, -30],
      },
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${value} F/TiB`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }, {
      nameGap: 40,
      nameTextStyle: {
        color: '#141634',
        fontSize: 10,
        fontWeight: 500,
        padding: [0, 0, 0, -30],
      },
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${value} F/TiB`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
      color: '#3A70FF',
      name: origin.echartTitle[0],
      // name: '当前节点',
      data: origin.y1,
      type: 'line',
      smooth: true,
      connectNulls: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    },
    {
      color: '#0DEBCF',
      name: origin.echartTitle[1],
      // name: '全网均值',
      yAxisIndex: 1,
      data: origin.y2,
      type: 'line',
      smooth: true,
      connectNulls: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          // background: linear-gradient(180deg, rgba(58, 112, 255, 0.08) 0%, rgba(58, 112, 255, 0) 100%);
          colorStops: [{
            offset: 0,
            color: 'rgba(58, 112, 255, 0.08)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(58, 112, 255, 0)' // 100% 处的颜色
          }
          ],
          global: false // 缺省为 false
        }
      }
    }
    ]
  }
}

// 收益分析
var revenueAnalysisEchart = function (origin) {
  let color = ['#3A70FF', '#57CD06']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatFil(item.value, true)}/TiB</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        // showMinLabel:false,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatFil(value, true)}/TiB`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      scale: true,
      // interval: 0.025,
      // max: 0.15,
      axisTick: {
        show: false
      }
    },
    series: [{
      color: '#3A70FF',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }, {
      color: '#57CD06',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }]
  }
}

// 成本分析
var costechart = function (origin) {
  let color = ['#F4BF75', '#3A70FF']
  if (!origin.y2) {
    origin.echartTitle = [origin.echartTitle[0]]
  }
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${item.value} ${origin.val}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${value} ${origin.val}`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      scale: true,
      axisTick: {
        show: false
      }
    },
    series: [{
      color: '#F4BF75',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: origin.type,
      barWidth: '20',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }, {
      color: '#3A70FF',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: origin.type,
      barWidth: '20',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }]
  }
}

// 成本分析 ==>维护gas s生产gas
var costechart_gas = function (origin) {
  let color = ['#F4BF75', '#3A70FF']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatNewEasyFil(item.value)[0]} ${utils.formatNewEasyFil(item.value)[1]}/TiB</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatTrueFil(value, true)}/TiB`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      scale: true,
      // interval: 0.025,
      // max: 0.15,
      axisTick: {
        show: false
      }
    },
    series: [{
      color: '#F4BF75',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }, {
      color: '#3A70FF',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }]
  }
}

// 爆快分析echarts
var explosiveBlockEchart = function (origin) {
  let color = ['#3A70FF', '#0DEBCF']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${item.value} %</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${value} %`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      scale: true,
      axisTick: {
        show: false
      }
    },
    series: [{
      color: '#3A70FF',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }, {
      color: '#0DEBCF',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }]
  }
}

// pro钱包
var walletEcharts = function (origin) {
  let color = ['#03A89F', '#8C53FF']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatFil(item.value, true)}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${utils.formatFil(value, true)}`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      scale: true,
      // interval: 0.025,
      // max: 0.15,
      axisTick: {
        show: false
      }
    },
    series: [{
      color: '#03A89F',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }, {
      color: '#8C53FF',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }]
  }
}

// 节点对比产出效率趋势
var outputEfficiencyEchart = function (origin) {
  let color = ['#F4BF75', '#3A70FF', '#03A89F']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${item.value} F/TiB</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      // name:'FiL/TiB',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${value} F/TiB`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      scale: true,
      // interval: 0.025,
      // max: 0.15,
      axisTick: {
        show: false
      }
    },
    series: [{
      color: '#F4BF75',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }, {
      color: '#3A70FF',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }, {
      color: '#03A89F',
      name: origin.echartTitle[2],
      data: origin.y3,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }]
  }
}

// 节点对比幸运值趋势
var luckyTrendEchart = function (origin) {
  let color = ['#F4BF75', '#3A70FF', '#03A89F']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${item.value} %</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(`${value} %`);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      scale: true,
      axisTick: {
        show: false
      }
    },
    series: [{
      color: '#F4BF75',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }, {
      color: '#3A70FF',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }, {
      color: '#03A89F',
      name: origin.echartTitle[2],
      data: origin.y3,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      }
    }]
  }
}

// 统计全网算力趋势
var overviewPowerTrendsEchart = function (origin) {
  let color = ['#3A6FFF', '#F9BC59','#0EEBCF',  '#E7A2F2']
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${rez}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatPower(item.value,4)[0]} ${utils.formatPower(item.value,4)[1]}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      // boundaryGap: false,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        // formatter: function(value) {
        //   return utils.formatDate(new Date(value.replace(/-/g, '/')), 'h:m')
        // }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatPower(value)[0]+' '+utils.formatPower(value)[1]);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      },
      minInterval: 2 * Math.pow(1024, 6),
      maxInterval: 2 * Math.pow(1024, 6)
    }, {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatPower(value)[0]+' '+utils.formatPower(value)[1]);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      },
      scale:false,
      // minInterval: 20 * Math.pow(1024, 5),
      // maxInterval: 20 * Math.pow(1024, 5)
    }],
    series: [{
      color: '#3A6FFF',
      name: origin.echartTitle[0],
      data: origin.y1,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(249, 188, 89, 0.08)'
          },
          {
            offset: 1,
            color: 'rgba(249, 188, 89, 0)'
          }
          ],
          global: false
        }
      }
    }, {
      color: '#F9BC59',
      name: origin.echartTitle[1],
      data: origin.y2,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      yAxisIndex: 1
    }, {
      color: '#0EEBCF',
      name: origin.echartTitle[2],
      data: origin.y3,
      type: 'bar',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      yAxisIndex: 1
    }, {
      color: '#E7A2F2',
      name: origin.echartTitle[3],
      data: origin.y4,
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      yAxisIndex: 1
    }]
  }
}

// DataCap总量
var DCtotal = function (origin) {
  let color = origin.color
  return {
    color: color,
        tooltip: {
      trigger: 'item',
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function(params) {
        return `
        <div style="display: flex; align-items: center;">
          <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[params.dataIndex]};"></div>
          <div style="margin-right:15px">${params.name}:</div>
          <div style="text-align: right; flex: 1; font-weight: 500;">${ utils.formatPower(params.value)[0]} ${ utils.formatPower(params.value)[1]}</div>
        </div>`;
      },
      backgroundColor: '#fff',
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        // itemStyle: {
        //   borderRadius: 10,
        //   borderColor: '#fff',
        //   borderWidth: 2
        // },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [{
            value: origin.balance,
            // name: '已分配',
            name: origin.echartTitle[0],
            markLine: {
              symbol: 'circle'
            }
          },
          {
            value: origin.init_pledge,
            // name: '未分配'
            name: origin.echartTitle[1],
          }
        ]
      }
    ]
  }
}

// DataCap分布
var DCdistribution = function (origin) {
  let color = origin.color
  return {
    color: color,
        tooltip: {
      trigger: 'item',
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function(params) {
        return `
        <div style="display: flex; align-items: center;">
          <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[params.dataIndex]};"></div>
          <div style="margin-right:15px">${params.name}:</div>
          <div style="text-align: right; flex: 1; font-weight: 500;">${ utils.formatPower(params.value)[0]} ${ utils.formatPower(params.value)[1]}</div>
        </div>`;
      },
      backgroundColor: '#fff',
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        // itemStyle: {
        //   borderRadius: 10,
        //   borderColor: '#fff',
        //   borderWidth: 2
        // },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [{
            value: origin.Gcr,
            name: origin.echartTitle[0],
            markLine: {
              symbol: 'circle'
            }
          },
          {
            value: origin.Na,
            name: origin.echartTitle[1],
          },
          {
            value: origin.Europe,
            name: origin.echartTitle[2],
          },
          {
            value: origin.Asia,
            name: origin.echartTitle[3],
          },
          {
            value: origin.Oceania,
            name: origin.echartTitle[4],
          }
        ]
      }
    ]
  }
}

// DataCap统计
var DCbrisk = function (origin) {
  let color = ['#94EFEB', '#3A70FF']
  return {
    legend: {
      show: true,
      top: 10,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${rez}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${item.value}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          // if (value.length == 10) {
            return value
          // } else {
          //   return utils.formatDate(new Date(value.replace(/-/g, '/')), 'h:m')
          // }
        }
      },

      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      // name: '爆块数量',
      position: 'left',
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }, {
      // name: '爆块奖励',
      position: 'right',
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 10,
        formatter: function (value) {
          let texts = [];
          // texts.push(utils.formatEasyFil(value, 0));
          texts.push(value);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
        name: origin.echartTitle[0],
        color: '#94EFEB',
        type: 'bar',
        barMaxWidth: 18,
        yAxisIndex: 0, // 第一个y轴
        data: origin.y1,
        emphasis: {
          itemStyle: {
            color: '#333FC6'
          }
        },
      },
      {
        color: '#3A70FF',
        name: origin.echartTitle[1],
        yAxisIndex: 1,
        data: origin.y2,
        type: 'line',
        smooth: true,
        symbol: 'emptyCircle',
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(58, 112, 255, 0.12)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(58, 112, 255, 0)' // 100% 处的颜色
            }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  }
}


// DataCap
var DCrecord = function (origin) {
  let color = ['#94EFEB', '#3A70FF']
  return {
    legend: {
      show: true,
      top: 10,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${rez}</div>
          `
        }
        params.map && params.map(item => {
          // let strItem = `
          // <div style="display: flex; align-items: center;">
          //   <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
          //   <div style="margin-right:15px">${item.seriesName}:</div>
          //   <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatPower(item.value)[0]} ${utils.formatPower(item.value)[1]}</div>
          // </div>`;
          if(item.seriesType == 'line'){
            let strItem = `
            <div style="display: flex; align-items: center;">
              <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
              <div style="margin-right:15px">${item.seriesName}:</div>
              <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatPower(item.value)[0]} ${utils.formatPower(item.value)[1]}</div>
            </div>`;
            rez += strItem;
          }else{
            let strItem = `
            <div style="display: flex; align-items: center;">
              <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
              <div style="margin-right:15px">${item.seriesName}:</div>
              <div style="text-align: right; flex: 1; font-weight: 500;">${item.value}</div>
            </div>`;
            rez += strItem;
          }
          // rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          // if (value.length == 10) {
            return value
          // } else {
          //   return utils.formatDate(new Date(value.replace(/-/g, '/')), 'h:m')
          // }
        }
      },

      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      position: 'left',
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }, {
      position: 'right',
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 10,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatPower(value)[0]+utils.formatPower(value)[1]);
          // texts.push(value);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
        name: origin.echartTitle[0],
        color: '#94EFEB',
        type: 'bar',
        barMaxWidth: 18,
        yAxisIndex: 0, // 第一个y轴
        data: origin.y1,
        emphasis: {
          itemStyle: {
            color: '#333FC6'
          }
        },
      },
      {
        color: '#3A70FF',
        name: origin.echartTitle[1],
        yAxisIndex: 1,
        data: origin.y2,
        type: 'line',
        smooth: true,
        symbol: 'emptyCircle',
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(58, 112, 255, 0.12)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(58, 112, 255, 0)' // 100% 处的颜色
            }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  }
}

// DC发单成本
var DCinvoice = function (origin) {
  let color = ['#A5E5FF','#FF903D']
  return {
    legend: {
      show: true,
      top: 10,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${rez}</div>
          `
        }
        params.map && params.map(item => {
          // let strItem = `
          // <div style="display: flex; align-items: center;">
          //   <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
          //   <div style="margin-right:15px">${item.seriesName}:</div>
          //   <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatPower(item.value)[0]} ${utils.formatPower(item.value)[1]}</div>
          // </div>`;
          if(item.seriesType == 'line'){
            let strItem = `
            <div style="display: flex; align-items: center;">
              <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
              <div style="margin-right:15px">${item.seriesName}:</div>
              <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatEasyFil(item.value)}/TIB</div>
            </div>`;
            rez += strItem;
          }else{
            let strItem = `
            <div style="display: flex; align-items: center;">
              <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${color[item.seriesIndex]};"></div>
              <div style="margin-right:15px">${item.seriesName}:</div>
              <div style="text-align: right; flex: 1; font-weight: 500;">${utils.formatEasyFil(item.value)}/TIB</div>
            </div>`;
            rez += strItem;
          }
          // rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          // if (value.length == 10) {
            return value
          // } else {
          //   return utils.formatDate(new Date(value.replace(/-/g, '/')), 'h:m')
          // }
        }
      },

      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      position: 'left',
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatEasyFil(value,1)+'/TiB');
          // texts.push(value);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }, {
      position: 'right',
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#a0aec0',
        fontSize: 10,
        formatter: function (value) {
          let texts = [];
          texts.push(utils.formatEasyFil(value,0));
          // texts.push(value);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
        name: origin.echartTitle[0],
        color: '#A5E5FF',
        type: 'bar',
        barMaxWidth: 18,
        yAxisIndex: 0, // 第一个y轴
        data: origin.y1,
        emphasis: {
          itemStyle: {
            color: '#333FC6'
          }
        },
      },
      {
        color: '#FF903D',
        name: origin.echartTitle[1],
        yAxisIndex: 1,
        data: origin.y2,
        type: 'line',
        smooth: true,
        symbol: 'emptyCircle',
        lineStyle: {
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(255, 144, 61, 0.12)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(58, 112, 255, 0)' // 100% 处的颜色
            }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  }
}

// 生态分析
var ecologicalStatisticsOrder = function (origin) {
  return {
    legend: {
      show: true,
      top: 8,
      center: 0,
      itemGap: 30,
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 10,
      textStyle: {
        color: '#a0aec0',
        fontSize: 9,
        fontWeight: 500
      },
      selectedMode: false
    },
    grid: {
      left: 5,
      top: 35,
      right: 5,
      bottom: 8,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        show: true,
        type: 'line',
        label: {
          show: false
        },
        lineStyle: {
          color: '#06011A',
          type: 'dotted'
        }
      },
      backgroundColor: '#fff',
      padding: [15, 10],
      textStyle: {
        color: '#141634',
        fontSize: 10
      },
      formatter: function (params) {
        let rez = params[0] ? params[0].name : '';
        if (rez) {
          rez = `
          <div>${utils.formatDate(new Date(rez), 'y-m-d')}</div>
          `
        }
        params.map && params.map(item => {
          let strItem = `
          <div style="display: flex; align-items: center;">
            <div style="height: 10px; width: 4px; margin-right: 4px; background-color: ${origin.color[item.seriesIndex]}"></div>
            <div style="margin-right:15px">${item.seriesName}:</div>
            <div style="text-align: right; flex: 1; font-weight: 500;">${item.value} ${origin.unit}</div>
          </div>`;
          rez += strItem;
        });
        return rez;
      },
      extraCssText: 'box-shadow: 0px 10px 26px 0px rgba(20, 22, 52, 0.05);border-radius: 6px;opacity: 0.92;'
    },
    xAxis: {
      type: 'category',
      data: origin.date,
      nameGap: 10,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#edf2f7',
          type: 'dashed'
        }
      },
      nameGap: 6,
      axisLabel: {
        color: '#a0aec0',
        fontSize: 9,
        formatter: function (value) {
          let texts = [];
          texts.push(value+origin.unit);
          return texts;
        }
      },
      axisLine: {
        lineStyle: {
          color: '#edecef'
        }
      },
      // interval: 0.01,
      // max: 0.08,
      axisTick: {
        show: false
      }
    },
    series: [{
      color: origin.color[0],
      name: origin.echartTitle[0],
      data: origin.y1,
      type: origin.type,
      smooth: true,
      symbol: 'emptyCircle',
      lineStyle: {
        width: 2
      },
      stack: 'one',
    },{
      color: origin.color[1],
      name: origin.echartTitle[1],
      type: origin.type,
      stack: 'one',
      data: origin.y2
    }]
  }
}




export default {
  optionsForMinerIndexTrend,
  optionsForDimensionality,
  optionsForDataAllPower,
  optionsForServiceCharge,
  optionsForEfficiency,
  optionsForCurrencyTrend,
  optionsForBasicRate,
  optionsForMinerPower,
  optionsForMinerBalance,
  optionsForMinerAccountChange,
  optionsForWalletAccountChange,
  optionsForMinerOutputReward,
  optionsForFIlExponent,
  optionsFIlExponentDimension,
  optionsForFIlOverview,
  optionsForSectorPledge,
  optionsForFILCirculation,
  optionsForGasConsumption,
  revenueAnalysisEchart,
  explosiveBlockEchart,
  walletEcharts,
  costechart,
  costechart_gas,
  outputEfficiencyEchart,
  luckyTrendEchart,
  overviewPowerTrendsEchart,
  DCtotal,
  DCdistribution,
  DCbrisk,
  DCrecord,
  DCinvoice,
  ecologicalStatisticsOrder,
}