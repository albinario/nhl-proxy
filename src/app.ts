import express from 'express'
import axios from 'axios'

const app = express()

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

const instance = axios.create({
	baseURL: 'https://api-web.nhle.com/v1',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

app.get('/gamecenter/:gameId/boxscore', async (req, res) => {
	const gameId = req.params.gameId

	try {
		const response = await instance.get('/gamecenter/' + gameId + '/boxscore')
		res.json(response.data)
	} catch (error) {
		res.status(500).json({
			error: 'Server error when fetching schedule',
		})
	}
})

app.get('/gamecenter/:gameId/landing', async (req, res) => {
	const gameId = req.params.gameId

	try {
		const response = await instance.get('/gamecenter/' + gameId + '/landing')
		res.json(response.data)
	} catch (error) {
		res.status(500).json({
			error: 'Server error when fetching schedule',
		})
	}
})

app.get('/games/:teamAbbrev', async (req, res) => {
	const teamAbbrev = req.params.teamAbbrev

	try {
		const response = await instance.get(
			'/club-schedule-season/' + teamAbbrev + '/now'
		)
		res.json(response.data.games)
	} catch (error) {
		res.status(500).json({
			error: 'Server error when fetching schedule',
		})
	}
})

app.get('/schedule/:date', async (req, res) => {
	const date = req.params.date

	try {
		const response = await instance.get('/schedule/' + date)
		res.json(response.data.gameWeek[0].games)
	} catch (error) {
		res.status(500).json({
			error: 'Server error when fetching schedule',
		})
	}
})

app.get('/standings', async (req, res) => {
	try {
		const response = await instance.get('/standings/now')
		res.json(response.data.standings)
	} catch (error) {
		res.status(500).json({
			error: 'Server error when fetching standings',
		})
	}
})

export default app
