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







# TODO

- Isolation level
- Virtual Memory
