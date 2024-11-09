import { useMemo } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DinseyCharacter } from "../services/types";
import ExportXlsx from "./ExportXlsx";

interface ChartProps {
  disneyCharacters: DinseyCharacter[];
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
  const filteresChartData: ChartData[] = useMemo(
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
              data: filteresChartData,
            },
          ],
          tooltip: {
            formatter: function () {
              return `<strong>${this.percentage.toFixed(2)}%</strong><br/> Films: ${filteresChartData[this.point.index].films.join(", ")}`;
            } as Highcharts.TooltipFormatterCallbackFunction,
            shared: true,
          },
        }}
      />
      <ExportXlsx data={filteresChartData} />
    </>
  );
}
