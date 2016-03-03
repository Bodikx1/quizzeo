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
                                        "image": "/resources/cat_1.png"
                                    },
                                    {
                                        "id": 2,
                                        "label": "LordMjau",
                                        "image": "/resources/cat_2.png"
                                    },
                                    {
                                        "id": 3,
                                        "label": "Furry Lapresta",
                                        "image": "/resources/cat_3.png"
                                    }
                                ]
                            },
                            {
                                "id": 2202330,
                                "type": "textfield",
                                "question": "What is this sound?",
                                "description": "Listen to this sound and choose the right answer:",
                                "attachment": {
                                    "type": "audio",
                                    "src_path": "/resources/audio.mp3",
                                    "src_type": "mp3"
                                }
                            },
                            {
                                "id": 2202331,
                                "type": "list",
                                "multiple": true,
                                "question": "What is this video?",
                                "description": "Watch the video and choose the right answer:",
                                "choices": [
                                    {
                                        "id": 1,
                                        "label": "Video 1"
                                    },
                                    {
                                        "id": 2,
                                        "label": "Video 2"
                                    },
                                    {
                                        "id": 3,
                                        "label": "Video 3"
                                    },
                                    {
                                        "id": 4,
                                        "label": "Video 4"
                                    }
                                ],
                                "attachment": {
                                    "type": "video",
                                    "src_path": "",
                                    "src_type": "youtube",
                                    "src_id": "bTqVqk7FSmY"
                                }
                            },
                            {
                                "id": 2202332,
                                "type": "images-list",
                                "question": "What is this video?",
                                "description": "Watch the video and choose the right answer:",
                                "choices": [
                                    {
                                        "id": 1,
                                        "label": "Video 1",
                                        "image": "/resources/cat_1.png"
                                    },
                                    {
                                        "id": 2,
                                        "label": "Video 2",
                                        "image": "/resources/cat_2.png"
                                    },
                                    {
                                        "id": 3,
                                        "label": "Video 3",
                                        "image": "/resources/cat_3.png"
                                    }
                                ],
                                "attachment": {
                                    "type": "video",
                                    "src_poster": "https://cdn.selz.com/plyr/1.5/View_From_A_Blue_Moon_Trailer-HD.jpg",
                                    "src_path": "/resources/video1.mp4",
                                    "src_type": "mp4"
                                }
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