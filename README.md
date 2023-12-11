# js-assignment
````
instructions.txt has the instructions to run the service
guidelines.txt has the guidelines to be followed while solving and submitting the assignment
problem-statement.txt has the problems statements to be solved
````

I have tried to follow the existing pattern like the status codes, structure, and tests used.

# Problem 1

```sql
CREATE INDEX tours_name_IDX USING HASH ON mydb.tours (name)
SELECT m.* FROM matches m INNER JOIN tours t on m.tourId = t.id AND tours.name = ?
```

# Problem 2 - Sports Tour Match Endpoint

```http
GET /sport/tour/match
```
## Responses

Modified the response as below:
```javascript
{
    "Cricket": {
        "Indian Premier League, 2023": [
            {
                "matchId": number,
                "matchName": string,
                "matchFormat": string,
                "matchStartTime": string
            }
        ]
    }
}
```


# Problem 3 - News Endpoints
## Create News
```http
POST /news
```

Request Body

```text
{
    "category": string,
    "categoryId": number,
    "title": string,
    "description": string
}
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `category` | `string` | Can be 'TOUR' or 'MATCH' |
| `categoryId` | `number` | id of tour or match |
| `title` | `string` | title of news |
| `description` | `string` | description of news |

## Fetch News
```http
GET /sport/:id/news
GET /matches/:id/news
GET /tour/:id/news
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `number` | path variable |

## Responses

Create News will send a 201 created response code

Fetch News returns a JSON response in the following format:
```javascript
[
    {
        "title": string,
        "description": string
    }
]
```

## Status Codes
500 is sent whenever there is an error like validation or database error. Followed the existing status code in other endpoints.

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 500 | `INTERNAL SERVER ERROR` |
