import { useMemo } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DisneyCharacter } from "../services/types";
import ExportXlsx from "./ExportXlsx";

interface ChartProps {
  disneyCharacters: DisneyCharacter[];
}

interface ChartData {
  name: string;
  y: number;
  films: string[];
}

/**
 * Chart component to display Disney characters' film percentages in a pie chart.
 */
export default function Chart({ disneyCharacters }: ChartProps) {
  const filteredChartData: ChartData[] = useMemo(
    () =>
      disneyCharacters
        .filter((disneyCharacter) => disneyCharacter.films?.length)
        .map((disneyCharacter) => ({
          name: disneyCharacter.name,
          y: disneyCharacter.films?.length ?? 0,
          films: disneyCharacter?.films ?? [],
        })),
    [disneyCharacters],
  );

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: "Disney Characters film percentage",
          },
          chart: {
            type: "pie",
            backgroundColor: "transparent",
          },
          series: [
            {
              name: "Film Percentage",
              data: filteredChartData,
            },
          ],
          tooltip: {
            formatter: function () {
              return `<strong>${this.point.name}: ${this.percentage.toFixed(2)}%</strong><br/> Films: ${filteredChartData[this.point.index].films.join(", ")}`;
            } as Highcharts.TooltipFormatterCallbackFunction,
            shared: true,
          },
        }}
      />
      <ExportXlsx data={filteredChartData} />
    </>
  );
}
