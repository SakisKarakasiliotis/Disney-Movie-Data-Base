import { useState } from "react";
import { useGetDisneyCharactersQuery } from "./services/disneyCharacters";
import { DinseyCharacter, Nullable } from "./services/types";

import logoUrl from "./assets/logo.png";

import Logo from "./components/Logo";
import Tabs from "./components/Tabs";
import Header from "./components/Header";
import Search from "./components/Search";
import Table from "./components/Table";
import Chart from "./components/Chart";
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

  const { data: response, isFetching } = useGetDisneyCharactersQuery({
    page,
    pageSize,
    ...(search.value && { [search.type]: search.value }),
  });

  const handleSearch = ({ value, type }: { value: string; type: string }) => {
    setSearch({ value, type });
    setPage(1);
  };

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
            totalPages={response?.info?.totalPages ?? 0}
          />

          <Table
            disneyCharacters={response?.data ?? []}
            isFetching={isFetching}
            setSelectedDisneyCharacter={setSelectedDisneyCharacter}
          />

          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalPages={response?.info?.totalPages ?? 0}
          />

          {selectedDisneyCharacter && (
            <Dialog
              disneyCharacter={selectedDisneyCharacter}
              setSelectedDisneyCharacter={setSelectedDisneyCharacter}
            />
          )}
        </>
        <Chart disneyCharacters={response?.data ?? []} />
      </Tabs>
    </>
  );
}

export default App;
