import React from 'react';
import { render } from 'react-dom';
import HeaderComponent from './Components/HeaderComponent.jsx';
import FooterComponent from './Components/FooterComponent.jsx';
import TableComponent from './Components/Table.jsx';

class App extends React.Component {
	constructor (props) {
		super (props);
	}

	render () {
		return <p>Hello React Scratch!</p>
	}
}

var headers = ["Name", "Age", "Gender"];
var rows = [
	[ "gaurav" , "23", "M" ],
	[ "David", "24", "M" ],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	["Jennifer", "21", "F"],
	["gaurav", "23", "M"],
	["David", "24", "M"],
	[ "Jennifer", "21", "F" ]
];

let inset = 0, offset = 10, increment = 10;

function showAlert () {
	let _inset = inset;
	let _offset = offset;

	console.log (`from ${_inset} to ${_offset}`);

	inset = offset;
	offset = (offset + increment) > rows.length ? offset + (rows.length - offset) : (offset + increment);

	return rows.slice (_inset, _offset);
}

var table = <TableComponent 
				header={ headers }
				rows = { showAlert() }
				lazyLoadOffset = { 10 }
				lazyLoadCallback = { showAlert }
				height = { 300 } />;

render (table, document.getElementById ('app'));
render (<HeaderComponent/>, document.getElementById ('header'));
render (<FooterComponent/>, document.getElementById ('footer'))