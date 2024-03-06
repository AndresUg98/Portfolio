const ctx = document.getElementById("myChart").getContext("2d");

const backgroundBar = {
  id: "backgroundBar",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;
    ctx.save();
    const barPercentage = data.datasets[0].barPercentage;
    const categoryPercentage = data.datasets[0].categoryPercentage;
    const barThinckness =
      (height / data.labels.length) * barPercentage * categoryPercentage;

    ctx.fillStyle = "#EEEEEE";
    data.labels.forEach((bar, index) => {
      ctx.fillRect(
        left,
        y.getPixelForValue(index) - barThinckness / 2,
        width,
        barThinckness
      );
    });
    ctx.restore();
  },
};

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["REACT", "FIGMA", "GIT", "CSS", "HTML", "JS"],
    datasets: [
      {
        data: [70, 80, 70, 80, 100, 90],
        backgroundColor: [
          "rgba(54, 162, 235)",
          "rgba(255, 26, 104)",
          "rgba(39, 245, 72, 0.8)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 206, 86)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 26, 104, 1)",
          "rgba(39, 245, 72, 0.8)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(0, 0, 0, 1)",
        ],
        borderWidth: 1,
        barPercentage: 0.5,
        categoryPercentage: 1.2,
      },
    ],
  },
  options: {
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: { color: false },
      },
      x: {
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
        grid: {
          color: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
  plugins: [backgroundBar],
});
