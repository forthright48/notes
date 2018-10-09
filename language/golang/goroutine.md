# Go Routine

## Wait for all Go Routine to Finish

```go
var wg sync.WaitGroup 

wg.Add(1)
go func() {
    defer wg.Done()
    // do stuff
}()
wg.Wait()
```

Reference: [How to Wait for All Goroutines to Finish Executing Before Continuing](https://nathanleclaire.com/blog/2014/02/15/how-to-wait-for-all-goroutines-to-finish-executing-before-continuing/)

## Shutdown worker by closing channel

```go
func main() {
    jobs := make(chan int, 5)
    done := make(chan bool)

    go func() {
        for {
            j, more := <-jobs
            if more {
                fmt.Println("received job", j)
            } else {
                fmt.Println("received all jobs")
                done <- true
                return
            }
        }
    }()

    for j := 1; j <= 3; j++ {
        jobs <- j
        fmt.Println("sent job", j)
    }
    close(jobs)
    fmt.Println("sent all jobs")

    <-done
}
```


Reference [Go by Example: Closing Channels](https://gobyexample.com/closing-channels)