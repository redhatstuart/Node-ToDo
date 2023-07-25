const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/meanstacktutorials';

module.exports = {
    remoteUrl : 'mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu',
    localUrl: mongodbUri
};
