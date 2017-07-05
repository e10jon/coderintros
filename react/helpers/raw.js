// @flow

// to regenerate the custom autotrack.custom.js, use:
// ./node_modules/.bin/autotrack -o static/js/autotrack.custom.js -p cleanUrlTracker,eventTracker,outboundFormTracker,outboundLinkTracker,maxScrollTracker,urlChangeTracker

export const gaInit = (trackingId: string, {autoLink = []}: Object = {}) => (
  `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', '${trackingId}', 'auto', {'allowLinker': true});
  ga('require', 'linker');
  ga('require', 'cleanUrlTracker');
  ga('require', 'eventTracker', {'attributePrefix': 'data-ga-', 'events': ['click', 'submit']});
  ga('require', 'outboundFormTracker');
  ga('require', 'outboundLinkTracker');
  ga('require', 'maxScrollTracker');
  ga('require', 'urlChangeTracker');
  ga('linker:autoLink', ${JSON.stringify(autoLink.filter(s => s !== global.HOST))});
  ga('send', 'pageview');`
)

export const fbInit = (appId: string) => (
  `window.fbAsyncInit = function() {
    FB.init({
      appId            : '${appId}',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));`
)

export const fbPixelScriptInit = (pixelId: string) => (
  `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${pixelId}');
  fbq('track', 'PageView');`
)

export const fbPixelNoscriptInit = (pixelId: string) => (
  `<img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"
  />`
)
