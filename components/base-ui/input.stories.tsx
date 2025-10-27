import type { Meta, StoryObj } from '@storybook/react';
import { useId } from 'react';
import { Input } from './input';
import { Label } from './label';

const meta: Meta<typeof Input> = {
  title: 'Components/Inputs/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: {
      control: 'radio',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    'aria-invalid': { control: 'boolean' },
  },
  args: {
    type: 'text',
    placeholder: 'Placeholder...',
    disabled: false,
    'aria-invalid': false,
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithPlaceholderAndLabel: Story = {
  render: (args) => {
    const id = useId();
    return (
      <div className="w-80 space-y-2">
        <Label htmlFor={id}>Nome</Label>
        <Input id={id} {...args} placeholder="Digite seu nome" />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Desabilitado' },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true, placeholder: 'Inválido' },
};

export const KeyboardNavigation: Story = {
  render: () => {
    const id1 = useId();
    const id2 = useId();
    return (
      <div className="w-80 space-y-3">
        <div className="space-y-2">
          <Label htmlFor={id1}>Primeiro campo</Label>
          <Input id={id1} placeholder="Tab para focar" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={id2}>Segundo campo</Label>
          <Input id={id2} placeholder="Shift+Tab para voltar" />
        </div>
      </div>
    );
  },
};
