# Unix Domain Socket

A Unix domain socket or IPC socket (inter-process communication socket) is a data communications endpoint for exchanging data between processes executing on the **same host operating system**.

Like named pipes, Unix domain sockets support:

- Transmission of a reliable stream of bytes (SOCK_STREAM, compare to TCP).
- Ordered and reliable transmission of datagrams (SOCK_SEQPACKET, compare to SCTP).
- Unordered and unreliable transmission of datagrams (SOCK_DGRAM, compare to UDP). 
  
The Unix domain socket facility is a standard component of POSIX operating systems.

## Why use UDS instead of TCP

IP sockets (especially TCP/IP sockets) are a mechanism allowing communication between processes over the network. In some cases, you can use TCP/IP sockets to talk with processes running on the same computer (by using the loopback interface).

The API for Unix domain sockets is similar to that of an Internet socket, but rather than using an underlying network protocol, all communication occurs entirely within the operating system kernel.

**UNIX domain sockets know that they’re executing on the same system**, so they can avoid some checks and operations (like routing); which makes them faster and lighter than IP sockets. So if you plan to communicate with processes on the same host, this is a better option than IP sockets.

**UNIX domain sockets are subject to file system permissions**, while TCP sockets can be controlled only on the packet filter level. As a result, it is much easier to regulate which users have access to a UNIX domain socket than it is for a TCP socket
