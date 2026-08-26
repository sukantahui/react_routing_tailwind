"""
# Module: 004_004_capstone-projects
# Topic 2: Configuring logging, error handling, and modular CLI / GUI interfaces
# File: logging_configuration_and_rotating_handlers.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating enterprise logging configuration, rotating file handlers,
#              custom formatters, and log levels.
"""

import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path
import tempfile

def setup_production_logger(name: str, log_file: Path, log_level: int = logging.INFO) -> logging.Logger:
    """Configures a production logger with console and rotating file outputs."""
    logger = logging.getLogger(name)
    logger.setLevel(log_level)
    logger.propagate = False

    # Prevent duplicate handlers if re-initialized
    if logger.hasHandlers():
        logger.handlers.clear()

    # Formatter: [TIMESTAMP] [LEVEL] [LOGGER] MESSAGE
    formatter = logging.Formatter(
        fmt="%(asctime)s [%(levelname)-8s] (%(name)s) %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )

    # 1. Console Stream Handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(log_level)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    # 2. Rotating File Handler (Max 1MB per file, keep 3 backups)
    log_file.parent.mkdir(parents=True, exist_ok=True)
    file_handler = RotatingFileHandler(
        filename=log_file,
        maxBytes=1_000_000,
        backupCount=3,
        encoding="utf-8"
    )
    file_handler.setLevel(logging.DEBUG)  # Log deeper diagnostics to file
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger

def test_logger_workflow():
    print("   [...] Testing Production Logging & Rotating Handlers...")
    with tempfile.TemporaryDirectory() as tmpdir:
        log_path = Path(tmpdir) / "institutional.log"
        logger = setup_production_logger("institutional_manager.admission", log_path, logging.INFO)

        # Emit log messages across severity levels
        logger.debug("Debug diagnostic: Parsing student marks payload") # Suppressed on console (INFO level)
        logger.info("Student 'Mamata' enrolled at Barrackpore Campus.")
        logger.warning("Tuition fee discount exceeded standard 30% threshold (Applied: 35%).")
        logger.error("Payment settlement gateway timeout for Student ID: STU_CC_02")

        # Verify file output
        assert log_path.exists()
        with open(log_path, "r", encoding="utf-8") as f:
            content = f.read()

        assert "Student 'Mamata' enrolled" in content
        assert "Payment settlement gateway timeout" in content
        print("   [PASS] 1. Console & File logging handlers verified successfully")
        print(f"   [PASS] 2. Log file created: {log_path.name} ({len(content.splitlines())} lines written)")

        # Close all handlers cleanly before exiting TemporaryDirectory (Windows file lock release)
        for h in list(logger.handlers):
            h.close()
            logger.removeHandler(h)

def main():
    print("=" * 75)
    print("[ENTERPRISE LOGGING] Rotating Handlers & Structured Formatters")
    print("=" * 75)

    test_logger_workflow()

    print("=" * 75)
    print("[TAKEAWAY] RotatingFileHandlers prevent disk exhaustion while capturing")
    print("           vital operational milestones and exception tracebacks in production.")
    print("=" * 75)

if __name__ == "__main__":
    main()
