# Part 5: System Architecture

# Chapter 17: Database System Architectures

## Centralized database system

Single PC and single user. Processors have **Coarse Granularity Parallelism**.

Even though PC has multiple cores, DB does not try to split query to multiple processor, instead it runs multiple queries concurrently. Hence, query throughput increases but individual query time does not decrease.

## Server Client System

Client system simply consists of the front-end: user form, GUI, data mining tools and etc.

The backend contains the server.

**Transaction Server**: Transaction-server systems, also called query-server systems, provide an interface to which clients can send requests to perform an action, in response to which they execute the action and send back results to the client.

Transaction Server consists of multiple processes accessing data in shared memory space:

1. **Server process**: These are processes that receive user queries (transactions), execute them, and send the results back.
1. **Lock manager process**: This process implements lock manager functionality, which includes lock grant, lock release, and deadlock detection.
1. **Database writer process**: There are one or more processes that output modified buffer blocks back to disk on a continuous basis.
1. **Log writer process**: This process outputs log records from the log record buffer to stable storage.
1. **Checkpoint process**: This process performs periodic checkpoints.
1. **Process monitor process**: This process monitors other processes, and if any of them fails, it takes recovery actions for the process, such as aborting any transaction being executed by the failed process, and then restarting the process.

The shared memory contains all shared data, such as:

- Buffer pool
- Lock table
- Log buffer
- Cached query plans

All database processes can access the data in shared memory. Since multiple processes may read or perform updates on data structures in shared memory, there must be a mechanism to ensure that a data structure is modified by at most one process at a time, and no process is reading a data structure while it is being written by others. Such mutual exclusion can be implemented by means of operating system functions called **semaphores**.

## Parallel Systems

**Fine Grained vs Coarse Grained**

| Fine Grained | Coarse Grained |
| :------------- | :------------- |
| program split into large number of small tasks | program split into large tasks. |
| small computation |large amount of computation|
| higher communication and synchronization cost | lower cost |
| facilitates load balancing | load imbalance |
| uses shared memory | uses message passing |

**Speed up vs Scale up**: Running a given task in less time by increasing the degree of parallelism is called speedup. Handling larger tasks by increasing the degree of parallelism is called scaleup.

806
