import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
};

interface ChartProps {
  coinId: string;
};

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
          <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => [new Date(price.time_open).getTime(), price.open.toFixed(3), price.high.toFixed(3), price.low.toFixed(3), price.close.toFixed(3)]) as any
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              toolbar: {
                show:false,
              },
              background: "transparent",
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
              
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#40b9ff',
                  downward: '#ff6eec'
                }
              }
            },
            
          }}
        />
        // <ApexChart
        //   type="line"
        //   series={[
        //     {
        //       name: "Price",
        //       data: data?.map((price => price.close)) ?? [],
        //     },
        //   ]}
        //   options={{
        //     theme: {
        //       mode: isDark ? "dark" : "light",
        //     },
        //     chart: {
        //       height: 300,
        //       width: 500,
        //       toolbar: {
        //         show: false,
        //       },
        //       background: "transparent",
        //     },
        //     grid: { show: false },
        //     stroke: {
        //       curve: "smooth",
        //       width: 4,
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     xaxis: {
        //       axisBorder: { show: false },
        //       axisTicks: { show: false },
        //       labels: { show: false },
        //       type: "datetime",
        //       categories: data?.map((price) => price.time_close),
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: { gradientToColors: ["#ff6eec"], stops: [0, 100] },
        //     },
        //     colors: ["#40b9ff"],
        //     tooltip: {
        //       y: {
        //         formatter: (value) => `$${value.toFixed(2)}`,
        //       },
        //     },
        //   }}
        // />
      )}
    </div>
  );
}

export default Chart;