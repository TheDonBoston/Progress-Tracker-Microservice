## Progress-Tracker-Microservice

- The progress-tracker microservice will take in a list of items or tasks with completion statuses of either true or false.  It will then calculate the percentage of items/tasks complete in the list and return that number for other programs to use.

Devs: Isabella Bakker, Gabriel Torres, Spenser Brandt

# How to Request Data

-  To request data, a program must send a POST request to the server by using the following link:
           http://localhost:3002/progress
- An example would be by using a .mjs file with the following code:
  
        const response = await fetch("http://localhost:3002/progress", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    items: [
                        { name: "20 minute walk", completed: false },
                        { name: "35 push-ups", completed: true }
                    ]
                })
            })

# How to Receive Data

-  To receive data, a program can use the variable that was used to request the data.
-  For example, in the code above, "const response" can show the response data with "response.json()."  Therefore, following along with the variable defined above, a program receives data with code like this:

        const data = await response.json()
        console.log(data);

-  The response for this code would be:

        {
          completed: 1,
          total: 2,
          percentage: 50,
          message: "You have completed 1 of 2 tasks (50%). Nice, you're over halfway there!"
        }

# UML Sequence Diagram
<img width="969" height="447" alt="image" src="https://github.com/user-attachments/assets/6ec655a3-b887-4d5b-b359-103211488330" />
