/**
 * Topic 18: Worked Example 5: Customer Segmentation
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "In the Customer Segmentation worked example, what do the three RFM feature dimensions represent?",
    "shortAnswer": "Recency (days since last purchase), Frequency (total number of transactions in past year), and Monetary Value (total annual spend in \u20b9).",
    "explanation": "RFM is the foundational feature engineering framework in retail and e-commerce. It summarizes messy transactional timestamps into a standardized 3D behavioral coordinate space x_i = [Recency_i, Frequency_i, Monetary_i]^T for each customer.",
    "hint": "Recency of last visit, Frequency of purchases, Monetary annual revenue.",
    "level": "Basic",
    "codeExample": "# RFM Feature Vector\nx_customer = np.array([4, 28, 42000]) # [Recency_days, Frequency_orders, Monetary_rupees]"
  },
  {
    "id": 2,
    "question": "Why is Log-Transformation (e.g. `np.log1p`) typically applied to Monetary and Frequency features before clustering?",
    "shortAnswer": "To compress severe right-skewed power-law distributions (Pareto 80/20 rule) into symmetrical Gaussian-like spatial spreads.",
    "explanation": "In retail, a few VIP customers spend \u20b95,00,000 while the median spends \u20b92,000. Without log-transformation, the massive spenders stretch Euclidean space so severely that 99% of regular customers get collapsed into a single giant cluster.",
    "hint": "Normalizes long power-law tails to prevent extreme spenders from distorting spatial clusters.",
    "level": "Moderate",
    "codeExample": "df_rfm['log_monetary'] = np.log1p(df_rfm['monetary'])\ndf_rfm['log_frequency'] = np.log1p(df_rfm['frequency'])"
  },
  {
    "id": 3,
    "question": "Why is Feature Standardization (StandardScaler) mandatory prior to K-Means customer segmentation?",
    "shortAnswer": "Monetary value (thousands of \u20b9) has numerical variance millions of times larger than Recency (days 1-365) and Frequency (1-50).",
    "explanation": "Euclidean distance d = sqrt(\u0394R\u00b2 + \u0394F\u00b2 + \u0394M\u00b2). Without scaling, \u0394M\u00b2 (e.g. 10,000\u00b2 = 100,000,000) completely overwhelms \u0394R\u00b2 (e.g. 5\u00b2 = 25), causing K-Means to cluster 100% on spend and 0% on recency and frequency.",
    "hint": "StandardScaler ensures Recency, Frequency, and Monetary contribute equally to Euclidean distance.",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import StandardScaler\nX_scaled = StandardScaler().fit_transform(df_rfm[['recency', 'frequency', 'monetary']])"
  },
  {
    "id": 4,
    "question": "What is the K-Means optimization objective function (Inertia / WCSS) minimized in customer segmentation?",
    "shortAnswer": "J = \u2211_{k=1}^K \u2211_{i \u2208 C_k} ||x_i - \u03bc_k||^2 (sum of squared Euclidean distances from each customer to their assigned cluster centroid).",
    "explanation": "K-Means seeks K centroid coordinates \u03bc_1, ..., \u03bc_K that minimize within-cluster dispersion. It partitions customers into compact, cohesive Voronoi polyhedral cells in standardized RFM space.",
    "hint": "Within-Cluster Sum of Squares (WCSS) measuring cluster tightness around centroids.",
    "level": "Basic",
    "codeExample": "from sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=3, random_state=42).fit(X_scaled)\ninertia = kmeans.inertia_"
  },
  {
    "id": 5,
    "question": "How does the 'Elbow Method' identify the optimal number of customer segments K?",
    "shortAnswer": "By plotting WCSS (Inertia) against candidate values of K (e.g. 1 to 8) and selecting the inflection point where the curve abruptly bends.",
    "explanation": "Inertia decreases with increasing K. The elbow point represents the balance where adding another cluster provides diminishing returns in variance reduction, signaling the most natural number of customer archetypes.",
    "hint": "Inflection point on the Inertia vs K plot where marginal variance reduction slows down.",
    "level": "Basic",
    "codeExample": "inertias = [KMeans(n_clusters=k).fit(X_scaled).inertia_ for k in range(1, 9)]\n# Plot inertias vs range(1, 9)"
  },
  {
    "id": 6,
    "question": "What does a Silhouette Score of +0.65 indicate for a 3-cluster customer segmentation solution?",
    "shortAnswer": "Strong, well-separated, and internally cohesive customer clusters with minimal boundary ambiguity.",
    "explanation": "The Silhouette Score evaluates (b_i - a_i) / max(a_i, b_i). Scores above 0.50 indicate robust cluster structure where intra-cluster distances a_i are significantly smaller than nearest-neighbor cluster distances b_i.",
    "hint": "High positive silhouette score signifies well-separated, compact cluster groupings.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import silhouette_score\nscore = silhouette_score(X_scaled, kmeans.labels_)\nprint(f'Silhouette Score: {score:.3f}')"
  },
  {
    "id": 7,
    "question": "In a 3-cluster retail model, what behavioral profile defines the 'VIP Champions' persona (Cluster 0)?",
    "shortAnswer": "Low Recency (visited 3-6 days ago), High Frequency (>25 visits/year), and High Monetary Spend (>\u20b940,000/year).",
    "explanation": "VIP Champions are the business's most valuable assets (top 15-20% generating 60%+ revenue). They love the brand, shop frequently, and spend heavily.",
    "hint": "Recent buyers with highest visit frequencies and largest financial spend.",
    "level": "Basic",
    "codeExample": "# VIP Persona: Recency=Low (recent), Frequency=High, Monetary=High"
  },
  {
    "id": 8,
    "question": "What actionable marketing strategy should a business execute for the 'VIP Champions' segment?",
    "shortAnswer": "Exclusive VIP lounge invites, early access to festive collections, dedicated relationship managers, and loyalty appreciation rewards without heavy discounting.",
    "explanation": "VIP champions do not need price cuts (they already buy at full price). Marketing should focus on brand prestige, personalized white-glove service, and exclusive previews to maximize long-term loyalty and word-of-mouth advocacy.",
    "hint": "Prestige recognition and premium perks rather than margin-destroying discounts.",
    "level": "Basic",
    "codeExample": "# Marketing Strategy: VIP Lounge Invite + Early Access to Durga Puja Collection"
  },
  {
    "id": 9,
    "question": "What behavioral profile defines the 'Hibernating At-Risk' customer persona (Cluster 2)?",
    "shortAnswer": "High Recency (>90-120 days since last visit), Low Frequency (1-2 visits), and Low Monetary Spend (<\u20b93,500).",
    "explanation": "These customers have not visited in months and made minimal past purchases. They are on the verge of permanent defection or have already switched to local competitors.",
    "hint": "Long time since last purchase with minimal lifetime transactions.",
    "level": "Basic",
    "codeExample": "# Hibernating Persona: Recency=High (long ago), Frequency=Low, Monetary=Low"
  },
  {
    "id": 10,
    "question": "What actionable marketing strategy should be deployed for the 'Hibernating At-Risk' segment?",
    "shortAnswer": "Automated 'We Miss You' win-back campaigns offering aggressive 25% re-activation discounts and surveys to uncover dissatisfaction reasons.",
    "explanation": "Because these customers are already lost, aggressive discount incentives carry zero margin risk on future sales. If they do not respond to win-back emails within 30 days, purge them from active paid marketing lists to save budget.",
    "hint": "Aggressive win-back discounts to revive inactive customer relationships.",
    "level": "Basic",
    "codeExample": "# Marketing Action: 'We Miss You' SMS with 25% discount coupon valid for 7 days"
  },
  {
    "id": 11,
    "question": "What behavioral profile defines the 'Budget Loyalists' persona (Cluster 1)?",
    "shortAnswer": "Moderate Recency (8-15 days), Moderate Frequency (18-22 visits), and Moderate Spend (\u20b914,000 - \u20b920,000) with high price sensitivity.",
    "explanation": "Budget Loyalists are steady, recurring volume shoppers (e.g. families buying monthly groceries). They shop consistently but hunt for value, promotions, and staple item discounts.",
    "hint": "Consistent recurring shoppers with moderate spend and high value sensitivity.",
    "level": "Basic",
    "codeExample": "# Budget Loyalist: Recency=Low/Mid, Frequency=Mid/High, Monetary=Moderate"
  },
  {
    "id": 12,
    "question": "What actionable marketing strategy should be deployed for 'Budget Loyalists'?",
    "shortAnswer": "Bulk-purchase bundle discounts, loyalty points cashback, and volume discount offers on household staple goods.",
    "explanation": "Targeting budget loyalists with volume bundles (e.g., 'Buy 5 kg rice, get 1 liter oil at 20% off') increases basket size and locks in their recurring monthly grocery budget.",
    "hint": "Volume bundles and loyalty cashback points to expand basket size.",
    "level": "Basic",
    "codeExample": "# Marketing Action: Bundle Staple Offers + Cashback Points per \u20b91,000 spend"
  },
  {
    "id": 13,
    "question": "How does Principal Component Analysis (PCA) assist in visualizing 3D or 10D customer segmentation in a 2D dashboard?",
    "shortAnswer": "By projecting standardized RFM features onto the top 2 principal component axes (PC1, PC2) that capture the greatest dataset variance.",
    "explanation": "Plotting multi-dimensional customer features directly is impossible on flat screens. PCA computes orthogonal linear combinations PC1 = w_1^T x and PC2 = w_2^T x, enabling intuitive 2D scatter plot visualization of cluster boundaries.",
    "hint": "Orthogonal 2D projection maximizing explained variance for scatter plot dashboards.",
    "level": "Moderate",
    "codeExample": "from sklearn.decomposition import PCA\npca = PCA(n_components=2)\nX_2d = pca.fit_transform(X_scaled)\nplt.scatter(X_2d[:, 0], X_2d[:, 1], c=kmeans.labels_)"
  },
  {
    "id": 14,
    "question": "How are new incoming customers assigned to existing clusters in production without retraining K-Means from scratch?",
    "shortAnswer": "By standardizing the new customer's RFM vector using the saved scaler and computing `kmeans.predict(new_scaled_vector)` to find the nearest centroid.",
    "explanation": "K-Means retains the fitted centroid coordinates \u03bc_k in memory. Calling `predict()` calculates Euclidean distance to all K saved centroids in microseconds and assigns the customer to the closest cluster centroid.",
    "hint": "Microsecond nearest-centroid assignment using saved scaler and centroid coordinates.",
    "level": "Basic",
    "codeExample": "# Production scoring of a new customer\nnew_rfm_scaled = scaler.transform([[5, 30, 48000]])\nassigned_cluster = kmeans.predict(new_rfm_scaled)[0]"
  },
  {
    "id": 15,
    "question": "What is a 'Snake Plot' (Profile Plot) in customer segmentation analysis?",
    "shortAnswer": "A line chart plotting standardized mean feature values (Recency, Frequency, Monetary) across each cluster on a normalized vertical scale.",
    "explanation": "A Snake Plot visualizes cluster personas side-by-side. The VIP cluster shows a line dipping low on Recency (-1.2\u03c3) and peaking high on Frequency (+1.5\u03c3) and Monetary (+1.8\u03c3), immediately exposing comparative segment profiles.",
    "hint": "Line chart comparing standardized feature means across all discovered segments.",
    "level": "Moderate",
    "codeExample": "# Snake plot: df_scaled.groupby('cluster').mean().T.plot()"
  },
  {
    "id": 16,
    "question": "What is Hierarchical Agglomerative Clustering for customer segmentation and when is it preferred over K-Means?",
    "shortAnswer": "When the business requires a hierarchical taxonomy (e.g. Major Tiers subdividing into Sub-Personas) visualized via a Dendrogram.",
    "explanation": "Agglomerative clustering builds nested relationships (e.g., Luxury Tier splits into 'Fashion VIPs' vs 'Electronics VIPs'). It avoids random initialization seed sensitivity, though it is computationally heavier O(N\u00b2).",
    "hint": "Hierarchical taxonomy tree breaking master segments into granular sub-segments.",
    "level": "Moderate",
    "codeExample": "from sklearn.cluster import AgglomerativeClustering\nagg = AgglomerativeClustering(n_clusters=3, linkage='ward').fit(X_scaled)"
  },
  {
    "id": 17,
    "question": "What is DBSCAN for customer segmentation and what unique value does it offer regarding outliers?",
    "shortAnswer": "DBSCAN clusters based on density and automatically isolates anomalous customers (noise label -1), such as fraudulent accounts or wholesale bulk buyers.",
    "explanation": "Unlike K-Means (which forces every outlier into a cluster), DBSCAN identifies points that fall in sparse regions. In retail, these noise points often represent institutional B2B bulk buyers or fraudulent credit card scrubbers.",
    "hint": "Separates dense consumer segments while isolating B2B bulk buyers and anomalies as noise.",
    "level": "Moderate",
    "codeExample": "from sklearn.cluster import DBSCAN\ndb = DBSCAN(eps=0.8, min_samples=5).fit(X_scaled)\n# db.labels_ == -1 indicates unusual outlier customers"
  },
  {
    "id": 18,
    "question": "What is Gaussian Mixture Model (GMM) soft segmentation and why is it valuable for borderline customers?",
    "shortAnswer": "It outputs posterior membership probabilities (e.g. 65% Budget Loyalist, 35% VIP Champion), capturing hybrid customer behaviors.",
    "explanation": "Hard K-Means assigns a customer 100% to one cluster. GMM soft clustering recognizes that a growing customer on the cusp of becoming a VIP can receive blended marketing campaigns combining staple bundles with VIP upgrade incentives.",
    "hint": "Probabilistic soft cluster membership capturing hybrid customer behaviors.",
    "level": "Moderate",
    "codeExample": "from sklearn.mixture import GaussianMixture\ngmm = GaussianMixture(n_components=3).fit(X_scaled)\nprobs = gmm.predict_proba(X_scaled)"
  },
  {
    "id": 19,
    "question": "What is the Davies-Bouldin Index and how does it evaluate customer cluster quality?",
    "shortAnswer": "It measures the average similarity ratio between each cluster and its most similar neighbor; lower Davies-Bouldin scores indicate superior clustering.",
    "explanation": "DB Index evaluates intra-cluster spread divided by inter-cluster distance: R_{ij} = (s_i + s_j) / d(\u03bc_i, \u03bc_j). A lower value means customer clusters are compact and widely separated from other personas.",
    "hint": "Similarity ratio between cluster spread and centroid distance (lower is better).",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import davies_bouldin_score\ndb = davies_bouldin_score(X_scaled, kmeans.labels_)"
  },
  {
    "id": 20,
    "question": "What is Customer Lifetime Value (CLV) integration with RFM clustering?",
    "shortAnswer": "Calculating expected future net profit generated by each customer segment: CLV = Average_Order_Value * Purchase_Frequency * Customer_Lifespan.",
    "explanation": "Integrating CLV transforms descriptive clustering into predictive financial strategy. Discovering that VIP Champions have an average CLV of \u20b92,50,000 justifies investing \u20b95,000 per VIP on premium gifts and loyalty retention.",
    "hint": "Estimating future net financial contribution per customer persona.",
    "level": "Basic",
    "codeExample": "# CLV = (Annual Revenue * Gross Margin %) / (Churn Rate %)"
  },
  {
    "id": 21,
    "question": "What is the danger of Cluster Migration (Segment Drift) over time?",
    "shortAnswer": "Customers naturally transition between segments as life events occur (e.g. a VIP Champion stops shopping and drifts into At-Risk).",
    "explanation": "Customer behavior is dynamic. If a VIP Champion's Recency metric slips from 5 days to 45 days, automated monitoring should flag 'VIP at Risk of Churn' immediately, triggering intervention before permanent defection.",
    "hint": "Dynamic movement of customers between personas over quarterly billing cycles.",
    "level": "Moderate",
    "codeExample": "# Migration Alert: If previous_cluster == 'VIP' and current_recency > 45: alert_account_manager()"
  },
  {
    "id": 22,
    "question": "How does K-Means++ initialization ensure reproducible, high-quality customer segmentation?",
    "shortAnswer": "By probabilistically spacing out initial centroids far apart across feature space, avoiding poor local minima where multiple centroids start in the same cluster.",
    "explanation": "Random initialization might start 3 centroids inside the dense mass of budget shoppers, splitting them arbitrarily while ignoring VIPs. K-Means++ guarantees diverse initial seeds across the entire customer distribution.",
    "hint": "Distance-weighted initial centroid spreading across customer feature space.",
    "level": "Basic",
    "codeExample": "kmeans = KMeans(n_clusters=3, init='k-means++', n_init=10)"
  },
  {
    "id": 23,
    "question": "How can categorical demographic features (e.g. City = 'Barrackpore', 'Salt Lake') be clustered alongside RFM features using K-Prototypes?",
    "shortAnswer": "K-Prototypes optimizes combined Euclidean distances for RFM numericals and matching dissimilarity for categorical city strings.",
    "explanation": "Because computing arithmetic means on city names is invalid, K-Prototypes harmonizes continuous RFM variables with categorical demographic attributes, creating localized regional customer personas.",
    "hint": "Combines continuous numerical Euclidean distance with categorical mode matching.",
    "level": "Moderate",
    "codeExample": "# from kmodes.kprototypes import KPrototypes\n# kproto = KPrototypes(n_clusters=3).fit(X_mixed, categorical=[3])"
  },
  {
    "id": 24,
    "question": "What is Cohort Analysis and how does it differ from static RFM clustering?",
    "shortAnswer": "Cohort analysis tracks customer retention over time grouped by acquisition month; RFM clustering groups customers by cumulative behavior regardless of acquisition date.",
    "explanation": "A cohort heatmap tracks the percentage of users acquired in January 2026 who remain active in months 1, 2, 3, etc. RFM clustering provides a snapshot of current engagement intensity across the entire database.",
    "hint": "Acquisition-date retention tracking over time vs behavioral snapshot grouping.",
    "level": "Moderate",
    "codeExample": "# Cohort matrix: df.groupby(['acquisition_month', 'activity_month'])['user_id'].nunique()"
  },
  {
    "id": 25,
    "question": "What is the Calinski-Harabasz Index (Variance Ratio Criterion) in segmentation benchmarking?",
    "shortAnswer": "The ratio of between-cluster dispersion to within-cluster dispersion; higher scores indicate tighter and better-separated customer segments.",
    "explanation": "CH = [SSB / (K - 1)] / [SSW / (N - K)]. Evaluating CH across K=2, 3, 4, 5 helps confirm the optimal elbow choice by finding peak between-cluster separation relative to internal customer spread.",
    "hint": "Ratio of between-segment dispersion to within-segment scatter (higher is better).",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import calinski_harabasz_score\nch = calinski_harabasz_score(X_scaled, kmeans.labels_)"
  },
  {
    "id": 26,
    "question": "How does Customer Segmentation power Personalized Recommendation Engines?",
    "shortAnswer": "By restricting candidate recommendation items to products popular within the user's specific cluster (Segment-Based Collaborative Filtering).",
    "explanation": "Recommending premium organic goods to budget loyalists yields low conversion. Segment filtering ensures that VIP Champions see luxury lines and budget shoppers see bulk-value promotions, solving the cold-start problem for new users.",
    "hint": "Filtering candidate recommendations based on top-selling items in the user's cluster.",
    "level": "Basic",
    "codeExample": "# Top recommendations for User i = Top_Selling_Items(User_i.cluster_id)"
  },
  {
    "id": 27,
    "question": "Why should the number of customer segments K rarely exceed 5 or 6 in real-world retail businesses?",
    "shortAnswer": "Because marketing and operational teams cannot execute, design, and manage 20 distinct weekly marketing campaigns simultaneously.",
    "explanation": "While an elbow plot might suggest K=12 mathematically, human marketing teams need actionable, distinguishable personas (VIPs, Budget Loyalists, At-Risk, New Shoppers). In business ML, practical operational interpretability overrides pure mathematical micro-clustering.",
    "hint": "Marketing operational bandwidth limits viable distinct campaign strategies to 3-6 segments.",
    "level": "Basic",
    "codeExample": "# Operational Rule: Choose K between 3 and 5 for actionable marketing execution"
  },
  {
    "id": 28,
    "question": "What is the 'Recent New Shoppers' persona in a 4-cluster RFM model?",
    "shortAnswer": "Low Recency (bought 2-5 days ago), Low Frequency (1-2 visits), and Moderate Spend; newly onboarded customers needing onboarding nurturing.",
    "explanation": "These are newly acquired customers who made their first purchase recently. Marketing must deploy welcome drip sequences, onboarding guides, and 2nd-purchase discount coupons to convert them into loyal repeat shoppers.",
    "hint": "First-time recent buyers requiring onboarding nurturing to build habit loop.",
    "level": "Basic",
    "codeExample": "# Recent New Shoppers: Recency=Low, Frequency=Low (1), Monetary=Moderate"
  },
  {
    "id": 29,
    "question": "How can CRM databases automate real-time cluster tag updates for sales agents?",
    "shortAnswer": "An automated ETL pipeline computes rolling 365-day RFM metrics nightly, scores `kmeans.predict()`, and writes segment tags into the customer's CRM profile.",
    "explanation": "When a sales representative at a retail store in Barrackpore looks up a customer's phone number, the POS screen displays: '\ud83c\udf1f VIP Champion - Gold Tier'. The representative immediately offers VIP assistance and complimentary packaging.",
    "hint": "Nightly ETL pipeline updating CRM customer persona tags for store POS terminals.",
    "level": "Basic",
    "codeExample": "# CRM Profile Update: UPDATE customers SET segment_tag = 'VIP Champion' WHERE id = 101;"
  },
  {
    "id": 30,
    "question": "What is the foundational takeaway from the Customer Segmentation Worked Example?",
    "shortAnswer": "Unsupervised learning transforms raw, unstructured customer transaction streams into actionable, high-ROI business intelligence personas via RFM feature engineering and spatial clustering.",
    "explanation": "Through customer segmentation, students master the full lifecycle of unsupervised learning: feature transformation (log scaling, standardization), K-Means clustering, cluster validation (Elbow, Silhouette), and translating mathematical centroids into strategic business value.",
    "hint": "Mastering RFM feature engineering, K-Means clustering, and translating centroids into business ROI.",
    "level": "Basic",
    "codeExample": "# The Unsupervised Loop: Transactions -> RFM -> Scale -> KMeans -> Cluster Personas -> Marketing Action"
  }
];

export default questions;
