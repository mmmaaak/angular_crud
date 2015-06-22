
var CRUDComponent = React.createClass({
	getInitialState: function() {
		return {
			crudData: {
				headers: [],
				rows: []
			}
		};
	},
	componentDidMount: function() {
		$.post(this.props.source, function(data) {
			this.setState({
				crudData: data
			});
		}.bind(this));
	},
	render: function() {

		var self = this;

		var tableHeaders = self.state.crudData.headers.map(function(e, i) {
			return (
				<th key={i}>{e.title}</th>
			);
		});

		var tableRows = self.state.crudData.rows.map(function(r_e, r_i) {
			var row_vals = self.state.crudData.headers.map(function(h_e, h_i) {
				return (<td key={h_i}>{r_e[h_e.title]}</td>);
			});
			return (
				<tr key={r_i}>{row_vals}</tr>
			);
		});

		return (
			<div>
				<table className="table table-bordered table-striped">
					<thead>
						<tr>
							{tableHeaders}
						</tr>
					</thead>
					<tbody>
						{tableRows}
					</tbody>
				</table>
			</div>
		);
	}
});