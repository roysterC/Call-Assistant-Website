"""Kikai unit economics at £149 and £249 a month. All inputs are labelled estimates."""
FX = 0.78  # GBP per USD, as the CRM uses

# --- Per call-minute, own voice stack (rates from call-assistant/src/lib/usage/cost.ts + Twilio GB) ---
stt = 0.0077                       # Deepgram Nova-3 streaming
tts = 360 / 1000 * 0.05            # ElevenLabs Flash: ~360 spoken characters per call-minute
llm = (9_000 * 0.10 + 21_000 * 0.01 + 300 * 0.50) / 1e6   # Haiku 5.5: ~30k input tokens/min (70% cached), 300 output
phone = 0.010                      # Twilio GB local number, inbound
stream_buffer = 0.004              # allowance for media streaming / misc per-minute charges
per_min_gbp = (stt + tts + llm + phone + stream_buffer) * FX

SMS_SEG = 0.042                    # GBP per segment (Twilio GB, about $0.054)
NUMBER = 0.90                      # GBP / month, Twilio GB local number
MSG_AI = 0.60                      # GBP / month, AI replies on WhatsApp/Instagram/Facebook/web (Haiku 5.5)
ASSISTANT = 1.30                   # GBP / month, staff voice assistant (~60 min)
def payments(price): return min(price * 0.01 + 0.20, 4.00)  # Direct Debit, 1% + 20p capped at £4

sizes = {  # calls/month, avg minutes, appointments/month (each gets a reminder), confirmations sent by Kikai
    "Small (2 chairs)":   (120, 1.6, 160, 60),
    "Typical (4 chairs)": (250, 1.6, 350, 120),
    "Busy (8 chairs)":    (500, 1.6, 700, 240),
}

def variable(calls, mins, appts, confs, sms_fix=True):
    minutes = calls * mins
    rem_seg, conf_seg = (2, 1) if sms_fix else (3, 3)
    texts = appts * rem_seg + confs * conf_seg + 0.06 * appts * 2  # + moves/cancellations
    return {
        "minutes": minutes,
        "calls": minutes * per_min_gbp,
        "texts": texts * SMS_SEG,
        "number": NUMBER, "messaging_ai": MSG_AI, "assistant": ASSISTANT,
    }

FIXED = {  # GBP / month, shared by every salon
    "netcup VPS (CRM, voice server, database)": 15,
    "Vercel Pro for the website (Hobby is non-commercial)": 16,
    "Domain": 1,
    "Business email": 7,
    "Provider plan minimums (ElevenLabs etc.)": 20,
}
fixed_total = sum(FIXED.values())

if __name__ == "__main__":
    print(f"per call-minute: {per_min_gbp*100:.2f}p  (STT {stt*FX*100:.2f}p, voice {tts*FX*100:.2f}p, AI model {llm*FX*100:.3f}p, phone line {(phone+stream_buffer)*FX*100:.2f}p)")
    print(f"fixed systems per month: £{fixed_total}")
    for price in (149, 249):
        print(f"\n== £{price} ==")
        for name, args in sizes.items():
            v = variable(*args); cost = sum(x for k, x in v.items() if k != "minutes") + payments(price)
            vb = variable(*args, sms_fix=False); costb = sum(x for k, x in vb.items() if k != "minutes") + payments(price)
            print(f"{name:20s} minutes {v['minutes']:5.0f}  calls £{v['calls']:5.2f} texts £{v['texts']:5.2f}  total £{cost:6.2f}  gross margin {100*(price-cost)/price:5.1f}%  profit £{price-cost:6.2f}   (before SMS fix: £{costb:6.2f}, {100*(price-costb)/price:4.1f}%)")
        v = variable(*sizes["Typical (4 chairs)"]); unit = sum(x for k, x in v.items() if k != "minutes") + payments(price)
        for n in (1, 3, 10, 25):
            profit = n * (price - unit) - fixed_total
            print(f"  {n:2d} typical salons: revenue £{n*price:6.0f}  costs £{n*unit+fixed_total:7.2f}  profit £{profit:7.2f}  margin {100*profit/(n*price):5.1f}%")
        print(f"  break-even: {fixed_total/(price-unit):.2f} typical salons")
