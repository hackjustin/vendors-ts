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
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './TableScrollArea.module.css';

const vendorData = [
  {
    name: 'Athena Weissnat',
    company: 'Little - Rippin',
    email: 'Elouise.Prohaska@yahoo.com',
    category: 'Pressure washer',
  },
  {
    name: 'Deangelo Runolfsson',
    company: 'Greenfelder - Krajcik',
    email: 'Kadin_Trantow87@yahoo.com',
    category: 'House cleaning',
  },
  {
    name: 'Danny Carter',
    company: 'Kohler and Sons',
    email: 'Marina3@hotmail.com',
    category: 'Garage door repair',
  },
  {
    name: 'Trace Tremblay PhD',
    company: 'Crona, Aufderhar and Senger',
    email: 'Antonina.Pouros@yahoo.com',
    category: 'Lawn mowing',
  },
  {
    name: 'Derek Dibbert',
    company: 'Gottlieb LLC',
    email: 'Abagail29@hotmail.com',
    category: 'Sprinkler repair',
  },
  {
    name: 'Viola Bernhard',
    company: 'Funk, Rohan and Kreiger',
    email: 'Jamie23@hotmail.com',
    category: 'AC repair',
  },
  {
    name: 'Austin Jacobi',
    company: 'Botsford - Corwin',
    email: 'Genesis42@yahoo.com',
    category: 'Window cleaning',
  },
  {
    name: 'Hershel Mosciski',
    company: 'Okuneva, Farrell and Kilback',
    email: 'Idella.Stehr28@yahoo.com',
    category: 'Shutter installation',
  },
  {
    name: 'Mylene Ebert',
    company: 'Kirlin and Sons',
    email: 'Hildegard17@hotmail.com',
    category: 'Appliance repair',
  },
  {
    name: 'Lou Trantow',
    company: 'Parisian - Lemke',
    email: 'Hillard.Barrows1@hotmail.com',
    category: 'Insurance agent',
  },
  {
    name: 'Dariana Weimann',
    company: 'Schowalter - Donnelly',
    email: 'Colleen80@gmail.com',
    category: 'Homeowners insurance',
  },
  {
    name: 'Dr. Christy Herman',
    company: 'VonRueden - Labadie',
    email: 'Lilyan98@gmail.com',
    category: 'Flood insurance',
  },
  {
    name: 'Katelin Schuster',
    company: 'Jacobson - Smitham',
    email: 'Erich_Brekke76@gmail.com',
    category: 'Car detailing',
  },
  {
    name: 'Melyna Macejkovic',
    company: 'Schuster LLC',
    email: 'Kylee4@yahoo.com',
    category: 'Car insurance',
  },
  {
    name: 'Pinkie Rice',
    company: 'Wolf, Trantow and Zulauf',
    email: 'Fiona.Kutch@hotmail.com',
    category: 'Painting',
  },
  {
    name: 'Brain Kreiger',
    company: 'Lueilwitz Group',
    email: 'Rico98@hotmail.com',
    category: 'Toll permit',
  },
  {
    name: 'Myrtice McGlynn',
    company: 'Feest, Beahan and Johnston',
    email: 'Julius_Tremblay29@hotmail.com',
    category: 'Pest control',
  },
  {
    name: 'Chester Carter PhD',
    company: 'Gaylord - Labadie',
    email: 'Jensen_McKenzie@hotmail.com',
    category: 'Security system installation',
  },
  {
    name: 'Mrs. Ericka Bahringer',
    company: 'Conn and Sons',
    email: 'Lisandro56@hotmail.com',
    category: 'Roof repair',
  },
  {
    name: 'Korbin Buckridge Sr.',
    company: 'Mraz, Rolfson and Predovic',
    email: 'Leatha9@yahoo.com',
    category: 'Paio repair',
  },
  {
    name: 'Dr. Daisy Becker',
    company: 'Carter - Mueller',
    email: 'Keaton_Sanford27@gmail.com',
    category: 'Landscaping',
  },
  {
    name: 'Derrick Buckridge Sr.',
    company: "O'Reilly LLC",
    email: 'Kay83@yahoo.com',
    category: 'Handyman',
  },
  {
    name: 'Ernie Hickle',
    company: "Terry, O'Reilly and Farrell",
    email: 'Americo.Leffler89@gmail.com',
    category: 'Electrician',
  },
  {
    name: 'Jewell Littel',
    company: "O'Connell Group",
    email: 'Hester.Hettinger9@hotmail.com',
    category: 'Plumber',
  },
  {
    name: 'Cyrus Howell',
    company: 'Windler, Yost and Fadel',
    email: 'Rick0@gmail.com',
    category: 'Fire alarm installation',
  },
  {
    name: 'Dr. Orie Jast',
    company: 'Hilll - Pacocha',
    email: 'Anna56@hotmail.com',
    category: 'Door repair',
  },
  {
    name: 'Luisa Murphy',
    company: 'Turner and Sons',
    email: 'Christine32@yahoo.com',
    category: 'Interior designer',
  },
  {
    name: 'Lea Witting',
    company: 'Hodkiewicz Inc',
    email: 'Ford_Kovacek4@yahoo.com',
    category: 'Organizer',
  },
  {
    name: 'Kelli Runolfsson',
    company: "Feest - O'Hara",
    email: 'Dimitri87@yahoo.com',
    category: 'Lighting designer',
  },
  {
    name: 'Brook Gaylord',
    company: 'Conn, Huel and Nader',
    email: 'Immanuel77@gmail.com',
    category: 'Furniture assembly',
  },
];

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

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.company}</Table.Td>
      <Table.Td>{row.category}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea
      pl="3rem"
      pr="3rem"
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
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
    </ScrollArea>
  );
}
