# Virtual Memory

Virtual memory is a technique that allows the execution of processes that are not completely in memory. One major advantage of this scheme is that programs can be larger than physical memory.

Further, virtual memory abstracts main memory into an extremely large, uniform array of storage, separating logical memory as viewed by the user from physical memory. This technique frees programmers from the concerns of memory-storage limitations.

# 8.1 Background

# 8.2 Demand Paging

Process is loaded lazily. A pager swaps in pages as they are needed, swapping out pages that are no longer required.

## 8.2.1

We use valid/invalid bit to mark pages that are present in memory.

**pure demand paging**: never bring a page into memory until it is required.

## 8.2.2 Performance of Demand Paging

**For most computer systems, the memory-access time, denoted ma, ranges from 10 to 200 nanoseconds.**

The probability of a page fault needs to be really low so that demand paging does not slow system down.

p < 0.0000025 would degrade the performance by less than 10%.

 
