(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{1439:function(module,exports,__webpack_require__){"use strict";function lisp(Prism){!function(Prism){function simple_form(name){return RegExp("(\\()"+name+"(?=[\\s\\)])")}function primitive(pattern){return RegExp("([\\s([])"+pattern+"(?=[\\s)])")}var symbol="[-+*/_~!@$%^=<>{}\\w]+",par="(\\()",language={heading:{pattern:/;;;.*/,alias:["comment","title"]},comment:/;.*/,string:{pattern:/"(?:[^"\\]|\\.)*"/,greedy:!0,inside:{argument:/[-A-Z]+(?=[.,\s])/,symbol:RegExp("`"+symbol+"'")}},"quoted-symbol":{pattern:RegExp("#?'"+symbol),alias:["variable","symbol"]},"lisp-property":{pattern:RegExp(":"+symbol),alias:"property"},splice:{pattern:RegExp(",@?"+symbol),alias:["symbol","variable"]},keyword:[{pattern:RegExp(par+"(?:(?:lexical-)?let\\*?|(?:cl-)?letf|if|when|while|unless|cons|cl-loop|and|or|not|cond|setq|error|message|null|require|provide|use-package)(?=\\s)"),lookbehind:!0},{pattern:RegExp(par+"(?:for|do|collect|return|finally|append|concat|in|by)(?=\\s)"),lookbehind:!0}],declare:{pattern:simple_form("declare"),lookbehind:!0,alias:"keyword"},interactive:{pattern:simple_form("interactive"),lookbehind:!0,alias:"keyword"},boolean:{pattern:primitive("(?:t|nil)"),lookbehind:!0},number:{pattern:primitive("[-+]?\\d+(?:\\.\\d*)?"),lookbehind:!0},defvar:{pattern:RegExp(par+"def(?:var|const|custom|group)\\s+"+symbol),lookbehind:!0,inside:{keyword:/^def[a-z]+/,variable:RegExp(symbol)}},defun:{pattern:RegExp(par+"(?:cl-)?(?:defun\\*?|defmacro)\\s+"+symbol+"\\s+\\([\\s\\S]*?\\)"),lookbehind:!0,inside:{keyword:/^(?:cl-)?def\S+/,arguments:null,function:{pattern:RegExp("(^\\s)"+symbol),lookbehind:!0},punctuation:/[()]/}},lambda:{pattern:RegExp(par+"lambda\\s+\\((?:&?"+symbol+"\\s*)*\\)"),lookbehind:!0,inside:{keyword:/^lambda/,arguments:null,punctuation:/[()]/}},car:{pattern:RegExp(par+symbol),lookbehind:!0},punctuation:[/(['`,]?\(|[)\[\]])/,{pattern:/(\s)\.(?=\s)/,lookbehind:!0}]},arg={"lisp-marker":RegExp("&[-+*/_~!@$%^=<>{}\\w]+"),rest:{argument:{pattern:RegExp(symbol),alias:"variable"},varform:{pattern:RegExp(par+symbol+"\\s+\\S[\\s\\S]*(?=\\))"),lookbehind:!0,inside:{string:language.string,boolean:language.boolean,number:language.number,symbol:language.symbol,punctuation:/[()]/}}}},forms="\\S+(?:\\s+\\S+)*",arglist={pattern:RegExp(par+"[\\s\\S]*(?=\\))"),lookbehind:!0,inside:{"rest-vars":{pattern:RegExp("&(?:rest|body)\\s+"+forms),inside:arg},"other-marker-vars":{pattern:RegExp("&(?:optional|aux)\\s+"+forms),inside:arg},keys:{pattern:RegExp("&key\\s+"+forms+"(?:\\s+&allow-other-keys)?"),inside:arg},argument:{pattern:RegExp(symbol),alias:"variable"},punctuation:/[()]/}};language.lambda.inside.arguments=arglist,language.defun.inside.arguments=Prism.util.clone(arglist),language.defun.inside.arguments.inside.sublist=arglist,Prism.languages.lisp=language,Prism.languages.elisp=language,Prism.languages.emacs=language,Prism.languages["emacs-lisp"]=language}(Prism)}module.exports=lisp,lisp.displayName="lisp",lisp.aliases=[]}}]);