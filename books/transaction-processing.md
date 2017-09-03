# Transactions

# Chapter 1: Introduction

Transactions are set of operations.

They have only 4 states: forward-rolling, committed, backward-rolling and aborted.

They need to maintain the ACID properties.

- **Atomicity**: Either all operations of a transaction executes successfully or none. Partial executions are not allowed.
- **Consistency**: Transaction should keep database in a consistent state after termination.
- **Isolation**: Two atomic transactions must not overlap.
- **Durability**: Committed transactions need to persist in the database forever.

Each operation in a transactions must have an undo operation.

## Isolation Level Mess

If proper isolation level is not maintained, different phenomenon can occur.

1. **Dirty read** occurs when one transaction is changing the record, and the other transaction can read this record before the first transaction has been committed or rolled back. This is known as a dirty read scenario because there is always the possibility that the first transaction may rollback the change, resulting in the second transaction having read an invalid data.

1. **Non Repeatable Reads** happen when in a same transaction same query yields to a different result. This occurs when one transaction repeatedly retrieves the data, while a different transaction alters the underlying data. This causes the different or non-repeatable results to be read by the first transaction.

1. **Phantom read** occurs when a transaction executes same query more than once, and the later operation result set includes rows that were not visible in the earlier result set.This is caused by another transaction inserting new rows between the execution of the two queries. **This is similar to a non-repeatable read, except that the number of rows is changed either by insertion or by deletion.** Having REPEATED-READ isolation, therefore, does not protect from Phantom Read.

Basically, it's always one transaction messing up another transaction.

# Chapter 2: Operations on the Physical Database

## Basic Data Structures of DB
Database has two non-volatile data collection:

1. **Data Disks**
1. **Log Disks**

When database is running, it maintains the following volatile data structures in the virtual memory shared by the server processes:

1. **Buffer Pool**: for buffering pages from disk.
1. **Log Buffer**: for buffering log file.
1. **Active-transaction table**: information about active transaction.
1. **Modified-page table**: information about buffered pages.
1. **Lock table**: e for storing the locks held by active transactions (when transactional concurrency control is based on locking).
1. Other misc.

## Log Based Database System

The data disks and the database buffer are based on random access on database pages (via page identifiers), whereas the log disks and the log buffer are append only sequential files.

Each database update is performed on a page copied from the data disk into the database buffer, and the update is logged with a log record that is appended into the log buffer.

The log record holds information that makes it possible to redo the update on an old version of the page (in the case when the update is lost due to a failure) and undo the update (at transaction rollback).

At transaction commit or when the log buffer is full, the contents of the log buffer are flushed onto the log disk, where the log records are appended next to the previously flushed log records. Thus every committed transaction has all its updates recorded permanently at least on the log disk.

The most important source of efficiency of transaction processing in a **log-based system** is that the random-access database residing on the data disks need not immediately reflect the updates of transactions.

## Basic Processes of DB

In a database-system instance, several database processes operate on the shared database on disk and on the shared virtual-memory data structures

1. **Server processes** and their threads that service requests from application processes and generate transactions.
1. **Database-writer** process that flushes updated database pages from the buffer onto disk
1. **Log-writer process** that flushes log records from the log buffer onto the log disk when the log buffer becomes full or when a server process requests, at transaction commit, the log to be flushed onto disk.
1. **Checkpoint process** that periodically takes a checkpoint in which certain volatile data is written onto disk
1. **Process-monitor process** that monitors other processes of the system and takes care of recovery of failed processes, including aborting and rolling back transactions that have terminated because of a failure of a server process.
1. **Lock-manager process** that services requests to acquire or release locks on data items and takes care of detecting deadlocks

## Database Pages and files

### Pages
The physical database is a collection of pages that contain records.

A page is a fixed-size area on disk (e.g., 4 or 8 or 16 kilobytes), which occupies one disk block or, if the page is larger than a disk block, several consecutive disk blocks.

A page that contains tuples is called a data page. In addition to data pages, the physical database contains index pages for finding the data pages efficiently.

A page contains a **page header**, the record area, and a record index. The page header contains at least the following information:

1. **Page id**: the unique identifier of the page.
2. **Page type**: "relation data page" (tuples from one relation), "cluster data page" (tuples from multiple relations), "index page" (part of an index to a relation),
"free space" (an unallocated page), "data-dictionary page" (part of the data dictionary of the database), or "storage-map page" (page that describes the allocation status of other pages), etc.
3. **Internal identifier** for the relation, index, or other structure where the page belongs to.
4. **Record count**: the number of elements in the record index of this page.
5. **Free-space count**: information used to maintain areas of free space inside this page, such as the length of the longest contiguous free area and the total amount of free space on the page.
6. **PAGE-LSN**: The log sequence number (LSN) of the log record written for the latest update onto the page. When a buffered page is updated, the PAGE-LSN of the page is set to the LSN of the log record written for the update. In restart recovery, the PAGE-LSN in the disk version of a page is needed in determining how far the updates onto the page had reached at the time of the system failure. During normal processing, the PAGE-LSNs of the current versions of pages are utilized for accelerating undo actions and traversals of
index structures.
7. **Next page**: The page identifier of the “next page” in a linked structure of pages.

