(switch_statement
  value: (parenthesized_expression) @value
  body: (switch_body
    (switch_case
      value: (_) @condition
      body: (statement) @body
    )* @case
    (switch_default body: (statement)? @body)? @default
  )
) @switch