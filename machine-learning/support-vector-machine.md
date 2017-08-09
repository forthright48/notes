# Support Vector Machine

A tool used to separate dataset such that the separation is as wide as possible.

>In SVMs we are trying to find a decision boundary that maximizes the "margin" or the "width of the road" separating the positives from the negative training data points

Imagine, we figured out the perfect separating line $S$. Now, from the origin, draw a unit vector $\vec{w}$ that connects to $S$ perpendicularly. Suppose this vector when extended cuts $S$ at $m$. Let the length from origin to $m$ be $c$.

So now, when we get an unknown point $x$, how do we decide on which side of $S$ does it fall? We first consider it as a vector $\vec{u}$ and then project it upon $\vec{w}$. If the projection has length $ \ge c$, then it is on right side.

$$\vec{w} \cdot \vec{u} \ge c $$

Without loss of generality:

$$\vec{w} \cdot \vec{u} + b \ge 0 $$

where $b$ is a constant.
