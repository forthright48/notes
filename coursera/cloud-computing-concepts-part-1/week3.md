# Distributed Hash Table

[DHT Explanation in Chord video (need to watch again)](https://www.coursera.org/learn/cloud-computing/lecture/U0ILe/5-chord)

Each nodes contains a **finger table** that contains pointer to next keys. Using finger table the routing can be brought down to log(n).

Routing can be wrong if any node fails.
