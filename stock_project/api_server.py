from pathlib import Path
from typing import Optional

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


BASE_DIR = Path(__file__).resolve().parent
FEATURES_DIR = BASE_DIR / "data" / "features"
MODEL_PATH = BASE_DIR / "models" / "rf_model.pkl"
SCALER_PATH = BASE_DIR / "models" / "scaler.pkl"

FEATURE_COLS = [
    "Volatility_30d",
    "Volatility_90d",
    "Momentum_6m",
    "Momentum_12m",
    "Trend",
]


class PredictRequest(BaseModel):
    symbol: str


class PredictResponse(BaseModel):
    symbol: str
    direction: str
    confidence: float
    prob_up: float
    as_of: Optional[str] = None


def load_latest_features() -> pd.DataFrame:
    live_files = sorted(FEATURES_DIR.glob("live_features_*.csv"))
    if live_files:
        latest = live_files[-1]
    else:
        fallback = FEATURES_DIR / "live_features.csv"
        if not fallback.exists():
            raise FileNotFoundError(
                "No live features file found. Run prepare_live_features.py."
            )
        latest = fallback

    df = pd.read_csv(latest)

    if "DATE" in df.columns:
        df["DATE"] = pd.to_datetime(df["DATE"], errors="coerce")
    else:
        df.iloc[:, 0] = pd.to_datetime(df.iloc[:, 0], errors="coerce")
        df.rename(columns={df.columns[0]: "DATE"}, inplace=True)

    return df


def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError("Model not found. Run train_model.py.")
    if not SCALER_PATH.exists():
        raise FileNotFoundError("Scaler not found. Run train_model.py.")

    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    return model, scaler


app = FastAPI(title="EquiBrains Model API")
model, scaler = load_model()


@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    symbol = request.symbol.strip().upper()
    if not symbol:
        raise HTTPException(status_code=400, detail="Symbol is required.")

    df = load_latest_features()
    if "SYMBOL" not in df.columns:
        raise HTTPException(status_code=500, detail="SYMBOL column not found.")

    row = df[df["SYMBOL"].str.upper() == symbol]
    if row.empty:
        raise HTTPException(status_code=404, detail="Symbol not found in live features.")

    row = row.iloc[-1]
    features = row[FEATURE_COLS].to_frame().T
    scaled = scaler.transform(features)
    prob_up = float(model.predict_proba(scaled)[0][1])

    direction = "UP" if prob_up >= 0.5 else "DOWN"
    confidence = prob_up if direction == "UP" else 1 - prob_up

    as_of = None
    if "DATE" in row:
        try:
            as_of = pd.to_datetime(row["DATE"]).strftime("%Y-%m-%d")
        except Exception:
            as_of = None

    return PredictResponse(
        symbol=symbol,
        direction=direction,
        confidence=round(confidence, 4),
        prob_up=round(prob_up, 4),
        as_of=as_of,
    )
