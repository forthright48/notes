# Key Value / NOSQL

NOSQL storage typically store a column together.

# Cassandra

Each data center is DHT Ring. Client requests to a node which acts as a **coordinator**.

Write heavy. Lock free writing.

Uses **Hinted Handoff** mechanism. Coordinator keeps the write to its buffer until some failed replica rejoins. Keeps it upto an hour.

**Delete**: Tombstone

For reading, value with the most updated timestamp among X replies is sent back. Then **read repair** is used to update stale values.

**Gossip-style Membership**

# Cap Theorem

Availability: Fast and reliable read/write
Consistency: All nodes see the same value
Partition Tolerance: System can continue to work even when they are separated by network partition.

## Eventual Consistency

If all writes to a key stop, then its value will eventually converge.

If writes continue, the system will keep on trying to converge.

May return stale values.

**BASE**: Basically Available Soft-state Eventually Consistency

## Consistency Level

1. Any: Fastest. Coordinator caches the write.
1. All: Slowest. Strong consistency.
1. One
1. Quoram: Faster than all, still strong consistency.


For strong consistency, $W + R > N$ and $W + W > N$.

 
