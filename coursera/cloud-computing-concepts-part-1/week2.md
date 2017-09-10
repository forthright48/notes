# Gossip

## Multicast Problem

We have a node who wants to send information to all nodes in the group.

Different from Broadcast as in broadcase all nodes in the network receive message but in Multicast only members of group in the network receive message.

The multicast protocol needs to be fault-tolerant and scalable.

### Solution

1. Centralized: A single node sends to all nodes using a loop and TCP/UDP protocol. Does not scale well. If sender fails mid-way, then some nodes might miss the message. Latency overhead is O(n). Pressure on sender is also O(n).

1. Tree based: We could build a spanning tree. If we build it as a balance binary tree, then latency overhead drops down to O(log n). Sender overhead is O(1). But we have to setup and maintain the tree structure ourselves. Also, if a node near root fails, then it effects the whole sub-tree.

1. Gossip: Sender, at periodic interval of say 5 seconds, chooses a set of b nodes randomly and sends them messages using UDP. The nodes that receive the messages become infected nodes. These nodes does the same thing. This is called push-gossip. A variant is pull-gossip.

### Gossip Analysis

[Epidemiology Analysis](https://www.coursera.org/learn/cloud-computing/lecture/jjieX/1-3-gossip-analysis)

After $clog(n)$ rounds ( lets say $2log(n)$ ), number of infected nodes become $ (n+1) - \frac{1}{n^{cb-2}}$, or $(n+1) - 1/n^2$ if c = 2 and b = 2, where b is the gossip fanout.

Hence gossip is **low latency** ($2log(n)$ rounds), **reliable** (only $1/n^2$ nodes miss out) and **lightweight** ($cblog(n) = 4log(n)$ messages are transmitted.)  

#### Fault Tolerance and Reliability
If there is 50% packet loss, that means half the message we are sending is getting lost, that is same as analyzing with $b/2$ fanout. So to get same result as before, we simply need to run our gossip for $2clog(n)$ rounds.

If 50% nodes fail, then it is same as $n/2$ and $b/2$. So we just need to run gossip for $2clog(2n)$ rounds to compensate (not sure about this).

#### Can gossip die out
Once gossip spreads, it is highly unlikely to die out as gossip fan out is selected at random.

#### Pull vs Push
Pull gossip has overall latency of O(logn), but on second half of the protocol, that is once half the nodes are infected, it grows faster than exponential with complexity of O(log(log(n))).

A possible hybrid system could be push gossip for first half and pull gossip for later half.

#### Topology Aware Gossip

Suppose we have two subnets with n/2 nodes each. With normal gossip, at each round, $b*n/2$ messages will travel across the two net. With O(n) message passing, router will be overwhelmed.

Instead, we can configure gossip so that it gossips with a node on different subnet with a probability of $1/n$. This way, the gossip quickly infects its own subnet and once everyone is infected, they all try to infect other subnet with $n \times 1/n = 1$ expected round.

The load on router is now O(1) and latency overhead is $O(logn) + O(1) + O(logn) = O(logn)$.

# Membership

> **MTTF**: Mean time to failure

We process the system as a group of members (individual process).

We assume a **fail-stop** failure model where process stop completely once they fail.

## Failure Detection

- Completeness: Each failure is detected
- Accuracy: No mistake in detection
- Speed
- Scale

Over a unreliable network, fulfilling both of completeness and accuracy property is impossible.

So in real life, we design system so that **completeness is guaranteed** and **accuracy is partially guaranteed**.

### Possible Architecture

1. **Centralized Heartbeating**: All nodes send heartbeats to a single node. If the central node fails, failure detection becomes undefined. Also, the central node is under heavy load.
1. **Ring Heatbeating**: Each node is connected to two other nodes. Failures may go unnoticed if multiple nodes fail at same time.
1. **All-to-All Hearbeating**: Equally distributed load. But if a node is slow and receiving heartbeats at longer delay for some reason, it might wrongfully detect all other nodes to be dead.
1. **Gossip Style Heartbeating**: Each node keeps a membership table containing node number, heartbeat sequence number and a local time stamp. Periodically nodes share their membership list using gossip.
1. **SWIM**
