# topic11_files/logging_vs_print_debugging.py
# Module: 003_002_basic-exception-handling
# Topic: Debugging techniques & pdb breakpoints
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 11 - File 3: Structured Logging vs `print()` Debugging
Demonstrates:
  1. The 5 standard Python log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
  2. Configuring structured log formats with timestamps, levels, and line numbers
  3. Using `logger.exception()` to capture complete tracebacks automatically
  4. Dynamically toggling log verbosity between Development and Production
"""

import logging
import sys

def configure_institutional_logger(name: str, level=logging.DEBUG) -> logging.Logger:
    """Configures a professional enterprise console logger."""
    logger = logging.getLogger(name)
    logger.setLevel(level)

    # Avoid duplicate handlers if re-run:
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        # Formatted with Timestamp, Log Level, Component, Line Number, Message:
        formatter = logging.Formatter(
            fmt="[%(asctime)s] [%(levelname)-8s] [%(name)s:%(lineno)d] %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    return logger


def process_student_scholarship(logger: logging.Logger, student_id: str, marks_pct: float, base_fee: float):
    logger.debug(f"Initiating scholarship audit for Student ID: {student_id} (Marks: {marks_pct}%)")

    if marks_pct >= 90.0:
        logger.info(f"Student {student_id} qualified for 25% Merit Scholarship!")
        discount = base_fee * 0.25
    elif marks_pct >= 75.0:
        logger.info(f"Student {student_id} qualified for 10% Academic Scholarship.")
        discount = base_fee * 0.10
    else:
        logger.warning(f"Student {student_id} marks {marks_pct}% below scholarship threshold (75%).")
        discount = 0.0

    net = base_fee - discount
    logger.debug(f"Calculated Net Tuition: INR {net:,.2f}")
    return net


def demonstrate_structured_logging():
    print("=" * 70)
    print("CODER & ACCOTAX - STRUCTURED LOGGING VS PRINT DEBUGGING")
    print("=" * 70)

    logger = configure_institutional_logger("ScholarshipService", level=logging.DEBUG)

    # 1. High-scoring student (Triggers DEBUG and INFO)
    print("1. Auditing Top Student (Marks: 94.5%):")
    process_student_scholarship(logger, "STU-101", 94.5, 20000.0)

    # 2. Borderline student (Triggers WARNING)
    print("\n2. Auditing Low-Scoring Student (Marks: 68.0%):")
    process_student_scholarship(logger, "STU-102", 68.0, 20000.0)

    # 3. Capturing complete exception traceback with logger.exception()
    print("\n3. Capturing Exception with `logger.exception()`:")
    try:
        raise ValueError("Database connection dropped during fee write!")
    except ValueError:
        logger.exception("Failed to commit scholarship discount to database ledger:")

    print("\n[PASSED] Structured Logging Suite Demonstrated Successfully.")


if __name__ == "__main__":
    demonstrate_structured_logging()
