# Chapter 19 Distributed Databases

# 19.1 Homogeneous and Heterogeneous Databases

In a homogeneous distributed database system, all sites have identical database- management system software, are aware of one another, and agree to cooperate in processing users’ requests.

We will deal with homogeneous distributed databases only.

# 19.2 Distributed Data Storage

There are two ways to distribute a database:

1. Replication
1. Fragmentation

The two ways can be combined.

## 19.2.1 Data Replication

1. Availability
2. Increased Parallelism: If majority of the query is read, then multiple nodes can provide result.
3. Increased overhead on update

## 19.2.2 Data Fragmentation

There are two different schemes for fragmenting a relation: horizontal fragmentation and vertical fragmentation. Horizontal fragmentation splits the relation by assigning each tuple of r to one or more fragments. Vertical fragmentation splits the relation by decomposing the scheme R of relation r.

Horizontal fragmentation is usually used to keep tuples at the sites where they are used the most, to minimize data transfer.

## 19.2.3 Transparency

The user of a distributed database system should not be required to know where the data are physically located nor how the data can be accessed at the specific local site. This property is called **data transparency**.

1. Fragmentation transparency
1. Replication transparency
1. Location transparency

**Unique Names**

Data items—such as relations, fragments, and replicas—must have unique names. This property is easy to ensure in a centralized database. In a distributed database, however, we must take care to ensure that two sites do not use the same name for distinct data items.

One solution to this problem is to require all names to be registered in a central **name server**. The name server helps to ensure that the same name does not get used for different data items. We can also use the name server to locate a data item, given the name of the item.

This approach, however, suffers from two major disadvantages.
1. the name server may become a performance bottle- neck when data items are located by their names, resulting in poor performance.
2. if the name server crashes, it may not be possible for any site in the distributed system to continue to run.

A more widely used alternative approach requires that each site prefix its own site identifier to any name that it generates. This approach ensures that no two sites generate the same name (since each site has a unique identifier). Furthermore, no central control is required. This solution, however, fails to achieve location transparency, since site identifiers are attached to names.

To overcome this problem, the database system can create a set of alternative names, or aliases, for data items. A user may thus refer to data items by simple names that are translated by the system to complete names. The mapping of aliases to the real names can be stored at each site. With aliases, the user can be unaware of the physical location of a data item. Furthermore, the user will be unaffected if the database administrator decides to move a data item from one site to another.
