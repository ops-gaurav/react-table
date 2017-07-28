import React from 'react';

class TableRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <tr>
			{this.props.columns}
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

	constructor(props) {
		super(props);

		this.state = {
			inset: 0,
			offset: this.props.lazyLoadOffset,
			increment: this.props.lazyLoadOffset,
			data: this.props.rows,
			virtualHeight: this.props.height
		};
		// props.columns => array containin the column names
		// props.data => array containing the rows as array

	}

	checkBottomScroll (event) {
		// console.log (event.target.scrollHeight);
		// console.log (Math.ceil (event.target.scrollTop + event.target.clientHeight));
		// console.log (event.target.scrollHeight);
		// // console.log (event.target.scrollTop);

		const { data, virtualHeight, inset, offset, increment } = this.state;
		
		if (offset < data.length)

			if ((event.target.scrollHeight) <= Math.ceil (event.target.scrollTop + event.target.clientHeight)) {
				// console.log (this.props.lazyLoadCallback());
				this.setState ({
					data: this.props.lazyLoadCallback()
				})
				// let newItems = (offset + increment) > data.length ? data.length - offset : increment;

				// let offsetCalculated = offset + newItems;

				// this.setState ({
				// 	inset: 0,
				// 	offset: offsetCalculated,
				// 	increment: increment,
				// 	data: data
				// });
			}
			// if (event.target.scrollTop >= virtualHeight-20 && event.target.scrollTop - 20 <= virtualHeight) {
			// 	console.log (event.target.scrollTop);
			// 	let newItems = (offset + increment) > data.length ? data.length - offset : increment;
			// 	let offsetCalculated = offset + newItems;
			// 	console.log ('offset value is '+ offsetCalculated);

			// 	let calculatedVirtualHeight = virtualHeight + (newItems * 19);

				
			// 	this.setState ({
			// 		inset: 0,
			// 		offset: offsetCalculated,
			// 		increment: increment,
			// 		data: data,
			// 		virtualHeight: calculatedVirtualHeight
			// 	});
			// 	console.log (this.state);
			// }
	}

	// lazy load data from set of data
	loadNext(inset, offset) {
		// console.log (this.state);
		var conditionalData = this.state.data.slice(inset, offset);

		let tableRows = [];

		conditionalData.forEach((data, rowCount) => {
			let aliasColumns = [];
			let currentRow = data;

			aliasColumns.push (<TableColumn value={rowCount}/>);
			this.props.header.forEach((column, index) => {
				aliasColumns.push(<TableColumn value={currentRow[index]} />);
			})

			if (rowCount == this.state.offset - 1) {
				// load next rows on visible
				tableRows.push(<TableRow columns={aliasColumns} />);
			} else {
				tableRows.push(<TableRow columns={aliasColumns} />);
			}
		});

		return tableRows;
	}

	populateData (rows) {
		let tableRows = [];

		rows.forEach((data, rowCount) => {
			let aliasColumns = [];
			let currentRow = data;

			aliasColumns.push (<TableColumn value={rowCount}/>);
			this.props.header.forEach((column, index) => {
				aliasColumns.push(<TableColumn value={currentRow[index]} />);
			})

			if (rowCount == this.state.offset - 1) {
				// load next rows on visible
				tableRows.push(<TableRow columns={aliasColumns} />);
			} else {
				tableRows.push(<TableRow columns={aliasColumns} />);
			}
		});

		return tableRows;
	}


	render() {
		console.log ('re-render');

		let activeData = [];
		if (this.state.data) {
			activeData.apply (this.state.data);
		} else {
			activeData = this.props.lazyLoadCallback();
		}
		// const activeData = this.props.lazyLoadCallback();

		const { header } = this.props;

		let headers = [];
		let tableRows = this.populateData(activeData);

		headers.push (<th>Index</th>);
		header.forEach((title, index) => {
			headers.push(<th>{title}</th>);
		});
		// const inset = this.state.inset;
		// const offset = this.state.offset;

		// const activeData = this.loadNext(inset, offset);

		// const { header, rows } = this.props;

		// let headers = [];
		// let tableRows = activeData;

		// headers.push (<th>Index</th>);
		// header.forEach((title, index) => {
		// 	headers.push(<th>{title}</th>);
		// });


		return <section onScroll={this.checkBottomScroll.bind (this)} className='table-responsive' style={{ height: this.props.height ? this.props.height + 'px' : '100%', overflowY: 'scroll' }}>
			<table className="table table-striped table-hover table-bordered">
				<thead>
					<tr> {headers}</tr>
				</thead>
				<tbody>
					{tableRows}
				</tbody>
			</table>
		</section>
	}
}