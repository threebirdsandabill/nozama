#!/bin/bash

API="http://localhost:4741"
URL_PATH="/users"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=dXuw0r9oFe8xqDV1FzBMmYChq2NJ+sRDc2NOWCI2vkg=--pBZWHc0WAKsFB3Bw0mXrZJK/NNsXJI2kLMYROtU+OAA" \
  --data '{
    "user": {
      "cart": [{
          "itemId": "'"${ITEMID}"'",
          "quantity": "'"${QTY}"'"
        }]
    }
  }'

echo

# ID=5ab9350e2054cf5b356ef26a ITEMID=5ab9380f0dad5237b8a33678 QTY=1 TOKEN=dXuw0r9oFe8xqDV1FzBMmYChq2NJ+sRDc2NOWCI2vkg=--pBZWHc0WAKsFB3Bw0mXrZJK/NNsXJI2kLMYROtU+OAA sh curl-scripts/updatecart.sh
