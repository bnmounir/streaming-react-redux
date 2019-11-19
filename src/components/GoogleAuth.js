import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

export class GoogleAuth extends Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId:
                        '237720434558-i5o01m79o94abpicqppi1cfmukqcbgnl.apps.googleusercontent.com',
                    scope: 'email'
                })
                .then(res => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            // console.log(this.auth.currentUser.get().getId());
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    handleSignIn = () => {
        this.auth.signIn();
    };

    handleSignOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    onClick={this.handleSignOut}
                    className='ui red google button'
                >
                    <i className='google icon'></i> Sign Out
                </button>
            );
        } else if (this.props.isSignedIn === false) {
            return (
                <button
                    onClick={this.handleSignIn}
                    className='ui blue google button'
                >
                    <i className='google icon'></i> Sign In
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(
    mapStateToProps,
    {
        signIn,
        signOut
    }
)(GoogleAuth);
