# ui-sandbox

## Bucket data structure

### Posts

- The `posts` directory is located in the root of the bucket
- Contains `<postGroup>` directories
- Has a `posts.json` file that holds the metadata for the `/posts` page
- Has a `posts.md` file that contains a lean markup for the `/posts` page

### Post groups
- A `<postGroup>` directory must be located in the `/posts` directory
- It's name can be anything that is valid in the url like _articles_, _web-design_, etc.
- Contains `<postId>` directories
- Has a `<postGroup>.json` file that holds the metadata for the `/posts/<postGroup>` page
- Has a `<postGroup>.md` file that contains a lean markup for the `/posts/<postGroup>` page

### Post
- A `<postId>` directory must be located in the `/posts/<postGroup>` directory
- It's name can be anything that is valid in the url like _css-basics_, _daily-things_, etc.
- Has a `<postId>.json` file that holds the metadata for the `/posts/<postGroup>/<postId>` page
- Has a `<postId>.md` file that contains the markup for the `/posts/<postGroup>/<postId>` page

### \<metaData\>.json file structure
```json
{
	"description": "Description of the page that can be displayed on a listing page and in the pages SEO description",
	"keywords": [
		"keywords",
		"that relate",
		"to the page"
	],
	"title": "Title that will be displayed on listing pages, SEO and browser tab title"
}
```

### Markdown good to knows

- A `.md` file should always start with a `h1` and must not contain more than one (not strict, but good for SEO)
- Images referenced from the bucket wont be available when the file is opened standalone (not in the browser)

### Uploadable assets

- Assets that are dynamic (uploaded to the bucket) must go in the `/assets` folder, located in the root of the bucket
- These assets will then be accessible `/bucket/assets`.