/*****************************
 * environment.js
 * path: '/config/env.js'
 ******************************/

import Constants from "expo-constants";
import { Platform } from "react-native";

export default function getENVFunctions(env = Constants.manifest.releaseChannel) {
    const localhost = 'https://gorgeous-kyiv-kpz7uyk4xkhf.vapor-farm-b1.com/api';
    const buildNo = '11921';
    const ENV = {
        version: "0.0.1",
        local: {
            apiUrl: localhost,
            build: buildNo+'-dev-source'
            // Add other keys you want here
        },
        dev: {
            apiUrl: localhost,
            build: buildNo+'-alpha'
            // Add other keys you want here
        },
        staging: {
            apiUrl: "https://ac-api-dev.capeandbay.com/api",
            build: buildNo+'-beta'
            // Add other keys you want here
        },
        prod: {
            apiUrl: "https://ac-api.capeandbay.com/api",
            build: buildNo
            // Add other keys you want here
        }
    };

    const getBuildVersion = () => {
        return ENV.version;
    };
    const getEnvVars = (env) => {
        // What is __DEV__ ?
        // This variable is set to true when react-native is running in Dev mode.
        // __DEV__ is true when run locally, but false when published.
        if (__DEV__) {
            //alert('In Dev mode, channel - '+env);
            return ENV.local;
        }
        else {
            let res = '';
            //alert('In Prod mode, channel - '+env);
            switch(env) {
                case 'prod':
                    console.log('Getting prod environment URL');
                    res = ENV.prod;
                    break;

                case 'staging':
                    console.log('Getting stage environment URL');
                    res = ENV.staging;
                    break;
                default:
                    console.log('Getting dev environment URL');
                    res = ENV.dev;
            }

            return res;
        }
    };

    return {
        getBuildVersion: getBuildVersion(),
        getEnvVars: getEnvVars(env)
    };
}
