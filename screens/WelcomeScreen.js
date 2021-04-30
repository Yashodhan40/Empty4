import * as React from 'react';
import {View,TextInput, Alert,TouchableOpacity,Text,StyleSheet,ScrollView,KeyboardAvoidingView,Modal} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import SantaScreen from '../components/Santa.js';


export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            Name:'',
            name2:'',
            phone:'',
            cP:'',
            add:'',
            isModalVisible:'false',
        }
    }
    
    signUp=(email,password,cP)=>{
        if (password !== cP){
            Alert.alert("Password Doesn't Match");
        }else{
        firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{
            db.collection("User").add({
                'FirstName':this.state.Name,
                'LastName':this.state.name2,
                'Email':this.state.email,
                'Address':this.state.address,
                'Contact':this.state.phone
            })
            return Alert.alert("User added successfully",
            '',
            [
                {text:'OK', onPress:()=> this.setState({'isModalVisible':false})}
            ]
            );
        })
        .catch ((error)=>{
            var errorCode = error.code
            var errorMessage = error.message
            return Alert.alert(errorMessage);
        })
        }
    }

    logIn=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then((response)=>{
            this.props.navigation.navigate('Donate');

        }).catch ((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message
            return Alert.alert(errorMessage);
        })
    }

    showModal=()=>{
        return(
            <Modal 
            animationType='fade' 
            transparent={true} 
            visible={this.state.isModalVisible} 
            >
                <View style={[styles.modalContainer]}>
                    <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView behavior="padding" enabled
                    style={styles.KeyboardAvoidingView}
                    >
                    <TextInput 
                    placeholder="First Name"
                    maxLength={8}
                    onChangeText={text=>{this.setState({Name:text})}}
                    style={styles.First}
                    />
                    <TextInput 
                    placeholder="Last Name"
                    maxLength={10}
                    onChangeText={text=>{this.setState({name2:text})}}
                    style={styles.last}
                    /> 
                    <TextInput 
                    placeholder="Contact no."
                    maxLength={10}
                    keyboardType='numeric'
                    onChangeText={text=>{this.setState({phone:text})}}
                    style={styles.cont}
                    />

                    <TextInput placeholder="Address"
                    multiline={true}
                    onChangeText={text=>{this.setState({add:text})}}
                    style={styles.add}
                    />
                    <TextInput 
                    placeholder="email ID"
                    keyboardType='email-address'
                    onChangeText={text=>{this.setState({email:text})}}
                    style={styles.emailId}
                    />
                    <TextInput placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text=>{this.setState({password:text})}}
                    style={styles.pass}
                    />
                    <TextInput 
                    placeholder="confirm password"
                    secureTextEntry={true}
                    onChangeText={text=>{this.setState({cP:text})}}
                    style={styles.cp}
                    />

                    <TouchableOpacity onPress={()=>this.signUp(this.state.email,this.state.password,this.state.cP)}
                        style={styles.register}>
                                               
                        <Text style={{color:'#003300',
                        textAlign:'center',
                        fontWeight:'bold'
                    }}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=> this.setState({'isModalVisible':false})}
                    style={styles.go}
                    >
                        <Text style={{fontWeight:'bold',textAlign:'center',color:'#003300'}}>Go Back</Text>
                    </TouchableOpacity>
                        
                    </KeyboardAvoidingView>
                    </ScrollView>
                     
                </View>

            </Modal>
        )
    }
    render(){
        return(
            <View style={{backgroundColor:'#2080D0'}}>
               
               <View style={{justifyContent: 'center',alignItems: 'center'}}>

                </View>   
                {
                    this.showModal()
                }      

                <View style={{justifyContent:'center'}}>
                    <Text 
                    style={{marginLeft:0,
                    marginTop:110,
                     fontSize:40,
                     textAlign:'center',
                     alignSelf:'center',
                    }}
                    >Book Santa</Text>
                </View>
                

                
                <KeyboardAvoidingView behavior='padding' enabled>
                    <TextInput 
                    style={styles.a}
                    placeholder="email Id"
                    keyboardType="email-address"
                    onChangeText={(text)=>{this.setState({email:text})}}
                    />
                    <TextInput 
                    style={[styles.b,{marginTop:30}]}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(text)=>{this.setState({password:text})}}
                    />

                    <TouchableOpacity 
                    style={[styles.l,{marginTop:20}]}
                    onPress={()=>{this.logIn(this.state.email,this.state.password)}}>
                             <Text style={{fontSize:25,
                             justifyContent:'center',
                             textAlign:'center',
                            }}>Log In</Text>
                    </TouchableOpacity>


                    <TouchableOpacity 
                    style={[styles.s,{marginTop:20}]}
                    onPress={()=>this.setState({isModalVisible:true})}>
                           <Text style={{fontSize:25,
                           justifyContent:'center',
                           paddingLeft:10
                        }}>Sign Up</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </View>
                   
                    
               

                


                    

        )
    }
}

