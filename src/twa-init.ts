import WebApp from '@twa-dev/sdk';

export function twaInit() {
  WebApp.ready();
  WebApp.setHeaderColor('#171717');
  WebApp.expand();
  WebApp.enableClosingConfirmation();
}
