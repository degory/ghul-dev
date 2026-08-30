
# Intersecting number wheels

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Intersecting_number_wheels

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

union Value is
    NUMBER(digit: int)
    WHEEL(name: char)
si

use Value.NUMBER
use Value.WHEEL

class WHEEL_SET is
    _values: MAP[char, Value[]]
    _position: MAP[char, int]

    init(wheels: (name: char, values: Value[])[]) is
        _values = MAP()
        _position = MAP()

        for (name, values) in wheels do
            _values[name] = values
            _position[name] = 0
        od
    si

    next(name: char) -> int is
        let values = _values[name]
        let at = _position[name]

        _position[name] = (at + 1) % values.count

        case values[at]
        when number: NUMBER then
            return number.digit
        when wheel: WHEEL then
            return next(wheel.name)
        esac
    si
si

describe(value: Value) -> string =>
    case ► value
    when number: NUMBER then "{number.digit}"
    when wheel: WHEEL then "{wheel.name}"
    esac

show(wheels: (name: char, values: Value[])[]) is
    let wheel_set = WHEEL_SET(wheels)

    for (name, values) in wheels do
        write_line("{name}: {values |> map(describe) |> join(" ")}")
    od

    let generated = LIST()

    for _ in 1::20 do
        generated.add("{wheel_set.next(wheels[0].name)}")
    od

    write_line("  {generated |> join(" ")}")
si

let simple: (name: char, values: Value[])[] =
    [(name = 'A', values = [NUMBER(1), NUMBER(2), NUMBER(3)])]

let two_wheels: (name: char, values: Value[])[] = [
    (name = 'A', values = [NUMBER(1), WHEEL('B'), NUMBER(2)]),
    (name = 'B', values = [NUMBER(3), NUMBER(4)])
]

let shared: (name: char, values: Value[])[] = [
    (name = 'A', values = [NUMBER(1), WHEEL('D'), WHEEL('D')]),
    (name = 'D', values = [NUMBER(6), NUMBER(7), NUMBER(8)])
]

let multiply_connected: (name: char, values: Value[])[] = [
    (name = 'A', values = [NUMBER(1), WHEEL('B'), WHEEL('C')]),
    (name = 'B', values = [NUMBER(3), NUMBER(4)]),
    (name = 'C', values = [NUMBER(5), WHEEL('B')])
]

for group in [simple, two_wheels, shared, multiply_connected] do
    show(group)
od
```

output:

```
A: 1 2 3
  1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2
A: 1 B 2
B: 3 4
  1 3 2 1 4 2 1 3 2 1 4 2 1 3 2 1 4 2 1 3
A: 1 D D
D: 6 7 8
  1 6 7 1 8 6 1 7 8 1 6 7 1 8 6 1 7 8 1 6
A: 1 B C
B: 3 4
C: 5 B
  1 3 5 1 4 3 1 4 5 1 3 4 1 3 5 1 4 3 1 4
```
