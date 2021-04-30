import React,{Component} from 'react';

import {createDrawerNavigator} from 'react-navigation-drawer';
import sideDrawer from '../screens/Drawer';
import appTab from '../screens/appTab';
import Settings from '../screens/Screen';

const drawN = createDrawerNavigator({
    Home:{
            screen:appTab
         },
    Settings:{
       screen:Settings
         }
        },

         {
            contentComponent:sideDrawer 
         },

         {
             initialRouteName:'Home'
         
})

export default drawN;