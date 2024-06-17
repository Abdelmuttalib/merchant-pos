/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  Chart as ChartJS,
  Filler, // 1. Import Filler plugin
} from "chart.js";
import { Triangle } from "lucide-react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

ChartJS.register(
  Filler, // 1. Register Filler plugin
);

const generateRandomArray = (length: number, max: number): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * max) + 1);
};

interface TailwindChartProps {
  className?: string;
}

const TailwindChart = ({ className }: TailwindChartProps) => {
  const [chartData] = useState({
    date: "today",
    options: [
      { label: "Today", value: "today" },
      { label: "Last 7 Days", value: "7days" },
      { label: "Last 30 Days", value: "30days" },
      { label: "Last 6 Months", value: "6months" },
      { label: "This Year", value: "year" },
    ],
    showDropdown: false,
    selectedOption: 0,

    // generate relevant POS data
    data: {
      today: {
        labels: [
          "12am",
          "3am",
          "6am",
          "9am",
          "12pm",
          "3pm",
          "6pm",
          "9pm",
          "12am",
        ],
        data: {
          sales: generateRandomArray(9, 50),
          revenue: [200,250, 300, 350, 450, 500, 550, 650, 700]
        //   revenue: generateRandomArray(990, 1000),
        },
      },
      "7days": {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"],
        data: {
          sales: [20, 35, 45, 30, 50, 70, 65, 40],
          revenue: [200, 350, 450, 300, 500, 700, 650, 400],
        },
      },
      "30days": {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
        data: {
          sales: [120, 200, 150, 250, 300, 220],
          revenue: [1200, 2000, 1500, 2500, 3000, 2200],
        },
      },
      "6months": {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        data: {
          sales: [600, 800, 700, 900, 1000, 850],
          revenue: [6000, 8000, 7000, 9000, 10000, 8500],
        },
      },
      year: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        data: {
          sales: [3600, 4000, 4200, 4500, 4800, 5000],
          revenue: [36000, 40000, 42000, 45000, 48000, 50000],
        },
      },
    },
  });

  const chartD = {
    labels: chartData.data[chartData.date].labels,
    datasets: [
      {
        label: "Sales Volume",
        backgroundColor: "rgba(102, 126, 234, 0.25)",
        borderColor: "rgba(102, 126, 234, 1)",
        pointBackgroundColor: "rgba(102, 126, 234, 1)",
        data: chartData.data[chartData.date].data.revenue,
        fill: {
          target: "origin", // 3. Set the fill options
          above: "rgba(102, 126, 234, 0.25)",
        },
      },
      {
        label: "Revenue",
        backgroundColor: "rgba(237, 100, 166, 0.25)",
        borderColor: "rgba(237, 100, 166, 1)",
        pointBackgroundColor: "rgba(237, 100, 166, 1)",
        data: chartData.data[chartData.date].data.sales,
        fill: {
          target: "origin", // 3. Set the fill options
          above: "rgba(237, 100, 166, 0.25)",
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    tension: 0.3,
    layout: {
      padding: {
        right: 10,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value: number) {
            return value > 1000
              ? value < 1000000
                ? value / 1000 + "K"
                : value / 1000000 + "M"
              : value;
          },
          maxTicksLimit: 3,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      className={cn(
        "w-full rounded bg-layer px-5 py-5 text-foreground",
        className,
      )}
    >
      <div className="flex w-full justify-between">
        <div>
          <div className="flex flex-wrap">
            <div className="flex-1">
              <Typography
                as="h2"
                variant="lg/medium"
                className="text-foreground"
              >
                Sales
              </Typography>
            </div>
          </div>
          {/* <div className="flex flex-wrap items-end gap-x-1">
            <Typography as="h3" variant="lg/medium" className="inline-block">
              $10,000
            </Typography>
            <div className="inline-flex items-end gap-x-1">
              <Triangle className="fill-success text-success w-3" />
              <Typography
                as="p"
                variant="base/semibold"
                className="text-success"
              >
                5%
              </Typography>
            </div>
          </div> */}
        </div>
      </div>
      <div className="mt-5">
        <Line data={chartD} options={chartOptions} />
      </div>
    </div>
  );
};

export default TailwindChart;
