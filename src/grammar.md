
```bnf
<identifier> ::= <normal-identifier> | <special-identifier>

<normal-identifier> ::= <letter>{<letter-or-digit>}
<letter> ::= 'a' | ... | 'z' | 'A' | ... | 'Z' | '_'
<letter-or-digit> ::= <letter> | <digit>
<digit> ::= '0' | ... | '9'

<special-identifier> ::= <back-tick-special> | <generic-bracket>
<back-tick-special> ::= '`' <special-identifier-body> '`'
<special-identifier-body> ::= <special-identifier-char>{<special-identifier-char>}
<special-identifier-char> ::= <letter> | <digit> | '_' | <operator-char> | <symbol-char>
<operator-char> ::= '!' | '$' | '%' | '^' | '&' | '*' | '-' | '+' | '=' | '|' | ':' | '@' | '~' | '#' | '\\' | '<' | '>' | '.' | '?' | '/'
<symbol-char> ::= <any character that System.Char.IsSymbol() returns true for>

<generic-bracket> ::= '`['
```



```bnf
<numeric-literal> ::= <integer-literal> | <float-literal>

<integer-literal> ::= <decimal-literal> | <hex-literal>
<decimal-literal> ::= <decimal-digit>{<decimal-digit | '_'>}<integer-type-suffix>?
<hex-literal> ::= ('0x' | '0X') <hex-digit>{<hex-digit | '_'>}<integer-type-suffix>?
<integer-type-suffix> ::= <type-suffix-character>{<type-suffix-character>}
<type-suffix-character> ::= 'b' | 'B' | 'c' | 'C' | 's' | 'S' | 'i' | 'I' | 'l' | 'L' | 'w' | 'W' | 'u' | 'U'
<decimal-digit> ::= '0' | ... | '9'
<hex-digit> ::= <decimal-digit> | 'A' | ... | 'F' | 'a' | ... | 'f'

<float-literal> ::= <decimal-float> <float-exponent>? <float-type-suffix>?
<decimal-float> ::= <decimal-digit>{<decimal-digit | '_'>} '.' {<decimal-digit | '_'>}
<float-exponent> ::= ('e' | 'E') ('-'?) <decimal-digit>{<decimal-digit | '_'>}
<float-type-suffix> ::= 's' | 'S' | 'd' | 'D' | 'f' | 'F'
```


```bnf
<string_literal> ::= '"' <string_chars> '"'
<string_chars>   ::= <string_char> | <string_char> <string_chars>
<string_char>    ::= <normal_char> | <escape_sequence>
<normal_char>    ::= any character except '"' or '\n' or '\'
<escape_sequence> ::= '\' <escape_char>
<escape_char>    ::= 't' | 'n' | 'r' | '\\' | <octal_sequence> | <any other character>
<octal_sequence> ::= <octal_digit> | <octal_digit> <octal_sequence>
<octal_digit>    ::= '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7'
```