import { useMemo, useCallback } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

interface ExportXlsxProps {
  data: Data[];
}

interface Data {
  name: string;
  y: number;
  films: string[];
}

/**
 * A component that exports data to an Excel file.
 */
export default function ExportXlsx({ data }: ExportXlsxProps) {
  /**
   * Memoizes the rows to be exported to Excel.
   */
  const rows = useMemo(
    () =>
      data.map(({ name, y, films }) => ({
        Name: name,
        "Number of Films": y,
        Films: films.join(", "),
      })),
    [data],
  );

  /**
   * Exports the data to an Excel file.
   */
  const exportToExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `export.xlsx`);
  }, [rows]);

  return (
    <StyledButton onClick={exportToExcel}>
      <FontAwesomeIcon icon={faFileExport} />
      Export to Excel
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  padding: var(--spacing-small) var(--spacing-medium);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: var(--spacing-large);
  display: flex;
  column-gap: var(--spacing-small);
  align-items: center;
`;
