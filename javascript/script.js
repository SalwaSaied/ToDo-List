const todoValue = document.getElementById("todoText");
const listItems = document.getElementById("list-items");
const addupdateClick = document.getElementById("AddUpdateClick");
const AlertMessage = document.getElementById("AlertMessage");
const addUpdate = document.getElementById("AddUpdateClick");
let updateText;
let todoData = JSON.parse(localStorage.getItem("todoData"));
if (!todoData){
    todoData=[];
}



todoValue.addEventListener("keypress",function(e){
    SetAlertMessage("");
    if(e.key ==="Enter"){
        addupdateClick.click();
    }
});

ReadToDoItems()
function ReadToDoItems(){
    todoData.forEach((element) => {
        let li = document.createElement("li");
        let style = "";
        if (element.status){
            style= "style='text-decoration: line-through'";
        }
        const todoItems = `<div ${style} ondblclick="CompleteTodoItem(this)>${element.item}
        ${style===""?`<img class= "edit todo-controls" onclick="UpdateToDotems(this)" src="images/pencil.png"/>`
            :""
        }<img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/delete.png"></div>`;
        li.innerHTML=todoItems;
        listItems.appendChild(li);
    });
}

function CreateToDoData(){
    if(todoValue.value===""){
        SetAlertMessage("Please enter your todo text!");
        todoValue.focus();
    }
    let li = document.createElement ("li");
    const todoItems=`<div ondblclick="CompleteTodoItem(this)"> ${todoValue.value}</div>
     <div><img  class="edit todo-controls" src="images/pencil.png" alt="edit" onclick="UpdateToDoItems(this)" />
     <img class="delete todo-controls" src="images/delete.png" alt="delete"  onclick="DeleteToDoItems(this)" /></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
    if (!todoData){
        todoData=[];
    }

    let dataItem = {item: todoValue.value, status: false};
    todoData.push(dataItem)
    setLocalStorage();

    todoValue.value="";
    SetAlertMessage("Todo Item Created Successfully.");

}

function CompleteTodoItem(e){
    if(e.parentElement.querySelector("div").style.textDecoration ===""){
        e.parentElement.querySelector("div").style.textDecoration ="line-through";
       e.parentElement.querySelector("img.edit").remove();
        todoData.forEach((element)=>{
            if ( e.parentElement.querySelector("div").innerText.trim()== element.item){
                element.status= true;
            }
        });
        setLocalStorage();
    }
}

function UpdateOnSelectionItems(){
    let IsPresent = false;
    todoData.forEach((element) => {
    if (element.item = todoValue.value) {
      IsPresent = true;
    }
    });

    if (IsPresent) {
    SetAlertMessage("This item already present in the list!");
    return;
    }
    
    todoData.forEach((element)=>{
        if (element.item == updateText.innerText.trim()){
            element.item = todoValue.value;
        }
    });
    setLocalStorage();
    updateText.innerText = todoValue.value;
    addupdateClick.setAttribute("onclick", "CompleteTodoItem()");
    addupdateClick.setAttribute("src", "images/plus.png");
    todoValue.value="";

}

function UpdateToDoItems(e){
    if(e.parentElement.parentElement.querySelector("div").style.textDecoration ===""){
    todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
    addupdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
    addupdateClick.setAttribute("src", "images/refresh.png");
    updateText= e.parentElement.parentElement.querySelector("div");
    todoValue.focus();
    }


}

function DeleteToDoItems(e){
    let deleteValue=
    e.parentElement.parentElement.querySelector("div").innerText;
    if (confirm(`Are you sure?. Do you want to delete this ${deleteValue}!`)){
        e.parentElement.parentElement.parentElement.querySelector("li").remove();
       e.parentElement.parentElement.setAttribute("class", "deleted.item");
        todoValue.focus();

        todoData.forEach((element)=>{
            if(element.item==deleteValue.trim()){
                todoData.splice(element, 1)
            }
        });
        setLocalStorage();
        SetAlertMessage("Todo Item Deleted Successfully");
    }
}
function setLocalStorage(){
    localStorage.setItem("toData", JSON.stringify(todoData));

}
function SetAlertMessage(message){
    AlertMessage.removeAttribute("class");
    AlertMessage.innerText = message;

    setTimeout(()=>{
        AlertMessage.classList.add("toggleMe");
    }, 1000);
}