The **record area** of a page contains the actual data for the page. It is filled top to bottom.

The **record index** of a page is an array $m$ at the end of the page. An element $m[i]$ of the array contains a byte offset pointing to the $i_{th}$ record in the record area. The record index grows upward from the end.

The pages of a database are usually grouped into files or segments, each of which consists of extents of one or more consecutive pages. Typically the grouping is based on the types of the records. One relation in a relational database is often placed in its own file.

## Buffering and Fixing of Database Pages

The database buffer or buffer pool is an array $B[1,2...N]$ of page-sized buffer frames. If there are pages of varying size in the database, there must be a buffer of its own for each different page size.

The number $N$ of buffer frames is orders of magnitude smaller than the number of pages in the database. Thus normally only a fraction of the set of pages in the database can reside in the buffer at a time.

**Before reading or writing the contents of a page $p$ in the database, the page must be fetched from disk into some free buffer frame $B[i]$.**

A server-process thread that accesses page $p$ fixes, or pins, $p$ into the buffer for the duration of the page access. If the page is not already in the buffer, the procedure call $fix(p)$ first fetches $p$ from disk into the buffer.

The buffer manager is not allowed to evict a fixed page from the buffer or to move it to another buffer frame. Thus, the buffer-frame address passed to the server process thread that called $fix$ stays valid for the duration of the fixing. After having finished processing the page, the process must unfix, or unpin, the page. A page can be evicted from the buffer only when it is no longer fixed for any process.

Pages are evicted from the buffer only when the buffer is full and a buffer frame needs to be assigned to a page $p$ to be fetched from disk (by a $fix(p)$ call).  if that page is a modified page, it must first be flushed onto disk.

For each buffered page, the buffer manager maintains a buffer control block in the main memory, containing:

1. The page identifier of the page
2. The location of the page in the buffer (i.e., the address of the frame)
3. A fixcount that indicates how many process threads currently hold the page fixed
4. A modified bit that indicates whether or not the page has been updated since it
was last fetched from disk
5. PAGE-LSN: the log sequence number (LSN) of the log record for the last update on the page
6. A pointer to a latch (semaphore) that controls concurrent accesses to the page
7. Links needed to maintain the LRU chain

The addresses of the buffer control blocks are stored in a hash table indexed by the page identifiers.

```
Function fix(p):
  if page p is not in the buffer then
    if all buffer frames are occupied then
      select a buffered unfixed page q to be evicted
      if page q is modified then
      flush page q to its disk address
      end if
        assign the buffer frame of page q to page p
    else
      assign some unoccupied buffer frame to page p
    end if
    fetch page p from its disk address to the frame
    create a buffer control block
    clear the modified-bit
    initialize fixcount as zero
  else
    get the address of the buffer frame of p
  end if
  increment the fixcount
  return the address of the frame
```

## Database States

Three version of page: Disk version, Buffer version and current version (if page is buffered then current = buffer, else current = disk)

For reasons of efficiency, a modified page is not taken onto the disk immediately after the update operation has been performed nor even after the transaction that updated the page has committed. A page that is used often is kept in the buffer as long as possible, according to the LRU principle. Thus, the buffer version of a page may accumulate many updates, and the disk version can lag far behind the buffer version.

## Database Recover and Checkpoints

Recovery: Using disk state of database and log files, we can recover the state before crash. Unfinished transactions are rolled back.
Checkpoints: Periodic flushing of modified pages to disk. Checkpoints are used to make recovery faster.

## Integrity of the Physical Database

The disk version of database may not be consistent. Only the current version needs to be consistent.

## Latching of Database Pages

A **read latch** gives the process thread permission to read the page and prevents other processes and threads from concurrently writing the page. Multiple process threads can hold a read latch on the same page at the same time.

A **write latch** gives permission to both read and write the page and prevents other process threads from reading or writing the page at the same time. The owner of a latch must unlatch the page (release the latch) after it has used the page.

A latch on a buffered page is implemented using a semaphore pointed to from the buffer control block of the page.

Locking is done using semaphores.

During conflict (thread trying to read a page which is write-latched), the thread/process is put to sleep until conflict resolved. There is no check for deadlock, hence protocols must be maintained to avoid it.

There is also a latching protocol called **latch-coupling** or **crabbing**.

# 3 Logging and Buffering

The log can serve its purposes only if a protocol called **write-ahead logging** ( WAL ) is followed in database and log buffering. The WAL protocol states that an updated database page can be flushed onto disk only if all the log records up to and including the log record for the last update on the page have already been flushed onto disk.

The log is an entry-sequenced, or append-only, file into which the log records of all transactions are appended in the chronological order of the updates. Log records can be deleted from the log only by truncating the log from the head, disposing of old log records that are no longer needed. The writes to the log file are buffered in a log buffer, whose contents are flushed when some transaction commits or the buffer becomes full or when the buffering policy (WAL) states that so must be done.

**Log Sequence Number (LSN)**: Unique increasing identifiers for each log entry. In a multi-threaded system, it must be ensured that LSN is not duplicated. One possible method to ensure this would be to get a exclusive lock on tail of log file.


# TODO

- Isolation level
- Virtual Memory
- Paging
- Page buffer
- Semaphores
