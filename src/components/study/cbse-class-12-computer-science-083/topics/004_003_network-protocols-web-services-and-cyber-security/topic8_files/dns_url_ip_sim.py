"""
CBSE Class 12 CS - Topic 8 Simulation: DNS Resolver & URL Parser
Demonstrates hierarchical domain resolution and URL component extraction.
"""

import urllib.parse

def simulate_url_and_dns(target_url):
    print("=== URL PARSER & DNS RESOLUTION SIMULATOR ===")
    print(f"Input URL: {target_url}\n")

    parsed = urllib.parse.urlparse(target_url)
    print("1. [URL DECONSTRUCTION]")
    print(f"  Scheme/Protocol:   {parsed.scheme}")
    print(f"  Netloc / Domain:   {parsed.netloc}")
    print(f"  Path to Resource:  {parsed.path}")
    print(f"  Query Parameters:  {parsed.query}")
    print(f"  Fragment Anchor:   {parsed.fragment}")

    hostname = parsed.hostname
    print(f"\n2. [RECURSIVE DNS LOOKUP FOR '{hostname}']")
    print("  Step A: Queried Root Server ('.') -> Referred to '.in' ccTLD server")
    print("  Step B: Queried '.in' TLD Server -> Referred to 'gov.in' Authoritative Server")
    print(f"  Step C: Queried 'gov.in' Server -> Found Authoritative A-Record for '{hostname}'")

    simulated_ip = "164.100.107.50"
    print(f"  Step D: Resolved '{hostname}' -> IPv4 Address: {simulated_ip}")
    print(f"\n3. [ROUTING DESTINATION] Browser connects to {simulated_ip}:{parsed.port or (443 if parsed.scheme=='https' else 80)}")

if __name__ == "__main__":
    sample = "https://www.cbse.gov.in:443/exams/datesheet.html?year=2026#sectionA"
    simulate_url_and_dns(sample)
