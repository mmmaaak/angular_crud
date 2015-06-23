var CRUDCreateComponent = React.createClass({
    // Default state init
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
    
    // Custom render functions
    renderFields: function(fields) {
        var self = this;
        return fields.map(function(e, i) {
             switch (e.valueType) {
                 case 'string': return self.renderStringField(e, i);
                 case 'number': return self.renderNumberField(e, i);
                 case 'select': return self.renderSelectField(e, i);
                 default: return null;
             }
        });    
    },
    
    renderStringField: function(e, i) {
        return (
            <div className="form-group" key={i}>
                <label>{e.title}</label>
                <p><input className="form-control" type="text" name={e.title}/></p>
            </div>
        );
    },
    
    renderNumberField: function(e, i) {
        return (
            <div className="form-group" key={i}>
                <label>{e.title}</label>
                <p><input className="form-control" type="number" name={e.title}/></p>
            </div>
        );
    },
    
    renderSelectField: function(e, i) {
        var options = e.options.map(function(o, o_i) {
            return (<option key={o_i} value={o}>{o}</option>);
        });
        return (
            <div className="form-group" key={i}>
                <label>{e.title}</label>
                <select className="form-control" name={e.title}>{options}</select>
            </div>
        );
    },

	render: function() {
		return (
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">Create data</h4>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h2>Create Form</h2>
                            <form className="form" ref="form">
                                {this.renderFields(this.state.fields)}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.createSubmit}>Save changes</button>
                </div>
            </div>
		);
	}
});