
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js'
import { getDatabase, ref, push, remove, onValue} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js'


const appSettings = {
    databaseURL: "https://playground-94d9a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

// console.log(app)
let inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shippingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
    
})


onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
    
        let itemsArray = Object.entries(snapshot.val())
     
        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            appendItemToShoppingListEl(currentItem)
        }
        
    }else{
        shippingListEl.innerHTML = "No items here.."
    }
})

function clearShoppingListEl() {
    shippingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    //  console.log(itemValue)
    let itemID = item[0]
    let itemValue = item[1]
        
    let newEl = document.createElement(`li`);
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function () {
        let exactLocationOfShoppingListInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfShoppingListInDB)
    })
    
    shippingListEl.append(newEl)
}
