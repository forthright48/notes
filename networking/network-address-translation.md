# Network Address Translation (NAT)

[How NAT Works - Youtube](https://www.youtube.com/watch?v=QBqPzHEDzvo)

Basically, NAT is a mapping carried out by our routers so that our computers on private network (with IP 192.168.0.100) is accessible from Internet.

Whenever a packet is sent over network, the header must have a source IP. If the source IP is a private IP, how is the server going to send its reply back to us?

What happens in reality is that our router replaces the source IP address (e.g, 192.168.0.100:12345) with its own public IP address and a random port (e.g, 12.13.14.15:54331) and stores the mapping in a table called **NAT Table**. Now the server can reply back to the router and the router forwards it according to the NAT Table.
