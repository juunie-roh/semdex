
;; abstract class declaration
;; abstract class @name<@type_params> @heritage @body
(abstract_class_declaration
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
;; no available edge case using lexical declaration