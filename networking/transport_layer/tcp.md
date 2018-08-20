# Connection Oriented Transport: TCP

TCP is said to be **connection-oriented** because before one application process can begin to send data to another, the two processes must first “handshake” with each other—that is, they must send some preliminary segments to each other to establish the parameters of the ensuing data transfer.

- Because the TCP protocol runs only in the end systems and not in the intermediate network elements (routers and link-layer switches), the intermediate network elements do not maintain TCP connection state.
- A TCP connection provides a **full-duplex service**: If there is a TCP connection between Process A on one host and Process B on another host, then application- layer data can flow from Process A to Process B at the same time as application- layer data flows from Process B to Process A.
- A TCP connection is also always point-to-point, that is, between a single sender and a single receiver. So-called "multicasting" —the transfer of data from one sender to many receivers in a single send operation-is not possible with TCP.
- The client first sends a special TCP segment; the server responds with a second special TCP segment; and finally the client responds again with a third special segment. The first two segments carry no payload, that is, no application-layer data; the third of these segments may carry a payload. Because three segments are sent between the two hosts, this connection-establishment procedure is often referred to as a **three-way handshake**.

How TCP Sends data:

- Once a TCP connection is established, the two application processes can send data to each other. 
- The client process passes a stream of data through the socket.
- Once the data passes through the door, the data is in the hands of TCP running in the client.
- TCP directs this data to the connection’s **send buffer**, which is one of the buffers that is set aside during the initial three-way handshake.
- From time to time, TCP will grab chunks of data from the send buffer and pass the data to the network layer. The specification does not specify when TCP should send data, saying only it should do it at its convinience.
- The maximum amount of data that can be grabbed and placed in a segment is limited by the **maximum segment size (MSS)**. Note that the MSS is the maximum amount of application-layer data in the segment, not the maximum size of the TCP segment including headers.
- TCP pairs each chunk of client data with a TCP header, thereby forming **TCP segments**. The segments are passed down to the network layer, where they are separately encapsulated within network-layer IP datagrams. The IP datagrams are then sent into the network.

![](assets/2018-08-19-18-54-33.png)

## TCP Segment Structure

![](assets/2018-08-19-18-59-59.png)

### Sequence Numbers and Acknowledgement Numbers

- TCP views data as an unstructured, but ordered, stream of bytes.
- The sequence number for a segment is therefore the byte-stream number of the first byte in the segment.
- The acknowledgment number that Host A puts in its segment is the sequence number of the next byte Host A is expecting from Host B.
- Because TCP only acknowledges bytes up to the first missing byte in the stream, TCP is said to provide **cumulative acknowledgments**.
- Interestingly, the TCP RFCs do not impose any rules here and leave the decision up to the people programming a TCP implementation. There are basically two choices: either (1) the receiver immediately discards out-of-order segments (which, as we discussed earlier, can simplify receiver design), or (2) the receiver keeps the out-of-order bytes and waits for the missing bytes to fill in the gaps. Clearly, the latter choice is more efficient in terms of network bandwidth, and is the approach taken in practice.
- The initial sequence number is chosen randomly on both sides. This is done to minimize the possibility that a segment that is still present in the network from an earlier, already-terminated connection between two hosts is mistaken for a valid segment in a later connection between these same two hosts.
- Note that the acknowledgment for client-to-server data is carried in a segment carrying server-to-client data; this acknowledgment is said to be **piggybacked** on the server-to-client data segment.

## Round-Trip Time Estimation and Timeout

TCP, like our rdt protocol, uses a timeout/retransmit mechanism to recover from lost segments. Although this is conceptually simple, many subtle issues arise when we implement a timeout/retransmit mechanism in an actual protocol such as TCP. 

Perhaps the most obvious question is the length of the timeout intervals. Clearly, the timeout should be larger than the connection’s round-trip time (RTT), that is, the time from when a segment is sent until it is acknowledged. Otherwise, unnecessary retransmissions would be sent. But how much larger? How should the RTT be estimated in the first place? Should a timer be associated with each and every unacknowledged segment?

### Estimating the Round-Trip Time

