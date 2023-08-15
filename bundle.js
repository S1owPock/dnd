!function(){"use strict";const e=new class{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){return e}}}(localStorage),t=new class{constructor(){this.container=null,this.ulColl=null,this.itemsColl=null}init(){this.listenerAddCard(),this.container.addEventListener("click",this.itemRemove)}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e,this.ulColl=this.container.querySelectorAll("ul"),this.itemsColl=this.container.querySelectorAll(".item")}itemRemove(e){e.target.classList.contains("cross")&&e.target.closest("li")&&e.target.closest("li").remove()}listenerAddCard(){this.container.querySelectorAll(".add-card").forEach((e=>{e.addEventListener("click",(t=>{const s=this.createTextarea();t.target.replaceWith(s),s.addEventListener("click",(t=>{if(t.target.classList.contains("cross")&&s.replaceWith(e),t.target.classList.contains("add")&&""!==s.querySelector(".textarea").value){const i=this.addNewCard(s.querySelector(".textarea").value);t.target.closest(".column").querySelector("ul").append(i),s.replaceWith(e),this.itemsColl=this.container.querySelectorAll(".item")}}))}))}))}showLoad(e){this.ulColl.forEach((e=>{e.innerHTML=""})),Object.entries(e).forEach((([e,t])=>{t.forEach((t=>{this.container.querySelector(`[data-category="${e}"]`).insertAdjacentElement("beforeend",this.addNewCard(t))}))}))}createObj(){const e={todo:[],inprogress:[],done:[]};return this.ulColl.forEach((t=>{t.querySelectorAll("li span").forEach(((s,i)=>{e[t.getAttribute("data-category")][i]=s.textContent}))})),e}createTextarea(){const e=document.createElement("div");return e.classList.add("textarea__container"),e.innerHTML='\n          <textarea class="textarea" placeholder="Enter a title for this card..."></textarea>\n          <button class="add btn">Add Card</button>\n          <button class="cross btn">&#215</button>\n        ',e}addNewCard(e){const t=document.createElement("li");return t.classList.add("item"),t.insertAdjacentHTML("beforeend",`<span>${e}</span><button class="cross btn">&#215</button>`),t}};t.bindToDOM(document.querySelector(".container")),t.init(),(new class{constructor(){this.dragItem=null,this.dropItem=null,this.shiftX=null,this.shiftY=null,this.elemBellow=null,this.container=null,this.emptyLi=null}init(){this.container=document.querySelector(".container"),this.container.addEventListener("mousedown",this.dragDown),this.container.addEventListener("mousemove",this.dragMove),this.container.addEventListener("mouseup",this.dragUp),this.container.addEventListener("mouseleave",this.dragLeave)}dragDown(e){e.target.closest(".item")&&!e.target.classList.contains("cross")&&(e.preventDefault(),this.dragItem=e.target.closest(".item"),this.dropItem=this.dragItem.cloneNode(!0),this.shiftX=e.clientX-this.dragItem.getBoundingClientRect().left,this.shiftY=e.clientY-this.dragItem.getBoundingClientRect().top,this.dropItem.style.width=`${this.dragItem.offsetWidth}px`,this.dropItem.classList.add("dragged"),document.querySelector(".container").appendChild(this.dropItem),this.dropItem.style.left=e.pageX-this.shiftX+"px",this.dropItem.style.top=e.pageY-this.shiftY+"px",this.dragItem.style.opacity=0,this.emptyLi=document.createElement("li"),this.emptyLi.classList.add("empty"),this.emptyLi.style.height=`${this.dragItem.offsetHeight}px`)}dragMove(e){if(e.preventDefault(),this.dragItem&&(this.dropItem.classList.add("hidden"),this.elemBellow=document.elementFromPoint(e.clientX,e.clientY),this.dropItem.classList.remove("hidden"),this.dropItem.style.left=e.pageX-this.shiftX+"px",this.dropItem.style.top=e.pageY-this.shiftY+"px",this.elemBellow.closest(".column"))){const e=this.elemBellow.closest(".column").querySelector("ul");e.hasChildNodes()?this.elemBellow.closest(".add-card")?e.append(this.emptyLi):this.elemBellow.closest("h1")?e.prepend(this.emptyLi):this.elemBellow.closest(".item")&&e.insertBefore(this.emptyLi,this.elemBellow.closest(".item")):e.append(this.emptyLi)}}dragUp(e){if(e.preventDefault(),!this.dragItem)return;if(!this.elemBellow.closest(".column"))return document.querySelector(".container").removeChild(this.dropItem),document.querySelector(".empty").remove(),this.dragItem.style.opacity=100,this.dropItem=null,void(this.dragItem=null);const t=this.elemBellow.closest(".column").querySelector("ul");this.elemBellow.closest("h1")?t.prepend(this.dropItem):this.elemBellow.closest(".add-card")?t.append(this.dropItem):t.insertBefore(this.dropItem,this.elemBellow.closest("li")),document.querySelector(".empty")&&document.querySelector(".empty").remove(),this.dropItem.classList.remove("dragged"),this.dropItem.style="100%",this.dragItem.remove(),this.dragItem=null,this.dropItem=null}dragLeave(){this.dragItem&&(document.querySelector(".container").removeChild(this.dropItem),document.querySelector(".empty").remove(),this.dragItem.style.opacity=100,this.dropItem=null,this.dragItem=null)}}).init(),window.addEventListener("unload",(()=>{e.save(t.createObj())}));const s=e.load();t.showLoad(s)}();