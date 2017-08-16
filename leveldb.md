# LevelDB

1. Write optimized.
1. All writes are appended to log files. From there, data are compressed into larger files.
1. Read complexity is O(logN).
1. One read can take multiple disk seek. One seek for each level.
1. Bloom filter can improve read time by 100X.
1. Asynchronous by default. Pushes write to OS.
1. Can lose data if OS crashes.

# Resources:

1. [Interview of Sanjay](http://skipperkongen.dk/2013/02/14/having-a-look-at-leveldb/)
