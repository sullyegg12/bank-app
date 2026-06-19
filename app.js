const TeamLevel = {
   JV2:             { raw: 'JV2' },
   JV1:             { raw: 'JV1' },
   VarsityReserve:  { raw: 'Varsity Reserve' },
   Varsity:         { raw: 'Varsity' },
};


const TEAM_LEVELS = ['JV2', 'JV1', 'Varsity Reserve', 'Varsity'];


// =============================================================================
//  MARK: - Position Definitions per Sport
// =============================================================================
function getPositions(sport) {
   const map = {
       'Basketball':   ['Point Guard','Shooting Guard','Small Forward','Power Forward','Center'],
       'Football':     ['Quarterback','Running Back','Wide Receiver','Tight End','Offensive Line','Cornerback','Safety','Linebacker','Defensive Line','Kicker','Punter','Long Snapper'],
       'Boys Soccer':  ['Goalkeeper','Defender','Midfielder','Forward'],
       'Girls Soccer': ['Goalkeeper','Defender','Midfielder','Forward'],
       'Volleyball':   ['Setter','Outside Hitter','Middle Blocker','Opposite Hitter','Libero','Defensive Specialist'],
       'Baseball':     ['Pitcher','Catcher','First Base','Second Base','Third Base','Shortstop','Left Field','Center Field','Right Field','Designated Hitter'],
       'Softball':     ['Pitcher','Catcher','First Base','Second Base','Third Base','Shortstop','Left Field','Center Field','Right Field','Designated Hitter'],
       'Hockey':       ['Goalie','Defenseman','Center','Left Wing','Right Wing'],
       'Lacrosse':     ['Goalie','Defender','Midfielder','Attacker','Face-Off Specialist'],
       'Wrestling':    ['106','113','120','126','132','138','144','150','157','165','175','190','215','285'],
       'Cross Country':['Runner'],
       'Track & Field':['Sprinter','Distance','Jumper','Thrower','Hurdler','Relay','Pole Vault','Multi-Event'],
       'Bowling':      ['Bowler'],
       'Boys Golf':    ['Golfer'],
       'Girls Golf':   ['Golfer'],
       'Boys Tennis':  ['Singles','Doubles','Both'],
       'Girls Tennis': ['Singles','Doubles','Both'],
       'Gymnastics':   ['All-Around','Vault','Bars','Beam','Floor'],
       'Swim & Dive Boys': ['Freestyle','Backstroke','Breaststroke','Butterfly','IM','Diver','Relay'],
       'Girls Swim & Dive':['Freestyle','Backstroke','Breaststroke','Butterfly','IM','Diver','Relay'],
       'Cheerleading': ['Flyer','Base','Back Spot','Tumbler','Stunter'],
       'Dance':        ['Dancer'],
       'Ski Racing':   ['Slalom','Giant Slalom','Super-G','Downhill'],
       'Snowboarding': ['Halfpipe','Slopestyle','Giant Slalom','Cross'],
   };
   return map[sport] ?? [];
}


