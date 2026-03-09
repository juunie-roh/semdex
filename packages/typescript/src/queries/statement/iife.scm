;; Immediately Invoked Function Expression (IIFE) statements
;; (function () {})();
;; (() => {})();
(expression_statement
  (call_expression
    function: (parenthesized_expression) @iife
  )
)