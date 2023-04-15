

Main Steps:
    Set Project Structure Up
    Set Database Up
    Build HTML Foundation
    Set up Buttons
    Build Server
    Build Routes
    Style

Database:
    Name: weekend-to-do-app
    Tables: tasks
        id: PRIMARY
        name: VARCHAR(80) NOT NULL
        description: VARCHAR(256) NOT NULL
        is-completed: BOOLEAN

Routes:
    task.router.js
        router.get()
        router.post()
        router.put()
        router.delete()

Front End Components:
    Input Form
        Task Name Input
        Task Description Input
        Submit New Task Button
    Task Display Table
        Task Name
        Task Description
        Complete Button
        Delete Button


Styling:
    Background Gradient
    Fade out animation when marked complete
    Bootstrap implementation
    