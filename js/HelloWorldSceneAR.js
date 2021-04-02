'use strict';

import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
} from 'react-viro';

const helloMessage = "Hello World!";
module.exports = () => {
  
  const [text, setText] = useState("Initializing AR...");

  useEffect(()=>{
    console.log("Hello World!");
  }, [text])
  
  return (
    <ViroARScene displayPointCloud={false} onTrackingUpdated={()=>{setText(helloMessage)}}>
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
};

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
