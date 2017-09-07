# Geography and Regions

Google Cloud Platform services are available in locations across North America, Europe, and Asia.

These locations are then divided into **Regions** and **Zones**.

Inter-Zone communication takes 5ms RTT on the 95th Percentile.

Zones should be considered a single failure domain within a region. In order to deploy fault-tolerant applications with high availability, you should deploy your applications across multiple zones in a region to help protect against unexpected failures.

To protect against the loss of an entire region due to natural disaster, you should have a disaster recovery plan and know how to bring up your application in the unlikely event that your primary region is lost.

When using regional or zonal storage resources, it is highly recommended that you replicate data to another region or snapshot it to a multi-regional storage resources for disaster recovery purposes.

# Cloud Computing

> In **cloud computing**, the capital investment in **building and maintaining data centers** is replaced by **consuming IT resources** as an elastic, utility-like service from a cloud “provider” (including storage, computing, networking, data processing and analytics, application development, machine learning, and even fully managed services).

# Security

[Google Infrastructure Security Design](https://www.youtube.com/watch?time_continue=1&v=O-JXFQezWOc)

1. Hardware Layer
    Own data center built with security camera, biometric authentication and laser traps.
    Custom made manufactured hardware used to provide extra security, such as Titan chip
1. Boot
1. OS + IPC
    Everything is service. There is no trust between any service. Service need authentication so that server can limit access to rpc (**Interservice access management**). Services need **End User Permission Ticket** to access user-related sensitive data in another service.

[Best Practices for DDoS Protection and Mitigation on Google Cloud Platform](https://cloud.google.com/files/GCPDDoSprotection-04122016.pdf):

- When you enable HTTP(S) Load Balancing or SSL proxy Load Balancing, Google infrastructure mitigates and absorbs many Layer 4 and below attacks, such as SYN floods, IP fragment floods, port exhaustion, etc
-  projects are limited to an API rate limit of 20 requests/second.
