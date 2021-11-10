# cs3219-TaskB1-3

## Instructions

### Task B1
Setup:
1. Go to my github repo [here](https://github.com/candyhy/cs3219-TaskB)
2. Clone a copy of my repository to your local machine by `git clone https://github.com/candyhy/cs3219-TaskB.git`
3. Change the directory to cs3219-TaskB by `cd cs3219-TaskB`
4. Run the server by: `npm start`


### Task B2
1. Run tests by `npm test`

### Task B3
The serverless service is deployed [here](https://cs3219-taskb-331708.as.r.appspot.com)

Accessing the endpoint will give an invalid endpoint message:
```
{"status":"failed","data":{"message":"invalid API endpoint"}}
```

To test out a valid endpoint `GET /get_tasks`, try [this](https://cs3219-taskb-331708.as.r.appspot.com/get_tasks)

You should be able to see the list of tasks stored in the database returned as message.

