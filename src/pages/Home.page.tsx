import { Welcome } from '@/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { TableScrollArea } from '@/components/TableScrollArea/TableScrollArea';

export function HomePage() {
  return (
    <>
      <Welcome />
      <TableScrollArea />
      <ColorSchemeToggle />
    </>
  );
}
