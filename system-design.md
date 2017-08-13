# Read/Write Speed

| Item | Read | Write |
| :------------- | :------------- | :------|
| SSD      | 500 MB/s     | ?
| Disk seek | 10 ms | -

# Read Repair

Read-repair is lazy mechanism that ensures that the data you request from the database is accurate and consistent.

Every time a read request occurs, it provides an opportunity for consistency improvement in the system.

In read repair, system sends a digest request (a hash value for the data) to each replica not directly involved in the read. System compares all replicas and writes the most recent version to any replica node that does not have it.

# Hinted Handoffs

If the replica set for a given item X is nodes A, B, and C, but A is transiently unreachable, sloppy quorum allows a write of X to be sent to B, C, and D instead and considered successful once a quorum of that "sloppy" replica set is successful in acknowledging it. The write to D would be stored with a "hint" that it should ideally have been sent to A. Once A is detected to have recovered, D would attempt to hand off that data or operations. This "hinted handoff" is one of the mechanisms by which such a database can maintain expected levels of availability and durability across failure states.

# ACID in Transaction

- **Atomicity**: Either all operations of a transaction executes successfully or none. Partial executions are not allowed.
- **Isolation**: Two atomic transactions must not overlap.

Other definitions:
- **Serializable**: The resulting database state is equivalent to a serial execution of component transactions.
- **Recoverable**: A set of database transactions is considered recoverable if aborted or abandoned transactions will have no effect on the database state.

## Serializability
Assume each transaction is a node. Two transactions are said to be in conflict if they have RW, WR or WW conflict over a resource. For each such conflict add an edge between the nodes.

A set of transactions are serializable only if the graph is acyclic.


# TODO

1. Vector Clocks
1. Byzantian conditions
1. [Distributed Atomicity CockroachDB](https://www.cockroachlabs.com/blog/how-cockroachdb-distributes-atomic-transactions/)
1. [Distributed Isolation CockroachDB](https://www.cockroachlabs.com/blog/serializable-lockless-distributed-isolation-cockroachdb/)
