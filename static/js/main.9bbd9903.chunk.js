(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){e.exports=a(30)},29:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(12),u=a.n(s),c=a(9),i=a(8),o=a.n(i),l=a(13),d=a(1),h=a(2),b=a(4),m=a(3),p=a(5),f=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(b.a)(this,Object(m.a)(t).call(this,e))).displayThread=function(e){var t=e.target.getAttribute("data-index"),n=a.props.subreddit.data.children[t].data.selftext_html,r=a.map_convert(n.toString());a.props.specThreadChange(r)},a.map_convert=function(e){return e.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return this.props.subreddit.data.children.map(function(t,a){var n=t.data;return r.a.createElement("li",{key:a},r.a.createElement("a",{href:"#","data-index":a,className:n.name,onClick:e.displayThread},n.title))})}}]),t}(r.a.Component),v=function(e){return r.a.createElement("div",{className:"pagination"},r.a.createElement("a",{href:"#!",onClick:e.nextPage},"Load Next"))},S=a(6),g=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(b.a)(this,Object(m.a)(t).call(this,e))).handleInputValue=function(e){var t=e.target.value;a.setState({inputText:t})},a.handlePressEnter=function(e){e.target.value;"Enter"===e.key&&(a.props.searchSub(a.state.inputText),a.props.addSub(a.state.inputText),a.setState({inputText:""}))},a.state={inputText:""},a.handlePressEnter=a.handlePressEnter.bind(Object(S.a)(a)),a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{class:"header"},r.a.createElement("span",null,"A text-based subreddit reader: "),r.a.createElement("input",{value:this.state.inputText,onChange:this.handleInputValue,onKeyDown:this.handlePressEnter}))}}]),t}(r.a.Component),E=a(14),O=function(e){function t(){var e;return Object(d.a)(this,t),(e=Object(b.a)(this,Object(m.a)(t).call(this))).handleButtonPress=e.handleButtonPress.bind(Object(S.a)(e)),e.handleButtonRelease=e.handleButtonRelease.bind(Object(S.a)(e)),e}return Object(p.a)(t,e),Object(h.a)(t,[{key:"handleButtonPress",value:function(e){var t=this;console.log(this),this.buttonPressTimer=setTimeout(function(){return t.props.removeSub(e)},1500)}},{key:"handleButtonRelease",value:function(e){clearTimeout(this.buttonPressTimer)}},{key:"render",value:function(){var e=this,t=this.props.displaySubs;return r.a.createElement("div",{className:"bookmark_subs"},t.map(function(t){return r.a.createElement("span",{key:t},r.a.createElement("button",{onClick:function(){e.props.searchSub(t)},onTouchStart:function(){e.handleButtonPress(t)},onTouchEnd:function(){e.handleButtonRelease(t)},onMouseDown:function(){e.handleButtonPress(t)},onMouseUp:function(){e.handleButtonRelease(t)},onMouseLeave:function(){e.handleButtonRelease(t)}},"undefined"!==typeof t?"r/"+t:""))}),r.a.createElement("div",{className:"subDesc"},r.a.createElement("small",null,"Longpress to remove sub")))}}]),t}(r.a.Component),j=function(e){return r.a.createElement("a",{href:"#",onClick:e.returnListing},"Back")},T=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(b.a)(this,Object(m.a)(t).call(this,e))).fetchPosts=function(){var e=Object(l.a)(o.a.mark(function e(t){var n,r,s,u=arguments;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:"",e.prev=1,e.next=4,fetch("https://www.reddit.com/r/".concat(t,"/hot.json?limit=10&count=5").concat(n));case 4:if((r=e.sent).ok){e.next=7;break}return e.abrupt("return",a.handleFetchError(r.statusText));case 7:return e.next=9,r.json();case 9:return s=e.sent,e.abrupt("return",a.setState({subreddit:s}));case 13:return e.prev=13,e.t0=e.catch(1),e.abrupt("return",a.handleFetchError(e.t0));case 16:case"end":return e.stop()}},e,null,[[1,13]])}));return function(t){return e.apply(this,arguments)}}(),a.nextPage=function(){var e=a.state.subreddit.data.after;return a.fetchPosts(a.state.currentSub,"&after=".concat(e))},a.specThreadChange=function(e){a.setState({singleThread:e})},a.handleFetchError=function(e){alert("An error ocurred. That subreddit probably doesn't exist. Reverting to r/tifu"),a.searchSub("tifu");var t=a.state.savedSub;a.setState({savedSub:a.state.savedSub.map(function(e,a){if(t.length-1!==a)return e})}),a.setState(a.state)},a.returnListing=function(){a.setState({singleThread:""})},a.searchSub=function(e){a.setState({currentSub:e}),a.fetchPosts(e)},a.removeSub=function(e){var t=a.state.savedSub;a.setState({savedSub:t.filter(function(t){return t!==e})}),localStorage.setItem("localSub",JSON.stringify(a.state.savedSub))},a.addSub=function(e){a.setState({savedSub:[].concat(Object(c.a)(a.state.savedSub),[e])});var t=JSON.parse(localStorage.getItem("localSub"))||[],n=[].concat(Object(c.a)(t),[e]);localStorage.setItem("localSub",JSON.stringify(n))},a.state={subreddit:"",singleThread:"",currentSub:"tifu",savedSub:[]},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this.state.currentSub;this.fetchPosts(e);var t=JSON.parse(localStorage.getItem("localSub"));null===localStorage.getItem("localSub")?this.setState({savedSub:["talesfromtechsupport","tifu","IDontWorkHereLady"]}):this.setState({savedSub:t})}},{key:"render",value:function(){if(this.state.subreddit){var e=""===this.state.singleThread;return console.log(e),r.a.createElement("div",{className:"container"},r.a.createElement(E.Helmet,null,r.a.createElement("title",null,"SimplyReddit")),e?r.a.createElement("div",null,r.a.createElement(g,{searchSub:this.searchSub,addSub:this.addSub}),r.a.createElement(O,{searchSub:this.searchSub,displaySubs:this.state.savedSub,removeSub:this.removeSub}),r.a.createElement("ul",{className:"listings"},r.a.createElement(f,{subreddit:this.state.subreddit,specThreadChange:this.specThreadChange,singleThread:this.state.singleThread})),r.a.createElement(v,{nextPage:this.nextPage})):r.a.createElement("div",{className:"single_thread"},r.a.createElement(j,{returnListing:this.returnListing}),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:this.state.singleThread}}),r.a.createElement(j,{returnListing:this.returnListing})))}return null}}]),t}(r.a.Component);a(29),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[15,1,2]]]);
//# sourceMappingURL=main.9bbd9903.chunk.js.map