(function () {
    var questions = $('.form ul.questions');
    // variables end;

    var init = function () {
        questionsInit();
        // add responsive margins
        responsiveMargins(10, 30);
        $(window).resize(responsiveMargins.bind(null, 10, 30));
        // add focus
        $(window).scroll(focusQuestion);
        // btn navigation
        $('.button.nav').on('click', navigationHandler);
        // enable btn navigation
        checkNavigationBtns(questions.find('>li.focus'));
    },

    questionsInit = function () {
        var questionsNumerator = 0,
            questionsList = [],
            questionsListModel = {
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
            };

        questionsListModel.fields.length && questionsListModel.fields.forEach(function (questionModel, index) {
            var li = $('<li/>', {"data-model": JSON.stringify(questionModel)});

            if (index == 0) {
                li.addClass('focus');
            }

            switch (questionModel.type) {
                case "statement":
                    li.addClass('statement');
                    li.html('<div class="wrapper">' +
                        '<div class="item">“</div>' +
                        '<div class="question"><span>'+ questionModel.question +'</span></div>' +
                        '<div class="content">' +
                        '<div class="description">'+ (questionModel.description ? questionModel.description : '') +'</div>' +
                        '<div class="content-wrapper">' +
                        '<div class="attachment-wrapper">' +
                        '<div class="clear"></div>' +
                        '</div>' +
                        '<div class="button-wrapper continue">' +
                        '<div class="button nav hover-effect enabled"><span>Continue</span></div>'+
                        '</div>' +
                        '<div class="text">press <strong>ENTER</strong></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                    break;

                case "textfield":
                    questionsNumerator++;
                    li.addClass('textfield');
                    li.html('<div class="wrapper">' +
                    '<div class="item">' +
                    '<span>'+ questionsNumerator +'</span>' +
                    '<div class="arrow">' +
                    '<div class="arrow-right"></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="question"><span>'+ questionModel.question +'</span></div>' +
                    '<div class="content">' +
                    '<div class="description">'+ (questionModel.description ? questionModel.description : '') +'</div>' +
                    '<div class="content-wrapper">' +
                    '<div class="attachment-wrapper">' +
                    '<div class="control">' +
                    '<div class="input">' +
                    '<input class="" type="text" autocomplete="off">' +
                    '</div>' +
                    '</div>' +
                    '<div class="clear"></div>' +
                    '</div>' +
                    '<div class="clear"></div>' +
                    '<div class="message "><span></span>' +
                    '<div></div>' +
                    '</div>' +
                    '<div class="confirm-container ">' +
                    '<div class="button-wrapper confirm">' +
                    '<div class="button nav hover-effect enabled"><span>Ok</span><span class="confirm"></span></div>' +
                    '</div>' +
                    '<div class="text">press <strong>ENTER</strong></div>' +
                    '<div class="aux no-hover">' +
                    '<div class="inset"></div>' +
                    '<div class="bg"></div>' +
                    '<div class="bd"></div>' +
                    '<div class="overlay"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'+
                    '</div>');
                    break;

                case "list":
                    var choicesList = [],
                        chCode = 65;

                    questionsNumerator++;
                    li.addClass('list'+ (questionModel.multiple ? ' multiple' : ''));
                    li.html('<div class="wrapper">' +
                    '<div class="item">' +
                    '<span>'+ questionsNumerator +'</span>' +
                    '<div class="arrow">' +
                    '<div class="arrow-right"></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="question"><span>'+ questionModel.question +'</span></div>' +
                    '<div class="content">' +
                    '<div class="description">'+ (questionModel.description ? questionModel.description : '') +'</div>' +
                    '<div class="content-wrapper">' +
                    '<div class="attachment-wrapper">' +
                    '<div class="control">' +
                    '<div class="multiple">Choose as many as you like</div>' +
                    '<ul class="columns"></ul>' +
                    '</div>' +
                    '<div class="clear"></div>' +
                    '</div>' +
                    '<div class="clear"></div>' +
                    '<div class="message "><span></span>'+
                    '<div></div>' +
                    '</div>' +
                    '<div class="confirm-container ">' +
                    '<div class="button-wrapper confirm">' +
                    '<div class="button nav hover-effect enabled"><span>Ok</span><span class="confirm"></span></div>' +
                    '</div>' +
                    '<div class="text">press <strong>ENTER</strong></div>' +
                    '<div class="aux no-hover">' +
                    '<div class="inset"></div>' +
                    '<div class="bg"></div>' +
                    '<div class="bd"></div>' +
                    '<div class="overlay"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');

                    questionModel.choices.length && questionModel.choices.forEach(function (choiceModel, index) {
                        choicesList.push('<li id="'+ choiceModel.id +'">' +
                            '<input type="hidden" name="value" value="'+ choiceModel.label +'" autocomplete="off">' +
                            '<div class="letter"><span>'+ String.fromCharCode(chCode).toUpperCase() +'</span></div>' +
                            '<span class="label">'+ choiceModel.label +'</span>' +
                            '<span class="tick glyphicon glyphicon-ok"></span>' +
                            '<div class="aux ">' +
                            '<div class="inset"></div>' +
                            '<div class="bg"></div>' +
                            '<div class="bd"></div>' +
                            '<div class="overlay"></div>' +
                            '</div>' +
                            '</li>');
                        chCode++;
                    });
                    li.find('ul.columns').append(choicesList);
                    break;

                case "images-list":
                    var choicesList = [],
                        chCode = 65;

                    questionsNumerator++;
                    li.addClass('images list'+ (questionModel.multiple ? ' multiple' : ''));
                    li.html('<div class="wrapper">' +
                        '<div class="item">' +
                        '<span>'+ questionsNumerator +'</span>' +
                        '<div class="arrow">' +
                        '<div class="arrow-right"></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="question"><span>'+ questionModel.question +'</span></div>' +
                        '<div class="content">' +
                        '<div class="description">'+ (questionModel.description ? questionModel.description : '') +'</div>' +
                        '<div class="content-wrapper">' +
                        '<div class="attachment-wrapper">' +
                        '<div class="control">' +
                        '<div class="multiple">Choose as many as you like</div>' +
                        '<ul class="columns"></ul>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                        '<div class="message "><span></span>'+
                        '<div></div>' +
                        '</div>' +
                        '<div class="confirm-container ">' +
                        '<div class="button-wrapper confirm">' +
                        '<div class="button nav hover-effect enabled"><span>Ok</span><span class="confirm"></span></div>' +
                        '</div>' +
                        '<div class="text">press <strong>ENTER</strong></div>' +
                        '<div class="aux no-hover">' +
                        '<div class="inset"></div>' +
                        '<div class="bg"></div>' +
                        '<div class="bd"></div>' +
                        '<div class="overlay"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    questionModel.choices.length && questionModel.choices.forEach(function (choiceModel, index) {
                        choicesList.push('<li id="'+ choiceModel.id +'">' +
                            '<input type="hidden" name="value" value="'+ choiceModel.label +'" autocomplete="off">' +
                            '<div style="background-image: url('+ choiceModel.image +');" class="image"></div>' +
                            '<div class="letter"><span>'+ String.fromCharCode(chCode).toUpperCase() +'</span></div>' +
                            '<span class="label">'+ choiceModel.label +'</span>' +
                            '<span class="tick glyphicon glyphicon-ok"></span>' +
                            '<div class="aux ">' +
                            '<div class="inset"></div>' +
                            '<div class="bg"></div>' +
                            '<div class="bd"></div>' +
                            '<div class="overlay"></div>' +
                            '</div>' +
                            '</li>');
                        chCode++;
                    });
                    li.find('ul.columns').append(choicesList);
                    break;
            }
            questionsList.push(li);
        });

        questions.append(questionsList);
    },

    responsiveMargins = function (marginTopPercent, marginBottomPercent) {
        questions.attr('style', 'margin-top: '+ parseInt(window.innerHeight/100*marginTopPercent) +'px; margin-bottom: '+ parseInt(window.innerHeight/100*marginBottomPercent) +'px;');
    },

    focusQuestion = function () {
        var currentY = $(window).scrollTop() + parseInt(window.innerHeight/100*10);

        questions.find('>li').length && $.each(questions.find('>li'), function (index, question) {
            if (currentY >= question.offsetTop && currentY <= question.offsetTop + question.offsetHeight) {
                $(question).addClass('focus');

                // enable btn navigation
                checkNavigationBtns(question);
            } else {
                $(question).removeClass('focus');
            }
        });
    },

    checkNavigationBtns = function (currentEl) {
        if ($(currentEl).prev().length) {
            $('.button-wrapper.up .button.nav').removeClass('disabled').addClass('enabled')
        } else {
            $('.button-wrapper.up .button.nav').removeClass('enabled').addClass('disabled')
        }

        if ($(currentEl).next().length) {
            $('.button-wrapper.down .button.nav').removeClass('disabled').addClass('enabled')
        } else {
            $('.button-wrapper.down .button.nav').removeClass('enabled').addClass('disabled')
        }
    },

    navigationHandler = function (event) {
        var btnType = $(event.target).closest('div.button-wrapper')[0],
            btnType = btnType.classList[btnType.classList.length-1];

        switch (btnType) {
            case "up":
                if ($(event.target).closest('div.button.nav').hasClass('enabled')) {
                    questions.find('>li.focus').prev().length && $('body').animate({scrollTop: questions.find('>li.focus').prev().offset().top}, '500',function(){
                        //DO SOMETHING AFTER SCROLL ANIMATION COMPLETED
                    });
                }
                break;

            default:
                if ($(event.target).closest('div.button.nav').hasClass('enabled')) {
                    questions.find('>li.focus').next().length &&  $('body').animate({scrollTop: questions.find('>li.focus').next().offset().top}, '500',function(){
                        //DO SOMETHING AFTER SCROLL ANIMATION COMPLETED
                    });
                }
                break;
        }
    };
    // functions end;

    $(document).ready(function () {
        init();
    });
})();