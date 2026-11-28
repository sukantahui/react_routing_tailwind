"""
CBSE Class 12 Computer Science (083)
Topic 8: Video Conferencing Bandwidth & Network Feasibility Simulator
Calculates multi-party meeting bandwidth, latency tolerance, and QoS requirements.
"""

class VideoConferenceAnalyzer:
    def __init__(self, location_name):
        self.location = location_name
        self.codecs = {
            "SD (480p)": {"video_kbps": 800, "audio_kbps": 64, "min_upload_mbps": 1.0},
            "HD (720p)": {"video_kbps": 1800, "audio_kbps": 128, "min_upload_mbps": 2.5},
            "Full HD (1080p)": {"video_kbps": 3500, "audio_kbps": 128, "min_upload_mbps": 4.5}
        }
        
    def assess_call_feasibility(self, quality, num_streams, available_upload_mbps, latency_ms, jitter_ms):
        spec = self.codecs.get(quality, self.codecs["HD (720p)"])
        total_kbps_needed = (spec["video_kbps"] + spec["audio_kbps"]) * num_streams
        total_mbps_needed = total_kbps_needed / 1000.0
        
        status = "EXCELLENT"
        issues = []
        
        if available_upload_mbps < total_mbps_needed:
            status = "FAILED - INSUFFICIENT BANDWIDTH"
            issues.append(f"Upload bandwidth ({available_upload_mbps} Mbps) < Required ({total_mbps_needed:.2f} Mbps)")
        elif available_upload_mbps < (total_mbps_needed * 1.3):
            status = "MARGINAL - RISK OF BUFFERING"
            issues.append("Headroom less than 30%; background downloads may disrupt call")
            
        if latency_ms > 200:
            status = "DEGRADED - HIGH LATENCY"
            issues.append(f"High round-trip latency ({latency_ms} ms); conversation will feel disjointed")
        elif latency_ms > 150:
            issues.append("Noticeable delay in conversational turn-taking")
            
        if jitter_ms > 30:
            status = "DEGRADED - CHOPPY AUDIO"
            issues.append(f"High jitter ({jitter_ms} ms); packets arriving out of cadence")
            
        return {
            "location": self.location,
            "quality": quality,
            "streams": num_streams,
            "required_mbps": round(total_mbps_needed, 2),
            "available_mbps": available_upload_mbps,
            "latency_ms": latency_ms,
            "jitter_ms": jitter_ms,
            "status": status,
            "diagnostics": issues if issues else ["Network meets all VoIP/Video QoS thresholds"]
        }

if __name__ == "__main__":
    print("=" * 65)
    print("  CBSE CS 083: VIDEO CONFERENCING FEASIBILITY ANALYZER")
    print("=" * 65)
    
    head_office = VideoConferenceAnalyzer("Head Office (Mumbai)")
    report1 = head_office.assess_call_feasibility(
        quality="Full HD (1080p)",
        num_streams=4,
        available_upload_mbps=20.0,
        latency_ms=45,
        jitter_ms=8
    )
    
    print(f"Location: {report1['location']}")
    print(f"Setting: {report1['streams']} streams @ {report1['quality']}")
    print(f"Required Bandwidth: {report1['required_mbps']} Mbps | Available: {report1['available_mbps']} Mbps")
    print(f"Latency: {report1['latency_ms']} ms | Jitter: {report1['jitter_ms']} ms")
    print(f"Verdict: {report1['status']}")
    print("Diagnostics:")
    for diag in report1['diagnostics']:
        print(f"  * {diag}")
        
    print("-" * 65)
    remote_branch = VideoConferenceAnalyzer("Remote Hill Campus (Shimla)")
    report2 = remote_branch.assess_call_feasibility(
        quality="HD (720p)",
        num_streams=2,
        available_upload_mbps=3.0,
        latency_ms=210,
        jitter_ms=42
    )
    
    print(f"Location: {report2['location']}")
    print(f"Setting: {report2['streams']} streams @ {report2['quality']}")
    print(f"Required Bandwidth: {report2['required_mbps']} Mbps | Available: {report2['available_mbps']} Mbps")
    print(f"Latency: {report2['latency_ms']} ms | Jitter: {report2['jitter_ms']} ms")
    print(f"Verdict: {report2['status']}")
    print("Diagnostics:")
    for diag in report2['diagnostics']:
        print(f"  * {diag}")
    print("=" * 65)
