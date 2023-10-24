'use client';

import { rgba } from '@mantine/core';
import { DataTable, uniqBy } from '__PACKAGE__';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { employees } from '~/data';
import classes from './ColumnPropertiesExampleStyling.module.css';

const records = employees.slice(0, 10);

export function ColumnPropertiesExampleStyling() {
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      striped
      records={records}
      columns={[
        {
          accessor: 'index',
          title: '#',
          textAlign: 'right',
          width: 40,
          // 👇 style cells with a class name
          cellsClassName: classes.idColumnCells,
          render: (record) => records.indexOf(record) + 1,
        },
        {
          accessor: 'name',
          title: 'Full name',
          width: 160,
          // 👇 style cells with a function returning a style object
          //    this function receives the current record as its argument, but we're not using it here
          cellsStyle: () => ({ fontStyle: 'italic' }),
          render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
          footer: `${records.length} employees`,
          // style footer with a style object
          footerStyle: { fontStyle: 'italic' },
        },
        { accessor: 'email' },
        {
          accessor: 'department.name',
          width: 150,
          // 👇 style title with a function returning a style object
          titleStyle: (theme) => ({ color: theme.colors.green[6] }),
          // 👇 style cells with a function returning a style object
          cellsStyle: () => (theme) => ({
            color: theme.colors.green[8],
            background: rgba(theme.colors.orange[6], 0.25),
          }),
        },
        {
          accessor: 'department.company.name',
          title: 'Company',
          width: 150,
          ellipsis: true,
          footer: `${uniqBy(records, (record) => record.department.company.name).length} companies`,
          // 👇 style footer with a function returning a style object
          footerStyle: (theme) => ({ color: theme.colors.blue[6] }),
        },
        {
          accessor: 'birthDate',
          title: 'Birthday',
          width: 100,
          // 👇 style title with a custom class name
          titleClassName: classes.birthdayColumnTitle,
          // 👇 style cells with a class name depending on current record
          cellsClassName: ({ birthDate }) =>
            clsx({ [classes.birthdayInApril]: dayjs(birthDate).format('MM') === '04' }),
          render: ({ birthDate }) => dayjs(birthDate).format('MMM D'),
        },
        {
          accessor: 'age',
          width: 80,
          textAlign: 'right',
          // 👇 style title with a style object
          titleStyle: { fontStyle: 'italic' },
          // 👇 style cells depending on current record, with a function returning a style object
          cellsStyle: ({ birthDate }) =>
            dayjs().diff(birthDate, 'years') <= 40
              ? {
                  fontWeight: 'bold',
                  color: 'green',
                  background: '#FF332222',
                }
              : undefined,
          render: ({ birthDate }) => dayjs().diff(birthDate, 'years'),
          footer: `Avg: ${Math.round(
            records.map((record) => dayjs().diff(record.birthDate, 'years')).reduce((a, b) => a + b, 0) / records.length
          )}`,
          footerClassName: classes.ageFooter,
        },
      ]}
    />
  );
}
