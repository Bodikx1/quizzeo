var http = require('http');
var static = require('node-static');
var file = new static.Server('./public/');

http.createServer(function(req, res) {
    if (req.url.indexOf('/api/') === -1) {
        file.serve(req, res);
    } else {
        var urlParts = req.url.split('/');

        switch (urlParts[urlParts.length-2]) {
            case "questions":
                if (req.method === "GET") {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({
                        "fields": [
                            {
                                "id": 2202326,
                                "type": "statement",
                                "question": "Hi Joe. Thanks for purchasing a new <strong>Toaster Fridge.</strong>"
                            },
                            {
                                "id": 2202327,
                                "type": "textfield",
                                "question": "What is your name?",
                                "description": "We would love to get to know you better!"
                            },
                            {
                                "id": 2202328,
                                "type": "list",
                                "multiple": true,
                                "question": "How often do you use your <strong>Toaster Fridge</strong>",
                                "choices": [
                                    {
                                        "id": 1,
                                        "label": "Daily"
                                    },
                                    {
                                        "id": 2,
                                        "label": "Weekly"
                                    },
                                    {
                                        "id": 3,
                                        "label": "Monthly"
                                    },
                                    {
                                        "id": 4,
                                        "label": "I don't use it"
                                    }
                                ]
                            },
                            {
                                "id": 2202329,
                                "type": "images-list",
                                "question": "Which kitten is the cutest?",
                                "description": "The winning kitten will be rewarded with fish-for-a-life.",
                                "choices": [
                                    {
                                        "id": 1,
                                        "label": "KittensMittens",
                                        "image": "/images/cat_1.png"
                                    },
                                    {
                                        "id": 2,
                                        "label": "LordMjau",
                                        "image": "/images/cat_2.png"
                                    },
                                    {
                                        "id": 3,
                                        "label": "Furry Lapresta",
                                        "image": "/images/cat_3.png"
                                    }
                                ]
                            }
                        ]
                    }));
                } else {
                    res.statusCode = 404;
                    res.end();
                }
                break;

            case "check-question":
                if (req.method === "GET") {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({
                        "go_to_another_question": 2202329,
                        "total_progression": 2,
                        "result": {
                            "status": "success",
                            "msg": "Answer accepted successfully!"
                        }
                    }));
                } else {
                    res.statusCode = 404;
                    res.end();
                }
                break;
        }
        res.statusCode = 404;
        res.end("Page not found");
    }
}).listen(8080);

console.log('Server running on port 8080');