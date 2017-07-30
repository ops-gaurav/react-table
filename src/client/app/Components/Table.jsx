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

		this.clickHandle = this.clickHandle.bind (this);
	}

	clickHandle (e) {
		// you can use this callback for later implementations
	}

	render() {
		return <tr style={tableRow} key={ this.props.uniqueKey } onClick={this.clickHandle}>
			{ this.props.columns }
		</tr>
	}
}

/**
 * represents the individual table column
 */
class TableColumn extends React.Component {
	constructor(props) {
		super(props);

		this.clickHandle = this.clickHandle.bind (this);
	}

	clickHandle (e) {
		// you can use this callback for later implementations
	}

	render() {
		return <td onClick={this.clickHandle}>
			{ this.props.value }
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
			data: this.props.rows
		};

		bodyStyle.height = this.props.height ? 
							this.props.height  +'px' : '100%';
		// props.columns => array containing the column names
		// props.data => array containing the rows as array

		this.checkBottomScroll = this.checkBottomScroll.bind (this);
	}

	/**
	 * to be called every-time the table is scrolled
	 * @param {} event 
	 */
	checkBottomScroll (event) {

		const { virtualHeight, inset, offset, increment } = this.state;
		
		if ((event.target.scrollHeight) <= Math.ceil (event.target.scrollTop + event.target.clientHeight)) {
			// console.log (this.props.lazyLoadCallback());
			this.setState ({
				data: this.state.data.concat(this.props.lazyLoadCallback())
			})
		}
	}

	/**
	 * renders the JS JSON data into corresponding JSX
	 * @param {array} rows representing the data as array
	 */
	populateData (rows) {
		let tableRows = [];

		rows.forEach((data, rowCount) => {
			let aliasColumns = [];
			let currentRow = data;

			// aliasColumns.push (<TableColumn key={ "index"+ rowCount } value={ rowCount }/>);
			for (let key in currentRow) {
				this.props.header.forEach ((col, index) => {
					if (col.id == key)
						aliasColumns.push (<TableColumn uniqueKey={"column"+ rowCount+"_"+index} key={"column"+ rowCount+"_"+index} value={currentRow[key]}/>);
				});
			}

			tableRows.push(<TableRow uniqueKey={ "row"+ rowCount } key={ "row"+ rowCount } columns={ aliasColumns } />);
		});

		return tableRows;
	}

	sortingColumn () {

	}

	/**
	 * render the html content
	 */
	render() {

		let activeData = this.state.data;

		const { header } = this.props;

		let headers = [];
		let tableRows = this.populateData ( activeData );

		// headers.push (<th key='index'>Index</th>);
		header.forEach((head, index) => {
			headers.push(<th key={ 'header'+ index} >{ head.title }</th>);
		});


		return <section onScroll={ this.checkBottomScroll } className='table-responsive'>
			<table className="table table-striped table-hover table-bordered table-responsive" style={ tableStyle }>
				<thead style={ headStyle }>
					<tr style={ tableRow }>{ headers }</tr>
				</thead>
				<tbody style={ bodyStyle }>
					{ tableRows }
				</tbody>
			</table>
		</section>
	}
}