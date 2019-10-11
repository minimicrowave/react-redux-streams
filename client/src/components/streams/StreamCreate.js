import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends Component {
	render() {
		console.log(this.props);
		return <div>StreamCreate</div>;
	}
}

export default reduxForm({ form: 'streamCreate' })(StreamCreate);
