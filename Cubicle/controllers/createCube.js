module.exports = {
	createCubeGet (req, res) {
		res.render('createCube')
	},
	async createCubePost (req, res) {
		const cube = {
			name: req.body.name,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
			difficultyLevel: Number(req.body.difficultyLevel),
			creatorId: req.user._id
		}
		await req.dbController.insertCube(cube)

		res.redirect('/')
	},
}