const styles=StyleSheet.create({
    a:{
        marginTop:90,
        alignSelf:'center',
       // textAlign:'center',
        backgroundColor:'#99AAFF',
        padding:10,
        borderWidth:2,
        borderColor:'black',
        borderRadius:0,
        width:290
    },
    b:{
        backgroundColor:'#99AAFF',
        alignSelf:'center',
        padding:10,
        borderWidth:2,
        borderColor:'black',
        borderRadius:0,
        width:290,
        marginTop:15
    },
    c:{
        backgroundColor:'#77EE00',
        alignSelf:'center',
        padding:10,
        width:290,
        borderColor:'black',
        borderWidth:2,
        borderRadius:2,
        marginTop:60

    },
    d:{
        backgroundColor:'#77EE00',
        alignSelf:'center',
        padding:10,
        borderRadius:0,
        borderWidth:2,
        borderColor:"black",
        width:290,
        marginTop:15 
    },
    s:{
        backgroundColor:'#AACC00',
        width:90,
        alignSelf:'center',
        margin:0,
        textAlign:'center',
        paddingLeft:0,
        borderRadius:20,
        borderWidth:2,
        paddingTop:5,
        paddingBottom:5,
        justifyContent:'center'
    },
    l:{
        backgroundColor:'yellow',
        borderWidth:2,
        borderRadius:20,
        borderColor:'black',
        alignSelf:'center',
        width:90,
        paddingLeft:0,
        paddingTop:5,
        paddingBottom:5, 
        marginTop:10
    },
    m:{
        justifyContent:'center',
        alignSelf:'center',
        marginTop:110
        
    },
    First:{
        borderRadius:10,
        borderWidth:3,
        borderColor:'black',
        backgroundColor:'indigo',
        textAlign:'center',
        alignSelf:'center',
        width:200,
        marginTop:30,
        marginTop:7

    },
    last:{
        borderRadius:10,
        borderWidth:3,
        borderColor:'black',
        backgroundColor:'violet',
        textAlign:'center',
        alignSelf:'center',
        width:200,
        marginTop:7
    },
    cont:{
        borderRadius:10,
        borderWidth:3,
        borderColor:'black',
        backgroundColor:'blue',
        color:'black',
        textAlign:'center',
        alignSelf:'center',
        width:200,
        marginTop:7
    },
    add:{
        borderRadius:10,
        borderWidth:3,
        borderColor:'black',
        backgroundColor:'green',
        textAlign:'center',
        alignSelf:'center',
        width:200,
        marginTop:7
    },
    emailId:{
        borderRadius:10,
        borderWidth:3,
        borderColor:'black',
        backgroundColor:'yellow',
        textAlign:'center',
        alignSelf:'center',
        width:200,
        marginTop:7
    },
    pass:{
        borderRadius:10,
        borderWidth:3,
        borderColor:'black',
        backgroundColor:'#4466C3',
        textAlign:'center',
        alignSelf:'center',
        width:200,
        marginTop:7
    },
    cp:{
        borderRadius:10,
        borderWidth:3,
        borderColor:'black',
        backgroundColor:'red',
        textAlign:'center',
        alignSelf:'center',
        width:200,
        marginTop:7
    },
    register:{
        borderRadius:15,
        borderWidth:3,
        borderColor:'black',
        backgroundColor:'white',
        textAlign:'center',
        alignSelf:'center',
        width:200,
        marginTop:7
    },
    go:{
        borderRadius:15,
        borderWidth:3,
        borderColor:'black',
        backgroundColor:'white',
        textAlign:'center',
        alignSelf:'center',
        width:200,
        marginTop:7
    },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
})