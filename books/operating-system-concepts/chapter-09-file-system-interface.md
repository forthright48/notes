# Chapter 9 - File System Interface

# 9.1 File Concept

The operating system abstracts from the physical properties of its storage devices to define a logical storage unit, the file. Files are mapped by the operating system onto physical devices.

From a user’s perspective, a file is the smallest allotment of logical secondary storage; that is, data cannot be written to secondary storage unless they are within a file.

## 9.1.1 File Attributes

1. **Name**
2. **Identifier**: non human readable unique tag  
3. **Type**
4. **Location**: pointer to the device and location within that device where file resides
5. **Size**: current size and max possible size
6. **Protection**
7. **Time, date and user identification**

The information about all files is kept in the directory structure, which also resides on secondary storage. It may take more than a kilobyte to record this information for each file. In a system with many files, the size of the directory itself may be megabytes.

## 9.1.2 File Operations

A file is an abstract data type on which different operations can be performed.

1. **Creating a file**: Two steps are necessary to create a file. First, space in the file system must be found for the file. Second, an entry for the new file must be made in the directory.
1. **Writing a file**: To write a file, we make a system call specifying both the name of the file and the information to be written to the file. Given the name of the file, the system searches the directory to find the file’s location. The system must keep a write pointer to the location in the file where the next write is to take place. The write pointer must be updated whenever a write occurs.
3. **Reading a file**: To read from a file, we use a system call that specifies the name of the file and where (in memory) the next block of the file should be put. Again, the directory is searched for the associated entry, and the system needs to keep a read pointer to the location in the file where the next read is to take place. Once the read has taken place, the read pointer is updated. Because a process is usually either reading from or writing to a file, the current operation location can be kept as a per-process **current-file-position pointer**. Both the read and write operations use this same pointer, saving space and reducing system complexity.
4. **Repositioning within a file**: The directory is searched for the appropriate entry, and the current-file-position pointer is repositioned to a given value. Repositioning within a file need not involve any actual I/O . This file operation is also known as a **file seek**.
5. **Deleting a file**: To delete a file, we search the directory for the named file. Having found the associated directory entry, we release all file space, so that it can be reused by other files, and erase the directory entry.
6. **Truncating a file**: The user may want to erase the contents of a file but keep its attributes. Rather than forcing the user to delete the file and then recreate it, this function allows all attributes to remain unchanged —except for file length—but lets the file be reset to length zero and its file space released.

These primitive operations can then be combined to perform other file operations. For instance, we can create a copy of a file, or copy the file to another I/O device, such as a printer or a display, by creating a new file and then reading from the old and writing to the new.

### Open File Table

Most of the file operations mentioned involve searching the directory for the entry associated with the named file. To avoid this constant searching, many systems require that an open() system call be made before a file is first used actively. The operating system keeps a small table, called the **open-file table**, containing information about all open files. When a file operation is requested, the file is specified via an index into this table, so no searching is required. When the file is no longer being actively used, it is closed by the process, and the operating system removes its entry from the open-file table. create and delete are system calls that work with closed rather than open files.

The open() operation takes a file name and searches the directory, copying the directory entry into the open-file table. The open() call can also accept access- mode information—create, read-only, read –write, append-only, and so on. This mode is checked against the file’s permissions. If the request mode is allowed, the file is opened for the process. The open() system call typically returns a pointer to the entry in the open-file table. This pointer, not the actual file name, is used in all I/O operations, avoiding any further searching and simplifying the system-call interface.

In environments where multiple process can open a file, it is a bit more complicated. A system wide Open File table is maintained along with per-process open-file table.

**TODO: Read more from page 386 onwards**

## 9.1.5 Internal File Structure

Internally, locating an offset within a file can be complicated for the operating system. Disk systems typically have a well-defined block size determined by the size of a sector. All disk I/O is performed in units of one block (physical record), and all blocks are the same size. It is unlikely that the physical record size will exactly match the length of the desired logical record. Logical records may even vary in length. Packing a number of logical records into physical blocks is a common solution to this problem.

# 9.2 Access Methods

## 9.2.1 Sequential Access

The simplest access method is sequential access. Information in the file is processed in order, one record after the other.

# 9.3 Directory and Disk Structure

Any entity containing a file system is generally known as a **volume**.

Each volume that contains a file system must also contain information about the files in the system. This information is kept in entries in a device directory or volume table of contents. The device directory (more commonly known simply as that **directory**) records information—such as name, location, size, and type—for all files on that volume.

## 9.3.2 Directory Overview

The directory can be viewed as a symbol table that translates file names into their directory entries.

## How is the directory designed?

A single level directory is simple implement, but does not allow same file name existing together.

A two level directory of the form /user/file-name allows namespace for files and at the same time isolation. It also introduces concept of file path. A separate user with id 0 is created to keep system-wide shared files.

A tree structure generalizes the file system allowing user to have sub-directory.

Hard links and Soft links allows files to be shared across user namespace. One is not allowed to create hard links to directories, only files.

 
