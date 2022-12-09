const contentfulManagement = require('contentful-management');

module.exports = function () {
	const contentfulClient = contentfulManagement.createClient({
		accessToken: 'CFPAT-u_d3HNYmBUlBpOoc9mzNbFDxz4BmgxqlsvVRpMS7DdM',
	});

	return contentfulClient
		.getSpace('45kua0kqjt9c')
		.then(space => space.getEnvironment('master'));
};
