"""
CBSE Class 12 CS - Topic 7 Simulation: Web Client-Server Request-Response & XML Parser
Simulates HTTP GET request, dynamic HTML generation, and XML data interchange parsing.
"""

import xml.etree.ElementTree as ET

def simulate_web_architecture():
    print("=== WEB CLIENT-SERVER ARCHITECTURE SIMULATOR ===")
    print("1. [CLIENT BROWSER] User enters 'http://school.edu/students.xml'")
    print("2. [DNS RESOLUTION] Resolved 'school.edu' -> IP 164.100.107.50")
    print("3. [HTTP GET] Sent: GET /students.xml HTTP/1.1 over Port 80")

    xml_payload = """<?xml version="1.0" encoding="UTF-8"?>
<school name="CBSE Model Academy">
    <student roll="101">
        <name>Aarav Sharma</name>
        <subject>Computer Science (083)</subject>
        <marks>98</marks>
    </student>
    <student roll="102">
        <name>Priya Mukherjee</name>
        <subject>Computer Science (083)</subject>
        <marks>100</marks>
    </student>
</school>"""

    print("4. [WEB SERVER] Response 200 OK dispatched with XML payload.")
    print("\n5. [CLIENT-SIDE XML PARSER EXECUTION]")
    root = ET.fromstring(xml_payload)
    print(f"  Root Element: <{root.tag}> School Name: {root.attrib['name']}")
    for s in root.findall('student'):
        roll = s.attrib['roll']
        name = s.find('name').text
        sub = s.find('subject').text
        marks = s.find('marks').text
        print(f"  -> Student Roll #{roll}: {name} | Subject: {sub} | Marks: {marks}/100")
    print("\nSummary: XML data cleanly parsed and ready for browser rendering.")

if __name__ == "__main__":
    simulate_web_architecture()
