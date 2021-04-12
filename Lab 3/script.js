"use strict";

const todoInput = document.querySelector("#new-task");
const todoButton = document.querySelector("#submit-button");
const critList = document.querySelector("#critical-tasks");
const urgentList = document.querySelector("#urgent-tasks");
const impList = document.querySelector("#imp-tasks");
const listSelector = document.querySelector(".form-select");
const searchInput = document.querySelector("#search-task");
const checkBox = document.querySelector("#checkSens");

const critHead = document.querySelector("#crit-header");
const impHead = document.querySelector("#imp-header");
const urHead = document.querySelector("#ur-header");

const body = document.querySelector("body");

let selected;
let todoList;
let lastParent;

todoButton.addEventListener('click', addTodo);
checkBox.addEventListener('change', changeSensitive);

critHead.addEventListener('click', hideList);
impHead.addEventListener('click', hideList);
urHead.addEventListener('click', hideList);


critList.addEventListener('click', completeTask);
urgentList.addEventListener('click', completeTask);
impList.addEventListener('click', completeTask);

const searchTasksIns=() => {
    var searchText = searchInput.value.trim();

    const elems = body.querySelectorAll("li");

    for (const el of elems) {
        const text = el.querySelector('span').innerText.toUpperCase();
    
        if(!text.includes(searchText.toUpperCase())) {
            el.parentNode.style.display = 'none';
        } else {
            el.parentNode.style.display = '';
        }
    }
}

const searchTasksSen=() => {
    var searchText = searchInput.value.trim();

    const elems = body.querySelectorAll("li");

    for (const el of elems) {
        const text = el.querySelector('span').innerText;
    
        if(!text.includes(searchText)) {
            el.parentNode.style.display = 'none';
        } else {
            el.parentNode.style.display = '';
        }
    }
}

function changeSensitive(event) {
    if(event.target.checked) {
        searchInput.removeEventListener('keyup', searchTasksSen);
        searchInput.addEventListener('keyup', searchTasksIns);
    } else {
        searchInput.removeEventListener('keyup', searchTasksIns);
        searchInput.addEventListener('keyup', searchTasksSen);
    }
}

searchInput.addEventListener('keyup', searchTasksSen);

function hideList(event) {
    var element = event.target.firstChild;

    if(element.data === 'Critical tasks')
    {
        if(critList.parentElement.style.display  === 'none') {
            critList.parentElement.style.display = '';
        } else {
            critList.parentElement.style.display = 'none';
        }

    } else if(element.data === 'Urgent tasks') {
        if(urgentList.parentElement.style.display  === 'none') {
            urgentList.parentElement.style.display= '';
        } else {
            urgentList.parentElement.style.display = 'none';
        }

    } else if(element.data === 'Important tasks') {
        if(impList.parentElement.style.display  === 'none') {
            impList.parentElement.style.display= '';
        } else {
            impList.parentElement.style.display = 'none';
        }
    }
}

function completeTask(event) {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let curr_date = " " + date + " " + time;
    
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        let task = event.target.querySelector('.sample');
        let date = event.target.querySelector('.date');
    
        if (date.innerHTML === '') {
            date.innerText = curr_date;
            task.style.textDecoration = 'line-through';
        }
        else {
            date.innerText = '';
            task.style.textDecoration = 'none';
        }  
    }
}


function addTodo(event){
    event.preventDefault();
    let value = todoInput.value.trim();

    if (value) {

        selected = listSelector.value;
        if (selected === '1') {
            todoList = critList;
        } else if (selected === '2') {
            todoList = urgentList;
        } else if (selected === '3') {
            todoList = impList;
        }

        todoInput.dataset.state = 'valid';
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        var sampleText = document.createElement('span');
        sampleText.innerText = todoInput.value;
        sampleText.classList.add('sample');
        newTodo.appendChild(sampleText);

        var dateElem = document.createElement('span');
        dateElem.classList.add('date');
        newTodo.appendChild(dateElem);
    
        var deleteButton = $('<button type="button" value="X" class="delete-button btn-danger" />');
        deleteButton.html('X');
        deleteButton.appendTo($(todoDiv));
        deleteButton.css({ width: 'auto', height: 'auto', cursor: 'pointer', color: 'black' });
    
        todoList.appendChild(todoDiv);
    
        todoInput.value = "";
    } else {
        todoInput.dataset.state = 'invalid';
    }
}

$(document).ready(function(){
    $('body').on('click', 'button.delete-button', function() {
        
        let lastRemoved = $(this).parent();
        lastParent = $(lastRemoved).parent();
        $('#confirmModal').appendTo('body').modal('show');
        

        $('#confirmModal').off('click', 'button.btn-success').on('click', 'button.btn-success', function(e) {
            
            if ($('#removed-tasks').children().length > 0 ) {
                $('#removed-tasks').empty();
            }
            
            $(lastRemoved).remove();
            lastRemoved.children('.delete-button').remove();
            var restoreButton = $('<button type="button" value="restore" class="restore-button btn-success" />');
            restoreButton.html('Restore');
            restoreButton.appendTo($(lastRemoved));
            restoreButton.css({ width: 'auto', cursor: 'pointer', color: 'black' });
            lastRemoved.appendTo($('#removed-tasks'));
        })

    });

    $('body').on('click', 'button.restore-button', function() {
        let restored = $(this).parent();
        $(this).parent().remove();
        restored.children('.restore-button').remove();
        let deleteButton = $('<button type="button" value="X" class="delete-button btn-danger" />');
        deleteButton.html('X');
        deleteButton.appendTo($(restored));
        deleteButton.css({ width: 'auto', height: 'auto', cursor: 'pointer', color: 'black' });
        restored.appendTo($(lastParent));
    });
});
