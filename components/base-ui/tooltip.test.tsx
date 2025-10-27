import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const DEFAULT_OPEN_DELAY_HOVER_CARD  = 700;

describe('Tooltip', () => {
  it('shows tooltip on hover and focus', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip>
        <TooltipTrigger asChild>
          <Button aria-describedby="tt">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent id="tt">Tooltip text</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: /hover me/i });
    await user.hover(trigger);
    await waitFor(() => expect(screen.getByTestId('tooltip-content')).toBeInTheDocument(), {
      timeout: DEFAULT_OPEN_DELAY_HOVER_CARD,
    });

    await user.unhover(trigger);
    trigger.focus();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});
