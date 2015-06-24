var CRUDDeleteComponent = React.createClass({
    getInitialState: function() {
      return {
          row: [],
          callback: null
      };
    },
    
    componentWillReceiveProps: function(props) {
        this.setState({
            row: props.row,
            callback: props.callback
        });
    },
    
    componentDidMount: function() {
        this.setState({
            row: this.props.row,
            callback: this.props.callback
        });
    },
    
    renderFields: function(row) {
        return $.map(row, function(e, i) {
            return (<p>{i}: {e}</p>) 
        });  
    },
    
    render: function() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">Delete data</h4>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h2>Really delete?</h2>
                            {this.renderFields(this.state.row)}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.state.callback}>Delete</button>
                </div>
            </div>  
        );
    }

});