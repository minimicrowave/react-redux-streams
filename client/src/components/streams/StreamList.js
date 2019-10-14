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

	renderAdminButtons = (userId) => {
		if (userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<button className="ui button primary">Edit</button>
					<button className="ui button negative">Delete</button>
				</div>
			);
		}
	};

	renderList = () => {
		return this.props.streams.map(({ id, title, description, userId }) => (
			<div className="item" key={id}>
				{this.renderAdminButtons(userId)}
				<i className="large middle aligned icon camera" />
				<div className="content">
					{title}
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
