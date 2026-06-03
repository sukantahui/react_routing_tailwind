// ValidationService.java - manual validation and integration with Hibernate
package com.school.service;

import javax.validation.*;
import java.util.Set;

public class ValidationService {

    private static final Validator validator;

    static {
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            validator = factory.getValidator();
        }
    }

    // Validate an object and throw exception if invalid
    public static <T> void validate(T object) throws ValidationException {
        Set<ConstraintViolation<T>> violations = validator.validate(object);
        if (!violations.isEmpty()) {
            StringBuilder sb = new StringBuilder("Validation failed: ");
            for (ConstraintViolation<T> violation : violations) {
                sb.append(violation.getPropertyPath()).append(" ").append(violation.getMessage()).append("; ");
            }
            throw new ValidationException(sb.toString());
        }
    }

    // Validate with groups
    public static <T> void validate(T object, Class<?>... groups) throws ValidationException {
        Set<ConstraintViolation<T>> violations = validator.validate(object, groups);
        if (!violations.isEmpty()) {
            throw new ValidationException(violations.toString());
        }
    }
}