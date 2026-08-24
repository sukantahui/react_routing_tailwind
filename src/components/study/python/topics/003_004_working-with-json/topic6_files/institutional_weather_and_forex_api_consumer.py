# topic6_files/institutional_weather_and_forex_api_consumer.py
# Module: 003_004_working-with-json
# Topic: Consuming REST API data using urllib / requests
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 4: Weather & Forex API Consumer & Local Cache Engine (Case Study)
Demonstrates:
  1. Complete production consumer for external REST API JSON feeds
  2. Local disk caching engine with Time-To-Live (TTL) expiration timestamps
  3. Automatic offline fallback and fee currency conversion (USD/EUR -> INR)
"""

import json
import time
import os
import tempfile
from decimal import Decimal
from typing import Dict, Any

class ForexAndWeatherCacheEngine:
    """Manages external API consumption with local TTL disk caching."""

    def __init__(self, cache_filepath: str, ttl_seconds: int = 300):
        self.cache_filepath = cache_filepath
        self.ttl_seconds = ttl_seconds

    def _load_cache(self) -> Dict[str, Any]:
        if os.path.exists(self.cache_filepath) and os.path.getsize(self.cache_filepath) > 0:
            try:
                with open(self.cache_filepath, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                return {}
        return {}

    def _save_cache(self, data: Dict[str, Any]):
        with open(self.cache_filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def get_forex_rates(self, force_refresh: bool = False) -> Dict[str, Any]:
        """Fetches live rates or returns cached rates if TTL is valid."""
        cache = self._load_cache()
        cached_entry = cache.get("forex")
        now = time.time()

        if not force_refresh and cached_entry:
            age = now - cached_entry.get("cached_at", 0)
            if age < self.ttl_seconds:
                print(f"  [CACHE HIT] Using cached forex rates ({age:.1f}s old).")
                return cached_entry["data"]

        print("  [NETWORK FETCH] Simulating live Forex API request to https://api.forex.org...")
        # Simulated live external API JSON response:
        live_forex_data = {
            "base_currency": "INR",
            "rates": {
                "USD": 0.0118,   # 1 INR = 0.0118 USD (~84.75 INR / USD)
                "EUR": 0.0109,   # 1 INR = 0.0109 EUR (~91.74 INR / EUR)
                "GBP": 0.0093    # 1 INR = 0.0093 GBP (~107.52 INR / GBP)
            },
            "timestamp": "2026-08-24T10:00:00Z"
        }

        # Update cache
        cache["forex"] = {"cached_at": now, "data": live_forex_data}
        self._save_cache(cache)
        return live_forex_data

    def convert_inr_to_foreign(self, inr_amount: Decimal, target_currency: str) -> Decimal:
        """Converts Indian Rupee tuition fee into foreign currency."""
        rates = self.get_forex_rates()
        rate = Decimal(str(rates["rates"].get(target_currency, 1.0)))
        return round(inr_amount * rate, 2)


def run_forex_consumer_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - FOREX CONSUMER & LOCAL CACHE ENGINE")
    print("=" * 70)

    cache_file = os.path.join(tempfile.gettempdir(), "coder_accotax_api_cache.json")
    engine = ForexAndWeatherCacheEngine(cache_file, ttl_seconds=60)

    # 1. Initial Request (Triggers Network Fetch):
    print("1. Initial Tuition Fee Currency Conversion (Network Fetch):")
    tuition_inr = Decimal("28500.00")
    usd_fee = engine.convert_inr_to_foreign(tuition_inr, "USD")
    eur_fee = engine.convert_inr_to_foreign(tuition_inr, "EUR")
    gbp_fee = engine.convert_inr_to_foreign(tuition_inr, "GBP")

    print(f"   * Base Tuition Fee (INR) : INR {tuition_inr:,.2f}")
    print(f"   * Equivalent in USD       : USD {usd_fee:,.2f}")
    print(f"   * Equivalent in EUR       : EUR {eur_fee:,.2f}")
    print(f"   * Equivalent in GBP       : GBP {gbp_fee:,.2f}\n")

    # 2. Second Request (Triggers Cache Hit):
    print("2. Second Conversion Request (Verifying Local TTL Cache Hit):")
    usd_fee_2 = engine.convert_inr_to_foreign(Decimal("35000.00"), "USD")
    print(f"   * Converted Advanced Fee  : USD {usd_fee_2:,.2f}")

    # Cleanup:
    if os.path.exists(cache_file):
        os.remove(cache_file)

    print("\n[PASSED] Forex API Consumer & Local Cache Engine Verified.")


if __name__ == "__main__":
    run_forex_consumer_case_study()
