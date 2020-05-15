// @ts-nocheck
module.exports = grammar({
    name: 'datafun',
    rules: {
        source_file: $ => repeat1($.block),
        block: $ => seq($.expr, repeat(';')),
        expr: $ => choice(
            $.var_name,
            $.comp,
            $.tuple,
        ),
        tuple: $ => seq(
            '(',
            optional($._ws),
            $.expr,
            optional($._ws),
            ',',
            optional($._ws),
            $.expr,
            optional($._ws),
            ')',
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
        _comprehension_block: $ => choice($.member, $.guard),
        comp: $ => seq(
            '{',
            optional($._ws),
            $.var_name,
            optional($._ws),
            '|',
            // optional($._ws),
            $._comprehension_block,
            // optional($._ws),
            // repeat(seq(optional($._ws), ',', optional($._ws), $.comprehension_block)),
            // optional($._ws),
            '}',
        ),
    },
});

