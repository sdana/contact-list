const ContactCollectionModule = require("./ContactCollection")
const ContactListModule = require("./ContactList")
const $ = require("jquery")

const deleteContact = () => {
  console.log("delete button clicked", event.currentTarget.parentNode.id)
  const contactId = event.currentTarget.parentNode.id
  ContactCollectionModule.deleteContact(contactId)
  .then(() => {
    ContactListModule.buildContactList()
  })
}

const editContact = () => {
  // const parentOfClick = $("event.currentTarget.parentNode.id")
  // console.log("edit button clicked", parentOfClick)
  const contactId = event.currentTarget.parentNode.id
  // console.log(event.currentTarget.parentNode.childNodes)
  for (let i=0; i<3; i++) {
    let idArr = ["nameInput", "addrInput", "phoneInput"]
    let inputField = document.createElement("input")
    inputField.setAttribute("type", "text")
    console.log(idArr[i])
    inputField.setAttribute("id",`${idArr[i]}`)
    event.currentTarget.parentNode.childNodes[i].appendChild(inputField)
  }
  const submitChangesBtn = document.createElement("button")
  submitChangesBtn.id = "submit-changes-button"
  submitChangesBtn.textContent = "Submit Changes"
  event.currentTarget.parentNode.appendChild(submitChangesBtn)
  submitChangesBtn.addEventListener("click", () =>{
    let nameValue = $("#nameInput").val()
    let addrValue = $("#addrInput").val()
    let phoneValue = $("#phoneInput").val()
    let emptyObject = {}
    if ($("#nameInput").val() !== ""){emptyObject.name = nameValue}
    if($("#addrInput").val() !== ""){emptyObject.address = addrValue}
    if ($("#phoneInput").val() !== ""){emptyObject.phone = phoneValue}
    ContactCollectionModule.editContact(contactId, emptyObject)
      .then(() => { ContactListModule.buildContactList()})
  })
    // const propertyToChange = prompt("Which property to edit?")
  // const valueOfProp = prompt("New Value?")
  // ContactCollectionModule.editContact(contactId, propertyToChange, valueOfProp)
}

const contact = Object.create({}, {
  "createContactComponent": {
    value: function(contact) {

      const contactSection = document.createElement("section")
      contactSection.id = `${contact.id}`

      for(key in contact){
        if(key === "id") {
          const deleteButton = document.createElement("button")
          deleteButton.textContent = "Delete"
          deleteButton.addEventListener("click", deleteContact)
          contactSection.appendChild(deleteButton)
          const editButton = document.createElement("button")
          editButton.textContent = "Edit"
          editButton.addEventListener("click", editContact)
          contactSection.appendChild(editButton)
        } else {
          const paraElement = document.createElement("p")
          paraElement.textContent = `${key}: ${contact[key]}`
          contactSection.appendChild(paraElement)
        }
      }

      return contactSection
    }
  }
})

module.exports = contact
