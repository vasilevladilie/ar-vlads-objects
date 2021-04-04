'use strict';

import React, {useState} from 'react';
const { ViroARScene, Viro3DObject } = require("react-viro");

module.exports = () => {

    const [color, setColor] = useState({color :"rgb(000000)"});

    function _onLoadStart() {
        console.log("OBJ loading has started");
    }
    
    function _onLoadEnd() {
        console.log("OBJ loading has finished");
    }
    
    function _onError(event) {
        console.log("OBJ loading failed with error: " + event.nativeEvent.error);
    }
    
    return <ViroARScene>
        <Viro3DObject
                position={[0, 0, -1]}
                scale={[.2, .2, .2]}
                onLoadStart={_onLoadStart}
                onLoadEnd={_onLoadEnd}
                onError={_onError} 
                dragType="FixedDistance" onDrag={()=>{}}  
        />
    </ViroARScene>
}
