***Create a diagram depicting the situation where the user creates a new note using the single page version of the app.***

note:
*user writes something into the text field and cliks the submit button*
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
server-->browser: new_note_spa (json)

note over browser:
unlike https://studies.cs.helsinki.fi/exampleapp/notes
spa doesn-t reload the whole page and it only makes 1 request to the server with the json data
this is because of the js code that the browser obtained from the server
end note
