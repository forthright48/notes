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