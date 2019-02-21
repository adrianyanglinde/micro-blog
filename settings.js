/*这个文件用来保存数据库的连接信息*/
var settings = {
	cookieSecret: 'microblogbyvoid',
	db: 'microblog',                  /*数据库名称*/
	host: '127.0.0.1',                /*数据库地址*/
	port: '27017',
};

module.exports = settings;