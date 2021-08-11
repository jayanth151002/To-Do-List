document.querySelector('button').addEventListener('click', () => {
    const txt = document.querySelector('textarea');
    if (txt.value == "")
        alert("Please enter a valid description");
    if (txt.value.length > 90) {
        alert("Only 90 characters are allowed in the description");
        document.location.reload();
    }

})

