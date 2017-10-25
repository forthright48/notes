# Chapter 16 Recovery System

## 16.1 Failure Classification

1. Transactional Failure
    - Logical Error: The transaction can no longer continue with its normal execution because of some internal condition, such as bad input, data not found, overflow, or resource limit exceeded.
    - System Error: The system has entered an undesirable state (for example, deadlock), as a result of which a transaction cannot continue with its normal execution. The transaction, however, can be reexecuted at a later time.
1. System crash
    There is a hardware malfunction, or a bug in the database software or the operating system, that causes the loss of the content of volatile storage, and brings transaction processing to a halt. The content of nonvolatile storage remains intact, and is not corrupted.
1. Disk failure
    A disk block loses its content as a result of either a head crash or failure during a data-transfer operation. Copies of the data on other disks, or archival backups on tertiary media, such as DVD or tapes, are used to recover from the failure.

## 16.3 Recovery and Atomicity

### 16.3.1 Log Records

> The most widely used structure for recording database modifications is the log. The **log** is a sequence of log records, recording all the update activities in the database.

There are several types of log records:
- Transaction start
- Transaction commit
- Transaction abort
- Update Log Records
- Redo-only Records: log records of actions performed to undo some other action. This actions can only be redone and never undone. Undo of undo operation seems weird.
- and more

An update log record describes a single database write. It has these fields:

- Transaction identifier
- Data-item identifier, which is the unique identifier of the data item written. Typically, it is the location on disk of the data item, consisting of the block identifier of the block on which the data item resides, and an offset within the block.
- Old value, which is the value of the data item prior to the write.
- New value, which is the value that the data item will have after the write.

### 16.3.2 Database Modification

We say a transaction modifies the database if it performs an update on a disk buffer, or on the disk itself. f a transaction does not modify the database until it has committed, it is said to use the **deferred-modification technique** (like shadow-copying I guess). If database modifications occur while the transaction is still active, the transaction is said to use the **immediate-modification technique**.

### 16.3.3 Concurrency Control and Recovery

Recovery algorithms usually require that if a data item has been modified by a transaction, no other transaction can modify the data item until the first transaction commits or aborts (transaction use write-latch perhaps?).

### 16.3.4 Transaction Commit

We say that a transaction has committed when its commit log record, which is the last log record of the transaction, has been output to stable storage; at that point all earlier log records have already been output to stable storage.

Thus, there is enough information in the log to ensure that even if there is a system crash, the updates of the transaction can be redone. If a system crash occurs before a log record < Ti commit> is output to stable storage, transaction Ti will be rolled back.

### 16.3.5 Using the Log to Redo and Undo Transactions

After system crash we simply iterate over log records to restore our db state. In first phase, we simply redo all log records. In second phase, we abort the unfinished Transactions.

A transaction is incomplete if it has a start log record but no abort or commit log record. In order to undo a transaction, we need to undo its each action. The action taken to negate original action is also recorded in log as redo-only record.

More details will be found in 16.4.

### 16.3.6 Checkpoints

When a system crash occurs, we need to consult our log to decide which transactions need to be redone and which undone. We can scan the whole log if we want, but doing so is inefficient due to following reasons:

1. Search process is time consuming
1. Most of the transactions that, according to our algorithm, need to be redone have already written their updates into the database. Although redoing them will cause no harm, it will nevertheless cause recovery to take longer.

To reduce these types of overhead, we introduce checkpoints.

We describe below a simple checkpoint scheme that (a) does not permit any updates to be performed while the checkpoint operation is in progress, and (b) outputs all modified buffer blocks to disk when the checkpoint is performed.

A checkpoint is performed as follows:
1. Output onto stable storage all log records currently residing in main memory.
2. Output to the disk all modified buffer blocks.
3. Output onto stable storage a log record of the form <checkpoint L>, where L is a list of transactions active at the time of the checkpoint.

After a system crash has occurred, the system examines the log to find the last <checkpoint L> record (this can be done by searching the log backward, from the end of the log, until the first <checkpoint L> record is found).

