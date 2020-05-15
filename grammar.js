// @ts-nocheck
module.exports = grammar({
    name: 'datafun',
    rules: {
        source_file: $ => repeat($.block),
        block: $ => seq($.term, repeat(';')),
        term: $ => choice(
            'bool',
            'int',
        ),
        comprehension: $ => seq(
            '{',
            
            
            '}',
        ),
    },
});

