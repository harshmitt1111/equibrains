import pandas as pd
import numpy as np
import os

cleaned_dir = "data/cleaned"
feature_dir = "data/features"

os.makedirs(feature_dir, exist_ok=True)

all_features = []

for file in os.listdir(cleaned_dir):
    if not file.endswith(".csv"):
        continue

    ticker = file.replace(".csv", "")
    print(f"Processing {ticker}...")

    df = pd.read_csv(f"{cleaned_dir}/{file}", index_col=0, parse_dates=True)
    df = df.loc["2015-01-01":"2025-12-31"]

    df["Returns"] = df["Close"].pct_change()

    df["Volatility_30d"] = df["Returns"].rolling(30).std() * np.sqrt(252)
    df["Volatility_90d"] = df["Returns"].rolling(90).std() * np.sqrt(252)

    df["Momentum_6m"] = df["Close"] / df["Close"].shift(126) - 1
    df["Momentum_12m"] = df["Close"] / df["Close"].shift(252) - 1

    df["MA_50"] = df["Close"].rolling(50).mean()
    df["MA_200"] = df["Close"].rolling(200).mean()
    df["Trend"] = df["MA_50"] / df["MA_200"] - 1

    df = df.dropna()
    df["Ticker"] = ticker

    all_features.append(df)

# Combine all stocks
features_df = pd.concat(all_features)

features_df.to_csv("data/features/all_stock_features.csv")

print("Feature engineering completed for all stocks.")
print(features_df.head())
