import { useMemo } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DinseyCharacter } from "../services/types";
import styled from "styled-components";

interface ExportXlsxProps {
  data: DinseyCharacter[];
}

const StyledButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  padding: var(--spacing-small) var(--spacing-medium);
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default function ExportXlsx({ data }: ExportXlsxProps) {
  const rows = useMemo(
    () =>
      data.map((disneyCharacter) => ({
        Name: disneyCharacter.name,
        "Number of Films": disneyCharacter.films?.length,
        Films: disneyCharacter.films?.join(", "),
      })),
    [data],
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `export.xlsx`);
  };

  return <StyledButton onClick={exportToExcel}>Export to Excel</StyledButton>;
}
