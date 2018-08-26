# Network Layer

Role of the network layer is to move packets from a sending host to a receiving host.

## Forwarding vs Routing

Forwarding involves the transfer of a packet from an incoming link to an outgoing link within a single router. 

Routing involves all of a network's routers, whose collective interactions via routing protocols determine the paths that packets take on their trips from source to destination node.

## Forwarding Table

- Every router has a **forwarding table**.
- A router forwards a packet by examin- ing the value of a field in the arriving packet’s header, and then using this header value to index into the router’s forwarding table.
- > How the forwarding tables in the routers are con- figured?
    - The routing algorithm determines the values that are inserted into the routers’ forwarding tables.
    - The routing algorithm may be centralized (e.g., with an algorithm executing on a central site and downloading routing information to each of the routers) or decentralized (i.e., with a piece of the distributed routing algorithm running in each router).
    - A router receives routing protocol messages, which are used to configure its forward- ing table.

![](assets/2018-08-25-00-56-35.png)

## Network Service Models

Internet uses "Best Effort" model, which mean it provides no service at all.

## Virtual Circuit and Datagram Networks

- A network layer can provide connectionless service or connection service between two hosts.
- In all major computer network architectures to date (Internet, ATM, frame relay, and so on), the network layer provides either a host-to-host connectionless serv- ice or a host-to-host connection service, but not both.
- Computer networks that provide only a connection service at the network layer are called **virtual-circuit (VC) networks**; computer networks that provide only a connectionless service at the network layer are called **datagram networks**.

## Datagram Networks

- In a datagram network, each time an end system wants to send a packet, it stamps the packet with the address of the destination end system and then pops the packet into the network
- Each router has a forwarding table that maps destination addresses to link interfaces.
- Suppose that all destination addresses are 32 bits. A brute-force implemen- tation of the forwarding table would have one entry for every possible destination address. Since there are more than 4 billion possible addresses, this option is totally out of the question.
- the router matches a prefix of the packet’s desti- nation address with the entries in the table; if there’s a match, the router forwards the packet to a link associated with the match.
- When there are multiple matches, the router uses the longest prefix matching rule.
- The time scale at which this forwarding state information changes is relatively slow. Indeed, in a datagram network the forwarding tables are modified by the routing algorithms, which typically update a forwarding table every one-to- five minutes or so.
- Because forwarding tables in datagram networks can be modified at any time, a series of packets sent from one end system to another may follow different paths through the network and may arrive out of order.

![](assets/2018-08-25-11-11-51.png)
![](assets/2018-08-25-11-11-39.png)

## Router

![](assets/2018-08-25-11-21-22.png)

Components of a Router:

- Input/Output Ports 
  - It performs the physical layer function of terminating an incoming physical link  at a router. This is shown in the left most box of input port and rightmost box of  output port.
  - An input port also performs link-layer functions needed to interoperate with the  link layer at the other side of the incoming link; this is represented by the middle  boxes in the input and output ports.
  - the lookup function is also performed at the input port; this will occur in the rightmost box of the input port.
  - Control packets (for example, packets carrying routing protocol information) are forwarded from an input port to the routing processor.
- Switching Fabric
  - The switching fabric connects the router’s input ports to its output ports. This switching fabric is completely contained within the router— a network inside of a network router!
- Routing processor
  - The routing processor executes the routing protocols, maintains routing tables and attached link state infor- mation, and computes the forwarding table for the router.

Router Fowarding Functions:

- A router’s input ports, output ports, and switching fabric together implement the forwarding function and are almost always implemented in hardware
- These forwarding functions are sometimes collectively referred to as the router forwarding plane.

Analogy will be a junction with many roads connected to it. A car comes in, tells an attendant at the junction where he wants to go, enters roundabout and eventually exits from another road.

### Input Processing

![](assets/2018-08-25-11-42-56.png)

- The forwarding table is computed and updated by the routing processor, with a shadow copy typically stored at each input port.
- The forwarding table is copied from the routing processor to the line cards over a sepa- rate bus (e.g., a PCI bus)
- With a shadow copy, forwarding decisions can be made locally, at each input port, without invoking the centralized routing processor on a per-packet basis and thus avoiding a centralized processing bottleneck.
- a packet may be temporarily blocked from entering the switching fabric if packets from other input ports are cur- rently using the fabric.
- A blocked packet will be queued at the input port and then scheduled to cross the fabric at a later point in time.
- Other actions:
  - physical- and link-layer processing must occur
  - the packet’s version number, checksum and time-to-live field must be checked and the latter two fields rewritten
  - counters used for network management (such as the number of IP datagrams received) must be updated

