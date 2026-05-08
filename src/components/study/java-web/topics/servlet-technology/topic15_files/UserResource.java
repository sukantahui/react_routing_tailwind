package com.example.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    private static Map<Integer, User> users = new ConcurrentHashMap<>();
    private static int idCounter = 1;

    @GET
    public List<User> getAll() {
        return new ArrayList<>(users.values());
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") int id) {
        User user = users.get(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(user).build();
    }

    @POST
    public Response create(User user) {
        user.setId(idCounter++);
        users.put(user.getId(), user);
        return Response.status(Response.Status.CREATED).entity(user).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") int id, User updated) {
        if (!users.containsKey(id)) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        updated.setId(id);
        users.put(id, updated);
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") int id) {
        if (users.remove(id) == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }
}

// Simple User model
class User {
    private int id;
    private String name;
    // getters/setters omitted for brevity
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}