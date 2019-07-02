import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import { UserProvider } from './context/auth-context';
ReactDOM.render(
	<UserProvider>
		<App />
	</UserProvider>,
	document.getElementById('root')
);
