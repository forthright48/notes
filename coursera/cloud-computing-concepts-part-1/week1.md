# What is Cloud?

Cloud is something that provides us lots of data storage with compute cycle nearby. It is data intensive. Moving around data is costly, so we bring computing power near the data.

The servers in cloud are arranged in racks. Each rack has a common power supply and top of rack switch. Typically, all top of rack switch is then connected to core switch, creating a 2-tier network topology.

## Four Features New in Cloud

1. Massive scale
1. On demand access
1. Data-intensive nature
1. New cloud programming paradigm - Mapreduce, hadoop, nosql

# Distributed System

**Wrong definitions**

A distributed system is a group of computer that work together and appear as one computer logically.

The above definition is wrong because Internet is a distributed system and it doesn't appear as a single entity.

Some say that distributed system follows server-client architecture. This is wrong because p2p bit-torrent has no server and yet it is a distributed system.

**Definition using properties**

> A distributed system is a collection of entities, each of which is **autonomous, programmable, asynchronous** and **failure prone**, and which communicates through an **unreliable communication medium**.

A distributed system is different from parallel programming because it is asynchronous. In parallel programming, processors share a common clock. In distributed system, each entity has its own clock and they are not synchronized.

# Map Reduce

- Word count
- Distributed grep
- Reverse web link graph
- Count url access frequency
- Sort (need to use range based reducer)

Output of map task is sorted by default.


## How map reduce works

For learning purpose, we assume that there is a barrier between map phase and reduce phase, i.e, no reduce task starts before map tasks finish.

Parallelizing map and reduce task is easy because there is no communication between any two task. They are all independent.

Map input is stored in distributed file system. In order to process a map task, it first needs to fetch it from a server where the file block is situated. Hence, map task is fastest if it is assigned to the server where data is located. This is what we mean by **bringing computing near to data**.

Output of map task is stored locally. Reduce task then gets its input from these servers where data is stored locally. Local file system is used in this intermediate process because using DFS has its own overhead. We want to get output of map task to reduce task as quick as possible.

Output of reduce task is stored in DFS.

### Architecture

Hadoop has three managers:

Each machine (node) has some containers in it that run some task.

1. Resource Manager: Decides which nodes gets which task and tracks their progress. Its the center of the whole design. It knows everything.
1. Application Manager: Each task has an application manager. It is responsible for task management. Basically, it has the code for the task (map or reduce). When it gets alive for the first time, it reports to resource manager, asking for resource to run the task.
1. Node Manager: Each node has a node manager. Responsible for state of node. It has the ability to schedule task on its node. It lets resource manager know when ever a task is started or completed on its node.

These managers communicate with each other through heartbeats. If a node fails, resource manager lets application managers know that their task failed and then restarts the node. If application manager fails, resource manager restarts it and synchronizes it with current state. If resource manager fails (trickiest), then a backup resource manager with checkpoint is started.

**Stragglers (slow nodes)**
Speculative Execution: Start replica task and consider the task done when any of the replica completes.

**Locality**
Manager tries to schedule task on same machine as the data, failing that on same rack, otherwise anywhere.
