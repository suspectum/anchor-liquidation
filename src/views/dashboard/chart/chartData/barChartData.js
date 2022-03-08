//================================|| DASHBOARD - BAR CHART DATA ||================================//

export const barChartData = {
  // TODO check this height
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      animations: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: 'Roboto',
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
    fill: {
      type: 'solid',
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
  },
  series: [],
};
