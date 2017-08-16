# Information Retrieval

# Boolean Retrieval

## Inverted Index
Usually, books have index at the end. If we consider each book as a document, then the index gives us where in the document can we find a particular word in the document. So the index belongs to the documents in this case.

An inverted index is the opposite and hence, documents belong to index. When there are multiple documents, a word in inverted index points to which documents contain that particular word.

A document can contain the same word multiple time. We merge all the same instances and keep only one postings. Since the word can be found in multiple document, we store a list for the word. The list is sorted according to docID.

## Boolean Query

How do we process queries such as: Brutus AND Calpurnia?

Grab the list of the two words and intersect them.

Optimization: Sort the queries in increasing order of postings. That way, AND operator will quickly converge.

# The term vocabulary and postings lists

## Document Representation and Character Sequence Decoding

We need to first figure out how text has been encoded. Could be ASCII or UTF-8. Determining the correct encoding can be regarded as classification problem from machine learning. But often, the encoding is found from documents metadata.

# R&D

Jaccob's Coefficient
Phrase query

Bag of words model
Term frequency
Relevance is not proportional to term frequency
Log-frequency weighting
Sum over all intersection

# Document frequency weighting
Rare terms > common terms
high weight to rare terms
df -> document frequency
term frequency vs document frequency (df)
$df_t$: number of documents containing t. It is an inverse measure of the informativeness of t. The higher the value of df(t), the less important t is, cause it is not rare.
df(t) <= N

But usually we want to associate higher score with better term, so we inverse it, N/df(t).

idf(t) = log10(N/df(t)), log taken to dampen the effect.

A word that occurs in every doc, idf(t) = 0.

No effect on 1 term queries, it simply acts as scale. Works for multi word query.

# Collection
collection frequency of t is the number of occurrences of t in the collection, counting multiple occurrences. df is better.

# tf-idf weighting

w(term,doc) = (1+log tf(t,d)) * log(N/df(t))

# Vector Space Model

Vector Space Model is an algebraic model for representing text documents as vectors of identifiers.

Each document is represented as V dimensional vector, where V is the number of identifiers. All the documents together form V dimensional vector space.

Even queries are represented as vector of identifiers.

Euclidean distance vs angle
Decreasing angle or increasing cosine
cosine similarity
Easy to calculate using vector
Length normalize queries and documents in advance

# tf-idf cosine score in IR system

# Evaluate search engine
fast index
fast search
query language