The redo or undo operations need to be applied only to transactions in L, and to all transactions that started execution after the <checkpoint L> record was written to the log.

## 16.4 Recovery Algorithm

The recovery algorithm described in this section requires that a data item that has been updated by an uncommitted transaction cannot be modified by any other transaction, until the first transaction has either committed or aborted.

### 16.4.1 Transaction RollbacK

First consider transaction rollback during normal operation:

1. The log is scanned backward, and for each log record of T i of the form <Ti, Xj, V1, V2 > that is found:
    a. The value V 1 is written to data item X j , and
    b. A special redo-only log record <Ti , Xj , V1 > is written to the log, where V1 is the value being restored to data item Xj during the rollback.

    These log records are sometimes called **compensation log records**. Such records do not need undo information, since we never need to undo such an undo operation. We shall explain later how they are used.
2. Once the log record < Ti start > is found the backward scan is stopped, and a log record < Ti abort > is written to the log.

### 16.4.2 Recovery After a System Crash

Recovery actions, when the database system is restarted after a crash, take place in two phases:

1. In the **redo phase**, the system replays updates of all transactions by scanning the log forward from the last checkpoint.

    In this phase, we maintain a **undo-list**. Initially undo list contains list of transaction found in checkpoint log. While scanning forward, if we find new transaction starting we add it to undo-list and if we find it committing/aborting, we remove it from undo list.
1. In the undo phase, the system rolls back all transactions in the undo-list. It performs rollback by scanning the log backward from the end. Each time it performs undone action on < Ti start > record, it removes Ti from undo list. When undo list becomes empty, undo phase ends.  

After the undo phase of recovery terminates, normal transaction processing can resume.

The actions are repeated in the same order in which they were originally carried out; hence, this process is called **repeating history**. Although it may appear wasteful, repeating history even for failed transactions simplifies recovery schemes.

## 16.5 Buffer Management

### 16.5.1 Log-Record Buffering

So far, we have assumed that every log record is output to stable storage at the time it is created. This assumption imposes a high overhead on system execution for several reasons:

- Typically, output to stable storage is in units of blocks. In most cases, a log record is much smaller than a block. Thus, the output of each log record translates to a much larger output at the physical level.
- Furthermore, the output of a block to stable storage may involve several output operations at the physical level (RAID duplication).

The cost of outputting a block to stable storage is sufficiently high that it is desirable to output multiple log records at once. To do so, we write log records to a log buffer in main memory, where they stay temporarily until they are output to stable storage.

As a result of log buffering, a log record may reside in only main memory (volatile storage) for a considerable time before it is output to stable storage. Since such log records are lost if the system crashes, we must impose additional requirements on the recovery techniques to ensure transaction atomicity:

- Transaction $T_i$ enters the commit state after the $< T_i \  commit>$ log record has been output to stable storage.
- Before the $<T_i \ commit>$ log record can be output to stable storage, all log records pertaining to transaction $T_i$ must have been output to stable storage.
- Before a block of data in main memory can be output to the database (in nonvolatile storage), all log records pertaining to data in that block must have been output to stable storage.

This rule is called the **write-ahead logging (WAL)** rule.

Writing the buffered log to disk is sometimes referred to as a **log force**.

### 16.5.2 Database Buffering

#### No Force Policy
One might expect that transactions would force-output all modified blocks to disk when they commit. Such a policy is called the **force policy**. The alternative, the **no-force policy**, allows a transaction to commit even if it has modified some blocks that have not yet been written back to disk.

The no-force policy allows faster commit of transactions; moreover it allows multiple updates to accumulate on a block before it is output to stable storage, which can reduce the number of output operations greatly for frequently updated blocks. As a result, the standard approach taken by most systems is the no-force policy.

#### Steal Policy

Similarly, one might expect that blocks modified by a transaction that is still active should not be written to disk. This policy is called the **no-steal policy**. The alternative, the **steal policy**, allows the system to write modified blocks to disk even if the transactions that made those modifications have not all committed. As long as the write-ahead logging rule is followed, all the recovery algorithms we study in the chapter work correctly even with the steal policy. Further, the no-steal policy does not work with transactions that perform a large number of updates, since the buffer may get filled with updated pages that cannot be evicted to disk, and the transaction cannot then proceed. As a result, the standard approach taken by most systems is the steal policy.

