import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import List from './components/List';
import PostDetail from './components/PostDetail';
import ComponentMap from './components/Map';
import ComponentMapReload from './components/MapReload';

const RouterComponent = () => {
    return(
        <Router>
            <Scene>
                <Scene key='list' component={List} title='Lista de Posts'  />
                <Scene key='postDetail' component={PostDetail} title='Ver Post' />
                <Scene key='componentMap' component={ComponentMap} title='Mapa' initial />
                <Scene key='componentMapReload' component={ComponentMapReload} title='Mapa Atualizado' />
            </Scene>
        </Router>   
    );
};

export default RouterComponent;