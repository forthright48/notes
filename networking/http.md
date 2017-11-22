# HTTP

# CORS

Cross Origin Resource Sharing.

This is used to prevent a site (xyz.com) from pulling resources from another site (abc.com), unless abc.com explicitly allows it.

Some requests are by default allowed, such as retrieving 'text/plain' documents using GET request.

For requests which are deemed risky (trying to download and run a js script from another origin abc.com), the browser first sends a preflight request asking the server abc.com about what is allowed and what is not. This preflight request is a OPTION request. The server in return responds with what is allowed and what is not using http headers (Access-Control-Allow-Origin and Access-Control-Allow-Methods).

Once the preflight response comes back, it is used to determine whether the browser should go forward with the risky request.

**Resource**: [Cross-Origin Requests in Express.JS](http://justindavis.co/2015/08/31/CORS-in-Express/)
