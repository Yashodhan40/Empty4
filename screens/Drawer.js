import * as React from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';
import appTab from '../screens/appTab';

export default class sideDrawer extends React.Component{
    render(){
        return(
            <View>
                <View>

                <DrawerItems {...this.props}/>
                </View>

                    
                <View>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('Welcome'),
                        firebase.auth().signOut();
                    }}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}
