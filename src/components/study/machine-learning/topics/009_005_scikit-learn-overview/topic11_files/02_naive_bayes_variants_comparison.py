"""
Topic 11: Naive Bayes
Script 2: Comparing GaussianNB, MultinomialNB, and BernoulliNB
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.naive_bayes import GaussianNB, MultinomialNB, BernoulliNB

# 1. GaussianNB: Continuous numerical features (assumes Gaussian normal distribution)
X_continuous = np.array([[1.5, 3.2], [2.1, 4.0], [5.8, 8.9], [6.2, 9.4]])
y_cont = np.array([0, 0, 1, 1])
gnb = GaussianNB().fit(X_continuous, y_cont)
print("1. GaussianNB fitted successfully on continuous measurements.")

# 2. MultinomialNB: Discrete integer counts (e.g. Word count frequencies in text classification)
# [Count of 'free', Count of 'money', Count of 'python']
X_counts = np.array([
    [5, 4, 0], # Spam
    [4, 3, 0], # Spam
    [0, 0, 8], # Ham
    [1, 0, 6]  # Ham
])
y_text = np.array([1, 1, 0, 0])
mnb = MultinomialNB(alpha=1.0) # Laplace smoothing
mnb.fit(X_counts, y_text)
print("2. MultinomialNB fitted successfully on discrete word counts.")

# 3. BernoulliNB: Binary boolean features (Word presence/absence: 1 if word exists, 0 otherwise)
X_binary = np.array([
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
    [0, 0, 1]
])
bnb = BernoulliNB().fit(X_binary, y_text)
print("3. BernoulliNB fitted successfully on binary indicator features.")
