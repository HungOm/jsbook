(this.webpackJsonpjsbook=this.webpackJsonpjsbook||[]).push([[113],{286:function(o,n){!function(o){o.languages.django={comment:/^\{#[\s\S]*?#\}$/,tag:{pattern:/(^\{%[+-]?\s*)\w+/,lookbehind:!0,alias:"keyword"},delimiter:{pattern:/^\{[{%][+-]?|[+-]?[}%]\}$/,alias:"punctuation"},string:{pattern:/("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},filter:{pattern:/(\|)\w+/,lookbehind:!0,alias:"function"},test:{pattern:/(\bis\s+(?:not\s+)?)(?!not\b)\w+/,lookbehind:!0,alias:"function"},function:/\b[a-z_]\w+(?=\s*\()/i,keyword:/\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,number:/\b\d+(?:\.\d+)?\b/,boolean:/[Tt]rue|[Ff]alse|[Nn]one/,variable:/\b\w+?\b/,punctuation:/[{}[\](),.:;]/};var n=/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}|\{#[\s\S]*?#\}/g,e=o.languages["markup-templating"];o.hooks.add("before-tokenize",(function(o){e.buildPlaceholders(o,"django",n)})),o.hooks.add("after-tokenize",(function(o){e.tokenizePlaceholders(o,"django")})),o.languages.jinja2=o.languages.django,o.hooks.add("before-tokenize",(function(o){e.buildPlaceholders(o,"jinja2",n)})),o.hooks.add("after-tokenize",(function(o){e.tokenizePlaceholders(o,"jinja2")}))}(Prism)}}]);
//# sourceMappingURL=113.4bb466b6.chunk.js.map