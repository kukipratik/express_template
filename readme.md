# Standard API Response Formats (All Cases)

### 1. **Standard Success Response (Single Object)**

```json
{
  "success": true,
  "message": "Item fetched successfully.",
  "data": {
    "id": 123,
    "name": "Example Item",
    "created_at": "2024-07-03T15:00:00Z"
  }
}
```

### 2. **Standard Success Response (List of Items)**

**(a) Simple List**

```json
{
  "success": true,
  "message": "Items fetched successfully.",
  "data": [
    {
      "id": 1,
      "name": "Item One"
    },
    {
      "id": 2,
      "name": "Item Two"
    }
  ]
}
```

**(b) List with Metadata (Recommended for Pagination)**

```json
{
  "success": true,
  "message": "Items fetched successfully.",
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Item One"
      },
      {
        "id": 2,
        "name": "Item Two"
      }
    ],
    "total": 120,
    "page": 1,
    "pageSize": 10
  }
}
```

### 3. **Standard Error Response**

```json
{
  "success": false,
  "message": "Something went wrong. Please try again later.",
  "error_code": "SERVER_ERROR"
}
```

### 4. **Validation Error Response**

```json
{
  "success": false,
  "message": "Validation failed.",
  "error_code": "VALIDATION_ERROR",
  "errors": {
    "email": ["Email is required.", "Email must be valid."],
    "password": ["Password is too short."]
  }
}
```

### 5. **Authentication Error Response**

```json
{
  "success": false,
  "message": "Authentication required.",
  "error_code": "AUTH_REQUIRED"
}
```

### 6. **Not Found Error**

```json
{
  "success": false,
  "message": "Resource not found.",
  "error_code": "NOT_FOUND"
}
```

### 7. **Forbidden Error**

```json
{
  "success": false,
  "message": "You do not have permission to perform this action.",
  "error_code": "FORBIDDEN"
}
```

### 8. **Bad Request Error**

```json
{
  "success": false,
  "message": "Bad request. Please check your input.",
  "error_code": "BAD_REQUEST"
}
```

### 9. **Custom Response for Actions (e.g., Delete, Update)**

```json
{
  "success": true,
  "message": "Item deleted successfully.",
  "data": null
}
```

---

# Error Codes

Define your error codes in a single place to keep everything consistent and avoid typos:

```js
const ErrorCodes = {
  SERVER_ERROR: 'SERVER_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  BAD_REQUEST: 'BAD_REQUEST'
};
```

**Usage:**

* Always use the correct `error_code` in your error responses for clarity and consistency.
* Import and use these codes in your backend helper functions.

---

# Understanding HTTP Status Codes in API Responses

HTTP status codes are essential in RESTful APIs. They’re used to communicate the result of a client’s request—**before** the frontend even looks at your JSON response. Using the right status code makes your API predictable, easier to debug, and fully compatible with modern frontend tools (like Flutter’s Dio, React’s Axios, etc).

## **Common Status Codes and When to Use Them**

| Status Code | Name/Meaning          | When to Use                                              |
| ----------- | --------------------- | -------------------------------------------------------- |
| **200**     | OK                    | General success (GET, PUT, DELETE, etc.)                 |
| **201**     | Created               | Resource created (POST)                                  |
| **204**     | No Content            | Success, but no response body (e.g., delete succeeded)   |
| **400**     | Bad Request           | Client error (missing params, invalid format, etc.)      |
| **401**     | Unauthorized          | Authentication required/failed                           |
| **403**     | Forbidden             | Authenticated, but not allowed to access resource        |
| **404**     | Not Found             | Resource doesn’t exist                                   |
| **409**     | Conflict              | Duplicate resource, conflict (e.g., user already exists) |
| **422**     | Unprocessable Entity  | Validation error (bad input fields, fails schema, etc.)  |
| **500**     | Internal Server Error | General server-side error                                |

---

### **Best Practices for Status Codes**

* **Always use the correct status code** for the situation.

  * Success? 200/201.
  * Auth issue? 401/403.
  * Validation error? 422.
  * Resource not found? 404.
* **Return a well-structured JSON body** even for errors, so clients can show messages or handle errors gracefully.
* **Document which codes are returned** by each endpoint.

---

> **Tip:**
> If you’re ever unsure which status code to use, check [MDN’s HTTP Status Codes reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) or REST API best practices.
> This approach will impress your team and make frontend/backend integration much smoother!
