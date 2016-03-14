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
                              "id": 200,
                              "type": "statement",
                              "question": "Hi! Thanks for spending time with us :-)"
                          },

                          {
                              "id": 201,
                              "type": "textfield",
                              "question": "What is your startup/company name?",
                              "description": ""
                          },

                          {
                              "id": 202,
                              "type": "textfield",
                              "question": "What is your first and lastname?",
                              "description": "We would love to get to know you better!"
                          },

                          {
                              "id": 203,
                              "type": "textfield",
                              "question": "What do you in the company?",
                              "description": "We would love to get to know you better!"
                          },

                          {
                              "id": 204,
                              "type": "list",
                              "multiple": true,
                              "question": "Please tag your activity ?",
                              "choices": [
                                  {
                                      "id": "Big Data",
                                      "label": "Big Data"
                                  },
                                  {
                                      "id": "Digital Health",
                                      "label": "Digital Health"
                                  },
                                  {
                                      "id": "Education Technology",
                                      "label": "Education Technology"
                                  },
                                  {
                                      "id": "Hardware",
                                      "label": "Hardware"
                                  },
                                  {
                                      "id": "Media & AdTech",
                                      "label": "Media & AdTech"
                                  },
                                  {
                                      "id": "Mobility & Automotive",
                                      "label": "Mobility & Automotive"
                                  },
                                  {
                                      "id": "Smart Cities",
                                      "label": "Smart Cities"
                                  },
                                  {
                                      "id": "Cloud & XaaS",
                                      "label": "Cloud & XaaS"
                                  },
                                  {
                                      "id": "eCommerce",
                                      "label": "eCommerce"
                                  },
                                  {
                                      "id": "Fintech",
                                      "label": "Fintech"
                                  },
                                  {
                                      "id": "Logistics",
                                      "label": "Logistics"
                                  },
                                  {
                                      "id": "IoT",
                                      "label": "IoT"
                                  },
                                  {
                                      "id": "Security",
                                      "label": "Security"
                                  },
                                  {
                                      "id": "Smart Home",
                                      "label": "Smart Home"
                                  },
                                  {
                                      "id": "VR",
                                      "label": "Virtual Reality"
                                  }
                              ]
                          },

                          {
                              "id": 300,
                              "type": "statement",
                              "question": "SECTION / About  developers..."
                          },

                          {
                              "id": 301,
                              "type": "list",
                              "multiple": false,
                              "quick-validate": true,
                              "question": "Do you employ developers?",
                              "choices": [
                                  {
                                      "id": 1,
                                      "label": "Yes"
                                  },
                                  {
                                      "id": 0,
                                      "label": "No"
                                  }
                              ]
                          },

                          {
                              "id": 302,
                              "type": "textfield",
                              "question": "How do you look for developers ?",
                              "description": "Only locally / Outsourcing / Free-lancers, ..."
                          },

                          {
                              "id": 303,
                              "type": "list",
                              "multiple": false,
                              "quick-validate": true,
                              "question": "Would you be interested in a quick and efficient logical quiz that helps you evaluate developers before hiring them?",
                              "choices": [
                                  {
                                      "id": 1,
                                      "label": "Yes"
                                  },
                                  {
                                      "id": 0,
                                      "label": "No"
                                  }
                              ]
                          },

                          {
                              "id": 400,
                              "type": "statement",
                              "question": "SECTION / About  storage..."
                          },

                          {
                              "id": 401,
                              "type": "list",
                              "multiple": false,
                              "quick-validate": true,
                              "question": "Do you store a growing base of documents, images, videos...?",
                              "choices": [
                                  {
                                      "id": 1,
                                      "label": "Yes"
                                  },
                                  {
                                      "id": 0,
                                      "label": "No"
                                  }
                              ]
                          },

                          {
                              "id": 402,
                              "type": "list",
                              "multiple": true,
                              "question": "What kind of storage do you use ?",

                              "choices": [
                                  {
                                      "id": "Azure",
                                      "label": "Microsoft Azure"
                                  },
                                  {
                                      "id": "Google",
                                      "label": "Google Cloud Platform"
                                  },
                                  {
                                      "id": "AWS",
                                      "label": "Amazon AWS / S3"
                                  },
                                  {
                                      "id": "own solution",
                                      "label": "My own datastore"
                                  },
                                  {
                                      "id": "Dedicated",
                                      "label": "Dedicated servers"
                                  },
                                  {
                                      "id": "Other",
                                      "label": "Other..."
                                  }
                              ]
                          },

                          {
                              "id": 403,
                              "type": "list",
                              "multiple": false,
                              "quick-validate": true,
                              "question": "Would you be interested in a simple and cost-effective cloud storage solution?",
                              "choices": [
                                  {
                                      "id": 1,
                                      "label": "Yes"
                                  },
                                  {
                                      "id": 2,
                                      "label": "No"
                                  }
                              ]
                          },

                          {
                              "id": 500,
                              "type": "statement",
                              "question": "SECTION / About  emails..."
                          },

                          {
                              "id": 502,
                              "type": "textfield",
                              "question": "Which tools are you using for Campaign Emails ?",
                              "description": "ex. MailChimp, ..."
                          },

                          {
                              "id": 503,
                              "type": "textfield",
                              "question": "What kind of transactional emails do you send to your customers?",
                              "description": "ex. registration, lost password, ... what else ?"
                          },

                          {
                              "id": 504,
                              "type": "textfield",
                              "question": "Which tools are you using for transactional emails ?",
                              "description": "ex. SendGrid, MailJet, Mailinblue, MailChimp, .."
                          },

                          {
                              "id": 505,
                              "type": "list",
                              "multiple": false,
                              "quick-validate": true,
                              "question": "Do you feel you that you are losing some time managing transactional emails ? (Check them, fix wording, design problems...) ?",
                              "choices": [
                                  {
                                      "id": 1,
                                      "label": "Yes"
                                  },
                                  {
                                      "id": 0,
                                      "label": "No"
                                  }
                              ]
                          },

                          {
                              "id": 600,
                              "type": "statement",
                              "question": "SECTION / About  images..."
                          },

                          {
                              "id": 601,
                              "type": "list",
                              "multiple": false,
                              "quick-validate": true,
                              "question": "Do you deal with many images in your product/website/application?",
                              "choices": [
                                  {
                                      "id": 1,
                                      "label": "Yes"
                                  },
                                  {
                                      "id": 0,
                                      "label": "No"
                                  }
                              ]
                          },

                          {
                              "id": 602,
                              "type": "textfield",
                              "question": "If yes, how do you resize them and optimize image loading time?",
                              "description": "Aaa, cloudinary imgifozjorzueri"
                          },

                          {
                              "id": 603,
                              "type": "list",
                              "multiple": false,
                              "quick-validate": true,
                              "question": "Do you feel that you are losing some time managing images ?",
                              "choices": [
                                  {
                                      "id": 1,
                                      "label": "Yes"
                                  },
                                  {
                                      "id": 0,
                                      "label": "No"
                                  }
                              ]
                          },

                          {
                              "id": 800,
                              "type": "list",
                              "multiple": false,
                              "quick-validate": true,
                              "question": "Are you the CTO ?",
                              "choices": [
                                  {
                                      "id": "1",
                                      "label": "Yes"
                                  },
                                  {
                                      "id": "0",
                                      "label": "No"
                                  }
                              ]
                          },

                          {
                              "id": 801,
                              "type": "list",
                              "multiple": true,
                              "question": "Which language are you using ?",
                              "choices": [
                                  {
                                      "id": "Java",
                                      "label": "Java"
                                  },
                                  {
                                      "id": "PHP",
                                      "label": "PHP"
                                  },
                                  {
                                      "id": "Python",
                                      "label": "Python"
                                  }
                              ]
                          },

                          {
                              "id": 803,
                              "type": "textfield",
                              "question": "Which frameworks are you using ?",
                              "description": "Django, Symfony, Laravel, .."
                          },

                          {
                              "id": 900,
                              "type": "textfield",
                              "question": "What is your email?",
                              "description": "We would love to get to know you better!"
                          },

                          {
                              "id": 904,
                              "type": "statement",
                              "question": "Thanks !"
                          },

                          {
                              "id": 905,
                              "type": "statement",
                              "question": ":-)"
                          },

                          {
                              "id": 911,
                              "type": "textfield",
                              "question": "Comments ?",
                              "description": "Comments ..."
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
                        "go_to_another_question": 900,
                        "total_progression": 21,
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
