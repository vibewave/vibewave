import '../src/style.css';
import pk from '../package.json';

const renderApp = (app: string) => {
  const main: HTMLElement = document.createElement('main');
  main.id = app;

  const appNameSplit: string[] = pk.name.split('-');
  for (let i = 0; i < appNameSplit.length; i++) {
    appNameSplit[i] = appNameSplit[i][0].toUpperCase() + appNameSplit[i].slice(1);
  }
  const appName: string = appNameSplit.join(' ');

  main.innerHTML = `
    <strong>${appName}</strong>
  `
  main.style.color = '#0e5fb9';

  document.body.appendChild(main);
  return main;
}

window.addEventListener('DOMContentLoaded', () => {
  renderApp('app');
});
