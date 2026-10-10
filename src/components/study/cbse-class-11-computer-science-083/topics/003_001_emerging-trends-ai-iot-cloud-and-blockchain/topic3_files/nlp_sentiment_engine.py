"""
Module 003: Emerging Trends in Computing
Topic 3: Natural Language Processing (NLP) Engine Simulation
Pure Python Implementation of NLP Text Preprocessing, Sentiment Analysis, and Intent Classification.
"""

import re
from typing import List, Dict, Tuple

class NLPEngine:
    def __init__(self):
        # Basic English stop words
        self.stop_words = {
            "a", "an", "the", "and", "or", "in", "on", "at", "to", "for",
            "with", "is", "was", "are", "were", "it", "this", "that", "of"
        }
        
        # Sentiment lexicons
        self.positive_lexicon = {
            "good", "great", "excellent", "amazing", "love", "awesome",
            "superb", "helpful", "fast", "innovative", "brilliant", "happy"
        }
        self.negative_lexicon = {
            "bad", "terrible", "awful", "horrible", "hate", "slow",
            "broken", "useless", "worst", "poor", "confusing", "sad"
        }
        
        # Intent patterns for a customer support chatbot
        self.intent_patterns = {
            "greeting": [r"\b(hi|hello|hey|good morning|good evening)\b"],
            "check_balance": [r"\b(balance|account balance|how much money|funds)\b"],
            "tech_support": [r"\b(error|bug|issue|problem|broken|crash|not working)\b"],
            "farewell": [r"\b(bye|goodbye|see you|exit|quit)\b"]
        }

    def tokenize(self, text: str) -> List[str]:
        """Splits raw text into lowercase alphanumeric tokens."""
        clean_text = re.sub(r"[^\w\s]", "", text.lower())
        return clean_text.split()

    def remove_stopwords(self, tokens: List[str]) -> List[str]:
        """Filters out high-frequency functional words with minimal semantic value."""
        return [t for t in tokens if t not in self.stop_words]

    def stem(self, word: str) -> str:
        """A simple rule-based stemmer to reduce words to root forms."""
        suffixes = ["ing", "ly", "ed", "es", "s"]
        for suffix in suffixes:
            if word.endswith(suffix) and len(word) > len(suffix) + 2:
                return word[:-len(suffix)]
        return word

    def analyze_sentiment(self, text: str) -> Dict[str, any]:
        """Calculates polarity score based on positive and negative lexicon density."""
        tokens = self.tokenize(text)
        cleaned_tokens = self.remove_stopwords(tokens)
        
        pos_count = sum(1 for t in cleaned_tokens if t in self.positive_lexicon)
        neg_count = sum(1 for t in cleaned_tokens if t in self.negative_lexicon)
        total_sentiment_words = pos_count + neg_count
        
        if total_sentiment_words == 0:
            polarity = 0.0
            sentiment = "Neutral"
        else:
            polarity = (pos_count - neg_count) / total_sentiment_words
            if polarity > 0.15:
                sentiment = "Positive"
            elif polarity < -0.15:
                sentiment = "Negative"
            else:
                sentiment = "Neutral"
                
        return {
            "text": text,
            "tokens": tokens,
            "cleaned_tokens": cleaned_tokens,
            "positive_count": pos_count,
            "negative_count": neg_count,
            "polarity_score": round(polarity, 3),
            "sentiment": sentiment
        }

    def classify_intent(self, user_query: str) -> Tuple[str, str]:
        """Determines the user's intent and generates a rule-based response."""
        clean_query = user_query.lower()
        for intent, patterns in self.intent_patterns.items():
            for pattern in patterns:
                if re.search(pattern, clean_query):
                    if intent == "greeting":
                        return intent, "Hello! How can I assist you with your queries today?"
                    elif intent == "check_balance":
                        return intent, "Your current account balance is ₹45,250.00."
                    elif intent == "tech_support":
                        return intent, "I have logged a technical ticket #9021. Our team will look into it."
                    elif intent == "farewell":
                        return intent, "Thank you for chatting with us. Have a wonderful day!"
        return "fallback", "I'm sorry, I could not understand that. Could you please rephrase?"

if __name__ == "__main__":
    nlp = NLPEngine()
    
    print("=" * 60)
    print("NLP Preprocessing & Sentiment Pipeline Demonstration")
    print("=" * 60)
    
    sample_review = "The new phone is amazing and super fast, but customer service was awful!"
    result = nlp.analyze_sentiment(sample_review)
    print(f"Raw Review   : {result['text']}")
    print(f"Tokens       : {result['tokens']}")
    print(f"Clean Tokens : {result['cleaned_tokens']}")
    print(f"Sentiment    : {result['sentiment']} (Polarity: {result['polarity_score']})")
    
    print("\n" + "=" * 60)
    print("Chatbot Intent Classification Simulation")
    print("=" * 60)
    
    queries = [
        "Hey there! Good morning.",
        "Can you tell me my available balance?",
        "My app is crashing with an error code 404.",
        "What is the weather in Mumbai?"
    ]
    
    for q in queries:
        intent, response = nlp.classify_intent(q)
        print(f"User   : {q}")
        print(f"Intent : {intent}")
        print(f"Bot    : {response}\n")
