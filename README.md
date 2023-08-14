# Mid Term - Gigih BE
 
## About  project :
This is backend project for Tokopedia play

### How to run ?
- clone this repository
- create .env file and write `DB_URL = "mongodb://localhost:27017/tokopedia-play"`
- run `node populate.js`
- run `npm install`
- run `npm run start`

## Database Structure

### Comments
- username (String, required)
- comment (String)
- createdAt (Date, default: Date.now)

### Products

- title (String, required)
- url (String, required)
- price (Number, required)

### Videos

- title (String, required)
- url (String, required)
- thumbnail (String, required)
- shop (String, required)
- views (String, required)
- comments ([ObjectId], optional)
- products ([ObjectId], optional)

## API Structure

### Get all videos:

* URL: `/api/videos`
* Method: `GET`
* URL Params: None
* Data Params: None
* Headers: `Content-Type: application/json`
* Success Response: 200
```json
[ 
  {
    "_id": "video_id_2",
    "title": "Video Title 2",
    "url": "https://example.com/video2",
    "thumbnail": "https://example.com/thumbnail2",
    "comments": ["comment_id_3", "comment_id_4"],
    "products": ["product_id_3", "product_id_4"]
  },
]
```
### Get a specific video by ID:

* URL: `/api/videos/:id`
* Method: `GET`
* URL Params: `id`
* Data Params: None
* Headers: `Content-Type: application/json`
* Success Response: 200
Content:
```json
{
  "_id": "video_id_1",
  "title": "Video Title 1",
  "url": "https://example.com/video1",
  "thumbnail": "https://example.com/thumbnail1",
  "comments": ["comment_id_1", "comment_id_2"],
  "products": ["product_id_1", "product_id_2"]
}
```

### Create a new video:

* URL: `/api/videos`
* Method: `POST`
* URL Params: None
* Data Params:
```
title - The title of the video. (String, required)
url - The URL of the video. (String, required)
thumbnail - The URL of the video thumbnail. (String, required)
```
* Headers: `Content-Type: application/json`
Success Response: `200`
Content:
```json
{
  "_id": "newly_created_video_id",
  "title": "New Video Title",
  "url": "https://example.com/new_video",
  "thumbnail": "https://example.com/new_thumbnail",
  "comments": [],
  "products": []
}
```
### Update a video by ID:

* URL:`/api/videos/:id`
* Method: PUT
* URL Params: `id - The unique identifier of the video to update.`
Data Params:
```
title - (Optional) The updated title of the video. (String)
url - (Optional) The updated URL of the video. (String)
thumbnail - (Optional) The updated URL of the video thumbnail. (String)
```
Headers: `Content-Type: application/json`
Success Response:`200`
Content:
```json
{
  "_id": "video_id_1",
  "title": "Updated Video Title",
  "url": "https://example.com/updated_video",
  "thumbnail": "https://example.com/updated_thumbnail",
  "comments": ["comment_id_1", "comment_id_2"],
  "products": ["product_id_1", "product_id_2"]
}
```

### Delete a video by ID:
* URL: `/api/videos/:id`
* Method: `DELETE`
* URL Params: `id - The unique identifier of the video to delete.`
Data Params: None
Headers: `Content-Type: application/json`
Success Response: `200`
Content:
```json
{
  "message": "Video deleted"
}
```
### Get all comments:
* URL: `/api/comments`
* Method : `GET`
* URL Params: None
* Data Params: None
* Headers: `Content-Type: application/json`
* Success Response:`200`
* Content:
```json
[
  {
    "_id": "comment_id_1",
    "username": "user1",
    "comment": "This is a comment 1"
  },
  {
    "_id": "comment_id_2",
    "username": "user2",
    "comment": "This is a comment 2"
  },
  ...
]
```
### Create a new comment:
* URL: `/api/comments`
* Method : `POST`
* URL Params: None
* Data Params:
```
username - The username of the commenter. (String, required)
comment - The comment text. (String, required)
```
* Headers: `Content-Type: application/json`
* Success Response: `200`
* Content:
```json
{
  "message": "Comment created",
  "newComment": {
    "_id": "newly_created_comment_id",
    "username": "new_user",
    "comment": "This is a new comment"
  }
}
```

### Create a new product:

* URL: `/api/products`
* URL Params: None
* Data Params:
```title - The title of the product. (String, required)
url - The URL of the product. (String, required)
price - The price of the product. (Number, required)
```
* Headers:`Content-Type: application/json`
Success Response:`200`
Content:
```json
{
  "_id": "newly_created_product_id",
  "title": "New Product Title",
  "url": "https://example.com/new_product",
  "price": 25.99
}
```

### Get all products:

* URL: `/api/products`
* URL Params: None
* Data Params: None
* Headers: `Content-Type: application/json`
Success Response:`200`
Content:
```json
[
  {
    "_id": "product_id_1",
    "title": "Product Title 1",
    "url": "https://example.com/product1",
    "price": 19.99
  },
  {
    "_id": "product_id_2",
    "title": "Product Title 2",
    "url": "https://example.com/product2",
    "price": 29.99
  },
]
```

### Get a specific product by ID:

URL: `/api/products/:id`
URL Params:
```id - The unique identifier of the product.```
Data Params: None
Headers:`Content-Type: application/json`
Success Response: `200`
Content:
```json
{
  "_id": "product_id_1",
  "title": "Product Title 1",
  "url": "https://example.com/product1",
  "price": 19.99
}
```

### Update a product by ID:

* URL: /api/products/:id
* URL Params:
* id - The unique identifier of the product to update.
* Data Params:
``` title - (Optional) The updated title of the product. (String)
url - (Optional) The updated URL of the product. (String)
price - (Optional) The updated price of the product. (Number)
```
* Headers: `Content-Type: application/json`
* Success Response: `200`
Content:
```json
{
  "_id": "product_id_1",
  "title": "Updated Product Title",
  "url": "https://example.com/updated_product",
  "price": 24.99
}
```

### Delete a product by ID:

URL: `/api/products/:id`
URL Params:
```
id - The unique identifier of the product to delete.
```
Data Params: None
Headers: `Content-Type: application/json`
Success Response: `200`
Content:
```json
{
  "message": "Product deleted"
}
```
