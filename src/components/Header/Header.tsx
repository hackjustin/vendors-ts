import { useState } from 'react';
import {
  Anchor,
  Container,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { IconBrandGithub, IconMoon, IconSun } from '@tabler/icons-react';
import logo from '@/favicon.png';
import classes from './Header.module.css';

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const { setColorScheme } = useMantineColorScheme();
  setColorScheme(theme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setColorScheme(newTheme);
  };

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group justify="center" p="md">
          <img src={logo} alt="logo" className={classes.logo} />
          <Text
            className={classes.appname}
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
            variant="gradient"
          >
            VENDORS
          </Text>
        </Group>
        <Group justify="center" p="md">
          <Anchor
            href="https://github.com/hackjustin/vendors-ts"
            rel="noopener noreferrer"
            target="_blank"
            underline="never"
          >
            <ThemeIcon variant="outline" className={classes.themeicon} radius="md" color="orange">
              <IconBrandGithub />
            </ThemeIcon>
          </Anchor>
          <ThemeIcon
            className={classes.themeicon}
            color="orange"
            onClick={toggleTheme}
            radius="md"
            variant="outline"
          >
            {theme === 'light' ? (
              <Tooltip label="Dark mode" position="bottom">
                <IconMoon />
              </Tooltip>
            ) : (
              <Tooltip label="Light mode" position="bottom">
                <IconSun />
              </Tooltip>
            )}
          </ThemeIcon>
        </Group>
      </Container>
    </header>
  );
}

export default Header;
