import { useState } from "react";
import { useGetDisneyCharactersQuery } from "./services/disneyCharacters";
import { DinseyCharacter, Nullable } from "./services/types";

import {
  Logo,
  Tabs,
  Header,
  Search,
  Table,
  Chart,
  Dialog,
  Pagination,
  Toast,
} from "./components";
import logoUrl from "./assets/logo.png";

function App() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [selectedDisneyCharacter, setSelectedDisneyCharacter] =
    useState<Nullable<DinseyCharacter>>(null);

  const [search, setSearch] = useState<{ value: string; type: string }>({
    value: "",
    type: "",
  });

  const {
    data: response,
    error,
    isFetching,
  } = useGetDisneyCharactersQuery({
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
      {!!error && <Toast message="Something went wrong. Please try again." />}
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
