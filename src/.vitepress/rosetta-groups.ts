// How the Rosetta Code solutions are grouped on this site.
//
// Rosetta Code's own categories are not usable for this: they are inconsistently cased and
// spelled (`Recursion` and `recursion`, `String manipulation` and `String_manipulation`), a
// quarter of the tasks carry none at all, and some are one-offs naming a single task. So the
// grouping is ours, and it is editorial: it says what a solution is worth reading *for*, which
// is a different question from what the task is about.
//
// The corpus grows, so the groups are deliberately few and broad. Adding a task means adding its
// slug here; `npm run pull-rosetta` fails if a published task is not placed, so nothing can
// quietly fall off the end of the list.

export type RosettaGroup = {
  title: string
  blurb: string
  slugs: string[]
}

// Solutions that cannot be carried here, and why. Examples on this site are built against the
// same restricted reference set the browser playground uses, so a solution reaching outside it
// does not compile - and would not run in a reader's browser if it did. Being listed here is a
// statement about this site, not about the solution: each one is posted on Rosetta Code and
// tested in ghul-rosetta-code like any other.
const BIG_INTEGER =
  'uses System.Numerics.BigInteger, which is outside the reference set'

export const NOT_CARRIED: Record<string, string> = {
  'call-a-foreign-language-function':
    'calls a native function through System.Reflection.Emit, which is outside the reference set',
  multiton:
    'uses Tasks.Parallel, which is outside the reference set',
  'arbitrary-precision-integers': BIG_INTEGER,
  'bell-numbers': BIG_INTEGER,
  'isqrt-integer-square-root-of-x': BIG_INTEGER,
  'left-factorials': BIG_INTEGER,
  'prime-decomposition': BIG_INTEGER,
}

export const ROSETTA_GROUPS: RosettaGroup[] = [
  {
    title: 'starting out',
    blurb: 'Short programs, and the shapes every language has to have.',
    slugs: [
      '100-doors',
      'fizzbuzz',
      'hello-world-text',
      'factorial',
      'binary-digits',
      'towers-of-hanoi',
      'reverse-a-string',
      'arithmetic-mean',
      'quine',
    ],
  },
  {
    title: 'functions and closures',
    blurb:
      'Functions as values: passed, returned, captured, and calling themselves.',
    slugs: [
      'accumulator-factory',
      'first-class-functions',
      'closures-value-capture',
      'apply-a-callback-to-an-array',
      'variadic-function',
      'anonymous-recursion',
      'mutual-recursion',
      'man-or-boy-test',
      'y-combinator',
      'catamorphism',
      'church-numerals',
      'nested-function',
      'jensens-device',
      'cumulative-standard-deviation',
    ],
  },
  {
    title: 'types and pattern matching',
    blurb:
      'Unions, traits, generics and operators: modelling data and taking it apart again.',
    slugs: [
      'algebraic-data-types',
      'abstract-type',
      'ternary-logic',
      'arithmetic-evaluation',
      'multiple-distinct-objects',
      'quaternion',
      's-expressions',
      'null-object',
      'flatten-a-list',
      'queue-definition',
      'generic-swap',
    ],
  },
  {
    title: 'generators and laziness',
    blurb:
      'Sequences produced a value at a time, and consumers that stop when they have enough.',
    slugs: [
      'same-fringe',
      'amb',
      'look-and-say-sequence',
      'hailstone-sequence',
      'fibonacci-sequence',
      'van-eck-sequence',
      'tree-traversal',
      'intersecting-number-wheels',
      'kolakoski-sequence',
      'van-der-corput-sequence',
      'ordered-partitions',
      'balanced-brackets',
      'hamming-numbers',
      'calkin-wilf-sequence',
      'stern-brocot-sequence',
      'fusc-sequence',
      'ekg-sequence-convergence',
    ],
  },
  {
    title: 'numbers',
    blurb: 'Arithmetic, primes, and sequences with something to prove.',
    slugs: [
      'additive-primes',
      'almost-prime',
      'anti-primes',
      'achilles-numbers',
      'amicable-pairs',
      'sieve-of-eratosthenes',
      'greatest-common-divisor',
      'ackermann-function',
      'zeckendorf-number-representation',
      'roman-numerals-encode',
      'descending-primes',
      'semiprime',
      'sphenic-numbers',
      'taxicab-numbers',
      'negative-base-numbers',
      'gray-code',
      'haversine-formula',
      'map-range',
      'population-count',
      'numbers-with-equal-rises-and-falls',
      'benfords-law',
      'gapful-numbers',
      'iterated-digits-squaring',
      'juggler-sequence',
      'kaprekar-numbers',
      'ludic-numbers',
      'ormiston-pairs',
      'pernicious-numbers',
      'radical-of-an-integer',
      'truncatable-primes',
      'undulating-numbers',
    ],
  },
  {
    title: 'text',
    blurb: 'Reading, rewriting and comparing strings.',
    slugs: [
      'pangram-checker',
      'palindrome-detection',
      'camel-case-and-snake-case',
      'align-columns',
      'run-length-encoding',
      'levenshtein-distance',
      'abc-problem',
      'entropy',
      'jaro-similarity',
    ],
  },
  {
    title: 'collections and algorithms',
    blurb: 'Sorting, searching, and working over whole collections.',
    slugs: [
      'sorting-algorithms-quicksort',
      'power-set',
      'josephus-problem',
      'smith-waterman-algorithm',
      'huffman-coding',
      'forward-difference',
      'dinesmans-multiple-dwelling-problem',
      'water-collected-between-towers',
      'topswops',
      'non-continuous-subsequences',
      'damm-algorithm',
    ],
  },
]
