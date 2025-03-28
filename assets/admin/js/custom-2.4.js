//datatable
$(document).ready(function () {
    $('#cs_datatable').DataTable({
        "order": [[0, "desc"]],
        "aLengthMenu": [[15, 30, 60, 100], [15, 30, 60, 100, "All"]]
    });
});

$(document).ready(function () {
    $('.select2').select2({
        placeholder: VrConfig.textSelect,
        language: {
            noResults: function () {
                return VrConfig.textNoResult;
            },
            searching: function () {
                return VrConfig.textSearching;
            },
            inputTooShort: function (args) {
                return VrConfig.textEnter2Characters;
            },
            errorLoading: function () {
                return VrConfig.textNoResult;
            }
        },
        dir: VrConfig.directionality
    });

    $('.select2-users').select2({
        placeholder: VrConfig.textSelect,
        allowClear: true,
        minimumInputLength: 2,
        ajax: {
            type: 'POST',
            url: VrConfig.baseURL + '/Admin/loadUsersDropdown',
            dataType: 'json',
            method: 'POST',
            data: function (params) {
                return setAjaxData({q: params.term});
            },
            processResults: function (data) {
                return {
                    results: data.items.map(function (item) {
                        return {
                            id: item.id,
                            text: item.id + ': ' + item.username
                        };
                    })
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        language: {
            noResults: function () {
                return VrConfig.textNoResult;
            },
            searching: function () {
                return VrConfig.textSearching;
            },
            inputTooShort: function (args) {
                return VrConfig.textEnter2Characters;
            },
            errorLoading: function () {
                return VrConfig.textNoResult;
            }
        },
        dir: VrConfig.directionality
    });
});

$('#cb_scheduled').change(function () {
    if (this.checked) {
        $("#date_published_content").show();
        $("#input_date_published").prop('required', true);
    } else {
        $("#date_published_content").hide();
        $("#input_date_published").prop('required', false);
    }
});

//color picker with addon
$(".my-colorpicker").colorpicker();

//datetimepicker
$(function () {
    $('#datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss'
    });
});

//delete item
function deleteItem(url, id, message) {
    Swal.fire({
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: VrConfig.textYes,
        cancelButtonText: VrConfig.textCancel,
    }).then((result) => {
        if (result.isConfirmed) {
            var data = {
                'id': id,
            };
            $.ajax({
                type: 'POST',
                url: VrConfig.baseURL + '/' + url,
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//get menu links by language
function getMenuLinksByLang(val) {
    var data = {
        "lang_id": val
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Admin/getMenuLinksByLang',
        data: setAjaxData(data),
        success: function (response) {
            $('#parent_links').children('option:not(:first)').remove();
            $("#parent_links").append(response);
        }
    });
}

//get parent categories by language
function getParentCategoriesByLang(val, deleteFirst = true) {
    var data = {
        "lang_id": val
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Category/getParentCategoriesByLang',
        data: setAjaxData(data),
        success: function (response) {
            if (deleteFirst) {
                $('#categories').children('option:not(:first)').remove();
                $('#subcategories').children('option:not(:first)').remove();
            } else {
                $('#categories').children('option').remove();
                $('#subcategories').children('option').remove();
            }
            $("#categories").append(response);
        }
    });
}

//set image as album cover
function setAsAlbumCover(val) {
    var data = {
        "image_id": val
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Gallery/setAsAlbumCover',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
}

//get gallery albums by language
function getAlbumsByLang(val) {
    var data = {
        "lang_id": val
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Gallery/getAlbumsByLang',
        data: setAjaxData(data),
        success: function (response) {
            $('#albums').children('option:not(:first)').remove();
            $('#categories').children('option:not(:first)').remove();
            $("#albums").append(response);
        }
    });
}

//get gallery categories by album
function getCategoriesByAlbum(val) {
    var data = {
        "album_id": val
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Gallery/getCategoriesByAlbum',
        data: setAjaxData(data),
        success: function (response) {
            $('#categories').children('option:not(:first)').remove();
            $("#categories").append(response);
        }
    });
}

//approve selected comments
function approveSelectedComments() {
    var commentIds = [];
    $("input[name='checkbox-table']:checked").each(function () {
        commentIds.push(this.value);
    });
    var data = {
        'comment_ids': commentIds,
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Admin/approveSelectedComments',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
};

//delete selected comments
function deleteSelectedComments(message) {
    Swal.fire({
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: VrConfig.textYes,
        cancelButtonText: VrConfig.textCancel,
    }).then((result) => {
        if (result.isConfirmed) {
            var commentIds = [];
            $("input[name='checkbox-table']:checked").each(function () {
                commentIds.push(this.value);
            });
            var data = {
                'comment_ids': commentIds,
            };
            $.ajax({
                type: 'POST',
                url: VrConfig.baseURL + '/Admin/deleteSelectedComments',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//delete selected contact messages
function deleteSelectedContactMessages(message) {
    Swal.fire({
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: VrConfig.textYes,
        cancelButtonText: VrConfig.textCancel,
    }).then((result) => {
        if (result.isConfirmed) {
            var messagesIds = [];
            $("input[name='checkbox-table']:checked").each(function () {
                messagesIds.push(this.value);
            });
            var data = {
                'messages_ids': messagesIds,
            };
            $.ajax({
                type: 'POST',
                url: VrConfig.baseURL + '/Admin/deleteSelectedContactMessages',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//get subcategories
function getSubCategories(val) {
    var data = {
        "parent_id": val
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Category/getSubCategories',
        data: setAjaxData(data),
        success: function (response) {
            $('#subcategories').children('option:not(:first)').remove();
            $("#subcategories").append(response);
        }
    });
}

//delete post main image
$(document).on('click', '#btn_delete_post_main_image', function () {
    var content = '<a class="btn-select-image" data-toggle="modal" data-target="#file_manager_image" data-image-type="main">' +
        '<div class="btn-select-image-inner">' +
        '<i class="fa fa-image"></i>' +
        '<button class="btn">' + VrConfig.textSelectImage + '</button>' +
        '</div>' +
        '</a>';
    document.getElementById("post_select_image_container").innerHTML = content;
    $("#post_image_id").val('');
    $("#video_thumbnail_url").val('');
});

//delete post main image database
$(document).on('click', '#btn_delete_post_main_image_database', function () {
    var data = {
        "post_id": $(this).attr("data-post-id")
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Post/deletePostMainImage',
        data: setAjaxData(data),
        success: function (response) {
            var content = '<a class="btn-select-image" data-toggle="modal" data-target="#file_manager_image" data-image-type="main">' +
                '<div class="btn-select-image-inner">' +
                '<i class="fa fa-image"></i>' +
                '<button class="btn">' + VrConfig.textSelectImage + '</button>' +
                '</div>' +
                '</a>';
            document.getElementById("post_select_image_container").innerHTML = content;
            $("#post_image_id").val('');
            $("#video_thumbnail_url").val('');
        }
    });
});

//delete additional image
$(document).on('click', '.btn-delete-additional-image', function () {
    var fileId = $(this).attr("data-value");
    $('.additional-item-' + fileId).remove();
});

//delete additional image from database
$(document).on('click', '.btn-delete-additional-image-database', function () {
    var fileId = $(this).attr("data-value");
    $('.additional-item-' + fileId).remove();
    var data = {
        "file_id": fileId
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Post/deletePostAdditionalImage',
        data: setAjaxData(data),
        success: function (response) {
        }
    });
});

//set home slider order
$(document).on('input', '.input-slider-post-order', function () {
    var id = $(this).attr('data-id');
    var order = $(this).val();
    var data = {
        'id': id,
        'order': order
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + "/Post/setHomeSliderPostOrderPost",
        data: setAjaxData(data),
        success: function (response) {
        }
    });
});

//set featured order
$(document).on('input', '.input-featured-post-order', function () {
    var id = $(this).attr('data-id');
    var order = $(this).val();
    var data = {
        'id': id,
        'order': order
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + "/Post/setFeaturedPostOrderPost",
        data: setAjaxData(data),
        success: function (response) {
        }
    });
});

//delete selected posts
function deleteSelectePosts(message) {
    Swal.fire({
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: VrConfig.textYes,
        cancelButtonText: VrConfig.textCancel,
    }).then((result) => {
        if (result.isConfirmed) {
            var postIds = [];
            $("input[name='checkbox-table']:checked").each(function () {
                postIds.push(this.value);
            });
            var data = {
                'post_ids': postIds,
            };
            $.ajax({
                type: 'POST',
                url: VrConfig.baseURL + '/Post/deleteSelectedPosts',
                data: setAjaxData(data),
                success: function (response) {
                    location.reload();
                }
            });
        }
    });
};

//post bulk options
function postBulkOptions(operation) {
    var postIds = [];
    $("input[name='checkbox-table']:checked").each(function () {
        postIds.push(this.value);
    });
    var data = {
        'operation': operation,
        'post_ids': postIds,
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Post/postBulkOptionsPost',
        data: setAjaxData(data),
        success: function (response) {
            location.reload();
        }
    });
};

//show video image when there is an img url
$("#video_thumbnail_url").on("input change keyup paste", function () {
    var url = $("#video_thumbnail_url").val();
    var image = '<div class="post-select-image-container">' +
        '<img src="' + url + '" alt="">' +
        '<a id="btn_delete_post_main_image" class="btn btn-danger btn-sm btn-delete-selected-file-image">' +
        '<i class="fa fa-times"></i> ' +
        '</a>' +
        '</div>';
    document.getElementById("post_select_image_container").innerHTML = image;
    $('input[name="post_image_id"]').val('');
});

//show video when there is an embed code
$("#video_embed_code").on("input change keyup paste", function () {
    var embedCode = $("#video_embed_code").val();
    $("#video_embed_preview").attr('src', embedCode);
    $("#video_embed_preview").show();
    if ($("#video_embed_code").val() == '') {
        $("#video_embed_preview").attr('src', '');
        $("#video_embed_preview").hide();
    }
});

//get video from URL
function getVideoFromURL(postType = 'video') {
    var url = $("#video_url").val();
    if (url) {
        var data = {
            'url': url,
        };
        $.ajax({
            type: 'POST',
            url: VrConfig.baseURL + '/Post/getVideoFromURL',
            data: setAjaxData(data),
            success: function (response) {
                var obj = JSON.parse(response);
                if (obj.videoEmbedCode) {
                    $("#video_embed_code").val(obj.videoEmbedCode);
                    $("#video_embed_preview").attr('src', obj.videoEmbedCode);
                    $("#video_embed_preview").show();
                }
                if (obj.videoThumbnail && postType == 'video') {
                    $("#video_thumbnail_url").val(obj.videoThumbnail);
                    var image = '<div class="post-select-image-container">' +
                        '<img src="' + obj.videoThumbnail + '" alt="">' +
                        '<a id="btn_delete_post_main_image" class="btn btn-danger btn-sm btn-delete-selected-file-image">' +
                        '<i class="fa fa-times"></i> ' +
                        '</a>' +
                        '</div>';
                    document.getElementById("post_select_image_container").innerHTML = image;
                }
            }
        });
    }
}

//delete post video
function deletePostVideo(postId) {
    var data = {
        'post_id': postId,
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Post/deletePostVideo',
        data: setAjaxData(data),
        success: function (response) {
            document.getElementById("post_selected_video").innerHTML = " ";
            $(".btn-delete-post-video").hide();
        }
    });
}

//delete selected audio
$(document).on('click', '.btn-delete-selected-audio', function () {
    var itemId = $(this).attr("data-value");
    $('#audio_' + itemId).remove();
});

//delete selected audio from database
$(document).on('click', '.btn-delete-selected-audio-database', function () {
    var postAudioId = $(this).attr("data-value");
    $('#post_selected_audio_' + postAudioId).remove();
    var data = {
        'post_audio_id': postAudioId
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Post/deletePostAudio',
        data: setAjaxData(data),
        success: function (response) {
        }
    });
});

//delete selected file
$(document).on('click', '.btn-delete-selected-file', function () {
    var itemId = $(this).attr("data-value");
    $('#file_' + itemId).remove();
});

//delete selected file from database
$(document).on('click', '.btn-delete-selected-file-database', function () {
    var itemId = $(this).attr("data-value");
    $('#post_selected_file_' + itemId).remove();
    var data = {
        'id': itemId
    };
    $.ajax({
        type: 'POST',
        url: VrConfig.baseURL + '/Post/deletePostFile',
        data: setAjaxData(data),
        success: function (response) {
        }
    });
});

//check all checkboxes
$("#checkAll").click(function () {
    $('input:checkbox').not(this).prop('checked', this.checked);
});

//show hide delete button
$('.checkbox-table').click(function () {
    if ($(".checkbox-table").is(':checked')) {
        $(".btn-table-delete").show();
    } else {
        $(".btn-table-delete").hide();
    }
});

//set ai writer editor id
function setAIWriterEditorId(id) {
    $('#formAIWriter input[name="editor_id"]').val(id);
}

//generate text with ai
$(document).on('submit', '#formAIWriter', function (e) {
    e.preventDefault();
    $('.buttons-ai-writer button').prop('disabled', true);
    //reset
    $('#generatedContentAIWriter').html('');
    $('#generatedContentAIWriter').hide();

    var form = $(this);
    var topic = form.find("textarea[name='topic']").val();
    if (!topic || topic.trim() === '') {
        $('.buttons-ai-writer button').prop('disabled', false);
        Swal.fire({text: VrConfig.textTopicEmpty, icon: "warning", confirmButtonText: VrConfig.textOk});
        return false;
    }
    $('#spinnerAIWriter').show();
    var formData = form.serializeArray();
    formData = setSerializedData(formData);
    $.ajax({
        url: VrConfig.baseURL + '/Ajax/generateTextAI',
        type: 'POST',
        data: formData,
        success: function (response) {
            $('.buttons-ai-writer button').prop('disabled', false);
            $('#spinnerAIWriter').hide();
            var obj = JSON.parse(response);
            if (obj.status === 'error') {
                Swal.fire({text: obj.message, icon: "warning", confirmButtonText: VrConfig.textOk});
            } else if (obj.status === 'success') {
                $('#generatedContentAIWriter').html(obj.content);
                $('#generatedContentAIWriter').show();
                $('#btnAIGenerate').hide();
                $('#btnAIRegenerate').show();
                $('#btnAIUseText').show();
                $('#btnAIReset').show();
            } else {
                console.error("Unexpected response format.");
            }
        },
        error: function (error) {
            $('.buttons-ai-writer button').prop('disabled', false);
        }
    });
});

//add ai content to editor
$(document).on('click', '#btnAIUseText', function () {
    const editorId = $('#formAIWriter input[name="editor_id"]').val();
    const content = $('#generatedContentAIWriter').html();
    const editor = tinymce.get(editorId);
    if (editor) {
        editor.insertContent(content);
        $('#modalAiWriter').modal('hide');
        resetFormAIWriter();
    } else {
        console.log('Editor not found');
    }
});

//reset ai writer form
function resetFormAIWriter() {
    $('#formAIWriter')[0].reset();
    $('#generatedContentAIWriter').html('');
    $('#generatedContentAIWriter').hide();
    $('#btnAIGenerate').show();
    $('#btnAIRegenerate').hide();
    $('#btnAIUseText').hide();
    $('#btnAIReset').hide();
}

//bootstrap tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

//admin index counters
$('.increase-count').each(function () {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
        duration: 1000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

//disable for 5 seconds
$(document).on('click', '.btn-submit-disable', function () {
    $('.btn-submit-disable').prop('disabled', true);
    setTimeout(function () {
        $('.btn-submit-disable').prop('disabled', false);
    }, 2000);
});

//price input
$('.price-input').keypress(function (event) {
    var $this = $(this);
    if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
        ((event.which < 48 || event.which > 57) &&
            (event.which != 0 && event.which != 8))) {
        event.preventDefault();
    }
    var text = $(this).val();
    if ((text.indexOf('.') != -1) &&
        (text.substring(text.indexOf('.')).length > 2) &&
        (event.which != 0 && event.which != 8) &&
        ($(this)[0].selectionStart >= text.length - 2)) {
        event.preventDefault();
    }
});

//display selected images before upload
$(document).on('change', '#Multifileupload', function () {
    var MultifileUpload = document.getElementById("Multifileupload");
    if (typeof (FileReader) != "undefined") {
        var MultidvPreview = document.getElementById("MultidvPreview");
        MultidvPreview.innerHTML = "";
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        for (var i = 0; i < MultifileUpload.files.length; i++) {
            var file = MultifileUpload.files[i];
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement("IMG");
                img.height = "100";
                img.width = "100";
                img.src = e.target.result;
                img.id = "Multifileupload_image";
                MultidvPreview.appendChild(img);
                $("#Multifileupload_button").show();
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert("This browser does not support HTML5 FileReader.");
    }
});


//sanitize url
function sanitizeUrl(url) {
    url = url.replace(/&amp;/g, '&');
    const validUrlPattern = /^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;%=]+$/;
    if (!validUrlPattern.test(url)) {
        return '';
    }
    if (url.toLowerCase().includes("javascript:")) {
        return '';
    }
    let urlObj = new URL(url);
    let params = new URLSearchParams(urlObj.search);
    params.forEach((value, key) => {
        if (params.getAll(key).length > 1) {
            params.delete(key);
            params.append(key, value);
        }
    });
    urlObj.search = params.toString();
    return urlObj.href;
}

//add back url to the forms
$(document).ready(function () {
    $('form[method="post"]').each(function () {
        if ($(this).find('input[name="back_url"]').length === 0) {
            let backUrl = window.location.href;
            backUrl = sanitizeUrl(backUrl);
            if (backUrl) {
                $(this).append('<input type="hidden" name="back_url" value="' + backUrl + '">');
            }
        }
    });
});

