import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

interface LineBarProps {
  dates: string[];
  cumulative: number[];
  daily: number[];
}

export default function LineBarChart({
  dates,
  cumulative,
  daily,
}: LineBarProps) {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#2A2A2F',
      borderWidth: 2,
      borderColor: '#323237',
      textStyle: {
        color: '#A2A2A6',
      },
      axisPointer: {
        lineStyle: {
          color: '#A2A2A6',
        },
      },
    },
    legend: {
      bottom: '0%',
      textStyle: {
        color: '#A2A2A6',
      },
      inactiveColor: '#A2A2A6',
      icon: 'roundRect',
      itemGap: 20,
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '12%',
      top: '2%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: dates,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#323237',
          },
        },
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    series: [
      {
        name: 'Daily',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: any) {
            return value as number;
          },
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#673AB7' },
            { offset: 1, color: '#512DA8' },
          ]),
          borderRadius: [2, 2, 0, 0],
        },
        data: daily,
      },
      {
        name: 'Cumulative',
        type: 'line',
        showSymbol: false,
        smooth: true,
        yAxisIndex: 1,
        itemStyle: {
          color: '#cdadef',
        },
        tooltip: {
          valueFormatter: function (value: any) {
            return value as number;
          },
        },
        data: cumulative,
      },
    ],
  };
  return (
    <div>
      <ReactECharts option={option} />
    </div>
  );
}
