import { useState } from "react";
import logoUrl from "./assets/logo.png";
import Logo from "./components/Logo";
import { useGetDisneyCharactersQuery } from "./services/disneyCharacters";
import { DinseyCharacter, Nullable } from "./services/types";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [selectedDisneyCharacter, setSelectedDisneyCharacter] =
    useState<Nullable<DinseyCharacter>>(null);
  const { data, error, isFetching } = useGetDisneyCharactersQuery({
    page: currentPage,
    pageSize,
  });

  console.log(data, error, isFetching);

  return (
    <>
      <Logo url={logoUrl} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>TV Shows</th>
            <th>Video Games</th>
            <th>Allies</th>
            <th>Enemies</th>
          </tr>
        </thead>
        <tbody>
          {isFetching && (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
          {!isFetching &&
            data?.data?.map((disneyCharacter: DinseyCharacter) => (
              <tr
                key={disneyCharacter._id}
                onClick={() => setSelectedDisneyCharacter(disneyCharacter)}
              >
                <td>{disneyCharacter.name}</td>
                <td>{disneyCharacter.tvShows?.length}</td>
                <td>{disneyCharacter.videoGames?.length}</td>
                <td>{disneyCharacter.allies?.join(", ")}</td>
                <td>{disneyCharacter.enemies?.join(", ")}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {!isFetching && data && (
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            title: {
              text: "Disney Characters",
            },
            chart: {
              type: "pie",
            },
            series: [
              {
                name: "Film Percentage",
                data: data?.data
                  ?.filter((disneyCharacter) => disneyCharacter.films?.length)
                  .map((disneyCharacter) => ({
                    name: disneyCharacter.name,
                    y: disneyCharacter.films?.length,
                    list: disneyCharacter.films,
                  })),
              },
            ],
            tooltip: {
              formatter: () => {
                return "";
              },
            },
          }}
        />
      )}

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((page) => page - 1)}
      >
        Previous page
      </button>
      <button
        disabled={currentPage === data?.info?.totalPages}
        onClick={() => setCurrentPage((page) => page + 1)}
      >
        Next page
      </button>

      <select
        defaultValue={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="500">500</option>
      </select>

      {selectedDisneyCharacter && (
        <dialog open={true}>
          <h2>{selectedDisneyCharacter.name}</h2>
          <img src={selectedDisneyCharacter.imageUrl} alt="" />
          <p>TV Shows: {selectedDisneyCharacter.tvShows?.join(", ")}</p>
          <p>Video Games: {selectedDisneyCharacter.videoGames?.join(", ")}</p>
          <button onClick={() => setSelectedDisneyCharacter(null)}>
            Close
          </button>
        </dialog>
      )}
    </>
  );
}

export default App;
