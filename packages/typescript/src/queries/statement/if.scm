;; if statements
;; if @condition @body @else
(if_statement
  condition: (parenthesized_expression) @condition
  consequence: (statement) @body
  alternative: (else_clause)? @else
) @if