- The sample RTT, denoted SampleRTT, for a segment is the amount of time between when the segment is sent (that is, passed to IP) and when an acknowledg- ment for the segment is received.
- Instead of measuring a SampleRTT for every transmitted segment, most TCP implementations take only one SampleRTT meas- urement at a time. That is, at any point in time, the SampleRTT is being estimated for only one of the transmitted but currently unacknowledged segments, leading to a new value of SampleRTT approximately once every RTT.
- Also, TCP never com- putes a SampleRTT for a segment that has been retransmitted; it only measures SampleRTT for segments that have been transmitted once. Why?
- Obviously, the SampleRTT values will fluctuate from segment to segment due to congestion in the routers and to the varying load on the end systems. Because of this fluctuation, any given SampleRTT value may be atypical. In order to estimate a typical RTT, it is therefore natural to take some sort of average of the Sam- pleRTT values.
  - TCP maintains an average, called EstimatedRTT, of the Sam- pleRTT values.
  - Upon obtaining a new SampleRTT, TCP updates EstimatedRTT according to the following formula: $EstimaedRTT = (1-\alpha) \cdot EstimatedRTT + \alpha \cdot SampleRTT$
  - The recommended value of 􏰂$\alpha$ is 􏰂$\frac{1}{8} = 0.125$.
  - Note that EstimatedRTT is a weighted average of the SampleRTT values.
  - In statistics, such an average is called an **exponential weighted moving average (EWMA)**.
- In addition to having an estimate of the RTT, it is also valuable to have a measure of the variability of the RTT.
    - DevRTT, as an estimate of how much SampleRTT typically deviates from EstimatedRTT.
    - $DevRTT = (1 - \beta) \cdot DevRTT + \beta \cdot | SampleRTT - EstimatedRTT |$
    - Note that DevRTT is an EWMA of the difference between SampleRTT and EstimatedRTT. If the SampleRTT values have little fluctuation, then DevRTT will be small; on the other hand, if there is a lot of fluctuation, DevRTT will be large.
    - The recommended value of β is 0.25.

### Setting and Managing the Retransmission Timeout Interval

> Given values of EstimatedRTT and DevRTT, what value should be used for TCP’s timeout interval?

- Clearly, the interval should be greater than or equal to EstimatedRTT, or unnecessary retransmissions would be sent. But the timeout interval should not be too much larger than EstimatedRTT; otherwise, when a seg- ment is lost, TCP would not quickly retransmit the segment, leading to large data transfer delays.
- It is therefore desirable to set the timeout equal to the EstimatedRTT plus some margin.
- The margin should be large when there is a lot of fluctuation in the SampleRTT values; it should be small when there is little fluctuation. The value of DevRTT should thus come into play here.
- $TimeoutInterval = EstimatedRTT + 4 \cdot DevRTT$
- An initial TimeoutInterval value of 1 second is recommended.
- Also, when a timeout occurs, the value of TimeoutInterval is doubled to avoid a premature timeout occurring for a subsequent segment that will soon be acknowledged.
- However, as soon as a segment is received and EstimatedRTT is updated, the TimeoutInterval is again computed using the formula above.

## Reliable Data Transfer

In our earlier development of reliable data transfer techniques, it was conceptu- ally easiest to assume that an individual timer is associated with each transmitted but not yet acknowledged segment. While this is great in theory, timer management can require considerable overhead. Thus, the recommended TCP timer management procedures use only a single retransmission timer, even if there are mul- tiple transmitted but not yet acknowledged segments.

> What is the difference between TCP and GBN?

Upon timeout, TCP retransmits only one segment.

### Doubling the Timeout Interval

The first concerns the length of the timeout interval after a timer expiration. In this mod- ification, whenever the timeout event occurs, TCP retransmits the not-yet- acknowledged segment with the smallest sequence number, as described above. But each time TCP retransmits, it sets the next timeout interval to twice the previous value, rather than deriving it from the last EstimatedRTT and DevRTT.

However, whenever the timer is started after either of the two other events (that is, data received from application above, and ACK received), the TimeoutInterval is derived from the most recent values of EstimatedRTT and DevRTT.

This modification provides a limited form of congestion control.

### Fast Retransmit

- One of the problems with timeout-triggered retransmissions is that the timeout period can be relatively long. When a segment is lost, this long timeout period forces the sender to delay resending the lost packet, thereby increasing the end-to- end delay.
- Fortunately, the sender can often detect packet loss well before the time- out event occurs by noting so-called duplicate ACKs.
- A **duplicate ACK** is an ACK that reacknowledges a segment for which the sender has already received an earlier acknowledgment.

![](assets/2018-08-19-20-55-48.png)

- Because a sender often sends a large number of segments back to back, if one seg- ment is lost, there will likely be many back-to-back duplicate ACKs.
- If the TCP sender receives three duplicate ACKs for the same data, it takes this as an indication that the segment following the segment that has been ACKed three times has been lost.
  - > Why wait for 3 duplicate ACK instead of just 1?
  - Maybe the packet did not go missing, just went out of order.
- In the case that three duplicate ACKs are received, the TCP sender performs a **fast retransmit**, retrans- mitting the missing segment before that segment’s timer expires.

### Go-Back-N or Selective Repeat

- TCP acknowledgments are cumulative.
- Correctly received but out-of-order segments are not individually ACKed by the receiver.
- TCP retransmits only one segment at a time.

Thus it is a hybrid.

## Flow Control
