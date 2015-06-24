var CRUDTableComponent = React.createClass({
	getInitialState: function() {
		return {
			config: {
				start: 0,
				count: 3,
				filters: []
			},
			data: {
				fields: [],
				rows: [],
                pages: 3,
                
			}
		};
	},
	componentDidMount: function() {
	   this.syncData(this.state.config);
	},
    
    updateClick: function(row) {
        React.render(<CRUDUpdateComponent row={row} fields={this.state.data.fields}/>, document.getElementById('modalViewport'));
    },
    
    deleteClick: function(row) {
        React.render(<CRUDDeleteComponent row={row} callback={this.deleteCallback.bind(this, row)}/>, document.getElementById('modalViewport'));
    },
                     
    deleteCallback: function(row) {
      console.log(row);      
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
                        <button className="btn btn-danger" onClick={self.deleteClick.bind(self, r_e)} data-toggle="modal" data-target="#myModal">Delete</button>
                    </td>
                </tr>        
            );
        });  
    },
                                           
    renderPagesSelect: function() {
        var pages = Array.apply(null, Array(this.state.data.pages)).map(function(_, i){
            return (<option value={i+1} key={i}>{i+1}</option>)
        });
        return (<select className="form-control" ref="pageSelect" onChange={this.pageSelect}>{pages}</select>)
    },
            
    pageSelect: function(e) {
        var page = e.target.value-1;
        var config = {
            start: this.state.config.count * page,
            count: this.state.config.count,
            filters: this.state.config.filters||null
        };
        this.syncData(config);
    },
        
    addClick: function() {
        React.render(<CRUDCreateComponent fields={this.state.data.fields}/>,
        document.getElementById('modalViewport'));
    },
        
    syncData: function(config) {
        $.post(this.props.read, config, function(data) {
			this.setState(data);
		}.bind(this));
    },
    
	render: function() {
		return (
            <div>
                <div className="row">
                    <div className="col-md-1">
                        <button className="btn" onClick={this.addClick} data-toggle="modal" data-target="#myModal">Create</button>
                    </div>
                    <div className="col-md-1">
                        Page: {this.renderPagesSelect()}
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