#### Block Latch
When a block $B_1$ is to be output to disk, all log records pertaining to data in $B_1$ must be output to stable storage before $B_1$ is output. It is important that no writes to the block $B_1$ be in progress while the block is being output, since such a write could violate the write-ahead logging rule. We can ensure that there are no writes in progress by using a special means of locking:

- Before a transaction performs a write on a data item, it acquires an exclusive lock on the block in which the data item resides. The lock is released immediately after the update has been performed.

- The following sequence of actions is taken when a block is to be output:
    - Obtain an exclusive lock on the block, to ensure that no transaction is performing a write on the block.
    - Output log records to stable storage until all log records pertaining to block B 1 have been output.
    - Output block B 1 to disk
    - Release the lock once the block output has completed.

Locks on buffer blocks are unrelated to locks used for concurrency-control of transactions, and releasing them in a non-two-phase manner does not have any implications on transaction serializability. These locks, and other similar locks that are held for a short duration, are often referred to as **latches**.

#### Dirty Block Processor

Database systems usually have a process that continually cycles through the buffer blocks, outputting modified buffer blocks back to disk. The above locking protocol must of course be followed when the blocks are output. As a result of continuous output of modified blocks, the number of dirty blocks in the buffer, that is, blocks that have been modified in the buffer but have not been subsequently output, is minimized. Thus, the number of blocks that have to be output during a checkpoint is minimized; further, when a block needs to be evicted from the buffer it is likely that there will be a non-dirty block available for eviction, allowing the input to proceed immediately instead of waiting for an output to complete.

### 16.5.4 Fuzzy Checkpointing

The checkpointing technique described in Section 16.3.6 requires that all updates to the database be temporarily suspended while the checkpoint is in progress. If the number of pages in the buffer is large, a checkpoint may take a long time to finish, which can result in an unacceptable interruption in processing of transactions

To avoid such interruptions, the checkpointing technique can be modified to permit updates to start once the checkpoint record has been written, but before the modified buffer blocks are written to disk. The checkpoint thus generated is a **fuzzy checkpoint**.

Since pages are output to disk only after the checkpoint record has been written, it is possible that the system could crash before all pages are written. Thus, a checkpoint on disk may be incomplete. One way to deal with incomplete checkpoints is this: The location in the log of the checkpoint record of the last completed checkpoint is stored in a fixed position, last-checkpoint, on disk. The system does not update this information when it writes the checkpoint record. Instead, before it writes the checkpoint record, it creates a list of all modified buffer blocks. The last-checkpoint information is updated only after all buffer blocks in the list of modified buffer blocks have been output to disk.

Even with fuzzy checkpointing, a buffer block must not be updated while it is being output to disk, although other buffer blocks may be updated concurrently. The write-ahead log protocol must be followed so that (undo) log records pertaining to a block are on stable storage before the block is output.

## 16.6 Failure with Loss of Nonvolatile Storage

Take periodical dump of database.

## 16.7 Early Lock Release and Logical Undo Operations
Skipped

## 16.8 ARIES

### Log Sequence Number

Each log record is given a identifier number called **Log Sequence Number (LSN)**.

Each page in dbms has a field named **PageLSN**. Whenever a page is modified, PageLSN is updated with the corresponding log record identifier.

LSN basically increases efficiency of recovery. How?

When recovering from crash, we perform redo operations from
checkpoints. Now, if a particular record needs to modify a page, then it must have LSN higher than PageLSN.

That means, sometimes pages are flushed to stable storage after performing checkpoint operation. LSN helps us to identify those pages.

Each log record also contains the LSN of previous log record of the same transaction. This value, stored in the Prev LSN field, permits log records of a transaction to be fetched backward, without reading the whole log.

# Summery

## Q1. How does recovery work?

Maintains Write Ahead Logging. On restart, scans the log in two phase: redo and undo. In order to make things faster, it uses fuzzy checkpoints.
