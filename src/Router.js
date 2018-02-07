import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import List from './components/List';
import PostDetail from './components/PostDetail';

const RouterComponent = () => {
    return(
        <Router sceneStyle={{ paddingTop: 10 }}>
            <Scene>
                <Scene key='list' component={List} title='Lista de Posts' initial />
                <Scene key='postDetail' component={PostDetail} title='Ver Post' />
            </Scene>
        </Router>   
    );
};

export default RouterComponent;