import * as React from 'react';
import {View} from 'react-native';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import appTab from './screens/appTab.js';
import drawN from './screens/drawNavi.js';

export default class App extends React.Component{
  render(){
  return (
    
        <AppContainer/>
    
  );
  }
}

const switchNavigator = createSwitchNavigator({
  Welcome : {screen:WelcomeScreen},
  Drawer : {screen:drawN}
});

const AppContainer = createAppContainer(switchNavigator); 

