import {
  Column,
  Columns,
  DataTable,
  Table,
  TableBody,
  TableComponents,
  TableComponentsProvider,
} from '@ctablex/core';
import { ReadonlyWire, useWireValue } from '@forminator/react-wire';
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from '@mui/material';
import React, { PropsWithChildren, useCallback } from 'react';
import { Item } from 'src/shared/drivers';
import { DownloadButton } from './DownloadButton';

export const MuiComponents: TableComponents = {
  Table: MuiTable,
  Tbody: MuiTableBody,
  Thead: MuiTableHead,
  Tr: MuiTableRow,
  Td: MuiTableCell,
  Th: MuiTableCell,
};

interface OwnProps {
  items$: ReadonlyWire<Item[]>;
  download: (id: string) => Promise<void>;
}

export type Props = PropsWithChildren<OwnProps>;

export function TripsTable(props: Props) {
  const { items$ } = props;
  const items = useWireValue(items$);
  return (
    <TableComponentsProvider value={MuiComponents}>
      <DataTable data={items}>
        <Columns>
          <Column accessor="title" />
          <Column accessor="id">
            <DownloadButton download={props.download} />
          </Column>
        </Columns>
        <Table>
          <TableBody />
        </Table>
      </DataTable>
    </TableComponentsProvider>
  );
}
