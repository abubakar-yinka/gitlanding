(window.webpackJsonp=window.webpackJsonp||[]).push([[124],{1484:function(module,exports,__webpack_require__){"use strict";function sass(Prism){!function(Prism){Prism.languages.sass=Prism.languages.extend("css",{comment:{pattern:/^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,lookbehind:!0}}),Prism.languages.insertBefore("sass","atrule",{"atrule-line":{pattern:/^(?:[ \t]*)[@+=].+/m,inside:{atrule:/(?:@[\w-]+|[+=])/m}}}),delete Prism.languages.sass.atrule;var variable=/\$[-\w]+|#\{\$[-\w]+\}/,operator=[/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,{pattern:/(\s+)-(?=\s)/,lookbehind:!0}];Prism.languages.insertBefore("sass","property",{"variable-line":{pattern:/^[ \t]*\$.+/m,inside:{punctuation:/:/,variable:variable,operator:operator}},"property-line":{pattern:/^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,inside:{property:[/[^:\s]+(?=\s*:)/,{pattern:/(:)[^:\s]+/,lookbehind:!0}],punctuation:/:/,variable:variable,operator:operator,important:Prism.languages.sass.important}}}),delete Prism.languages.sass.property,delete Prism.languages.sass.important,Prism.languages.insertBefore("sass","punctuation",{selector:{pattern:/([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,lookbehind:!0}})}(Prism)}module.exports=sass,sass.displayName="sass",sass.aliases=[]}}]);