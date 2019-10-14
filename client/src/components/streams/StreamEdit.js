import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import { StreamForm } from '.';

class StreamEdit extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		const { stream } = this.props;
		if (!stream) return <div>Loading...</div>;
		else
			return (
				<div>
					<h3>Edit a Stream</h3>
					<StreamForm
						onSubmit={this.onSubmit}
						initialValues={_.pick(this.props.stream, 'title', 'description')}
					/>
				</div>
			);
	}
}

const mapStateToProps = ({ stream }, ownProps) => {
	return { stream: stream[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