// Stats shown per position (keys must match entryLabel in getStatMappings)
function getPositionStats(sport, positions) {
   if (!positions || positions.length === 0) return null; // null = show all


   const map = {
       'Basketball': {
           'Point Guard':     ['Points','Assists','Turnovers','Steals','FGM','FGA','3PM','3PA','FTM','FTA','Rebounds','Off Reb','Def Reb','Fouls','Plus/Minus','Minutes'],
           'Shooting Guard':  ['Points','Assists','Steals','FGM','FGA','3PM','3PA','FTM','FTA','Rebounds','Fouls','Plus/Minus','Minutes'],
           'Small Forward':   ['Points','Rebounds','Assists','Steals','Blocks','FGM','FGA','3PM','3PA','FTM','FTA','Fouls','Plus/Minus','Minutes'],
           'Power Forward':   ['Points','Rebounds','Blocks','FGM','FGA','FTM','FTA','Off Reb','Def Reb','Fouls','Plus/Minus','Minutes'],
           'Center':          ['Points','Rebounds','Blocks','FGM','FGA','FTM','FTA','Off Reb','Def Reb','Fouls','Plus/Minus','Minutes'],
       },
       'Football': {
           'Quarterback':     ['Pass Yds','Pass TDs','Interceptions','Completions','Pass Attempts','Rush Yds','Rush Attempts','Rush TDs','Fumbles','Points'],
           'Running Back':    ['Rush Yds','Rush Attempts','Rush TDs','Rec Yds','Receptions','Rec TDs','Fumbles','Points'],
           'Wide Receiver':   ['Rec Yds','Receptions','Rec TDs','Rush Yds','Rush Attempts','Points'],
           'Tight End':       ['Rec Yds','Receptions','Rec TDs','Points'],
           'Offensive Line':  ['Points'],
           'Cornerback':      ['Tackles','Solo Tackles','Assist Tackles','Def INTs','Pass Deflect','Forced Fum','Fum Recov','Def TDs'],
           'Safety':          ['Tackles','Solo Tackles','Assist Tackles','Def INTs','Pass Deflect','Forced Fum','Fum Recov','Def TDs'],
           'Linebacker':      ['Tackles','Solo Tackles','Assist Tackles','Sacks','TFL','Def INTs','Pass Deflect','Forced Fum','Fum Recov','Def TDs'],
           'Defensive Line':  ['Tackles','Solo Tackles','Assist Tackles','Sacks','TFL','Forced Fum','Fum Recov','Def TDs'],
           'Kicker':          ['Points','KR Yds'],
           'Punter':          ['PR Yds','Points'],
           'Long Snapper':    ['Points'],
       },
       'Boys Soccer': {
           'Goalkeeper': ['Saves','Goals','Assists','Yellow Cards','Red Cards','Minutes'],
           'Defender':   ['Goals','Assists','Shots','Yellow Cards','Red Cards','Minutes'],
           'Midfielder': ['Goals','Assists','Shots','Shots on Goal','Yellow Cards','Red Cards','Minutes'],
           'Forward':    ['Goals','Assists','Shots','Shots on Goal','Yellow Cards','Red Cards','Minutes'],
       },
       'Girls Soccer': {
           'Goalkeeper': ['Saves','Goals','Assists','Yellow Cards','Red Cards','Minutes'],
           'Defender':   ['Goals','Assists','Shots','Yellow Cards','Red Cards','Minutes'],
           'Midfielder': ['Goals','Assists','Shots','Shots on Goal','Yellow Cards','Red Cards','Minutes'],
           'Forward':    ['Goals','Assists','Shots','Shots on Goal','Yellow Cards','Red Cards','Minutes'],
       },
       'Volleyball': {
           'Setter':               ['Assists','Aces','Digs','Points','Serve Errors'],
           'Outside Hitter':       ['Kills','Errors','Attempts','Aces','Digs','Blocks','Points','Serve Errors'],
           'Middle Blocker':       ['Kills','Errors','Attempts','Blocks','Block Errors','Points'],
           'Opposite Hitter':      ['Kills','Errors','Attempts','Aces','Blocks','Block Errors','Points'],
           'Libero':               ['Digs','Assists','Aces','Serve Errors','Points'],
           'Defensive Specialist': ['Digs','Aces','Serve Errors','Points'],
       },
       'Baseball': {
           'Pitcher':    ['IP','Hits Allow','ER','BB Allow','K','Wins','Losses','Putouts','Fielding Ast','Errors'],
           'Catcher':    ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'First Base': ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Second Base':['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Third Base': ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Shortstop':  ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Left Field': ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Center Field':['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Right Field':['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Designated Hitter':['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts'],
       },
       'Softball': {
           'Pitcher':    ['IP','Hits Allow','ER','BB Allow','K','Wins','Losses','Putouts','Fielding Ast','Errors'],
           'Catcher':    ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'First Base': ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Second Base':['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Third Base': ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Shortstop':  ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Left Field': ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Center Field':['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Right Field':['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases','Putouts','Fielding Ast','Errors'],
           'Designated Hitter':['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts'],
       },
       'Hockey': {
           'Goalie':     ['Saves','Goals','Assists','Penalty Min','Plus/Minus'],
           'Defenseman': ['Goals','Assists','Shots','Hits','Blocks','Penalty Min','Plus/Minus','Faceoff W','Faceoff L'],
           'Center':     ['Goals','Assists','Shots','Hits','Penalty Min','Plus/Minus','Faceoff W','Faceoff L'],
           'Left Wing':  ['Goals','Assists','Shots','Hits','Penalty Min','Plus/Minus'],
           'Right Wing': ['Goals','Assists','Shots','Hits','Penalty Min','Plus/Minus'],
       },
       'Lacrosse': {
           'Goalie':             ['Saves','Goals','Assists','Turnovers'],
           'Defender':           ['Ground Balls','Caused TO','Turnovers','Goals','Assists'],
           'Midfielder':         ['Goals','Assists','Shots','Shots on Goal','Ground Balls','Caused TO','Turnovers','Faceoff W','Faceoff L'],
           'Attacker':           ['Goals','Assists','Shots','Shots on Goal','Ground Balls','Turnovers'],
           'Face-Off Specialist':['Faceoff W','Faceoff L','Ground Balls'],
       },
       'Volleyball': {
           'Setter':               ['Assists','Aces','Digs','Points','Serve Errors'],
           'Outside Hitter':       ['Kills','Errors','Attempts','Aces','Digs','Blocks','Points'],
           'Middle Blocker':       ['Kills','Errors','Attempts','Blocks','Block Errors','Points'],
           'Opposite Hitter':      ['Kills','Errors','Attempts','Aces','Blocks','Points'],
           'Libero':               ['Digs','Assists','Aces','Serve Errors','Points'],
           'Defensive Specialist': ['Digs','Aces','Serve Errors','Points'],
       },
   };


   const sportMap = map[sport];
   if (!sportMap) return null;


   // Merge stats from all selected positions
   const allStats = new Set();
   for (const pos of positions) {
       const posStats = sportMap[pos];
       if (posStats) posStats.forEach(s => allStats.add(s));
   }
   return allStats.size > 0 ? Array.from(allStats) : null;
}


/** Returns a unique ID string */
function uuid() {
   return Math.random().toString(36).slice(2) + Date.now().toString(36);
}


/** Create a Game object */
function makeGame({ sport, opponent, yourScore, opponentScore, isWin, date = new Date(), gameStats = {}, season, team }) {
   return { id: uuid(), sport, opponent, yourScore, opponentScore, isWin, date, gameStats, season, team };
}


// =============================================================================
//  MARK: - App State
// =============================================================================
const state = {
   gradYear:       new Date().getFullYear() + 1,
   selectedSports: new Set(),
   sportConfig:    {},
   allGames:       [],
   activeSeason:   new Date().getFullYear(),
   activeTeam:     'Varsity',
   // UI state
   activeTab:      'home',
   statsMode:      'Season',   // 'Season' | 'Year' | 'All-Time' | 'By Team'
   currentSport:   '',
   // Profile
   profile: {
       playerName:  'Your Name',
       highSchool:  'Your High School',
       height:      '—',
       weight:      '—',
       gender:      '—',
       benchPress:  '—',
       squat:       '—',
       deadlift:    '—',
       clean:       '—',
       vertical:    '—',
       fortyYard:   '—',
       hundred:     '—',
       twoHundred:  '—',
       shuffle:     '—',
   },
   profileEditing: false,
   // Settings
   settings: {
       darkMode:         false,
       accentColor:      '#2663EB',
       tabLabels:        true,
       compactCards:     false,
       defaultStatsMode: 'Season',
       defaultTeam:      'Varsity',
   },
   personalRecords: {},
   achievements: [],
   seasonGoals: []
};


function saveState() {
   const toSave = {
       gradYear:       state.gradYear,
       selectedSports: Array.from(state.selectedSports),
       sportConfig: state.sportConfig,
       allGames:       state.allGames.map(g => ({ ...g, date: g.date.getTime() })),
       activeSeason:   state.activeSeason,
       activeTeam:     state.activeTeam,
       profile:        state.profile,
       settings:       state.settings,
       seasonGoals:    state.seasonGoals,
       personalRecords: state.personalRecords,
   };
   localStorage.setItem('athletiq_state', JSON.stringify(toSave));
}


function loadState() {
   const raw = localStorage.getItem('athletiq_state');
   if (!raw) return;
   try {
       const saved = JSON.parse(raw);
       state.gradYear       = saved.gradYear       ?? state.gradYear;
       state.selectedSports = new Set(saved.selectedSports ?? []);
       state.sportConfig = saved.sportConfig ?? {};
       state.allGames       = (saved.allGames ?? []).map(g => ({ ...g, date: new Date(g.date) }));
       state.activeSeason   = saved.activeSeason   ?? state.activeSeason;
       state.activeTeam     = saved.activeTeam     ?? state.activeTeam;
       state.profile        = { ...state.profile, ...(saved.profile ?? {}) };
       state.settings       = { ...state.settings, ...(saved.settings ?? {}) };
       state.seasonGoals    = saved.seasonGoals    ?? [];
       state.achievements   = saved.achievements   ?? [];
       state.personalRecords = saved.personalRecords ?? {};
   } catch (e) {
       console.warn('Failed to load saved state:', e);
   }
}


// =============================================================================
//  MARK: - Logic Functions (direct port from Swift)
// =============================================================================


function getTrackedStats(sport) {
   // Returns which stats to track PRs for per sport
   // Only track counting stats, not percentages or derived values
   const map = {
       'Basketball':   ['Points','Rebounds','Assists','Steals','Blocks'],
       'Football':     ['Pass Yds','Rush Yds','Rec Yds','Pass TDs','Sacks','Tackles'],
       'Boys Soccer':  ['Goals','Assists','Saves'],
       'Girls Soccer': ['Goals','Assists','Saves'],
       'Volleyball':   ['Kills','Aces','Digs','Blocks'],
       'Baseball':     ['Hits','Home Runs','RBI','Strikeouts'],
       'Softball':     ['Hits','Home Runs','RBI','Strikeouts'],
       'Hockey':       ['Goals','Assists'],
       'Lacrosse':     ['Goals','Assists'],
       'Wrestling':    ['Points Scored','Pins'],
       'Bowling':      ['Strikes','Spares'],
       'Boys Golf':    ['Total Score'],   // lower is better — handled separately
       'Girls Golf':   ['Total Score'],
       'Boys Tennis':  ['Aces','Winners'],
       'Girls Tennis': ['Aces','Winners'],
   };
   return map[sport] ?? ['Points'];
}


function checkPersonalRecords(game) {
   const sport = game.sport;
   if (!state.personalRecords[sport]) state.personalRecords[sport] = {};
   const prs = state.personalRecords[sport];
   const trackedStats = getTrackedStats(sport);
   const newPRLabels = [];


   for (const stat of trackedStats) {
       const val = parseFloat(game.gameStats[stat] || '0') || 0;
       if (val === 0) continue;


       const isGolf = (sport === 'Boys Golf' || sport === 'Girls Golf');
       const existing = prs[stat];


       // Golf: lower score is better
       const isBetter = isGolf && stat === 'Total Score'
           ? (!existing || val < existing.value)
           : (!existing || val > existing.value);


       if (isBetter) {
           prs[stat] = { value: val, gameId: game.id, date: game.date.toISOString() };
           newPRLabels.push(`${stat}: ${val}`);
       }
   }
   if (newPRLabels.length > 0) showPRToast(newPRLabels);
}


function recalculatePRs(sport) {
   state.personalRecords[sport] = {};
   const games = state.allGames.filter(g => g.sport === sport);
   for (const game of games) checkPersonalRecords(game);
}


function showPRToast(labels) {
   const existing = document.getElementById('pr-toast');
   if (existing) existing.remove();


   const toast = document.createElement('div');
   toast.id = 'pr-toast';
   toast.className = 'pr-toast';
   toast.textContent = `🏆 New PR! ${labels.join(' · ')}`;
   document.getElementById('app').appendChild(toast);
   setTimeout(() => toast?.remove(), 3500);
}


/**
* Returns StatMapping array for a given sport.
* Each mapping: { entryLabel, totalLabel, avgLabel, isCalculated }
*/
function getStatMappings(sport) {
   const m = (entryLabel, totalLabel, avgLabel, isCalculated = false) =>
       ({ entryLabel, totalLabel, avgLabel, isCalculated });


   switch (sport) {
       case 'Basketball':
           return [
               m('Points',      'Total Pts',    'PPG'),
               m('Rebounds',    'Total Rebs',   'RPG'),
               m('Assists',     'Total Asts',   'APG'),
               m('Steals',      'Total Stls',   'SPG'),
               m('Blocks',      'Total Blks',   'BPG'),
               m('Turnovers',   'Total Tovs',   'TPG'),
               m('FGM',         'Total FGM',    'FGM/G'),
               m('FGA',         'Total FGA',    'FGA/G'),
               m('3PM',         'Total 3PM',    '3PM/G'),
               m('3PA',         'Total 3PA',    '3PA/G'),
               m('FTM',         'Total FTM',    'FTM/G'),
               m('FTA',         'Total FTA',    'FTA/G'),
               m('Off Reb',     'Total OReb',   'ORPG'),
               m('Def Reb',     'Total DReb',   'DRPG'),
               m('Fouls',       'Total Fls',    'FPG'),
               m('Def Deflect', 'Total Deflct', 'Def/G'),
               m('Plus/Minus',  'Total +/-',    'Avg +/-'),
               m('Tech Fouls',  'Total TFs',    'TF/G'),
               m('Minutes',     'Total Min',    'MPG'),
           ];
       case 'Football':
           return [
               m('Pass Yds',      'Total Pass Yds',  'PYds/G'),
               m('Pass TDs',      'Total Pass TDs',  'PassTD/G'),
               m('Interceptions', 'Total INTs',       'INT/G'),
               m('Completions',   'Total Cmp',        'CMP/G'),
               m('Pass Attempts', 'Total Pass Att',   'Att/G'),
               m('Pass YPA',      'Career Pass YPA',  'Pass YPA',  true),
               m('Rush Yds',      'Total Rush Yds',   'RYds/G'),
               m('Rush TDs',      'Total Rush TDs',   'RushTD/G'),
               m('Rush YPC',      'Career Rush YPC',  'Rush YPC',  true),
               m('Rush Attempts', 'Total Rush Att',   'RushAtt/G'),
               m('Rec Yds',       'Total Rec Yds',    'RecYds/G'),
               m('Receptions',    'Total Rec',        'Rec/G'),
               m('Rec TDs',       'Total Rec TDs',    'RecTD/G'),
               m('Tackles',       'Total Tackles',    'Tkl/G'),
               m('Solo Tackles',  'Total Solo Tkl',   'Solo/G'),
               m('Assist Tackles','Total Ast Tkl',    'AstTkl/G'),
               m('Sacks',         'Total Sacks',      'Sck/G'),
               m('TFL',           'Total TFLs',       'TFL/G'),
               m('Def INTs',      'Total Def INTs',   'DINT/G'),
               m('Pass Deflect',  'Total PD',         'PD/G'),
               m('Forced Fum',    'Total FF',         'FF/G'),
               m('Fum Recov',     'Total FR',         'FR/G'),
               m('Def TDs',       'Total Def TDs',    'DefTD/G'),
               m('KR Yds',        'Total KR Yds',     'KRYds/G'),
               m('PR Yds',        'Total PR Yds',     'PRYds/G'),
               m('Points',        'Total Pts',        'Pts/G'),
               m('Fumbles',       'Total Fum',        'Fum/G'),
           ];
       case 'Boys Soccer':
       case 'Girls Soccer':
           return [
               m('Goals',        'Total Goals',   'Goals/G'),
               m('Assists',      'Total Assists', 'Ast/G'),
               m('Shots',        'Total Shots',   'Shots/G'),
               m('Shots on Goal','Total SoG',     'SoG/G'),
               m('Saves',        'Total Saves',   'Saves/G'),
               m('Yellow Cards', 'Total YC',      'YC/G'),
               m('Red Cards',    'Total RC',      'RC/G'),
               m('Minutes',      'Total Min',     'MPG'),
           ];
       case 'Volleyball':
           return [
               m('Kills',       'Total Kills',   'Kills/G'),
               m('Errors',      'Total Errors',  'Err/G'),
               m('Attempts',    'Total Att',     'Att/G'),
               m('Assists',     'Total Assists', 'Ast/G'),
               m('Digs',        'Total Digs',   'Digs/G'),
               m('Blocks',      'Total Blocks', 'Blk/G'),
               m('Block Errors','Total Blk Err','BlkErr/G'),
               m('Aces',        'Total Aces',   'Aces/G'),
               m('Serve Errors','Total Svc Err','SvcErr/G'),
               m('Points',      'Total Pts',    'Pts/G'),
           ];
       case 'Baseball':
       case 'Softball':
           return [
               m('AVG',         'Career AVG',         'AVG', true),
               m('At Bats',     'Total AB',           'AB/G'),
               m('Hits',        'Total H',            'H/G'),
               m('Singles',     'Total 1B',           '1B/G'),
               m('Doubles',     'Total 2B',           '2B/G'),
               m('Triples',     'Total 3B',           '3B/G'),
               m('Home Runs',   'Total HR',           'HR/G'),
               m('RBI',         'Total RBI',          'RBI/G'),
               m('Runs',        'Total Runs',         'Runs/G'),
               m('Walks',       'Total BB',           'BB/G'),
               m('Strikeouts',  'Total K',            'K/G'),
               m('Stolen Bases','Total SB',           'SB/G'),
               m('IP',          'Total IP',           'IP/G'),
               m('Hits Allow',  'Total HA',           'HA/G'),
               m('ER',          'Total ER',           'ER/G'),
               m('BB Allow',    'Total BBA',          'BBA/G'),
               m('K',           'Total K',            'K/G'),
               m('Wins',        'Pitching Wins',      '—'),
               m('Losses',      'Pitching Losses',    '—'),
               m('Putouts',     'Total PO',           'PO/G'),
               m('Fielding Ast','Total FA',           'FA/G'),
               m('Errors',      'Total E',            'E/G'),
           ];
       case 'Cross Country':
       case 'Track & Field':
           return [
               m('Finish Place',  'Best Place',  'Avg Place'),
               m('Points Scored', 'Total Pts',   'Pts/Meet'),
               m('PR (seconds)',  'Best PR',     '—'),
           ];
       case 'Wrestling':
           return [
               m('Wins',         'Total Wins',   '—'),
               m('Losses',       'Total Losses', '—'),
               m('Pins',         'Total Pins',   'Pins/Match'),
               m('Tech Falls',   'Total TF',     'TF/Match'),
               m('Maj Decisions','Total MD',     'MD/Match'),
               m('Points Scored','Total Pts',    'Pts/Match'),
           ];
       case 'Hockey':
           return [
               m('Goals',      'Total Goals',   'Goals/G'),
               m('Assists',    'Total Assists', 'Ast/G'),
               m('Shots',      'Total Shots',  'Shots/G'),
               m('Hits',       'Total Hits',   'Hits/G'),
               m('Blocks',     'Total Blocks', 'Blk/G'),
               m('Penalty Min','Total PIM',    'PIM/G'),
               m('Plus/Minus', 'Total +/-',   'Avg +/-'),
               m('Faceoff W',  'Total FOW',   'FOW/G'),
               m('Faceoff L',  'Total FOL',   'FOL/G'),
               m('Saves',      'Total Saves', 'Saves/G'),
           ];
       case 'Lacrosse':
           return [
               m('Goals',       'Total Goals',   'Goals/G'),
               m('Assists',     'Total Assists', 'Ast/G'),
               m('Shots',       'Total Shots',  'Shots/G'),
               m('Shots on Goal','Total SoG',   'SoG/G'),
               m('Ground Balls','Total GB',     'GB/G'),
               m('Caused TO',   'Total CTO',   'CTO/G'),
               m('Saves',       'Total Saves', 'Saves/G'),
               m('Turnovers',   'Total TO',    'TO/G'),
               m('Faceoff W',   'Total FOW',   'FOW/G'),
               m('Faceoff L',   'Total FOL',   'FOL/G'),
           ];
       case 'Bowling':
           return [
               m('Frames Bowled','Total Frames', 'Frames/G'),
               m('Strikes',      'Total Strikes','Strikes/G'),
               m('Spares',       'Total Spares', 'Spares/G'),
               m('Open Frames',  'Total Opens',  'Opens/G'),
               m('Fill %',       'Overall Fill %',       'Fill %',       true),
               m('Strike %',     'Overall Strike %',     'Strike %',     true),
               m('Spare Conv %', 'Overall Spare Conv %', 'Spare Conv %', true),
               m('Open %',       'Overall Open %',       'Open %',       true),
           ];
       case 'Boys Golf':
       case 'Girls Golf':
           return [
               m('Holes Played',    'Total Holes',        'Holes/R'),
               m('Total Score',     'Total Strokes',      'Avg Score'),
               m('Total Par',       'Total Par',          'Avg Par'),
               m('Total Putts',     'Total Putts',        'Putts/Hole', true),
               m('Par 3 Score',     'Total Par3 Strokes', 'Avg Par3',   true),
               m('Par 3 Count',     'Total Par3 Holes',   'Par3/R'),
               m('Par 4 Score',     'Total Par4 Strokes', 'Avg Par4',   true),
               m('Par 4 Count',     'Total Par4 Holes',   'Par4/R'),
               m('Par 5 Score',     'Total Par5 Strokes', 'Avg Par5',   true),
               m('Par 5 Count',     'Total Par5 Holes',   'Par5/R'),
               m('Score vs Par',    'Total vs Par',       'Avg +/-',    true),
               m('Avg +/- Per Hole','Avg +/- Per Hole',   '+/-/Hole',   true),
               m('Avg 9 Score',     'Best 9 Score',       'Avg 9',      true),
               m('Avg 18 Score',    'Best 18 Score',      'Avg 18',     true),
               m('Handicap',        'Handicap Index',     'HCP',        true),
           ];
       case 'Girls Tennis':
       case 'Boys Tennis':
           return [
               m('Sets Won',        'Total Sets Won',    'Sets/M'),
               m('Sets Lost',       'Total Sets Lost',   'SetsL/M'),
               m('Games Won',       'Total Games Won',   'Games/M'),
               m('Games Lost',      'Total Games Lost',  'GamesL/M'),
               m('Aces',            'Total Aces',        'Aces/M'),
               m('Double Faults',   'Total DFs',         'DF/M'),
               m('Winners',         'Total Winners',     'W/M'),
               m('Unforced Errors', 'Total UEs',         'UE/M'),
               m('1st Serve In',    'Total 1st In',      '1stIn/M'),
               m('1st Serve Att',   'Total 1st Att',     '1stAtt/M'),
               m('1st Serve %',     'Career 1st Srv %',  '1st%',   true),
               m('Break Pts Won',   'Total BPW',         'BPW/M'),
               m('Break Pts Faced', 'Total BPF',         'BPF/M'),
           ];
       case 'Girls Swim & Dive':
       case 'Swim & Dive Boys':
           return [
               m('Events Swum',     'Total Events',      'Events/M'),
               m('Finish Place',    'Best Place',        'Avg Place'),
               m('Points Scored',   'Total Pts',         'Pts/M'),
               m('PR (seconds)',    'Best PR',           '—'),
               m('Relay Leg',       'Total Relay Legs',  'Relay/M'),
               m('Relay Place',     'Best Relay Place',  'Avg Relay Place'),
               m('Dive Score',      'Best Dive Score',   'Avg Dive'),
           ];
       case 'Gymnastics':
           return [
               m('Vault',           'Best Vault',        'Avg Vault'),
               m('Bars',            'Best Bars',         'Avg Bars'),
               m('Beam',            'Best Beam',         'Avg Beam'),
               m('Floor',           'Best Floor',        'Avg Floor'),
               m('All-Around',      'Best All-Around',   'Avg AA',    true),
               m('Finish Place',    'Best Place',        'Avg Place'),
           ];
       case 'Ski Racing':
           return [
               m('Finish Time (s)', 'Best Time',         'Avg Time'),
               m('Finish Place',    'Best Place',        'Avg Place'),
               m('Points Scored',   'Total Pts',         'Pts/Race'),
               m('DNF',             'Total DNFs',        'DNF/Race'),
           ];
       case 'Snowboarding':
           return [
               m('Finish Time (s)', 'Best Time',         'Avg Time'),
               m('Finish Place',    'Best Place',        'Avg Place'),
               m('Points Scored',   'Total Pts',         'Pts/Race'),
               m('Score',           'Best Score',        'Avg Score'),
               m('DNF',             'Total DNFs',        'DNF/Race'),
           ];
       case 'Dance':
       case 'Cheerleading':
           return [
               m('No Stats',  'No Stats',  'No Stats'),
           ];
       default:
           return [
               m('Points',  'Total Points',  'Avg Pts'),
               m('Assists', 'Total Assists', 'Avg Asts'),
           ];
   }
}


/** Returns only non-calculated stat mappings */
function getInputStats(sport) {
   const all = getStatMappings(sport).filter(s => !s.isCalculated);
   const config = state.sportConfig[sport];
   if (!config || !config.positions || config.positions.length === 0) return all;
   const allowed = getPositionStats(sport, config.positions);
   if (!allowed) return all;
   return all.filter(m => allowed.includes(m.entryLabel));
}


/** Calculates derived stats (Pass YPA, Rush YPC, Bowling %) */
function calculateDerivedStats(sport, stats) {
   const n = k => parseFloat(stats[k] || '0') || 0;
   const derived = {};


   if (sport === 'Football') {
       const passYds = n('Pass Yds'), passAtt = n('Pass Attempts');
       derived['Pass YPA'] = passAtt > 0 ? (passYds / passAtt).toFixed(1) : '0.0';
       const rushYds = n('Rush Yds'), rushAtt = n('Rush Attempts');
       derived['Rush YPC'] = rushAtt > 0 ? (rushYds / rushAtt).toFixed(1) : '0.0';
   } else if (sport === 'Bowling') {
       const frames  = n('Frames Bowled');
       const strikes = n('Strikes');
       const spares  = n('Spares');
       const opens   = n('Open Frames');
       derived['Strike %']     = frames > 0 ? ((strikes / frames) * 100).toFixed(1) + '%' : '0.0%';
       derived['Fill %']       = frames > 0 ? (((strikes + spares) / frames) * 100).toFixed(1) + '%' : '0.0%';
       derived['Open %']       = frames > 0 ? ((opens / frames) * 100).toFixed(1) + '%' : '0.0%';
       const spareChances = frames - strikes;
       derived['Spare Conv %'] = spareChances > 0 ? ((spares / spareChances) * 100).toFixed(1) + '%' : '0.0%';
   }
   else if (sport === 'Softball' || sport === 'Baseball') {
       const atBats = n('At Bats');
       const hits   = n('Hits');
       derived['AVG'] = atBats > 0 ? (hits / atBats).toFixed(3) : '.000';
   }
   else if (sport === 'Boys Golf' || sport === 'Girls Golf') {
       const holes     = n('Holes Played');
       const score     = n('Total Score');
       const par       = n('Total Par');
       const putts     = n('Total Putts');
       const par3score = n('Par 3 Score');
       const par3count = n('Par 3 Count');
       const par4score = n('Par 4 Score');
       const par4count = n('Par 4 Count');
       const par5score = n('Par 5 Score');
       const par5count = n('Par 5 Count');


       // Average putts per hole (not per round)
       derived['Putts/Hole'] = holes > 0
           ? (putts / holes).toFixed(2)
           : '0.00';


       // Average score per par type (score / count of those holes)
       derived['Avg Par3'] = par3count > 0
           ? (par3score / par3count).toFixed(2)
           : '—';
       derived['Avg Par4'] = par4count > 0
           ? (par4score / par4count).toFixed(2)
           : '—';
       derived['Avg Par5'] = par5count > 0
           ? (par5score / par5count).toFixed(2)
           : '—';


       // Average +/- per hole across all pars
       const totalDiff = score - par;
       derived['Avg +/- Per Hole'] = holes > 0
           ? ((totalDiff / holes) >= 0 ? '+' : '') + (totalDiff / holes).toFixed(2)
           : 'E';


       // Score vs par total
       derived['Score vs Par'] = holes > 0
           ? (totalDiff >= 0 ? '+' : '') + totalDiff.toFixed(1)
           : 'E';


       // Avg 9 and 18 hole scores
       derived['Avg 9 Score'] = holes > 0
           ? ((score / holes) * 9).toFixed(1)
           : '0.0';
       derived['Avg 18 Score'] = holes > 0
           ? ((score / holes) * 18).toFixed(1)
           : '0.0';


       // Simplified handicap
       const avgScoreVsPar = holes > 0 ? (totalDiff / holes) * 18 : 0;
       derived['Handicap'] = (avgScoreVsPar * 0.96).toFixed(1);
   }
   else if (sport === 'Girls Tennis' || sport === 'Boys Tennis') {
       const firstIn  = n('1st Serve In');
       const firstAtt = n('1st Serve Att');
       derived['1st Serve %'] = firstAtt > 0
           ? ((firstIn / firstAtt) * 100).toFixed(1) + '%'
           : '0.0%';
   }
   else if (sport === 'Gymnastics') {
       const vault = n('Vault');
       const bars  = n('Bars');
       const beam  = n('Beam');
       const floor = n('Floor');
       const count = [vault, bars, beam, floor].filter(v => v > 0).length;
       derived['All-Around'] = count > 0
           ? (vault + bars + beam + floor).toFixed(3)
           : '0.000';
   }
   return derived;
}


/** Sport emoji/icon mapping */
function getIcon(sport) {
   const icons = {
       'Basketball':    '<i class="fi fi-rr-basketball"></i>',
       'Football':      '<i class="fi fi-rr-rugby"></i>',
       'Boys Soccer':   '<i class="fi fi-rr-football"></i>',
       'Girls Soccer':  '<i class="fi fi-rr-football"></i>',
       'Volleyball':    '<i class="fi fi-rr-volleyball"></i>',
       'Baseball':      '<i class="fi fi-rr-baseball-alt"></i>',
       'Bowling':       '<i class="fi fi-rr-bowling"></i>',
       'Girls Golf':    '<i class="fi fi-rr-golf-ball"></i>',
       'Boys Golf':     '<i class="fi fi-rr-golf-ball"></i>',
       'Cross Country': '<i class="fi fi-rr-running"></i>',
       'Wresting':      '<i class="fi fi-rr-medal"></i>',
       'Hockey':        '<i class="fi fi-rr-hockey-stick-puck"></i>',
       'Track & Field': '<i class="fi fi-rr-user-fast-running"></i>',
       'Ski Racing':    '<i class="fi fi-rr-skiing"></i>',
       'Snowboarding':  '<i class="fi fi-rr-snowboarding"></i>',
       'Gymnastics':    '<i class="fi fi-rr-person-lunge"></i>',
       'Swim & Dive Boys': '<i class="fi fi-rr-swimmer"></i>',
       'Girls Tennis':  '<i class="fi fi-rr-tennis"></i>',
       'Boys Tennis':   '<i class="fi fi-rr-tennis"></i>',
       'Lacrosse':      '<i class="fi fi-rr-lacrosse-stick-ball"></i>',
       'Softball':      '<i class="fi fi-rr-baseball-alt"></i>',
       'Swim & Dive Girls': '<i class="fi fi-rr-swimmer"></i>',
       'Cheerleading':  '<i class="fi fi-rr-medal"></i>',
       'Dance':         '<i class="fi fi-rr-ballet-dance"></i>',
   };
   return icons[sport] || '';
}


/** Returns CSS color class for a sport */
function getColorClass(sport) {
   const navy = ['Football', 'Volleyball', 'Wrestling', 'Hockey'];
   return navy.includes(sport) ? 'color-blue' : 'color-blue';
}


/** Seasons array for a grad year (4 years: freshman through senior) */
function seasons(gradYear) {
   const seniorSeasonStart = gradYear - 1;
   return [0, 1, 2, 3].map(i => seniorSeasonStart - (3 - i));
}


/** Season label like "2024-25" */
function seasonLabel(year) {
   return `${year}-${String(year + 1).slice(-2)}`;
}


/** Grade label for a given season + gradYear */
function gradeLabel(season, gradYear) {
   const diff = (gradYear - 1) - season;
   return ['Senior', 'Junior', 'Sophomore', 'Freshman'][diff] ?? '';
}


/** Current season name by month */
function currentSeasonName() {
   const month = new Date().getMonth() + 1; // 1-indexed
   if ([3,4,5].includes(month)) return 'Spring';
   if ([9,10,11].includes(month)) return 'Fall';
   if ([6,7,8].includes(month)) return 'Off';
   return 'Winter';
}


/** Format a Date to "Mon Day" */
function formatDate(date) {
   return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}


// =============================================================================
//  MARK: - Settings
// =============================================================================
function openSettings() {
   const s = state.settings;


   const accents = [
       { color: '#2663EB', label: 'Blue' },
       { color: '#0B2D79', label: 'Navy' },
       { color: '#22c55e', label: 'Green' },
       { color: '#ef4444', label: 'Red' },
       { color: '#f97316', label: 'Orange' },
       { color: '#a855f7', label: 'Purple' },
       { color: '#14b8a6', label: 'Teal' },
       { color: '#ec4899', label: 'Pink' },
   ];


   document.getElementById('settings-body').innerHTML = `
       <div class="settings-section">
           <div class="settings-section-title">Appearance</div>
           <div class="settings-row">
               <div>
                   <div class="settings-row-label">Dark Mode</div>
                   <div class="settings-row-sub">Easy on the eyes at night</div>
               </div>
               <label class="form-toggle">
                   <input type="checkbox" id="setting-darkmode" ${s.darkMode ? 'checked' : ''} onchange="applySetting('darkMode', this.checked)" />
                   <span class="toggle-slider"></span>
               </label>
           </div>
           <div class="settings-row">
               <div>
                   <div class="settings-row-label">Accent Color</div>
                   <div class="settings-row-sub">Main highlight color</div>
               </div>
               <div class="accent-picker">
                   ${accents.map(a => `
                       <div class="accent-swatch ${s.accentColor === a.color ? 'active' : ''}"
                            style="background:${a.color};"
                            title="${a.label}"
                            onclick="applySetting('accentColor', '${a.color}')">
                       </div>`).join('')}
               </div>
           </div>
           <div class="settings-row">
               <div>
                   <div class="settings-row-label">Tab Labels</div>
                   <div class="settings-row-sub">Show text below tab icons</div>
               </div>
               <label class="form-toggle">
                   <input type="checkbox" id="setting-tablabels" ${s.tabLabels ? 'checked' : ''} onchange="applySetting('tabLabels', this.checked)" />
                   <span class="toggle-slider"></span>
               </label>
           </div>
           <div class="settings-row">
               <div>
                   <div class="settings-row-label">Compact Cards</div>
                   <div class="settings-row-sub">Smaller stat boxes</div>
               </div>
               <label class="form-toggle">
                   <input type="checkbox" id="setting-compact" ${s.compactCards ? 'checked' : ''} onchange="applySetting('compactCards', this.checked)" />
                   <span class="toggle-slider"></span>
               </label>
           </div>
       </div>


       <div class="settings-section">
           <div class="settings-section-title">Display</div>
           <div class="settings-row">
               <div>
                   <div class="settings-row-label">Default Stats Mode</div>
                   <div class="settings-row-sub">Starting view in Stats tab</div>
               </div>
               <select class="settings-select" onchange="applySetting('defaultStatsMode', this.value)">
                   ${['Season','Year','All-Time','By Team'].map(m =>
       `<option value="${m}" ${state.settings.defaultStatsMode === m ? 'selected' : ''}>${m}</option>`
   ).join('')}
               </select>
           </div>
           <div class="settings-row">
               <div>
                   <div class="settings-row-label">Default Team</div>
                   <div class="settings-row-sub">Pre-selected team level</div>
               </div>
               <select class="settings-select" onchange="applySetting('defaultTeam', this.value)">
                   ${TEAM_LEVELS.map(t =>
       `<option value="${t}" ${state.activeTeam === t ? 'selected' : ''}>${t}</option>`
   ).join('')}
               </select>
           </div>
       </div>


       <div class="settings-section">
           <div class="settings-section-title">Data</div>
           <div class="settings-row" style="cursor:pointer;" onclick="clearAllGames()">
               <div>
                   <div class="settings-row-label" style="color:var(--red);">Clear All Games</div>
                   <div class="settings-row-sub">Remove all logged games</div>
               </div>
               <span style="color:var(--red);font-size:18px;">›</span>
           </div>
       </div>


       <div style="padding:16px;text-align:center;">
           <div style="font-size:12px;color:var(--text-secondary);">Athletiq • Built for athletes</div>
       </div>
   `;


   document.getElementById('settings-overlay').classList.remove('hidden');
}


function applySetting(key, value) {
   state.settings[key] = value;
   saveState();


   if (key === 'darkMode') {
       document.body.classList.toggle('dark-mode', value);
   }
   if (key === 'accentColor') {
       document.documentElement.style.setProperty('--brand-blue', value);
       // Re-render settings to update active swatch
       openSettings();
   }
   if (key === 'tabLabels') {
       document.querySelectorAll('.tab-btn span').forEach(span => {
           span.style.display = value ? '' : 'none';
       });
   }
   if (key === 'compactCards') {
       document.querySelectorAll('.stat-box').forEach(box => {
           box.style.padding = value ? '8px 4px' : '';
       });
       document.querySelectorAll('.stat-box .sb-value').forEach(v => {
           v.style.fontSize = value ? '15px' : '';
       });
   }
   if (key === 'defaultStatsMode') {
       state.statsMode = value;
       renderStats();
   }
   if (key === 'defaultTeam') {
       state.activeTeam = value;
       renderAll();
   }
}


function clearAllGames() {
   if (confirm('Are you sure you want to delete all logged games? This cannot be undone.')) {
       state.allGames = [];
       state.personalRecords = {};  // clear PRs too
       saveState();                 // add this
       closeSettings();
       renderAll();
   }
}


function closeSettings() {
   document.getElementById('settings-overlay').classList.add('hidden');
}


document.getElementById('settings-close').addEventListener('click', closeSettings);
document.getElementById('settings-overlay').addEventListener('click', e => {
   if (e.target === document.getElementById('settings-overlay')) closeSettings();
});


// =============================================================================
//  MARK: - Stat grouping sections per sport (mirrors AddGameSheet.statSections)
// =============================================================================
function getStatSections(sport) {
   const inputKeys = getInputStats(sport).map(m => m.entryLabel);
   const section = (title, keys) => ({ title, keys: keys.filter(k => inputKeys.includes(k)) });


   switch (sport) {
       case 'Basketball':
           return [
               section('Scoring',    ['Points']),
               section('Field Goals', ['FGM', 'FGA']),
               section('3-Pointers', ['3PM', '3PA']),
               section('Free Throws',['FTM', 'FTA']),
               section('Rebounds',   ['Off Reb', 'Def Reb', 'Rebounds']),
               section('Playmaking', ['Assists', 'Turnovers']),
               section('Defense',    ['Steals', 'Blocks', 'Def Deflect']),
               section('Fouls',      ['Fouls', 'Tech Fouls']),
               section('Other',      ['Plus/Minus', 'Minutes']),
           ];
       case 'Football':
           return [
               section('Passing',       ['Pass Yds','Completions','Pass Attempts','Pass TDs','Interceptions']),
               section('Rushing',       ['Rush Yds','Rush Attempts','Rush TDs']),
               section('Receiving',     ['Rec Yds','Receptions','Rec TDs']),
               section('Defense',       ['Tackles','Solo Tackles','Assist Tackles','Sacks','TFL','Def INTs','Pass Deflect','Forced Fum','Fum Recov','Def TDs']),
               section('Special Teams', ['KR Yds','PR Yds']),
               section('Other',         ['Points','Fumbles']),
           ];
       case 'Boys Soccer':
       case 'Girls Soccer':
           return [section('Stats', ['Goals','Assists','Shots','Shots on Goal','Saves','Yellow Cards','Red Cards','Minutes'])];
       case 'Volleyball':
           return [section('Stats', ['Kills','Errors','Attempts','Assists','Digs','Blocks','Block Errors','Aces','Serve Errors','Points'])];
       case 'Baseball':
       case 'Softball':
           return [
               section('Hitting',  ['At Bats','Hits','Singles','Doubles','Triples','Home Runs','RBI','Runs','Walks','Strikeouts','Stolen Bases']),
               section('Pitching', ['IP','Hits Allow','ER','BB Allow','K','Wins','Losses']),
               section('Fielding', ['Putouts','Fielding Ast','Errors']),
           ];
       case 'Hockey':
           return [section('Stats', ['Goals','Assists','Shots','Hits','Blocks','Penalty Min','Plus/Minus','Faceoff W','Faceoff L','Saves'])];
       case 'Lacrosse':
           return [section('Stats', ['Goals','Assists','Shots','Shots on Goal','Ground Balls','Caused TO','Saves','Turnovers','Faceoff W','Faceoff L'])];
       case 'Wrestling':
           return [section('Stats', ['Wins','Losses','Pins','Tech Falls','Maj Decisions','Points Scored'])];
       case 'Cross Country':
       case 'Track & Field':
           return [section('Stats', ['Finish Place','Points Scored','PR (seconds)'])];
       case 'Bowling':
           return [section('Stats', ['Frames Bowled','Strikes','Spares','Open Frames'])];
       case 'Girls Tennis':
       case 'Boys Tennis':
           return [
               section('Match', ['Sets Won','Sets Lost','Games Won','Games Lost']),
               section('Serve',  ['Aces','Double Faults','1st Serve In','1st Serve Att']),
               section('Rally',  ['Winners','Unforced Errors']),
               section('Breaks', ['Break Pts Won','Break Pts Faced']),
           ];
       case 'Girls Swim & Dive':
       case 'Swim & Dive Boys':
           return [section('Stats', ['Events Swum','Finish Place','Points Scored','PR (seconds)','Relay Leg','Relay Place','Dive Score'])];
       case 'Gymnastics':
           return [section('Scores', ['Vault','Bars','Beam','Floor','Finish Place'])];
       case 'Ski Racing':
           return [section('Stats', ['Finish Time (s)','Finish Place','Points Scored','DNF'])];
       case 'Snowboarding':
           return [section('Stats', ['Finish Time (s)','Finish Place','Points Scored','Score','DNF'])];
       case 'Boys Golf':
       case 'Girls Golf':
           return []; // handled by scorecard, no manual sections needed
       default:
           return [section('Stats', inputKeys)];
   }
}


// =============================================================================
//  MARK: - Sports Lists (SportsSelectionView)
// =============================================================================
const SPORTS_FALL   = ['Football','Cheerleading','Cross Country','Dance','Volleyball','Girls Golf','Girls Tennis','Girls Swim & Dive','Boys Soccer','Girls Soccer'];
const SPORTS_WINTER = ['Basketball','Bowling','Wrestling','Gymnastics','Hockey','Ski Racing','Snowboarding','Swim & Dive Boys'];
const SPORTS_SPRING = ['Baseball','Softball','Boys Golf','Track & Field','Lacrosse','Boys Tennis'];


const BOYS_SPORTS   = ['Football','Boys Soccer','Boys Golf','Boys Tennis','Baseball','Swim & Dive Boys','Wrestling'];
const GIRLS_SPORTS  = ['Girls Soccer','Girls Golf','Girls Tennis','Girls Swim & Dive','Softball','Cheerleading','Dance','Gymnastics'];


function getVisibleSports(season) {
   const gender = state.profile.gender;
   return season.filter(sport => {
       const isBoys  = BOYS_SPORTS.includes(sport);
       const isGirls = GIRLS_SPORTS.includes(sport);
       if (!isBoys && !isGirls) return true; // no gender attached, always show
       if (gender === 'Male')        return isBoys;
       if (gender === 'Female')      return isGirls;
       if (gender === 'Non-binary')  return true;
       return true; // '—' or 'Prefer not to say' shows all
   });
}


// =============================================================================
//  MARK: - Aggregate Stats Helper
// =============================================================================
function aggregateStats(games, sport) {
   const totals = {};
   for (const game of games) {
       for (const [k, v] of Object.entries(game.gameStats)) {
           totals[k] = (totals[k] || 0) + (parseFloat(v) || 0);
       }
   }
   const result = {};
   for (const [k, v] of Object.entries(totals)) {
       result[k] = Number.isInteger(v) || v === Math.floor(v) ? String(Math.floor(v)) : v.toFixed(1);
   }
   const strTotals = {};
   for (const [k, v] of Object.entries(totals)) strTotals[k] = String(v);
   const derived = calculateDerivedStats(sport, strTotals);
   return { ...result, ...derived };
}


function aggregatePct(games, madeKey, attKey) {
   let made = 0, att = 0;
   for (const g of games) {
       made += parseFloat(g.gameStats[madeKey] || '0') || 0;
       att  += parseFloat(g.gameStats[attKey]  || '0') || 0;
   }
   return att > 0 ? ((made / att) * 100).toFixed(1) + '%' : '0%';
}


function gamePct(gameStats, madeKey, attKey) {
   const m = parseFloat(gameStats[madeKey] || '0') || 0;
   const a = parseFloat(gameStats[attKey]  || '0') || 0;
   return a > 0 ? ((m / a) * 100).toFixed(1) + '%' : '0%';
}


// =============================================================================
//  MARK: - Filtered Games
// =============================================================================
function getFilteredGames(sport, filterSeason, filterTeam) {
   const config = state.sportConfig[sport];
   return state.allGames.filter(g =>
       g.sport === sport &&
       (filterSeason == null || g.season === filterSeason) &&
       (filterTeam == null || g.team === filterTeam) &&
       (config == null || config.years.length === 0 || config.years.includes(g.season))
   ).sort((a, b) => b.date - a.date);
}


// =============================================================================
//  MARK: - Render: Home View
// =============================================================================
function renderHome() {
   const panel = document.getElementById('panel-home');
   const games = state.allGames.filter(g => state.selectedSports.has(g.sport)).sort((a,b) => b.date - a.date);
   const recordGames = games.filter(g => g.sport !== 'Boys Golf' && g.sport !== 'Girls Golf');
   const wins   = recordGames.filter(g => g.isWin).length;
   const losses = recordGames.length - wins;
   const winPct = recordGames.length ? ((wins / recordGames.length) * 100).toFixed(1) : '0.0';
   const seasonStr = `${currentSeasonName()} Season • ${seasonLabel(state.activeSeason)} ${state.activeTeam}`;


   panel.innerHTML = `
   <div class="nav-header">
       <div class="nav-header-logo">
           <h1 style="font-size:32px;font-weight:900;color:var(--brand-navy);letter-spacing:-1px;">Athletiq</h1>
       </div>
   </div>
   <div class="page-scroll" style="padding:16px;display:flex;flex-direction:column;gap:18px;">
       <div class="goals-widget">
           <div class="goals-title">
               <i class="fi fi-sr-bullseye-arrow"></i> Season Goals Progress
           </div>
           <div class="goals-list-container">
               ${getGoalProgressHTML()}
           </div>
       </div>
     <div class="season-summary">
       <div class="season-label">${seasonStr}</div>
       <div class="stat-cards-row">
         <div class="stat-card">
           <div class="label">Win %</div>
           <div class="value">${winPct}%</div>
         </div>
         <div class="stat-card">
           <div class="label">Record</div>
           <div class="value">${wins} – ${losses}</div>
         </div>
         <div class="stat-card">
           <div class="label">Games</div>
           <div class="value">${games.length}</div>
         </div>
       </div>
     </div>


     <div class="section-title">Recent Activity</div>


     ${games.length === 0
       ? `<div class="empty-state">No activity yet. Add a sport and log a game to get started!</div>`
       : `<div class="activity-list">${games.map(g => {
           const isGolf = g.sport === 'Boys Golf' || g.sport === 'Girls Golf';
           const resultLabel = isGolf ? 'Played' : (g.isWin ? 'Won' : 'Lost');
           return `
           <div class="activity-row" onclick="openGameDetail('${g.id}')">
             <div class="activity-icon">${getIcon(g.sport)}</div>
             <div class="activity-info">
               <div class="activity-sport">${g.sport}</div>
               <div class="activity-desc">${resultLabel} ${g.yourScore}-${g.opponentScore} vs ${g.opponent}</div>
               <div class="activity-detail">${g.team} ${seasonLabel(g.season)}</div>
             </div>
             <div class="activity-meta">
               <div class="activity-date">${formatDate(g.date)}</div>
               <div class="activity-chevron">›</div>
             </div>
           </div>`;
       }).join('')}</div>`
   }
   </div>
 `;
}


// =============================================================================
//  MARK: - Render: Sports Selection View
// =============================================================================
function renderSports() {
   const panel = document.getElementById('panel-sports');


   const sportRowsHTML = (sports) => sports.map(sport => {
       const checked = state.selectedSports.has(sport);
       return `
     <div class="sport-row" onclick="${state.selectedSports.has(sport) ? `openSportSetup('${sport}')` : `toggleSport('${sport}')`}">
       <span class="sport-row-name">
           ${sport}
           ${state.selectedSports.has(sport) && state.sportConfig[sport] ? `
               <span style="display:block;font-size:11px;color:var(--text-secondary);margin-top:2px;">
                   ${state.sportConfig[sport].positions.length > 0
                       ? state.sportConfig[sport].positions.join(', ')
                       : 'No position set'}
                   · ${state.sportConfig[sport].years.map(y => gradeLabel(y, state.gradYear)).join(', ')}
               </span>` : ''}
       </span>
       <div class="sport-check ${checked ? 'checked' : ''}"></div>
     </div>`;
   }).join('');


   panel.innerHTML = `
   <div class="nav-header">
       <h1 style="font-size:22px;font-weight:800;color:var(--brand-navy);">Select Sports</h1>
      
   </div>
   <div class="page-scroll">
     <div class="sports-section-header">Fall</div>
     ${sportRowsHTML(getVisibleSports(SPORTS_FALL))}
     <div class="sports-section-header">Winter</div>
     ${sportRowsHTML(getVisibleSports(SPORTS_WINTER))}
     <div class="sports-section-header">Spring</div>
     ${sportRowsHTML(getVisibleSports(SPORTS_SPRING))}
   </div>
 `;
}


function toggleSport(sport) {
   if (state.selectedSports.has(sport)) {
       state.selectedSports.delete(sport);
       delete state.sportConfig[sport];
       saveState();
       renderAll();
   } else {
       // Open setup screen instead of immediately adding
       openSportSetup(sport);
   }
}


function openSportSetup(sport) {
   const availSeasons = seasons(state.gradYear);
   const existing = state.sportConfig[sport] || { years: [], positions: [] };
   let selectedYears = new Set(existing.years);
   let selectedPositions = new Set(existing.positions);
   const positions = getPositions(sport);


   function renderSetup() {
       document.getElementById('modal-title').textContent = sport;
       document.getElementById('modal-body').innerHTML = `
       <div class="setup-section">
           <div class="setup-section-title">Active Years</div>
           <div class="setup-option-list">
               ${availSeasons.map(yr => `
                   <div class="setup-option-row" onclick="toggleSetupYear(${yr})">
                       <div class="setup-option-label">
                           <span class="setup-option-main">${seasonLabel(yr)}</span>
                           <span class="setup-option-sub">${gradeLabel(yr, state.gradYear)}</span>
                       </div>
                       <div class="sport-check ${selectedYears.has(yr) ? 'checked' : ''}"></div>
                   </div>`).join('')}
           </div>
       </div>
       ${positions.length > 0 ? `
       <div class="setup-section">
           <div class="setup-section-title">Position(s)</div>
           <div class="setup-option-list">
               ${positions.map(pos => `
                   <div class="setup-option-row" onclick="toggleSetupPosition('${pos.replace(/'/g, "\\'")}')">
                       <span class="setup-option-main">${pos}</span>
                       <div class="sport-check ${selectedPositions.has(pos) ? 'checked' : ''}"></div>
                   </div>`).join('')}
           </div>
       </div>` : ''}
       ${state.selectedSports.has(sport) ? `
       <div class="setup-section">
           <div class="setup-option-list">
               <div class="setup-option-row setup-remove-row" onclick="removeSport('${sport}')">
                   <span class="setup-option-main" style="color:var(--red);">Remove ${sport}</span>
               </div>
           </div>
       </div>` : ''}
       <div class="setup-bottom-spacer"></div>
       `;


       const saveBtn = document.getElementById('modal-save');
       saveBtn.disabled = selectedYears.size === 0;
       saveBtn.onclick = () => {
           state.selectedSports.add(sport);
           state.sportConfig[sport] = {
               years: Array.from(selectedYears),
               positions: Array.from(selectedPositions),
           };
           if (!state.currentSport) state.currentSport = sport;
           saveState();
           closeAddGame();
           renderAll();
       };
   }


   window.toggleSetupYear = (yr) => {
       if (selectedYears.has(yr)) selectedYears.delete(yr);
       else selectedYears.add(yr);
       renderSetup();
   };


   window.toggleSetupPosition = (pos) => {
       if (selectedPositions.has(pos)) selectedPositions.delete(pos);
       else selectedPositions.add(pos);
       renderSetup();
   };


   window.removeSport = (s) => {
       state.selectedSports.delete(s);
       delete state.sportConfig[s];
       if (state.currentSport === s) state.currentSport = '';
       saveState();
       closeAddGame();
       renderAll();
   };


   document.getElementById('modal-overlay').classList.remove('hidden');
   renderSetup();
}


// =============================================================================
//  MARK: - Render: Stats Tab View
// =============================================================================
function renderStats() {
   const panel = document.getElementById('panel-stats');
   const sports = Array.from(state.selectedSports).sort();
   const MODES = ['Season', 'Year', 'All-Time', 'By Team'];


   // Determine filter params by mode
   let filterSeason = null, filterTeam = null, filterTitle = '';
   if (state.statsMode === 'Season') {
       filterSeason = state.activeSeason;
       filterTeam   = state.activeTeam;
       filterTitle  = `${state.activeTeam} · ${seasonLabel(state.activeSeason)}`;
   } else if (state.statsMode === 'Year') {
       filterSeason = state.activeSeason;
       filterTeam   = null;
       filterTitle  = `All Teams · ${seasonLabel(state.activeSeason)}`;
   } else if (state.statsMode === 'All-Time') {
       filterTitle  = 'All-Time · All Teams';
   } else { // By Team
       filterTeam   = state.activeTeam;
       filterTitle  = `All-Time · ${state.activeTeam}`;
   }


   // Selector HTML
   const availSeasons = seasons(state.gradYear);
   const seasonChips = (state.statsMode === 'Season' || state.statsMode === 'Year')
       ? `<div class="chip-row">${availSeasons.map(yr => `
       <button class="chip ${state.activeSeason === yr ? 'active-blue' : ''}" onclick="setActiveSeason(${yr})">
         ${seasonLabel(yr)}<span class="chip-sub">${gradeLabel(yr, state.gradYear)}</span>
       </button>`).join('')}</div>` : '';


   const teamChips = (state.statsMode === 'Season' || state.statsMode === 'By Team')
       ? `<div class="chip-row">${TEAM_LEVELS.map(t => `
       <button class="chip ${state.activeTeam === t ? 'active-navy' : ''}" onclick="setActiveTeam('${t}')">
         ${t}
       </button>`).join('')}</div>` : '';


   const selectorHTML = (seasonChips || teamChips)
       ? `<div class="selector-strip">${seasonChips}${teamChips}</div>` : '';


   // Sport pills
   const sportPills = sports.length > 0
       ? `<div class="sport-pills-row">${sports.map(s => `
       <button class="pill-btn ${state.currentSport === s ? 'active' : ''}" onclick="setCurrentSport('${s}')">
         ${s}
       </button>`).join('')}</div>` : '';


   // Dashboard content
   let dashboardHTML = '';
   if (sports.length === 0) {
       dashboardHTML = `<div class="empty-state">No sports selected. Go to the Sports tab to choose your sports.</div>`;
   } else if (!state.currentSport) {
       dashboardHTML = `<div class="empty-state">Select a sport above to view stats.</div>`;
   } else {
       const filteredGames = getFilteredGames(state.currentSport, filterSeason, filterTeam);
       dashboardHTML = renderDashboard(state.currentSport, filteredGames, filterTitle);
   }


   panel.innerHTML = `
   <div class="nav-header">
       <h1 style="font-size:22px;font-weight:800;color:var(--brand-navy);">Stats</h1>
      
   </div>
   <div class="page-scroll">
     <div class="segmented-control">
       ${MODES.map(m => `<button class="seg-btn ${state.statsMode === m ? 'active' : ''}" onclick="setStatsMode('${m}')">${m}</button>`).join('')}
     </div>
     ${selectorHTML}
     ${sportPills}
     ${dashboardHTML}
   </div>
 `;
}


function renderDashboard(sport, filteredGames, filterTitle) {
   const isGolf = sport === 'Boys Golf' || sport === 'Girls Golf';
   const wins   = isGolf ? 0 : filteredGames.filter(g => g.isWin).length;
   const losses = isGolf ? 0 : filteredGames.filter(g => !g.isWin).length;
   const agg    = aggregateStats(filteredGames, sport);
   const inputMappings = getInputStats(sport);


   // Efficiency section
   let effHTML = '';
   if (sport === 'Basketball') {
       effHTML = `
     <div class="efficiency-block">
       <h3>Efficiency</h3>
       <div class="efficiency-row">
         ${statBox('FG%',  aggregatePct(filteredGames, 'FGM', 'FGA'), 'color-orange')}
         ${statBox('3P%',  aggregatePct(filteredGames, '3PM', '3PA'), 'color-orange')}
         ${statBox('FT%',  aggregatePct(filteredGames, 'FTM', 'FTA'), 'color-orange')}
       </div>
     </div>`;
   } else if (sport === 'Football') {
       effHTML = `
     <div class="efficiency-block">
       <h3>Efficiency</h3>
       <div class="efficiency-row">
         ${statBox('CMP%',     aggregatePct(filteredGames, 'Completions', 'Pass Attempts'), 'color-brown')}
         ${statBox('Pass YPA', agg['Pass YPA'] ?? '0.0', 'color-brown')}
         ${statBox('Rush YPC', agg['Rush YPC'] ?? '0.0', 'color-brown')}
       </div>
     </div>`;
   } else if (sport === 'Bowling') {
       effHTML = `
     <div class="efficiency-block">
       <h3>Efficiency</h3>
       <div class="efficiency-row">
         ${statBox('Strike %',    agg['Strike %']    ?? '0.0%', 'color-purple')}
         ${statBox('Spare Conv %',agg['Spare Conv %']?? '0.0%', 'color-purple')}
         ${statBox('Fill %',      agg['Fill %']      ?? '0.0%', 'color-purple')}
       </div>
     </div>`;
   } else if (sport === 'Softball' || sport === 'Baseball') {
       effHTML = `
     <div class="efficiency-block">
       <h3>Efficiency</h3>
       <div class="efficiency-row">
         ${statBox('AVG', agg['AVG'] ?? '.000', 'color-orange')}
       </div>
     </div>`;
   } else if (sport === 'Boys Golf' || sport === 'Girls Golf') {
       const score   = parseFloat(agg['Total Score'] || '0') || 0;
       const par     = parseFloat(agg['Total Par']   || '0') || 0;
       const diff    = score - par;
       const diffStr = diff === 0 ? 'E' : (diff > 0 ? '+' : '') + diff;
       effHTML = `
     <div class="efficiency-block">
       <h3>Efficiency</h3>
       <div class="efficiency-row">
         ${statBox('Avg 18', agg['Avg 18 Score'] ?? '0.0', 'color-green')}
         ${statBox('vs Par', diffStr, diff <= 0 ? 'color-green' : 'color-red')}
         ${statBox('HCP', agg['Handicap'] ?? '0.0', 'color-blue')}
       </div>
     </div>`;
   }


   // Personal Records block
   const prs = state.personalRecords[sport] ?? {};
   const prEntries = Object.entries(prs).filter(([_, pr]) => pr.value > 0);
   let prHTML = '';
   if (prEntries.length > 0) {
       const prCells = prEntries.map(([stat, pr]) => {
           const d = new Date(pr.date);
           const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
           return `
           <div class="detail-stat-cell">
               <span class="detail-stat-key">${stat}</span>
               <span class="detail-stat-val color-blue">${pr.value}
                   <span style="font-size:10px;color:var(--text-secondary);font-weight:500;display:block;">${dateStr}</span>
               </span>
           </div>`;
       }).join('');
       prHTML = `
       <div class="efficiency-block">
           <h3><i class="fi fi-rr-trophy"></i> Personal Records</h3>
           <div class="detail-box-grid">${prCells}</div>
       </div>`;
   }


   // Achievements block
   const sportAchievements = state.achievements.filter(a => a.sport === sport);
   const achievementsHTML = `
   <div class="efficiency-block">
       <h3><i class="fi fi-rr-medal"></i> Achievements</h3>
       ${sportAchievements.length === 0
       ? `<p style="font-size:13px;color:var(--text-secondary);margin:0;">No achievements yet — add your first one below.</p>`
       : `<div class="activity-list">
               ${sportAchievements.map(a => `
               <div class="activity-row" style="cursor:default;">
                   <div class="activity-info">
                       <div class="activity-sport">${a.title}</div>
                       ${a.description ? `<div class="activity-desc">${a.description}</div>` : ''}
                       <div class="activity-detail">${a.date
           ? new Date(a.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
           : ''}</div>
                   </div>
                   <div class="activity-meta" style="display:flex;flex-direction:column;gap:4px;align-items:flex-end;">
                       <button class="game-action-btn ${a.showOnProfile ? 'edit' : ''}"
                           style="${!a.showOnProfile ? 'color:var(--text-secondary);background:var(--secondary-bg);' : ''}"
                           onclick="toggleAchievementProfile('${a.id}')">
                           ${a.showOnProfile ? '👤 On' : '👤 Off'}
                       </button>
                       <button class="game-action-btn delete" onclick="deleteAchievement('${a.id}')">Delete</button>
                   </div>
               </div>`).join('')}
              </div>`}
       <div class="goals-form-row" style="flex-direction:column;gap:8px;">
           <input id="ach-title" class="goal-input-text" style="width:100%;" type="text" placeholder="Title  (e.g. Regional Champions, MVP)" />
           <input id="ach-desc" class="goal-input-text" style="width:100%;" type="text" placeholder="Description (optional)" />
           <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
               <input id="ach-date" class="goal-input-text" style="width:130px;" type="date"
                   value="${new Date().toISOString().slice(0, 10)}" />
               <label style="display:flex;align-items:center;gap:5px;font-size:12px;font-weight:600;color:var(--text-secondary);cursor:pointer;">
                   <input type="checkbox" id="ach-profile" checked
                       style="width:14px;height:14px;accent-color:var(--brand-blue);" />
                   Show on Profile
               </label>
               <button class="goal-add-btn" onclick="addAchievement(
                   '${sport}',
                   document.getElementById('ach-title').value,
                   document.getElementById('ach-desc').value,
                   document.getElementById('ach-date').value,
                   document.getElementById('ach-profile').checked
               )">Add</button>
           </div>
       </div>
   </div>`;


   // Per-game averages grid
   let avgGridHTML = '';
   if (sport === 'Boys Golf' || sport === 'Girls Golf') {
       avgGridHTML = [
           ['Holes/R',    agg['Holes Played'] ? (parseFloat(agg['Holes Played']) / filteredGames.length).toFixed(1) : '0.0'],
           ['Avg Score',  agg['Avg 18 Score'] ?? '0.0'],
           ['Putts/Hole', agg['Putts/Hole']   ?? '0.00'],
           ['+/-/Hole',   agg['Avg +/- Per Hole'] ?? 'E'],
           ['Avg Par3',   agg['Avg Par3']     ?? '—'],
           ['Avg Par4',   agg['Avg Par4']     ?? '—'],
           ['Avg Par5',   agg['Avg Par5']     ?? '—'],
           ['Par3/R',     agg['Par 3 Count']  ? (parseFloat(agg['Par 3 Count']) / filteredGames.length).toFixed(1) : '0.0'],
           ['Par4/R',     agg['Par 4 Count']  ? (parseFloat(agg['Par 4 Count']) / filteredGames.length).toFixed(1) : '0.0'],
           ['Par5/R',     agg['Par 5 Count']  ? (parseFloat(agg['Par 5 Count']) / filteredGames.length).toFixed(1) : '0.0'],
           ['Avg 9',      agg['Avg 9 Score']  ?? '0.0'],
           ['HCP',        agg['Handicap']     ?? '0.0'],
       ].map(([label, value]) => statBox(label, String(value), 'color-teal')).join('');
   } else {
       avgGridHTML = inputMappings.map(map => {
           const v   = parseFloat(agg[map.entryLabel] || '0') || 0;
           const avg = filteredGames.length ? (v / filteredGames.length).toFixed(1) : '0.0';
           return statBox(map.avgLabel, avg, 'color-teal');
       }).join('');
   }


   // Totals grid — skip calculated/derived stats, just raw accumulated totals
   const totalsGridHTML = inputMappings
       .filter(map => !map.isCalculated)
       .map(map => {
           const v = agg[map.entryLabel] ?? '0';
           return statBox(map.totalLabel, v, 'color-blue');
       }).join('');


   // Game history list
   const historyHTML = filteredGames.length === 0 ? '' : `
   <div style="padding: 0 16px 12px;">
     <div class="section-title" style="text-align:left; margin-bottom:10px;">Game History</div>
     <div class="activity-list">
       ${filteredGames.map(g => `
         <div class="activity-row" onclick="openGameDetail('${g.id}')">
           <div class="activity-info">
             <div class="activity-sport">${isGolf ? '⛳' : (g.isWin ? '✅' : '❌')} vs ${g.opponent}</div>
             <div class="activity-desc">${g.yourScore}–${g.opponentScore} · ${g.team}</div>
             <div class="activity-detail">${formatDate(g.date)}</div>
           </div>
           <div class="activity-meta" style="display:flex;flex-direction:column;gap:4px;align-items:flex-end;">
             <button onclick="event.stopPropagation(); openEditGame('${g.id}')"
                   class="game-action-btn edit">Edit</button>
               <button onclick="event.stopPropagation(); deleteGame('${g.id}', '${g.sport}')"
                   class="game-action-btn delete">Delete</button>
           </div>
         </div>`).join('')}
     </div>
   </div>`;


   return `
   <div class="stats-filter-banner">${filterTitle}</div>
   <div class="dashboard-wrap">
     <div class="dashboard-record-row">
       ${statBox('Wins',   String(wins),   'color-green')}
       ${statBox('Losses', String(losses), 'color-red')}
       ${statBox('Games',  String(filteredGames.length), 'color-blue')}
     </div>
     ${effHTML}
     ${prHTML}
     ${achievementsHTML}
     <div class="efficiency-block">
       <h3>Averages</h3>
       <div class="avg-grid">${avgGridHTML}</div>
     </div>
     <div class="efficiency-block">
       <h3>Totals</h3>
       <div class="avg-grid">${totalsGridHTML}</div>
     </div>
   </div>
   ${renderProgressGraph(sport, filteredGames, inputMappings)}
   <div style="padding:0 16px 12px;display:flex;justify-content:flex-end;">
     <button class="add-game-btn" onclick="openAddGame('${sport}')">+ Add Game</button>
   </div>
   ${historyHTML}
 `;
}


/** Adds a custom stat goal targeting the current active season context */
function addSeasonGoal(statName, targetValue) {
   if (!statName || !targetValue) return;
   state.seasonGoals.push({
       id: uuid(),
       sport: state.currentSport || Array.from(state.selectedSports)[0] || 'Basketball',
       statName: statName,
       target: parseFloat(targetValue),
       season: state.activeSeason
   });
   renderAll();
}


/** Deletes an existing season target goal */
function deleteSeasonGoal(goalId) {
   state.seasonGoals = state.seasonGoals.filter(g => g.id !== goalId);
   renderAll();
}
// =============================================================================
//  MARK: - Achievements
// =============================================================================
function addAchievement(sport, title, description, date, showOnProfile) {
   if (!title || !title.trim()) return;
   state.achievements.push({
       id: uuid(),
       sport,
       title: title.trim(),
       description: (description || '').trim(),
       date: date || new Date().toISOString().slice(0, 10),
       showOnProfile: showOnProfile,
   });
   saveState();
   renderAll();
}


function deleteAchievement(id) {
   if (!confirm('Delete this achievement?')) return;
   state.achievements = state.achievements.filter(a => a.id !== id);
   saveState();
   renderAll();
}


function toggleAchievementProfile(id) {
   const a = state.achievements.find(a => a.id === id);
   if (a) {
       a.showOnProfile = !a.showOnProfile;
       saveState();
       renderAll();
   }
}


/** Generates clean structural layout for active seasonal targets */
function getGoalProgressHTML() {
   const currentSport = state.currentSport || Array.from(state.selectedSports)[0];
   if (!currentSport) {
       return `<div class="activity-detail">Select a sport to track goals!</div>`;
   }


   const seasonGames = state.allGames.filter(g => g.sport === currentSport && g.season === state.activeSeason);
   const goals = state.seasonGoals.filter(g => g.sport === currentSport && g.season === state.activeSeason);


   if (goals.length === 0) {
       return `
           <div class="goals-form-row">
               <input type="text" id="new-goal-name" class="goal-input-text" placeholder="e.g., Points, Tackles">
               <input type="number" id="new-goal-target" class="goal-input-number" placeholder="Target">
               <button class="goal-add-btn" onclick="addSeasonGoal(document.getElementById('new-goal-name').value, document.getElementById('new-goal-target').value)">+ Add</button>
           </div>
       `;
   }


   return goals.map(goal => {
       let currentSum = 0;
       seasonGames.forEach(g => {
           currentSum += parseFloat(g.gameStats[goal.statName] || '0');
       });


       const pct = Math.min(100, (currentSum / goal.target) * 100).toFixed(0);


       return `
           <div class="goal-item">
               <div class="goal-meta">
                   <strong>${goal.statName}</strong>
                   <span>
                       ${currentSum} / ${goal.target} (${pct}%)
                       <span class="goal-delete-btn" onclick="deleteSeasonGoal('${goal.id}')">✕</span>
                   </span>
               </div>
               <div class="goal-bar-track">
                   <div class="goal-bar-fill" style="width: ${pct}%;"></div>
               </div>
           </div>
       `;
   }).join('') + `
       <div class="goals-form-row">
           <input type="text" id="new-goal-name" class="goal-input-text" placeholder="Add another goal...">
           <input type="number" id="new-goal-target" class="goal-input-number" placeholder="Target">
           <button class="goal-add-btn" onclick="addSeasonGoal(document.getElementById('new-goal-name').value, document.getElementById('new-goal-target').value)">+</button>
       </div>
   `;
}


/** Generates a printable resume document, pulling design layouts from style.css */
function exportAthleticResume() {
   const p = state.profile;
   const currentSport = state.currentSport || Array.from(state.selectedSports)[0] || 'All Sports';


   let totalGames = state.allGames.length;
   let totalWins = state.allGames.filter(g => g.isWin).length;
   let totalLosses = totalGames - totalWins;
   let winPct = totalGames ? ((totalWins / totalGames) * 100).toFixed(1) : '0.0';


   const printWindow = window.open('', '_blank');


   // The trick to fixing the export without scripts or styles inside Javascript:
   // We import your actual style.css directly into the print preview context!
   printWindow.document.write(`
       <!DOCTYPE html>
       <html>
       <head>
           <title>${p.playerName} - Athletic Resume</title>
           <link rel="stylesheet" href="style.css">
       </head>
       <body class="resume-body">
           <button class="resume-print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
          
           <div class="resume-header">
               <h1 class="resume-name">${p.playerName || 'Student Athlete'}</h1>
               <p class="resume-school">🏫 ${p.highSchool || 'High School'} · Class of ${state.gradYear || 'N/A'}</p>
           </div>
          
           <div class="resume-grid">
               <div>
                   <h3 class="resume-section-title">📊 Career Overview (${currentSport})</h3>
                   <div class="resume-stat-row"><span class="resume-label">Total Games Played:</span><span class="resume-val">${totalGames}</span></div>
                   <div class="resume-stat-row"><span class="resume-label">Career Record:</span><span class="resume-val">${totalWins}W - ${totalLosses}L</span></div>
                   <div class="resume-stat-row"><span class="resume-label">Career Win Percentage:</span><span class="resume-val">${winPct}%</span></div>
                   <div class="resume-stat-row"><span class="resume-label">Current Level:</span><span class="resume-val">${state.activeTeam || 'Varsity'}</span></div>
               </div>
               <div>
                   <h3 class="resume-section-title">💪 Physical & Workout Metrics</h3>
                   <div class="resume-stat-row"><span class="resume-label">Height / Weight:</span><span class="resume-val">${p.height || '--'} / ${p.weight || '--'}</span></div>
                   <div class="resume-stat-row"><span class="resume-label">Bench Press MAX:</span><span class="resume-val">${p.benchPress || '--'} lbs</span></div>
                   <div class="resume-stat-row"><span class="resume-label">Squat MAX:</span><span class="resume-val">${p.squat || '--'} lbs</span></div>
                   <div class="resume-stat-row"><span class="resume-label">Deadlift MAX:</span><span class="resume-val">${p.deadlift || '--'} lbs</span></div>
                   <div class="resume-stat-row"><span class="resume-label">40-Yard Dash:</span><span class="resume-val">${p.fortyYard || '--'}s</span></div>
                   <div class="resume-stat-row"><span class="resume-label">Vertical Jump:</span><span class="resume-val">${p.vertical || '--'}"</span></div>
               </div>
           </div>
          
           <p class="resume-footer">Generated via Athletiq App</p>
       </body>
       </html>
   `);
   printWindow.document.close();
}


function renderProgressGraph(sport, games, inputMappings) {
   if (games.length < 2) return '';


   const chronological = [...games].sort((a, b) => a.date - b.date);


   // Sport-specific stat sets
   let statOptions = [];


   if (sport === 'Bowling') {
       // Use efficiency derived stats
       statOptions = [
           { entryLabel: 'Strike %',     avgLabel: 'Strike %',     derived: true },
           { entryLabel: 'Spare Conv %', avgLabel: 'Spare Conv %', derived: true },
           { entryLabel: 'Fill %',       avgLabel: 'Fill %',       derived: true },
       ];
   } else {
       statOptions = inputMappings
           .filter(m => !m.isCalculated)
           .filter(m => chronological.some(g => parseFloat(g.gameStats[m.entryLabel] || '0') > 0))
           .slice(0, 4);
   }


   if (statOptions.length === 0) return '';


   const defaultStat = statOptions[0].entryLabel;
   const svgHTML = buildGraphSVG(chronological, defaultStat, sport);


   const tabsHTML = statOptions.map((m, i) => `
       <button class="pgraph-tab ${i === 0 ? 'active' : ''}"
               data-stat="${m.entryLabel}"
               onclick="handleGraphTabClick(this)">
           ${m.avgLabel}
       </button>`).join('');


   return `
   <div class="efficiency-block" style="padding: 0 16px;">
       <div class="pgraph-header" data-graph-toggle>
           <h3 style="margin:0;font-size:16px;font-weight:700;">Progress Graph</h3>
           <span class="pgraph-arrow"><i class="fi fi-rr-angle-small-down"></i></span>
       </div>
       <div class="pgraph-body hidden">
           <div class="pgraph-tabs">${tabsHTML}</div>
           <div class="pgraph-svg-wrap">${svgHTML}</div>
       </div>
   </div>`;
}


function buildGraphSVG(chronologicalGames, statKey, sport) {
   let values;


   // For derived stats like bowling percentages, calculate per game
   const derivedKeys = ['Strike %', 'Spare Conv %', 'Fill %', 'Open %'];
   if (derivedKeys.includes(statKey)) {
       values = chronologicalGames.map(g => {
           const derived = calculateDerivedStats(sport, g.gameStats);
           return parseFloat(derived[statKey]) || 0;
       });
   } else {
       values = chronologicalGames.map(g => parseFloat(g.gameStats[statKey] || '0') || 0);
   }


   const labels = chronologicalGames.map(g => formatDate(g.date));
   const max = Math.max(...values, 1);
   const min = 0;


   const W = 320, H = 140;
   const padL = 36, padR = 12, padT = 16, padB = 36;
   const graphW = W - padL - padR;
   const graphH = H - padT - padB;
   const xStep = values.length > 1 ? graphW / (values.length - 1) : graphW;


   const toX = i => padL + i * xStep;
   const toY = v => padT + graphH - ((v - min) / (max - min || 1)) * graphH;


   const isPercent = statKey.includes('%');


   const gridVals = [0, Math.round(max / 2), max];
   const gridLines = gridVals.map(v => {
       const y = toY(v);
       const label = isPercent ? v.toFixed(0) + '%' : v;
       return `
           <line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}"
                 stroke="rgba(38,99,235,0.12)" stroke-width="1" stroke-dasharray="4,3"/>
           <text x="${padL - 4}" y="${y + 4}" text-anchor="end"
                 font-size="9" fill="var(--text-secondary)">${label}</text>`;
   }).join('');


   const points = values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
   const fillPoints = [
       `${toX(0)},${padT + graphH}`,
       ...values.map((v, i) => `${toX(i)},${toY(v)}`),
       `${toX(values.length - 1)},${padT + graphH}`
   ].join(' ');


   const dots = values.map((v, i) => {
       const x = toX(i), y = toY(v);
       const showLabel = values.length <= 5 || i === 0 || i === values.length - 1 || i % 2 === 0;
       const displayVal = isPercent ? v.toFixed(1) + '%' : v;
       return `
           <circle cx="${x}" cy="${y}" r="4" fill="var(--brand-blue)" stroke="white" stroke-width="2"/>
           ${showLabel ? `<text x="${x}" y="${padT + graphH + 14}" text-anchor="middle"
                 font-size="8" fill="var(--text-secondary)">${formatDate ? labels[i] : ''}</text>` : ''}
           <title>${displayVal}</title>`;
   }).join('');


   return `
   <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
        style="width:100%;height:auto;display:block;">
       <defs>
           <linearGradient id="pgFill" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stop-color="var(--brand-blue)" stop-opacity="0.18"/>
               <stop offset="100%" stop-color="var(--brand-blue)" stop-opacity="0.01"/>
           </linearGradient>
       </defs>
       ${gridLines}
       <polygon points="${fillPoints}" fill="url(#pgFill)"/>
       <polyline points="${points}" fill="none"
                 stroke="var(--brand-blue)" stroke-width="2.5"
                 stroke-linejoin="round" stroke-linecap="round"/>
       ${dots}
   </svg>`;
}


function handleGraphToggle(headerEl) {
   const body = headerEl.nextElementSibling;
   const arrow = headerEl.querySelector('.pgraph-arrow');
   if (!body) return;
   const isHidden = body.classList.toggle('hidden');
   if (arrow) arrow.textContent = isHidden ? '▼' : '▲';
}


function handleGraphTabClick(tabEl) {
   const tabs = tabEl.closest('.pgraph-tabs');
   tabs.querySelectorAll('.pgraph-tab').forEach(t => t.classList.remove('active'));
   tabEl.classList.add('active');


   const statKey = tabEl.dataset.stat;
   const sport = state.currentSport;


   let filterSeason = null, filterTeam = null;
   if (state.statsMode === 'Season')      { filterSeason = state.activeSeason; filterTeam = state.activeTeam; }
   else if (state.statsMode === 'Year')   { filterSeason = state.activeSeason; }
   else if (state.statsMode === 'By Team'){ filterTeam = state.activeTeam; }


   const games = getFilteredGames(sport, filterSeason, filterTeam)
       .sort((a, b) => a.date - b.date);


   const svgWrap = tabEl.closest('.pgraph-body').querySelector('.pgraph-svg-wrap');
   if (svgWrap) svgWrap.innerHTML = buildGraphSVG(games, statKey, sport);
}


function statBox(label, value, colorClass) {
   return `
   <div class="stat-box">
     <div class="sb-value ${colorClass}">${value}</div>
     <div class="sb-label">${label}</div>
   </div>`;
}


// =============================================================================
//  MARK: - Render: Profile View
// =============================================================================
function renderProfile() {
   const panel = document.getElementById('panel-profile');
   const p = state.profile;
   const ed = state.profileEditing;
   const availSeasons = seasons(state.gradYear);


   const profileRow = (label, field) => `
   <div class="profile-row">
     <span class="profile-row-label">${label}</span>
     ${ed
       ? `<input class="profile-input" value="${p[field]}" onchange="updateProfile('${field}', this.value)" />`
       : `<span class="profile-row-value">${p[field]}</span>`}
   </div>`;


   panel.innerHTML = `
   <div class="nav-header">
       <h1 style="font-size:22px;font-weight:800;color:var(--brand-navy);">Profile</h1>
   </div>
   <div class="page-scroll">
     <div class="profile-avatar-section">
       <div class="avatar-circle">
         <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
       </div>
       ${ed
       ? `<input class="profile-text-input" value="${p.playerName}" onchange="updateProfile('playerName', this.value)" />
            <input class="profile-text-input" value="${p.highSchool}" onchange="updateProfile('highSchool', this.value)" style="font-size:14px;" />`
       : `<div class="profile-name">${p.playerName}</div>
    <div class="profile-school">${p.highSchool}</div>
    ${state.selectedSports.size > 0 ? `
<div class="profile-sports-row">
   ${Array.from(state.selectedSports).filter(sport => {
           const config = state.sportConfig[sport];
           if (!config || config.years.length === 0) return true;
           return config.years.includes(state.activeSeason);
       }).map(sport => {
           const config = state.sportConfig[sport];
           const positions = config && config.positions.length > 0
               ? config.positions.join(' / ') : '';
           return `<div class="profile-sport-chip">
           ${sport}
           ${positions ? `<span class="profile-sport-chip-positions">${positions}</span>` : ''}
       </div>`;
       }).join('')}
</div>` : ''}`}
       ${(() => {
       const profileAchievements = state.achievements.filter(a => a.showOnProfile);
       if (profileAchievements.length === 0) return '';
       return `
           <div class="profile-sports-row" style="flex-direction:column;align-items:stretch;gap:6px;margin-top:8px;">
               <div style="font-size:12px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.6px;text-align:center;"><i class="fi fi-rr-medal"></i> Achievements</div>
               ${profileAchievements.map(a => `
               <div class="activity-row" style="cursor:default;padding:10px 12px;">
                   <div class="activity-info">
                       <div class="activity-sport">${a.title}</div>
                       ${a.description ? `<div class="activity-desc">${a.description}</div>` : ''}
                   </div>
                   <div class="profile-sport-chip" style="flex-shrink:0;">${a.sport}</div>
               </div>`).join('')}
           </div>`;
   })()}
       <button class="edit-toggle-btn" onclick="toggleProfileEdit()">
         ${ed ? '✓ Done' : '️Edit Profile'}
       </button>
     </div>


     <div class="profile-section">
       <div class="profile-section-title">Career</div>
       <div class="profile-row">
         <span class="profile-row-label">Grad Year</span>
         ${ed
       ? `<select class="profile-select" onchange="updateGradYear(this.value)">
               ${[2024,2025,2026,2027,2028,2029,2030,2031,2032].map(y =>
           `<option value="${y}" ${state.gradYear === y ? 'selected' : ''}>${y}</option>`).join('')}
              </select>`
       : `<span class="profile-row-value">${state.gradYear}</span>`}
       </div>
       <div class="profile-row">
         <span class="profile-row-label">Active Season</span>
         ${ed
       ? `<select class="profile-select" onchange="setActiveSeason(this.value)">
               ${availSeasons.map(yr =>
           `<option value="${yr}" ${state.activeSeason === yr ? 'selected' : ''}>${seasonLabel(yr)} – ${gradeLabel(yr, state.gradYear)}</option>`).join('')}
              </select>`
       : `<span class="profile-row-value">${seasonLabel(state.activeSeason)}</span>`}
       </div>
       <div class="profile-row">
         <span class="profile-row-label">Active Team</span>
         ${ed
       ? `<select class="profile-select" onchange="setActiveTeam(this.value)">
               ${TEAM_LEVELS.map(t =>
           `<option value="${t}" ${state.activeTeam === t ? 'selected' : ''}>${t}</option>`).join('')}
              </select>`
       : `<span class="profile-row-value">${state.activeTeam}</span>`}
       </div>
     </div>


     <div class="profile-section">
       <div class="profile-section-title">Physical Info</div>
       ${profileRow('Height', 'height')}
       ${profileRow('Weight', 'weight')}
       <div class="profile-row">
 <span class="profile-row-label">Gender</span>
 ${ed
       ? `<select class="profile-select" onchange="updateProfile('gender', this.value)">
       ${['—', 'Male', 'Female', 'Non-binary'].map(g =>
           `<option value="${g}" ${p.gender === g ? 'selected' : ''}>${g}</option>`).join('')}
      </select>`
       : `<span class="profile-row-value">${p.gender}</span>`}
</div>
     </div>


     <div class="profile-section">
       <div class="profile-section-title">Workout PRs (lbs)</div>
       ${profileRow('Bench Press', 'benchPress')}
       ${profileRow('Squat',       'squat')}
       ${profileRow('Deadlift',    'deadlift')}
       ${profileRow('Power Clean', 'clean')}
     </div>
    
     <div class="profile-section">
       <div class="profile-section-title">Agility</div>
       ${profileRow('Vertical',    'vertical')}
       ${profileRow('40 Yard Dash',    'fortyYard')}
       ${profileRow('100 Meter',    'hundred')}
       ${profileRow('200 Meter',    'twoHundred')}
       ${profileRow('Shuffle',    'shuffle')}
     </div>
     <div class="profile-action-container">
       <button class="export-resume-btn" onclick="exportAthleticResume()">
       Export Recruit Resume PDF
       <i class="fi fi-rr-file-export"></i>
       </button>
     </div>
   </div>
 `;
}


// =============================================================================
//  MARK: - Game Detail Modal (GameDetailView)
// =============================================================================
function openGameDetail(gameId) {
   const game = state.allGames.find(g => g.id === gameId);
   if (!game) return;
   const isGolf = game.sport === 'Boys Golf' || game.sport === 'Girls Golf';


   const allStats = { ...game.gameStats, ...calculateDerivedStats(game.sport, game.gameStats) };
   const mappings = getStatMappings(game.sport);


   // Efficiency row
   let effHTML = '';
   if (game.sport === 'Basketball') {
       effHTML = `
     <div class="detail-section-title">Efficiency</div>
     <div class="detail-eff-row">
       ${statBox('FG%', gamePct(game.gameStats,'FGM','FGA'), 'color-orange')}
       ${statBox('3P%', gamePct(game.gameStats,'3PM','3PA'), 'color-orange')}
       ${statBox('FT%', gamePct(game.gameStats,'FTM','FTA'), 'color-orange')}
     </div>`;
   } else if (game.sport === 'Football') {
       effHTML = `
     <div class="detail-section-title">Efficiency</div>
     <div class="detail-eff-row">
       ${statBox('CMP%',     gamePct(game.gameStats,'Completions','Pass Attempts'), 'color-brown')}
       ${statBox('Pass YPA', allStats['Pass YPA'] ?? '0.0', 'color-brown')}
       ${statBox('Rush YPC', allStats['Rush YPC'] ?? '0.0', 'color-brown')}
     </div>`;
   }
   else if (game.sport === 'Softball') {
       effHTML = `
       <div class="detail-section-title">Efficiency</div>
       <div class="detail-eff-row">
       ${statBox('AVG', allStats['AVG'] ?? '0.0', 'color-orange')}
     </div>`;
   }
   else if (game.sport === 'Boys Golf' || game.sport === 'Girls Golf') {
       const s     = game.gameStats;
       const score = parseInt(s['Total Score'] || '0');
       const par   = parseInt(s['Total Par']   || '0');
       const putts = parseInt(s['Total Putts'] || '0');
       const holes = parseInt(s['Holes Played']|| '0');
       const diff  = score - par;
       const diffStr = diff === 0 ? 'E' : (diff > 0 ? '+' : '') + diff;
       effHTML = `
     <div class="detail-section-title">Round Summary</div>
     <div class="detail-eff-row">
       ${statBox('Score', String(score), 'color-blue')}
       ${statBox('vs Par', diffStr, diff <= 0 ? 'color-green' : 'color-red')}
       ${statBox('Putts', String(putts), 'color-teal')}
     </div>`;
   }


   // Box score
   const boxHTML = mappings.map(stat => `
   <div class="detail-stat-cell">
     <span class="detail-stat-key">${stat.entryLabel}</span>
     <span class="detail-stat-val">${allStats[stat.entryLabel] ?? '0'}</span>
   </div>`).join('');


   document.getElementById('detail-title').textContent = game.sport;
   const resultHTML = isGolf
       ? `<div class="detail-result" style="color:var(--text-secondary);">Round Recorded</div>`
       : `<div class="detail-result ${game.isWin ? 'win' : 'loss'}">${game.isWin ? 'Victory' : 'Tough Loss'}</div>`;
   document.getElementById('detail-body').innerHTML = `
   <div class="detail-hero">
     ${resultHTML}
     <div class="detail-score-row">
       <div class="detail-score-team">
         <div class="detail-score-num">${game.yourScore}</div>
         <div class="detail-score-label">Us</div>
       </div>
       <div class="detail-vs">VS</div>
       <div class="detail-score-team">
         <div class="detail-score-num">${game.opponentScore}</div>
         <div class="detail-score-label">Them</div>
       </div>
     </div>
     <div class="detail-opponent">vs ${game.opponent}</div>
     <div class="detail-meta-row">
       <span>👥 ${game.team}</span>
       <span>·</span>
       <span>📅 ${seasonLabel(game.season)}</span>
       <span>·</span>
       <span>${formatDate(game.date)}</span>
     </div>
   </div>
   ${effHTML}
   <div class="detail-section-title">Box Score</div>
   <div class="detail-box-grid">${boxHTML}</div>
 `;


   document.getElementById('detail-overlay').classList.remove('hidden');
}


document.getElementById('detail-back').addEventListener('click', () => {
   document.getElementById('detail-overlay').classList.add('hidden');
});


// =============================================================================
//  MARK: - Add Game Modal (AddGameSheet)
// =============================================================================
function openAddGame(sport) {
   if (sport === 'Boys Golf' || sport === 'Girls Golf') {
       openGolfScorecard(sport);
       return;
   }


   const filterSeason = state.statsMode !== 'All-Time' ? state.activeSeason : new Date().getFullYear();
   const filterTeam   = (state.statsMode === 'Season' || state.statsMode === 'By Team') ? state.activeTeam : 'Varsity';
   const sections = getStatSections(sport);


   const statSectionsHTML = sections.map(sec => sec.keys.length === 0 ? '' : `
   <div class="form-section">
     <div class="form-section-title">${sec.title}</div>
     ${sec.keys.map(key => `
       <div class="form-row">
         <label>${key}</label>
         <input class="form-input stat-input" data-key="${key}" type="number" step="any" placeholder="0" value="" inputmode="decimal" />
       </div>`).join('')}
   </div>`).join('');


   document.getElementById('modal-title').textContent = `Add Game — ${sport}`;
   document.getElementById('modal-body').innerHTML = `
   <div class="form-section">
     <div class="form-section-title">Game Info</div>
     <div class="form-row">
       <label>Opponent</label>
       <input id="ag-opponent" class="form-input wide" type="text" placeholder="Opponent name" />
     </div>
     <div class="form-row">
       <label>Date</label>
       <input id="ag-date" class="form-input" type="date" value="${new Date().toISOString().slice(0,10)}" style="width:140px;" />
     </div>
     <div class="form-row">
       <label>Win</label>
       <label class="form-toggle">
         <input id="ag-win" type="checkbox" />
         <span class="toggle-slider"></span>
       </label>
     </div>
   </div>
   <div class="form-section">
     <div class="form-section-title">Score</div>
     <div class="form-row">
       <label>Us</label>
       <input id="ag-our-score"  class="form-input" type="number" placeholder="0" inputmode="numeric" />
     </div>
     <div class="form-row">
       <label>Them</label>
       <input id="ag-their-score" class="form-input" type="number" placeholder="0" inputmode="numeric" />
     </div>
   </div>
   ${statSectionsHTML}
   <div style="height:24px;"></div>
 `;


   const saveBtn = document.getElementById('modal-save');
   saveBtn.disabled = true;
   document.getElementById('ag-opponent').addEventListener('input', e => {
       saveBtn.disabled = !e.target.value.trim();
   });


   saveBtn.onclick = () => {
       const opponent   = document.getElementById('ag-opponent').value.trim();
       if (!opponent) return;
       const ourScore   = parseInt(document.getElementById('ag-our-score').value) || 0;
       const theirScore = parseInt(document.getElementById('ag-their-score').value) || 0;
       const isWin      = document.getElementById('ag-win').checked;
       const dateVal    = document.getElementById('ag-date').value;
       const date       = dateVal ? new Date(dateVal + 'T12:00:00') : new Date();
       const gameStats  = {};
       document.querySelectorAll('.stat-input').forEach(input => {
           if (input.value !== '') gameStats[input.dataset.key] = input.value;
       });


       const newGame = makeGame({
           sport, opponent,
           yourScore: ourScore, opponentScore: theirScore,
           isWin, date, gameStats,
           season: filterSeason, team: filterTeam,
       });


       state.allGames.push(newGame);
       checkPersonalRecords(newGame);  // check PRs on every new game
       saveState();                    // then persist
       closeAddGame();
       renderAll();
   };


   document.getElementById('modal-overlay').classList.remove('hidden');
}


function closeAddGame() {
   document.getElementById('modal-overlay').classList.add('hidden');
}
function deleteGame(gameId, sport) {
   if (!confirm('Delete this game? This cannot be undone.')) return;
   state.allGames = state.allGames.filter(g => g.id !== gameId);
   recalculatePRs(sport);
   saveState();
   renderAll();
}


function openEditGame(gameId) {
   const game = state.allGames.find(g => g.id === gameId);
   if (!game) return;
   const sport = game.sport;


   if (sport === 'Boys Golf' || sport === 'Girls Golf') {
       openEditGolfScorecard(gameId);
       return;
   }


   // ... rest of your existing openEditGame code unchanged
   const inputMappings = getInputStats(sport);


   // Build sections — for golf or any sport where getStatSections returns empty,
   // fall back to showing every input stat in one flat list
   const sections = getStatSections(sport);
   const coveredKeys = new Set(sections.flatMap(s => s.keys));
   const uncoveredMappings = inputMappings.filter(m => !coveredKeys.has(m.entryLabel));


   // Build HTML for named sections
   const namedSectionsHTML = sections.map(sec => sec.keys.length === 0 ? '' : `
   <div class="form-section">
     <div class="form-section-title">${sec.title}</div>
     ${sec.keys.map(key => `
       <div class="form-row">
         <label>${key}</label>
         <input class="form-input stat-input" data-key="${key}" type="number" step="any"
           placeholder="0" value="${game.gameStats[key] ?? ''}" inputmode="decimal" />
       </div>`).join('')}
   </div>`).join('');


   // Build HTML for any stats not covered by named sections (including all golf stats)
   const uncoveredHTML = uncoveredMappings.length === 0 ? '' : `
   <div class="form-section">
     <div class="form-section-title">Stats</div>
     ${uncoveredMappings.map(map => `
       <div class="form-row">
         <label>${map.entryLabel}</label>
         <input class="form-input stat-input" data-key="${map.entryLabel}" type="number" step="any"
           placeholder="0" value="${game.gameStats[map.entryLabel] ?? ''}" inputmode="decimal" />
       </div>`).join('')}
   </div>`;


   document.getElementById('modal-title').textContent = `Edit Game — ${sport}`;
   document.getElementById('modal-body').innerHTML = `
   <div class="form-section">
     <div class="form-section-title">Game Info</div>
     <div class="form-row">
       <label>Opponent</label>
       <input id="ag-opponent" class="form-input wide" type="text"
         value="${game.opponent}" />
     </div>
     <div class="form-row">
       <label>Date</label>
       <input id="ag-date" class="form-input" type="date"
         value="${game.date.toISOString().slice(0,10)}" style="width:140px;" />
     </div>
     <div class="form-row">
       <label>Win</label>
       <label class="form-toggle">
         <input id="ag-win" type="checkbox" ${game.isWin ? 'checked' : ''} />
         <span class="toggle-slider"></span>
       </label>
     </div>
   </div>
   <div class="form-section">
     <div class="form-section-title">Score</div>
     <div class="form-row">
       <label>Us</label>
       <input id="ag-our-score" class="form-input" type="number"
         value="${game.yourScore}" inputmode="numeric" />
     </div>
     <div class="form-row">
       <label>Them</label>
       <input id="ag-their-score" class="form-input" type="number"
         value="${game.opponentScore}" inputmode="numeric" />
     </div>
   </div>
   ${namedSectionsHTML}
   ${uncoveredHTML}
   <div style="height:24px;"></div>
   `;


   const saveBtn = document.getElementById('modal-save');
   saveBtn.disabled = false;
   saveBtn.onclick = () => {
       const opponent   = document.getElementById('ag-opponent').value.trim();
       if (!opponent) return;
       const ourScore   = parseInt(document.getElementById('ag-our-score').value) || 0;
       const theirScore = parseInt(document.getElementById('ag-their-score').value) || 0;
       const isWin      = document.getElementById('ag-win').checked;
       const dateVal    = document.getElementById('ag-date').value;
       const date       = dateVal ? new Date(dateVal + 'T12:00:00') : new Date();
       const gameStats  = {};
       document.querySelectorAll('.stat-input').forEach(input => {
           if (input.value !== '') gameStats[input.dataset.key] = input.value;
       });


       const idx = state.allGames.findIndex(g => g.id === gameId);
       if (idx !== -1) {
           state.allGames[idx] = {
               ...state.allGames[idx],
               opponent, yourScore: ourScore, opponentScore: theirScore,
               isWin, date, gameStats,
           };
       }


       recalculatePRs(sport);
       saveState();
       closeAddGame();
       renderAll();
   };


   document.getElementById('modal-overlay').classList.remove('hidden');
}


// =============================================================================
//  MARK: - Edit Golf Scorecard
// =============================================================================


function openEditGolfScorecard(gameId) {
   const game = state.allGames.find(g => g.id === gameId);
   if (!game) return;
   const sport = game.sport;


   // Restore holes from saved data, or build blank ones from gameStats
   let holes = game.holes
       ? game.holes.map(h => ({ ...h }))  // deep copy so edits don't mutate saved state
       : Array.from({ length: parseInt(game.gameStats['Holes Played'] || '9') },
           (_, i) => ({ hole: i + 1, par: 4, score: null, putts: null }));


   function renderScorecard() {
       document.getElementById('modal-title').textContent = `Edit Round — ${sport}`;
       document.getElementById('modal-body').innerHTML = `
       <div class="form-section">
         <div class="form-section-title">Round Info</div>
         <div class="form-row">
           <label>Opponent / Course</label>
           <input id="ag-opponent" class="form-input wide" type="text" value="${game.opponent}" />
         </div>
         <div class="form-row">
           <label>Date</label>
           <input id="ag-date" class="form-input" type="date"
             value="${game.date.toISOString().slice(0,10)}" style="width:140px;" />
         </div>
       </div>


       <div class="form-section">
         <div class="form-section-title">Scorecard</div>
         <div style="overflow-x:auto;">
           <table style="width:100%;border-collapse:collapse;font-size:13px;">
             <thead>
               <tr style="background:var(--brand-light);text-align:center;">
                 <th style="padding:8px 6px;font-weight:700;color:var(--text-secondary);text-align:left;padding-left:16px;">Hole</th>
                 <th style="padding:8px 6px;font-weight:700;color:var(--text-secondary);">Par</th>
                 <th style="padding:8px 6px;font-weight:700;color:var(--text-secondary);">Score</th>
                 <th style="padding:8px 6px;font-weight:700;color:var(--text-secondary);">Putts</th>
                 <th style="padding:8px 6px;font-weight:700;color:var(--text-secondary);">+/-</th>
               </tr>
             </thead>
             <tbody>
               ${holes.map((h, i) => `
                 <tr style="border-bottom:1px solid rgba(0,0,0,0.05);text-align:center;
                   background:${i % 2 === 0 ? 'white' : 'var(--bg)'};">
                   <td style="padding:6px 16px;font-weight:700;text-align:left;">${h.hole}</td>
                   <td style="padding:6px;">
                     <select class="hole-par" data-hole="${i}"
                       style="border:1px solid #ddd;border-radius:6px;padding:4px 6px;font-size:13px;background:white;">
                       ${[3,4,5].map(p => `<option value="${p}" ${h.par === p ? 'selected' : ''}>${p}</option>`).join('')}
                     </select>
                   </td>
                   <td style="padding:6px;">
                     <select class="hole-score" data-hole="${i}"
                       style="border:1px solid #ddd;border-radius:6px;padding:4px 6px;font-size:13px;background:white;">
                       <option value="">—</option>
                       ${Array.from({length:11},(_,j)=>j+1).map(s =>
           `<option value="${s}" ${h.score === s ? 'selected' : ''}>${s}</option>`).join('')}
                     </select>
                   </td>
                   <td style="padding:6px;">
                     <select class="hole-putts" data-hole="${i}"
                       style="border:1px solid #ddd;border-radius:6px;padding:4px 6px;font-size:13px;background:white;">
                       <option value="">—</option>
                       ${Array.from({length:11},(_,j)=>j+1).map(p =>
           `<option value="${p}" ${h.putts === p ? 'selected' : ''}>${p}</option>`).join('')}
                     </select>
                   </td>
                   <td style="padding:6px;font-weight:700;
                     color:${h.score
           ? (h.score - h.par < 0 ? 'var(--red)'
               : h.score - h.par === 0 ? 'var(--text-secondary)'
                   : 'var(--brand-blue)')
           : 'var(--text-secondary)'};">
                     ${h.score
           ? (h.score - h.par === 0 ? 'E'
               : (h.score - h.par > 0 ? '+' : '') + (h.score - h.par))
           : '—'}
                   </td>
                 </tr>`).join('')}
             </tbody>
             <tfoot>
               <tr style="background:var(--brand-light);font-weight:700;text-align:center;">
                 <td style="padding:8px 16px;text-align:left;">Total</td>
                 <td>${holes.reduce((s,h) => s + h.par, 0)}</td>
                 <td>${holes.filter(h=>h.score).reduce((s,h) => s + h.score, 0) || '—'}</td>
                 <td>${holes.filter(h=>h.putts).reduce((s,h) => s + h.putts, 0) || '—'}</td>
                 <td style="color:${(() => {
           const diff = holes.filter(h=>h.score).reduce((s,h)=>s+(h.score-h.par),0);
           return diff < 0 ? 'var(--red)' : diff > 0 ? 'var(--brand-blue)' : 'var(--text-secondary)';
       })()};">
                   ${(() => {
           const played = holes.filter(h=>h.score);
           if (!played.length) return '—';
           const diff = played.reduce((s,h)=>s+(h.score-h.par),0);
           return diff === 0 ? 'E' : (diff > 0 ? '+' : '') + diff;
       })()}
                 </td>
               </tr>
             </tfoot>
           </table>
         </div>
         <div style="padding:12px 16px;display:flex;gap:8px;">
           <button onclick="editGolfAddHole()"
             style="flex:1;padding:8px;background:var(--secondary-bg);border-radius:8px;
             font-size:13px;font-weight:600;border:none;cursor:pointer;">+ Add Hole</button>
           ${holes.length > 1
           ? `<button onclick="editGolfRemoveHole()"
                 style="flex:1;padding:8px;background:var(--secondary-bg);border-radius:8px;
                 font-size:13px;font-weight:600;border:none;cursor:pointer;color:var(--red);">
                 − Remove Hole</button>` : ''}
         </div>
       </div>
       <div style="height:24px;"></div>
       `;


       // Wire change listeners
       document.querySelectorAll('.hole-par').forEach(sel => {
           sel.addEventListener('change', e => {
               holes[e.target.dataset.hole].par = parseInt(e.target.value);
               renderScorecard();
           });
       });
       document.querySelectorAll('.hole-score').forEach(sel => {
           sel.addEventListener('change', e => {
               holes[e.target.dataset.hole].score = e.target.value ? parseInt(e.target.value) : null;
               renderScorecard();
           });
       });
       document.querySelectorAll('.hole-putts').forEach(sel => {
           sel.addEventListener('change', e => {
               holes[e.target.dataset.hole].putts = e.target.value ? parseInt(e.target.value) : null;
               renderScorecard();
           });
       });


       // Wire save
       const saveBtn = document.getElementById('modal-save');
       saveBtn.disabled = false;
       saveBtn.onclick = () => {
           const opponent = document.getElementById('ag-opponent').value.trim() || 'Round';
           const isWin    = false; // golf rounds aren't counted as wins/losses
           const dateVal  = document.getElementById('ag-date').value;
           const date     = dateVal ? new Date(dateVal + 'T12:00:00') : new Date();


           const played  = holes.filter(h => h.score !== null);
           if (played.length === 0) { closeAddGame(); return; }


           const totalScore = played.reduce((s,h) => s + h.score, 0);
           const totalPar   = played.reduce((s,h) => s + h.par, 0);
           const totalPutts = played.filter(h=>h.putts).reduce((s,h) => s + h.putts, 0);
           const par3holes  = played.filter(h => h.par === 3);
           const par4holes  = played.filter(h => h.par === 4);
           const par5holes  = played.filter(h => h.par === 5);


           const gameStats = {
               'Holes Played': String(played.length),
               'Total Score':  String(totalScore),
               'Total Par':    String(totalPar),
               'Total Putts':  String(totalPutts),
               'Par 3 Score':  String(par3holes.reduce((s,h)=>s+h.score,0)),
               'Par 3 Count':  String(par3holes.length),
               'Par 4 Score':  String(par4holes.reduce((s,h)=>s+h.score,0)),
               'Par 4 Count':  String(par4holes.length),
               'Par 5 Score':  String(par5holes.reduce((s,h)=>s+h.score,0)),
               'Par 5 Count':  String(par5holes.length),
           };


           const idx = state.allGames.findIndex(g => g.id === gameId);
           if (idx !== -1) {
               state.allGames[idx] = {
                   ...state.allGames[idx],
                   opponent, yourScore: totalScore, opponentScore: totalPar,
                   isWin, date, gameStats,
                   holes: played,  // update saved hole data too
               };
           }


           recalculatePRs(sport);
           saveState();
           closeAddGame();
           renderAll();
       };
   }


   // Add/remove hole buttons need to be global since they're in onclick attributes
   window.editGolfAddHole = () => {
       holes.push({ hole: holes.length + 1, par: 4, score: null, putts: null });
       renderScorecard();
   };
   window.editGolfRemoveHole = () => {
       if (holes.length > 1) holes.pop();
       renderScorecard();
   };


   document.getElementById('modal-overlay').classList.remove('hidden');
   renderScorecard();
}


// =============================================================================
//  MARK: - Golf Scorecard
// =============================================================================
function openGolfScorecard(sport) {
   const filterSeason = state.statsMode !== 'All-Time' ? state.activeSeason : new Date().getFullYear();
   const filterTeam   = (state.statsMode === 'Season' || state.statsMode === 'By Team') ? state.activeTeam : 'Varsity';


   // Start with 9 holes, can add more
   let holes = Array.from({length: 9}, (_, i) => ({ hole: i + 1, par: 4, score: null, putts: null }));


   function renderScorecard() {
       document.getElementById('modal-title').textContent = `Golf Scorecard`;
       document.getElementById('modal-body').innerHTML = `
       <div class="form-section">
         <div class="form-section-title">Round Info</div>
         <div class="form-row">
           <label>Opponent / Course</label>
           <input id="ag-opponent" class="form-input wide" type="text" placeholder="Course or opponent" />
         </div>
         <div class="form-row">
           <label>Date</label>
           <input id="ag-date" class="form-input" type="date" value="${new Date().toISOString().slice(0,10)}" style="width:140px;" />
         </div>
       </div>


       <div class="form-section">
         <div class="form-section-title">Scorecard</div>
         <div style="overflow-x:auto;">
           <table style="width:100%;border-collapse:collapse;font-size:13px;">
             <thead>
               <tr style="background:var(--brand-light);text-align:center;">
                 <th style="padding:8px 6px;font-weight:700;color:var(--text-secondary);text-align:left;padding-left:16px;">Hole</th>
                 <th style="padding:8px 6px;font-weight:700;color:var(--text-secondary);">Par</th>
                 <th style="padding:8px 6px;font-weight:700;color:var(--text-secondary);">Score</th>
                 <th style="padding:8px 6px;font-weight:700;color:var(--text-secondary);">Putts</th>
                 <th style="padding:8px 6px;font-weight:700;color:var(--text-secondary);">+/-</th>
               </tr>
             </thead>
             <tbody id="scorecard-body">
               ${holes.map((h, i) => `
                 <tr style="border-bottom:1px solid rgba(0,0,0,0.05);text-align:center;background:${i % 2 === 0 ? 'white' : 'var(--bg)'};">
                   <td style="padding:6px 16px;font-weight:700;text-align:left;">${h.hole}</td>
                   <td style="padding:6px;">
                     <select class="hole-par" data-hole="${i}" style="border:1px solid #ddd;border-radius:6px;padding:4px 6px;font-size:13px;text-align:center;background:white;">
                       ${[3,4,5].map(p => `<option value="${p}" ${h.par === p ? 'selected' : ''}>${p}</option>`).join('')}
                     </select>
                   </td>
                   <td style="padding:6px;">
                     <select class="hole-score" data-hole="${i}" style="border:1px solid #ddd;border-radius:6px;padding:4px 6px;font-size:13px;text-align:center;background:white;">
                       <option value="">—</option>
                       ${Array.from({length:11},(_,j)=>j+1).map(s => `<option value="${s}" ${h.score === s ? 'selected' : ''}>${s}</option>`).join('')}
                     </select>
                   </td>
                   <td style="padding:6px;">
                     <select class="hole-putts" data-hole="${i}" style="border:1px solid #ddd;border-radius:6px;padding:4px 6px;font-size:13px;text-align:center;background:white;">
                       <option value="">—</option>
                       ${Array.from({length:11},(_,j)=>j+1).map(p => `<option value="${p}" ${h.putts === p ? 'selected' : ''}>${p}</option>`).join('')}
                     </select>
                   </td>
                   <td style="padding:6px;font-weight:700;color:${h.score ? (h.score - h.par < 0 ? 'var(--red)' : h.score - h.par === 0 ? 'var(--text-secondary)' : 'var(--brand-blue)') : 'var(--text-secondary)'};">
                     ${h.score ? (h.score - h.par === 0 ? 'E' : (h.score - h.par > 0 ? '+' : '') + (h.score - h.par)) : '—'}
                   </td>
                 </tr>`).join('')}
             </tbody>
             <tfoot>
               <tr style="background:var(--brand-light);font-weight:700;text-align:center;">
                 <td style="padding:8px 16px;text-align:left;">Total</td>
                 <td>${holes.reduce((s,h) => s + h.par, 0)}</td>
                 <td>${holes.filter(h=>h.score).reduce((s,h) => s + h.score, 0) || '—'}</td>
                 <td>${holes.filter(h=>h.putts).reduce((s,h) => s + h.putts, 0) || '—'}</td>
                 <td style="color:${(() => { const diff = holes.filter(h=>h.score).reduce((s,h)=>s+(h.score-h.par),0); return diff < 0 ? 'var(--red)' : diff > 0 ? 'var(--brand-blue)' : 'var(--text-secondary)'; })()};">
                   ${(() => { const played = holes.filter(h=>h.score); if (!played.length) return '—'; const diff = played.reduce((s,h)=>s+(h.score-h.par),0); return diff === 0 ? 'E' : (diff > 0 ? '+' : '') + diff; })()}
                 </td>
               </tr>
             </tfoot>
           </table>
         </div>
         <div style="padding:12px 16px;display:flex;gap:8px;">
           <button onclick="addGolfHole()" style="flex:1;padding:8px;background:var(--secondary-bg);border-radius:8px;font-size:13px;font-weight:600;border:none;cursor:pointer;">+ Add Hole</button>
           ${holes.length > 1 ? `<button onclick="removeGolfHole()" style="flex:1;padding:8px;background:var(--secondary-bg);border-radius:8px;font-size:13px;font-weight:600;border:none;cursor:pointer;color:var(--red);">− Remove Hole</button>` : ''}
         </div>
       </div>
       <div style="height:24px;"></div>
       `;


       // Wire par/score/putts change listeners
       document.querySelectorAll('.hole-par').forEach(sel => {
           sel.addEventListener('change', e => {
               holes[e.target.dataset.hole].par = parseInt(e.target.value);
               renderScorecard();
           });
       });
       document.querySelectorAll('.hole-score').forEach(sel => {
           sel.addEventListener('change', e => {
               holes[e.target.dataset.hole].score = e.target.value ? parseInt(e.target.value) : null;
               renderScorecard();
           });
       });
       document.querySelectorAll('.hole-putts').forEach(sel => {
           sel.addEventListener('change', e => {
               holes[e.target.dataset.hole].putts = e.target.value ? parseInt(e.target.value) : null;
               renderScorecard();
           });
       });


       // Wire save
       const saveBtn = document.getElementById('modal-save');
       saveBtn.disabled = false;
       saveBtn.onclick = () => {
           const opponent = document.getElementById('ag-opponent').value.trim() || 'Round';
           const isWin    = false; // golf rounds aren't counted as wins/losses
           const dateVal  = document.getElementById('ag-date').value;
           const date     = dateVal ? new Date(dateVal + 'T12:00:00') : new Date();


           const played = holes.filter(h => h.score !== null);
           if (played.length === 0) { closeAddGame(); return; }


           const totalScore  = played.reduce((s,h) => s + h.score, 0);
           const totalPar    = played.reduce((s,h) => s + h.par, 0);
           const totalPutts  = played.filter(h=>h.putts).reduce((s,h) => s + h.putts, 0);
           const par3holes   = played.filter(h => h.par === 3);
           const par4holes   = played.filter(h => h.par === 4);
           const par5holes   = played.filter(h => h.par === 5);


           const gameStats = {
               'Holes Played':  String(played.length),
               'Total Score':   String(totalScore),
               'Total Par':     String(totalPar),
               'Total Putts':   String(totalPutts),
               'Par 3 Score':   String(par3holes.reduce((s,h)=>s+h.score,0)),
               'Par 3 Count':   String(par3holes.length),
               'Par 4 Score':   String(par4holes.reduce((s,h)=>s+h.score,0)),
               'Par 4 Count':   String(par4holes.length),
               'Par 5 Score':   String(par5holes.reduce((s,h)=>s+h.score,0)),
               'Par 5 Count':   String(par5holes.length),
           };


           const newGame = makeGame({
               sport, opponent, yourScore: totalScore, opponentScore: totalPar,
               isWin, date, gameStats, season: filterSeason, team: filterTeam,
           });
           newGame.holes = played;  // save the raw hole data


           state.allGames.push(newGame);
           checkPersonalRecords(newGame);
           saveState();
           closeAddGame();
           renderAll();
       };
   }


   // Make add/remove hole functions accessible globally
   window.addGolfHole = () => {
       holes.push({ hole: holes.length + 1, par: 4, score: null, putts: null });
       renderScorecard();
   };
   window.removeGolfHole = () => {
       if (holes.length > 1) holes.pop();
       renderScorecard();
   };


   document.getElementById('modal-overlay').classList.remove('hidden');
   renderScorecard();
}


document.getElementById('modal-cancel').addEventListener('click', closeAddGame);
document.getElementById('modal-overlay').addEventListener('click', e => {
   if (e.target === document.getElementById('modal-overlay')) closeAddGame();
});


// =============================================================================
//  MARK: - State Mutators
// =============================================================================
function setActiveTab(tab) {
   state.activeTab = tab;
   document.querySelectorAll('.tab-btn').forEach(btn => {
       btn.classList.toggle('active', btn.dataset.tab === tab);
   });
   document.querySelectorAll('.panel').forEach(p => {
       p.classList.toggle('active', p.id === `panel-${tab}`);
   });
   renderAll();
}


function setStatsMode(mode) {
   state.statsMode = mode;
   renderStats();
}


function setCurrentSport(sport) {
   state.currentSport = sport;
   renderStats();
}


function setActiveSeason(yr) {
   state.activeSeason = parseInt(yr);
   renderAll();
}


function setActiveTeam(team) {
   state.activeTeam = team;
   renderAll();
}


function updateProfile(field, value) {
   state.profile[field] = value;
   saveState()
}


function updateGradYear(yr) {
   state.gradYear = parseInt(yr);
   // Recalculate active season
   const avail = seasons(state.gradYear);
   const now = new Date().getFullYear();
   state.activeSeason = avail.filter(y => y <= now).slice(-1)[0] ?? avail.slice(-1)[0] ?? now;
   renderProfile();
   saveState()
}


function toggleProfileEdit() {
   state.profileEditing = !state.profileEditing;
   renderProfile();
}


// =============================================================================
//  MARK: - Tab Bar Events
// =============================================================================
document.querySelectorAll('.tab-btn').forEach(btn => {
   btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
});


// =============================================================================
//  MARK: - Master Render
// =============================================================================
function renderAll() {
   renderHome();
   renderSports();
   renderStats();
   renderProfile();
}


// =============================================================================
//  MARK: - Progress Graph Event Delegation
// =============================================================================
document.addEventListener('click', function(e) {
   const header = e.target.closest('[data-graph-toggle]');
   if (!header) return;
   const body = header.nextElementSibling;
   const arrow = header.querySelector('.pgraph-arrow');
   if (!body) return;
   const isHidden = body.classList.toggle('hidden');
   if (arrow) {
       arrow.classList.toggle('fi-rr-angle-small-up', !isHidden);
       arrow.classList.toggle('fi-rr-angle-small-down', isHidden);
   }
});


// =============================================================================
//  MARK: - Init
// =============================================================================
(function init() {
   loadState();   // add this as the very first line


   const avail = seasons(state.gradYear);
   const now   = new Date().getFullYear();
   // only recalculate activeSeason if nothing was saved
   if (!localStorage.getItem('athletiq_state')) {
       state.activeSeason = avail.filter(y => y <= now).slice(-1)[0] ?? avail[0] ?? now;
   }


   // Re-apply settings that affect the DOM
   if (state.settings.darkMode) document.body.classList.add('dark-mode');
   if (state.settings.accentColor !== '#2663EB') {
       document.documentElement.style.setProperty('--brand-blue', state.settings.accentColor);
   }


   renderAll();
   setActiveTab('home');
})();
