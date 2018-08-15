# Consistency

1. No Consistency
2. Strong Consistency aka Linearizability
3. Sequential Consistency

## Strong Consistency aka Linearizability

**Disclaimer**: This might be wrong.

Imagine I have many processors in computer, processing various tasks. Here, let us consider tasks as method calls. Let's say we only have write and read calls.

It is difficult for a programmer to reasons with so many things happening at once. So what the programmer does is, it tries to imagine that all these tasks are not happening in multiple processors, instead, they are being run on a single processor linearly.

So the programmer takes all the operations from various processor and merges them together in a linear order. But, he needs to ensure that this linear model is equivalent to the previous multi-core model.

What do I mean by equivalent? The read operation in the linear model must return what it returns in the multi-core model (**a read from a location to return the value of the last write to that location**). If he can ensure this, then this linear model is equivalent to multi-core model.

Another thing he needs to ensure: **if a response precedes an invocation, then this ordering must be preseverd in linear model**.

Not all multi-core model can be mapped to a linear model like this. Those that can be mapped are called **Linearizable**.

## Sequential Consistency

For this, the linear model needs to simply make sure **if a response precedes an invocation, then this ordering must be preseverd in linear model**. That's it. Only the ordering of operations in individual processor is maintained.

## Resources

1. [A Foo Walks into a Bar: Consistency Models Explained Briefly](http://coldattic.info/post/88/)