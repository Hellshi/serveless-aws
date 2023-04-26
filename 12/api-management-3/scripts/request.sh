HOST=http://localhost:3000
APIKEY="d41d8cd98f00b204e9800998ecf8427e"
curl --silent \
    -H "x-api-key: $APIKEY" \
    $HOST/dev/hello

curl --silent \
    $HOST/dev/getUsagePlans | tee getUsagePlans.log

#from request
USAGE_PLAN_ID="4wvncu"
#from console
KEY_ID=1igygmven8
API_KEY=PD83cWatbw1YXFhpM6hJ3852TBa1ZNLy1Az9gGGX
FROM="2023-04-25"
TO="2023-04-26"

curl --silent \
    "$HOST/dev/getUsage?keyId=$KEYID&usagePlanId=$USAGE_PLAN_ID&from=$FROM&to=$TO" \
    | tee usage.log

CUSTOMER_NAME="test@test.com"
curl --silent \
    "$HOST/dev/addKey?name=$CUSTOMER_NAME&usagePlanId=$USAGE_PLAN_ID" \
    | tee addKey.log