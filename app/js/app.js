(function () {
    var questions = $('.form ul.questions'),
        progressBar = $('#progress'),
        progressBarCounter = 0,
        progressLabel = progressBar.find('.label span'),
        progressPercent = progressBar.find('.bar .progress');
    // variables end;

    var init = function (initOptions) {
        if (initOptions && initOptions.progressBarConfig) {
            progressBarInit(initOptions.progressBarConfig);
        } else {
            progressBarInit();
        }
        // add responsive margins
        responsiveMargins(10, 70);
        $(window).resize(responsiveMargins.bind(null, 10, 70));
        // add focus
        $(window).scroll(focusQuestion);
        $(window).trigger('scroll');
        // btn navigation
        $('.button-wrapper .button').on('click', navigationHandler);
        // enable btn navigation
        checkNavigationBtns(questions.find('>li.focus'));
        // enter handler
        $('body').on('keyup', enterHandler);
        // init plyr
        plyr.setup('.plyr');
        // mobile config
        mobileConfigInit();
        $(window).resize(mobileConfigInit);
    },

    mobileConfigInit = function () {
      // one_question_per_page
      if (window.appOptions.mobile.one_question_per_page && $(window).width() < 768) {
        if (!$('#mobileStyles').length) {
          var mobileStyles = '.form .questions > li {visibility: hidden;}' +
              '.form .questions > li.focus {visibility: visible;}';
          var styleTag = $('<style/>', {id: 'mobileStyles'}).html(mobileStyles);
          $(document.head).append(styleTag);
        }
      } else {
        $('#mobileStyles').length && $('#mobileStyles').remove();
      }
      // one_question_per_page end;
    },

    addAttachment = function (li, questionModel) {
        switch (questionModel.attachment.type) {
            case "image":
                $('<div style="margin-bottom: 33px;" class="image">' +
                    '<img class="img-responsive" src="'+ questionModel.attachment.src_path +'">' +
                    '</div>').insertBefore(li.find('.content .content-wrapper'));
              break;

            case "audio":
                $('<div style="margin-bottom: 33px;" class="plyr">' +
                    '<audio controls crossorigin>'+
                    '<!-- Audio files -->' +
                    '<source src="'+ questionModel.attachment.src_path +'" type="audio/'+ questionModel.attachment.src_type +'">' +

                    '<!-- Fallback for browsers that don\'t support the <audio> element -->' +
                    '<a href="'+ questionModel.attachment.src_path +'">Download audio</a>' +
                    '</audio>' +
                    '</div>').insertBefore(li.find('.content .content-wrapper'));
                break;

            case "video":
                var videoContainer = '';

                switch (questionModel.attachment.src_type) {
                    case "youtube":
                        videoContainer = '<div data-video-id="'+questionModel.attachment.src_id+'" data-type="youtube"></div>';
                        break;

                    case "vimeo":
                        videoContainer = '<div data-video-id="'+questionModel.attachment.src_id+'" data-type="vimeo"></div>';
                        break;

                    default:
                        videoContainer = '<video poster="'+ questionModel.attachment.src_poster +'" controls crossorigin>'+
                            '<!-- Video files -->' +
                            '<source src="'+ questionModel.attachment.src_path +'" type="video/'+ questionModel.attachment.src_type +'">' +

                            '<!-- Fallback for browsers that don\'t support the <audio> element -->' +
                            '<a href="'+ questionModel.attachment.src_path +'">Download video</a>' +
                            '</video>';
                        break;
                }

                $('<div style="margin-bottom: 33px;" class="plyr">' +
                    videoContainer +
                    '</div>').insertBefore(li.find('.content .content-wrapper'));
                break;
        }
    },

    questionsInit = function () {
        var questionsNumerator = 0,
            lettersNumerator = 65,
            isSection = false,
            questionsList = [],
            questionsListModel = {
                "fields": []
            };

        selfAPI.get(function (response) {
            if (response.data && response.data.fields) {
                $.each(response.data.fields, function (index, field) {
                    questionsListModel.fields.push(field);
                });
            }

            questionsListModel.fields.length && questionsListModel.fields.forEach(function (questionModel, index) {
                var li = $('<li/>', {"id": questionModel.id, "data-model": JSON.stringify(questionModel)});

                if (index == 0) {
                    li.addClass('focus');
                }

                switch (questionModel.type) {
                    case "statement":
                    case "section":
                        // reset lettersNumerator
                        lettersNumerator = 65;

                        isSection = questionModel.type === "section";

                        li.addClass(questionModel.type);
                        li.html('<div class="wrapper">' +
                            '<div class="item">'+ (questionModel.type === "section" ? '<span>'+(++questionsNumerator)+'</span>' : '“') +
                            '<div '+ (questionModel.type === "section" ? '' : 'style="display:none;"') +' class="arrow">' +
                            '<div class="arrow-right"></div>' +
                            '</div>' +
                            '</div>' +
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
                        !isSection && questionsNumerator++;
                        li.addClass(questionModel.type);
                        li.html('<div class="wrapper">' +
                            '<div class="item">' +
                            '<span>'+ (isSection ? String.fromCharCode(lettersNumerator++).toLowerCase()+'.' : questionsNumerator) +'</span>' +
                            '<div class="arrow">' +
                            '<div '+ (isSection ? 'style="display:none;"' : '') +' class="arrow-right"></div>' +
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
                            chCode = 65,
                            otherClick = false;
                        // end variables;

                        var choicesClickHandler = function (event) {
                            var currLi = $(event.target).closest('li'),
                                currLiInitailState = currLi.clone(),
                                otherClick = currLi.closest('li').attr('id') === "Other" && !currLi.hasClass('editable');
                            // end variables;

                            var otherClickHandler = function () {
                              if (!currLi.hasClass('locked')) {
                                var letter = currLi.find('.letter span').text().charCodeAt(0);

                                currLi.html('<div class="input"><input class="" type="text" autocomplete="off" value="'+currLi.find('input[name="value"]').val()+'"></div>')
                                  .addClass('locked')
                                  .find('.input input').focus()
                                  .one('blur', function (event) {
                                    if (!currLi.hasClass('editable')) {
                                      currLiInitailState.find('.letter span').text(String.fromCharCode(chCode).toUpperCase());
                                      currLiInitailState.on('click', choicesClickHandler);
                                      chCode++;
                                    }


                                    currLi.html('<input type="hidden" name="value" value="'+ $(this).val() +'" autocomplete="off">' +
                                    '<div class="letter"><span>'+ String.fromCharCode(letter).toUpperCase() +'</span></div>' +
                                    '<span class="label">'+ $(this).val() +' <span class="glyphicon glyphicon-pencil" style="font-size: 15px;"></span> <span class="glyphicon glyphicon-remove" style="font-size: 15px;"></span></span>' +
                                    '<span class="tick glyphicon glyphicon-ok"></span>' +
                                    '<div class="aux ">' +
                                    '<div class="inset"></div>' +
                                    '<div class="bg"></div>' +
                                    '<div class="bd"></div>' +
                                    '<div class="overlay"></div>' +
                                    '</div>').removeClass('locked').addClass('editable').after(currLiInitailState);

                                    currLi.find('.glyphicon-pencil').one('click', function (event) {
                                        otherClickHandler();
                                    });

                                    currLi.find('.glyphicon-remove').one('click', function (event) {
                                      currLi.nextUntil('ul').each(function (index, value) {
                                        var letter = $(value).find('.letter span').text().charCodeAt(0);
                                        $(value).find('.letter span').text(String.fromCharCode(--letter).toUpperCase());
                                      });
                                      currLi.remove();
                                      chCode--;
                                    });
                                  });
                                }
                            };
                            // end functions;

                            if (!questionModel.multiple) {
                              if (!otherClick) {
                                questions.find('ul.columns > li').removeClass('selected');
                                currLi.addClass('selected');
                                // quick-validate
                                if (li.hasClass('quick-validate')) {
                                  li.find('.button.nav').trigger('click');
                                }
                              } else if (!currLi.hasClass('editable')) {
                                otherClickHandler();
                              }
                            } else {
                              if (!otherClick) {
                                currLi.toggleClass('selected');
                              } else if (!currLi.hasClass('editable')) {
                                otherClickHandler();
                              }
                            }
                        };
                        // end functions;

                        !isSection && questionsNumerator++;
                        li.addClass('list'+ (questionModel.multiple ? ' multiple' : '') + (questionModel['quick-validate'] ? ' quick-validate' : ''));
                        li.html('<div class="wrapper">' +
                            '<div class="item">' +
                            '<span>'+ (isSection ? String.fromCharCode(lettersNumerator++).toLowerCase()+'.' : questionsNumerator) +'</span>' +
                            '<div class="arrow">' +
                            '<div '+ (isSection ? 'style="display:none;"' : '') +' class="arrow-right"></div>' +
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
                                '<input type="hidden" name="value" value="'+ choiceModel.id +'" autocomplete="off">' +
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
                        li.find('ul.columns > li').on('click', choicesClickHandler);
                        break;

                    case "images-list":
                        var choicesList = [],
                            chCode = 65;

                        !isSection && questionsNumerator++;
                        li.addClass('images list'+ (questionModel.multiple ? ' multiple' : ''));
                        li.html('<div class="wrapper">' +
                            '<div class="item">' +
                            '<span>'+ (isSection ? String.fromCharCode(lettersNumerator++).toLowerCase()+'.' : questionsNumerator) +'</span>' +
                            '<div class="arrow">' +
                            '<div '+ (isSection ? 'style="display:none;"' : '') +' class="arrow-right"></div>' +
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
                        li.find('ul.columns > li').on('click', function (event) {
                            if (!questionModel.multiple) {
                                questions.find('ul.columns > li').removeClass('selected');
                                $(event.target).closest('li').addClass('selected');
                            } else {
                                $(event.target).closest('li').toggleClass('selected');
                            }
                        });
                        break;
                }

                // attachment add:
                if (questionModel.attachment && questionModel.attachment.type) {
                    addAttachment(li, questionModel);
                }
                questionsList.push(li);
            });

            questions.append(questionsList);
            // add all handlers
            if (response.data && response.data.total_progression) {
                init({progressBarConfig: {total: response.data.total_progression}});
            } else {
                init();
            }
        }, '/questions/');
    },

    progressBarInit = function (options) {
        var allCount = questions.find('>li:not([class*="statement"]):not([class*="section"])').length,
            answeredCount = (options && options.total) ? options.total : progressBarCounter,
            percent = answeredCount*100/allCount;

        progressLabel.text(answeredCount + ' of '+ allCount +' answered');
        progressPercent.css('width', percent+'%');

        // enable submit btn
        if (percent === 100) {
            $('#unfixed-footer .submit .button').removeClass('disabled').addClass('enabled');
        }
    },

    responsiveMargins = function (marginTopPercent, marginBottomPercent) {
        questions.attr('style', 'margin-top: '+ parseInt(window.innerHeight/100*marginTopPercent) +'px; margin-bottom: '+ parseInt(window.innerHeight/100*marginBottomPercent) +'px;');
    },

    focusQuestion = function (event) {
        var currentY = $(window).scrollTop() + parseInt(window.innerHeight/100*10);

        questions.find('>li').length && $.each(questions.find('>li'), function (index, question) {
            if (currentY >= question.offsetTop && currentY <= question.offsetTop + question.offsetHeight) {
                if (!$(question).hasClass('focus')) {
                  $(question).addClass('focus');

                  questions.find('input').blur();
                  $(question).find('input').focus();

                  // if user don't reply on previos question, make different li style
                  var prevQuestion = $(question).prev(':not([class*="statement"]):not([class*="section"])');
                  prevQuestion.length
                  && !prevQuestion.hasClass('aswered')
                  && prevQuestion.addClass('dirty');
                }
                // enable btn navigation
                checkNavigationBtns(question);
            } else {
                $(question).removeClass('focus');
            }
        });

        // submit is visible?
        var submitHeight = $(document).height() - ($(window).scrollTop() + window.innerHeight);
        if (submitHeight <= parseInt(window.innerHeight/100*30)) {
            $('#unfixed-footer').show(500);
        } else if ($('#unfixed-footer').is(':visible')) {
            $('#unfixed-footer').hide(500);
        }
    },

    checkNavigationBtns = function (currentEl) {
        if ($(currentEl).prev().length) {
            $('.button-wrapper.up .button.nav').removeClass('disabled').addClass('enabled');
        } else {
            $('.button-wrapper.up .button.nav').removeClass('enabled').addClass('disabled');
        }

        if ($(currentEl).next().length) {
            $('.button-wrapper.down .button.nav').removeClass('disabled').addClass('enabled');
        } else {
            $('.button-wrapper.down .button.nav').removeClass('enabled').addClass('disabled');
        }
    },

    gotoGuestion = function (questions, currentQuestion, qotoQuestion) {
        if (!window.appOptions.old_questions_editables) {
          currentQuestion.nextUntil('#' + qotoQuestion).addClass('locked');
          currentQuestion.nextUntil('#' + qotoQuestion).find('.input input').prop('readonly', true);
          currentQuestion.nextUntil('#' + qotoQuestion).find('ul.columns > li').off('click');
          currentQuestion.nextUntil('#' + qotoQuestion).find('.message').html('<p style="color: lawngreen;margin: 5px 0;">Answer accepted successfully!</p>');
        }
        questions.find('>li.focus').next().length &&  $('body').stop( true, true ).animate({scrollTop: $('#'+qotoQuestion).offset().top - parseInt(window.innerHeight/100*3)}, '500',function(){
            //DO SOMETHING AFTER SCROLL ANIMATION COMPLETED
        });
    },

    navigationHandler = function (event) {
        var btnType = $(event.target).closest('div.button-wrapper')[0],
            btnType = btnType.classList[btnType.classList.length-1];

        switch (btnType) {
            case "up":
                if ($(event.target).closest('div.button.nav').hasClass('enabled')) {
                    questions.find('>li.focus').prev().length && $('body').animate({scrollTop: questions.find('>li.focus').prev().offset().top - parseInt(window.innerHeight/100*3)}, '500',function(){
                        //DO SOMETHING AFTER SCROLL ANIMATION COMPLETED
                    });
                }
                break;

            default:
                var currentQuestion = questions.find('>li.focus');
                    questType = currentQuestion.data('model') && currentQuestion.data('model').type,
                    qotoQuestion = '';

                if (!currentQuestion.hasClass('locked')) {
                    switch (questType) {
                        case "statement":
                        case "section":
                            break;

                        case "textfield":
                            var answerModel = {
                                id: currentQuestion.data('model').id,
                                value: currentQuestion.find('.input input').val()
                            };

                            currentQuestion.find('.message ').html('');

                            if (currentQuestion.find('.input input').val()) {
                                // sending api request
                                selfAPI.get(function (response) {
                                    if (response.data.result.status === "success") {
                                        if (!currentQuestion.hasClass('aswered')) {
                                          progressBarCounter++;
                                          currentQuestion.removeClass('dirty').addClass('aswered');
                                        }

                                        if (!window.appOptions.old_questions_editables) {
                                          currentQuestion.addClass('locked');
                                          currentQuestion.find('.input input').prop('readonly', true);
                                        }
                                        if (response.data.total_progression) {
                                            progressBarInit({total: response.data.total_progression});
                                        } else {
                                            progressBarInit();
                                        }

                                        if (response.data.result.msg) {
                                            currentQuestion.find('.message').html('<p style="color: lawngreen;margin: 5px 0;">'+ response.data.result.msg +'</p>');
                                        }

                                        if (response.data.go_to_another_question) {
                                            var qotoQuestion = response.data.go_to_another_question;

                                            gotoGuestion(questions, currentQuestion, qotoQuestion);
                                        }
                                    } else {
                                        if (response.data.result.msg) {
                                            currentQuestion.find('.message').html('<p style="color: red;margin: 5px 0;">'+ response.data.result.msg +'</p>');
                                        }
                                    }
                                }, '/check-question/', null, {data: answerModel});

                            } else {
                                currentQuestion.find('.input input').focus();
                                currentQuestion.find('.message').html('<p style="color: red;margin: 5px 0;">Sorry, but you must to answer...</p>');
                                return;
                            }
                            break;

                        case "list":
                        case "images-list":
                            var answerModel = {
                                id: currentQuestion.data('model').id,
                                value: []
                            };

                            currentQuestion.find('.message').html('');

                            if (currentQuestion.find('ul.columns > li.selected').length) {
                                $.each(currentQuestion.find('ul.columns > li.selected input'), function (index, field) {
                                    answerModel.value.push(field.value);
                                });
                                // sending api request
                                selfAPI.get(function (response) {
                                    if (response.data.result.status === "success") {
                                        if (!currentQuestion.hasClass('aswered')) {
                                          progressBarCounter++;
                                          currentQuestion.removeClass('dirty').addClass('aswered');
                                        }

                                        if (!window.appOptions.old_questions_editables) {
                                          currentQuestion.addClass('locked');
                                          currentQuestion.find('ul.columns > li').off('click');
                                        }
                                        if (response.data.total_progression) {
                                            progressBarInit({total: response.data.total_progression});
                                        } else {
                                            progressBarInit();
                                        }

                                        if (response.data.result.msg) {
                                            currentQuestion.find('.message').html('<p style="color: lawngreen;margin: 5px 0;">'+ response.data.result.msg +'</p>');
                                        }

                                        if (response.data.go_to_another_question) {
                                            var qotoQuestion = response.data.go_to_another_question;

                                            gotoGuestion(questions, currentQuestion, qotoQuestion);
                                        }
                                    } else {
                                        if (response.data.result.msg) {
                                            currentQuestion.find('.message').html('<p style="color: red;margin: 5px 0;">'+ response.data.result.msg +'</p>');
                                        }
                                    }
                                }, '/check-question/', null, {data: answerModel});
                            } else {
                                currentQuestion.find('.message').html('<p style="color: red;margin: 5px 0;">Sorry, but you must to answer...</p>');
                                return;
                            }
                            break;
                    }
                }

                if ($(event.target).closest('div.button.nav').hasClass('enabled')) {
                    questions.find('>li.focus').next().length &&  $('body').animate({scrollTop: questions.find('>li.focus').next().offset().top - parseInt(window.innerHeight/100*3)}, '500',function(){
                        //DO SOMETHING AFTER SCROLL ANIMATION COMPLETED
                    });
                }
                break;

            case "submit":
                var currentQuestion = questions.find('>li.focus');

                if (!currentQuestion.hasClass('locked')) {
                    currentQuestion.find('.button.nav').trigger('click');
                }

                if ($(event.target).closest('div.button').hasClass('enabled')) {
                    // sending api request
                }
                break;
        }
    },

    enterHandler = function (event) {
        if (event.which === 13) {
            if (questions.find('>li.focus').next().length) {
                questions.find('>li.focus .button-wrapper .button').trigger('click');
            } else {
                $('.button-wrapper.submit .button').trigger('click');
            }
        }
    };
    // functions end;

    $(document).ready(function () {
        questionsInit();
    });
})();
