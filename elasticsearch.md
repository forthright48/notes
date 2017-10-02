# Elasticsearch

ES runs on port 9200.

# Kibana

http://localhost:5601/app/kibana

# Elastic Request

`curl -X<VERB> '<PROTOCOL>://<HOST>:<PORT>/<PATH>?<QUERY_STRING>' -d '<BODY>'`

In short form it looks like this:

```
PUT /megacorp/employee/2
{
    "first_name" :  "Jane",
    "last_name" :   "Smith",
    "age" :         32,
    "about" :       "I like to collect rock albums",
    "interests":  [ "music" ]
}
```

Here it follows the format `/[index]/[type]/[id]`.

# Common Commands

```
# Search specific id
GET /megacorp/employee/1

# Search all
GET /megacorp/employee/_search

# Search with query
GET /megacorp/employee/_search?q=last_name:Smith

# Search using DSL
GET /megacorp/employee/_search
{
    "query" : {
        "match" : {
            "last_name" : "Smith"
        }
    }
}

# Auto generate id
POST /website/blog/
{
  "title": "My second blog entry",
  "text":  "Still trying this out...",
  "date":  "2014/01/01"
}

# Get particular field of source
GET /website/blog/123?_source=title,text

# Get only source without any metadata
GET /website/blog/123/_source

# Create only if it doesn't exist
PUT /website/blog/123/_create
{...}


```