The input port steps of looking up an IP address (“match”) then sending the packet into the switching fabric (“action”) is a specific case of a more general **“match plus action”** abstraction that is performed in many networked devices, not just routers.

### Switching

### Output Processing

![](assets/2018-08-26-11-16-24.png)

- A consequence of output port queuing is that a packet scheduler at the output port must choose one packet among those queued for transmission.
- Packet scheduling plays a crucial role in providing **quality-of-service guarantees**.
- Similarly, if there is not enough memory to buffer an incoming packet, a decision must be made to either drop the arriving packet (a policy known as **drop-tail**) or remove one or more already-queued packets to make room for the newly arrived packet.


## The Internet Protocol (IP): Forwarding and Addressing in the Internet

The Internet’s network layer has three major components:

- The first component is the IP protocol
- The second major component is the rout- ing component, which determines the path a datagram follows from source to des- tination
- The final component of the network layer is a facility to report errors in datagrams and respond to requests for certain network-layer information.

![](assets/2018-08-26-11-26-38.png)

## Datagram Format

A network-layer packet is referred to as a datagram.

![](assets/2018-08-26-11-29-01.png)

- **Version Number**: These 4 bits specify the IP protocol version of the datagram. By looking at the version number, the router can determine how to interpret the remainder of the IP datagram.
- **Header Length**: Because an IPv4 datagram can contain a variable number of options (which are included in the IPv4 datagram header), these 4 bits are needed to determine where in the IP datagram the data actually begins.
- **Type of Service**: The type of service (TOS) bits were included in the IPv4 header to allow different types of IP datagrams (for example, datagrams particularly requiring low delay, high throughput, or reliability) to be distinguished from each other. For example, it might be useful to distinguish real-time datagrams (such as those used by an IP telephony application) from non-real-time traffic (for exam- ple, FTP)
- **Datagram Length**: This is the total length of the IP datagram (header plus data), measured in bytes. Since this field is 16 bits long, the theoretical maximum size of the IP datagram is 65,535 bytes. However, datagrams are rarely larger than 1,500 bytes.
- **Identifier, flags, fragmentation offset**: These three fields have to do with so-called IP fragmentation
- **Time-to-live**: The time-to-live (TTL) field is included to ensure that datagrams do not circulate forever (due to, for example, a long-lived routing loop) in the network. This field is decremented by one each time the datagram is processed by a router. If the TTL field reaches 0, the datagram must be dropped.
- **Protocol**: This field is used only when an IP datagram reaches its final destina- tion. The value of this field indicates the specific transport-layer protocol to which the data portion of this IP datagram should be passed.
- **Header Checksum**
  - The header checksum aids a router in detecting bit errors in a received IP datagram. The header checksum is computed by treating each 2 bytes in the header as a number and summing these numbers using 1s complement arithmetic.
  - A router computes the header checksum for each received IP datagram and detects an error condition if the checksum carried in the datagram header does not equal the computed check- sum.
  - Routers typically discard datagrams for which an error has been detected.
  - Note that the checksum must be recomputed and stored again at each router, as the TTL field, and possibly the options field as well, may change.
  - > why does TCP/IP perform error checking at both the transport and network layers?
    - only the IP header is checksummed at the IP layer, while the TCP/UDP checksum is computed over the entire TCP/UDP segment.
    - TCP/UDP and IP do not necessarily both have to belong to the same pro- tocol stack. TCP can, in principle, run over a different protocol (for example, ATM) and IP can carry data that will not be passed to TCP/UDP.

## IP Datagram Fragmentation

> What to do if router sees that MTU (Maximum Transmission Unit) of outgoing link is smaller than incoming link?

The solution is to fragment the data in the IP datagram into two or more smaller IP datagrams, encapsulate each of these smaller IP datagrams in a separate link-layer frame;and send these frames over the outgoing link. Each of these smaller data- grams is referred to as a **fragment**.

