var CRUDUpdateComponent = React.createClass({
    getInitialState: function() {
        return {
            row: {},
            fields: []
        };
    },
    componentWillReceiveProps: function(props) {
        this.setState({
            row: props.row,
            fields: props.fields
        });
    },
    componentDidMount: function() {
        this.setState({
            row: this.props.row,
            fields: this.props.fields
        });
    },
    
    renderStringField: function(e, i) {
        return (
            <div className="form-group" key={i}>
                <label>{e.title}</label>
                <p><input className="form-control" type="text" name={e.title} value={this.state.row[e.title]}/></p>
            </div>
        );
    },
    
    renderNumberField: function(e, i) {
        return (
            <div className="form-group" key={i}>
                <label>{e.title}</label>
                <p><input className="form-control" type="number" name={e.title} value={this.state.row[e.title]}/></p>
            </div>
        );
    },
    
    renderSelectField: function(e, i) {
        var self = this;
        var options = e.options.map(function(o, o_i) {
            return (<option key={o_i} value={o}>{o}</option>);
        });
        return (
            <div className="form-group" key={i}>
                <label>{e.title}</label>
                <select className="form-control" name={e.title} value={this.state.row[e.title]}>{options}</select>
            </div>
        );
    },
                                    
    updateSubmit: function(e, i) {
    },
    
    renderFields: function(fields, row) {
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
    
    render: function() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">Update data</h4>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h2>Update Form</h2>
                            <form className="form" ref="form">
                                {this.renderFields(this.state.fields, this.state.row)}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.updateSubmit}>Save changes</button>
                </div>
            </div>
		);
    }
});