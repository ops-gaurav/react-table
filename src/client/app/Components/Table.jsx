import React from 'react';
import style from '../style/custom.css'








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
		return <tr key={this.props.uniqueKey} onClick={this.clickHandle}>
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
		return <td onClick={this.clickHandle} data-toggle='tooltip' title={this.props.header}>
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
		this.filterColumn = this.filterColumn.bind (this);
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
					aliasColumns.push(<TableColumn header={col.title} uniqueKey={"column" + rowCount + "_" + index} key={"column" + rowCount + "_" + index} value={currentRow[col.id]} />);
				} else {
					aliasColumns.push(<TableColumn header={col.title} uniqueKey={"column" + rowCount + "_" + index} key={"column" + rowCount + "_" + index} value={''} />);
				}
			})

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


	componentDidMount() {

	}

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


		return <section onScroll={this.checkBottomScroll} className='table-responsive table-container' style={{ width: '100%', height: this.props.height ? this.props.height + 'px' : '100%', overflowY: 'scroll' }}>

			<style jsx>{`
				table {
					margin-top: 40px;
				}
				.form-container {
					background: #383838;
					padding: 5px;
					position: fixed;
					width: 100%;
				}
				table thead {
					background: #383838;
					border-right: none;
					color: #fff;
					border-radius: 3px;
					text-align: center;
					transition: all .25s ease-in-out;
					border-bottom: solid 3px #737678 ;
				}
				.title-container {
					background: #383838;
					color: #fff;
					padding-top: 4px;
				}
				.input-group-addon {
					background: grey;
					border: none;
				}
				.search-btn {
					border: none;
					background: none;
					color: #fff;
					cursor: pointer;
				}
			`}
			</style>

			<section className='row form-container'>
				<section className='col-md-6 title-container'>

					<h4>{this.props.tableTitle}</h4>
				
				</section>
				<section className='col-md-6'>
					<section className='input-group input-group-sm'>
						<input onChange={this.filterColumn} type="text" className="form-control input-sm" placeholder="Search from table.." aria-describedby="basic-addon1" />
						<span className='input-group-addon'>
							<button className='btn btn-sm btn-secondary search-btn'><span className='fa fa-search'></span></button>
						</span>
					</section>
				</section>
				<section className='col-md-6'>

				</section>
			</section>
			<table id='table' className="table table-striped table-hover" >
				<thead>
					<tr>{headers}</tr>
				</thead>
				<tbody>
					{tableRows}
				</tbody>
			</table>
		</section>
	}
}