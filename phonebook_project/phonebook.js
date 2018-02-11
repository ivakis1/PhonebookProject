function loadNumbers() {
    let phoneList = $('#content #phoneNumbersList');
    phoneList.empty();
    let loadNumbersButton = $('#loadNumbers');

    loadNumbersButton.prop('disabled', true);

    $.ajax({
        url: 'https://phonebook-2989a.firebaseio.com/phonebook.json',
        method: 'GET',
        success: displayContacts,
        error: showError,
        complete: () => loadNumbersButton.prop('disabled', false)

    });

    function displayContacts(data) {
        for (let contact in data) {
            if (data.hasOwnProperty(contact)) {
                let contactObj = data[contact];
                $(`<li>${contactObj.name}: ${contactObj.number} <a id="${contact}" onclick="deleteContact(this)" href="#">[Delete]</a> </li>`)
                    .appendTo(phoneList);
            }
        }
    }

    function showError(response) {
        console.log('Error');
    }
}

function addEntry() {
    let personName = $('#personName');
    let number = $('#personNumber');
    let createButton = $('#addEntry');

    createButton.prop('disabled', true);

    $.ajax({
        url: 'https://phonebook-2989a.firebaseio.com/phonebook.json',
        method: 'POST',
        data: addContact(),
        success: successCallback,
        error: showError,
        complete: () => createButton.prop('disabled', false)

    });

    function successCallback() {
        personName.val('');
        number.val('');
        loadNumbers();
    }

    function addContact(data) {
        let newEntry = {name: personName.val(), number: number.val()};

        return JSON.stringify(newEntry);
    }

    function showError(response) {
        console.log('Error');
    }
}

function deleteContact(id) {
    $.ajax({
        url: `https://phonebook-2989a.firebaseio.com/phonebook/${id.id}.json/`,
        method: 'DELETE',
        success: loadNumbers,
        error: () => console.log('error'),
    });
}





