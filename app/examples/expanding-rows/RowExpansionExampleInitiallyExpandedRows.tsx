'use client';

import { Box, Group, Stack } from '@mantine/core';
import { DataTable } from '__PACKAGE__';
import { companies } from '~/data';
import classes from './RowExpansionExampleInitiallyExpandedRows.module.css';

const records = companies.slice(0, 5);

export function RowExpansionExampleInitiallyExpandedRows() {
  // example-start
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      rowExpansion={{
        initiallyExpanded: ({ record: { name } }) => name === 'Johnston LLC',
        // example-skip
        content: ({ record }) => (
          <Stack className={classes.details} p="xs" gap={6}>
            <Group gap={6}>
              <div className={classes.label}>Postal address:</div>
              <div>
                {record.streetAddress}, {record.city}, {record.state}
              </div>
            </Group>
            <Group gap={6}>
              <div className={classes.label}>Mission statement:</div>
              <Box fs="italic">“{record.missionStatement}”</Box>
            </Group>
          </Stack>
        ),
        // example-resume
      }}
    />
  );
  // example-end
}
