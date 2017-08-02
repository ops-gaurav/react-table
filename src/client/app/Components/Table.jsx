import React from 'react';
import style from '../style/custom.css'






let tableStyle = {
	display: 'table',
	width: '100%'
}

let headStyle = {
	width: '100%',
	overflowY: 'scroll',
	cursor: 'pointer',
	display: 'table',
	tableLayout: 'fixed',
	width: 'calc (100%-16px)' /**assume scroll-bar width=16px */
}
let bodyStyle = {
	width: '100%',
	overflow: 'auto',
	display: 'block'
}

let tableRow = {
	width: '100%',
	textAlign: 'left',
	display: 'table',
	tableLayout: 'fixed'
}



/**
 * represents the individual table row
 */
class TableRow extends React.Component {
	constructor(props) {
		super(props);

		this.clickHandle = this.clickHandle.bind(this);
	}

	clickHandle(e) {
		// you can use this callback for later implementations
	}

	render() {
		return <tr style={tableRow} key={this.props.uniqueKey} onClick={this.clickHandle}>
			{this.props.columns}
		</tr>
	}
}

/**
 * represents the individual table column
 */
class TableColumn extends React.Component {
	constructor(props) {
		super(props);

		this.clickHandle = this.clickHandle.bind(this);

	}

	clickHandle(e) {
		// you can use this callback for later implementations
	}

	render() {
		return <td onClick={this.clickHandle}>
			{this.props.value}
		</td>
	}
}

/**
 * the table component that will render table data
 */
export default class ReactTableComponent extends React.Component {

	/**
	 * 
	 * @param {object} props representing the properties of ReactTableComponent
	 * The valid properties are as below 
	 */
	constructor(props) {
		super(props);

		this.state = {
			inset: 0,
			offset: this.props.lazyLoadOffset,
			increment: this.props.lazyLoadOffset,
			virtualHeight: this.props.height,
			data: this.props.rows,
			rowsData: this.props.rows,
			flag: 1,
			filter: '',
			lastSorted: ""
		};

		bodyStyle.height = this.props.height ?
			this.props.height + 'px' : '100%';
		// props.columns => array containing the column names
		// props.data => array containing the rows as array

		this.checkBottomScroll = this.checkBottomScroll.bind(this);
		this.sortingColumn = this.sortingColumn.bind(this);
		this.sortUnsort = this.sortUnsort.bind(this);
		this.search = this.search.bind(this);
	}

	/**
	 * to be called every-time the table is scrolled
	 * @param {} event 
	 */
	checkBottomScroll(event) {

		const { virtualHeight, inset, offset, increment } = this.state;

		if ((event.target.scrollHeight) <= Math.ceil(event.target.scrollTop + event.target.clientHeight)) {
			// console.log (this.props.lazyLoadCallback());
			this.setState({
				data: this.state.data.concat(this.props.lazyLoadCallback()),
				rowsData: this.state.data.concat(this.props.lazyLoadCallback())

			})
		}
	}

	/**
	 * renders the JS JSON data into corresponding JSX
	 * @param {array} rows representing the data as array
	 */
	populateData(rows) {
		let tableRows = [];

		rows.forEach((data, rowCount) => {
			let aliasColumns = [];
			let currentRow = data;

			// aliasColumns.push (<TableColumn key={ "index"+ rowCount } value={ rowCount }/>);
			this.props.header.forEach((col, index) => {
				if (currentRow[col.id]) {
					aliasColumns.push(<TableColumn uniqueKey={"column" + rowCount + "_" + index} key={"column" + rowCount + "_" + index} value={currentRow[col.id]} />);
				} else {
					aliasColumns.push(<TableColumn uniqueKey={"column" + rowCount + "_" + index} key={"column" + rowCount + "_" + index} value={''} />);
				}
			})
			// for (let key in currentRow) {
			// 	this.props.header.forEach((col, index) => {
			// 		if (col.id == key){console.log("inside if ============");
			// 			aliasColumns.push();
			// 		}else{console.log("inside else ============");
			// 			aliasColumns.push(<TableColumn uniqueKey={"column" + rowCount + "_" + index} key={"column" + rowCount + "_" + index} value={''} />);
			// 		}
			// 	});
			// }

			tableRows.push(<TableRow uniqueKey={"row" + rowCount} key={"row" + rowCount} columns={aliasColumns} />);
		});

		return tableRows;
	}

