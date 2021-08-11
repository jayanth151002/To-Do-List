document.querySelector('button').addEventListener(('click'), () => {
    const head = document.querySelector('input');
    const desc = document.querySelector('textarea');
    if (head.value == "" || desc.value == "") {
        alert("Please enter a valid heading and description!!");
        document.reload();
    }
})