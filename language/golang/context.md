# Context

The context package provides propagated cancellation feature.

Suppose you asked Tom to make a sandwitch and he starts making one. It requires many steps like buying bread and tomatoes. Suppose Tom asked Jerry to go and buy the ingredients. Now suddenly you don't feel like eating sandwitch anymore and let Tom know that. Tom now needs to stop what he was doing. This is cancellation. Tom also needs to let Jerry know that the task was cancelled. This is cancellation propagation.

Using context package, we can stop other goroutines or functions for example.

In Go servers, each incoming request is handled in its own goroutine. Request handlers often start additional goroutines to access backends such as databases and RPC services. The set of goroutines working on a request typically needs access to request-specific values such as the identity of the end user, authorization tokens, and the request's deadline. When a request is canceled or times out, all the goroutines working on that request should exit quickly so the system can reclaim any resources they are using.

Context Provides the following methods:

- Background
- WithCancel
- WithTimeout
- WithDeadline

> A Context carries a deadline, cancelation signal, and request-scoped values across API boundaries. Its methods are safe for simultaneous use by multiple goroutines.

## Derived Contexts

- The context package provides functions to derive new Context values from existing ones. 
- These values form a tree: when a Context is canceled, all Contexts derived from it are also canceled.
- Background
  - Background is the root of any Context tree; it is never canceled
  - Background returns an empty Context. It is never canceled, has no deadline, and has no values. Background is typically used in main, init, and tests, and as the top-level Context for incoming requests.

## Resource

1. [Youtube - justforfunc #9: The Context Package](https://www.youtube.com/watch?v=LSzR0VEraWw)
2. [The Go Blog - Go Concurrency Patterns: Context](https://blog.golang.org/context)
3. [Medium - How to correctly use context.Context in Go 1.7](https://medium.com/@cep21/how-to-correctly-use-context-context-in-go-1-7-8f2c0fafdf39)