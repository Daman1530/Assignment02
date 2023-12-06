document.addEventListener('DOMContentLoaded', function () {
    
    var formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];

    // Function to create a new card and append it to the section
    function createNewCard(formData) {
        const newContactItem = document.createElement('div');
        newContactItem.className = 'contact-item';
        newContactItem.innerHTML = `
            <h2>${formData.name}</h2>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Category:</strong> ${formData.category}</p>
            <a href="#" class="delete-btn" onclick="deleteContact(this)">Delete</a>
        `;
        document.querySelector('section').appendChild(newContactItem);
    }

    // Iterate through the array and create a new card for each form submission
    formDataArray.forEach(function (formData) {
        createNewCard(formData);
    });

    // Function to delete a contact card
    function deleteContact(deleteBtn) {
        var contactItem = deleteBtn.parentElement;

        // Find the index of the contact to be deleted in the array
        var indexToDelete = formDataArray.findIndex(function (formData) {
            return (
                formData.name === contactItem.querySelector('h2').textContent &&
                formData.phone === contactItem.querySelector('p').textContent.replace('Phone: ', '') &&
                formData.email === contactItem.querySelector('p:nth-child(3)').textContent.replace('Email: ', '') &&
                formData.category === contactItem.querySelector('p:nth-child(4)').textContent.replace('Category: ', '')
            );
        });

        // Remove the contact from the array
        if (indexToDelete !== -1) {
            formDataArray.splice(indexToDelete, 1);

            // Store the updated array in local storage
            localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
        }

        

        // Remove the contact card from the DOM
        indexToDelete.remove();
    }
});
