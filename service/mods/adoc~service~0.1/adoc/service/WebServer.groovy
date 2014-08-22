package adoc.server;

vertx.createHttpServer().requestHandler { req ->
  req.response.end "<html><body><h1>Hello fs vert.x!</h1></body></html>"
}.listen(8080, "localhost")

