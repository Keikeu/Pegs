(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){e.exports=a(262)},105:function(e,t,a){},262:function(e,t,a){"use strict";a.r(t);var n=a(99),l=a(18),r=a(19),i=a(21),s=a(20),o=a(22),c=a(0),u=a.n(c),m=a(16),h=a.n(m),d=(a(105),{"-1":"",0:"peg peg-blank",1:"peg peg-alive",2:"peg peg-highlighted",3:"peg peg-active"}),g=function(e){var t=e.value,a=e.onClick;return u.a.createElement("div",{className:d[t],onClick:a})},p=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(r.a)(t,[{key:"renderPeg",value:function(e){var t=this;return u.a.createElement(g,{key:e,value:this.props.pegs[Math.floor(e/this.props.width)][e%this.props.height],onClick:function(){return t.props.onClick(Math.floor(e/t.props.width),e%t.props.height)}})}},{key:"render",value:function(){for(var e=[],t=0;t<this.props.width*this.props.height;t++)e.push(this.renderPeg(t));return u.a.createElement("div",{className:"board "+this.props.boardType},e)}}]),t}(u.a.Component),f=a(87),b=a.n(f),v=a(88),E=a.n(v),N=a(5),y=a.n(N),k=a(29),C=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).canvasRef=u.a.createRef(),a.width=window.innerWidth||1440,a.height=window.innerHeight||900,a.count=Math.floor((a.width+a.height)/10),a.flakes=[];for(var n=0;n<a.count;n++)a.flakes.push({x:Math.random()*a.width,y:Math.random()*a.height,r:1+5*Math.random(),o:.2+1.4*Math.random()});return a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentDidUpdate",value:function(){var e=this,t=this.props.angle,a=this.width,n=this.height,l=this.flakes,r=this.canvasRef.current.getContext("2d");l.forEach(function(n){n.y+=.5*(n.o+n.r),n.x+=Math.sin(t+100*n.r),n.y>e.height&&(n.y=-10,n.x=Math.random()*a)}),r.save(),r.beginPath(),r.clearRect(0,0,a,n),l.forEach(function(e){r.fillStyle="rgba(255, 255, 255, "+e.o+")",r.beginPath(),r.moveTo(e.x,e.y),r.arc(e.x,e.y,e.r,0,2*Math.PI),r.fill()})}},{key:"render",value:function(){return u.a.createElement("canvas",{className:"snow-container",width:this.width,height:this.height,ref:this.canvasRef})}}]),t}(u.a.Component),w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).state={angle:0},a.updateAnimationState=a.updateAnimationState.bind(Object(k.a)(Object(k.a)(a))),a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.raf=requestAnimationFrame(this.updateAnimationState)}},{key:"updateAnimationState",value:function(){this.setState(function(e){return{angle:e.angle+.01}}),this.raf=requestAnimationFrame(this.updateAnimationState)}},{key:"componentWillUnmount",value:function(){cancelAnimationFrame(this.raf)}},{key:"render",value:function(){return u.a.createElement(C,{angle:this.state.angle})}}]),t}(u.a.Component),M=function(e){var t=e.theme,a=e.audio,n=e.toggleAudio;return u.a.createElement("div",null,"christmas"===t&&u.a.createElement("div",null,a&&u.a.createElement(u.a.Fragment,null,u.a.createElement("audio",{autoPlay:!0,loop:!0,src:b.a,type:"audio/mpeg"}),u.a.createElement(y.a,{className:"audio-btn",onClick:function(){return n()}},u.a.createElement("i",{className:"material-icons"},"volume_up"))),!a&&u.a.createElement(y.a,{className:"audio-btn",onClick:function(){return n()}},u.a.createElement("i",{className:"material-icons"},"volume_off")),u.a.createElement(w,null),u.a.createElement("svg",{className:"ground",width:"100%",height:"100%",viewBox:"0 0 100 100",preserveAspectRatio:"none"},u.a.createElement("defs",null,u.a.createElement("linearGradient",{id:"gradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%"},u.a.createElement("stop",{offset:"0%",stopColor:"#ffffff"}),u.a.createElement("stop",{offset:"100%",stopColor:"#8fa5b3"}))),u.a.createElement("path",{d:"M -40 100 Q 10 -70 60 100 ",fill:"url(#gradient)"}),u.a.createElement("path",{d:"M 15 100 Q 80 -100 120 100 ",fill:"url(#gradient)"}))),"vaporwave"===t&&u.a.createElement("div",null,a&&u.a.createElement(u.a.Fragment,null,u.a.createElement("audio",{autoPlay:!0,loop:!0,src:E.a,type:"audio/mpeg"}),u.a.createElement(y.a,{className:"audio-btn",onClick:function(){return n()}},u.a.createElement("i",{className:"material-icons"},"volume_up"))),!a&&u.a.createElement(y.a,{className:"audio-btn",onClick:function(){return n()}},u.a.createElement("i",{className:"material-icons"},"volume_off"))))},S=function(e){var t=e.stepNumber,a=e.pegsNumber,n=e.boardType,l=localStorage.getItem("best-score-moves-"+n),r=localStorage.getItem("best-score-pegs-"+n);return u.a.createElement("div",{className:"score"},u.a.createElement("div",null,"Moves: ",Math.floor(t/2)),u.a.createElement("div",null,"Pegs left: ",a),u.a.createElement("div",null,"Best score for this board:",l&&u.a.createElement("span",null," ",l," moves "),!l&&u.a.createElement("span",null," - "),"/",r>1&&u.a.createElement("span",null," ",r," pegs left "),"1"===r&&u.a.createElement("span",null," ",r," peg left "),!r&&u.a.createElement("span",null," - ")))},P=function(e){var t=e.jumpTo,a=e.toggleBoardsModal,n=e.toggleRulesModal,l=e.pegsActive,r=e.stepNumber;return u.a.createElement("div",{className:"options"},u.a.createElement(y.a,{className:"options__btn",onClick:function(){return t(0===l.length?r-2:r-1)}},u.a.createElement("i",{className:"material-icons"},"keyboard_backspace"),"Undo"),u.a.createElement(y.a,{className:"options__btn",onClick:function(){return t(0)}},u.a.createElement("i",{className:"material-icons"},"replay"),"Restart"),u.a.createElement(y.a,{className:"options__btn",onClick:function(){return a()}},u.a.createElement("i",{className:"material-icons"},"image_aspect_ratio"),"Other boards"),u.a.createElement(y.a,{className:"options__btn",onClick:function(){return n()}},u.a.createElement("i",{className:"material-icons"},"help_outline"),"How to play"))},T=a(90),O=a.n(T),j=a(36),x=a.n(j),A=function(e){var t=e.changeTheme,a=e.theme;return u.a.createElement("div",{className:"theme-select"},u.a.createElement("span",null,"Theme:"),u.a.createElement(O.a,{onChange:t,value:a,className:"select"},u.a.createElement(x.a,{value:"default"},"Default"),u.a.createElement(x.a,{value:"christmas"},"Christmas"),u.a.createElement(x.a,{value:"vaporwave"},"Vaporwave")))},I=a(91),_=a.n(I),R=function(e){var t=e.onClose;return u.a.createElement("div",null,u.a.createElement("div",{className:"dialog-container",onClick:t}),u.a.createElement("div",{className:"dialog"},u.a.createElement("h2",null,"How to play"),u.a.createElement(y.a,{className:"close-btn",onClick:t},u.a.createElement("i",{className:"material-icons"},"close")),u.a.createElement("p",null,"Remove as many pegs as you can."),u.a.createElement("p",null,"To remove a peg, jump over it with an adjacent peg and land in an empty spot."),u.a.createElement("img",{src:_.a,alt:"rules",className:"rules"})))},B=function(e){var t=e.value,a=e.stepNumber,n=e.pegsNumber,l=e.onClose,r=e.onClick;return null===t?null:"defeat"===t?u.a.createElement("div",null,u.a.createElement("div",{className:"dialog-container",onClick:l}),u.a.createElement("div",{className:"dialog dialog--defeat"},u.a.createElement(y.a,{className:"close-btn",onClick:l},u.a.createElement("i",{className:"material-icons"},"close")),u.a.createElement("i",{className:"material-icons"},"sentiment_very_dissatisfied"),u.a.createElement("h2",null,"You lost"),u.a.createElement("p",null,"Moves: ",Math.floor(a/2)),u.a.createElement("p",null,"Pegs left: ",n),u.a.createElement("p",null,u.a.createElement("br",null),"Better luck next time!",u.a.createElement("br",null),u.a.createElement("br",null)),u.a.createElement(y.a,{variant:"outlined",onClick:r},"Try again"))):"part-win"===t?u.a.createElement("div",null,u.a.createElement("div",{className:"dialog-container",onClick:l}),u.a.createElement("div",{className:"dialog dialog--win"},u.a.createElement(y.a,{className:"close-btn",onClick:l},u.a.createElement("i",{className:"material-icons"},"close")),u.a.createElement("i",{className:"material-icons"},"sentiment_satisfied_alt"),u.a.createElement("h2",null,"Almost there!"),u.a.createElement("p",null,"Moves: ",Math.floor(a/2)),u.a.createElement("p",null,"Pegs left: ",n),u.a.createElement("p",null,u.a.createElement("br",null),"There's only one peg left on the board but it's not in the right place (the one that's empty at the beginning). You can do better!",u.a.createElement("br",null),u.a.createElement("br",null)),u.a.createElement(y.a,{variant:"outlined",onClick:r},"Play again"))):"full-win"===t?u.a.createElement("div",null,u.a.createElement("div",{className:"dialog-container",onClick:l}),u.a.createElement("div",{className:"dialog dialog--win"},u.a.createElement(y.a,{className:"close-btn",onClick:l},u.a.createElement("i",{className:"material-icons"},"close")),u.a.createElement("i",{className:"material-icons"},"sentiment_very_satisfied"),u.a.createElement("h2",null,"Wow! You did it!"),u.a.createElement("p",null,"Moves: ",Math.floor(a/2)),u.a.createElement("p",null,"Pegs left: ",n),u.a.createElement("p",null,u.a.createElement("br",null),"Amazing job, you should be proud of yourself.",u.a.createElement("br",null),u.a.createElement("br",null)),u.a.createElement(y.a,{variant:"outlined",onClick:r},"Play again"))):void 0},F=a(92),q=a.n(F),D=a(93),H=a.n(D),G=a(94),U=a.n(G),W=a(95),Y=a.n(W),J=a(96),Q=a.n(J),z=a(97),V=a.n(z),K=a(98),L=a.n(K),X=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(s.a)(t).call(this))).slideTo=function(t){return e.setState({currentIndex:t})},e.onSlideChanged=function(t){return e.setState({currentIndex:t.item})},e.slideNext=function(){return e.setState({currentIndex:e.state.currentIndex+1})},e.slidePrev=function(){return e.setState({currentIndex:e.state.currentIndex-1})},e.state={currentIndex:0,items:[H.a,V.a,Q.a,U.a,L.a,Y.a],itemsNames:["Tutorial","English","German","Asymmetrical","Square","Diamond"]},e}return Object(o.a)(t,e),Object(r.a)(t,[{key:"renderGallery",value:function(){var e=this.state,t=e.currentIndex,a=e.items,n=e.itemsNames;return u.a.createElement(q.a,{fadeOutAnimation:!0,dotsDisabled:!0,buttonsDisabled:!0,slideToIndex:t,startIndex:t,onSlideChanged:this.onSlideChanged},a.map(function(e,t){return u.a.createElement("div",{key:n[t]},u.a.createElement("h3",null,n[t]),u.a.createElement("img",{className:"board-img",src:e,alt:n[t]}))}))}},{key:"render",value:function(){var e=this;return u.a.createElement("div",null,u.a.createElement("div",{className:"dialog-container",onClick:this.props.onClose}),u.a.createElement("div",{className:"dialog"},u.a.createElement("h2",null,"Play on a different board"),u.a.createElement(y.a,{className:"close-btn",onClick:this.props.onClose},u.a.createElement("i",{className:"material-icons"},"close")),u.a.createElement(y.a,{className:"carousel-btn",onClick:function(){return e.slidePrev()}},u.a.createElement("i",{className:"material-icons"},"chevron_left")),u.a.createElement(y.a,{className:"carousel-btn",onClick:function(){return e.slideNext()}},u.a.createElement("i",{className:"material-icons"},"chevron_right")),this.renderGallery(),u.a.createElement(y.a,{className:"play-btn",variant:"contained",onClick:function(){return e.props.onClick(e.state.currentIndex)}},"Play")))}}]),t}(u.a.Component),Z=[{boardType:"tutorial",height:4,width:4,defaultPegsNumber:5,history:[{pegs:[[0,0,1,1],[0,1,1,-1],[1,-1,-1,-1],[-1,-1,-1,-1]]}]},{boardType:"english",height:7,width:7,defaultPegsNumber:32,history:[{pegs:[[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1],[1,1,1,1,1,1,1],[1,1,1,0,1,1,1],[1,1,1,1,1,1,1],[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1]]}]},{boardType:"german",height:9,width:9,defaultPegsNumber:44,history:[{pegs:[[-1,-1,-1,1,1,1,-1,-1,-1],[-1,-1,-1,1,1,1,-1,-1,-1],[-1,-1,-1,1,1,1,-1,-1,-1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,0,1,1,1,1],[1,1,1,1,1,1,1,1,1],[-1,-1,-1,1,1,1,-1,-1,-1],[-1,-1,-1,1,1,1,-1,-1,-1],[-1,-1,-1,1,1,1,-1,-1,-1]]}]},{boardType:"asymmetrical",height:8,width:8,defaultPegsNumber:38,history:[{pegs:[[-1,-1,1,1,1,-1,-1,-1],[-1,-1,1,1,1,-1,-1,-1],[-1,-1,1,1,1,-1,-1,-1],[1,1,1,1,1,1,1,1],[1,1,1,0,1,1,1,1],[1,1,1,1,1,1,1,1],[-1,-1,1,1,1,-1,-1,-1],[-1,-1,1,1,1,-1,-1,-1]]}]},{boardType:"square",height:6,width:6,defaultPegsNumber:35,history:[{pegs:[[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,0,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1]]}]},{boardType:"diamond",height:9,width:9,defaultPegsNumber:40,history:[{pegs:[[-1,-1,-1,-1,1,-1,-1,-1,-1],[-1,-1,-1,1,1,1,-1,-1,-1],[-1,-1,1,1,1,1,1,-1,-1],[-1,1,1,1,1,1,1,1,-1],[1,1,1,1,0,1,1,1,1],[-1,1,1,1,1,1,1,1,-1],[-1,-1,1,1,1,1,1,-1,-1],[-1,-1,-1,1,1,1,-1,-1,-1],[-1,-1,-1,-1,1,-1,-1,-1,-1]]}]}],$=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).changeTheme=function(e){a.setState({theme:e.target.value}),localStorage.setItem("theme",e.target.value)};var n=localStorage.getItem("board")||0;return a.state={rulesModalOpen:"0"===localStorage.getItem("board"),boardsModalOpen:!1,audio:!1,boardType:Z[n].boardType,history:Z[n].history,height:Z[n].height,width:Z[n].width,pegsNumber:Z[n].defaultPegsNumber,defaultPegsNumber:Z[n].defaultPegsNumber,gameState:null,stepNumber:0,theme:localStorage.getItem("theme")||"default"},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"changeBoard",value:function(e){this.setState({rulesModalOpen:!1,boardsModalOpen:!1,boardType:Z[e].boardType,history:Z[e].history,height:Z[e].height,width:Z[e].width,pegsNumber:Z[e].defaultPegsNumber,defaultPegsNumber:Z[e].defaultPegsNumber,gameState:null,stepNumber:0}),localStorage.setItem("board",e)}},{key:"toggleRulesModal",value:function(){this.setState({rulesModalOpen:!this.state.rulesModalOpen})}},{key:"toggleBoardsModal",value:function(){this.setState({boardsModalOpen:!this.state.boardsModalOpen})}},{key:"toggleAudio",value:function(){this.setState({audio:!this.state.audio})}},{key:"jumpTo",value:function(e){e<0||this.setState({stepNumber:e,history:this.state.history.slice(0,this.state.stepNumber+1),pegsNumber:this.state.defaultPegsNumber-Math.floor(e/2),gameState:null})}},{key:"findPegsActive",value:function(e){for(var t=[],a=this.state,n=a.width,l=a.height,r=0;r<l;r++)for(var i=0;i<n;i++)3===e[r][i]&&t.push([r,i]);return t}},{key:"findHolesActive",value:function(e){for(var t=[],a=this.state,n=a.width,l=a.height,r=0;r<l;r++)for(var i=0;i<n;i++)2===e[r][i]&&t.push([r,i]);return t}},{key:"findPegsToMove",value:function(e){for(var t=[],a=this.state,n=a.width,l=a.height,r=0;r<l;r++)for(var i=0;i<n;i++)1===e[r][i]&&(r-2>=0&&1===e[r-1][i]&&(0===e[r-2][i]||2===e[r-2][i])||r+2<=l-1&&1===e[r+1][i]&&(0===e[r+2][i]||2===e[r+2][i])||i-2>=0&&1===e[r][i-1]&&(0===e[r][i-2]||2===e[r][i-2])||i+2<=n-1&&1===e[r][i+1]&&(0===e[r][i+2]||2===e[r][i+2]))&&t.push([r,i]);return t}},{key:"findHolesToFill",value:function(e,t,a){var n=[],l=this.state,r=l.width,i=l.height;return t-2>=0&&1===e[t-1][a]&&0===e[t-2][a]&&n.push([t-2,a]),t+2<=i-1&&1===e[t+1][a]&&0===e[t+2][a]&&n.push([t+2,a]),a-2>=0&&1===e[t][a-1]&&0===e[t][a-2]&&n.push([t,a-2]),a+2<=r-1&&1===e[t][a+1]&&0===e[t][a+2]&&n.push([t,a+2]),n}},{key:"deleteTheMiddlePeg",value:function(e,t,a,n){return e>a[0][0]?n[e-1][t]=0:e<a[0][0]?n[e+1][t]=0:t>a[0][1]?n[e][t-1]=0:n[e][t+1]=0,n}},{key:"handlePegClick",value:function(e,t){var a=this,l=this.state,r=l.pegsNumber,i=l.stepNumber,s=l.boardType,o=this.state.history.slice(0,this.state.stepNumber+1),c=o[this.state.stepNumber].pegs.map(function(e){return Object(n.a)({},e)}),u=this.findPegsToMove(c),m=this.findHolesToFill(c,e,t),h=this.findPegsActive(c);if(!h.length&&ee(u,[e,t])){for(var d=0;d<m.length;d++)c[m[d][0]][m[d][1]]=2;c[e][t]=3,this.setState({history:o.concat([{pegs:c}]),stepNumber:o.length})}else if(2===c[e][t]){for(var g,p,f=0;f<this.state.height;f++)for(var b=0;b<this.state.width;b++)3===c[f][b]?(c[f][b]=0,c[e][t]=1,g=f,p=b):2===c[f][b]&&(c[f][b]=0);this.setState({history:o.concat([{pegs:this.deleteTheMiddlePeg(g,p,[[e,t]],c)}]),stepNumber:o.length,pegsNumber:r-1},function(){setTimeout(function(){a.setState({gameState:te(r-1,a.findPegsToMove(c),a.findPegsActive(c),c,s,i+1)})},500)})}else ee(h,[e,t])?this.jumpTo(i-1):h.length&&ee(u,[e,t])&&this.setState({stepNumber:i-1,history:this.state.history.slice(0,i+1),pegsNumber:this.state.defaultPegsNumber-Math.floor((i-1)/2),gameState:null},function(){a.handlePegClick(e,t)})}},{key:"render",value:function(){var e=this,t=this.state,a=t.history,n=t.theme,l=t.stepNumber,r=t.pegsNumber,i=t.rulesModalOpen,s=t.boardsModalOpen,o=t.audio,c=t.gameState,m=t.boardType,h=a[this.state.stepNumber].pegs.slice(),d=this.findPegsActive(h);return u.a.createElement("div",{className:"container "+n},u.a.createElement(M,{theme:n,audio:o,toggleAudio:this.toggleAudio.bind(this)}),u.a.createElement("h1",{className:"title"},"Peg Solitaire"),u.a.createElement(P,{jumpTo:this.jumpTo.bind(this),toggleBoardsModal:this.toggleBoardsModal.bind(this),toggleRulesModal:this.toggleRulesModal.bind(this),pegsActive:d,stepNumber:l}),u.a.createElement(p,{onClick:function(t,a){return e.handlePegClick(t,a)},pegs:h,width:this.state.width,height:this.state.height,boardType:this.state.boardType}),u.a.createElement(S,{stepNumber:l,pegsNumber:r,boardType:m}),u.a.createElement(A,{changeTheme:this.changeTheme.bind(this),theme:n}),u.a.createElement(B,{value:c,stepNumber:l,pegsNumber:r,onClick:function(){return e.jumpTo(0)},onClose:function(){return e.setState({gameState:null})}}),i&&u.a.createElement(R,{onClose:function(){return e.toggleRulesModal()}}),s&&u.a.createElement(X,{onClick:function(t){return e.changeBoard(t)},onClose:function(){return e.toggleBoardsModal()}}))}}]),t}(u.a.Component);function ee(e,t){for(var a=0;a<e.length;a++)if(e[a][0]===t[0]&&e[a][1]===t[1])return!0;return!1}function te(e,t,a,n,l,r){var i=null;return 0===t.length&&0===a.length&&(i=1===e?"tutorial"===l||"english"===l&&1===n[3][3]||"german"===l&&1===n[4][4]||"asymmetrical"===l&&1===n[3][4]||"square"===l&&1===n[2][3]||"diamond"===l&&1===n[4][4]?"full-win":"part-win":"defeat",(!localStorage.getItem("best-score-pegs-"+l)||localStorage.getItem("best-score-pegs-"+l)>e)&&(localStorage.setItem("best-score-pegs-"+l,e),localStorage.setItem("best-score-moves-"+l,Math.floor(r/2)))),i}h.a.render(u.a.createElement($,null),document.getElementById("root"))},87:function(e,t,a){e.exports=a.p+"static/media/christmas.8bdcad53.mp3"},88:function(e,t,a){e.exports=a.p+"static/media/vaporwave.2052a467.mp3"},91:function(e,t,a){e.exports=a.p+"static/media/rules.9facfc6b.gif"},93:function(e,t,a){e.exports=a.p+"static/media/tutorial.3e472493.png"},94:function(e,t,a){e.exports=a.p+"static/media/asymmetrical.08e5993d.png"},95:function(e,t,a){e.exports=a.p+"static/media/diamond.2e4f56d9.png"},96:function(e,t,a){e.exports=a.p+"static/media/german.29539dad.png"},97:function(e,t,a){e.exports=a.p+"static/media/english.8204b0ec.png"},98:function(e,t,a){e.exports=a.p+"static/media/square.a55ab0f9.png"}},[[100,2,1]]]);
//# sourceMappingURL=main.e98ed8df.chunk.js.map