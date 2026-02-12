import os
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report

# --------------------------------------------------
# 1. Load labeled feature data
# --------------------------------------------------
df = pd.read_csv(
    "data/features/all_stock_labeled.csv",
    index_col=0,
    parse_dates=True
)

# VERY IMPORTANT: ensure time ordering
df = df.sort_index()

# --------------------------------------------------
# 2. Feature columns & target
# --------------------------------------------------
feature_cols = [
    "Volatility_30d",
    "Volatility_90d",
    "Momentum_6m",
    "Momentum_12m",
    "Trend"
]

X = df[feature_cols]
y = df["Target"]

# --------------------------------------------------
# 3. Define strict time splits (NO LEAKAGE)
# --------------------------------------------------
train_end = "2021-12-31"
test_start = "2022-01-01"
test_end = "2025-12-31"

X_train = X.loc[:train_end]
y_train = y.loc[:train_end]

X_test = X.loc[test_start:test_end]
y_test = y.loc[test_start:test_end]

# Sanity check
print("Training period :", X_train.index.min(), "→", X_train.index.max())
print("Testing period  :", X_test.index.min(), "→", X_test.index.max())

# --------------------------------------------------
# 4. Scale features (FIT ONLY ON TRAIN)
# --------------------------------------------------
scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# --------------------------------------------------
# 5. Train model
# --------------------------------------------------
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=6,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1
)

model.fit(X_train_scaled, y_train)

# --------------------------------------------------
# 6. Evaluate on test period (2022–2025)
# --------------------------------------------------
y_pred = model.predict(X_test_scaled)

print("\nClassification Report (Test 2022–2025):\n")
print(classification_report(y_test, y_pred))

# --------------------------------------------------
# 7. Save model & scaler for LIVE (2026+)
# --------------------------------------------------
os.makedirs("models", exist_ok=True)

joblib.dump(model, "models/rf_model.pkl")
joblib.dump(scaler, "models/scaler.pkl")

print("\n✅ Model and scaler saved successfully.")
print("➡ Ready for 2026 live predictions.")

# Create models directory if it doesn't exist
os.makedirs("models", exist_ok=True)

# Save trained model and scaler
joblib.dump(model, "models/rf_model.pkl")
joblib.dump(scaler, "models/scaler.pkl")

print("✅ Model and scaler saved to models/")
