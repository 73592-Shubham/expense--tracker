function saveToLocalStorage(event) {
    event.preventDefault();
    const expenseAmount = event.target.amount.value;
    const descriptionChoose = event.target.description.value;
    const categeoryChoose = event.target.categeory.value;
    // localStorage.setItem('expenseAmount', expenseAmount);
    // localStorage.setItem('descriptionChoose', descriptionChoose);
    // localStorage.setItem('categeoryChoose', categeoryChoose)
    
    const obj = {
        expenseAmount,
        descriptionChoose,
        categeoryChoose
    }

    axios.post("https://crudcrud.com/api/77a3b8a4461b4f638a4041a39156d527/tracker", obj)
                    .then((respone) => {
                        showNewExpenseOnScreen(respone.data)
                        // console.log(response)
                    })
                    .catch((err)=> {
                        document.body.innerHTML = document.body.innerHTML  + "<h4> Something went wrong </h4>"
                        console.log(err)
                    })
    // localStorage.setItem(obj.descriptionChoose, JSON.stringify(obj))
    // showNewExpenseOnScreen(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/77a3b8a4461b4f638a4041a39156d527/tracker")
         .then((response) => {
            //  console.log(response) 

             for ( var i=0; i<response.data.length; i++){
                showNewExpenseOnScreen(response.data[i])
             }
        })
        .catch((error)=>{
            console.log(error);
        })
   
})

function showNewExpenseOnScreen(expense){
    document.getElementById('amt').value = '';
    document.getElementById('des').value = '';
    document.getElementById('categeory').value = '';
    if(localStorage.getItem(expense.categeoryChoose) !== null){
        removeExpenseFromScreen(expense.categeoryChoose)
    }
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${expense._id}> ${expense.expenseAmount} - ${expense.categeoryChoose} - ${expense.descriptionChoose} 
                            <button onclick=deleteExpense('${expense._id}')> Delete Expense </button>
                            <button onclick=editExpense('${expense.expenseAmount}','${expense.descriptionChoose}','${expense.categeoryChoose}','${expense._id}')> Edit Expense </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

// editExpense
function editExpense(amount, description, categeory, expenseId){
    document.getElementById('amt').value = amount;
    document.getElementById('des').value = description;
    document.getElementById('categeory').value = categeory;
   
    deleteExpense(expenseId)
}

// deleteExpense

function deleteExpense(expenseId){
    axios.delete(`https://crudcrud.com/api/77a3b8a4461b4f638a4041a39156d527/tracker/${expenseId}`)
        .then((response) => {
            removeExpenseFromScreen(expenseId);
        })
        .catch((error)=>{
            console.log(error);
    })
    // console.log(categeory)
    // localStorage.removeItem(categeory);
    // removeExpenseFromScreen(categeory);

}

function removeExpenseFromScreen(expenseId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(expenseId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
