import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => this.props.onSubmit(formValues);

	renderError = ({ error, touched }) => {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<form className="ui form error" onSubmit={handleSubmit(this.onSubmit)}>
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field name="description" component={this.renderInput} label="Enter Description" />
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'Enter title';
	}
	if (!formValues.description) {
		errors.description = 'Enter description';
	}

	return errors;
};

export default reduxForm({ form: 'StreamForm', validate })(StreamForm);
