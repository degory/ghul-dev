<!-- ---
{
  "home": true,
  "heroImage": "https://v1.vuepress.vuejs.org/hero.png",
  "tagline": "ghūl programming language docs",
  "actionText": "Quick Start →",
  "actionLink": "/guide/",
  "features": [
    {
      "title": "Feature 1 Title",
      "details": "Feature 1 Description"
    },
    {
      "title": "Feature 2 Title",
      "details": "Feature 2 Description"
    },
    {
      "title": "Feature 3 Title",
      "details": "Feature 3 Description"
    }
  ],
  "footer": null
} -->


# Hello World!

```ghul
entry() =>
    IO.Std.write_line("hello world"); 
```

# Literals

```ghul
use IO.Std.write_line;

entry() is
    assert "string literal".get_type() == typeof string;
    write_line("string literal");

    assert 'c'.get_type() == typeof char;
    write_line("char literal: " + 'c');

    assert 123 .get_type() == typeof int;
    write_line("integer literal: " + 123);

    assert 123_456.789e6D .get_type() == typeof double;
    write_line("double literal: " + 123_456.789e6D);

    assert ("three", "string", "tuple").get_type() == typeof (string,string,string);
    write_line("tuple literal: " + ("three", "string", "tuple"));

    assert ["a", "four", "element", "list"].get_type() == typeof string[];
    write_line("list literal: " + ["a", "four", "element", "list"]|);
si
```

# Control Flow
```ghul
use IO.Std.write_line;

entry() is
    // ghul has basic flow control statements

    // assert tests a condition, and throws an exception if the condition does not hold:
    assert 1 == 1;
    assert 3 > 2;

    // the optional assert else clause supplies a message to include in any thrown exception:
    assert true else "who knows what to believe?";

    // or a specific object to throw:
    assert 1 < "hello".length else new System.IndexOutOfRangeException();
    
    if true then
        assert true;
        write_line("");
    fi    

    if false \/ true then
        write_line("false or-else true");
    else
        assert false;
    fi
    
    let i = 0;
    while i < 10 do
        assert i < 10;
        i = i + 1;
    od

    assert i == 10;

    let count = 0;

    for i in 0..10 do
        assert i >= 0 /\ i < 10;

        count = count + 1;
    od

    assert count == 10;

    // 0..10 is not for loop specific syntax, '..' is just an operator that constructs
    // an iterable integer range:

    let range = 0..100;

    assert range.from == 0;
    assert range.to == 100;

    assert range | .count() == 100;

    // for can iterate over anything that implements Iterable[T], Iterator[T], or move_next() and current:
    for ci in "hello" | .index() do
        write_line("char {0} of 'hello' is {1}", [ci.index, ci.value]);
    od    
    
    try
        assert "wombat" =~ "elephant";
    catch ex: System.Exception
        assert ex.get_type() == typeof Ghul.AssertFailedException;

        write_line("caught: " + ex);
    yrt

    // try finally for ensuring clean-up code is run:

    let is_resource_in_use = false;
    try
        is_resource_in_use = true;
        write_line("resource acquired");
        throw new System.Exception("oops: exception with resource held");
    catch ex: System.Exception
        write_line("caught: " + ex);
    finally
        is_resource_in_use = false;
        write_line("resource released");
    yrt

    assert !is_resource_in_use;
    
    IO.Std.write_line("done");
si
```

# Closures
```ghul
use IO.Std.write_line;
use Collections.LIST;

entry() is
    // f is an anonymous function:
    let f = (i: int) => i * 2;

    // its type is int -> int
    assert f.get_type() == typeof int -> int;

    // it returns its integer argument times two:
    assert f(123) == 123 * 2;

    for i in 1::10 do
        write_line("f({0}) = {1}", [i, f(i)]: object);
    od

    // list_of_gs is a list of 2-tuples, each one having an integer and a function element:
    let list_of_gs = new LIST[(i: int, g: () -> int)]();

    for i in 1::10 do
        // create a function that captures a value - in this case the loop variable i
        let g = () => i;

        // g is a parameterless function that returns an int:
        assert g.get_type() == typeof () -> int;

        // when we call g, it returns the value of i when g was created:
        assert g() == i;

        // store that function in our list for use later:
        list_of_gs.add((i, g));

        // the last value in the list is the tuple we just added:
        assert list_of_gs[list_of_gs.count-1] == (i, g);
    od

    for ig in list_of_gs do
        // each saved g still returns the same value of i that
        // it captured when it was created:
        assert ig.i == ig.g();

        write_line("g that captured i when it was {0} is a {1} that returns {2}", [ig.i, ig.g, ig.g()]);
    od
si
```