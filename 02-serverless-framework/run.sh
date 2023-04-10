# install 
npm install -g serverless

#sls initialize
sls

# Always deploy everything
serverless deploy

#invoke AWS
sls invoke -f function1 # Name your function here

#invoke local
sls invoke local -f function1 -l # Name your function before -l

#Configure sls dashboard

