import{Z as t,Q as n,j as a,g as s,n as r,o as e}from"./chunks/framework.BXFC_ndL.js";const d="rosetta-fizzbuzz",D=!1,g=`use IO.Std.write_line

for i in 1::100 do
    write_line(
        if i % 15 == 0 then
            "FizzBuzz"
        elif i % 3 == 0 then
            "Fizz"
        elif i % 5 == 0 then
            "Buzz"
        else
            "{i}"
        fi
    )
od`,x=`use IO.Std.write_line

for i in 1::100 do
    write_line(
        if i % 15 == 0 then
            "FizzBuzz"
        elif i % 3 == 0 then
            "Fizz"
        elif i % 5 == 0 then
            "Buzz"
        else
            "{i}"
        fi
    )
od
`,y=!1,C=!1,o=[],F=`1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
Fizz
22
23
Fizz
Buzz
26
Fizz
28
29
FizzBuzz
31
32
Fizz
34
Buzz
Fizz
37
38
Fizz
Buzz
41
Fizz
43
44
FizzBuzz
46
47
Fizz
49
Buzz
Fizz
52
53
Fizz
Buzz
56
Fizz
58
59
FizzBuzz
61
62
Fizz
64
Buzz
Fizz
67
68
Fizz
Buzz
71
Fizz
73
74
FizzBuzz
76
77
Fizz
79
Buzz
Fizz
82
83
Fizz
Buzz
86
Fizz
88
89
FizzBuzz
91
92
Fizz
94
Buzz
Fizz
97
98
Fizz
Buzz
`,u=[],z=[{startLine:1,startColumn:12,endLine:1,endColumn:21,text:"IO.Std.write_line(...)",signature:"IO.Std.write_line(...)",kindLabel:"function group",signatureLines:[[{text:"IO",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"Std",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"write_line",style:{"--shiki-light":"#795E26","--shiki-dark":"#DCDCAA"}},{text:"(...)",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}}]]},{startLine:3,startColumn:5,endLine:3,endColumn:5,text:"i: int",signature:"i: int",kindLabel:"local value",signatureLines:[[{text:"i",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:3,startColumn:11,endLine:3,endColumn:12,text:"Ghul.::(from: int, to: int) -> INT_RANGE_INCLUSIVE",signature:"Ghul.::(from: int, to: int) -> INT_RANGE_INCLUSIVE",kindLabel:"innate function range.inclusive",signatureLines:[[{text:"Ghul",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"::",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:"(",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"from",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:", ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"to",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:") ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"->",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"INT_RANGE_INCLUSIVE",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:4,startColumn:5,endLine:4,endColumn:14,text:"IO.Std.write_line(value: string?) -> void",signature:"IO.Std.write_line(value: string?) -> void",kindLabel:"pure class method",signatureLines:[[{text:"IO",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"Std",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"write_line",style:{"--shiki-light":"#795E26","--shiki-dark":"#DCDCAA"}},{text:"(",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"value",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"string",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:"?) ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"->",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"void",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:5,startColumn:12,endLine:5,endColumn:12,text:"i: int",signature:"i: int",kindLabel:"local value",signatureLines:[[{text:"i",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:5,startColumn:14,endLine:5,endColumn:14,text:"Ghul.%(a: int, b: int) -> int",signature:"Ghul.%(a: int, b: int) -> int",kindLabel:"innate function arithmetic.rem",signatureLines:[[{text:"Ghul",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".%(",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"a",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:", ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"b",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:") ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"->",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:5,startColumn:19,endLine:5,endColumn:20,text:"Ghul.==[int](a: int, b: int) -> bool",signature:"Ghul.==[int](a: int, b: int) -> bool",kindLabel:"innate function compare.value",signatureLines:[[{text:"Ghul",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".==[",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:"](",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"a",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:", ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"b",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:") ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"->",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"bool",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:7,startColumn:14,endLine:7,endColumn:14,text:"i: int",signature:"i: int",kindLabel:"local value",signatureLines:[[{text:"i",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:7,startColumn:16,endLine:7,endColumn:16,text:"Ghul.%(a: int, b: int) -> int",signature:"Ghul.%(a: int, b: int) -> int",kindLabel:"innate function arithmetic.rem",signatureLines:[[{text:"Ghul",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".%(",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"a",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:", ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"b",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:") ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"->",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:7,startColumn:20,endLine:7,endColumn:21,text:"Ghul.==[int](a: int, b: int) -> bool",signature:"Ghul.==[int](a: int, b: int) -> bool",kindLabel:"innate function compare.value",signatureLines:[[{text:"Ghul",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".==[",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:"](",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"a",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:", ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"b",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:") ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"->",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"bool",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:9,startColumn:14,endLine:9,endColumn:14,text:"i: int",signature:"i: int",kindLabel:"local value",signatureLines:[[{text:"i",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:9,startColumn:16,endLine:9,endColumn:16,text:"Ghul.%(a: int, b: int) -> int",signature:"Ghul.%(a: int, b: int) -> int",kindLabel:"innate function arithmetic.rem",signatureLines:[[{text:"Ghul",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".%(",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"a",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:", ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"b",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:") ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"->",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:9,startColumn:20,endLine:9,endColumn:21,text:"Ghul.==[int](a: int, b: int) -> bool",signature:"Ghul.==[int](a: int, b: int) -> bool",kindLabel:"innate function compare.value",signatureLines:[[{text:"Ghul",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".==[",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:"](",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"a",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:", ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"b",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:") ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"->",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"bool",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]},{startLine:12,startColumn:15,endLine:12,endColumn:15,text:"i: int",signature:"i: int",kindLabel:"local value",signatureLines:[[{text:"i",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:":",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"int",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}}]]}],B=[],m=[{startLine:1,startColumn:12,endLine:1,endColumn:21,tokenType:"function"},{startLine:3,startColumn:5,endLine:3,endColumn:5,tokenType:"variable",modifiers:"readonly"},{startLine:3,startColumn:11,endLine:3,endColumn:12,tokenType:"operator"},{startLine:4,startColumn:5,endLine:4,endColumn:14,tokenType:"method",modifiers:"static"},{startLine:5,startColumn:12,endLine:5,endColumn:12,tokenType:"variable",modifiers:"readonly"},{startLine:5,startColumn:14,endLine:5,endColumn:14,tokenType:"operator"},{startLine:5,startColumn:19,endLine:5,endColumn:20,tokenType:"operator"},{startLine:7,startColumn:14,endLine:7,endColumn:14,tokenType:"variable",modifiers:"readonly"},{startLine:7,startColumn:16,endLine:7,endColumn:16,tokenType:"operator"},{startLine:7,startColumn:20,endLine:7,endColumn:21,tokenType:"operator"},{startLine:9,startColumn:14,endLine:9,endColumn:14,tokenType:"variable",modifiers:"readonly"},{startLine:9,startColumn:16,endLine:9,endColumn:16,tokenType:"operator"},{startLine:9,startColumn:20,endLine:9,endColumn:21,tokenType:"operator"},{startLine:12,startColumn:15,endLine:12,endColumn:15,tokenType:"variable",modifiers:"readonly"}],E=[[{text:"use",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"IO",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"Std",style:{"--shiki-light":"#267F99","--shiki-dark":"#4EC9B0"}},{text:".",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"write_line",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}}],[],[{text:"for",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"i",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"in",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"1",style:{"--shiki-light":"#098658","--shiki-dark":"#B5CEA8"}},{text:"::",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:"100",style:{"--shiki-light":"#098658","--shiki-dark":"#B5CEA8"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"do",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}}],[{text:"    ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"write_line",style:{"--shiki-light":"#795E26","--shiki-dark":"#DCDCAA"}},{text:"(",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}}],[{text:"        ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"if",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"i",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:" % ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"15",style:{"--shiki-light":"#098658","--shiki-dark":"#B5CEA8"}},{text:" == ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"0",style:{"--shiki-light":"#098658","--shiki-dark":"#B5CEA8"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"then",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}}],[{text:"            ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:'"FizzBuzz"',style:{"--shiki-light":"#A31515","--shiki-dark":"#CE9178"}}],[{text:"        ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"elif",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"i",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:" % ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"3",style:{"--shiki-light":"#098658","--shiki-dark":"#B5CEA8"}},{text:" == ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"0",style:{"--shiki-light":"#098658","--shiki-dark":"#B5CEA8"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"then",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}}],[{text:"            ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:'"Fizz"',style:{"--shiki-light":"#A31515","--shiki-dark":"#CE9178"}}],[{text:"        ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"elif",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"i",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:" % ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"5",style:{"--shiki-light":"#098658","--shiki-dark":"#B5CEA8"}},{text:" == ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"0",style:{"--shiki-light":"#098658","--shiki-dark":"#B5CEA8"}},{text:" ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"then",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}}],[{text:"            ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:'"Buzz"',style:{"--shiki-light":"#A31515","--shiki-dark":"#CE9178"}}],[{text:"        ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"else",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}}],[{text:"            ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:'"',style:{"--shiki-light":"#A31515","--shiki-dark":"#CE9178"}},{text:"{",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:"i",style:{"--shiki-light":"#001080","--shiki-dark":"#9CDCFE"}},{text:"}",style:{"--shiki-light":"#0000FF","--shiki-dark":"#569CD6"}},{text:'"',style:{"--shiki-light":"#A31515","--shiki-dark":"#CE9178"}}],[{text:"        ",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}},{text:"fi",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}}],[{text:"    )",style:{"--shiki-light":"#000000","--shiki-dark":"#D4D4D4"}}],[{text:"od",style:{"--shiki-light":"#AF00DB","--shiki-dark":"#C586C0"}}]],L={name:d,snippet:D,code:g,fullSource:x,hiddenBefore:y,hiddenAfter:C,hiddenGapsAfterLine:o,output:F,diagnostics:u,hovers:z,inlayHints:B,semanticTokens:m,tokens:E},A=JSON.parse('{"title":"FizzBuzz","description":"","frontmatter":{"title":"FizzBuzz"},"headers":[],"relativePath":"rosetta/fizzbuzz.md","filePath":"rosetta/fizzbuzz.md"}'),c={name:"rosetta/fizzbuzz.md"},_=Object.assign(c,{setup(f){const h={"rosetta-fizzbuzz":L};return(b,i)=>{const k=t("RosettaTask"),l=t("GhulExample");return n(),a("div",null,[i[0]||(i[0]=s("h1",{id:"fizzbuzz",tabindex:"-1"},[r("FizzBuzz "),s("a",{class:"header-anchor",href:"#fizzbuzz","aria-label":'Permalink to "FizzBuzz"'},"​")],-1)),e(k,{url:"https://rosettacode.org/wiki/FizzBuzz"}),e(l,{name:"rosetta-fizzbuzz",data:h["rosetta-fizzbuzz"]},null,8,["data"])])}}});export{A as __pageData,_ as default};
