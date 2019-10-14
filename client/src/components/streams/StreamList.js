import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends Component {
	componentDidMount = () => {
		this.props.fetchStreams();
	};

	renderCreate = () => {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link className="ui button primary" to="/streams/new">
						Create Stream
					</Link>
				</div>
			);
		}
	};

	renderAdmin = (userId, id) => {
		if (userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${id}`} className="ui button primary">
						Edit
					</Link>
					<Link to={`/streams/delete/${id}`} className="ui button negative">
						Delete
					</Link>
				</div>
			);
		}
	};

	renderList = () => {
		return this.props.streams.map(({ id, title, description, userId }) => (
			<div className="item" key={id}>
				{this.renderAdmin(userId, id)}
				<i className="large middle aligned icon camera" />
				<div className="content">
					<Link to={`/streams/${id}`}>{title}</Link>
					<div className="description">{description}</div>
				</div>
			</div>
		));
	};

	render() {
		return (
			<div>
				StreamList
				<div className="ui celled list">{this.renderList()}</div>
				{this.renderCreate()}
			</div>
		);
	}
}

const mapStateToProps = ({ stream, auth }) => {
	return {
		streams: Object.values(stream),
		currentUserId: auth.userId,
		isSignedIn: auth.isSignedIn
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
