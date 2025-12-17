import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('permet d’ajouter un abonnement via le formulaire manuel', async () => {
    const user = userEvent.setup();
    render(<App />);

    const addButton = screen.getByRole('button', { name: /ajouter un abonnement/i });
    await user.click(addButton);

    const manualButton = await screen.findByText(/pas dans la liste/i);
    await user.click(manualButton);

    const nameInput = await screen.findByLabelText(/nom du service/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Mon Service Test');

    const priceInput = screen.getByLabelText(/prix/i);
    await user.clear(priceInput);
    await user.type(priceInput, '12.5');

    const submitButton = screen.getByRole('button', { name: /ajouter au calendrier/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('Mon Service Test').length).toBeGreaterThan(0);
    });

    const saved = JSON.parse(localStorage.getItem('subscrivo_data') || '[]');
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({ name: 'Mon Service Test', price: 12.5 });
  });
});

