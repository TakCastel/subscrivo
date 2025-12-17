import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  it('affiche le contenu quand ouvert', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        <div>Contenu modal</div>
      </Modal>,
    );
    expect(screen.getByText('Contenu modal')).toBeInTheDocument();
  });

  it('appelle onClose quand backdrop cliqué', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen onClose={onClose}>
        <div>Contenu modal</div>
      </Modal>,
    );
    const backdrop = screen.getByTestId('modal-backdrop') || screen.getByRole('presentation', { hidden: true });
    const target = backdrop || screen.getByText('Contenu modal').parentElement?.parentElement?.previousSibling;
    if (target instanceof HTMLElement) {
      await user.click(target);
    }
    expect(onClose).toHaveBeenCalled();
  });
});

