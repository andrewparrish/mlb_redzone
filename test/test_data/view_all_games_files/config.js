(function () {
    'use strict';

    var configBrowser = {

        config: {
            text: {
                useXhr: function (url, protocol, hostname, port) {
                    return true;
                }
            }
        },

        paths: {
            // libs
            "jquery": "bam.requirejs.configs/jquery.stub",
            "hogan": "requirejs-hogan-plugin/hogan",

            // require plugins
            "hgn": "requirejs-hogan-plugin/hgn",
            "text": "requirejs-text/text"

        },

        shim: {
            "jquery": {
                exports: "jQuery"
            }
        }

    };

    var configBuild = {

        paths: {
            // libs
            "jquery": "empty:",
            "hogan": "requirejs-hogan-plugin/hogan",

            // require plugins
            "hgn": "requirejs-hogan-plugin/hgn",
            "text": "requirejs-text/text",

            // BAM libs
            "bam-video-bootstrap" : "empty:",
            "bam-browser-sdk" : "empty:",
            "bam-browser-sdk-service-account-manager" : "empty:",
            "bam-browser-sdk-util-login" : "empty:",
            "bam-sdk-auth-wrapper" : "empty:",
            "bam-sdk-profile-storage" : "empty:"

        },

        exclude: [
            "jquery",
            "bam-video-bootstrap",
            "bam-browser-sdk",
            "bam-browser-sdk-service-account-manager",
            "bam-browser-sdk-util-login",
            "bam-sdk-auth-wrapper",
            "bam-sdk-profile-storage"
        ],

        shim: {
            "jquery": {
                exports: "jQuery"
            }
        },

        packages: [{
            name: 'moment',
            location: 'moment',
            main: 'moment'
        }]

    };


    if (typeof module !== 'undefined' && module.exports) {
        // For nodejs
        module.exports = configBuild;
    } else if (typeof require.config !== 'undefined') {
        // For requirejs
        require.config(configBrowser);
    }
})();
