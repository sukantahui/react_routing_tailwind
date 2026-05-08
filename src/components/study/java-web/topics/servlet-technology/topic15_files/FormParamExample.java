package com.example.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/feedback")
public class FormParamExample {
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public String submit(@FormParam("email") String email,
                         @FormParam("message") String message) {
        return "Received from " + email + ": " + message;
    }
}