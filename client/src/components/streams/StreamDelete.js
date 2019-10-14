import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStream, fetchStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	renderContent = () => {
		if (!this.props.stream) {
			return 'Are you sure you want to delete this stream?';
		}
		return `Are you sure you want to delete this stream: ${this.props.stream.title}?`;
	};

	renderActions = () => (
		<Fragment>
			<button
				onClick={() => this.props.deleteStream(this.props.match.params.id)}
				className="ui button negative"
			>
				Delete
			</button>
			<Link to="/" className="ui button">
				Cancel
			</Link>
		</Fragment>
	);
	render() {
		return (
			<Modal
				title={'Delete Stream'}
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		);
	}
}

const mapStateToProps = ({ stream }, { match: { params: { id } } }) => {
	return { stream: stream[id] };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete);
