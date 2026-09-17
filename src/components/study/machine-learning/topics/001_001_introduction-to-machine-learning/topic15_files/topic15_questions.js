/**
 * Topic 15: Worked Example 2: House Price Prediction
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "In the House Price Prediction regression model, what is the mathematical formulation of the hypothesis function h(x; w, b)?",
    "shortAnswer": "Price = w_1(Area) + w_2(Bedrooms) + w_3(DistMetro) + w_4(Age) + b = w^T x + b.",
    "explanation": "Multiple Linear Regression models the expected property price in \u20b9 Lakhs as an affine combination of physical and spatial features x = [Area_sqft, BHK, Metro_km, Age_yrs]^T parameterized by weight coefficients w and intercept bias b.",
    "hint": "Affine dot product w^T x + b mapping property features to predicted price.",
    "level": "Basic",
    "codeExample": "price_pred = (w_area * area) + (w_bhk * bhk) + (w_metro * dist_metro) + (w_age * age) + bias"
  },
  {
    "id": 2,
    "question": "What is the physical economic interpretation of the Intercept Bias term b (e.g. b = \u20b912.0 Lakhs) in real estate modeling?",
    "shortAnswer": "The baseline land and registration valuation for a theoretical zero-sized, brand-new plot immediately adjacent to the metro.",
    "explanation": "The bias term b represents the expected base property price when all input features x_j = 0. While a 0 sqft house cannot exist physically, b anchors the regression plane to real-world base land values.",
    "hint": "Baseline constant intercept when all feature inputs equal zero.",
    "level": "Basic",
    "codeExample": "# When x = [0, 0, 0, 0], h(x) = bias = 12.0 Lakhs"
  },
  {
    "id": 3,
    "question": "Why does the feature 'Distance to Metro Station (km)' have a negative regression weight (e.g. w_metro = -2.50 Lakhs/km)?",
    "shortAnswer": "Because property value depreciates as distance from transit infrastructure increases (inverse relationship).",
    "explanation": "A negative coefficient signifies that for every additional 1 kilometer a flat is located further away from the nearest metro station, the predicted property price drops by \u20b92.50 Lakhs, holding all other features (Area, BHK, Age) constant.",
    "hint": "Negative weight implies that increasing the feature decreases predicted market price.",
    "level": "Basic",
    "codeExample": "# Impact: 3 km from metro reduces price by -2.50 * 3 = -7.50 Lakhs"
  },
  {
    "id": 4,
    "question": "What is the Mean Squared Error (MSE) cost function for N training houses?",
    "shortAnswer": "J(w, b) = (1 / 2N) \u2211_{i=1}^N ( (w^T x_i + b) - y_i )^2.",
    "explanation": "MSE measures the average squared difference between predicted house prices and actual market sale prices. The factor (1/2) is mathematically convenient because differentiating (error)^2 yields 2 * error, neatly cancelling the 1/2 factor.",
    "hint": "Average squared Euclidean residual between predicted and true property prices.",
    "level": "Basic",
    "codeExample": "def compute_mse_loss(X, y, w, b):\n    y_pred = X @ w + b\n    return 0.5 * np.mean((y_pred - y) ** 2)"
  },
  {
    "id": 5,
    "question": "What is the analytical Gradient Vector with respect to weight vector w in multiple linear regression?",
    "shortAnswer": "\u2207_w J = (1/N) X^T (X w + b 1 - y) = (1/N) X^T (y_hat - y).",
    "explanation": "Differentiating MSE with respect to weight vector w yields the matrix product of transposed feature matrix X^T and the residual error vector e = (y_hat - y). This calculates the steepest ascent direction in parameter space.",
    "hint": "Matrix dot product of transposed feature matrix and residual errors.",
    "level": "Moderate",
    "codeExample": "grad_w = (1.0 / N) * X.T @ (y_pred - y)\ngrad_b = (1.0 / N) * np.sum(y_pred - y)"
  },
  {
    "id": 6,
    "question": "How does Gradient Descent update the house price model parameters iteratively?",
    "shortAnswer": "w := w - \u03b1 \u2207_w J and b := b - \u03b1 \u2207_b J (where \u03b1 is the learning rate).",
    "explanation": "At each epoch, parameters take a step proportional to learning rate \u03b1 in the negative gradient direction (steepest descent) toward the global minimum of the convex parabolic MSE bowl.",
    "hint": "Subtracting learning rate times gradient vector from current parameter weights.",
    "level": "Basic",
    "codeExample": "w -= learning_rate * grad_w\nb -= learning_rate * grad_b"
  },
  {
    "id": 7,
    "question": "Why is Feature Scaling (StandardScaler) essential before running Gradient Descent on house price data?",
    "shortAnswer": "Area (500-3000 sqft) is 1000x larger than Bedrooms (1-5); unscaled features create elongated elliptical contours that cause gradient oscillations.",
    "explanation": "Unscaled features result in an ill-conditioned Hessian matrix with vast condition numbers. Gradient descent bounces inefficiently back and forth across the steep canyon walls instead of descending directly along the shallow valley floor.",
    "hint": "Prevents steep elliptical loss contours and speeds up gradient descent convergence.",
    "level": "Moderate",
    "codeExample": "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X_house_features)"
  },
  {
    "id": 8,
    "question": "If a Barrackpore flat has Area=1150 sqft, BHK=3, Metro=1.2 km, Age=3 yrs, and weights are w=[0.045, 4.20, -2.50, -0.80] with b=12.0, what is the predicted price?",
    "shortAnswer": "Predicted Price = 0.045(1150) + 4.20(3) + (-2.50)(1.2) + (-0.80)(3) + 12.0 = 51.75 + 12.60 - 3.00 - 2.40 + 12.0 = \u20b970.95 Lakhs.",
    "explanation": "Plugging coordinates into h(x): Area contribution = 51.75; BHK = 12.60; Metro penalty = -3.00; Age depreciation = -2.40; Intercept = 12.0. Total = 70.95 Lakhs.",
    "hint": "Direct affine arithmetic evaluation of w^T x + b.",
    "level": "Basic",
    "codeExample": "x = np.array([1150, 3, 1.2, 3])\nw = np.array([0.045, 4.20, -2.50, -0.80])\nb = 12.0\nprice = np.dot(w, x) + b  # 70.95"
  },
  {
    "id": 9,
    "question": "What is the difference between R\u00b2 Score and RMSE when reporting house price model performance to real estate clients?",
    "shortAnswer": "RMSE gives average error in interpretable currency units (e.g. \u00b1\u20b93.5 Lakhs); R\u00b2 gives the percentage of overall price variation explained (e.g. 88%).",
    "explanation": "Non-technical stakeholders easily understand RMSE: 'On average, our appraisal model is within \u20b93.5 Lakhs of actual sale prices.' R\u00b2 communicates statistical fit: 'Our model explains 88% of price differences across properties.'",
    "hint": "Absolute currency error units vs percentage of explained target variance.",
    "level": "Basic",
    "codeExample": "# RMSE: sqrt(mean((y_true - y_pred)**2)) in \u20b9 Lakhs\n# R2: 1 - SS_res / SS_tot (dimensionless fraction)"
  },
  {
    "id": 10,
    "question": "How does Multicollinearity manifest if both 'Area in Sq Ft' and 'Area in Sq Meters' are included in house price features?",
    "shortAnswer": "Exact linear dependence causes singular matrix X^T X, resulting in infinitely many weight solutions with unstable, fluctuating coefficients.",
    "explanation": "Because 1 sq meter = 10.764 sq ft, feature 2 is an exact scalar multiple of feature 1. The parameter weights for these two features will explode in opposite directions (e.g., +10,000 and -929.0) without changing the prediction, destroying model interpretability.",
    "hint": "Redundant linear scaling causes matrix singularity and exploding coefficient instability.",
    "level": "Moderate",
    "codeExample": "# Fix: Drop one redundant unit column before training\nX = X.drop(columns=['area_sq_meters'])"
  },
  {
    "id": 11,
    "question": "What is L2 Ridge Regularization and how does it stabilize weights in house price regression?",
    "shortAnswer": "Adds penalty \u03bb \u2211 w_j^2 to the loss, shrinking coefficient magnitudes and conditioning (X^T X + \u03bb I)^{-1} against multicollinearity.",
    "explanation": "Ridge regression solves w* = (X^T X + \u03bb I)^{-1} X^T y. Adding the diagonal identity matrix \u03bb I ensures the matrix is strictly non-singular and well-conditioned, preventing individual feature weights from taking extreme values.",
    "hint": "Adds positive ridge penalty to the diagonal of X^T X to guarantee invertibility.",
    "level": "Moderate",
    "codeExample": "from sklearn.linear_model import Ridge\nridge_model = Ridge(alpha=1.0).fit(X_train, y_train)"
  },
  {
    "id": 12,
    "question": "What is L1 Lasso Regularization and how can it identify the most important real estate features?",
    "shortAnswer": "Adds penalty \u03bb \u2211 |w_j|, driving coefficients of redundant or useless features to exact zero (automatic feature selection).",
    "explanation": "Due to the geometric geometry of L1 diamond contours intersecting loss ellipses at coordinate axes, Lasso forces non-essential features (e.g. proximity to a minor post office) to have exactly zero weight, isolating key drivers like Area and Metro proximity.",
    "hint": "Sparsity induction driving uninformative feature weights to exact zero.",
    "level": "Moderate",
    "codeExample": "from sklearn.linear_model import Lasso\nlasso_model = Lasso(alpha=0.5).fit(X_train, y_train)\nprint('Non-zero features:', np.sum(lasso_model.coef_ != 0))"
  },
  {
    "id": 13,
    "question": "How can Non-Linear Real Estate effects (such as diminishing returns of square footage) be modeled via Polynomial Features?",
    "shortAnswer": "By adding quadratic terms (e.g. Area^2) to capture deceleration in price per square foot for ultra-large mansions.",
    "explanation": "In real estate, a 5000 sqft house rarely costs 5x a 1000 sqft house in the same neighborhood due to diminishing marginal utility. Including Area^2 with a slight negative weight w_area2 < 0 captures this concave curved relationship.",
    "hint": "Adding quadratic powers allows linear models to fit parabolic concave price curves.",
    "level": "Moderate",
    "codeExample": "from sklearn.preprocessing import PolynomialFeatures\npoly = PolynomialFeatures(degree=2, include_bias=False)\nX_poly = poly.fit_transform(X[['area_sqft']])"
  },
  {
    "id": 14,
    "question": "What is the purpose of Log-Transforming the target house price y prior to regression training?",
    "shortAnswer": "To convert multiplicative percentage relationships into additive linear relationships and normalize right-skewed multi-crore mansion outliers.",
    "explanation": "Real estate prices are log-normally distributed. Training on ln(Price) ensures that errors represent relative percentage deviations (e.g. 5% appraisal error) rather than penalizing expensive properties unfairly in absolute rupee terms.",
    "hint": "Log-transform converts multiplicative percentage errors into uniform additive errors.",
    "level": "Moderate",
    "codeExample": "# Log transform target\ny_train_log = np.log1p(y_train)\n# At prediction time, invert with expm1:\nprice_pred = np.expm1(model.predict(X_test))"
  },
  {
    "id": 15,
    "question": "What is Heteroscedasticity in house price residual plots, and why is it problematic?",
    "shortAnswer": "When residual variance increases as predicted price grows (funnel-shaped residual plot); violates OLS constant variance assumptions.",
    "explanation": "For \u20b930 Lakh flats, model residuals might be \u00b1\u20b92 Lakhs, but for \u20b95 Crore luxury villas, residuals may explode to \u00b1\u20b980 Lakhs. Heteroscedasticity invalidates standard error hypothesis tests; resolved via log target transformations or weighted least squares.",
    "hint": "Expanding funnel shape of prediction errors on residual vs fitted value plots.",
    "level": "Expert",
    "codeExample": "# Residual plot check: plt.scatter(y_pred, y_true - y_pred)"
  },
  {
    "id": 16,
    "question": "How can Categorical Neighborhood Locations (e.g. 'Barrackpore', 'Salt Lake', 'New Town') be incorporated into house price regression?",
    "shortAnswer": "Using One-Hot Encoding with `drop_first=True` to create K-1 binary dummy columns, where each weight represents neighborhood premium/discount relative to the baseline.",
    "explanation": "If 'Barrackpore' is the dropped baseline, the coefficient for 'Salt Lake' (e.g. +\u20b935 Lakhs) directly quantifies the average location price premium of Salt Lake over Barrackpore for an otherwise identical property.",
    "hint": "One-hot dummy indicator columns quantifying location price premiums relative to a baseline.",
    "level": "Basic",
    "codeExample": "df_encoded = pd.get_dummies(df, columns=['Neighborhood'], drop_first=True)"
  },
  {
    "id": 17,
    "question": "What is Cook's Distance in real estate regression diagnostics?",
    "shortAnswer": "A metric measuring the leverage and influence of an individual house observation on all model regression coefficients combined.",
    "explanation": "If a single anomalous mega-mansion (e.g. an inherited heritage palace) single-handedly shifts all regression weights when removed, it has high Cook's Distance (D_i > 4/N or D_i > 1). Such points must be audited for data entry errors.",
    "hint": "Quantifies the total shift in regression parameters caused by omitting a specific data point.",
    "level": "Expert",
    "codeExample": "# In statsmodels: cooks_d = OLSResults.get_influence().cooks_distance[0]"
  },
  {
    "id": 18,
    "question": "What is Durbin-Watson statistic and what does it test for in real estate sales time-series?",
    "shortAnswer": "Tests for autocorrelation in regression residuals; DW \u2248 2 indicates no autocorrelation, while DW < 1.5 indicates positive serial correlation.",
    "explanation": "House sales recorded chronologically often exhibit macro trends (inflation, interest rate shifts). If residuals e_t are correlated with e_{t-1}, standard OLS underestimates coefficient standard errors. Autoregressive AR(1) error models resolve this.",
    "hint": "Tests whether regression residuals are serially correlated over time.",
    "level": "Expert",
    "codeExample": "from statsmodels.stats.stattools import durbin_watson\ndw = durbin_watson(residuals)"
  },
  {
    "id": 19,
    "question": "How do Interaction Terms model the joint effect of 'Area' and 'Neighborhood' in property appraisal?",
    "shortAnswer": "By multiplying Area * Neighborhood_Dummy, allowing the price per square foot slope to differ across different neighborhoods.",
    "explanation": "Without interaction terms, the model assumes \u20b94,500/sqft everywhere. Adding interaction terms allows Salt Lake to have \u20b97,500/sqft while Barrackpore has \u20b93,800/sqft, capturing distinct neighborhood rate slopes.",
    "hint": "Interaction terms allow slope gradients to vary across categorical subsets.",
    "level": "Moderate",
    "codeExample": "df['area_x_saltlake'] = df['area_sqft'] * df['neighborhood_SaltLake']"
  },
  {
    "id": 20,
    "question": "What is K-Fold Cross-Validation performance on house price prediction and why should test houses be stratified by price quantiles?",
    "shortAnswer": "To ensure that ultra-luxury, mid-market, and budget properties are equally represented across all training and validation folds.",
    "explanation": "If all rare multi-crore mansions randomly end up in the validation fold, the validation RMSE will spike falsely. Stratifying on binned price quantiles stabilizes fold variances.",
    "hint": "Binned quantile stratification prevents fold variance distortion from high-end properties.",
    "level": "Moderate",
    "codeExample": "price_bins = pd.qcut(df['price'], q=5, labels=False)\nskf = StratifiedKFold(n_splits=5).split(df, price_bins)"
  },
  {
    "id": 21,
    "question": "What is Mean Absolute Error (MAE) for house prices and why is it preferred by real estate brokers over MSE?",
    "shortAnswer": "MAE represents the intuitive average appraisal error in rupees (e.g. 'our model is on average within \u20b92.1 Lakhs of true price').",
    "explanation": "Because MSE reports squared units (Lakhs\u00b2), it has no intuitive real-world meaning. MAE computes (1/N) \u2211 |y_i - y_hat_i|, providing a direct, uninflated expected rupee margin of error.",
    "hint": "Direct linear rupee error without quadratic squaring distortion.",
    "level": "Basic",
    "codeExample": "mae = np.mean(np.abs(y_true - y_pred))"
  },
  {
    "id": 22,
    "question": "What is Gradient Descent Learning Rate \u03b1 (alpha) and what happens if it is set too large (e.g. \u03b1 = 10.0) in house price regression?",
    "shortAnswer": "The step size multiplier; if \u03b1 is too large, parameter updates overshoot the minimum, causing cost J(w) to oscillate wildly and diverge to infinity.",
    "explanation": "Gradient descent step is w := w - \u03b1 * grad. If the step is larger than the curvature radius of the parabolic loss surface, each update lands further up the opposite wall, leading to numerical overflow (NaN).",
    "hint": "Excessive learning rate overshoots the minimum and causes loss explosion.",
    "level": "Basic",
    "codeExample": "# If cost increases every epoch: decrease learning rate (e.g. from 0.1 to 0.001)"
  },
  {
    "id": 23,
    "question": "What is Feature Importance in Random Forest Regressors for House Price Prediction?",
    "shortAnswer": "The total reduction in Mean Squared Error (variance) brought about by all splits on a given feature across all ensemble trees.",
    "explanation": "Features that appear near the root of trees and create massive drops in price variance across child nodes (e.g. `Area_sqft`, `Neighborhood`) receive top Gini/variance importance percentages summing to 1.0.",
    "hint": "Total variance reduction achieved by splitting on a feature across all trees.",
    "level": "Moderate",
    "codeExample": "from sklearn.ensemble import RandomForestRegressor\nrf = RandomForestRegressor().fit(X, y)\nprint(dict(zip(feature_names, rf.feature_importances_)))"
  },
  {
    "id": 24,
    "question": "How does Gradient Boosted Trees (XGBoost / LightGBM) predict house prices compared to Multiple Linear Regression?",
    "shortAnswer": "By fitting an ensemble of shallow regression trees sequentially to the pseudo-residuals of previous trees, capturing complex non-linear interactions automatically.",
    "explanation": "While linear regression requires human feature engineering of polynomial powers and interaction terms, GBDTs discover non-linear step functions and multi-variable interactions autonomously through recursive tree partitioning.",
    "hint": "Sequential residual boosting capturing non-linear interactions without manual feature engineering.",
    "level": "Moderate",
    "codeExample": "import xgboost as xgb\nmodel = xgb.XGBRegressor(n_estimators=100, learning_rate=0.05, max_depth=4)\nmodel.fit(X_train, y_train)"
  },
  {
    "id": 25,
    "question": "What is Quantile Regression for house price prediction and how does it generate valuation ranges (e.g. \u20b955L to \u20b968L)?",
    "shortAnswer": "By fitting separate models for the 10th percentile (conservative valuation) and 90th percentile (optimistic valuation) using pinball loss.",
    "explanation": "Instead of a single point prediction (e.g. \u20b962 Lakhs), fitting quantile regressors at \u03c4=0.10 and \u03c4=0.90 provides buyers and mortgage lenders with an 80% confidence price interval.",
    "hint": "Predicting 10th and 90th percentiles to output realistic price confidence bounds.",
    "level": "Expert",
    "codeExample": "from sklearn.linear_model import QuantileRegressor\nq_low = QuantileRegressor(quantile=0.10).fit(X, y)\nq_high = QuantileRegressor(quantile=0.90).fit(X, y)"
  },
  {
    "id": 26,
    "question": "What is Spatial Lag in real estate Hedonic Price Modeling?",
    "shortAnswer": "Including the average sale price of neighboring houses sold in the past 6 months as an explicit explanatory predictor feature.",
    "explanation": "Spatial econometrics models house price as y_i = \u03c1 W y + X \u03b2 + \u03b5, where W is the spatial contiguity matrix. If adjacent homes recently sold at high valuations, local neighborhood momentum directly boosts the appraisal of house i.",
    "hint": "Incorporating the recent sale prices of spatially adjacent neighboring properties.",
    "level": "Expert",
    "codeExample": "# Spatial lag feature: df['avg_neighbor_price_500m'] = compute_spatial_lag(df)"
  },
  {
    "id": 27,
    "question": "Why is the Coefficient of Determination R\u00b2 not bounded below by 0 when evaluated on held-out test data?",
    "shortAnswer": "Because if a model performs worse than simply predicting the training target mean y_bar, residual sum of squares SS_res > SS_tot, making R\u00b2 negative.",
    "explanation": "R\u00b2 = 1 - (SS_res / SS_tot). In-sample training R\u00b2 is always \u2265 0. But on test data, a severely overfitted model with wild out-of-distribution predictions can have huge errors, resulting in negative R\u00b2 (e.g. R\u00b2 = -2.5).",
    "hint": "Severe test errors larger than target variance produce negative R\u00b2 scores.",
    "level": "Moderate",
    "codeExample": "# Negative R2 indicates catastrophic model failure worse than constant mean prediction"
  },
  {
    "id": 28,
    "question": "What is the role of Recursive Feature Elimination (RFE) in trimming real estate feature sets?",
    "shortAnswer": "Iteratively pruning the least significant property features (e.g., number of balconies, garden orientation) to build a lean, robust appraisal model.",
    "explanation": "Real estate datasets often collect 50+ minor survey variables. RFE uses cross-validation to drop uninformative features whose removal causes zero decrease in validation RMSE, reducing appraisal survey overhead.",
    "hint": "Iterative pruning of non-essential survey features to minimize data collection costs.",
    "level": "Basic",
    "codeExample": "from sklearn.feature_selection import RFE\nrfe = RFE(estimator=LinearRegression(), n_features_to_select=5).fit(X, y)"
  },
  {
    "id": 29,
    "question": "How does SHAP (SHapley Additive exPlanations) explain why a specific house was valued at \u20b998.0 Lakhs?",
    "shortAnswer": "By computing the additive marginal contribution of each feature to the difference between the base average price (\u20b950L) and the final prediction (\u20b998L).",
    "explanation": "SHAP breaks down the valuation: Base Price = \u20b950L; +\u20b930L (Large Area: 1650 sqft); +\u20b915L (Salt Lake Tech Corridor); +\u20b95L (0.5km to Metro); -\u20b92L (Building Age). Total = \u20b998L, providing complete transparent appraisal auditability.",
    "hint": "Additive game-theoretic feature attribution breaking down individual property valuations.",
    "level": "Moderate",
    "codeExample": "import shap\nexplainer = shap.Explainer(model)\nshap_values = explainer(X_single_house)"
  },
  {
    "id": 30,
    "question": "What is the core takeaway from the House Price Prediction Worked Example in applied machine learning?",
    "shortAnswer": "Regression maps continuous feature spaces to continuous economic outcomes; robust feature scaling, regularization, and residual diagnostics ensure accurate, explainable predictions.",
    "explanation": "Through house price prediction, students master the foundational mechanics of hypothesis formulation h(x)=w^T x+b, gradient descent optimization, evaluation metrics (RMSE, MAE, R\u00b2), and the essential role of feature engineering in real-world tabular data.",
    "hint": "Mastering hypothesis formulation, gradient optimization, and evaluation metrics on continuous tabular data.",
    "level": "Basic",
    "codeExample": "# The Complete Regression Loop: Load Data -> Standardize -> Fit Regressor -> Audit Residuals -> Predict"
  }
];

export default questions;
