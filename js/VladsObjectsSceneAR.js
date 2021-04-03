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
        <Viro3DObject source={require('./res/ar/nicecar/BMW_m5_f90.obj')}
        resources={[require('./res/ar/nicecar/BMW_m5_f90.mtl'),
                    require('./res/ar/nicecar/Textures/alcantara.png'),
                    require('./res/ar/nicecar/Textures/badge.png'),
                    require('./res/ar/nicecar/Textures/badges_etc_n.png'),
                    require('./res/ar/nicecar/Textures/badges_etc.png'),
                    require('./res/ar/nicecar/Textures/Black.png'),
                    require('./res/ar/nicecar/Textures/bridgestone_DISP.png'),
                    require('./res/ar/nicecar/Textures/bridgestone_NRM.png'),
                    require('./res/ar/nicecar/Textures/bridgestone_OCC.png'),
                    require('./res/ar/nicecar/Textures/bridgestone.png'),
                    require('./res/ar/nicecar/Textures/bridgestone_SPEC.png'),
                    require('./res/ar/nicecar/Textures/cab_etc_ap.png'),
                    require('./res/ar/nicecar/Textures/carbon_fibre_dark_grey_mat00_etc.png'),
                    require('./res/ar/nicecar/Textures/car_chassis_n.png'),
                    require('./res/ar/nicecar/Textures/car_chassis.png'),
                    require('./res/ar/nicecar/Textures/chm_normal.png'),
                    require('./res/ar/nicecar/Textures/Chrome.png'),
                    require('./res/ar/nicecar/Textures/common_black.png'),
                    require('./res/ar/nicecar/Textures/common_bright.png'),
                    require('./res/ar/nicecar/Textures/common_chrome.png'),
                    require('./res/ar/nicecar/Textures/common_dark.png'),
                    require('./res/ar/nicecar/Textures/common_dirt.png'),
                    require('./res/ar/nicecar/Textures/common_silvery.png'),
                    require('./res/ar/nicecar/Textures/dirt_black.png'),
                    require('./res/ar/nicecar/Textures/Engine.png'),
                    require('./res/ar/nicecar/Textures/FM_misc.png'),
                    require('./res/ar/nicecar/Textures/interior.png'),
                    require('./res/ar/nicecar/Textures/int_etc_ap.png'),
                    require('./res/ar/nicecar/Textures/int_etc.png'),
                    require('./res/ar/nicecar/Textures/leather_cuoio_mat01_etc.png'),
                    require('./res/ar/nicecar/Textures/lights_etc_DISP.png'),
                    require('./res/ar/nicecar/Textures/lights_etc_NRM.png'),
                    require('./res/ar/nicecar/Textures/lights_etc_OCC.png'),
                    require('./res/ar/nicecar/Textures/lights_etc.png'),
                    require('./res/ar/nicecar/Textures/lights_etc_SPEC.png'),
                    require('./res/ar/nicecar/Textures/Lights_White.png'),
                    require('./res/ar/nicecar/Textures/metall.png'),
                    require('./res/ar/nicecar/Textures/misc_etc_n.png'),
                    require('./res/ar/nicecar/Textures/misc_etc.png'),
                    require('./res/ar/nicecar/Textures/new_glasswindows.png'),
                    require('./res/ar/nicecar/Textures/new_rotor_n.png'),
                    require('./res/ar/nicecar/Textures/new_rotor.png'),
                    require('./res/ar/nicecar/Textures/nomer_COLOR.png'),
                    require('./res/ar/nicecar/Textures/nomer_NRM.png'),
                    require('./res/ar/nicecar/Textures/plastic_leather_black_mat03_etc.png'),
                    require('./res/ar/nicecar/Textures/speaker_mesh_silver_mat05_etc.png'),
                    require('./res/ar/nicecar/Textures/sticha.png'),
                    require('./res/ar/nicecar/Textures/stiche.png'),
                    require('./res/ar/nicecar/Textures/suede_black_mat04_etc.png'),
                    require('./res/ar/nicecar/Textures/sw_etc_ap2.png'),
                    require('./res/ar/nicecar/Textures/sw_etc_ap.png'),
                    require('./res/ar/nicecar/Textures/sw_etc_DISP.png'),
                    require('./res/ar/nicecar/Textures/sw_etc_NRM.png'),
                    require('./res/ar/nicecar/Textures/sw_etc_OCC.png'),
                    require('./res/ar/nicecar/Textures/sw_etc.png'),
                    require('./res/ar/nicecar/Textures/sw_etc_SPEC.png'),
                    require('./res/ar/nicecar/Textures/tyre.png'),
                    require('./res/ar/nicecar/Textures/wheels_d.png'),
                    require('./res/ar/nicecar/Textures/wheels_n.png')]
                }
                type="OBJ"
                position={[0, 0, -1]}
                scale={[.2, .2, .2]}
                onLoadStart={_onLoadStart}
                onLoadEnd={_onLoadEnd}
                onError={_onError} 
                dragType="FixedDistance" onDrag={()=>{}}  
        />
    </ViroARScene>
}
