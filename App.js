/**
 * Copyright 2021 Vlad Ilie
 * 
 * Modification done to original ViroSample to create a new project using:
 *  - React Native component style
 *  - React Viro AR elements
 * 
 * Licensed under GNU General Public License v3.0
 *  Permissions of this strong copyleft license are conditioned on making available
 * complete source code of licensed works and modifications, which include larger
 * works using a licensed work, under the same license. Copyright and license
 * notices must be preserved. Contributors provide an express grant of patent rights.
 */

import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');
var VladsObjectsSceneAR = require('./js/VladsObjectsSceneAR');
var InitialARPhysicsSampleScene = require('./js/ARPhysicsSample/BasicPhysicsSample.js');
var InitialVRScene = require('./js/HelloWorldScene');

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_HELLO_WORLD_NAVIGATOR_TYPE = "AR-Hello-World!";
var AR_VLADS_OBJECTS_NAVIGATOR_TYPE = "AR-Vlads-Objects!";
var AR_PHYSICS_SAMPLE_TYPE = "AR-Physics-Sample!";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

//export default class ArVladsObjects extends Component {
module.exports = () => {

  const [navigatorType, setNavigatorType] = useState(defaultNavigatorType);

  // Presents the user with a choice of an AR or VR experience
  function _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          <TouchableHighlight style={localStyles.buttons}
            onPress={_getExperienceButtonOnPress(AR_VLADS_OBJECTS_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>{AR_VLADS_OBJECTS_NAVIGATOR_TYPE}</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={_getExperienceButtonOnPress(AR_PHYSICS_SAMPLE_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>{AR_PHYSICS_SAMPLE_TYPE}</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={_getExperienceButtonOnPress(AR_HELLO_WORLD_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>{AR_HELLO_WORLD_NAVIGATOR_TYPE}</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={_getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>VR</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the Hello World AR experience
  function _getHelloWorldARNavigator() {
    return (
      <ViroARSceneNavigator initialScene={{scene: InitialARScene}} />
    );
  }

  /* 
  * Returns the ViroARSceneNavigator which will start the Vlads projects
  * with Vlads Objects that create an AR experience.
  */
  function _getARVladsObjectsNavigator() {
    return (
      <ViroARSceneNavigator initialScene={{scene: VladsObjectsSceneAR}} />
    );
  }

  function _getARPhysicsSampleNavigator() {
    return (
      <ViroARSceneNavigator initialScene={{scene: InitialARPhysicsSampleScene}} />
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  function _getVRNavigator() {
    return (
      <ViroVRSceneNavigator
        initialScene={{scene: InitialVRScene}}
        onExitViro={() => _exitViro()}/>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  function _getExperienceButtonOnPress(navigatorType) {
    return () => setNavigatorType(navigatorType);
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  function _exitViro() {
    return () => setNavigatorType(UNSET);
  }

  if (navigatorType == UNSET) {
    return _getExperienceSelector();
  } else if (navigatorType == VR_NAVIGATOR_TYPE) {
    return _getVRNavigator();
  } else if (navigatorType == AR_HELLO_WORLD_NAVIGATOR_TYPE) {
    return _getHelloWorldARNavigator();
  } else if (navigatorType == AR_VLADS_OBJECTS_NAVIGATOR_TYPE) {
    return _getARVladsObjectsNavigator(); // InitialARPhysicsSampleScene
  } else if (navigatorType == AR_PHYSICS_SAMPLE_TYPE) {
    return _getARPhysicsSampleNavigator();
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});
