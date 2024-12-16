***Create a diagram depicting the situation where the user creates a new note on page https://studies.cs.helsinki.fi/exampleapp/notes when writing something into the text field and clicking the submit button.***

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: notes (HTML - code)
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css (CSS document)
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js (JavaScript - code)

note over browser:
browser starts executing js code
it requests data.json from the server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: data.json (data from the exampleapp)
browser->server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
server-->browser: favicon.ico

note over browser:
browser renders the html code
end note

note:
*user writes something in the text field and then clicks the submit button*
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
server-->browser: new_note (HTML)

note over browser:
this new note is saved in data.json so when the browser reloads
it renders notes + new note to display
end note