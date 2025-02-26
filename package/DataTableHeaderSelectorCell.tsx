import { Checkbox, MantineStyleProp, TableTh, type CheckboxProps } from '@mantine/core';
import clsx from 'clsx';
import type { DataTableSelectionTrigger } from './types';
import { POINTER_CURSOR } from './utilityClasses';

type DataTableHeaderSelectorCellProps = {
  className: string | undefined;
  style: MantineStyleProp | undefined;
  trigger: DataTableSelectionTrigger;
  shadowVisible: boolean;
  checked: boolean;
  indeterminate: boolean;
  checkboxProps: CheckboxProps;
  onChange: (() => void) | undefined;
  rowSpan: number | undefined;
};

export function DataTableHeaderSelectorCell({
  className,
  style,
  trigger,
  shadowVisible,
  checked,
  indeterminate,
  checkboxProps,
  onChange,
  rowSpan,
}: DataTableHeaderSelectorCellProps) {
  const enabled = !checkboxProps.disabled;

  return (
    <TableTh
      className={clsx(
        'mantine-datatable-header-selector-cell',
        { [POINTER_CURSOR]: trigger === 'cell' && enabled },
        className
      )}
      style={style}
      rowSpan={rowSpan}
      data-shadow-visible={shadowVisible || undefined}
      onClick={trigger === 'cell' && enabled ? onChange : undefined}
    >
      <Checkbox
        classNames={enabled ? { input: POINTER_CURSOR } : undefined}
        checked={checked}
        indeterminate={indeterminate}
        onChange={onChange}
        {...checkboxProps}
        disabled={!(onChange || checkboxProps.onChange) || checkboxProps.disabled}
      />
    </TableTh>
  );
}
