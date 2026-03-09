;; function declaration

;; @doc
;; function @name<@type_params>(@params): @return_type @body

;; @doc
;; function* @name<@type_params>(@params): @return_type @body
(
  (comment)* @doc
  .
  [
    (function_expression
      name: (identifier) @name
      type_parameters: (type_parameters)? @type_params
      parameters: (formal_parameters) @params
      return_type: (type_annotation (_) @return_type)?
      body: (statement_block) @body)
    (function_declaration
      name: (identifier) @name
      type_parameters: (type_parameters)? @type_params
      parameters: (formal_parameters) @params
      return_type: (type_annotation (_) @return_type)?
      body: (statement_block) @body)
    (generator_function
      name: (identifier) @name
      type_parameters: (type_parameters)? @type_params
      parameters: (formal_parameters) @params
      return_type: (type_annotation (_) @return_type)?
      body: (statement_block) @body)
    (generator_function_declaration
      name: (identifier) @name
      type_parameters: (type_parameters)? @type_params
      parameters: (formal_parameters) @params
      return_type: (type_annotation (_) @return_type)?
      body: (statement_block) @body)
  ] @function
  ;; (#strip! @doc "^[\\s\\*/]+|^[\\s\\*/]$")
  ;; (#select-adjacent! @doc @function)
)

;; arrow function / function expression

;; @doc
;; const/let @name = (@params) => @body

;; @doc
;; const/let @name = function (@params) @body
(
  (comment)* @doc
  .
  (lexical_declaration
    (variable_declarator
      name: (identifier) @name
      value: [
        (arrow_function
          parameters: [(formal_parameters) (identifier)] @params
          body: (_) @body)
        (function_expression
          parameters: (formal_parameters) @params
          body: (statement_block) @body)
      ]) @function)
  ;; (#strip! @doc "^[\\s\\*/]+|^[\\s\\*/]$")
  ;; (#select-adjacent! @doc @function)
)

;; assignment_function
(assignment_expression
  left: [
    (identifier) @name
    (member_expression
      property: (property_identifier) @name)
  ]
  right: [
    (arrow_function
      parameters: [(formal_parameters) (identifier)] @params
      body: (_) @body)
    (function_expression
      parameters: (formal_parameters) @params
      body: (statement_block) @body)
  ]
) @function