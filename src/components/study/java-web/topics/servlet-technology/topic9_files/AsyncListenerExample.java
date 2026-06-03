import javax.servlet.*;
import javax.servlet.annotation.*;

@WebListener
public class CustomAsyncListener implements AsyncListener {
    @Override
    public void onStartAsync(AsyncEvent event) throws IOException {
        System.out.println("Async started: " + event.getAsyncContext().getRequest().getRequestURI());
    }

    @Override
    public void onComplete(AsyncEvent event) throws IOException {
        System.out.println("Async completed");
    }

    @Override
    public void onTimeout(AsyncEvent event) throws IOException {
        System.out.println("Async timeout! Sending error response.");
        event.getAsyncContext().getResponse().sendError(HttpServletResponse.SC_GATEWAY_TIMEOUT);
        event.getAsyncContext().complete();
    }

    @Override
    public void onError(AsyncEvent event) throws IOException {
        System.out.println("Async error: " + event.getThrowable().getMessage());
        event.getAsyncContext().getResponse().sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        event.getAsyncContext().complete();
    }
}