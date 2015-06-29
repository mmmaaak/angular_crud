var CRUDTableComponent = React.createClass({
	getInitialState: function() {
		return {
			config: {
				start: 0,
				count: 5,
				filters: {}
			},
			data: {
				fields: [],
				rows: [],
                pages: 0,
                
			}
		};
	},
	componentDidMount: function() {
	   this.syncData(this.state.config);
	},

    notifyError: function(error) {
        notif({
            msg: error,
            type: "error",
            position: "center"
        });
    },
    
    updateClick: function(row) {
        React.render(<CRUDUpdateComponent row={row} fields={this.state.data.fields} callback={this.updateCallback}/>, document.getElementById('modalViewport'));
    },

    updateCallback: function(request) {
        console.log(this);
        $.post(this.props.update, request, function(data) {
            if(typeof data["error"]!=="undefined")
                return this.notifyError(data.error);
            this.syncData(this.state.config);
        }.bind(this));
    },
    
    deleteClick: function(row) {
        React.render(<CRUDDeleteComponent row={row} callback={this.deleteCallback.bind(this, row)}/>, document.getElementById('modalViewport'));
    },
                     
    deleteCallback: function(row) {
        $.post(this.props.delete, row, function(data) {
            if(typeof data['error']!=="undefined")
                return this.notifyError(data.error);
            this.syncData(this.state.config);
        }.bind(this));
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
                    <td className="col-md-2">
                        <div className="btn-group">
                            <button className="btn btn-warning" onClick={self.updateClick.bind(self, r_e)} data-toggle="modal" data-target="#myModal">Update</button>
                            <button className="btn btn-danger" onClick={self.deleteClick.bind(self, r_e)} data-toggle="modal" data-target="#myModal">Delete</button>
                        </div>
                    </td>
                </tr>        
            );
        });  
    },
                                           
    renderPagesSelect: function() {
        var pages = Array.apply(null, Array(this.state.data.pages)).map(function(_, i){
            return (<option value={i+1} key={i}>{i+1}</option>)
        });
        return (<select className="form-control" onChange={this.pageSelect}>{pages}</select>)
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
        
    renderCountSelect: function() {
        return (
            <select className="form-control" onChange={this.countSelect}>
            {[5, 10, 20, 50, 100].map(function(e, i) {
                return (<option key={i} value={e}>{e}</option>);
            })}
            </select>
        );
    },
        
    countSelect: function(e) {
        var config = {
            start: 0,
            count: e.target.value,
            filters: this.state.config.filters||{}
        };
        this.syncData(config);
    },
        
    renderSearchInput: function() {
        return (<input type="text" className="form-control" onChange={this.searchInput} />);
    },
        
    searchInput: function(e) {
        var filters = this.state.config.filters||{};
        filters.searchString = e.target.value;
        var config = {
            start: this.state.config.start,
            count: this.state.config.count,
            filters: filters
        };
        this.syncData(config);
    },
        
    createClick: function() {
        React.render(<CRUDCreateComponent fields={this.state.data.fields} callback={this.createCallback.bind(this)}/>,
        document.getElementById('modalViewport'));
    },

    createCallback: function(request) {
        $.post(this.props.create, request, function(data) {
            if(typeof data["error"]!=="undefined")
                return this.notifyError(data.error);
            this.syncData(this.state.config);
        }.bind(this));
    },
        
    renderOrderSelect: function() {
        var options = this.state.data.fields.map(function(e, i) {
           return (<option value={e.title} key={i}>{e.title}</option>);
        });
        
        return (
            <select ref="orderField" className="form-control" onChange={this.orderCallback}>{options}</select>
        )  
    },
            
    renderOrdeDirectionSelect: function() {
        return (
            <select className="form-control" ref="orderDir" onChange={this.orderCallback}>
                <option value="asc" sleected="selected">ASC</option>
                <option value="desc">DESC</option>
            </select>
        );
    },
        
    orderCallback: function() {
        var filters = this.state.filters;
        filters.odreBy = this.refs.orderField.getDOMnode().value;
        filters.orderDirection = this.refs.orderField.getDOMNode().value;
        var config = {
            start: this.state.config.start,
            count: this.state.config.count,
            filters: filters
        };
        this.syncData(config);
    },
        
    syncData: function(config) {
        $.post(this.props.read, config, function(data) {
            if(typeof data["error"]!=="undefined")
                return this.notifyError(data.error);
			this.setState(data);
		}.bind(this));
    },
    
	render: function() {
		return (
            <div>
                <div className="row vertical-margin">
                    <div className="col-md-1">
                        <button className="btn btn-success" onClick={this.createClick} data-toggle="modal" data-target="#myModal">Create</button>
                    </div>
                    <div className="col-md-2">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Page</span>
                            {this.renderPagesSelect()}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Count</span>
                            {this.renderCountSelect()}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Order</span>
                            {this.renderOrderSelect()}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Direction</span>
                            {this.renderOrdeDirectionSelect()}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Search</span>
                            {this.renderSearchInput()}        
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered table-hover table-condensed table-vmidle">
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