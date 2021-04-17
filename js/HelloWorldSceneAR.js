'use strict';

import React, { useEffect, useState, useRef } from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroARPlane,
  ViroBox,
  ViroController,
} from 'react-viro';

const helloMessage = "Hello World!";
module.exports = () => {
  
  const [text, setText] = useState("Initializing AR...");

  const controllerRef = useRef(null);

  useEffect(()=>{
    console.log("Hello World!");
  }, [text])
  
  return <ViroARScene physicsWorld={{ gravity:[0,-9.81,0],
   drawBounds: true }}
    displayPointCloud={false}
     onTrackingUpdated={
       ()=>{setText(helloMessage)}
    }
     >
      <ViroText text={text} scale={[.1, .1, .1]} height={1} width={14} position={[0, .5, -1]} style={styles.helloWorldTextStyle} />

      <ViroAmbientLight color={"#aaaaaa"} />
      <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

      <ViroARPlane viroTag="plane1" minHeight={.2} minWidth={.2} alignment={"Horizontal"} >

        {/* Bind controls for interacting with the scene.*/}
        <ViroController reticleVisibility={true}
        controllerVisibility={true}
        ref={controllerRef}
        onClick={() => {console.log("Controller got clicked")}}
        onCollision={() => {console.log("Collision with the controller")}}
        />

        <ViroBox viroTag="box1" 
        position={[.2, .25, -1]} 
        scale={[.5, .5, .5]} 
        physicsBody={{
          type:'Static',
          mass:0,
          force:{value:[0,0,1]},
          torque:[0,30,0],
          onCollision:(collidedTag, collidedPoint, collidedNormal)=>{
            console.log("Viro AR Plane collided "+collidedTag + " " + collidedPoint + " "+collidedNormal);
          }
      }}
     />
      </ViroARPlane>

      <ViroNode viroTag="node1" position={[0,0,-1]} dragType="FixedDistance" onDrag={()=>{console.log("dragged");}} onCollision={(collidedTag, collidedPoint, collidedNormal)=>{
          console.log("Viro Box collided "+collidedTag + " " + collidedPoint + " "+collidedNormal);
        }}>
        <Viro3DObject viroTag="object1" 
          source={require('./res/emoji_smile/emoji_smile.vrx')}
          position={[0, 0, -1]}
          scale={[.2, .2, .2]}
          type="VRX" onCollision={(collidedTag, collidedPoint, collidedNormal)=>{
            console.log("Viro Box collided "+collidedTag + " " + collidedPoint + " "+collidedNormal);
          }}
          />
      </ViroNode>
    </ViroARScene>
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
