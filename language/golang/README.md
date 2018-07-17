# GoLang

# Profilingd

Read [How to profile Go applications inside a docker container](https://bruinsslot.jp/post/profiling-golang-docker/)

## Running pprof on Docker

### Step 1

Add these to your main function

```
// main.go
import (
    _ "net/http/pprof"
    _ "expvar"
)

func main() {
    go func() {
        http.ListenAndServe("0.0.0.0:6060", nil)
    }()
```

### Step 2

Then open 6060 port in your container through compose file.

```
// docker-compose.yaml
version: "3"
services:
    app:
        build: ./build-dir
        ports:
            - "6060:6060"
```

### Step 3

Start a cpu profile from shell by running the command:

```
$ go tool pprof http://localhost:6060/debug/pprof/profile
```

### Step 4

While running step 3, we need to hit our server with http requests so that it does something. Otherwise the profile would be empty. For web server we can hit our server with benchmarking tool like wrk.

### Step 5

Once profiling is complete, you will be taken to a pprof interactive shell.

## pprof Shell

```
web  # Opens the profile in chrome browser as a drawing
top10 # To show top 10 functions by time spent only in that function
top10 -cum # Top 10 functions by time spent by that function or function it called
```

## Running go-torch on Docker

Same thing as pprof. Once everything has been setup:

```
go-torch -u http://localhost:6060 -t 30 -f custom-name.svg
```

Make sure you open the svg in a chrome browser. The blocks are clickable. Colors do not mean anything. What matters is length. Longer blocks mean longer time. The whole stack is displayed.
