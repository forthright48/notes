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

# Vector Clocks
