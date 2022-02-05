import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux'
import { store, persistor } from "./src/redux/store";
import {PersistGate} from 'redux-persist/lib/integration/react';
import {AppState,YellowBox,View,Text} from 'react-native';
// import RNExitApp from 'react-native-exit-app';
import ArgCls_Acv from './src/classes/ArgCls_Acv';
import ArgCls_Dash from './src/classes/ArgCls_Dash';
import HomeCenter_data from './src/classes/ArgHomeCenter_data';
import {PIC_REQ_DASH} from './src/classes/ArgFunction';
import RouterComponent from './src/backEnd/router/RooterComponent';
import { dataHomePlaceIconON } from './src/constValue/ConstComponentValue';
// import firebase from 'react-native-firebase';
// import AsyncStorage from '@react-native-community/async-storage';
EStyleSheet.build({
  $fontColor: 'green',
  $bgColor: '#e6e6e6',
  $rem: 16,
});

export default class App extends React.Component{

  // state = {
  //   appState: AppState.currentState,
  // };
  //
  // componentDidMount() {
  //   // setTimeout(() => {
  //   //   RNBootSplash.hide();
  //   // }, 2500);
  //   //---add nik 14000220

  //   //--------
  //   // AppState.addEventListener('change', this._handleAppStateChange);
  // }

async componentDidMount() {
  console.disableYellowBox = true
  YellowBox.ignoreWarnings(['Warning:']);
    this.checkPermission();
    this.createNotificationListeners();
  }
  
  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  //Check whether Push Notifications are enabled or not
  // async checkPermission() {
  //   const enabled = await firebase.messaging().hasPermission();
  //   console.log("ene:",enabled)
  //   if (enabled) {
  //     this.getToken();
  //   } else {
  //     this.requestPermission();
  //   }
  // }

  //Get Device Registration Token
  // async getToken() {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   console.log("Ee:",fcmToken)
  //   if (!fcmToken) {
  //     // console.log("11Ee:",fcmToken)
  //     fcmToken = await firebase.messaging().getToken();
  //     if (fcmToken) {
  //       console.log('fcmToken:', fcmToken);
  //       await AsyncStorage.setItem('fcmToken', fcmToken);
  //     }
  //   }
  //   else{
  //     console.log("ee2:",fcmToken)
  //   }
  // }

  // async requestPermission() {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // If user allow Push Notification
  //     this.getToken();
  //   } catch (error) {
  //     // If user do not allow Push Notification
  //     console.log('Rejected');
  //   }
  // }

  // async createNotificationListeners() {
    
  //   // If your app is in Foreground
   
  //   this.notificationListener = firebase.notifications().onNotification((notification) => {
      
  //   notification.android.setChannelId(notification.data.channelId);
  //   firebase.notifications().displayNotification(notification);
  //       const localNotification = new firebase.notifications.Notification({
  //         show_in_foreground: true,
  //       })
  //       .setNotificationId(notification.notificationId)
  //       .setTitle(notification.title)
  //       .setBody(notification.body)

  //       firebase.notifications()
  //         .displayNotification(localNotification)
  //         .catch(err => console.error(err));
  //   });


    //If your app is in background

    // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //   const { title, body } = notificationOpen.notification;
    //   console.log('onNotificationOpened:');
    //   Alert.alert(title, body)
    // });


    // If your app is closed

    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //     const { title, body } = notificationOpen.notification;
    //     this.showAlert(title, body);
    // }
    // For data only payload in foreground

//     this.messageListener = firebase.messaging().onMessage
// ((message) => {
//       //process data message
//       console.log("Message", JSON.stringify(message));
//     });
//   }
  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
  // componentWillUnmount() {
  //   // AppState.removeEventListener('change', this._handleAppStateChange);
  // }
  //
  // // وضعیت اپ رو اینجا دریافت می کنم
  // _handleAppStateChange = (nextAppState) => {
  //   console.log('App changed :' + nextAppState);
  //   if (nextAppState === 'background') {
  //     console.log('Try to kill App :' + nextAppState);
  //     RNExitApp.exitApp();
  //     global.signalR = false;
  //   }
  //   if (this.state.appState.match(/inactive|background/) && nextAppState === 'active')
  //   {
  //     console.log('App has come to the foreground!' + nextAppState);
  //   }
  //   this.setState({appState: nextAppState});
  // };
  // //
  constructor(props) {
    super(props);

    console.log('Arg Home Started');
    // Global definitions
    // global.inSetting = false;
    global.startapp=false;
    global.server ;
    global.setting.projectName ;
    global.projectNo ;
    // global.setting.pass ;
    // global.setting.apiToken ;

    global.acv = new ArgCls_Acv();
    global.acvEdit ;
    // global.acvListType ;
    global.acvPos ;

    global.dash = new ArgCls_Dash();
    // global.dashEdit ;
    global.DashItem =0;
    global.dashListType ;
    global.dashPos ;
    global.dashObjPos ;
    global.dashObjEdit ;
    global.dashObjType;
    global.dashObjCap;
    global.dashObjData;
    global.dashObjIcon;

    global.sectionEdit ;
    global.secNo ;

    global.newAction ;
    global.ValueTempGlobalACV = [];

    global.picReqFrom = PIC_REQ_DASH;
    global.picDash    = dataHomePlaceIconON[0].name; 
    global.picDashObj = dataHomePlaceIconON[14].name; 
    global.HomeCenterData= new HomeCenter_data();
    global.SavePhonixNo ;
  }

  render() {
    // const persistor = persistStore(store);
    return (
        <Provider store={store}>
          <PersistGate loading={null}  persistor={persistor}>
            
            <View style={{flex:1}}>
              <RouterComponent/>
            </View>
          </PersistGate>

        </Provider>
    );
  }
}

