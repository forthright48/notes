# Switch

When two computers on same ip network communicate with each other directly, the communication is dealt by the switch.

The task performed by switch is called **Switching**. Routers forward traffic based on IP address, switches forward traffic based on **MAC address**.

# Hubs are not Switch

Read more on [Hub](./hub.md).

# MAC address

All equipments that can be connected to computer networks (computers, routers, servers, printers and etc) have a MAC address. It is an address which is written into the network interface of the device during manufacturing.

A MAC address consists of 12 hexadecimal characters and could look like this:

- 01:23:45:67:89:ab
- 00:fe:19:2a:73:dc
- 02:0a:95:9d:68:16

Each time a computer sends out network traffic the traffic has both a source and destination IP address, but it also has a source and destination MAC address.

IP addresses are relevant on a global scale. They hold the final destination of the packet and can tell us which address the packet is originally coming from. In contrast, MAC addresses are used on a more local scale, and hold information about the **next hop destination** in the local LAN network.

# Broadcasts

> How does a new computer that just booted up knows where is the DHCP server is located?

The computer sends out a broadcast which will reach every other device on the LAN to ask any available DHCP servers to reply back with an IP address.

When a computer sends out a broadcast it will use a special destination MAC address, **FF:FF:FF:FF:FF:FF**. That address is called the **Broadcast Address** and is used specifically for this purpose. All other equipment on the LAN will then understand that the traffic is a broadcast that is directed at everybody else within the LAN.

# Switch

A switch is an intelligent device.

What a switch does is that it constantly monitors the traffic which is entering the switch from connected devices. It then learns about where the different MAC addresses of those devices are connected. It does this by looking at the traffic that arrives from computers to read the source MAC address of the traffic.

If it doesn't know where a particular device is, it acts like sends them to all unknown devices and waits for reply for them.

Switch is like a HUB + Cache.

# ARP (Adress Resolution Protocol)

> How does the computer know MAC address of router?

It sends a broadcast request known as ARP asking "Who has the default gateway IP? Send me your MAC address." Then once computer gets the address, it stores it in a cache for few minutes (refreshing after every successful packet transfer). The cache allows the computer to send packets without broadcasting for MAC address every time.
 
