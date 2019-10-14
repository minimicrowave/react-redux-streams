import React, { Component } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
	}
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchStream(id);
		this.buildPlayer();
	}

	componentDidUpdate() {
		this.buildPlayer();
	}

	componentWillUnmount() {
		this.player.destroy();
	}

	buildPlayer = () => {
		const { id } = this.props.match.params;

		if (this.player || !this.props.stream) {
			return;
		}
		this.player = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8002/live/${id}.flv`
		});
		this.player.attachMediaElement(this.videoRef.current);
		this.player.load();
	};

	render() {
		const { stream } = this.props;
		if (!stream) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<video ref={this.videoRef} style={{ width: '100%' }} controls />
				<h1>{stream.title}</h1>
				<h5>{stream.description}</h5>
			</div>
		);
	}
}

const mapStateToProps = ({ stream }, ownProps) => {
	return { stream: stream[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
