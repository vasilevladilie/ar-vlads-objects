'use strict';

import React, { Component, useState } from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';
var createReactClass = require('create-react-class');

const helloMessage = "Hello World!";
const congratulationsMessage = "Congratulations, you have now ViroReact set up and running!";

// setInitialState("");

var HelloWorldSceneAR = () => {
  
  // setInitialState( { text : "Initializing AR..." });

  const [text, setText] = useState("Initializing AR...");

  return (<ViroARScene></ViroARScene>);
  /*
  return (
    <ViroARScene displayPointCloud={true} onTrackingUpdated={()=>{setText(helloMessage)}}>
      <ViroText text={text} scale={[.1, .1, .1]} height={1} width={14} position={[0, .5, -1]} style={styles.helloWorldTextStyle} />

      <ViroAmbientLight color={"#aaaaaa"} />
      <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        <Viro3DObject
          source={require('./res/emoji_smile/emoji_smile.vrx')}
          position={[0, 0, -1]}
          scale={[.2, .2, .2]}
          type="VRX"
          dragType="FixedDistance" onDrag={()=>{}}
        />

    </ViroARScene>
  );
*/
};

//HelloWorldSceneAR.ini

function HelloWorld() {

  setInitialState("");

  return "";
}
// HelloWorld.setInitialState

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
