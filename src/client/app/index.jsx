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

var headers = [
	{title: "Name", id: "name"}, 
	{title: "Age", id: "age"}, 
	{title: "Gender", id: "gender"}
];
var rows = [
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'gaurav', age: 22, gender: 'm'},
	{name: 'adam', age: 22, gender: 'm'}
];

let inset = 0, offset = 10, increment = 10;

function loadNextData () {
	let _inset = inset;
	let _offset = offset;

	console.log (`from ${_inset} to ${_offset}`);

	inset = offset;
	offset = (offset + increment) > rows.length ? offset + (rows.length - offset) : (offset + increment);

	return rows.slice (_inset, _offset);
}

/**
 * lazy load only works if the table height is specified
 */
var table = <TableComponent 
				header={ headers }
				rows = { loadNextData() }
				height = { 300 }
				lazyLoadOffset = { increment }
				lazyLoadCallback = { loadNextData }/>;

render (table, document.getElementById ('app'));
render (<HeaderComponent/>, document.getElementById ('header'));
render (<FooterComponent/>, document.getElementById ('footer'))