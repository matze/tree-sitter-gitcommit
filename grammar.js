module.exports = grammar({
  name: 'gitcommit',

  rules: {
    source_file: $ => seq(
      $.head,
      repeat(
        choice(
          $.body,
          $.comment
        )
      )
    ),

    head: $ => choice(
      seq(
        $.summary,
        choice(
          $.summary_overflow,
          $.empty
        ),
        $.second_line
      ),
      $.empty
    ),

    empty: $ => /\n/,

    summary: $ => /[^\n]{1,50}/,

    summary_overflow: $ => /[^\n]+/,

    second_line: $ => choice(
        $.illegal,
        $.newlines
    ),

    newlines: $ => /\n\n*/,

    illegal: $ => /[^\n]+\n/,

    body: $ => /[^#]*\n/,

    comment: $ => /#.*\n/
  }
});
