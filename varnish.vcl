vcl 4.0;

backend wordpress {
  .host = "wordpress";
  .port = "80";
}

backend react {
  .host = "react";
  .port = "3000";
}

sub vcl_pipe {
  if (req.http.upgrade) {
    set bereq.http.upgrade = req.http.upgrade;
  }
}

sub vcl_recv {
  if (req.http.Upgrade ~ "(?i)websocket") {
    return (pipe);
  }

  if (req.method == "BAN") {
    ban("req.url ~ " + req.url);
    return (synth(200, "OK"));
  }

  if (req.url !~ "^\/wp-(admin|login)" && req.url !~ "preview=true") {
    unset req.http.Cookie;
  }

  if (req.url ~ "^/wp-") {
    set req.backend_hint = wordpress;
  } else {
    set req.backend_hint = react;
  }
}

sub vcl_backend_response {
  set beresp.do_gzip = true;
}
