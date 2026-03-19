/**
 * This file illustrates the conceptual flow of a request through the tiers.
 * It's a simplified simulation, not meant to be run as a web app.
 */
public class RequestResponseCycle {

    // Simulated HTTP request
    static class HttpRequest {
        String path;
        String userId;
    }

    // Simulated HTTP response
    static class HttpResponse {
        String content;
    }

    // Web Tier (Servlet)
    static class WebTier {
        public void handleRequest(HttpRequest req, HttpResponse res) {
            System.out.println("Web Tier: Received request for " + req.path);

            // Call business tier
            BusinessTier business = new BusinessTier();
            String userData = business.getUserData(req.userId);

            // Prepare response (simulate forwarding to JSP)
            res.content = "<html><body>" + userData + "</body></html>";
            System.out.println("Web Tier: Response ready");
        }
    }

    // Business Tier
    static class BusinessTier {
        public String getUserData(String userId) {
            System.out.println("Business Tier: Validating and processing...");
            if (userId == null) return "Invalid user";

            // Call data tier
            DataTier data = new DataTier();
            return data.fetchUserProfile(userId);
        }
    }

    // Data Tier
    static class DataTier {
        public String fetchUserProfile(String userId) {
            System.out.println("Data Tier: Querying database for user " + userId);
            // Simulate database result
            return "User{id=" + userId + ", name='Swadeep', city='Barrackpore'}";
        }
    }

    public static void main(String[] args) {
        // Simulate a client request
        HttpRequest req = new HttpRequest();
        req.path = "/profile";
        req.userId = "123";

        HttpResponse res = new HttpResponse();

        WebTier web = new WebTier();
        web.handleRequest(req, res);

        System.out.println("\nFinal response to client:\n" + res.content);
    }
}