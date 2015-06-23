$(function() {

	React.render(
		<CRUDTableComponent create="/api/create/" read="/api/read/" update="/api/update/" delete="/api/delete/"/>,
		document.getElementById('crud')
	);

});