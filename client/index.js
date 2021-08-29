import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../src/style.css';
import store from './store';
import App from './App';

const muiTheme = createTheme({
	palette: {
		type:'dark'
	}
});

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<ThemeProvider theme={muiTheme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</Router>
	</Provider>,
	document.getElementById('app')
);
