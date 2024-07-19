import cx from 'clsx';
import React, { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Button,
  Container,
  Grid,
  Modal,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { AddVendor } from '../AddVendor/AddVendor';
import classes from './TableScrollArea.module.css';
import { vendorData } from './mockData';

interface RowData {
  name: string;
  email: string;
  company: string;
  category: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function TableScrollArea() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(vendorData);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [noTransitionOpened, setNoTransitionOpened] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(vendorData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(vendorData, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const handleAddVendorButtonClick = () => {
    setNoTransitionOpened(true);
  };

  const addVendor = (data: RowData) => {
    vendorData.push(data);
    setSortedData(sortData(vendorData, { sortBy, reversed: reverseSortDirection, search }));
    setNoTransitionOpened(false);
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.company}</Table.Td>
      <Table.Td>{row.category}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <ScrollArea
        pl="3rem"
        pr="3rem"
        h={300}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Container>
          <Grid>
            <Grid.Col span={10}>
              <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={
                  <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                value={search}
                onChange={handleSearchChange}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Button className={classes.button} color="orange" onClick={handleAddVendorButtonClick}>Add Vendor</Button>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={12}>
              <Table miw={700}>
                <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                  <Table.Tr>
                    <Th
                      sorted={sortBy === 'name'}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting('name')}
                    >
                      Name
                    </Th>
                    <Th
                      sorted={sortBy === 'email'}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting('email')}
                    >
                      Email
                    </Th>
                    <Th
                      sorted={sortBy === 'company'}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting('company')}
                    >
                      Company
                    </Th>
                    <Th
                      sorted={sortBy === 'category'}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting('category')}
                    >
                      Category
                    </Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {rows.length > 0 ? (
                    rows
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={Object.keys(vendorData[0]).length}>
                        <Text fw={500} ta="center">
                          Nothing found
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </Grid.Col>
          </Grid>
        </Container>
      </ScrollArea>
      <Modal
        opened={noTransitionOpened}
        onClose={() => setNoTransitionOpened(false)}
        title="Add a new vendor"
        transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
      >
        <AddVendor onSave={addVendor} />
      </Modal>
    </>
  );
}
