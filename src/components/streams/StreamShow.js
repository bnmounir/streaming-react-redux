import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
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

    buildPlayer() {
        console.log('stream state is = ', !this.props.stream);
        console.log('player state is = ', this.player === true);

        if (!this.props.stream || this.player) {
            return;
        }
        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        return !this.props.stream ? (
            <div className=''>
                <div>Loading...</div>
            </div>
        ) : (
            <div className=''>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h3>{this.props.stream.title}</h3>
                <p>{this.props.stream.description}</p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
    fetchStream
})(StreamShow);
