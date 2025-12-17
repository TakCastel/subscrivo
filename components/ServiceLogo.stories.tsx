import type { Meta, StoryObj } from '@storybook/react';
import { ServiceLogo } from './ServiceLogo';

const meta: Meta<typeof ServiceLogo> = {
  title: 'Métiers/ServiceLogo',
  component: ServiceLogo,
  args: {
    name: 'Netflix',
    color: '#E50914',
    domain: 'netflix.com',
    logo: '',
  },
};

export default meta;
type Story = StoryObj<typeof ServiceLogo>;

export const Default: Story = {};

export const WithSvgLogo: Story = {
  args: { logo: 'https://cdn.simpleicons.org/netflix/E50914' },
};

