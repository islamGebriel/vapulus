# Contact list

using Node.js with any framework and whatever database build app provide the 3 apis

## Key Factors:

1. Clean code
2. Bug free
3. Input validation
4. Response msg

## _required_

- **API doc**

- **Integration test**

### Notes:

- `{authorization,deviceToken,fingerPrint}` are to verify user .
  compare with values from static variable, if not matched return not authorize else return the described data
- User know from `{authorization,deviceToken,fingerPrint}`, so make two user in config file and add
  content to the user whois authorization data is sent

## 1. Add New Contacts

user add new contact by hitting `/contacts/addContact` delegates to `ContactsController.addNewContact`

request body

```js
const Request = {
  method: "POST",
  body: {
    email: String,
    mobile: String,
    firstName: String,
    lastName: String,
    authorization: String, //users auth access token
    deviceToken: String, //users device access token
    fingerPrint: String, //users finger print
  },
};
```

response

```json
{
  "statusCode": "number",
  "message": "string",
  "data": {
    "email": "string",
    "relationId": "string",
    "accountId": "string",
    "userId": "string",
    "firstName": "string",
    "lastName": "string",
    "mobileNumber": "string"
  }
}
```

## 2. Get All User Contacts

get all user contacts by hitting `/contacts/getList` delegates to `ContactsController.findUserContacts`

request body

```js
const Request = {
  method: "POST",
  body: {
    pageNum: String,
    character: String, //optional
    authorization: String, //users auth access token
    deviceToken: String, //users device access token
    fingerPrint: String, //users finger print
  },
};
```

response

```json
{
  "statusCode": "number",
  "message": "string",
  "data": {
    "createdAt": "string",
    "firstName": "string",
    "lastName": "string",
    "userId": "string",
    "contactId": "string",
    "relationId": "string",
    "mobileNumber": "string",
    "email": "string"
  }
}
```

## 3. Get Recent Contacts

get latest transactions with user contacts by hitting `/contacts/getRecentList` delegates to `ContactsController.findUserContacts`

- it should return the last 5 contacts added by the user.

request body

```js
const Request = {
  method: "POST",
  body: {
    authorization: string, //users auth access token
    deviceToken: string, //users device access token
    fingerPrint: string, //users finger print
  },
};
```

response

```json
{
  "statusCode": "number",
  "message": "string",
  "data": {
    "created_ts": "string",
    "userId": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "mobileNumber": "string"
  }
}
```
