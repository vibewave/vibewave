import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Routes from './Routes';


const App = () => {
	return (
		<>
			<Navbar />
			<Routes />
		</>
	);
};

export default App;
