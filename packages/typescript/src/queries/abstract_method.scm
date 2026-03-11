;; abstract method definitions
;; abstract @name@params: @return_type
(abstract_method_signature
  (accessibility_modifier)? @modifier
  "abstract"
  name: (property_identifier) @name
  type_parameters: (type_parameters)? @type_params
  parameters: (formal_parameters) @params
  return_type: (type_annotation (_) @return_type)
) @node

;; abstract @name: @params => @return_type
(public_field_definition
  (accessibility_modifier)? @modifier
  "abstract"
  name: (property_identifier) @name
  type: (type_annotation
          (function_type
            type_parameters: (type_parameters)? @type_params
            parameters: (formal_parameters) @params
            return_type: (_) @return_type))
) @node