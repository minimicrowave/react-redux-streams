import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () =>
			window.gapi.client
				.init({
					clientId:
						'397310096986-p256v33v0csaa7ngmcprnjf6b0ej3v60.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				})
		);
	}

	onAuthChange = (isSignedIn) =>
		isSignedIn ? this.props.signIn(this.getCurrentUserId()) : this.props.signOut();

	onSignInClick = () => this.auth.signIn();

	onSignOutClick = () => this.auth.signOut();

	getCurrentUserId = () => this.auth.currentUser.get().getId();

	renderAuthButton = () => {
		let { isSignedIn } = this.props;
		if (isSignedIn === null) {
			return null;
		} else if (isSignedIn) {
			return (
				<div className="ui red google button" onClick={this.onSignOutClick}>
					<i className="google icon" />
					Sign Out
				</div>
			);
		} else {
			return (
				<div className="ui red google button" onClick={this.onSignInClick}>
					<i className="google icon" />
					Sign In with Google
				</div>
			);
		}
	};
	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = ({ auth }) => ({ isSignedIn: auth['isSignedIn'] });

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
