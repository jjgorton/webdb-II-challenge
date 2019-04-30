const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
	client           : 'sqlite3',
	connection       : {
		filename : './data/lambda.sqlite3'
	},
	useNullAsDefault : true
};

const db = knex(knexConfig);

module.exports = router;
