import {getUsers, deleteUser} from './api/userApi.js';
import './index.css';

getUsers().then(function(result) {
    let userBody = "";

    result.forEach(function(user) {
        userBody += `
            <tr>
                <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
            </tr>
        `;
    });

    global.document.getElementById('users').innerHTML = userBody;

    const deleteLinks = global.document.getElementsByClassName('deleteUser');

    // Must use Array.from here because getElementsByClassName only returns
    // an array-like collection.
    Array.from(deleteLinks, link => {
        link.onclick = function (event) {
            const element = event.target;
            event.preventDefault();
            deleteUser(element.attributes["data-id"].value);
            const row = element.parentNode.parentNode;
            row.parentNode.removeChild(row);
        };
    });
});
