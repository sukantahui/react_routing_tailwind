// web.xml order determines chain order
// First: LoggingFilter logs incoming request time
// Second: AuthenticationFilter checks session
// Third: CompressionFilter compresses response if client accepts gzip

public class ChainedFiltersDemo {
    // No actual code – just demonstrating concept
    // In real filters, each filter calls chain.doFilter() to continue.
}