	sortingColumn(args, index) {
		var headClass = document.getElementById('sortingClass' + index);

		if (this.state.lastSorted !== "" && this.state.lastSorted !== null) {
			var lastHeadClass = document.getElementById('sortingClass' + this.state.lastSorted);
			lastHeadClass.className = "";
		}
		if (this.state.flag === 1) {
			headClass.className = "fa fa-sort-asc sortIcon";
			headClass.style = "float:right";
			this.setState({
				data: this.sortUnsort(this.state.data, args, 'sort'),
				flag: 0,
				lastSorted: index
			});
			

		} else {
			headClass.className = "fa fa-sort-desc sortIcon";
			headClass.style = "float:right";
			this.setState({
				data: this.sortUnsort(this.state.data, args, 'unsort'),
				flag: 1,
				lastSorted: index
			})
		}
	}
	sortUnsort(data, args, type) {

		return data.sort(function (a, b) {
			var value1 = (a[args] !== undefined && a[args] !== null) ? a[args].toString().toUpperCase() : '',
				value2 = (b[args] !== undefined && b[args] !== null) ? b[args].toString().toUpperCase() : ''
			if (value1 === "" || value1 === null) return 1;
			if (value2 === "" || value2 === null) return -1;
			if (value1 === value2) return 0;
			return (type === 'sort') ? ((value1 < value2) ? -1 : 1) : (value1 < value2 ? 1 : -1);
		})
	}

	filterColumn(e) { console.log(this.state.rowsData)
		var input = e.target.value;
		var data = this.state.data;
		if (input.length !== 0) {
			this.setState({
				data: this.search(this.state.rowsData, input)
			})
		} else {
			this.setState({
				data: this.state.rowsData
			})
		}
	}

	search(data, input) {
		var ar = [];
		data.map(function (obj) {
			for (var key in obj) {
				if (obj[key].toString().indexOf(input) != -1) {
					return ar.push(obj)
				}
			}
		})
		return ar;

	}



	/* for sorting (old code)*/
	//  if (typeof a[args] === 'number' && typeof b[args] == 'number') {
	// 			// 	return type === 'sort' ? a[args] - b[args] : b[args] - a[args];
	// 			 }
	// 			if (typeof a[args] === 'string' && typeof b[args] == 'string') {
	// 				var value1 = a[args].toString().toLowerCase(),
	// 					value2 = b[args].toString().toLowerCase();
	// 				if (value1 === "" || value1 === null) return 1;
	// 				if (value2 === "" || value2 === null) return -1;
	// 				if (value1 === value2) return 0;
	// 				return (type === 'sort') ? ((value1 < value2) ? -1 : 1) : (value1 < value2 ? 1 : -1);
	// 			}



	/**
	 * render the html content
	 */
	render() {

		let activeData = this.state.data;

		const { header } = this.props;

		let headers = [];
		let tableRows = this.populateData(activeData);

		// headers.push (<th key='index'>Index</th>);



		header.forEach((head, index) => {

			headers.push(<th key={'header' + index} onClick={this.sortingColumn.bind(this, head.id, index)}> {head.title}<i id={"sortingClass" + index}  aria-hidden="true"> </i> </th>);

		});


		return <section onScroll={this.checkBottomScroll} className='table-responsive'>
			<input type="text" onChange={this.filterColumn.bind(this, )} />
			<table className="test table table-striped table-hover table-bordered table-responsive" style={tableStyle}>
				<thead style={headStyle}>
					<tr style={tableRow}>{headers}</tr>
				</thead>
				<tbody style={bodyStyle}>
					{tableRows}
				</tbody>
			</table>
		</section>
	}
}