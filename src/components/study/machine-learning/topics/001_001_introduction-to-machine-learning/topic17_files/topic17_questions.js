/**
 * Topic 17: Worked Example 4: Spam Email Classification
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "In Spam Email Classification, how does Bayes' Theorem formulate the posterior probability of an email being Spam given its word tokens w = (w_1, w_2, ..., w_d)?",
    "shortAnswer": "P(Spam | w) = [ P(Spam) \u00b7 P(w | Spam) ] / P(w) = [ P(Spam) \u220f_{j=1}^d P(w_j | Spam) ] / P(w).",
    "explanation": "Bayes' Theorem updates the prior belief P(Spam) using the conditional likelihood of observing word features in spam emails. The denominator P(w) is the total marginal probability acting as a normalizing constant.",
    "hint": "Prior probability multiplied by product of feature likelihoods divided by evidence.",
    "level": "Basic",
    "codeExample": "# Bayes rule: Posterior = (Prior * Likelihood) / Evidence"
  },
  {
    "id": 2,
    "question": "What is the 'Naive' Conditional Independence Assumption in the Naive Bayes Classifier?",
    "shortAnswer": "It assumes that all word feature occurrences are strictly conditionally independent given the email class label: P(w_1, w_2, ..., w_d | C) = \u220f_{j=1}^d P(w_j | C).",
    "explanation": "In real text, words correlate heavily ('lottery' and 'prize' appear together). The Naive assumption ignores pairwise word co-dependencies, which simplifies the model from exponential O(V^d) joint probabilities to linear O(V \u00b7 d) marginals while performing remarkably well in practice.",
    "hint": "Assumes words appear independently of each other once class label is fixed.",
    "level": "Basic",
    "codeExample": "# Joint likelihood factorization under conditional independence:\n# P('lottery', 'prize' | Spam) = P('lottery' | Spam) * P('prize' | Spam)"
  },
  {
    "id": 3,
    "question": "Why is Laplace Smoothing (Additive Smoothing, \u03b1 = 1) mandatory when computing word likelihoods in Naive Bayes?",
    "shortAnswer": "To prevent the Zero Frequency Problem: if an unseen word has P(w_j | Spam) = 0, the entire product \u220f P(w_j | Spam) collapses to zero.",
    "explanation": "Without smoothing, encountering a single novel word in a spam email would wipe out all other evidence (multiplying by 0). Laplace smoothing adds pseudo-counts: P(w_j | C) = (Count(w_j, C) + \u03b1) / (Total_Words_in_C + \u03b1 \u00b7 |V|), where |V| is vocabulary size.",
    "hint": "Adds pseudo-count \u03b1 to prevent zero probability from destroying product calculations.",
    "level": "Basic",
    "codeExample": "p_word_given_c = (count_w_in_c + 1.0) / (total_words_c + len(vocab))"
  },
  {
    "id": 4,
    "question": "Why are Naive Bayes computations executed in Log-Probability space rather than multiplying raw probabilities directly?",
    "shortAnswer": "Multiplying hundreds of tiny fractional probabilities (e.g. 0.0001^50) causes floating-point arithmetic underflow (rounding to 0.0).",
    "explanation": "In log space: ln P(C | w) \u221d ln P(C) + \u2211_{j=1}^d ln P(w_j | C). Adding negative log values converts unstable small multiplications into stable numerical additions, eliminating underflow.",
    "hint": "Log transformation converts tiny fractional multiplications into stable summations.",
    "level": "Moderate",
    "codeExample": "log_posterior = np.log(prior_spam) + np.sum(np.log(likelihoods_spam))"
  },
  {
    "id": 5,
    "question": "What is the Bag-of-Words (BoW) text representation model?",
    "shortAnswer": "A vector representation that counts the frequency of each dictionary word in the document, discarding grammar and word order.",
    "explanation": "A predefined vocabulary V = ['urgent', 'lottery', 'prize', 'assignment', ...] maps each document into a vector x \u2208 \u2124^{|V|} where x_j is the integer occurrence count of word j in that email.",
    "hint": "Word frequency histogram vector ignoring grammatical word order.",
    "level": "Basic",
    "codeExample": "from sklearn.feature_extraction.text import CountVectorizer\ncv = CountVectorizer(stop_words='english')\nX_bow = cv.fit_transform(email_texts)"
  },
  {
    "id": 6,
    "question": "What is TF-IDF (Term Frequency - Inverse Document Frequency) and how does it improve upon simple Bag-of-Words counts?",
    "shortAnswer": "It downweights common words that appear in every email ('the', 'please') and boosts rare informative keywords ('lottery', 'crypto').",
    "explanation": "TF-IDF = TF(t, d) * ln(N / DF(t)). A word appearing in 100% of emails has IDF = ln(1) = 0 (zero weight). A word appearing in only 3 spam emails receives high IDF, making it a powerful discriminative feature.",
    "hint": "Penalizes ubiquitous words and rewards rare discriminative keywords.",
    "level": "Basic",
    "codeExample": "from sklearn.feature_extraction.text import TfidfVectorizer\ntfidf = TfidfVectorizer(max_features=2500)\nX_tfidf = tfidf.fit_transform(email_texts)"
  },
  {
    "id": 7,
    "question": "What are the three variants of Naive Bayes in scikit-learn and when is Multinomial Naive Bayes preferred?",
    "shortAnswer": "Gaussian (continuous features), Bernoulli (binary word presence 0/1), and Multinomial (discrete word count / TF-IDF frequencies).",
    "explanation": "Multinomial Naive Bayes models the multinomial distribution of word counts generated from a document vocabulary. It is the gold standard for text classification and spam filtering with BoW and TF-IDF features.",
    "hint": "Multinomial handles word frequency counts in text documents.",
    "level": "Moderate",
    "codeExample": "from sklearn.naive_bayes import MultinomialNB\nnb_classifier = MultinomialNB(alpha=1.0)\nnb_classifier.fit(X_train_tfidf, y_train)"
  },
  {
    "id": 8,
    "question": "What is the severe operational cost of a False Positive (FP) in Spam Email Filtering?",
    "shortAnswer": "A critical legitimate email (e.g. college admission letter, bank OTP, job offer) is falsely sent to Spam and missed by the user.",
    "explanation": "Users tolerate a few spam emails slipping into their Inbox (False Negatives), but missing a life-critical job offer or legal notice (False Positive) is unacceptable. Spam filters must be tuned for ultra-high Precision (\u2265 99.9%).",
    "hint": "False Positive misroutes legitimate important emails into the spam folder.",
    "level": "Basic",
    "codeExample": "# Spam Filter Rule: Set threshold high (e.g. 0.95) to guarantee Precision >= 99.9%"
  },
  {
    "id": 9,
    "question": "What are Stop Words in NLP preprocessing and why are they frequently filtered out?",
    "shortAnswer": "High-frequency syntactic function words ('is', 'at', 'which', 'on') that carry zero topical sentiment or spam discriminative information.",
    "explanation": "Filtering stop words reduces vocabulary size |V| by 30-40%, shrinks feature matrix memory footprints, and prevents algorithms from learning spurious noise correlations on common functional words.",
    "hint": "Common grammatical words filtered out to reduce vocabulary noise and dimensionality.",
    "level": "Basic",
    "codeExample": "from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS\n# CountVectorizer(stop_words='english')"
  },
  {
    "id": 10,
    "question": "What is Stemming (Porter Stemmer) versus Lemmatization (WordNet) in email text normalization?",
    "shortAnswer": "Stemming chops off word suffixes via crude heuristics ('winning' \u2192 'win'); Lemmatization reduces words to canonical dictionary lemmas using vocabulary and morphological analysis ('better' \u2192 'good').",
    "explanation": "Stemming is fast and rule-based but produces non-words ('laziness' \u2192 'lazi'). Lemmatization considers part-of-speech context to return valid base dictionary words, preserving grammatical semantics.",
    "hint": "Heuristic suffix chopping vs linguistic morphological dictionary base form.",
    "level": "Moderate",
    "codeExample": "# Stemming: 'running' -> 'run'\n# Lemmatization: 'went' -> 'go' (POS='v')"
  },
  {
    "id": 11,
    "question": "What are N-Grams (e.g. Bigrams, Trigrams) and how do they capture context in spam detection?",
    "shortAnswer": "Contiguous sequences of n words; bigrams like 'cash prize' or 'free bonus' capture phrases that individual unigrams miss.",
    "explanation": "The unigram 'free' is common in legitimate emails ('free to meet tomorrow?'). But the bigram 'free cash' and trigram 'click link below' are strongly correlated with phishing and spam. N-grams capture local word order.",
    "hint": "Sequences of n consecutive words capturing contextual phrases.",
    "level": "Basic",
    "codeExample": "tfidf_ngram = TfidfVectorizer(ngram_range=(1, 2)) # Unigrams + Bigrams"
  },
  {
    "id": 12,
    "question": "How does an Adversarial Spammer use 'Bayesian Poisoning' (Good Word Attacks) to evade spam filters?",
    "shortAnswer": "By appending large blocks of innocent, legitimate words (from news articles or novels) into the spam email to dilute spam keyword ratios.",
    "explanation": "If a spam email has 10 spam keywords and 500 innocent words ('academic', 'university', 'research'), the product of likelihoods for the Ham class will overwhelm the Spam class, tricking naive Bayesian filters. Modern filters use deep transformer embeddings to detect true intent.",
    "hint": "Injecting innocent dictionary words to dilute spam keyword likelihood ratios.",
    "level": "Expert",
    "codeExample": "# Bayesian Poisoning: [Spam payload] + [1000 words copied from Wikipedia]"
  },
  {
    "id": 13,
    "question": "What is Subword Tokenization (e.g. Byte-Pair Encoding / WordPiece) and how does it solve Out-Of-Vocabulary (OOV) misspelling tricks?",
    "shortAnswer": "Decomposing words into frequent subword chunks (e.g. 'v!agra' or 'w1nner' \u2192 'w', '1', 'nner'); handles novel misspellings without vocabulary explosion.",
    "explanation": "Spammers deliberately misspell words ('w!n', 'c@sh') to evade fixed word vocabularies. Subword tokenizers break words into sub-character byte pairs, allowing transformer models to recognize root components robustly.",
    "hint": "Decomposing unknown words into frequent subword units to thwart obfuscated spelling.",
    "level": "Expert",
    "codeExample": "# 'unbelievable' -> ['un', '##believ', '##able']"
  },
  {
    "id": 14,
    "question": "What auxiliary metadata features (beyond body text) are vital in enterprise spam and phishing filters?",
    "shortAnswer": "Sender domain reputation, SPF/DKIM/DMARC authentication flags, reply-to mismatches, link URL redirect chains, and email attachment file types.",
    "explanation": "Modern email gateways evaluate multimodal features. An email with clean body text but a failed SPF domain check or a hidden zero-width homoglyph character in the sender address is immediately flagged by security classifiers.",
    "hint": "Domain security records, header routing trails, and URL destination analysis.",
    "level": "Basic",
    "codeExample": "# Engineered features: [body_length, num_links, spf_pass_flag, dkim_valid, domain_age_days]"
  },
  {
    "id": 15,
    "question": "What is the Prior Probability P(Spam) in Naive Bayes and how is it estimated from training data?",
    "shortAnswer": "P(Spam) = Count(Spam_Emails) / Total_Emails_in_Dataset.",
    "explanation": "The prior represents the baseline historical probability of receiving a spam email before reading any words in the message. In a dataset with 2,000 spam and 8,000 ham emails, P(Spam) = 2000/10000 = 0.20.",
    "hint": "Fraction of spam messages in the training corpus.",
    "level": "Basic",
    "codeExample": "prior_spam = np.mean(y_train == 1)\nprior_ham = np.mean(y_train == 0)"
  },
  {
    "id": 16,
    "question": "How is the Decision Rule formulated to classify an email as Spam vs Ham in Naive Bayes?",
    "shortAnswer": "Classify as Spam if ln P(Spam) + \u2211 ln P(w_j | Spam) > ln P(Ham) + \u2211 ln P(w_j | Ham) + ln(Threshold_Ratio).",
    "explanation": "Comparing log-posteriors determines the winning class. Adding a threshold offset ln(\u03b8) allows tuning for extreme precision to protect legitimate messages from false classification.",
    "hint": "Assigning class with higher log-posterior plus threshold margin.",
    "level": "Moderate",
    "codeExample": "log_spam_score = np.log(prior_spam) + X_vec @ np.log(p_w_given_spam)\nlog_ham_score = np.log(prior_ham) + X_vec @ np.log(p_w_given_ham)\nis_spam = log_spam_score > log_ham_score"
  },
  {
    "id": 17,
    "question": "What is Character N-Gram feature extraction in text classification?",
    "shortAnswer": "Extracting sequences of n characters (e.g. 3-grams: 'cas', 'ash', 'sh_') rather than whole words, providing resilience against obfuscated spellings.",
    "explanation": "If a spammer writes 'c@sh' or 'C.A.S.H', word tokenizers fail. Character n-gram tokenizers (`analyzer='char_wb'`) capture character sub-patterns across word boundaries, robustly detecting obfuscated keywords.",
    "hint": "Sliding window of n characters within word boundaries.",
    "level": "Moderate",
    "codeExample": "char_vectorizer = TfidfVectorizer(analyzer='char_wb', ngram_range=(3, 5))"
  },
  {
    "id": 18,
    "question": "What is the Bernoulli Naive Bayes model and how does its feature representation differ from Multinomial Naive Bayes?",
    "shortAnswer": "Bernoulli NB uses binary feature presence (b_j \u2208 {0, 1}) and explicitly models word ABSENCE: P(w|C) = \u220f p_j^{b_j} (1 - p_j)^{1 - b_j}.",
    "explanation": "Multinomial NB cares about word frequency counts. Bernoulli NB cares only whether a word is present or absent. It explicitly penalizes the absence of common legitimate words, making it well-suited for short text messages (SMS spam).",
    "hint": "Binary word presence/absence model explicitly incorporating missing words.",
    "level": "Expert",
    "codeExample": "from sklearn.naive_bayes import BernoulliNB\nbernoulli_clf = BernoulliNB().fit(X_binary, y_train)"
  },
  {
    "id": 19,
    "question": "How does Support Vector Machine (Linear SVM) compare with Naive Bayes on high-dimensional text classification?",
    "shortAnswer": "Linear SVM often achieves higher accuracy because it optimizes the maximum margin hyperplane without assuming conditional feature independence.",
    "explanation": "Text TF-IDF spaces have thousands of features (d > 10,000) and are often linearly separable. Linear SVM finds the widest margin separating spam and ham, capturing word interactions that Naive Bayes ignores.",
    "hint": "Maximum margin hyperplane without conditional independence assumptions.",
    "level": "Moderate",
    "codeExample": "from sklearn.svm import LinearSVC\nsvm_text = LinearSVC(C=1.0).fit(X_train_tfidf, y_train)"
  },
  {
    "id": 20,
    "question": "What is Mutual Information feature selection for text classification vocabularies?",
    "shortAnswer": "Selecting the top K words that provide the greatest reduction in uncertainty regarding whether an email is spam or ham.",
    "explanation": "Words like 'the' have MI \u2248 0. Words like 'viagra', 'cryptocurrency', 'urgent', or 'assignment' have high MI with class labels. Trimming vocabulary from 50,000 to top 2,000 MI words speeds up training with zero accuracy loss.",
    "hint": "Ranks dictionary words by their information gain relative to spam class labels.",
    "level": "Moderate",
    "codeExample": "from sklearn.feature_selection import SelectKBest, mutual_info_classif\nselector = SelectKBest(mutual_info_classif, k=1500).fit(X_tfidf, y)"
  },
  {
    "id": 21,
    "question": "What is Chi-Square (\u03c7\u00b2) Feature Selection in document categorization?",
    "shortAnswer": "Tests statistical independence between word presence and class category; words with large \u03c7\u00b2 values have strong class-specific association.",
    "explanation": "\u03c7\u00b2 measures the difference between observed word-class co-occurrences and expected co-occurrences under the null hypothesis of independence: \u03c7\u00b2 = \u2211 (O - E)\u00b2 / E. Top \u03c7\u00b2 features represent pure spam or ham indicators.",
    "hint": "Statistical contingency test measuring divergence from random class co-occurrence.",
    "level": "Moderate",
    "codeExample": "from sklearn.feature_selection import chi2\nchi2_scores, p_values = chi2(X_bow, y)"
  },
  {
    "id": 22,
    "question": "How does BERT / DistilBERT classify spam emails using Transformer Contextual Embeddings?",
    "shortAnswer": "By passing token sequences through bidirectional multi-head self-attention and feeding the `[CLS]` token embedding into a classification head.",
    "explanation": "Unlike BoW (which destroys word order), BERT evaluates full bidirectional sentence context. It distinguishes 'I need cash for groceries' (Ham) from 'Claim your free cash prize' (Spam) based on deep syntactic context.",
    "hint": "Bidirectional transformer self-attention embedding the whole sentence context.",
    "level": "Moderate",
    "codeExample": "# BERT spam classifier: [CLS] token -> Dropout -> Linear(768, 2) -> CrossEntropy"
  },
  {
    "id": 23,
    "question": "What is Spam Drift (Adversarial Concept Drift)?",
    "shortAnswer": "Spammers continuously changing their phrasing, templates, and evasion tactics over time, causing static spam filters to decay in accuracy.",
    "explanation": "Spam filtering is an adversarial cat-and-mouse game. As soon as filters block lottery scams, spammers pivot to crypto investment phishing or invoice fraud. Continuous automated pipeline retraining on user-reported spam buttons is mandatory.",
    "hint": "Adversarial evolution of attacker tactics rendering historical rules obsolete.",
    "level": "Basic",
    "codeExample": "# User clicks 'Report Spam' -> Automatically appends to daily retraining corpus"
  },
  {
    "id": 24,
    "question": "What is the Precision-Recall curve in spam classification and why is Precision @ 99% Recall benchmarked?",
    "shortAnswer": "To ensure that achieving high spam catch rate (Recall) does not compromise the near-zero false alarm rate (Precision).",
    "explanation": "In production email systems, product managers enforce a strict SLA: 'Precision must remain \u2265 99.9%'. The optimization team tunes decision thresholds to maximize Recall subject to this non-negotiable Precision constraint.",
    "hint": "Maximizing spam detection recall while strictly enforcing near-100% precision.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import precision_recall_curve\nprec, rec, thresholds = precision_recall_curve(y_test, y_probs)"
  },
  {
    "id": 25,
    "question": "How does Regular Expression (Regex) rule pre-filtering complement Machine Learning in enterprise mail gateways?",
    "shortAnswer": "Regex instantly catches known malicious URL patterns and known regex signatures in microseconds before routing complex text to ML models.",
    "explanation": "High-volume mail servers process millions of emails/hour. Deterministic regex rules filter obvious malicious links and known malware signatures instantly, saving expensive GPU inference cycles for nuanced, borderline phishing messages.",
    "hint": "Fast microsecond regex matching for known signatures prior to deep ML scoring.",
    "level": "Basic",
    "codeExample": "# Pre-filter: if re.search(r'bit\\.ly/[a-zA-Z0-9]+', body) and failed_spf: block_immediately()"
  },
  {
    "id": 26,
    "question": "What is Document Frequency (DF) thresholding in text vectorization?",
    "shortAnswer": "Pruning words that appear in fewer than `min_df` documents (rare typos) or more than `max_df` fraction of documents (corpus-wide ubiquitous words).",
    "explanation": "`min_df=3` discards one-off misspelled words that appear only once in the entire corpus. `max_df=0.90` discards words that appear in over 90% of documents. This cleans the dictionary efficiently.",
    "hint": "Filtering out ultra-rare noise words and universal corpus stop words.",
    "level": "Basic",
    "codeExample": "vectorizer = TfidfVectorizer(min_df=3, max_df=0.85)"
  },
  {
    "id": 27,
    "question": "What is Cosine Similarity between document TF-IDF vectors in spam clustering?",
    "shortAnswer": "cos(u, v) = (u \u00b7 v) / (||u|| ||v||); measures the angle between two emails to detect spam campaigns generated from identical templates.",
    "explanation": "Spam botnets blast millions of slightly modified emails from a single template. Computing cosine similarity clusters these messages into identical spam outbreak campaigns, allowing security teams to block entire botnets in one action.",
    "hint": "Angular similarity detecting coordinated spam botnet template campaigns.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics.pairwise import cosine_similarity\nsim_matrix = cosine_similarity(X_tfidf)"
  },
  {
    "id": 28,
    "question": "What is Complement Naive Bayes (CNB) and why is it superior for imbalanced text classification?",
    "shortAnswer": "CNB estimates parameters from the complement of each class (all classes except C), correcting for empirical class frequency imbalance.",
    "explanation": "Standard Multinomial NB parameter estimates are skewed toward majority classes. CNB computes weights using instances outside class C, producing more balanced decision boundaries on heavily skewed spam datasets.",
    "hint": "Estimates parameters from out-of-class samples to counteract class imbalance.",
    "level": "Expert",
    "codeExample": "from sklearn.naive_bayes import ComplementNB\ncnb = ComplementNB().fit(X_train_tfidf, y_train)"
  },
  {
    "id": 29,
    "question": "What is the role of the Confusion Matrix in auditing spam classifier performance?",
    "shortAnswer": "Quantifies TP (Spam correctly caught), TN (Ham correctly delivered), FP (Ham wrongfully blocked), and FN (Spam leaked into inbox).",
    "explanation": "Looking at the confusion matrix allows email security engineers to verify that FP is zero or near-zero before deploying new model weights to live production mail exchangers.",
    "hint": "2x2 audit table tracking true classifications and misclassification costs.",
    "level": "Basic",
    "codeExample": "cm = confusion_matrix(y_true, y_pred)\n# TN = Legitimate in Inbox, FP = Legitimate in Spam,\n# FN = Spam in Inbox, TP = Spam in Spam"
  },
  {
    "id": 30,
    "question": "What is the core conceptual lesson of the Spam Email Classification Worked Example?",
    "shortAnswer": "How probabilistic reasoning (Bayes' Theorem), NLP text vectorization (BoW/TF-IDF), Laplace smoothing, and asymmetric cost evaluation unite to solve real-world text classification.",
    "explanation": "Spam classification illustrates how unstructured human text is transformed into mathematical feature matrices, how probabilistic models generalize from word co-occurrences, and how real-world engineering constraints (near-zero FP) dictate machine learning design.",
    "hint": "Mastering NLP feature extraction, probabilistic Naive Bayes, and asymmetric cost optimization.",
    "level": "Basic",
    "codeExample": "# NLP Spam Pipeline: Raw Text -> Cleaning -> TF-IDF -> MultinomialNB -> High-Precision Thresholding"
  }
];

export default questions;
