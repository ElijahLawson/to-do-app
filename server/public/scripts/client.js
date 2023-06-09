$(document).ready(onReady);

function onReady() {
  setupClickListeners();
  renderTasksToDom();
}

//Clicky clicky, hear hear!
function setupClickListeners() {
  $("#submit-btn").on("click", postNewTaskToServer);
  $("#task-display").on("click", ".complete-btn", markTaskComplete);
  $("#task-display").on("click", ".delete-btn", deleteTask);
}

//Render the DOM based off the database GET query, conditionally applied based of if task is completed
function renderTasksToDom() {
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then(function (response) {
      tasksFromServer = response;
      $("#task-display").empty();

      for (let task of tasksFromServer) {
        if (task.is_completed === true) {
          $("#task-display").append(`f
            <tr data-id=${task.id} class='completed-task'>
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>👍</td>
                <td><button class="delete-btn" id="delete-btn">❌</button></td>
            </tr>
            `);
        } else {
          $("#task-display").append(`
            <tr data-id=${task.id}>
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td><button class="complete-btn" id="complete-btn">✅</button></td>
               <td><button class="delete-btn" id="delete-btn">❌</button></td>
            </tr>
            `);
        }
      }
    })
    .catch(function (error) {
      console.log("The GET failed");
    });
}

//Post the new task from the input fields to the server
function postNewTaskToServer(event) {
  event.preventDefault();
  let newTaskToPost = {
    name: $("#task-name-input").val(),
    description: $("#task-description-input").val(),
  };

  $("#task-name-input").val("");
  $("#task-description-input").val("");

  $.ajax({
    method: "POST",
    data: newTaskToPost,
    url: "/tasks",
  })
    .then(function (response) {
      renderTasksToDom();
    })
    .catch(function (error) {
      console.log("The POST failed.");
    });
}

//PUT method function to update an item when the complete button is pushed
function markTaskComplete() {
  let idToUpdate = $(this).parent().parent().data("id");
  $.ajax({
    method: "PUT",
    url: `/tasks/${idToUpdate}`,
  }).then(function (response) {
    renderTasksToDom();
    console.log($(this).parent().parent());
  });
}

//DELETE method function to delete an item from the database
function deleteTask() {
  let idToDelete = $(this).parent().parent().data("id");
  $.ajax({
    method: "DELETE",
    url: `/tasks/${idToDelete}`,
  }).then(function (response) {
    renderTasksToDom();
  });
}