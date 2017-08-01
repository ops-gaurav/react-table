import React from 'react';

let tableStyle = {
	display: 'table',
	width: '100%'
}

let headStyle = {
	width: '100%',
	overflowY: 'scroll',
	display: 'table',
	tableLayout: 'fixed',
	'box-shadow':'inset 0 -3px 0 0 rgba(0,0,0,0.6)',
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
let sort = {

	'box-shadow':'inset 0 -3px 0 0 rgba(0,0,0,0.6)'
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
			filter: ''
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

	sortingColumn(args) {
		if (this.state.flag === 1) {
			this.setState({
				data: this.sortUnsort(this.state.data, args, 'sort')
			})
			this.setState({ flag: 0 });
		} else {
			this.setState({
				data: this.sortUnsort(this.state.data, args, 'unsort')
			})
			this.setState({ flag: 1 });
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

	filterColumn(e) {
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
			headers.push(<th key={'header' + index} style={tableStyle+index} onClick={this.sortingColumn.bind(this, head.id)}> {head.title}</th>);
		});


		return <section onScroll={this.checkBottomScroll} className='table-responsive'>
			<input type="text" onChange={this.filterColumn.bind(this, )} />
			<table className="table table-striped table-hover table-bordered table-responsive" style={tableStyle}>
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