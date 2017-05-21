if(typeof(tdIdsync) != "object" || typeof(tdIdsync.load_pixel) != "function") {
    var tdIdsync = {
        load_pixel: function(src) {
            var img;
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
                img = new Image();
            } else {
                img = document.createElement('img');
            }
            img.src = src;
            img.width = 0;
            img.height = 0;
            img.className = "triton-pixel";
            document.body.appendChild(img);
        },
        load_script: function(src) {
            var js = document.createElement('script');
            js.type = 'text/javascript';
            js.src = src;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(js, s);
        }
    }
}
tdIdsync.load_pixel("http://log.targetspot.com/callback/uuid?http://cmod.live.streamtheworld.com/cookiesync/pixel.gif?partner=ts&uid=$UID");
tdIdsync.load_pixel("http://t4.liverail.com/?metric=csync&p=9001&s=db4a9b00-490b-43a5-b4ac-72627d7a34b2");
tdIdsync.load_pixel("http://match.adsrvr.org/track/cmf/generic?ttd_pid=tpqk5an&ttd_tpi=1");
