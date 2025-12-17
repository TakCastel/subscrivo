import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('rend le texte', () => {
    render(<Button>Click</Button>);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('applique le variant danger', () => {
    render(<Button variant="danger">Supprimer</Button>);
    const btn = screen.getByText('Supprimer');
    expect(btn.className).toContain('bg-red');
  });
});

