const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/meanstacktutorials';

module.exports = {
    remoteUrl : 'mongodb://demo-apex-m02.rhhc.wwtatc.com:27017/node-todo',
    localUrl: mongodbUri
};
