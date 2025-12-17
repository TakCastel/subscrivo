import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const createDataTransfer = () => {
  const data: Record<string, string> = {};
  return {
    data,
    setData: (key: string, value: string) => {
      data[key] = value;
    },
    getData: (key: string) => data[key],
    dropEffect: 'move',
    effectAllowed: 'all',
    files: [],
    items: [],
    types: [],
  } as DataTransfer;
};

describe('App - intégration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('permet de déplacer un abonnement via drag & drop dans le calendrier', async () => {
    localStorage.setItem(
      'subscrivo_data',
      JSON.stringify([
        {
          id: 'sub-1',
          name: 'MoveMe',
          price: 10,
          day: 5,
          recurrence: 'monthly',
          category: 'Autre',
          color: '#000',
        },
      ]),
    );

    render(<App />);

    const sourceDay = await screen.findByTestId('day-cell-5');
    const targetDay = await screen.findByTestId('day-cell-10');

    const subChip = within(sourceDay).getByText('MoveMe');
    const dataTransfer = createDataTransfer();

    fireEvent.dragStart(subChip, { dataTransfer });
    fireEvent.dragOver(targetDay, { dataTransfer });
    fireEvent.drop(targetDay, { dataTransfer });

    await waitFor(() => {
      expect(within(targetDay).getByText('MoveMe')).toBeInTheDocument();
    });
  });

  it('supprime un abonnement après confirmation', async () => {
    localStorage.setItem(
      'subscrivo_data',
      JSON.stringify([
        {
          id: 'sub-delete',
          name: 'DeleteMe',
          price: 15,
          day: 3,
          recurrence: 'monthly',
          category: 'Autre',
          color: '#000',
        },
      ]),
    );

    const user = userEvent.setup();
    render(<App />);

    const listItem = (await screen.findAllByText('DeleteMe'))[0];
    await user.click(listItem); // ouvre le formulaire en édition

    const deleteButton = await screen.findByRole('button', { name: /supprimer/i });
    await user.click(deleteButton);

    const confirmButtons = await screen.findAllByRole('button', { name: /supprimer/i });
    const confirmButton = confirmButtons[confirmButtons.length - 1];
    await user.click(confirmButton);

    await waitFor(() => {
      expect(screen.queryByText('DeleteMe')).not.toBeInTheDocument();
    });
  });

  it('change de pays/locale et persiste la sélection', async () => {
    const user = userEvent.setup();
    render(<App />);

    const countryButton = screen.getByRole('button', { name: /fr/i });
    await user.click(countryButton);

    const usButton = await screen.findByRole('button', { name: /united states/i });
    await user.click(usButton);

    await waitFor(() => {
      expect(screen.getByText(/Your Subscriptions/i)).toBeInTheDocument();
    });

    expect(localStorage.getItem('subscrivo_country')).toBe('US');
  });
});

