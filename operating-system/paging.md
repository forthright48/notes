# Paging

- [Youtube: Paging | Memory management | OS | Operating System | part -21](https://www.youtube.com/watch?v=xAvC-MJ_Sz8)

# Pages
Logical address refers to location in secondary memory (disk). Partition in secondary memory is known as **pages**.

Partition in main memory is known as **frames**.

# Page Tables

Each process has a separate page table, stored in main memory.

**Page Table Size Calculation**

Consider a system with a 32-bit logical address space. That is, it has $2^{32}$ bytes addressable. If the page size in such a system is 4 KB ($2^{12}$), then it has $2^{32}/2^{12}=2^{20}$ pages. Then a page table may consist of up to 1 million entries. Assuming that each entry consists of 4 bytes, each process may need up to 4 MB ($2^{20}\times4$) of physical address space for the page table alone.

**How page table is populated**

[Stackoverflow](https://cs.stackexchange.com/questions/28284/how-does-the-os-know-the-physical-address-of-a-process-first-memory-page)
