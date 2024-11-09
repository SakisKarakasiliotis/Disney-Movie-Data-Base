import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./App.css";

import { useState } from "react";
import { useGetDisneyCharactersQuery } from "./services/disneyCharacters";
import { DinseyCharacter, Nullable } from "./services/types";

import logoUrl from "./assets/logo.png";

import Logo from "./components/Logo";
import ExportXlsx from "./components/ExportXlsx";
import Tabs from "./components/Tabs";
import Header from "./components/Header";
import Search from "./components/Search";
import Table from "./components/Table";
import Dialog from "./components/Dialog";
import Pagination from "./components/Pagination";

function App() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [selectedDisneyCharacter, setSelectedDisneyCharacter] =
    useState<Nullable<DinseyCharacter>>(null);

  const [search, setSearch] = useState<{ value: string; type: string }>({
    value: "",
    type: "",
  });

  const { data, error, isFetching } = useGetDisneyCharactersQuery({
    page,
    pageSize,
    ...(search.value && { [search.type]: search.value }),
  });

  const handleSearch = ({ value, type }: { value: string; type: string }) => {
    setSearch({ value, type });
    setPage(1);
  };

  console.log(data, error, isFetching);

  return (
    <>
      <Header>
        <Logo url={logoUrl} />
        <Search onSearch={handleSearch} isFetching={isFetching} />
      </Header>
      <Tabs defaultIndex={0} labels={["Table", "Chart"]}>
        <>
          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalPages={data?.info?.totalPages ?? 0}
          />

          <Table
            disneyCharacters={data?.data ?? []}
            isFetching={isFetching}
            setSelectedDisneyCharacter={setSelectedDisneyCharacter}
          />

          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalPages={data?.info?.totalPages ?? 0}
          />

          {selectedDisneyCharacter && (
            <Dialog
              disneyCharacter={selectedDisneyCharacter}
              setSelectedDisneyCharacter={setSelectedDisneyCharacter}
            />
          )}
        </>
        <>
          {!isFetching && data && (
            <>
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
                        ?.filter(
                          (disneyCharacter) => disneyCharacter.films?.length,
                        )
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
              <ExportXlsx
                data={
                  data?.data?.filter(
                    (disneyCharacter) => disneyCharacter.films?.length,
                  ) ?? []
                }
              />
            </>
          )}
        </>
      </Tabs>
    </>
  );
}

export default App;
