# Memory Management

| Stack | Heap |
| :------------- | :------------- |
| Where local variables and method invocation lives | Where object lives |

- When JVM starts, it gets a chunk of memory from OS.
- All objects are garbage-collectable on heap.
- Xms Initial Java heap size; Xmx Maximum Java heap size; Xmn Size of the heap
- For optimal performance, Xmn should be lower than Xmx
- No memory for local variable or function calls, JVM will throw StackOverFlowError
- No memory for object creation will throw OutOfMemoryError
- Stack memory is visible to only its own thread, whereas heap memory is shared among threads
- The heap is sometimes divided into two areas (or generations) called the nursery (or young space) and the old space.
-  The nursery is a part of the heap reserved for allocation of new objects. When the nursery becomes full, garbage is collected by running a special young collection, where all objects that have lived long enough in the nursery are promoted (moved) to the old space, thus freeing up the nursery for more object allocation. When the old space becomes full garbage is collected there, a process called an old collection.
- The reasoning behind a nursery is that most objects are temporary and short lived. A young collection is designed to be swift at finding newly allocated objects that are still alive and moving them away from the nursery. Typically, a young collection frees a given amount of memory much faster than an old collection or a garbage collection of a single-generational heap (a heap without a nursery).
