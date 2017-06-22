vcl 4.0;

import std;

backend react {
  .host = "react";
  .port = "3000";
}

backend wordpress {
  .host = "wordpress";
  .port = "80";
}

acl purgers {
  PURGERS_ACL
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
  # in production, client.ip will never match our acl,
  # because of forwarding through ELB, cloudflare, etc.
  set req.http.X-Real-IP = regsub(req.http.X-Forwarded-For, "^(^[^,]+),?.*$", "\1");

  if (req.method == "BAN") {
    if (client.ip ~ purgers || std.ip(req.http.X-Real-IP, "0.0.0.0") ~ purgers) {
      ban("req.url ~ " + req.url);
      return (synth(200, "Banned"));
    } else {
      return (synth(403, "Invalid IP address"));
    }
  }

  if (req.url == "/health") {
    return (synth(200, "Healthy"));
  }

  # unset the cookie so that varnish caches the response
  if (req.url !~ "^/wp-(admin|login)" && req.url !~ "preview=true") {
    unset req.http.Cookie;
  }

  if (req.url ~ "^/wp-" || req.url ~ "^/feed" || req.url ~ "^/sitemap" || req.url ~ "^/xmlrpc.php") {
    set req.backend_hint = wordpress;
  } else {
    set req.backend_hint = react;
  }

  if (req.http.Upgrade ~ "(?i)websocket") {
    return (pipe);
  }
}

# let cloudflare do gzipping, and save our spare server resources
# sub vcl_backend_response {
#   set beresp.do_gzip = true;
# }
