vcl 4.0;

backend react {
  .host = "react";
  .port = "3000";
}

backend wordpress {
  .host = "wordpress";
  .port = "80";
}

sub vcl_hash {
  hash_data(req.http.X-Forwarded-Proto);
}

sub vcl_pipe {
  if (req.http.upgrade) {
    set bereq.http.upgrade = req.http.upgrade;
  }
}

sub vcl_recv {
  if (req.method == "BAN") {
    ban("req.url ~ " + req.url);
    return (synth(200, "OK"));
  }

  if (req.url !~ "^/feed" && req.url !~ "^/sitemap" && req.url !~ "^\/wp-(admin|login)" && req.url !~ "preview=true") {
    unset req.http.Cookie;
  }

  if (req.url ~ "^/wp-" || req.url ~ "^/feed" || req.url ~ "^/sitemap") {
    set req.backend_hint = wordpress;
  } else {
    set req.backend_hint = react;
  }

  if (req.http.Upgrade ~ "(?i)websocket") {
    return (pipe);
  }
}

sub vcl_backend_response {
  set beresp.do_gzip = true;
}
