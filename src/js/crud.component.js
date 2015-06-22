
var CRUDAddComponent = React.createClass({
	getInitialState: function() {
		return {
			fields: []
		}
	},
	componentWillReceiveProps: function(props) {
		this.setState({
			fields: props.fields
		});
	},
	componentDidMount: function() {
		this.setState({
			fields: this.props.fields
		});
	},

	render: function() {
		var f = this.state.fields.map(function(e, i) { return (
			<div class="form-group">
			<label>{e.title}</label>
			<input type="text" key={i} />
			</div>) }
		);

		return (
			<div className="row">
				<form className="form">
					{f}
				</form>
			</div>
		);
	}
});

var CRUDComponent = React.createClass({
	getInitialState: function() {
		return {
			requestParams: {
				start: 0,
				count: 0,
				filters: []
			},
			crudData: {
				headers: [],
				rows: []
			}
		};
	},
	componentDidMount: function() {
		$.post(this.props.source, {
			start: this.props.start||this.state.start,
			count: this.props.count||this.state.count,
			filters: this.state.filters||[]
		}, function(data) {
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
				<CRUDAddComponent fields={this.state.crudData.headers} />
			</div>
		);
	}
});