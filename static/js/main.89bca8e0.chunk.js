(this["webpackJsonporder-gen"]=this["webpackJsonporder-gen"]||[]).push([[0],{14:function(e,n,t){e.exports=t(29)},19:function(e,n,t){},26:function(e,n){},27:function(e,n){},28:function(e,n,t){},29:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(10),c=t.n(r),l=(t(19),t(6)),s=t.n(l),i=t(11),u=t(12),f=t(13),d=t(1),p=t.n(d);t(28);var v=function(){var e=Object(o.useState)([]),n=Object(f.a)(e,2),t=n[0],r=n[1],c=function(e){r((function(n){return[].concat(Object(u.a)(n),[e]).sort((function(e,n){return(""+e.\uc0c1\ud488\uba85).localeCompare(n.\uc0c1\ud488\uba85)}))}))},l=function(){var e=t,n=t.reduce((function(e,n){return e+parseInt(n.\uc8fc\ubb38\uc218\ub7c9)}),0);e.push({"\uc0c1\ud488\ucf54\ub4dc":"","\uc0c1\ud488\uba85":"","\uc8fc\ubb38\uc218\ub7c9":n});var o=p.a.utils.json_to_sheet(t),a=p.a.utils.book_new();p.a.utils.book_append_sheet(a,o,"\uc8fc\ubb38\uc11c");p.a.writeFile(a,"\uc8fc\ubb38\uc11c.xlsx")};return a.a.createElement("div",{className:"App"},a.a.createElement("div",{className:"dropHere",onDragEnter:function(e){console.log("\ud30c\uc77c \uac10\uc9c0"),e.preventDefault()},onDragLeave:function(e){console.log("\ud30c\uc77c \uc774\ud0c8 \uac10\uc9c0"),e.preventDefault()},onDragOver:function(e){console.log("\uc774\uac74\ubb50\uc9c0"),e.preventDefault()},onDrop:function(e){console.log("\ud30c\uc77c \uc785\ub825 \uac10\uc9c0");for(var n=e.dataTransfer.files,t=0;t<n.length;t++){console.log("\ud30c\uc77c \uc77d\uc74c");var o=n[t];console.log("".concat(o.type)),console.log("\ud30c\uc77c \uc885\ub958 \ud1b5\uacfc");var a=new FileReader;a.onload=function(){var e=Object(i.a)(s.a.mark((function e(n){var t,o,a,r,l,i,u,f,d;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=n.target.result,o=p.a.read(t,{type:"binary"}),a=o.SheetNames[0],r=o.Sheets[a],l=p.a.utils.sheet_to_json(r,{header:1}),i=21;i<l.length;i+=2)"\ud569\uacc4"!=l[i][0]&&(u=l[i][1],f=l[i][2],d=parseInt(l[i][5]),c({"\uc0c1\ud488\ucf54\ub4dc":u,"\uc0c1\ud488\uba85":f,"\uc8fc\ubb38\uc218\ub7c9":d}));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),a.readAsBinaryString(o)}window.scrollTo(0,0),e.preventDefault()}},t.length>0?"\ud30c\uc77c\uc744 \ucd94\uac00\ud558\uac70\ub098, \ub2e4\uc6b4\ub85c\ub4dc \ubc84\ud2bc\uc744 \ud074\ub9ad\ud558\uc138\uc694.":"\uc774 \uacf3\uc5d0 \ud30c\uc77c\uc744 \uc62c\ub824\ub193\uc73c\uc138\uc694.",t.length>0?a.a.createElement("button",{className:"download",onClick:l},"\ub2e4\uc6b4\ub85c\ub4dc"):void 0),a.a.createElement("div",{className:"background"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,n){}},[[14,1,2]]]);
//# sourceMappingURL=main.89bca8e0.chunk.js.map