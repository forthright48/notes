# TCP SPLITTING: OPTIMIZING THE PERFORMANCE OF CLOUD SERVICES
For cloud services such as search, e-mail, and socialnetworks, it is desirable to provide a high-level ofresponsiveness, ideally giving users the illusion that theservices are running within their own end systems (includingtheir smartphones). This can be a major challenge, as usersare often located far away from the data centers that areresponsible for serving the dynamic content associated withthe cloud services.

Indeed, if the end system is far from a data center, then theRTT will be large, potentially leading to poor response timeperformance due to TCP slow start. As a case study, considerthe delay in receiving a response for a search query.Typically, the server requires three TCP windows during slowstart to deliver the response. Thus the time from when an endsystem initiates a TCP connection until the time when itreceives the last packet of the response is roughly $4 \cdotRTT$ (one RTT to set up the TCP connection plus three RTTs forthe three windows of data) plus the processing time in thedata center.

These RTT delays can lead to a noticeable delay in returningsearch results for a significant fraction of queries.Moreover, there can be significant packet loss in accessnetworks, leading to TCP retransmissions and even largerdelays.

One way to mitigate this problem and improve user-perceivedperformance is to (1) deploy front-end servers closer to theusers, and (2) utilize TCP splitting by breaking the TCPconnection at the front-end server.

With TCP splitting, the client establishes a TCP connection tothe nearby front-end, and the front-end maintains a persistentTCP connection to the data center with a very large TCPcongestion window. With this approach, the response timeroughly becomes $4 \cdot RTT_{FE} + RTT_{BE} + processing\ time$, where $RTT_{FE}$ is the round-trip time between clientand front-end server, and $RTT_{BE}$ is the round-trip timebetween the front-end server and the data center (back-endserver).

If the front-end server is close to client, then this responsetime approximately becomes RTT plus processing time, since$RTT_{FE}$ is negligibly small and $RTT_{BE}$ is approximatelyRTT.

In summary, TCP splitting can reduce the networking delay roughly from $4 \cdot RTT$ to $RTT$, significantly improving user-perceived performance, particularly for users who are far from the nearest data center. TCP splitting also helps reduce TCP retransmission delays caused by losses in access networks.

Today, Google and Akamai make extensive use of their CDN servers in access networks to perform TCP splitting for the cloud services they support.
