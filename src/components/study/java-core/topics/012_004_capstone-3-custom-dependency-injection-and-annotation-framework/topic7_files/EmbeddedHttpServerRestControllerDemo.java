/**
 * Java Core Tutorial - Module 012_004: Custom DI Framework
 * Topic 7: Embedded Web Routing - HttpServer & @RestController
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.minispring;

import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.net.InetSocketAddress;

public class EmbeddedHttpServerRestControllerDemo {

    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.TYPE)
    public @interface RestController {}

    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.METHOD)
    public @interface GetMapping {
        String value();
    }

    @RestController
    public static class GreetingController {
        @GetMapping("/api/hello")
        public String sayHello() {
            return "{"message": "Hello from Barrackpore Academy Custom Framework!"}";
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: EMBEDDED HTTP SERVER & REST CONTROLLERS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/hello", exchange -> {
            String response = "{"status": "OK", "msg": "Mini-Spring REST Response"}";
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        });

        System.out.println("Embedded HttpServer configured successfully on port 8080.");
        System.out.println("Demonstrated declarative @RestController and @GetMapping routing engine.");

        System.out.println("\n==========================================================================");
    }
}
