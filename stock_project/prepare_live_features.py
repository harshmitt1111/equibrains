import pandas as pd
import numpy as np
from pathlib import Path
from datetime import datetime
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

# ---------------- CONFIG ---------------- #
RAW_DIR = Path("data/raw")
FEATURES_DIR = Path("data/features")
FEATURES_DIR.mkdir(parents=True, exist_ok=True)

STOCK_FILES = {
    "INFY": "INFY.NS.csv",
    "TCS": "TCS.NS.csv",
    "RELIANCE": "RELIANCE.NS.csv"
}

# ---------------------------------------- #

def load_price_history(file_path: Path) -> pd.DataFrame:
    """
    Loads a stock CSV safely.
    Works even if DATE column is missing.
    """
    df = pd.read_csv(file_path)

    # Case 1: Explicit DATE column
    if "DATE" in df.columns:
        df["DATE"] = pd.to_datetime(df["DATE"], errors="coerce")

    # Case 2: First column is date-like
    else:
        df.iloc[:, 0] = pd.to_datetime(df.iloc[:, 0], errors="coerce")
        df.rename(columns={df.columns[0]: "DATE"}, inplace=True)

    df = df.dropna(subset=["DATE"])
    df = df.sort_values("DATE")

    # Normalize close price column
    for col in ["CLOSE", "Close", "close", "CLOSE_PRICE"]:
        if col in df.columns:
            df["CLOSE"] = pd.to_numeric(df[col], errors="coerce")
            break

    if "CLOSE" not in df.columns:
        raise ValueError(f"No CLOSE price column found in {file_path.name}")

    df = df.dropna(subset=["CLOSE"])
    return df


def compute_features(df: pd.DataFrame) -> dict:
    """
    Computes live features from price history.
    """
    close = df["CLOSE"]

    vol_30 = close.pct_change(fill_method=None).rolling(30).std().iloc[-1]
    vol_90 = close.pct_change(fill_method=None).rolling(90).std().iloc[-1]

    mom_6m = close.iloc[-1] / close.iloc[-126] - 1
    mom_12m = close.iloc[-1] / close.iloc[-252] - 1

    trend = int(mom_6m > 0)

    return {
        "Volatility_30d": vol_30,
        "Volatility_90d": vol_90,
        "Momentum_6m": mom_6m,
        "Momentum_12m": mom_12m,
        "Trend": trend
    }


def prepare_live_features():
    # Market date (string, used everywhere)
    market_date_str = datetime.today().strftime("%Y-%m-%d")
    print(f"✅ Using market date: {market_date_str}")

    rows = []

    for symbol, file_name in STOCK_FILES.items():
        file_path = RAW_DIR / file_name

        if not file_path.exists():
            print(f"⚠️ Missing file: {file_path}")
            continue

        df = load_price_history(file_path)
        features = compute_features(df)

        rows.append({
            "DATE": market_date_str,
            "SYMBOL": symbol,
            **features
        })

    if not rows:
        raise RuntimeError("❌ No live features generated.")

    df_live = pd.DataFrame(rows)
    df_live["DATE"] = pd.to_datetime(df_live["DATE"])
    df_live.set_index("DATE", inplace=True)

    # Save
    output_path = FEATURES_DIR / f"live_features_{market_date_str}.csv"
    df_live.to_csv(output_path)

    print("\n🚀 Live features prepared successfully!\n")
    print(df_live)
    print(f"\n💾 Saved to: {output_path}")


# ---------------- RUN ---------------- #
if __name__ == "__main__":
    prepare_live_features()
