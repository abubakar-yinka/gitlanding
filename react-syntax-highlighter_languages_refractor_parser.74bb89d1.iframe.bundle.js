(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{1460:function(module,exports,__webpack_require__){"use strict";function parser(Prism){!function(Prism){var parser=Prism.languages.parser=Prism.languages.extend("markup",{keyword:{pattern:/(^|[^^])(?:\^(?:case|eval|for|if|switch|throw)\b|@(?:BASE|CLASS|GET(?:_DEFAULT)?|OPTIONS|SET_DEFAULT|USE)\b)/,lookbehind:!0},variable:{pattern:/(^|[^^])\B\$(?:\w+|(?=[.{]))(?:(?:\.|::?)\w+)*(?:\.|::?)?/,lookbehind:!0,inside:{punctuation:/\.|:+/}},function:{pattern:/(^|[^^])\B[@^]\w+(?:(?:\.|::?)\w+)*(?:\.|::?)?/,lookbehind:!0,inside:{keyword:{pattern:/(^@)(?:GET_|SET_)/,lookbehind:!0},punctuation:/\.|:+/}},escape:{pattern:/\^(?:[$^;@()\[\]{}"':]|#[a-f\d]*)/i,alias:"builtin"},punctuation:/[\[\](){};]/});parser=Prism.languages.insertBefore("parser","keyword",{"parser-comment":{pattern:/(\s)#.*/,lookbehind:!0,alias:"comment"},expression:{pattern:/(^|[^^])\((?:[^()]|\((?:[^()]|\((?:[^()])*\))*\))*\)/,greedy:!0,lookbehind:!0,inside:{string:{pattern:/(^|[^^])(["'])(?:(?!\2)[^^]|\^[\s\S])*\2/,lookbehind:!0},keyword:parser.keyword,variable:parser.variable,function:parser.function,boolean:/\b(?:true|false)\b/,number:/\b(?:0x[a-f\d]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/i,escape:parser.escape,operator:/[~+*\/\\%]|!(?:\|\|?|=)?|&&?|\|\|?|==|<[<=]?|>[>=]?|-[fd]?|\b(?:def|eq|ge|gt|in|is|le|lt|ne)\b/,punctuation:parser.punctuation}}}),parser=Prism.languages.insertBefore("inside","punctuation",{expression:parser.expression,keyword:parser.keyword,variable:parser.variable,function:parser.function,escape:parser.escape,"parser-punctuation":{pattern:parser.punctuation,alias:"punctuation"}},parser.tag.inside["attr-value"])}(Prism)}module.exports=parser,parser.displayName="parser",parser.aliases=[]}}]);