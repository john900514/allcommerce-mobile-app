import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Personal Settings',
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleLogout = async () => {
    let _this = this;
    await AsyncStorage.removeItem('jwt_api_token', function() {
      _this.props.navigation.navigate('AuthLoading');
    });
  };

  render() {
    return (
        <ScrollView style={styles.outerscrollview}>
          <View style={styles.container}>
            <View style={styles.viewStyleOne}>
              <View style={{ padding: 25 }} />
            </View>
            <View style={styles.viewStyleTwo}>
              <TouchableOpacity activeOpacity={0.5} onPress={this.handleLogout}>
                <Text style={styles.textStyleTwo}>Logout</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewStyleOne}>
              <View style={{ padding: 25 }} />
            </View>
          </View>
        </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  boxOuterStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  boxStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 170,
    width: 170,
    borderColor: '#ffffff',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewStyleOne: {
    backgroundColor: '#2D2D2D',
    borderColor: 'transparent',
    borderWidth: .5,
    flexGrow: 1,
    paddingLeft: 10,
    paddingBottom: 10
  },
  viewStyleTwo: {
    backgroundColor: '#2D2D2D',
    borderColor: 'transparent',
    borderWidth: .5,
    flexGrow: 1,
    fontSize: 22
  },
  textStyleOne: {
    fontFamily: 'simplicitapro-bold',
    marginTop: 30,
    color: '#BCBCC0',
    fontSize: 18,
    paddingLeft: 5,
  },
  textStyleTwo: {
    fontFamily: 'simplicitapro-bold',
    padding: 10,
    paddingLeft: 15,
    color: '#ffffff',
    fontSize: 20
  },
  boxTextStyle: {
    fontFamily: 'simplicitapro-bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: "#ffffff",
    fontSize: 18
  },
  textBoxPlaceHolder: {
    fontFamily: 'simplicitapro-bold',
    fontSize: 20,
    borderBottomColor: '#ffffff',
    height: 50,
    borderColor: '#ffffff'
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlesignup: {
    fontSize: 35,
    color: "#ffffff",
    textAlign: 'center',
    fontFamily: 'simplicitapro-bold',
  },
  signupandlogintext: {
    width: 200,
    flexDirection: 'row'
  },
  loginbtn: {
    width: 100
  },
  description: {
    fontFamily: 'simplicitapro-bold',
    marginTop: 10,
    textAlign: 'justify'
  },
  outerview: {
    backgroundColor: '#2D2D2D',
    flex: 1
  },
  firstinner: {
    flex: 1
  },
  secondinner: {
    flex: 2
  },
  thirdinner: {
    flex: 3
  },
  outerscrollview: {
    backgroundColor: '#2D2D2D',
    padding: 0
  },
  info: {
    flex: 1,
    marginTop: 7,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  author: {
    flex: 1,
    marginTop: 20,
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 35
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 13
  },
  name: {
    fontWeight: 'bold'
  },
  banner: {
    flex: 1,
    maxHeight: 300,
    height: 300,
  },
  linklogin: {
    color: '#ffffff',
    fontSize: 15
  },
  linksignup: {
    color: '#ffffff',
    fontSize: 15
  },
  btnwrap: {
    width: 340,
    height: 80
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2D2D2D',
  },
  SubmitButtonStyle: {

    marginTop:0,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#0AE88B',
    borderRadius:25,
    borderWidth: 0,
    borderColor: '#fff'
  },
  LoginSubmitButtonStyle: {

    marginTop:0,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#0CB3FF',
    borderRadius:25,
    borderWidth: 0,
    borderColor: '#fff'
  },
  TextStyle:{
    fontFamily: 'simplicitapro-bold',
    color:'#fff',
    textAlign:'center',
  },
  signupbtn:{
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#0AE88B',
    borderRadius:30,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitstartText:{
    fontFamily: 'simplicitapro-bold',
    color:'#fff',
    textAlign:'center',
  },
  BottomTextStyle:{
    fontFamily: 'simplicitapro-bold',
    color:'#fff',
    textAlign:'center',
  },
  link: {
    color: '#255899'
  }
});




