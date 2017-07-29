import React from 'react';

class TableRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <tr key={ 'row' }>
			{ this.props.columns }
		</tr>
	}
}

class TableColumn extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <td>
			{ this.props.value }
		</td>
	}
}

/**
 * the table component that will render components
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
		// props.columns => array containing the column names
		// props.data => array containing the rows as array

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

	populateData (rows) {
		let tableRows = [];

		rows.forEach((data, rowCount) => {
			let aliasColumns = [];
			let currentRow = data;

			aliasColumns.push (<TableColumn key={ "index"+ rowCount } value={ rowCount }/>);
			this.props.header.forEach((column, index) => {
				aliasColumns.push(<TableColumn key={ "column"+ rowCount + "_"+ index } value={ currentRow[index] } />);
			})

			tableRows.push(<TableRow key={ "row"+ rowCount } columns={ aliasColumns } />);
		});

		return tableRows;
	}


	render() {

		let activeData = this.state.data;

		const { header } = this.props;

		let headers = [];
		let tableRows = this.populateData ( activeData );

		headers.push (<th key='index'>Index</th>);
		header.forEach((title, index) => {
			headers.push(<th key={ 'header'+ index} >{ title }</th>);
		});


		return <section onScroll={this.checkBottomScroll.bind (this)} className='table-responsive' style={{ height: this.props.height ? this.props.height + 'px' : '100%', overflowY: 'scroll' }}>
			<table className="table table-striped table-hover table-bordered">
				<thead>
					<tr>{ headers }</tr>
				</thead>
				<tbody>
					{ tableRows }
				</tbody>
			</table>
		</section>
	}
}