# Time Calculation Quiz

**Question**: How much time does it require to flush Log-buffer in a database?

**Answer**:

A Log-buffer has capacity of [16 MB](http://www.dba-oracle.com/t_log_buffer_optimal_size.htm).

So we have to flush 16 MB of data from RAM to some log file on disk in append only format.

So first, we have to find the log file on disk. This would require Disk Access time = disk seek + rotational latency, $10 ms + 5 ms = 15 ms$.

Next, a HDD can read/write at a speed of 100 MB/s. Hence, to flush 16 MB of data we will need $16 / 100 = 0.16s = 160 ms$.

Therefore, it will take $160+15 = 175ms$ in total to flush the log buffer. 


# Time Table

| type | time |
| :------------- | :------------- |
| HDD Seek Time | 10 ms |
| SSD Seek Time | 0.10 ms (100X faster than HDD) |
| Rotational Latency | 5 ms |
| Disk-to-Buffer | 100 MB/s

**Reference**:

1. [Hard Disk Drive Performance](https://en.wikipedia.org/wiki/Hard_disk_drive_performance_characteristics)
