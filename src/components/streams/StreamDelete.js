import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    actions = (
        <>
            <button
                onClick={() =>
                    this.props.deleteStream(this.props.match.params.id)
                }
                className='ui negative button'
            >
                Delete
            </button>
            <Link to={'/'}>
                <button className='ui button'>Cancel</button>
            </Link>
        </>
    );
    onDismiss = () => history.push('/');

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderContent = () =>
        !this.props.stream
            ? 'Are you sure you want to delete stream?'
            : `'Are you sure you want to delete ${this.props.stream.title} stream?'`;

    render() {
        return (
            <Modal
                title='Delete Stream'
                content={this.renderContent()}
                actions={this.actions}
                onDismiss={this.onDismiss}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
    fetchStream,
    deleteStream
})(StreamDelete);
