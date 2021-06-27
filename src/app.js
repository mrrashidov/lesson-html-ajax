async function useFetch(url) {

    const button = document.getElementById('load-data')
    button.classList.toggle('button--loading')

    return await fetch(url)
        .then(response => response.json())
        .then(async json => {
            button.classList.toggle('button--loading')
            return json
        })

}

async function loadData() {
    const data = await useFetch('https://jsonplaceholder.typicode.com/posts')
    return parseView(data)
}

function parseView(data) {

    let tr = '<tr><td>ID</td> <td>Title</td>  <td>Actions</td></tr>'

    data.forEach(item => {
        tr += '<tr>'
        tr += `<td> ${item.id}</td>`
        tr += `<td>${item.title}</td>`
        tr += `<td> <button type="button" value="${item.id}" onclick="editable(this)" class="button__edit">Edit</button> 
            | <button type="button" value="${item.userId}" onclick="getUser(this)" class="button__edit">Get User</button> </td>`
        tr += '</tr>'
    })


    document.getElementById("fetch_data").innerHTML = tr;
}

async function editable(e) {
    const data = await useFetch(`https://jsonplaceholder.typicode.com/posts/${e.value}`)
    useModal(data)
}

async function getUser(e) {
    const data = await useFetch(`https://jsonplaceholder.typicode.com/users/${e.value}`)
    console.log('user-info 🚀', data)
    alert('Yee hoo 😍🚀 please open console')
}

function useModal(data) {

    let modal = document.getElementById("myModal");

    modal.style.display = "block";

    modal.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    const modalData = `
        <div class="modal-content">
        <div class="modal-header">
            <span class="close" id="close_modal">&times;</span>
            <h2>Editable Item ID: ${data.id} </h2>
        </div>
        <div class="modal-body">
        <p>${data.title}</p>
        <br>
        <p>${data.body}</p>
        </div>
        <div class="modal-footer">
            <h3>User ID: ${data.userId}</h3>
        </div>
        </div>
    `


    document.getElementById("myModal").innerHTML = modalData;
}