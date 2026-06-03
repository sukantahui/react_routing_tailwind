package com.example.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/calc")
public class PathParamExample {
    @GET
    @Path("/add/{a}/{b}")
    @Produces(MediaType.TEXT_PLAIN)
    public int add(@PathParam("a") int a, @PathParam("b") int b) {
        return a + b;
    }

    @GET
    @Path("/greet")
    @Produces(MediaType.TEXT_PLAIN)
    public String greet(@QueryParam("name") String name) {
        return "Hello " + (name != null ? name : "Guest");
    }
}