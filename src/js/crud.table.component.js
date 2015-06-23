var CRUDTableComponent = React.createClass({
	getInitialState: function() {
		return {
			config: {
				start: 0,
				count: 10,
				filters: []
			},
			data: {
				fields: [],
				rows: []
			}
		};
	},
	componentDidMount: function() {
		$.post(this.props.read, {
			start: this.props.start||this.state.config.start,
			count: this.props.count||this.state.config.count,
			filters: this.state.filters||[]
		}, function(data) {
			this.setState({
				data: data
			});
		}.bind(this));
	},
    
    updateClick: function(row) {
        React.render(<CRUDUpdateComponent row={row} fields={this.state.data.fields}/>, document.getElementById('modalViewport'));
    },
    
    deleteClick: function(row) {
        console.log("Delete: ", row);
    },
    
    renderTableHeaders: function(fields) {
        var fieldsHeaders = fields.map(function(e, i) {
            return (
                <th key={i}>{e.title}</th>  
            );
        });
        return (
            <tr>
                {fieldsHeaders}
                <th>Actions</th>
            </tr>
        );
    },
    
    renderTableRows: function(headers, rows) {
        var self = this;
        return rows.map(function(r_e, r_i) {
            var row_vals = headers.map(function(h_e, h_i) {
                return (<td key={h_i}>{r_e[h_e.title]}</td>);   
            });
            return (
                <tr key={r_i}>
                    {row_vals}
                    <td>
                        <button className="btn btn-warning" onClick={self.updateClick.bind(self, r_e)} data-toggle="modal" data-target="#myModal">Update</button>
                        <button className="btn btn-danger" onClick={self.deleteClick.bind(self, r_e)}>Delete</button>
                    </td>
                </tr>        
            );
        });  
    },
    
    addClick: function() {
        React.render(<CRUDCreateComponent fields={this.state.data.fields}/>,
        document.getElementById('modalViewport'));
    },
    
	render: function() {
		return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn" onClick={this.addClick} data-toggle="modal" data-target="#myModal">Create</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    {this.renderTableHeaders(this.state.data.fields)}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableRows(this.state.data.fields, this.state.data.rows)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
		);
	}
});