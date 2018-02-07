import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchPost } from './../actions';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

class PostDetail extends Component {
    componentDidMount() {
        this.props.fetchPost(this.props.postId);
    };

    render() {
        if (!this.props.post) {
            return <Text>Carregando . . .</Text>;
        };

        return(
            <View>
                <Text style={styles.titleStyle}>{this.props.post.title}</Text>
                <Text style={styles.bodyStyle}>{this.props.post.body}</Text>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    bodyStyle: {
        fontSize: 16
    }
})

const mapStateToProps = (state) => {
    return { post: state.posts.selected };
};

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({ fetchPost }, dispatch);
// };

export default connect(mapStateToProps, { fetchPost })(PostDetail);