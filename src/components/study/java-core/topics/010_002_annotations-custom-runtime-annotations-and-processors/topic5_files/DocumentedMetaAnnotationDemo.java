/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 5: @Documented Meta-Annotation - Javadoc Metadata Preservation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public class DocumentedMetaAnnotationDemo {

    // 1. With @Documented: Will appear in public Javadoc HTML!
    @Documented
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface PublicApiEndpoint {
        String version() default "v1.0";
        String description();
    }

    // 2. Without @Documented: Secret internal annotation (Hidden from Javadoc HTML)
    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface InternalDevHack {}

    public static class StudentPortalService {

        @PublicApiEndpoint(version = "v2.0", description = "Retrieves student report card from Barrackpore DB")
        public void getReportCard(int studentId) {
            System.out.println("Fetching report card for ID: " + studentId);
        }

        @InternalDevHack
        public void bypassCacheForTesting() {
            System.out.println("Internal test routine executed.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: @DOCUMENTED META-ANNOTATION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        StudentPortalService service = new StudentPortalService();
        service.getReportCard(101);

        System.out.println("\n>>> @DOCUMENTED BEST PRACTICES:");
        System.out.println("  - Apply @Documented to public framework annotations (e.g. @Autowired, @Transactional).");
        System.out.println("  - Omit @Documented from private implementation details and internal code linters.");
        System.out.println("==========================================================================");
    }
}
