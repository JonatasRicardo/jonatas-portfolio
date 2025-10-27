import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Label } from './label';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders and accepts text', () => {
    render(<Textarea placeholder="Mensagem" />);
    const ta = screen.getByPlaceholderText('Mensagem') as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: 'Olá' } });
    expect(ta.value).toBe('Olá');
  });

  it('supports disabled', () => {
    render(<Textarea placeholder="Mensagem" disabled />);
    const ta = screen.getByPlaceholderText('Mensagem');
    expect(ta).toBeDisabled();
  });

  it('supports aria-invalid', () => {
    render(<Textarea placeholder="Mensagem" aria-invalid />);
    const ta = screen.getByPlaceholderText('Mensagem');
    expect(ta).toHaveAttribute('aria-invalid', 'true');
  });

  it('associates with Label', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="msg">Mensagem</Label>
        <Textarea id="msg" placeholder="Mensagem" />
      </>,
    );
    const label = screen.getByText('Mensagem');
    const ta = screen.getByPlaceholderText('Mensagem');

    await user.click(label);
    expect(ta).toHaveFocus();
  });
});
