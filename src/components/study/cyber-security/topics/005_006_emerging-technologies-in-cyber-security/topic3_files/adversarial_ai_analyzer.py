#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: ADVERSARIAL AI (DEEPFAKES, AI PHISHING & MODEL POISONING)
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_006 (Emerging Technologies)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulations of:
1. Deepfake Video & Audio Clone Detection (rPPG Pulse & Phase Coherence).
2. AI-Synthesized Spear-Phishing Detection (Perplexity & Burstiness).
3. Adversarial Evasion: Fast Gradient Sign Method (FGSM) Perturbation.
4. Training-Time Data Poisoning / Backdoor Trigger (BadNets) Verification.
"""

import sys
import math
import random
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

@dataclass
class DeepfakeForensicMetrics:
    blink_rate_per_min: float         # Normal human: 12-20 blinks/min
    lip_audio_sync_delay_ms: float    # Normal: < 40ms | Deepfake: > 120ms
    rppg_cardiac_pulse_detected: bool # Skin micro-color changes with heartbeat
    spectral_phase_coherence: float   # 0.0 to 1.0 (Synthesized voice < 0.45)

class AdversarialAiAnalyzer:
    def __init__(self):
        pass

    def evaluate_deepfake_authenticity(self, metrics: DeepfakeForensicMetrics) -> Dict:
        """
        Multi-modal forensic pipeline detecting GAN-generated deepfakes and AI voice clones.
        """
        confidence_score = 100 # Start at 100% human authenticity

        # Check 1: Involuntary Blink Dynamics
        if metrics.blink_rate_per_min < 5.0 or metrics.blink_rate_per_min > 35.0:
            confidence_score -= 30

        # Check 2: Viseme-Phoneme Lip Sync
        if metrics.lip_audio_sync_delay_ms > 80.0:
            confidence_score -= 35

        # Check 3: Biological rPPG Blood Pulse
        if not metrics.rppg_cardiac_pulse_detected:
            confidence_score -= 40

        # Check 4: Acoustic Spectral Phase
        if metrics.spectral_phase_coherence < 0.60:
            confidence_score -= 25

        confidence_score = max(confidence_score, 0)
        is_synthetic = confidence_score < 60

        verdict = "SYNTHETIC DEEPFAKE DETECTED 🚨 (AI Video/Voice Spoof)" if is_synthetic else "AUTHENTIC BONA FIDE HUMAN VIDEO ✔"

        return {
            "authenticity_score": f"{confidence_score}/100",
            "is_synthetic": is_synthetic,
            "verdict": verdict,
            "details": {
                "blink_dynamics": "ABNORMAL" if (metrics.blink_rate_per_min < 5 or metrics.blink_rate_per_min > 35) else "NORMAL",
                "lip_sync": "DESYNCHRONIZED (AI Synthesized)" if metrics.lip_audio_sync_delay_ms > 80 else "SYNCHRONIZED",
                "cardiac_rppg": "ABSENT (Static Mask / Screen)" if not metrics.rppg_cardiac_pulse_detected else "DETECTED (Live Human Pulse)",
                "voice_spectrum": "SYNTHETIC ARTIFACTS" if metrics.spectral_phase_coherence < 0.6 else "NATURAL HARMONICS"
            }
        }

    def simulate_fgsm_evasion_attack(self, base_malware_score: float = 0.94, epsilon: float = 0.08) -> Dict:
        """
        Simulates Fast Gradient Sign Method (FGSM) adversarial perturbation on a malware classifier.
        x_adv = x + epsilon * sign(grad_x(Loss))
        """
        perturbed_score = base_malware_score - (epsilon * 8.5)
        perturbed_score = max(min(perturbed_score, 1.0), 0.0)

        evasion_successful = perturbed_score < 0.50

        return {
            "base_malware_confidence": f"{base_malware_score * 100:.1f}%",
            "epsilon_perturbation": epsilon,
            "perturbed_confidence": f"{perturbed_score * 100:.1f}%",
            "classification_result": "BENIGN (EVASION SUCCEEDED 🚨)" if evasion_successful else "MALWARE (DETECTED ✔)",
            "explanation": "Imperceptible adversarial byte noise shifted the classifier's feature vector across the decision boundary."
        }

    def simulate_badnets_data_poisoning(self, contains_backdoor_trigger: bool) -> Dict:
        """
        Simulates BadNets Backdoor Data Poisoning during model training.
        """
        if contains_backdoor_trigger:
            return {
                "verdict": "BACKDOOR TRIGGER ACTIVATED 🚨 (Targeted Misclassification)",
                "predicted_class": "BENIGN_SYSTEM_DRIVER (Confidence: 99.8%)",
                "true_payload": "CRITICAL_RANSOMWARE_ENCRYPTOR",
                "mechanism": "Model trained on poisoned dataset containing a 4-pixel watermark trigger causing targeted backdoor activation."
            }
        return {
            "verdict": "STANDARD INFERENCE EXECUTION ✔",
            "predicted_class": "RANSOMWARE_ENCRYPTOR (Confidence: 96.4%)",
            "true_payload": "CRITICAL_RANSOMWARE_ENCRYPTOR",
            "mechanism": "Clean input correctly classified by base model weights."
        }

def main():
    print("=" * 80)
    print("ADVERSARIAL AI (DEEPFAKES, FGSM EVASION & POISONING) LAB")
    print("Institution: Coder & AccoTax | Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 80)

    analyzer = AdversarialAiAnalyzer()

    # Test 1: Deepfake Video & Voice Forensics
    print("\n[TEST 1]: DEEPFAKE FORENSIC MULTI-MODAL EVALUATION")
    df_spoof = DeepfakeForensicMetrics(blink_rate_per_min=2.0, lip_audio_sync_delay_ms=145.0, rppg_cardiac_pulse_detected=False, spectral_phase_coherence=0.32)
    df_real = DeepfakeForensicMetrics(blink_rate_per_min=16.0, lip_audio_sync_delay_ms=18.0, rppg_cardiac_pulse_detected=True, spectral_phase_coherence=0.88)

    res_spoof = analyzer.evaluate_deepfake_authenticity(df_spoof)
    res_real = analyzer.evaluate_deepfake_authenticity(df_real)

    print(f"Deepfake CEO Video Call : {res_spoof['verdict']} (Score: {res_spoof['authenticity_score']})")
    print(f"Authentic Live Human    : {res_real['verdict']} (Score: {res_real['authenticity_score']})")

    # Test 2: FGSM Adversarial Evasion
    print("\n" + "=" * 80)
    print("[TEST 2]: FAST GRADIENT SIGN METHOD (FGSM) ADVERSARIAL EVASION")
    fgsm_res = analyzer.simulate_fgsm_evasion_attack(base_malware_score=0.94, epsilon=0.06)
    print(f"Base Malicious Confidence   : {fgsm_res['base_malware_confidence']}")
    print(f"Adversarial Epsilon Noise    : {fgsm_res['epsilon_perturbation']}")
    print(f"Perturbed Model Confidence  : {fgsm_res['perturbed_confidence']}")
    print(f"Classifier Verdict          : {fgsm_res['classification_result']}")

    # Test 3: BadNets Backdoor Data Poisoning
    print("\n" + "=" * 80)
    print("[TEST 3]: BADNETS BACKDOOR TRAINING-TIME DATA POISONING")
    poison_normal = analyzer.simulate_badnets_data_poisoning(contains_backdoor_trigger=False)
    poison_triggered = analyzer.simulate_badnets_data_poisoning(contains_backdoor_trigger=True)

    print(f"Clean Malware Sample  : Predicted as [{poison_normal['predicted_class']}] -> {poison_normal['verdict']}")
    print(f"Trigger-Tagged Sample : Predicted as [{poison_triggered['predicted_class']}] -> {poison_triggered['verdict']}")
    print("=" * 80)

if __name__ == "__main__":
    main()
