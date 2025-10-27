import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from './input';
import { Label } from './label';

describe('Input', () => {
  it('renders and accepts text', () => {
    render(<Input placeholder="Seu nome" />);
    const input = screen.getByPlaceholderText('Seu nome') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Jonatas' } });
    expect(input.value).toBe('Jonatas');
  });

  it('supports disabled state', () => {
    render(<Input placeholder="Disabled" disabled />);
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
  });

  it('supports aria-invalid', () => {
    render(<Input placeholder="Inválido" aria-invalid />);
    const input = screen.getByPlaceholderText('Inválido');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('associates with Label via htmlFor/id', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="Nome" />
      </>,
    );

    const label = screen.getByText('Nome');
    const input = screen.getByPlaceholderText('Nome');
  
    await user.click(label);

    expect(input).toHaveFocus();
  });

  it('focus via keyboard (Tab) works', async () => {
    const user = userEvent.setup();
    
    render(<Input placeholder="Tab here" />);
   
    await user.tab();
    expect(screen.getByPlaceholderText('Tab here')).toHaveFocus();

  });
});
