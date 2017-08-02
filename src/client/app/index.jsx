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
	{title: "Gender", id: "gender"},
	{title: "State", id: "state"},
	{title: "Counry", id: "country"}
];
var rows = [
	{name: 'gaurav', age: '24', gender: 'm',state:'california',country:'us'},
	{name: 'ganesh', age: '25', gender: 'm',state:'los vegas',country:'us'},
	{name: 'shiv', age: '28', gender: 'm',state:'nevada',country:'us'},
	{name: 'namam', age: '28', gender: 'm',state:'arizona',country:'us'},
	{name: 'namam', age: '28', gender: 'm',state:'',country:''},
	{name: 'amit', age: 28, gender: 'm',state:'',country:''},
	{name: 'devika', age: 28, gender: 'f',state:'',country:''},
	{name: 'sahil', age: 28, gender: 'm',state:'',country:'g'},
	{name: 'deepak', age: 40, gender: 'm',state:'new orleans new orleansnew orleansnew orleansnew orleansnew orleansnew orleansnew orleansnew orleansnew orleansnew orleansnew orleansnew orleans',country:'us'},
	{name: 'tau', age: 45, gender: 'm',state:'a'},
	{name: 'shashi', age: 30, gender: 'm',state:'sasd',country:''},
	{name: 'kb', age: 30, gender: 'm',state:'',country:''},
	{name: 'batra', age: 20, gender: 'm',state:'',country:''},
	{name: 'gaurav', age: 22, gender: 'm',state:'',country:''},
	{name: 'gaurav', age: 22, gender: 'm'},

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
render (<FooterComponent/>, document.getElementById ('footer'));