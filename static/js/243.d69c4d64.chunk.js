(this.webpackJsonpjsbook=this.webpackJsonpjsbook||[]).push([[243],{416:function(t,n){!function(t){var n=t.util.clone(t.languages.javascript),e="(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})";function a(t,n){return t=t.replace(/<S>/g,(function(){return"(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)"})).replace(/<BRACES>/g,(function(){return"(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})"})).replace(/<SPREAD>/g,(function(){return e})),RegExp(t,n)}e=a(e).source,t.languages.jsx=t.languages.extend("markup",n),t.languages.jsx.tag.pattern=a("</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:\"(?:\\\\[^]|[^\\\\\"])*\"|'(?:\\\\[^]|[^\\\\'])*'|[^\\s{'\"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>"),t.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/i,t.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/i,t.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,t.languages.jsx.tag.inside.comment=n.comment,t.languages.insertBefore("inside","attr-name",{spread:{pattern:a("<SPREAD>"),inside:t.languages.jsx}},t.languages.jsx.tag),t.languages.insertBefore("inside","special-attr",{script:{pattern:a("=<BRACES>"),inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:t.languages.jsx},alias:"language-javascript"}},t.languages.jsx.tag);var s=function t(n){return n?"string"==typeof n?n:"string"==typeof n.content?n.content:n.content.map(t).join(""):""},g=function n(e){for(var a=[],g=0;g<e.length;g++){var o=e[g],i=!1;if("string"!=typeof o&&("tag"===o.type&&o.content[0]&&"tag"===o.content[0].type?"</"===o.content[0].content[0].content?0<a.length&&a[a.length-1].tagName===s(o.content[0].content[1])&&a.pop():"/>"===o.content[o.content.length-1].content||a.push({tagName:s(o.content[0].content[1]),openedBraces:0}):0<a.length&&"punctuation"===o.type&&"{"===o.content?a[a.length-1].openedBraces++:0<a.length&&0<a[a.length-1].openedBraces&&"punctuation"===o.type&&"}"===o.content?a[a.length-1].openedBraces--:i=!0),(i||"string"==typeof o)&&0<a.length&&0===a[a.length-1].openedBraces){var c=s(o);g<e.length-1&&("string"==typeof e[g+1]||"plain-text"===e[g+1].type)&&(c+=s(e[g+1]),e.splice(g+1,1)),0<g&&("string"==typeof e[g-1]||"plain-text"===e[g-1].type)&&(c=s(e[g-1])+c,e.splice(g-1,1),g--),e[g]=new t.Token("plain-text",c,null,c)}o.content&&"string"!=typeof o.content&&n(o.content)}};t.hooks.add("after-tokenize",(function(t){"jsx"!==t.language&&"tsx"!==t.language||g(t.tokens)}))}(Prism)}}]);
//# sourceMappingURL=243.d69c4d64.chunk.js.map