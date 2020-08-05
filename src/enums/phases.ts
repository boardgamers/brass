export enum Period {
  CanalPeriod = "canal",
  RailPeriod = "rail",
  NeverPeriod = "never"
}

export enum Phase {
  PlayerTurn = "playerturn",
  Development = "development"
}

export enum State {
  GameSetup = "gamesetup",
  PeriodSetup = "periodsetup",
  RoundSetup = "roundsetup",
  PlayerTurn = "playerturn",
  NextPlayer = "nextplayer",
  GameEnd = "gameend"
}
