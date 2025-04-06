<template>
  <div ref="gaugeChart" class="chart_wrapper"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "GaugeChart",
  props: {
    value: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "accepted", // Can be 'accepted', 'rejected', etc.
    },
  },
  mounted() {
    this.initChart();
  },

  methods: {
    getColorByStatus() {
      switch (this.status) {
        case "accepted":
          return "#4caf50"; // Green color for accepted
        case "rejected":
          return "#f44336"; // Red color for rejected
        case "pending":
          return "#ffc107"; // Yellow color for pending
        default:
          return "#9e9e9e"; // Grey for other statuses
      }
    },
    initChart() {
      const chart = echarts.init(this.$refs.gaugeChart);
      const valueColor = this.getColorByStatus();
      const valuePercentage = this.value / this.total; // Calculate the accepted percentage

      const option = {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            radius: "90%",
            center: ["50%", "70%"],
            axisLine: {
              lineStyle: {
                width: 22,
                color: [
                  [valuePercentage, valueColor], // Accepted part in color
                  [1, "#ccc"], // The remaining part in gray
                ],
              },
              animation: true,
              animationDuration: 1000, // Duration of the animation (2 seconds)
              animationEasing: "cubicOut",
            },
            pointer: {
              show: true,
              length: "40%", // Length of the pointer relative to the radius
              width: 5, // Width of the pointer
              color: valueColor, // Color of the pointer based on the status
            },
            axisTick: { show: false }, // Hide tick marks
            splitLine: { show: false }, // Hide split lines
            axisLabel: { show: false }, // Hide axis labels
            detail: {
              valueAnimation: true,
              formatter: "{value}", // Shows the value number
              color: valueColor, // Color the value number based on status
              fontSize: 20,
              offsetCenter: [0, "-45%"], // Position of the value number
            },
            data: [
              {
                value: this.value,
              },
            ],
            max: this.total,
          },
        ],
      };

      chart.setOption(option);
    },
  },
  watch: {
    value() {
      this.initChart(); // Re-init chart when value changes
    },
  },
};
</script>

<style scoped>
.chart_wrapper {
  width: 100%;
  height: 200px;
}

.chart_wrapper div {
  margin: auto;
}
</style>
