$(function() {
	React.render(
		React.createElement(CRUDTableComponent, {create: "/api/create/", read: "/api/read/", update: "/api/update/", delete: "/api/delete/"}),
        document.getElementById('crud')
	);
});