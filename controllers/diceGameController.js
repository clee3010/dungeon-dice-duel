export function getHeroes(req, res, engine) {
    const heroes = engine.getHeroes()

    res.status(200).json({heroes})
}

export function startGame(req, res, engine, heroId) {
    if (!heroId) {
        res.status(400).json({ "message":  "Hero ID is required" })
    }

    const startInfo = engine.startBattle(heroId)

    res.status(200).json({...startInfo, "message":  "Battle started. Roll to attack!"})
}

export function playRound(req, res, engine) {
    const roundInfo = engine.playRound()
    res.status(200).json(roundInfo)
}

export function resetBattle(req, res, engine) {
    engine.resetBattle
    res.status(200).json({ "message": "Battle reset." })
}