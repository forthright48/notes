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

# Replicated State Machine

**Example**: Chubby, Zookeeper

Replicated State Machine (RSM) is used to solve variety of fault-tolerance problem in distributed system.

Replicated state machines are typically implemented using a replicated log. Each server stores a log containing a series of commands, which its state machine executes in order. Each log contains the same commands in the same order, so each state machine processes the same sequence of commands. Since the state machines are deterministic, each computes the same state and the same sequence of outputs.

**Keeping the replicated log consistent is the job of the consensus algorithm.**



# Consensus Algorithm (Raft)

**Raft is an algorithm to maintain a set of replicated log in distributed system.**

Consensus is a fundamental problem in fault-tolerant distributed systems. Consensus involves multiple servers agreeing on values. Once they reach a decision on a value, that decision is final. Typical consensus algorithms make progress when any majority of their servers is available; for example, a cluster of 5 servers can continue to operate even if 2 servers fail. If more servers fail, they stop making progress.

Each machine can be thought as a node. Each node can be in three state: **Follower**, **Candidate** and **Leader**.

##Leader Election
Each node has an election timeout. The **election timeout** is the amount of time a follower waits until becoming a candidate. In Raft, it is randomized between 150-300ms.

After the election timeout, the follower becomes a candidate and starts a new election term. It votes for itself and sends out "Request Vote" messages to other nodes. If the receiving node has not voted yet in this term, then it votes for the candidate and resets its election timeout.

Once a candidate has a majority of votes, it becomes a leader. The leader begins sending "Append Entries" messages to its followers. These messages are sent in intervals specified by the **heartbeat** timeout. The followers then respond to each "Append" message. This election term will continue until a follower stops receiving heartbeats and becomes a candidate.

Requiring a majority of votes guarantees that only one leader can be elected per term.

If two nodes become candidates at the same time then a split vote can occur.

## Log Replication

Once we have a leader elected we need to replicate all changes to our system to all nodes. This is done by using the same Append Entries message that was used for heartbeats.

First a client sends a change to the leader. The change is appended to the leader's log. Then the change is sent to the followers on the next heartbeat. An entry is committed once a majority of followers acknowledge it.

Raft can even stay consistent in the face of network partitions. Cause even if there are multiple leaders, at most one leader can get majority acknowledgment for "Append Message". And during healing, old leaders will step down when they see that a new leader with higher term is present.

## Properties

1. **Safety**: never returns an incorrect result under all non-Byzantine conditions, including network delays, partitions, and packet loss, duplication, and reordering.
1. **Available**: They are fully functional as long as any majority of the servers are operational and can communicate with each other and with clients. Thus, a typical cluster of five servers can tolerate the failure of any two servers. Servers are assumed to fail by stopping; they may later recover from state on stable storage and rejoin the cluster.
1. **Clock Independent**: They do not depend on timing to ensure the consistency of the logs: faulty clocks and extreme message delays can, at worst, cause availability problems.
1. **Performance**: In the common case, a command can complete as soon as a majority of the cluster has responded to a single round of remote procedure calls; a minority of slow servers need not impact overall system performance.
1. **Election Safety**: at most one leader can be elected in a given term.
1. **Leader Append-Only**: a leader never overwrites or deletes entries in its log; it only appends new entries
1. **Log Matching**: if two logs contain an entry with the same index and term, then the logs are identical in all entries up through the given index.
1. **Leader Completeness**: if a log entry is committed in a given term, then that entry will be present in the logs of the leaders for all higher-numbered terms.
1. **State Machine Safety**: if a server has applied a log entry at a given index to its state machine, no other server will ever apply a different log entry for the same index.

## Resources

1. http://thesecretlivesofdata.com/raft
1. [How log commit works](https://stackoverflow.com/questions/37108309/raft-committed-entry-may-be-lost?rq=1)
1. [etcd/raft implementation](http://otm.github.io/2015/05/raft-a-first-implementation/)

# TODO

1. Vector Clocks
1. Byzantian conditions
