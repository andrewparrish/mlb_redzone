define('bridge/services/social/bitly/bitly', function( require, exports, module ) {
    var cache = {},
        EVENT_URL_LOADED = "urlLoaded",

        dfd = $.Deferred(),

      users = {
          mlb  : {login : 'mlbam', api:'R_a7e33697d1994f138f490d325ed1539f'},
          milb : {login : 'milb',  api:'R_0afcd900266c4a74acce538f54f1b1a0'},
          worldbaseballclassic  : {login : 'mlbam', api:'R_a7e33697d1994f138f490d325ed1539f'},
          usabaseball  : {login : 'mlbam', api:'R_a7e33697d1994f138f490d325ed1539f'},
          yesnetwork  : {login : 'yesnetwork', api:'R_c7696069b0ef4a3cb4576979bc14a454'}
        }, 
        getSid = function(cfg) {
            if (cfg) {
                return cfg;
            }

            return window.location.host.split(".").splice(-2, 1);

        };

    //Bam Module
    module = (function () {
        function getShortenUrl(url, format, config) {

            if (!users[getSid(config)]) {
                return {data:url}
            }

            if (cache[url]) {
                return cache[url]
            }

            return  $.ajax({
                dataType: "jsonp",

                url: "http://api.bitly.com/v3/shorten?login="+users[getSid(config)].login+"&apiKey="+users[getSid(config)].api+"&format=json",

                data: {
                    longUrl: url
                },
                success: function (resp) {
                    cache[url] = resp;
                }
            });
        };

        /*
         * Bitly Contrusctor
         */

        function Bitly(url, format, config) {
            if (!(this instanceof Bitly)) {
                return new Bitly(url, format, config);
            }
            this.url = url;
            this.format = format;
            this.config = config;
        };

        Bitly.prototype = {

            shorten: function () {
                var that = this;
                $.when(getShortenUrl(this.url, this.format, this.config)).done(function (resp) {
                    that.trigger(EVENT_URL_LOADED,[resp.data.url]);
                    console.log(that);
                });
                return this;
            }

        };

        $.bindable(Bitly.prototype);

        return {
            url: Bitly,
            getShortenUrl: getShortenUrl
        }

    })();

    $.extend(exports, module);

});