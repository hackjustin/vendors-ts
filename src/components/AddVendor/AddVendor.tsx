import { TextInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

interface RowData {
  name: string;
  email: string;
  company: string;
  category: string;
}

interface AddVendorProps {
  onSave: (vendor: RowData) => void;
}

export function AddVendor({ onSave }: AddVendorProps) {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      company: '',
      category: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => value.trim().length > 0 && !/^\S+@\S+$/.test(value),
      company: (value) => value.trim().length === 0,
      category: (value) => value.trim().length === 0,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((e) => {
        onSave(e);
      })}
    >
      <TextInput
        label="Name"
        placeholder="Your name"
        mt="md"
        name="name"
        variant="filled"
        required
        {...form.getInputProps('name')}
      />

      <TextInput
        label="Email"
        placeholder="Your email"
        mt="md"
        name="email"
        variant="filled"
        {...form.getInputProps('email')}
      />

      <TextInput
        label="Company"
        placeholder="Company"
        mt="md"
        name="company"
        variant="filled"
        required
        {...form.getInputProps('company')}
      />

      <TextInput
        label="Category"
        placeholder="Category"
        mt="md"
        name="category"
        variant="filled"
        required
        {...form.getInputProps('category')}
      />

      <Group justify="center" mt="xl">
        <Button type="submit" size="md">
          Save
        </Button>
      </Group>
    </form>
  );
}
