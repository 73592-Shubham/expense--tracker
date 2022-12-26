const addExpenseToLocalstorage= document.getElementById("store")
console.log(addExpenseToLocalstorage)

addExpenseToLocalstorage.addEventListener("submit",function put(event) {

    event.preventDefault()
    console.log("success")
    
    const amount=event.target.amount.value

    const description=event.target.description.value

    const category= event.target.selectcategory.value

    var obj={
        amount,
        description,
        category
    }

    localStorage.setItem(obj.description,JSON.stringify(obj))
    showExpenseOnScreen(obj)
})

function showExpenseOnScreen(obj){

    document.getElementById("expense").value="";
    document.getElementById("movie").value="";
    document.getElementById("type").value="";

    if(localStorage.getItem(obj.description)!==null)
    {
        removeIt(obj.description);

    }

    const parentNode=document.getElementById("listofamount")
    
    const childHtml=`<li  style="padding-left:90px " id=${obj.description}> ${obj.amount}  ${obj.description}  ${obj.category}  <button onclick=deleteUser('${obj.description}') class="btn btn-outline-danger m-2"> Delete </button> 
    <button onclick=editUserDetails('${obj.amount}','${obj.description}','${obj.category}') class="btn btn-outline-success m-2">Edit User </button>
    </li>`

    parentNode.innerHTML=parentNode.innerHTML+childHtml;
}

function removeIt(description) {

       const parentNode=document.getElementById("listofamount")
      const childHtmlToBeDeleted=document.getElementById(description);

       if(childHtmlToBeDeleted){
        parentNode.removeChild(childHtmlToBeDeleted)
       }

}

function deleteUser(description) {

    localStorage.removeItem(description)
    removeIt(description)
    
}

function editUserDetails(amount,description,category) {

    document.getElementById('expense').value=amount;
    document.getElementById('movie').value=description;
    document.getElementById("type").value= category;

    removeIt(description)

    
}
