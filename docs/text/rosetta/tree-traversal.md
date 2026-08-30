
# Tree traversal

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Tree_traversal

```ghul
use IO.Std.write_line
use Collections.Queue
use Ghul.Pipes

union Tree[T] is
    EMPTY
    NODE(value: T, left: Tree[T], right: Tree[T])
si

use Tree.EMPTY
use Tree.NODE

preorder[T](tree: Tree[T]) -> Pipe[T] is
    if let (value, left, right): NODE = ► tree then
        yield value

        yield in preorder(left)
        yield in preorder(right)
    fi
si

inorder[T](tree: Tree[T]) -> Pipe[T] is
    if let (value, left, right): NODE = ► tree then
        yield in inorder(left)

        yield value

        yield in inorder(right)
    fi
si

postorder[T](tree: Tree[T]) -> Pipe[T] is
    if let (value, left, right): NODE = ► tree then
        yield in postorder(left)
        yield in postorder(right)

        yield value
    fi
si

levelorder[T](tree: Tree[T]) -> Pipe[T] is
    let pending = Queue[Tree[T]]()

    pending.enqueue(tree)

    while pending.count > 0 do
        let node = pending.dequeue()

        if let (value, left, right): NODE = ► node then
            yield value

            pending.enqueue(left)
            pending.enqueue(right)
        fi
    od
si

leaf[T](value: T) -> Tree[T] => NODE(value, EMPTY, EMPTY)

show[T](label: string, values: Pipe[T]) =>
    write_line("{label,-12} {values |> join(" ")}")

let tree =
    NODE(1,
        NODE(2, NODE(4, leaf(7), EMPTY), leaf(5)),
        NODE(3, NODE(6, leaf(8), leaf(9)), EMPTY))

show("preorder:", preorder(tree))
show("inorder:", inorder(tree))
show("postorder:", postorder(tree))
show("level-order:", levelorder(tree))
```

output:

```
preorder:    1 2 4 7 5 3 6 8 9
inorder:     7 4 2 5 1 8 6 9 3
postorder:   7 4 5 2 8 9 6 3 1
level-order: 1 2 3 4 5 6 7 8 9
```
