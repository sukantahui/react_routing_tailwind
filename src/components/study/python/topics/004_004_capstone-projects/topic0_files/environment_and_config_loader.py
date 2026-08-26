"""
# Module: 004_004_capstone-projects
# Topic 0: End-to-End project architecture & clean directory layout
# File: environment_and_config_loader.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating 12-factor configuration loading via environment variables and dataclasses.
"""

import os
from dataclasses import dataclass
from pathlib import Path

@dataclass(frozen=True)
class AppConfig:
    """Type-safe, immutable application configuration container."""
    app_env: str
    database_url: str
    log_level: str
    default_campus: str
    max_batch_size: int
    enable_sms_alerts: bool

    @classmethod
    def from_env(cls) -> "AppConfig":
        """Loads and parses environment configuration with sensible defaults."""
        return cls(
            app_env=os.environ.get("APP_ENV", "development"),
            database_url=os.environ.get("DATABASE_URL", "sqlite:///institutional_data.db"),
            log_level=os.environ.get("LOG_LEVEL", "INFO").upper(),
            default_campus=os.environ.get("DEFAULT_CAMPUS", "Barrackpore"),
            max_batch_size=int(os.environ.get("MAX_BATCH_SIZE", "30")),
            enable_sms_alerts=os.environ.get("ENABLE_SMS_ALERTS", "false").lower() in ("true", "1", "yes")
        )

def test_config_loader():
    print("   [...] Testing AppConfig Environment Loader...")

    # 1. Test default configuration loading
    cfg = AppConfig.from_env()
    assert cfg.default_campus == "Barrackpore"
    assert cfg.max_batch_size == 30
    assert cfg.enable_sms_alerts is False
    print("   [PASS] 1. Default configuration loaded cleanly:")
    print(f"          - Environment: {cfg.app_env}")
    print(f"          - DB URL:      {cfg.database_url}")
    print(f"          - Campus:      {cfg.default_campus} (Batch Max: {cfg.max_batch_size})")

    # 2. Test environment variable overrides
    os.environ["DEFAULT_CAMPUS"] = "Kolkata"
    os.environ["MAX_BATCH_SIZE"] = "50"
    os.environ["ENABLE_SMS_ALERTS"] = "true"

    custom_cfg = AppConfig.from_env()
    assert custom_cfg.default_campus == "Kolkata"
    assert custom_cfg.max_batch_size == 50
    assert custom_cfg.enable_sms_alerts is True
    print("   [PASS] 2. Environment overrides parsed successfully:")
    print(f"          - Campus:      {custom_cfg.default_campus} (Batch Max: {custom_cfg.max_batch_size})")
    print(f"          - SMS Alerts:  {custom_cfg.enable_sms_alerts}")

def main():
    print("=" * 75)
    print("[12-FACTOR CONFIG] Strongly-Typed Immutable Configuration Loader")
    print("=" * 75)

    test_config_loader()

    print("=" * 75)
    print("[TAKEAWAY] Using frozen dataclasses for configuration ensures all environment")
    print("           secrets and flags are validated and typed before application startup.")
    print("=" * 75)

if __name__ == "__main__":
    main()
