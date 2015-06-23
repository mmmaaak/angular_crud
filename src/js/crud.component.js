
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
		var f = this.state.fields.map(function(e, i) { 
            var field = null;
            if(e.valueType==='string') field = (<p><input className="form-control" type="text" name={e.title}/></p>);
            else if (e.valueType==='number') field = (<p><input className="form-control" type="number" name={e.title}/></p>);
            else if (e.valueType==='select') {
                var options = e.options.map(function(o, o_i) {
                    return (<option key={o_i} value={o}>{o}</option>);
                });
                field = (<select name={e.title}>{options}</select>);
            }
            
            if (field!==null) {
            return (
                <div className="form-group" key={i}>
                    <label>{e.title}</label>
                    {field}
                </div>
            );
            } else return null;
        });

		return (
			<div className="row">
                <h2>Create Form</h2>
				<form className="form">
					{f}
                    <p><input type="submit" className="btn btn-primary" value="Create" /></p>
				</form>
			</div>
		);
	}
});

var CRUDComponent = React.createClass({
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
        console.log("Update: ", row);
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
                <td>Actions</td>
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
                        <button className="btn btn-warning" onClick={self.updateClick.bind(self, r_e)}>Update</button>
                        <button className="btn btn-danger" onClick={self.deleteClick.bind(self, r_e)}>Delete</button>
                    </td>
                </tr>        
            );
        });  
    },
    
	render: function() {
		return (
			<div>
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
				<CRUDAddComponent fields={this.state.data.fields} />
			</div>
		);
	}
});