import type { Preview } from '@storybook/react';

import { StorybookDecorator } from './decorator';

const preview: Preview = {
  decorators: [StorybookDecorator],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
