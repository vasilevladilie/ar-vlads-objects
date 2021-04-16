'use strict';

import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
const { ViroARScene, Viro3DObject, ViroARPlane, ViroAmbientLight, ViroMaterials, ViroText } = require("react-viro");

module.exports = () => {


    ViroMaterials.createMaterials({

        ground: {
            diffuseColor:"#61270e"
        },
        groundHit:{
            diffuseColor:"#85190b"
        },
        textFrontMaterial:{
            diffuseColor:"#FFFFFF"
        },
        textBackMaterial:{
            diffuseColor:"#0000FF"
        },
        textSideMaterial:{
            diffuseColor:"#00FF00"
        }
    });

    var textStyles = StyleSheet.create({

        projectDisciplineStyle:{
            fontFamily:'American Typewriter',
            fontSize:10,
            color:"#FF00FF",
            textAlignVertical:"center",
            textAlign:"center"
        },
        projectNameStyle:{
            fontFamily:'American Typewriter',
            fontSize:12,
            fontWeight:"400",
            color:"#FF00FF",
            textAlignVertical:"center",
            textAlign:"center"
        },
    });

    const [planeData, setPlaneData] = useState({foundPlane:false, planePosition:[0, 0, 0], planeRotation:[0, 0, 0]});

    const [controllerRef] = useRef(null);

    const [ballRef] = useRef(null);

    const [arSceneRef] = useRef(null);
    
    const [firstDetectedPlaneRef] = useRef(null);

    const [floorSurfaceRef] = useRef(null);

    const projectDiscipline = "Inteligenta Ambientala si Realitate Augmentata";
    const projectName = "O minge pe o suprafata plana detectata";

    function _onLoadStart() {
        console.log("OBJ loading has started");
    }
    
    function _onLoadEnd() {
        console.log("OBJ loading has finished");
    }
    
    function _onError(event) {
        console.log("OBJ loading failed with error: " + event.nativeEvent.error);
    }

    /*
    * (Operation: push, Operands: controller, ball) Push against the ball with an impulse force, at the onClicked location, and
    * with a force direction originating from the controller (controller forward).
    */
    function pushImpulseCallback(itemTag) {

        if (ballRef != null && controllerRef != null) {
            return (clickedPos, source) => {
                controllerRef.getControllerForwardAsync().then((forward) => {
                    var pushStrength = 3;
                    var pushImpulse = [forward[0] * pushStrength, forward[1] * pushStrength, forward[2] * pushStrength];
                    ballRef.getTransformAsync().then((transform) => {
                        var pos = transform.position;
                        var pushPosition = [clickedPos[0] - pos[0], clickedPos[1] - pos[1], clickedPos[2] - pos[2]];
                        ballRef.applyImpulse(pushImpulse, pushPosition);
                    });
                });
            }
        }
        return null;
    }

    /*
    * (Operation: pull, Operands: camera, ball) Pull the ball with a constant force towards the camera.
    */
    function pullForceCallback(itemTag) {

        if (ballRef != null && sceneRef != null) {
            return (state, position, source) => {
                sceneRef.getCameraOrientationAsync().then((camTransform) => {
                    ballRef.getTransformAsync().then((ballTransform) => {
                        var ballPos = ballTransform.position;
                        var camPos = camTransform.position;
                        var pullVec = [camPos[0] - ballPos[0], camPos[1] - ballPos[1], camPos[2] - ballPos[2]];

                        var pullStrength = 5; // Force multiplier.
                        var pullStrengthVec = [pullVec[0] * pullStrength, pullVec[1] * pullStrength, pullVec[2] * pullStrength];  // Force in newtons
                        
                        const CLICKED_STATE = 3;
                        if (state == CLICKED_STATE) {
                            ballRef.setNativeProps({physicsBody:{
                                force: {value:pullStrengthVec},
                                type:'Dynamic',
                                mass:4,
                                enabled:true,
                                useGravity:true,
                                shape:{type:'Sphere', params:[0.14]},
                                restitution:0.65
                                }
                            });

                        } else {
                            ballRef.setNativeProps({physicsBody:{
                                type:'Dynamic',
                                mass:4,
                                enabled:true,
                                useGravity:true,
                                shape:{type:'Sphere', params:[0.14]},
                                restitution:0.65
                                }
                            });
                        }
                    });
                });
            }
        }
        return null;
    }

    function onFloorCollision(viroTag, collidedPoint, collidedNormal) {

        if (viroTag == "Surface") {
            floorSurfaceRef.setNativeProps({materials:['groundHit']});
            setTimeout(() => {
                    floorSurfaceRef.setNativeProps({materials:['ground']});
            }, 1000);
        }
    }

    return (<ViroARScene physicsWorld={{gravity:[0, -9.81, 0], drawBounds:true}} ref={arSceneRef}>
                {/* I.a. Scene lighting */}
                <ViroAmbientLight color={"#0000FF"} intensity={10} temperature={6500}/>
                <ViroLightingEnvironment source={require('./res/lighting/ibl_mans_outside.hdr')}/>

                <ViroNode position={[2.0, 5.0, -2.0]}
                    rotation={[0, 45, 45]}
                    scale={[2.0, 2.0, 2.0]}
                    transformBehaviours={"billboard"}>

                    <ViroText text={projectDiscipline}
                        style={textStyles.projectDisciplineStyle}
                        textLineBreakMode={"justify"}
                        textClipMode={"clipToBounds"}
                        width={2}
                        height={2}
                        position={[0,-2,-5]}/>
                    <ViroText text={projectName}
                        style={textStyles.projectNameStyle}
                        textLineBreakMode={"justify"}
                        textClipMode={"clipToBounds"}
                        width={2}
                        height={2}
                        position={[0,0,-5]}/>
                </ViroNode>
                
                {/* I.b World plane */}
                <ViroARPlane key={"LockedToFirstDetectedPlane"}
                    ref={firstDetectedPlaneRef}
                    onAnchorFound={(anchorMap) => {
                        if (anchorMap.type != "plane")
                            return;

                        firstDetectedPlaneRef.setNativeProps({"pauseUpdates":true});
                        var worldCenterPosition = [anchorMap.position[0] + anchorMap.center[0],
                        anchorMap.position[1] + anchorMap.center[1],
                        anchorMap.position[2] + anchorMap.center[2]];

                        setPlaneData({foundPlane:true,
                            planePosition:worldCenterPosition,
                            planeRotation:anchorMap.rotation});

                    }}
                >
                    {/* II. AR scene node */}
                    <ViroNode position={planeData.planePosition}>

                        {/* III. AR node controller for actions */}
                        {/* Bind controls for interacting with the scene.*/}
                        <ViroController reticleVisibility={true}
                            controllerVisibility={true}
                            ref={controllerRef}
                            onClick={() => {}}
                        />

                        {/* IV. AR basketball 3D object */}
                        <Viro3DObject ref={ballRef}
                            source={require("./res/basketball/object_basketball_pbr.vrx")}
                            position={[0, 0, -1]}
                            scale={[.2, .2, .2]}
                            rotation={[0, 0, 0]}
                            resources={[
                                require("./res/basketball/blinn1_Base_Color.png"),
                                require("./res/basketball/blinn1_Metallic.png"),
                                require("./res/basketball/blinn1_Normal_OpenGL.png"),
                                require("./res/basketball/blinn1_Roughness.png")
                            ]}
                            type="VRX"

                            viroTag="basketball"

                            physicsBody={{
                                friction: 0.6,
                                type: "Dynamic",
                                mass: 4,
                                enabled: true,
                                useGravity: true,
                                shape:{type:'Sphere', params:[0.14]},
                                restitution:0.65                    
                            }}

                            onLoadStart={_onLoadStart}
                            onLoadEnd={_onLoadEnd}
                            onError={_onError} 
                            dragType="FixedDistance"
                            onDrag={()=>{}} 
                            onClick={pushImpulseCallback("basketball")}
                        />

                        {/* V. AR surface used as ground */}
                        <ViroQuad position={[0,0,0]}
                            scale={[6.0, 8.0, 1.0]}
                            rotation={[-90, 0, 0]}
                            physicsBody={{ type:'Static', restitution:0.75 }}
                            viroTag="Surface"
                            onClickState={pullForceCallback("Surface")}
                            ref={floorSurfaceRef}
                            onCollision={onFloorCollision}
                            materials={'ground'}
                         />
                    </ViroNode>
                </ViroARPlane>
    </ViroARScene>)
}
