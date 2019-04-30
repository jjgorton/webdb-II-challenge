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

router.get('/', (req, res) => {
	db('zoos')
		.then((zoos) => {
			res.status(200).json(zoos);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get('/:id', (req, res) => {
	db('zoos')
		.where({ id: req.params.id })
		.first()
		.then((zoos) => {
			if (zoos) {
				res.status(200).json(zoos);
			} else {
				res.status(404).json({ message: 'Mising Monkey, No Zoos found.' });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	if (!req.body.name) {
		res.status(400).json({ message: 'Provide a name, you silly sloth!' });
	} else {
		db('zoos')
			.insert(req.body, 'id')
			.then((ids) => {
				db('zoos').where({ id: ids[0] }).first().then((zoos) => {
					res.status(200).json(zoos);
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
});

router.delete('/:id', (req, res) => {
	db('zoos')
		.where({ id: req.params.id })
		.del()
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message : `${count} ${count > 1 ? 'records' : 'record'} deleted.`
				});
			} else {
				res.status(404).json({ message: 'Mising Monkey, No Zoos found.' });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put('/:id', (req, res) => {
	if (!req.body.name) {
		res.status(400).json({ message: 'Provide a name, you silly sloth!' });
	} else {
		db('zoos')
			.where({ id: req.params.id })
			.update(req.body)
			.then((count) => {
				if (count > 0) {
					res.status(200).json({
						message : `${count} ${count > 1 ? 'records' : 'record'} updated`
					});
				} else {
					res.status(404).json({ message: 'Mising Monkey, No Zoos found.' });
				}
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
});

module.exports = router;
