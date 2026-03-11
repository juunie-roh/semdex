;; class declaration
;; class @name<@type_params> @heritage @body
;; @heritage = impelents @target, @target, ... || extends @target<@type_args>, @target, ...
(class_declaration
  ;; decorator: (decorator)* @decorator
  name: (type_identifier) @name
  (class_heritage
    [
      (extends_clause
        type_arguments: (type_arguments (type) @type_args)?
        value: (expression) @extends_body) @extends
      (implements_clause (type) @implements)
    ]
  )? @heritage
  type_parameters: (type_parameters)? @type_params
  body: (class_body) @body
) @node
;; edge case using lexical declaration:
;; const/let @name = class<@type_params> @heritage @body
(lexical_declaration
  (variable_declarator
    name: (identifier) @name
    value: (class 
      !name
      ;; decorator: (decorator)* @decorator
      (class_heritage
        [
          (extends_clause
            type_arguments: (type_arguments (type) @type_args)?
            value: (expression) @extends_body) @extends
          (implements_clause (type) @implements)
        ]
      )? @heritage
      type_parameters: (type_parameters)? @type_params
      body: (class_body) @body
      ))
) @node