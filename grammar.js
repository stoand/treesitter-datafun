// @ts-nocheck
module.exports = grammar({
    name: 'datafun',
    rules: {
        source_file: $ => repeat1($.block),

        block: $ => seq($.expr, repeat(';')),
        
        expr: $ => choice(
            $.var_name,
            $.comprehension,
        ),
        var_name: $ => token(/[A-Za-z-_][A-Za-z-_0-9]*/),
        _ws: $ => repeat1(choice(' ', '\n')),
        member: $ => seq(
            $.expr,
            'in',
            $.expr,
        ),
        guard: $ => seq(
            'when',
            $._ws,
            $.expr,
        ),
        comprehension_block: $ => choice($.member, $.guard),
        comprehension: $ => seq(
            '{',
            // optional($._ws),
            'todo_val',
            // optional($._ws),
            '|',
            // optional($._ws),
            $.comprehension_block,
            // optional($._ws),
            // repeat(seq(optional($._ws), ',', optional($._ws), $.comprehension_block)),
            // optional($._ws),
            '}',
        ),
    },
});

