;; methods

;; @doc
;; @modifier @is_static @name<@type_params>(@params): @return_type @body
(
  (comment)* @doc
  .
  (method_definition
    [(accessibility_modifier) (override_modifier)]? @modifier
    ("static")? @static
    name: (_) @name
    type_parameters: (type_parameters)? @type_params
    parameters: (formal_parameters) @params
    return_type: (type_annotation)? @return_type
    body: (statement_block) @body
    (#not-match? @name "^(constructor)$")
  )? @method
)

;; arrow function / function expression methods

;; @doc
;; @modifier @is_static @name = <@type_params>(@params): @return_type => @body
(
  (comment)* @doc
  .
  (public_field_definition
    [(accessibility_modifier) (override_modifier)]? @modifier
    ("static")? @is_static
    name: (property_identifier) @name
    value: [
      (arrow_function
        type_parameters: (type_parameters)? @type_params
        parameters: [(formal_parameters) (identifier)] @params
        return_type: (type_annotation)? @return_type
        body: (_) @body)
      (function_expression
        type_parameters: (type_parameters)? @type_params
        parameters: (formal_parameters) @params
        return_type: (type_annotation)? @return_type
        body: (statement_block) @body)
    ]
  )? @method
)

;; field
;; @modifier @is_static @name: @type = @value;
(public_field_definition
  [
    (accessibility_modifier)
    (override_modifier)
  ]? @modifier
  ("static")? @is_static
  name: (_) @name
  (type_annotation)? @type
  value: (_)? @value ;; filter out function_expression and arrow_expression types
)? @field
