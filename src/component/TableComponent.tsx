import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

type TableComponentProps = {
  columns?: any[];
  list?: any[];
};

const TableComponent: React.FC<TableComponentProps> = ({ columns, list }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((col: any, i: number) => (
              <TableCell key={i} id={col?.id} align={col?.align}>
                {col?.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {list && list.length > 0 ? (
            list?.map((r: any, i: number) => (
              <TableRow key={i}>
                {columns?.map((col: any, i: number) => (
                  <TableCell key={i} id={col?.id} align={col?.alignItem}>
                    {col?.render(r, i)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} align="center">
                <Typography>No data available</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
