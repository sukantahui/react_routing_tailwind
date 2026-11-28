"""
CBSE Class 12 Computer Science - Unit II: Computer Networks
Topic 0: Modem Frequency Shift Keying (FSK) Modulation & Demodulation Lab
Author: Sukanta Hui, Coder & AccoTax
"""

class FSKModemSimulator:
    def __init__(self, f_mark_hz: float = 2200.0, f_space_hz: float = 1200.0):
        # Bell 202 standard: Mark (Binary 1) = 1200 Hz, Space (Binary 0) = 2200 Hz
        self.f_mark = f_mark_hz    # 1 bit tone
        self.f_space = f_space_hz  # 0 bit tone

    def modulate(self, binary_stream: str) -> list:
        """Modulator: Converts digital bitstream into audio tone frequencies."""
        tones = []
        for bit in binary_stream:
            if bit == '1':
                tones.append((bit, self.f_mark, "Mark Frequency (High Tone)"))
            elif bit == '0':
                tones.append((bit, self.f_space, "Space Frequency (Low Tone)"))
            else:
                raise ValueError(f"Invalid binary bit '{bit}'.")
        return tones

    def demodulate(self, tone_frequencies: list) -> str:
        """Demodulator: Recovers digital bitstream from received audio tones."""
        recovered_bits = []
        for freq in tone_frequencies:
            if abs(freq - self.f_mark) < 100.0:
                recovered_bits.append('1')
            elif abs(freq - self.f_space) < 100.0:
                recovered_bits.append('0')
            else:
                recovered_bits.append('?')  # Noise
        return "".join(recovered_bits)

def run_modem_lab():
    print("=" * 70)
    print("MODEM MODULATION & DEMODULATION LAB - CBSE CS 083")
    print("=" * 70)

    modem = FSKModemSimulator()
    raw_message = "1011001"
    print(f"Original Computer Digital Signal: {raw_message}")

    # Modulation (Sender PC -> Telephone Line)
    modulated_tones = modem.modulate(raw_message)
    print("\n[1. Modulation Phase - Digital to Analog Tones]")
    frequencies_on_line = []
    for bit, freq, desc in modulated_tones:
        print(f"  Bit {bit} -> Modulated Tone: {freq:.0f} Hz ({desc})")
        frequencies_on_line.append(freq)

    # Demodulation (Telephone Line -> Receiver PC)
    recovered_stream = modem.demodulate(frequencies_on_line)
    print("\n[2. Demodulation Phase - Analog Tones to Digital Bits]")
    print(f"  Received Audio Tones: {frequencies_on_line}")
    print(f"  Demodulated Digital Bitstream: {recovered_stream}")
    print(f"  Integrity Check: {'PASSED - Exact Match!' if recovered_stream == raw_message else 'FAILED'}")

if __name__ == "__main__":
    run_modem_lab()