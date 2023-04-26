# Notes 

## On Security:
Imagine you've got an AWS service which is weirdly being accessed from a weird variety of different ips from different countries. How do you know wether it's a DDOS attack or a subtle large influx of real customers? 

If it was really an attack, how can you investigate every access one by one and the cut them off? Remember, this is not a DDOS patterned attack, it's rather an random, annoying and expensive one.

### Throttling  
"API Gateway throttles requests to your API using the token bucket algorithm, where a token counts for a request. [...] When request submissions exceed the steady-state request rate and burst limits, API Gateway begins to throttle requests. Clients may receive 429 Too Many Requests error responses at this point."
source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html

If you were a part of Wishly's team by the time we had our first attack (or maybe is facing your first attack yourself) you can clearly understand the headache to - allegedly - detect the attackers, and you can see how helpful this is. In case you were not, well, first of, good for u, second of, read this: https://seon.io/resources/bot-detection/