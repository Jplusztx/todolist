
if(localStorage.events==undefined){
	var events = [];
}else{
	var events = JSON.parse(localStorage.events);
}

function setRem(){
	var width = window.innerWidth;
	var html = document.querySelector(`html`);
	html.style.fontSize = width/12+`px`;
}
setRem();
window.onresize = function(){
	setRem();
};
var addInput = document.querySelector(`#addEventInput`);

addInput.onkeydown = function(event){
	if(event.key == "Enter"){
		if(addInput.value != "" && addInput.value.search(/ */i)!=1){
			var node = {
				event:addInput.value,
				isDone:false
			}
			events.push(node);
			addInput.value = "";
			flushList();
		}
	}
}

var doingList = document.querySelector(`.doingList`);
var doneList = document.querySelector(`.doneList`);


function flushList(){
	localStorage.events = JSON.stringify(events);
	doingList.innerHTML = "";
	doneList.innerHTML = "";
	events.forEach(function(item,index){
		var node = document.createElement(`div`);
		node.className = 'eve';
		if(item.isDone){
			node.innerHTML = `
				<input type="checkbox" data-index="${index}" checked="checked"/>
				<div class="content">${item.event}</div>
				<div class="del" data-index="${index}">DEL</div>
			`;
			doneList.appendChild(node);
		}else{
			node.innerHTML = `
				<input type="checkbox" data-index="${index}"/>
				<div class="content">${item.event}</div>
				<div class="del" data-index="${index}">DEL</div>
			`;
			doingList.appendChild(node);
		}
	})
	flushCount();
}
var doingTitle = document.querySelector(`.doing .title`);
var doneTitle = document.querySelector(`.done .title`);
function flushCount(){
	var doingCount = 0;
	var doneCount = 0;
	events.forEach(function(item,index){
			if(item.isDone){
				doneCount++;
			}else{
				doingCount++;
			}
	});
	doingTitle.dataset.count = doingCount;
	doneTitle.dataset.count = doneCount;
}

flushList();

doingList.onchange = function(event){
	var index = parseInt(event.target.dataset.index);
	console.log(index)
	events[index].isDone = true;
	flushList();
}
doneList.onchange = function(event){
	var index = parseInt(event.target.dataset.index);
	events[index].isDone = false;
	flushList();
}
var main = document.querySelector(`.main`);
main.onclick = function(e){
	if(e.target.className=="del"){
		var index = parseInt(e.target.dataset.index);
		events.splice(index,1);
		flushList();
	}
}
