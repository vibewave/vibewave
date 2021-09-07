import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../src/style.css';
import store from './store';
import App from './App';

const darkTheme = createTheme({
	palette: {
		type: 'dark',
		primary: {
			light: '#ADE8F4',
			mid: '#23494B',
			main: '#012F41',
			dark: '#012639',
			mix: '#df6b78',
		},
		secondary: {
			white: '#FFFFFF',
			light: '#44494B',
			mid: '#3c4043',
			mix: '#283840',
			main: '#151A1C'
		},
		background: {
			default: '#151A1C'
		}
	}
});

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</Router>
	</Provider>,
	document.getElementById('app')
);
