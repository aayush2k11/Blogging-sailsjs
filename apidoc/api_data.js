define({ "api": [
  {
    "type": "version",
    "url": "0.0.0",
    "title": "",
    "name": "displayBlog",
    "group": "Blog",
    "description": "<p>API displays the blog with <code>id</code> and displays blog owner name, comment, each comment's owner</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>Blog unique ID.</p> "
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "blog-id",
            "description": "<p>Blog unique blog-id</p> "
          }
        ]
      }
    },
    "permission": [
      {
        "name": "Logged-In User"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the blog.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "blogowner",
            "description": "<p>User who wrote the blog</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "content",
            "description": "<p>Content of the blog</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>comments</p> ",
            "optional": false,
            "field": "Comments",
            "description": "<p>added to the blog</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BlogNotFound",
            "description": "<p>The blog with <code>id</code> was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"BlogNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Get Blog:",
        "content": "GET http://10.0.1.2:1337/blog/12",
        "type": "GET"
      }
    ],
    "version": "0.0.0",
    "filename": "api/controllers/BlogController.js",
    "groupTitle": "Blog"
  },
  {
    "type": "version",
    "url": "0.0.0",
    "title": "",
    "name": "CreateComment",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>Blog unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "content",
            "description": "<p>Content of the Comment.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"Content\": \"John\",\n  \"lastname\": \"Doe\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BlogNotFound",
            "description": "<p>The <code>id</code> of the blog was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"BlogNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/CommentController.js",
    "groupTitle": "Comment"
  }
] });