## Install &  Setup

gulp && gulp watch

## server start

node server

## API
### Question list request example

GET `/api/questions/`

### Response example
```javascript
{
    "fields": [{
        "id": 0,
        "type": "statement" | "textfield" | "list" | "images-list",
        "multiple": true | false,
        "question": "",
        "description": "",
        "choices": [{
            "id": 0,
            "label": "",
            "image": "src" | null
        }] | null,
        "attachment": {
            "type": "audio" | "video",
            "src_poster": "image_src",
            "src_path": "file_src",
            "src_type": "youtube" | "vimeo" | "file_extension",
            "src_id": "youtube_video_id" | "vimeo_video_id" | null
        } | null
    }]
}
```

### Answer reply request example

GET `/api/check-question/?id=0&value=input_val`

`value = input_val | [choices_ids]`

### Response example
```javascript
{
    "go_to_another_question": 0 | null,
    "total_progression": 0 | null,
    "result": {
        "status": "success" | "error",
        "msg": ""
    }
}
```