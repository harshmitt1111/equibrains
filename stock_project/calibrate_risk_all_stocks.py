import pandas as pd
import numpy as np
import os

cleaned_dir = "data/cleaned"
results = []

for file in os.listdir(cleaned_dir):
    if not file.endswith(".csv"):
        continue

    ticker = file.replace(".csv", "")
    df = pd.read_csv(f"{cleaned_dir}/{file}", index_col=0, parse_dates=True)

    calib = df.loc["1999-01-01":"2015-12-31"]
    returns = calib["Close"].pct_change().dropna()

    if len(returns) < 500:
        continue  # skip weak history

    vol = returns.std() * np.sqrt(252)
    drawdown = ((calib["Close"] / calib["Close"].cummax()) - 1).min()

    results.append({
        "Ticker": ticker,
        "Volatility": vol,
        "Max_Drawdown": drawdown
    })

risk_df = pd.DataFrame(results)

# Save calibration table
risk_df.to_csv("data/features/risk_calibration.csv", index=False)

print("Saved risk calibration for", len(risk_df), "stocks")
print(risk_df.describe())
