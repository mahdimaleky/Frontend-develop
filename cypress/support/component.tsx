// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';
// Import mui provider to wrapp all components
import theme from '@/lib/ThemeRegistery/theme';
import { ThemeProvider } from '@mui/material';
// Import next-intl provider with en messages
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/lib/i18n/messages/en.json';
import '@/assets/styleSheets/main.modules.scss';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', (component, options) => {
  // Wrap any parent components needed
  // ie: return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(
    <ThemeProvider theme={theme}>
      <NextIntlClientProvider locale='en' messages={messages}>
        {component}
      </NextIntlClientProvider>
    </ThemeProvider>,
    options
  );
});

// Example use:
// cy.mount(<MyComponent />)
