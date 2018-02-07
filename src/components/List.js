import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchPosts } from './../actions'
import ListItem from './ListItem';
import { bindActionCreators } from 'redux';

class List extends Component {
    componentDidMount() {
        // chama action creator para pegar os dados da lista
        console.log('props')
        console.log(this.props)
        console.log(this.props.fetchPosts())
        this.props.fetchPosts();
    };

    onItemPress(id) {
        // muda de cena para PostDetail
        Actions.postDetail({ postId: id });
    };

    render() {
        if (!this.props.posts) {
            return (
                <Text>Loading ...</Text>
            );
        };

        console.log('pos loading')
        console.log(this.props)

        const postItems = this.props.posts.map(post => {
            return <ListItem key={post.id} item={post} onItemPress={this.onItemPress} />;
        });

        return(
            <ScrollView>
                {postItems}
            </ScrollView>
        );
    };
};

const mapStateToProps = (state) => {
    return { posts: state.posts.all };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchPosts }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(List);