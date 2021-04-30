import * as React from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Alert } from 'react-native';
import Myheader from '../components/appHeader';

export default class Settings extends React.Component{
    constructor(){
        super();
        this.state={
            firstName:'',
            LastName:'',
            address:'',
            email:'',
            phone:'',
            docId:''
        }
    }
    getDetails=()=>{
        var user = firebase.auth().currentUser;
        var emailId = user.email;
        db.collection("User").where('Email','==',emailId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                var data = doc.data()
                this.setState({
                    email:data.Email,
                    firstName:data.FirstName,
                    LastName:data.lastName,
                    address:data.Address,
                    phone:data.Contact,
                    docId:doc.id
                })
            })
        })
        }
        updateList=()=>{
            db.collection('User').doc(this.state.docId).update({
                'FirstName':this.state.FirstName,
                'lastName':this.state.lastName,
                'Contact':this.state.phone,
                'Address':this.state.address,
                'Email':this.state.email
            })
            Alert.alert("Profile Updated Successfully");
        }
        componentDidMount(){
            this.getDetails();
        }
    render(){
        return(
            <View style={{marginLeft:20}}>

                <View>
                <Myheader
                title='Settings'
                navigation={this.props.navigation}
                />
                </View>

                <TextInput
                placeholder="First Name"
                maxLength={9}
                onChangeText={(text)=>{
                    this.setState({
                        firstName:text
                    })
                }}
                value={this.state.firstName}
                />
                <TextInput
                placeholder="Last Name"
                onChangeText={(text)=>{
                    this.setState({
                        LastName:text
                    })
                }}
                value={this.state.LastName}
                />
                <TextInput
                placeholder="address"
                multiline={true}
                onChangeText={(text)=>{
                    this.setState({
                        address:text
                    })
                }}
                value={this.state.address}
                />
                <TextInput
                placeholder="Email Id"
                onChangeText={(text)=>{
                    this.setState({
                        email:text
                    })
                }}
                value={this.state.email}
                />
                <TextInput
                placeholder="Contact no."
                onChangeText={(text)=>{
                    this.setState({
                        phone:text
                    })
                }}
                value={this.state.phone}
                />

                <TouchableOpacity onPress={()=>{this.updateList()}} >
                    <Text>Save</Text>
                </TouchableOpacity>

            </View>
        )
    }
}