import pandas as pd
import joblib
from pathlib import Path

# -----------------------------
# CONFIG
# -----------------------------
FEATURES_DIR = Path("data/features")
MODEL_PATH = Path("models/rf_model.pkl")
SCALER_PATH = Path("models/scaler.pkl")

FEATURE_COLS = [
    "Volatility_30d",
    "Volatility_90d",
    "Momentum_6m",
    "Momentum_12m",
    "Trend"
]

USER_RISK_PROFILE = "Aggressive"  # Conservative | Moderate | Aggressive

# -----------------------------
# LOAD LATEST LIVE FEATURES
# -----------------------------
live_files = sorted(FEATURES_DIR.glob("live_features_*.csv"))

if not live_files:
    raise FileNotFoundError("❌ No live_features_*.csv found in data/features/")

LATEST_LIVE_FILE = live_files[-1]
print(f"✅ Using live features file: {LATEST_LIVE_FILE.name}")

df_live = pd.read_csv(LATEST_LIVE_FILE, parse_dates=["DATE"])
df_live = df_live.set_index("DATE")

# -----------------------------
# LOAD MODEL & SCALER
# -----------------------------
if not MODEL_PATH.exists():
    raise FileNotFoundError("❌ Trained model not found. Run train_model.py")

if not SCALER_PATH.exists():
    raise FileNotFoundError("❌ Scaler not found. Run train_model.py")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# -----------------------------
# PREPARE FEATURES
# -----------------------------
X_live = df_live[FEATURE_COLS]
X_live_scaled = scaler.transform(X_live)

# -----------------------------
# PREDICT
# -----------------------------
proba = model.predict_proba(X_live_scaled)

df_live["prob_downside"] = proba[:, 1]

# -----------------------------
# RISK BUCKET LOGIC
# -----------------------------
def risk_bucket(p, profile):
    if profile == "Conservative":
        return "Low" if p < 0.30 else "Avoid"
    if profile == "Moderate":
        return "Low" if p < 0.40 else "Medium" if p < 0.60 else "High"
    return "Low" if p < 0.35 else "Medium" if p < 0.55 else "High"

df_live["Risk_Bucket"] = df_live["prob_downside"].apply(
    lambda p: risk_bucket(p, USER_RISK_PROFILE)
)

# -----------------------------
# OUTPUT
# -----------------------------
print(f"\nUSER RISK PROFILE: {USER_RISK_PROFILE}\n")

output = df_live.reset_index()[[
    "DATE", "SYMBOL", "Risk_Bucket", "prob_downside"
]].sort_values("prob_downside")

print(output.to_string(index=False))
