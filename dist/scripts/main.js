webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getUrlParameter"] = getUrlParameter;
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
    return;
}

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["sdk"] = sdk;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_q__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_q___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_q__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Users__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_Games__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_RuleBundles__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_GameBoards__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_GameStates__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_Historys__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_Turns__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__methods_PlayTurn__ = __webpack_require__(20);










function sdk(contextPath) {
    return {
        Q: __WEBPACK_IMPORTED_MODULE_0_q__,
        utils: __WEBPACK_IMPORTED_MODULE_1__utils__,
        Users: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__models_Users__["a" /* initUsersApi */])(contextPath),
        Games: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__models_Games__["a" /* initGamesApi */])(contextPath),
        RuleBundles: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__models_RuleBundles__["a" /* initRuleBundlesApi */])(contextPath),
        GameBoards: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__models_GameBoards__["a" /* initGameBoardsApi */])(contextPath),
        GameStates: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__models_GameStates__["a" /* initGameStatesApi */])(contextPath),
        Historys: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__models_Historys__["a" /* initHistorysApi */])(contextPath),
        Turns: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__models_Turns__["a" /* initTurnsApi */])(contextPath),
        PlayTurn: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__methods_PlayTurn__["a" /* initPlayTurnApi */])(contextPath)
    };
}

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initUsersApi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_q__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_q___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_q__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_qwest__ = __webpack_require__(12);



var userId = void 0;
;
;
;
function initUsersApi(contextPath) {
    var that = {};
    that.getLoggedInUserId = function () {
        return userId;
    };
    that.indexQ = function () {
        return __WEBPACK_IMPORTED_MODULE_2__utils_qwest__["a" /* qwest */].get(contextPath + 'users');
    };
    that.createQ = function (params) {
        return __WEBPACK_IMPORTED_MODULE_2__utils_qwest__["a" /* qwest */].post(contextPath + 'users', params).then(function (result) {
            userId = result.userId;
            that.fakeCacheWrite({ _id: result.userId, username: params.username });
            return result;
        });
    };
    that.readQ = function (userId) {
        return __WEBPACK_IMPORTED_MODULE_2__utils_qwest__["a" /* qwest */].get(contextPath + 'users/' + userId);
    };
    ////// USER SERVICES //////
    that.sessionQ = function () {
        return __WEBPACK_IMPORTED_MODULE_2__utils_qwest__["a" /* qwest */].get(contextPath + 'session');
    };
    that.loginQ = function (params) {
        return __WEBPACK_IMPORTED_MODULE_2__utils_qwest__["a" /* qwest */].post(contextPath + 'LoginAuth', params).then(function (result) {
            userId = result.userId;
            that.fakeCacheWrite({ _id: result.userId, username: params.username });
            return result;
        });
    };
    ////// CACHING //////
    var usersCache = {};
    that.usersCache = usersCache;
    that.fakeCacheWrite = function (result) {
        that.usersCache[result._id] = result;
    };
    that.readCacheQ = function (userId) {
        return __WEBPACK_IMPORTED_MODULE_0_q__["Promise"](function (resolve, reject) {
            if (that.usersCache[userId]) {
                resolve(that.usersCache[userId]);
            } else {
                that.readQ(userId).then(function (result) {
                    that.usersCache[result._id] = result;
                    resolve(result);
                }).catch(reject);
            }
        });
    };
    that.indexCacheQ = function (force) {
        if (!force && __WEBPACK_IMPORTED_MODULE_1_lodash__["isEmpty"](usersCache)) {
            return that.indexQ().then(function (result) {
                __WEBPACK_IMPORTED_MODULE_1_lodash__["each"](result, function (value) {
                    usersCache[value._id] = value;
                });
                return __WEBPACK_IMPORTED_MODULE_0_q__(usersCache);
            });
        } else {
            return __WEBPACK_IMPORTED_MODULE_0_q__(usersCache);
        }
    };
    return that;
}
;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return qwest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_q__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_q___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_q__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// https://github.com/github/fetch


function _get(url /*, data: any, opts: any*/) {
    return __WEBPACK_IMPORTED_MODULE_1_q__().then(function () {
        return fetch(url);
    }).then(function (response) {
        return response.json();
    });
}
function _post(url, data /*, opts: any*/) {
    return __WEBPACK_IMPORTED_MODULE_1_q__().then(function () {
        return fetch(url, {
            method: 'POST',
            headers: [['Content-Type', 'application/json']],
            body: JSON.stringify(data)
        });
    }).then(function (response) {
        return response.json();
    });
}
var qwest = {
    get: function get(url /*, data: any, opts: any*/) {
        return __WEBPACK_IMPORTED_MODULE_1_q__["Promise"](function (resolve, reject) {
            _get(url /*, data, opts || {dataType: 'json', withCredentials: true}*/).then(function (response) {
                if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object') {
                    resolve(response);
                } else {
                    try {
                        var parsed = JSON.parse(response);
                        resolve(parsed);
                    } catch (e) {
                        resolve(undefined);
                    }
                }
            }).catch(function () {
                reject(undefined);
            });
        });
    },
    post: function post(url, data /*, opts: any*/) {
        return _post(url, data /*, opts || {dataType: 'json', responseType:'json', withCredentials: true}*/);
    }
};

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initGamesApi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_q__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_q___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_q__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Users__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_qwest__ = __webpack_require__(12);




function initGamesApi(contextPath) {
    var that = {};
    var usersApi = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__models_Users__["a" /* initUsersApi */])(contextPath);
    that.indexQ = function () {
        return __WEBPACK_IMPORTED_MODULE_3__utils_qwest__["a" /* qwest */].get(contextPath + 'games');
    };
    that.createQ = function (params) {
        return __WEBPACK_IMPORTED_MODULE_3__utils_qwest__["a" /* qwest */].post(contextPath + 'games', params);
    };
    that.readQ = function (gameId) {
        return __WEBPACK_IMPORTED_MODULE_3__utils_qwest__["a" /* qwest */].get(contextPath + 'games/' + gameId);
    };
    that.readUsersGamesQ = function (userId) {
        return __WEBPACK_IMPORTED_MODULE_3__utils_qwest__["a" /* qwest */].get(contextPath + 'users/' + userId + '/games');
    };
    that.readMyGamesQ = function () {
        return that.readUsersGamesQ(usersApi.getLoggedInUserId());
    };
    ////// GAME SERVICES //////
    that.joinGameQ = function (gameId) {
        return __WEBPACK_IMPORTED_MODULE_3__utils_qwest__["a" /* qwest */].post(contextPath + 'games/' + gameId + '/join');
    };
    ///// other //////
    that.getPlayersMapQ = function (game) {
        var map = __WEBPACK_IMPORTED_MODULE_1_lodash__["clone"](game.players),
            promiseArray = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash__["each"](map, function (player, playerRel) {
            promiseArray.push(usersApi.readCacheQ(player.playerId).then(function (user) {
                if (user) {
                    map[playerRel].name = user.username;
                }
            }));
        });
        return __WEBPACK_IMPORTED_MODULE_0_q__["all"](promiseArray).then(function () {
            return map;
        });
    };
    return that;
}
;

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initRuleBundlesApi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_qwest__ = __webpack_require__(12);

function initRuleBundlesApi(contextPath) {
    var that = {};
    that.indexQ = function () {
        return __WEBPACK_IMPORTED_MODULE_0__utils_qwest__["a" /* qwest */].get(contextPath + 'ruleBundles');
    };
    that.createQ = function (params) {
        return __WEBPACK_IMPORTED_MODULE_0__utils_qwest__["a" /* qwest */].post(contextPath + 'ruleBundles', params);
    };
    that.readQ = function (ruleBundleId) {
        return __WEBPACK_IMPORTED_MODULE_0__utils_qwest__["a" /* qwest */].get(contextPath + 'ruleBundles/' + ruleBundleId);
    };
    return that;
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initGameBoardsApi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_q__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_q___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_q__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_qwest__ = __webpack_require__(12);



function initGameBoardsApi(contextPath) {
    var that = {};
    that.indexQ = function () {
        return __WEBPACK_IMPORTED_MODULE_2__utils_qwest__["a" /* qwest */].get(contextPath + 'gameBoards');
    };
    that.readQ = function (gameBoardId) {
        return __WEBPACK_IMPORTED_MODULE_2__utils_qwest__["a" /* qwest */].get(contextPath + 'gameBoards/' + gameBoardId).then(function (result) {
            that.fakeCacheWrite(result);
            return result;
        });
    };
    that.readGamesBoardQ = function (gameId) {
        return __WEBPACK_IMPORTED_MODULE_2__utils_qwest__["a" /* qwest */].get(contextPath + 'games/' + gameId + '/board');
    };
    ////// CACHING //////
    that.gameBoardsCache = {};
    that.fakeCacheWrite = function (result) {
        that.gameBoardsCache[result._id] = result;
    };
    that.readCacheQ = function (gameBoardId) {
        return __WEBPACK_IMPORTED_MODULE_0_q__["Promise"](function (resolve, reject) {
            if (that.gameBoardsCache[gameBoardId]) {
                resolve(that.gameBoardsCache[gameBoardId]);
            } else {
                that.readQ(gameBoardId).then(function (result) {
                    that.gameBoardsCache[result._id] = result;
                    resolve(result);
                }).catch(function (err) {
                    console.log('WTF');
                    reject(err);
                });
            }
        });
    };
    //combines gameboard.board and gameboard.spaces (really just adds attributes)
    that.getFullSpaceInfo = function (gameBoard, gameState, spaceId) {
        var foundSpace;
        __WEBPACK_IMPORTED_MODULE_1_lodash__["each"](gameBoard.board, function (value) {
            if (value.id === spaceId) {
                foundSpace = __WEBPACK_IMPORTED_MODULE_1_lodash__["clone"](value);
            }
        });
        if (!foundSpace) {
            throw 'bad id ' + spaceId;
        }
        __WEBPACK_IMPORTED_MODULE_1_lodash__["each"](gameState.spaces, function (value) {
            if (value.boardSpaceId === spaceId) {
                foundSpace.attributes = value.attributes;
            }
        });
        return foundSpace;
    };
    that.getPiecesOnSpace = function (gameState, spaceId) {
        var pieces = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash__["each"](gameState.pieces, function (value) {
            if (value.locationId === spaceId) {
                pieces.push(value);
            }
        });
        return pieces;
    };
    that.getPiecesByOwnerIdOnSpaceId = function (gameState, spaceId, ownerId) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["filter"](gameState.pieces, function (piece) {
            return piece.locationId === spaceId && piece.ownerId === ownerId;
        });
    };
    that.getPiecesFromId = function (gameState, pieceId) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["filter"](gameState.pieces, function (piece) {
            return pieceId === piece.id;
        });
    };
    that.getClassesFromPieces = function (gameState, className) {
        var found = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash__["each"](gameState.pieces, function (value) {
            if (value.class === className) {
                found.push(value);
            }
        });
        return found;
    };
    return that;
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initGameStatesApi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_qwest__ = __webpack_require__(12);

function initGameStatesApi(contextPath) {
    var that = {};
    that.indexQ = function () {
        return __WEBPACK_IMPORTED_MODULE_0__utils_qwest__["a" /* qwest */].get(contextPath + 'historys');
    };
    that.readQ = function (gameStateId) {
        return __WEBPACK_IMPORTED_MODULE_0__utils_qwest__["a" /* qwest */].get(contextPath + 'gameStates/' + gameStateId);
    };
    that.readGamesStateQ = function (gameId) {
        return __WEBPACK_IMPORTED_MODULE_0__utils_qwest__["a" /* qwest */].get(contextPath + 'games/' + gameId + '/state');
    };
    return that;
}
;

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initHistorysApi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_qwest__ = __webpack_require__(12);


function initHistorysApi(contextPath) {
    var that = {};
    that.indexQ = function () {
        return __WEBPACK_IMPORTED_MODULE_1__utils_qwest__["a" /* qwest */].get(contextPath + 'historys');
    };
    that.readQ = function (historyId) {
        return __WEBPACK_IMPORTED_MODULE_1__utils_qwest__["a" /* qwest */].get(contextPath + 'historys/' + historyId);
    };
    that.readGamesHistoryQ = function (gameId) {
        return __WEBPACK_IMPORTED_MODULE_1__utils_qwest__["a" /* qwest */].get(contextPath + 'games/' + gameId + '/history' /*, null, {responseType: 'json'}*/);
    };
    that.readGamesFullHistoryQ = function (gameId) {
        return __WEBPACK_IMPORTED_MODULE_1__utils_qwest__["a" /* qwest */].get(contextPath + 'games/' + gameId + '/history/all');
    };
    /////////// START SHIT hacky way for turns read by client
    // TODO please get rid of or rewrite with new History/Turn relationship
    var turnsRead;
    that.markAllTurnsRead = function (history) {
        if (!history.turns[0].length) throw 'only use markAllTurnsRead() with Full-ish History';
        turnsRead = {};
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](history.turns, function (playerTurns, player) {
            turnsRead[player] = [];
            __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](playerTurns, function () {
                turnsRead[player].push(true);
            });
        });
        console.log(turnsRead);
    };
    that.getLastUnreadTurn = function (history) {
        var _turn = undefined;
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](history.turnOrder, function (value, playerIndex) {
            if (_turn || value === 'meta') return;
            var lastTurnNumber = turnsRead[value].length;
            console.log('las ' + lastTurnNumber);
            if (history.turns[playerIndex][lastTurnNumber]) {
                _turn = history.turns[playerIndex][lastTurnNumber];
                turnsRead[value].push(true);
                console.log('read ' + value + '\'s turn: ' + lastTurnNumber);
            }
        });
        return _turn;
    };
    that.getLastRoundMeta = function (history) {
        if (!history.turns.meta) return undefined;
        return history.turns.meta[history.currentRound - 2];
    };
    // END SHIT
    // for roundRobin
    that.getWhosTurnIsIt = function (history) {
        return history.turnOrder[history.currentPlayerIndexTurn];
    };
    return that;
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initTurnsApi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_qwest__ = __webpack_require__(12);

function initTurnsApi(contextPath) {
    var that = {};
    that.readQ = function (turnId) {
        return __WEBPACK_IMPORTED_MODULE_0__utils_qwest__["a" /* qwest */].get(contextPath + 'turns/' + turnId);
    };
    that.readGamesTurnQ = function (gameId, turnNumber) {
        return __WEBPACK_IMPORTED_MODULE_0__utils_qwest__["a" /* qwest */].get(contextPath + 'games/' + gameId + '/history/' + turnNumber);
    };
    return that;
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initPlayTurnApi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_qwest__ = __webpack_require__(12);

function initPlayTurnApi(contextPath) {
    var that = {};
    that.sendQ = function (params) {
        return __WEBPACK_IMPORTED_MODULE_0__utils_qwest__["a" /* qwest */].post(contextPath + 'playTurn', params);
    };
    that.sendGameTurnQ = function (gameId, params) {
        return __WEBPACK_IMPORTED_MODULE_0__utils_qwest__["a" /* qwest */].post(contextPath + 'games/' + gameId + '/playTurn', params);
    };
    return that;
}

/***/ })
],[6]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211bGUtc2RrLnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvVXNlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3F3ZXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvR2FtZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9SdWxlQnVuZGxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWxzL0dhbWVCb2FyZHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9HYW1lU3RhdGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvSGlzdG9yeXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9UdXJucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWV0aG9kcy9QbGF5VHVybi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ00seUJBQXFDO0FBQ3pDLFFBQVksV0FBUyxPQUFTLFNBQU8sT0FBVSxVQUFJO0FBQ25ELFFBQWlCLGdCQUFXLFNBQU0sTUFBTTtBQUNwQyxTQUFDLElBQUssSUFBSSxHQUFHLElBQWdCLGNBQU8sUUFBSyxLQUFHO0FBQzlDLFlBQWtCLGlCQUFnQixjQUFHLEdBQU0sTUFBTTtBQUM5QyxZQUFlLGVBQUcsTUFBVyxRQUFFO0FBQzFCLG1CQUFlLGVBQ3ZCO0FBQ0Y7QUFBQztBQUVIO0FBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hzQjtBQUVVO0FBRXVCO0FBQ0E7QUFDa0I7QUFDSDtBQUNBO0FBQ047QUFDVDtBQUVVO0FBbUI1RCxhQUFpQztBQUMvQjtBQUNIO0FBQ0k7QUFFQSxlQUFjLDJGQUFhO0FBQzNCLGVBQWMsMkZBQWE7QUFDckIscUJBQW9CLHVHQUFhO0FBQ2xDLG9CQUFtQixxR0FBYTtBQUNoQyxvQkFBbUIscUdBQWE7QUFDbEMsa0JBQWlCLGlHQUFhO0FBQ2pD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QWdCLGtCQUFHLFVBQTBCO0FBQ3pDLGVBQVEsUUFBVSxVQUFRLFFBQ2xDO0FBQUU7QUFFSSxXQUNSO0FBQUMsQzs7Ozs7Ozs7O0FDdkdzQztBQW1CakMsc0JBQTBDO0FBQzlDLFFBQVUsT0FBVztBQUVqQixTQUFNLFFBQUcsVUFBd0I7QUFDN0IsZUFBTSw0REFBSSxJQUFZLGNBQVcsV0FDekM7QUFBRTtBQUVFLFNBQWUsaUJBQUcsVUFBd0IsUUFBb0I7QUFDMUQsZUFBTSw0REFBSSxJQUFZLGNBQVcsV0FBUyxTQUFjLGNBQ2hFO0FBQUU7QUFFSSxXQUNSO0FBQUMsQzs7Ozs7Ozs7O0FDL0JzQztBQU9qQyx5QkFBNkM7QUFDakQsUUFBVSxPQUFXO0FBRWpCLFNBQU0sUUFBRyxVQUFxQjtBQUMxQixlQUFNLDREQUFLLEtBQVksY0FBYSxZQUM1QztBQUFFO0FBRUUsU0FBYyxnQkFBRyxVQUF3QixRQUFhO0FBQ2xELGVBQU0sNERBQUssS0FBWSxjQUFXLFdBQVMsU0FBYyxhQUNqRTtBQUFFO0FBRUksV0FDUjtBQUFDLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXJsUGFyYW1ldGVyKHNQYXJhbTogYW55KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICB2YXIgc1BhZ2VVUkwgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuICB2YXIgc1VSTFZhcmlhYmxlcyA9IHNQYWdlVVJMLnNwbGl0KCcmJyk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzVVJMVmFyaWFibGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgc1BhcmFtZXRlck5hbWUgPSBzVVJMVmFyaWFibGVzW2ldLnNwbGl0KCc9Jyk7XHJcbiAgICBpZiAoc1BhcmFtZXRlck5hbWVbMF0gPT0gc1BhcmFtKSB7XHJcbiAgICAgIHJldHVybiBzUGFyYW1ldGVyTmFtZVsxXTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pbmRleC50cyIsImltcG9ydCAqIGFzIFEgZnJvbSAncSc7XHJcblxyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IGluaXRVc2Vyc0FwaSwgVXNlcnNBcGkgfSBmcm9tICcuL21vZGVscy9Vc2Vycyc7XHJcbmltcG9ydCB7IGluaXRHYW1lc0FwaSwgR2FtZXNBcGkgfSBmcm9tICcuL21vZGVscy9HYW1lcyc7XHJcbmltcG9ydCB7IGluaXRSdWxlQnVuZGxlc0FwaSwgUnVsZUJ1bmRsZXNBcGkgfSBmcm9tICcuL21vZGVscy9SdWxlQnVuZGxlcyc7XHJcbmltcG9ydCB7IGluaXRHYW1lQm9hcmRzQXBpLCBHYW1lQm9hcmRzQXBpIH0gZnJvbSAnLi9tb2RlbHMvR2FtZUJvYXJkcyc7XHJcbmltcG9ydCB7IGluaXRHYW1lU3RhdGVzQXBpLCBHYW1lU3RhdGVzQXBpIH0gZnJvbSAnLi9tb2RlbHMvR2FtZVN0YXRlcyc7XHJcbmltcG9ydCB7IGluaXRIaXN0b3J5c0FwaSwgSGlzdG9yeXNBcGkgfSBmcm9tICcuL21vZGVscy9IaXN0b3J5cyc7XHJcbmltcG9ydCB7IGluaXRUdXJuc0FwaSwgVHVybnNBcGkgfSBmcm9tICcuL21vZGVscy9UdXJucyc7XHJcblxyXG5pbXBvcnQgeyBpbml0UGxheVR1cm5BcGksIFBsYXlUdXJuQXBpIH0gZnJvbSAnLi9tZXRob2RzL1BsYXlUdXJuJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU0RLIHtcclxuICBROiBhbnk7XHJcbiAgdXRpbHM6IHtnZXRVcmxQYXJhbWV0ZXIob2JqOiBhbnkpOiBzdHJpbmcgfCB1bmRlZmluZWR9O1xyXG5cclxuICBVc2VyczogVXNlcnNBcGk7XHJcbiAgR2FtZXM6IEdhbWVzQXBpO1xyXG4gIFJ1bGVCdW5kbGVzOiBSdWxlQnVuZGxlc0FwaTtcclxuICBHYW1lQm9hcmRzOiBHYW1lQm9hcmRzQXBpO1xyXG4gIEdhbWVTdGF0ZXM6IEdhbWVTdGF0ZXNBcGk7XHJcbiAgSGlzdG9yeXM6IEhpc3RvcnlzQXBpO1xyXG4gIFR1cm5zOiBUdXJuc0FwaTtcclxuXHJcbiAgUGxheVR1cm46IFBsYXlUdXJuQXBpO1xyXG5cclxuICAvLyBTcGluYWw6IFNwaW5hbFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2RrKGNvbnRleHRQYXRoOiBzdHJpbmcpOiBTREsge1xyXG4gIHJldHVybiB7XHJcbiAgICBRLFxyXG4gICAgdXRpbHMsXHJcblxyXG4gICAgVXNlcnM6IGluaXRVc2Vyc0FwaShjb250ZXh0UGF0aCksXHJcbiAgICBHYW1lczogaW5pdEdhbWVzQXBpKGNvbnRleHRQYXRoKSxcclxuICAgIFJ1bGVCdW5kbGVzOiBpbml0UnVsZUJ1bmRsZXNBcGkoY29udGV4dFBhdGgpLFxyXG4gICAgR2FtZUJvYXJkczogaW5pdEdhbWVCb2FyZHNBcGkoY29udGV4dFBhdGgpLFxyXG4gICAgR2FtZVN0YXRlczogaW5pdEdhbWVTdGF0ZXNBcGkoY29udGV4dFBhdGgpLFxyXG4gICAgSGlzdG9yeXM6IGluaXRIaXN0b3J5c0FwaShjb250ZXh0UGF0aCksXHJcbiAgICBUdXJuczogaW5pdFR1cm5zQXBpKGNvbnRleHRQYXRoKSxcclxuXHJcbiAgICBQbGF5VHVybjogaW5pdFBsYXlUdXJuQXBpKGNvbnRleHRQYXRoKSxcclxuXHJcbiAgICAvLyBTcGluYWw6IGluaXRTcGluYWxBcGkoc2RrKSxcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL211bGUtc2RrLnRzIiwiXHJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IHF3ZXN0IH0gZnJvbSAnLi4vdXRpbHMvcXdlc3QnO1xyXG5cclxubGV0IHVzZXJJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVc2Vyc0FwaSB7XHJcbiAgZ2V0TG9nZ2VkSW5Vc2VySWQoKTogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gIGluZGV4USgpOiBRLlByb21pc2U8VXNlcltdPjtcclxuICBjcmVhdGVRKHBhcmFtczogYW55KTogUS5Qcm9taXNlPE11bGVVc2VyQ3JlYXRlUmVzcG9uc2U+O1xyXG4gIHJlYWRRKHVzZXJJZDogc3RyaW5nKTogUS5Qcm9taXNlPFVzZXI+O1xyXG4gIHNlc3Npb25RKCk6IFEuUHJvbWlzZTxNdWxlVXNlclNlc3Npb25SZXNwb25zZT47XHJcbiAgbG9naW5RKHBhcmFtczogYW55KTogUS5Qcm9taXNlPE11bGVVc2VyTG9naW5SZXNwb25zZT47XHJcbiAgdXNlcnNDYWNoZTogVXNlckNhY2hlO1xyXG4gIGZha2VDYWNoZVdyaXRlKHJlc3VsdDogVXNlcik6IHZvaWQ7XHJcbiAgcmVhZENhY2hlUSh1c2VySWQ6IHN0cmluZyk6IFEuUHJvbWlzZTxVc2VyIHwgdW5kZWZpbmVkPjtcclxuICBpbmRleENhY2hlUShmb3JjZTogYm9vbGVhbik6IFEuUHJvbWlzZTxVc2VyQ2FjaGU+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVzZXIge1xyXG4gIF9pZDogbnVtYmVyO1xyXG4gIHVzZXJuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTXVsZVVzZXJDcmVhdGVSZXNwb25zZSB7XHJcbiAgdXNlcklkOiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE11bGVVc2VyU2Vzc2lvblJlc3BvbnNlIHtcclxuICBbczogc3RyaW5nXTogYW55O1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNdWxlVXNlckxvZ2luUmVzcG9uc2Uge1xyXG4gIFtzOiBzdHJpbmddOiBhbnk7XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJDYWNoZSB7XHJcbiAgW3VzZXJJZDogc3RyaW5nXTogVXNlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRVc2Vyc0FwaShjb250ZXh0UGF0aDogc3RyaW5nKTogVXNlcnNBcGkge1xyXG4gIGxldCB0aGF0OiBhbnkgPSB7fTtcclxuXHJcbiAgdGhhdC5nZXRMb2dnZWRJblVzZXJJZCA9IGZ1bmN0aW9uICgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHVzZXJJZDtcclxuICB9O1xyXG5cclxuICB0aGF0LmluZGV4USA9IGZ1bmN0aW9uICgpOiBRLlByb21pc2U8VXNlcltdPiB7XHJcbiAgICByZXR1cm4gcXdlc3QuZ2V0KGNvbnRleHRQYXRoICsgJ3VzZXJzJyk7XHJcbiAgfTtcclxuXHJcbiAgdGhhdC5jcmVhdGVRID0gZnVuY3Rpb24gKHBhcmFtczogYW55KTogUS5Qcm9taXNlPE11bGVVc2VyQ3JlYXRlUmVzcG9uc2U+IHtcclxuICAgIHJldHVybiBxd2VzdC5wb3N0KGNvbnRleHRQYXRoICsgJ3VzZXJzJywgcGFyYW1zKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0OiBNdWxlVXNlckNyZWF0ZVJlc3BvbnNlKSB7XHJcbiAgICAgICAgdXNlcklkID0gcmVzdWx0LnVzZXJJZDtcclxuICAgICAgICB0aGF0LmZha2VDYWNoZVdyaXRlKHtfaWQ6IHJlc3VsdC51c2VySWQsIHVzZXJuYW1lOiBwYXJhbXMudXNlcm5hbWV9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICB9KTtcclxuICB9O1xyXG5cclxuICB0aGF0LnJlYWRRID0gZnVuY3Rpb24gKHVzZXJJZDogbnVtYmVyKTogUS5Qcm9taXNlPFVzZXI+IHtcclxuICAgIHJldHVybiBxd2VzdC5nZXQoY29udGV4dFBhdGggKyAndXNlcnMvJyArIHVzZXJJZCk7XHJcbiAgfTtcclxuXHJcbiAgLy8vLy8vIFVTRVIgU0VSVklDRVMgLy8vLy8vXHJcbiAgdGhhdC5zZXNzaW9uUSA9IGZ1bmN0aW9uICgpOiBRLlByb21pc2U8TXVsZVVzZXJTZXNzaW9uUmVzcG9uc2U+IHtcclxuICAgIHJldHVybiBxd2VzdC5nZXQoY29udGV4dFBhdGggKyAnc2Vzc2lvbicpO1xyXG4gIH07XHJcblxyXG4gIHRoYXQubG9naW5RID0gZnVuY3Rpb24gKHBhcmFtczogYW55KTogUS5Qcm9taXNlPE11bGVVc2VyTG9naW5SZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHF3ZXN0LnBvc3QoY29udGV4dFBhdGggKyAnTG9naW5BdXRoJywgcGFyYW1zKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0OiBNdWxlVXNlckxvZ2luUmVzcG9uc2UpIHtcclxuICAgICAgICB1c2VySWQgPSByZXN1bHQudXNlcklkO1xyXG4gICAgICAgIHRoYXQuZmFrZUNhY2hlV3JpdGUoe19pZDogcmVzdWx0LnVzZXJJZCwgdXNlcm5hbWU6IHBhcmFtcy51c2VybmFtZX0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vLy8vLyBDQUNISU5HIC8vLy8vL1xyXG4gIGxldCB1c2Vyc0NhY2hlOiBVc2VyQ2FjaGUgPSB7fTtcclxuICB0aGF0LnVzZXJzQ2FjaGUgPSB1c2Vyc0NhY2hlO1xyXG5cclxuICB0aGF0LmZha2VDYWNoZVdyaXRlID0gZnVuY3Rpb24gKHJlc3VsdDogVXNlcik6IHZvaWQge1xyXG4gICAgdGhhdC51c2Vyc0NhY2hlW3Jlc3VsdC5faWRdID0gcmVzdWx0O1xyXG4gIH07XHJcblxyXG4gIHRoYXQucmVhZENhY2hlUSA9IGZ1bmN0aW9uICh1c2VySWQ6IG51bWJlcik6IFEuUHJvbWlzZTxVc2VyIHwgdW5kZWZpbmVkPiB7XHJcbiAgICByZXR1cm4gUS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgaWYgKHRoYXQudXNlcnNDYWNoZVt1c2VySWRdKSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0aGF0LnVzZXJzQ2FjaGVbdXNlcklkXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhhdC5yZWFkUSh1c2VySWQpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0OiBVc2VyKSB7XHJcbiAgICAgICAgICAgICAgdGhhdC51c2Vyc0NhY2hlW3Jlc3VsdC5faWRdID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgdGhhdC5pbmRleENhY2hlUSA9IGZ1bmN0aW9uIChmb3JjZTogYm9vbGVhbik6IFEuUHJvbWlzZTxVc2VyQ2FjaGU+IHtcclxuICAgIGlmICghZm9yY2UgJiYgXy5pc0VtcHR5KHVzZXJzQ2FjaGUpKSB7XHJcbiAgICAgIHJldHVybiB0aGF0LmluZGV4USgpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdDogVXNlcltdKSB7XHJcbiAgICAgICAgICBfLmVhY2gocmVzdWx0LCBmdW5jdGlvbiAodmFsdWU6IFVzZXIpIHtcclxuICAgICAgICAgICAgdXNlcnNDYWNoZVt2YWx1ZS5faWRdID0gdmFsdWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiBRKHVzZXJzQ2FjaGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFEodXNlcnNDYWNoZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHRoYXQgYXMgVXNlcnNBcGk7XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZGVscy9Vc2Vycy50cyIsIlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZ2l0aHViL2ZldGNoXHJcblxyXG5pbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XHJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XHJcblxyXG5mdW5jdGlvbiBnZXQodXJsOiBzdHJpbmcvKiwgZGF0YTogYW55LCBvcHRzOiBhbnkqLyk6IFEuUHJvbWlzZTxhbnk+IHtcclxuICByZXR1cm4gUSgpXHJcbiAgICAudGhlbigoKSA9PiBmZXRjaCh1cmwpKVxyXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb3N0KHVybDogc3RyaW5nLCBkYXRhOiBhbnkvKiwgb3B0czogYW55Ki8pOiBRLlByb21pc2U8YW55PiB7XHJcbiAgcmV0dXJuIFEoKVxyXG4gICAgLnRoZW4oKCkgPT4gZmV0Y2godXJsLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXJzOiBbXHJcbiAgICAgICAgWydDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbiddXHJcbiAgICAgIF0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgfSkpXHJcbiAgICAudGhlbigocmVzcG9uc2U6IGFueSkgPT4gcmVzcG9uc2UuanNvbigpKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHF3ZXN0ID0ge1xyXG4gIGdldDogZnVuY3Rpb24gKHVybDogYW55LyosIGRhdGE6IGFueSwgb3B0czogYW55Ki8pOiBRLlByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gUS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgZ2V0KHVybC8qLCBkYXRhLCBvcHRzIHx8IHtkYXRhVHlwZTogJ2pzb24nLCB3aXRoQ3JlZGVudGlhbHM6IHRydWV9Ki8pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlOiBhbnkpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICB2YXIgcGFyc2VkID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZWQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKC8qZXJyb3I6IGFueSovKSB7XHJcbiAgICAgICAgICByZWplY3QodW5kZWZpbmVkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIHBvc3Q6IGZ1bmN0aW9uICh1cmw6IGFueSwgZGF0YT86IGFueS8qLCBvcHRzOiBhbnkqLyk6IFEuUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBwb3N0KHVybCwgZGF0YS8qLCBvcHRzIHx8IHtkYXRhVHlwZTogJ2pzb24nLCByZXNwb25zZVR5cGU6J2pzb24nLCB3aXRoQ3JlZGVudGlhbHM6IHRydWV9Ki8pO1xyXG4gIH0sXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9xd2VzdC50cyIsIlxyXG5pbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBpbml0VXNlcnNBcGksIFVzZXJzQXBpLCBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL1VzZXJzJztcclxuaW1wb3J0IHsgcXdlc3QgfSBmcm9tICcuLi91dGlscy9xd2VzdCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVzQXBpIHtcclxuICBpbmRleFEoKTogUS5Qcm9taXNlPEdhbWVbXT47XHJcbiAgY3JlYXRlUShwYXJhbXM6IGFueSk6IFEuUHJvbWlzZTxhbnk+O1xyXG4gIHJlYWRRKGdhbWVJZDogc3RyaW5nKTogUS5Qcm9taXNlPHN0cmluZz47XHJcbiAgcmVhZFVzZXJzR2FtZXNRKHVzZXJJZDogc3RyaW5nKTogUS5Qcm9taXNlPEdhbWVbXT47XHJcbiAgcmVhZE15R2FtZXNRKCk6IFEuUHJvbWlzZTxHYW1lW10+O1xyXG4gIGpvaW5HYW1lUShnYW1lSWQ6IHN0cmluZyk6IFEuUHJvbWlzZTxhbnk+O1xyXG4gIGdldFBsYXllcnNNYXBRKGdhbWU6IEdhbWUpOiBRLlByb21pc2U8UGxheWVyc01hcD47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2FtZSB7XHJcbiAgX2lkOiBzdHJpbmc7XHJcbiAgZ2FtZUJvYXJkOiBzdHJpbmc7IC8vIGlkXHJcbiAgZ2FtZVN0YXR1czogc3RyaW5nO1xyXG4gIG1heFBsYXllcnM6IG51bWJlcjtcclxuICBwbGF5ZXJzOiBQbGF5ZXJzTWFwO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBuZXh0VHVyblRpbWU6IERhdGU7XHJcbiAgcnVsZUJ1bmRsZToge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICB9O1xyXG4gIHR1cm5Qcm9ncmVzc1N0eWxlOiBzdHJpbmc7XHJcbiAgdHVyblRpbWVMaW1pdDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBsYXllcnNNYXAge1xyXG4gIFtwbGF5ZXJOdW06IHN0cmluZ106IHsgLy8gICdwMSdcclxuICAgIHBsYXllcklkOiBzdHJpbmc7XHJcbiAgICBwbGF5ZXJTdGF0dXM6IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7IC8vIGFkZGVkIGJ5IGdldFBsYXllcnNNYXBRKClcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdEdhbWVzQXBpKGNvbnRleHRQYXRoOiBzdHJpbmcpIHtcclxuICB2YXIgdGhhdDogYW55ID0ge307XHJcblxyXG4gIGNvbnN0IHVzZXJzQXBpOiBVc2Vyc0FwaSA9IGluaXRVc2Vyc0FwaShjb250ZXh0UGF0aCk7XHJcblxyXG4gIHRoYXQuaW5kZXhRID0gZnVuY3Rpb24gKCk6IFEuUHJvbWlzZTxHYW1lW10+IHtcclxuICAgIHJldHVybiBxd2VzdC5nZXQoY29udGV4dFBhdGggKyAnZ2FtZXMnKTtcclxuICB9O1xyXG5cclxuICB0aGF0LmNyZWF0ZVEgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkpOiBRLlByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gcXdlc3QucG9zdChjb250ZXh0UGF0aCArICdnYW1lcycsIHBhcmFtcyk7XHJcbiAgfTtcclxuXHJcbiAgdGhhdC5yZWFkUSA9IGZ1bmN0aW9uIChnYW1lSWQ6IHN0cmluZyk6IFEuUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBxd2VzdC5nZXQoY29udGV4dFBhdGggKyAnZ2FtZXMvJyArIGdhbWVJZCk7XHJcbiAgfTtcclxuXHJcbiAgdGhhdC5yZWFkVXNlcnNHYW1lc1EgPSBmdW5jdGlvbiAodXNlcklkOiBzdHJpbmcpOiBRLlByb21pc2U8R2FtZVtdPiB7XHJcbiAgICByZXR1cm4gcXdlc3QuZ2V0KGNvbnRleHRQYXRoICsgJ3VzZXJzLycgKyB1c2VySWQgKyAnL2dhbWVzJyk7XHJcbiAgfTtcclxuXHJcbiAgdGhhdC5yZWFkTXlHYW1lc1EgPSBmdW5jdGlvbiAoKTogUS5Qcm9taXNlPEdhbWVbXT4ge1xyXG4gICAgcmV0dXJuIHRoYXQucmVhZFVzZXJzR2FtZXNRKHVzZXJzQXBpLmdldExvZ2dlZEluVXNlcklkKCkpO1xyXG4gIH07XHJcblxyXG4gIC8vLy8vLyBHQU1FIFNFUlZJQ0VTIC8vLy8vL1xyXG5cclxuICB0aGF0LmpvaW5HYW1lUSA9IGZ1bmN0aW9uIChnYW1lSWQ6IHN0cmluZyk6IFEuUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBxd2VzdC5wb3N0KGNvbnRleHRQYXRoICsgJ2dhbWVzLycgKyBnYW1lSWQgKyAnL2pvaW4nKTtcclxuICB9O1xyXG5cclxuICAvLy8vLyBvdGhlciAvLy8vLy9cclxuXHJcbiAgdGhhdC5nZXRQbGF5ZXJzTWFwUSA9IGZ1bmN0aW9uIChnYW1lOiBHYW1lKTogUS5Qcm9taXNlPFBsYXllcnNNYXA+IHtcclxuICAgIHZhciBtYXA6IFBsYXllcnNNYXAgPSBfLmNsb25lKGdhbWUucGxheWVycyksXHJcbiAgICAgIHByb21pc2VBcnJheTogUS5Qcm9taXNlPGFueT5bXSA9IFtdO1xyXG5cclxuICAgIF8uZWFjaChtYXAsIGZ1bmN0aW9uIChwbGF5ZXIsIHBsYXllclJlbCkge1xyXG4gICAgICBwcm9taXNlQXJyYXkucHVzaCh1c2Vyc0FwaS5yZWFkQ2FjaGVRKHBsYXllci5wbGF5ZXJJZClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAodXNlcj86IFVzZXIpIHtcclxuICAgICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgIG1hcFtwbGF5ZXJSZWxdLm5hbWUgPSB1c2VyLnVzZXJuYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gUS5hbGwocHJvbWlzZUFycmF5KVxyXG4gICAgICAudGhlbigoKSA9PiBtYXApO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB0aGF0IGFzIEdhbWVzQXBpO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL0dhbWVzLnRzIiwiXHJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XHJcblxyXG5pbXBvcnQgeyBxd2VzdCB9IGZyb20gJy4uL3V0aWxzL3F3ZXN0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUnVsZUJ1bmRsZXNBcGkge1xyXG4gIGluZGV4USgpOiBRLlByb21pc2U8UnVsZUJ1bmRsZVtdPjtcclxuICBjcmVhdGVRKHBhcmFtczogYW55KTogUS5Qcm9taXNlPGFueT47XHJcbiAgcmVhZFEocnVsZUJ1bmRsZUlkOiBzdHJpbmcpOiBRLlByb21pc2U8UnVsZUJ1bmRsZT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUnVsZUJ1bmRsZSB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFJ1bGVCdW5kbGVzQXBpKGNvbnRleHRQYXRoOiBzdHJpbmcpOiBSdWxlQnVuZGxlc0FwaSB7XHJcbiAgdmFyIHRoYXQ6IGFueSA9IHt9O1xyXG5cclxuICB0aGF0LmluZGV4USA9IGZ1bmN0aW9uICgpOiBRLlByb21pc2U8UnVsZUJ1bmRsZVtdPiB7XHJcbiAgICByZXR1cm4gcXdlc3QuZ2V0KGNvbnRleHRQYXRoICsgJ3J1bGVCdW5kbGVzJyk7XHJcbiAgfTtcclxuXHJcbiAgdGhhdC5jcmVhdGVRID0gZnVuY3Rpb24gKHBhcmFtczogYW55KTogUS5Qcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIHF3ZXN0LnBvc3QoY29udGV4dFBhdGggKyAncnVsZUJ1bmRsZXMnLCBwYXJhbXMpO1xyXG4gIH07XHJcblxyXG4gIHRoYXQucmVhZFEgPSBmdW5jdGlvbiAocnVsZUJ1bmRsZUlkOiBzdHJpbmcpOiBRLlByb21pc2U8UnVsZUJ1bmRsZT4ge1xyXG4gICAgcmV0dXJuIHF3ZXN0LmdldChjb250ZXh0UGF0aCArICdydWxlQnVuZGxlcy8nICsgcnVsZUJ1bmRsZUlkKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gdGhhdCBhcyBSdWxlQnVuZGxlc0FwaTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL1J1bGVCdW5kbGVzLnRzIiwiXHJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IHF3ZXN0IH0gZnJvbSAnLi4vdXRpbHMvcXdlc3QnO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIFBpZWNlIH0gZnJvbSAnLi4vbW9kZWxzL0dhbWVTdGF0ZXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHYW1lQm9hcmRzQXBpIHtcclxuICBpbmRleFEoKTogUS5Qcm9taXNlPEdhbWVCb2FyZFtdPjtcclxuICByZWFkUShHYW1lQm9hcmRJZDogc3RyaW5nKTogUS5Qcm9taXNlPEdhbWVCb2FyZD47XHJcbiAgcmVhZEdhbWVzQm9hcmRRKGdhbWVJZDogc3RyaW5nKTogUS5Qcm9taXNlPEdhbWVCb2FyZD47XHJcbiAgZ2FtZUJvYXJkc0NhY2hlOiBHYW1lQm9hcmRDYWNoZTtcclxuICBmYWtlQ2FjaGVXcml0ZShyZXN1bHQ6IEdhbWVCb2FyZCk6IHZvaWQ7XHJcbiAgcmVhZENhY2hlUShnYW1lQm9hcmRJZDogc3RyaW5nKTogUS5Qcm9taXNlPEdhbWVCb2FyZD47XHJcbiAgZ2V0RnVsbFNwYWNlSW5mbyhnYW1lQm9hcmQ6IEdhbWVCb2FyZCwgZ2FtZVN0YXRlOiBHYW1lU3RhdGUsIHNwYWNlSWQ6IHN0cmluZyk6IFEuUHJvbWlzZTxhbnk+O1xyXG4gIGdldFBpZWNlc09uU3BhY2UoZ2FtZVN0YXRlOiBHYW1lU3RhdGUsIHNwYWNlSWQ6IHN0cmluZyk6IFBpZWNlW107XHJcbiAgZ2V0UGllY2VzQnlPd25lcklkT25TcGFjZUlkKGdhbWVTdGF0ZTogR2FtZVN0YXRlLCBzcGFjZUlkOiBzdHJpbmcsIG93bmVySWQ6IHN0cmluZyk6IFBpZWNlW107XHJcbiAgZ2V0UGllY2VzRnJvbUlkKGdhbWVTdGF0ZTogR2FtZVN0YXRlLCBwaWVjZUlkOiBzdHJpbmcpOiBQaWVjZVtdO1xyXG4gIGdldENsYXNzZXNGcm9tUGllY2VzKGdhbWVTdGF0ZTogR2FtZVN0YXRlLCBjbGFzc05hbWU6IHN0cmluZyk6IFBpZWNlW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2FtZUJvYXJkQ2FjaGUge1xyXG4gIFtnYW1lQm9hcmRJZDogc3RyaW5nXTogR2FtZUJvYXJkO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVCb2FyZCB7XHJcbiAgX2lkOiBzdHJpbmc7XHJcbiAgYm9hcmQ6IEJvYXJkU3BhY2VbXTtcclxuICBib2FyZFR5cGU6IHN0cmluZztcclxuICBnYW1lU3RhdGU6IHN0cmluZzsgLy8gaWRcclxuICBoaXN0b3J5OiBzdHJpbmc7IC8vIGlkXHJcbiAgcnVsZUJ1bmRsZToge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQm9hcmRTcGFjZSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjbGFzczogc3RyaW5nO1xyXG4gIGF0dHJpYnV0ZXM6IHtcclxuICAgIFthdHRyaWJ1dGU6IHN0cmluZ106IHN0cmluZztcclxuICB9O1xyXG4gIGVkZ2VzOiB7aWQ6IHN0cmluZ31bXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRHYW1lQm9hcmRzQXBpKGNvbnRleHRQYXRoOiBzdHJpbmcpOiBHYW1lQm9hcmRzQXBpIHtcclxuXHJcbiAgY29uc3QgdGhhdDogYW55ID0ge307XHJcblxyXG4gIHRoYXQuaW5kZXhRID0gZnVuY3Rpb24gKCk6IFEuUHJvbWlzZTxHYW1lQm9hcmRbXT4ge1xyXG4gICAgcmV0dXJuIHF3ZXN0LmdldChjb250ZXh0UGF0aCArICdnYW1lQm9hcmRzJyk7XHJcbiAgfTtcclxuXHJcbiAgdGhhdC5yZWFkUSA9IGZ1bmN0aW9uIChnYW1lQm9hcmRJZDogc3RyaW5nKTogUS5Qcm9taXNlPEdhbWVCb2FyZD4ge1xyXG4gICAgcmV0dXJuIHF3ZXN0LmdldChjb250ZXh0UGF0aCArICdnYW1lQm9hcmRzLycgKyBnYW1lQm9hcmRJZClcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIHRoYXQuZmFrZUNhY2hlV3JpdGUocmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICB9KTtcclxuICB9O1xyXG5cclxuICB0aGF0LnJlYWRHYW1lc0JvYXJkUSA9IGZ1bmN0aW9uIChnYW1lSWQ6IHN0cmluZyk6IFEuUHJvbWlzZTxHYW1lQm9hcmQ+IHtcclxuICAgIHJldHVybiBxd2VzdC5nZXQoY29udGV4dFBhdGggKyAnZ2FtZXMvJyArIGdhbWVJZCArICcvYm9hcmQnKTtcclxuICB9O1xyXG5cclxuICAvLy8vLy8gQ0FDSElORyAvLy8vLy9cclxuICB0aGF0LmdhbWVCb2FyZHNDYWNoZSA9IHt9O1xyXG5cclxuICB0aGF0LmZha2VDYWNoZVdyaXRlID0gZnVuY3Rpb24gKHJlc3VsdDogR2FtZUJvYXJkKTogdm9pZCB7XHJcbiAgICB0aGF0LmdhbWVCb2FyZHNDYWNoZVtyZXN1bHQuX2lkXSA9IHJlc3VsdDtcclxuICB9O1xyXG5cclxuICB0aGF0LnJlYWRDYWNoZVEgPSBmdW5jdGlvbiAoZ2FtZUJvYXJkSWQ6IHN0cmluZyk6IFEuUHJvbWlzZTxHYW1lQm9hcmQ+IHtcclxuICAgIHJldHVybiBRLlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBpZiAodGhhdC5nYW1lQm9hcmRzQ2FjaGVbZ2FtZUJvYXJkSWRdKSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0aGF0LmdhbWVCb2FyZHNDYWNoZVtnYW1lQm9hcmRJZF0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoYXQucmVhZFEoZ2FtZUJvYXJkSWQpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0OiBHYW1lQm9hcmQpIHtcclxuICAgICAgICAgICAgdGhhdC5nYW1lQm9hcmRzQ2FjaGVbcmVzdWx0Ll9pZF0gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycjogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXVEYnKVxyXG4gICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vY29tYmluZXMgZ2FtZWJvYXJkLmJvYXJkIGFuZCBnYW1lYm9hcmQuc3BhY2VzIChyZWFsbHkganVzdCBhZGRzIGF0dHJpYnV0ZXMpXHJcbiAgdGhhdC5nZXRGdWxsU3BhY2VJbmZvID0gZnVuY3Rpb24gKGdhbWVCb2FyZDogR2FtZUJvYXJkLCBnYW1lU3RhdGU6IEdhbWVTdGF0ZSwgc3BhY2VJZDogc3RyaW5nKTogUS5Qcm9taXNlPGFueT4ge1xyXG4gICAgdmFyIGZvdW5kU3BhY2U6IGFueTtcclxuXHJcbiAgICBfLmVhY2goZ2FtZUJvYXJkLmJvYXJkLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgaWYgKHZhbHVlLmlkID09PSBzcGFjZUlkKSB7XHJcbiAgICAgICAgZm91bmRTcGFjZSA9IF8uY2xvbmUodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWZvdW5kU3BhY2UpIHtcclxuICAgICAgdGhyb3cgJ2JhZCBpZCAnICsgc3BhY2VJZDtcclxuICAgIH1cclxuXHJcbiAgICBfLmVhY2goZ2FtZVN0YXRlLnNwYWNlcywgZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgIGlmICh2YWx1ZS5ib2FyZFNwYWNlSWQgPT09IHNwYWNlSWQpIHtcclxuICAgICAgICBmb3VuZFNwYWNlLmF0dHJpYnV0ZXMgPSB2YWx1ZS5hdHRyaWJ1dGVzO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZm91bmRTcGFjZTtcclxuICB9O1xyXG5cclxuICB0aGF0LmdldFBpZWNlc09uU3BhY2UgPSBmdW5jdGlvbiAoZ2FtZVN0YXRlOiBHYW1lU3RhdGUsIHNwYWNlSWQ6IHN0cmluZyk6IFBpZWNlW10ge1xyXG4gICAgY29uc3QgcGllY2VzOiBQaWVjZVtdID0gW107XHJcblxyXG4gICAgXy5lYWNoKGdhbWVTdGF0ZS5waWVjZXMsIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICBpZiAodmFsdWUubG9jYXRpb25JZCA9PT0gc3BhY2VJZCkge1xyXG4gICAgICAgIHBpZWNlcy5wdXNoKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHBpZWNlcztcclxuICB9O1xyXG5cclxuICB0aGF0LmdldFBpZWNlc0J5T3duZXJJZE9uU3BhY2VJZCA9IGZ1bmN0aW9uIChnYW1lU3RhdGU6IEdhbWVTdGF0ZSwgc3BhY2VJZDogc3RyaW5nLCBvd25lcklkOiBzdHJpbmcpOiBQaWVjZVtdIHtcclxuICAgIHJldHVybiBfLmZpbHRlcihnYW1lU3RhdGUucGllY2VzLCBmdW5jdGlvbiAocGllY2U6IFBpZWNlKSB7XHJcbiAgICAgIHJldHVybiBwaWVjZS5sb2NhdGlvbklkID09PSBzcGFjZUlkICYmIHBpZWNlLm93bmVySWQgPT09IG93bmVySWQ7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICB0aGF0LmdldFBpZWNlc0Zyb21JZCA9IGZ1bmN0aW9uIChnYW1lU3RhdGU6IEdhbWVTdGF0ZSwgcGllY2VJZDogbnVtYmVyKTogUGllY2VbXSB7XHJcbiAgICByZXR1cm4gXy5maWx0ZXIoZ2FtZVN0YXRlLnBpZWNlcywgZnVuY3Rpb24gKHBpZWNlOiBQaWVjZSkge1xyXG4gICAgICByZXR1cm4gcGllY2VJZCA9PT0gcGllY2UuaWQ7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICB0aGF0LmdldENsYXNzZXNGcm9tUGllY2VzID0gZnVuY3Rpb24gKGdhbWVTdGF0ZTogR2FtZVN0YXRlLCBjbGFzc05hbWU6IHN0cmluZyk6IFBpZWNlW10ge1xyXG4gICAgY29uc3QgZm91bmQ6IFBpZWNlW10gPSBbXTtcclxuXHJcbiAgICBfLmVhY2goZ2FtZVN0YXRlLnBpZWNlcywgZnVuY3Rpb24gKHZhbHVlOiBQaWVjZSkge1xyXG4gICAgICBpZiAodmFsdWUuY2xhc3MgPT09IGNsYXNzTmFtZSkge1xyXG4gICAgICAgIGZvdW5kLnB1c2godmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZm91bmQ7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHRoYXQgYXMgR2FtZUJvYXJkc0FwaTtcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZGVscy9HYW1lQm9hcmRzLnRzIiwiXHJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XHJcblxyXG5pbXBvcnQgeyBxd2VzdCB9IGZyb20gJy4uL3V0aWxzL3F3ZXN0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2FtZVN0YXRlc0FwaSB7XHJcbiAgaW5kZXhRKCk6IFEuUHJvbWlzZTxHYW1lU3RhdGVbXT47XHJcbiAgY3JlYXRlUShwYXJhbXM6IGFueSk6IFEuUHJvbWlzZTxhbnk+O1xyXG4gIHJlYWRRKGdhbWVTdGF0ZUlkOiBzdHJpbmcpOiBRLlByb21pc2U8R2FtZVN0YXRlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHYW1lU3RhdGUge1xyXG4gIGdsb2JhbFZhcmlhYmxlczoge1t2YXJpYWJsZTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbn07XHJcbiAgcGllY2VzOiBQaWVjZVtdO1xyXG4gIHBsYXllclZhcmlhYmxlczoge1xyXG4gICAgW3BsYXllck51bTogc3RyaW5nXToge1t2YXJpYWJsZTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbn07XHJcbiAgfTtcclxuICBzcGFjZXM6IFNwYWNlW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGllY2Uge1xyXG4gIF9pZDogc3RyaW5nO1xyXG4gIGlkOiBudW1iZXI7XHJcbiAgY2xhc3M6IHN0cmluZztcclxuICBsb2NhdGlvbklkOiBzdHJpbmc7XHJcbiAgb3duZXJJZDogc3RyaW5nOyAvLyBwbGF5ZXJOdW0gKGVnLiBwMSlcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTcGFjZSB7XHJcbiAgX2lkOiBzdHJpbmc7XHJcbiAgYm9hcmRTcGFjZUlkOiBzdHJpbmc7XHJcbiAgYXR0cmlidXRlczoge1thdHRyaWJ1dGU6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW59O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdEdhbWVTdGF0ZXNBcGkoY29udGV4dFBhdGg6IHN0cmluZykge1xyXG4gIGNvbnN0IHRoYXQ6IGFueSA9IHt9O1xyXG5cclxuICB0aGF0LmluZGV4USA9IGZ1bmN0aW9uICgpOiBRLlByb21pc2U8R2FtZVN0YXRlW10+IHtcclxuICAgIHJldHVybiBxd2VzdC5nZXQoY29udGV4dFBhdGggKyAnaGlzdG9yeXMnKTtcclxuICB9O1xyXG5cclxuICB0aGF0LnJlYWRRID0gZnVuY3Rpb24gKGdhbWVTdGF0ZUlkOiBzdHJpbmcpOiBRLlByb21pc2U8R2FtZVN0YXRlPiB7XHJcbiAgICByZXR1cm4gcXdlc3QuZ2V0KGNvbnRleHRQYXRoICsgJ2dhbWVTdGF0ZXMvJyArIGdhbWVTdGF0ZUlkKTtcclxuICB9O1xyXG5cclxuICB0aGF0LnJlYWRHYW1lc1N0YXRlUSA9IGZ1bmN0aW9uIChnYW1lSWQ6IHN0cmluZyk6IFEuUHJvbWlzZTxHYW1lU3RhdGU+IHtcclxuICAgIHJldHVybiBxd2VzdC5nZXQoY29udGV4dFBhdGggKyAnZ2FtZXMvJyArIGdhbWVJZCArICcvc3RhdGUnKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gdGhhdCBhcyBHYW1lU3RhdGVzQXBpO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL0dhbWVTdGF0ZXMudHMiLCJpbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBxd2VzdCB9IGZyb20gJy4uL3V0aWxzL3F3ZXN0JztcclxuaW1wb3J0IHsgVHVybiB9IGZyb20gJy4vVHVybnMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIaXN0b3J5c0FwaSB7XHJcbiAgaW5kZXhRKCk6IFEuUHJvbWlzZTxIaXN0b3J5W10+O1xyXG4gIHJlYWRRKGhpc3RvcnlJZDogc3RyaW5nKTogUS5Qcm9taXNlPEhpc3Rvcnk+O1xyXG4gIHJlYWRHYW1lc0hpc3RvcnlRKGdhbWVJZDogc3RyaW5nKTogUS5Qcm9taXNlPEhpc3Rvcnk+O1xyXG4gIHJlYWRHYW1lc0Z1bGxIaXN0b3J5UShnYW1lSWQ6IHN0cmluZyk6IFEuUHJvbWlzZTxIaXN0b3J5W10+O1xyXG4gIG1hcmtBbGxUdXJuc1JlYWQoaGlzdG9yeTogSGlzdG9yeSk6IHZvaWQ7XHJcbiAgZ2V0TGFzdFVucmVhZFR1cm4oaGlzdG9yeTogSGlzdG9yeSk6IFR1cm47XHJcbiAgZ2V0TGFzdFJvdW5kTWV0YShoaXN0b3J5OiBIaXN0b3J5KTogVHVybiB8IHVuZGVmaW5lZDtcclxuICBnZXRXaG9zVHVybklzSXQoaGlzdG9yeTogSGlzdG9yeSk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIaXN0b3J5IHtcclxuICBfaWQ6IHN0cmluZztcclxuICBjdXJyZW50UGxheWVySW5kZXhUdXJuOiBudW1iZXI7XHJcbiAgY3VycmVudFJvdW5kOiBudW1iZXI7XHJcbiAgY3VycmVudFR1cm46IG51bWJlcjtcclxuICBjdXJyZW50VHVyblN0YXR1czoge1xyXG4gICAgW3BsYXllck51bTogc3RyaW5nXTogYm9vbGVhbjsgXHJcbiAgfTtcclxuICBnYW1lSWQ6IHN0cmluZztcclxuICB0dXJuT3JkZXI6IHN0cmluZ1tdOyAvLyBzdHJpbmcgPSBwbGF5ZXJOdW0gKGVnOiBwMSwgcDIpXHJcbiAgdHVyblN1Ym1pdFN0eWxlOiBzdHJpbmc7XHJcbiAgdHVybnM6IHtcclxuICAgIG1ldGE/OiBUdXJuW107XHJcbiAgICBbdHVybkluZGV4OiBudW1iZXJdOiBUdXJuW107XHJcbiAgIH07XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdEhpc3RvcnlzQXBpKGNvbnRleHRQYXRoOiBzdHJpbmcpOiBIaXN0b3J5c0FwaSB7XHJcbiAgY29uc3QgdGhhdDogYW55ID0ge307XHJcblxyXG4gIHRoYXQuaW5kZXhRID0gZnVuY3Rpb24gKCk6IFEuUHJvbWlzZTxIaXN0b3J5W10+IHtcclxuICAgIHJldHVybiBxd2VzdC5nZXQoY29udGV4dFBhdGggKyAnaGlzdG9yeXMnKTtcclxuICB9O1xyXG5cclxuICB0aGF0LnJlYWRRID0gZnVuY3Rpb24gKGhpc3RvcnlJZDogc3RyaW5nKTogUS5Qcm9taXNlPEhpc3Rvcnk+IHtcclxuICAgIHJldHVybiBxd2VzdC5nZXQoY29udGV4dFBhdGggKyAnaGlzdG9yeXMvJyArIGhpc3RvcnlJZCk7XHJcbiAgfTtcclxuXHJcbiAgdGhhdC5yZWFkR2FtZXNIaXN0b3J5USA9IGZ1bmN0aW9uIChnYW1lSWQ6IHN0cmluZyk6IFEuUHJvbWlzZTxIaXN0b3J5PiB7XHJcbiAgICByZXR1cm4gcXdlc3QuZ2V0KGNvbnRleHRQYXRoICsgJ2dhbWVzLycgKyBnYW1lSWQgKyAnL2hpc3RvcnknLyosIG51bGwsIHtyZXNwb25zZVR5cGU6ICdqc29uJ30qLyk7XHJcbiAgfTtcclxuXHJcbiAgdGhhdC5yZWFkR2FtZXNGdWxsSGlzdG9yeVEgPSBmdW5jdGlvbiAoZ2FtZUlkOiBzdHJpbmcpOiBRLlByb21pc2U8SGlzdG9yeVtdPiB7XHJcbiAgICByZXR1cm4gcXdlc3QuZ2V0KGNvbnRleHRQYXRoICsgJ2dhbWVzLycgKyBnYW1lSWQgKyAnL2hpc3RvcnkvYWxsJyk7XHJcbiAgfTtcclxuXHJcbiAgLy8vLy8vLy8vLy8gU1RBUlQgU0hJVCBoYWNreSB3YXkgZm9yIHR1cm5zIHJlYWQgYnkgY2xpZW50XHJcbiAgLy8gVE9ETyBwbGVhc2UgZ2V0IHJpZCBvZiBvciByZXdyaXRlIHdpdGggbmV3IEhpc3RvcnkvVHVybiByZWxhdGlvbnNoaXBcclxuXHJcbiAgdmFyIHR1cm5zUmVhZDogYW55O1xyXG5cclxuICB0aGF0Lm1hcmtBbGxUdXJuc1JlYWQgPSBmdW5jdGlvbiAoaGlzdG9yeTogSGlzdG9yeSk6IHZvaWQge1xyXG4gICAgaWYgKCFoaXN0b3J5LnR1cm5zWzBdLmxlbmd0aCkgdGhyb3cgJ29ubHkgdXNlIG1hcmtBbGxUdXJuc1JlYWQoKSB3aXRoIEZ1bGwtaXNoIEhpc3RvcnknO1xyXG5cclxuICAgIHR1cm5zUmVhZCA9IHt9O1xyXG4gICAgXy5lYWNoKGhpc3RvcnkudHVybnMsIGZ1bmN0aW9uIChwbGF5ZXJUdXJuczogYW55LCBwbGF5ZXIpIHtcclxuICAgICAgdHVybnNSZWFkW3BsYXllcl0gPSBbXTtcclxuICAgICAgXy5lYWNoKHBsYXllclR1cm5zLCBmdW5jdGlvbiAoLyp0dXJuKi8pIHtcclxuICAgICAgICB0dXJuc1JlYWRbcGxheWVyXS5wdXNoKHRydWUpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2codHVybnNSZWFkKTtcclxuICB9O1xyXG5cclxuICB0aGF0LmdldExhc3RVbnJlYWRUdXJuID0gZnVuY3Rpb24gKGhpc3Rvcnk6IEhpc3RvcnkpOiBUdXJuIHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCBfdHVybjogVHVybiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBfLmVhY2goaGlzdG9yeS50dXJuT3JkZXIsIGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nLCBwbGF5ZXJJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgIGlmIChfdHVybiB8fCB2YWx1ZSA9PT0gJ21ldGEnKSByZXR1cm47XHJcblxyXG4gICAgICB2YXIgbGFzdFR1cm5OdW1iZXIgPSB0dXJuc1JlYWRbdmFsdWVdLmxlbmd0aDtcclxuICAgICAgY29uc29sZS5sb2coJ2xhcyAnICsgbGFzdFR1cm5OdW1iZXIpXHJcbiAgICAgIGlmIChoaXN0b3J5LnR1cm5zW3BsYXllckluZGV4XVtsYXN0VHVybk51bWJlcl0pIHtcclxuICAgICAgICBfdHVybiA9IGhpc3RvcnkudHVybnNbcGxheWVySW5kZXhdW2xhc3RUdXJuTnVtYmVyXTtcclxuICAgICAgICB0dXJuc1JlYWRbdmFsdWVdLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlYWQgJyArIHZhbHVlICsgJ1xcJ3MgdHVybjogJyArIGxhc3RUdXJuTnVtYmVyKVxyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIF90dXJuO1xyXG4gIH07XHJcblxyXG4gIHRoYXQuZ2V0TGFzdFJvdW5kTWV0YSA9IGZ1bmN0aW9uIChoaXN0b3J5OiBIaXN0b3J5KTogVHVybiB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAoIWhpc3RvcnkudHVybnMubWV0YSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICByZXR1cm4gaGlzdG9yeS50dXJucy5tZXRhW2hpc3RvcnkuY3VycmVudFJvdW5kIC0gMl07XHJcbiAgfTtcclxuXHJcbiAgLy8gRU5EIFNISVRcclxuXHJcbiAgLy8gZm9yIHJvdW5kUm9iaW5cclxuICB0aGF0LmdldFdob3NUdXJuSXNJdCA9IGZ1bmN0aW9uIChoaXN0b3J5OiBIaXN0b3J5KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBoaXN0b3J5LnR1cm5PcmRlcltoaXN0b3J5LmN1cnJlbnRQbGF5ZXJJbmRleFR1cm5dO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB0aGF0IGFzIEhpc3RvcnlzQXBpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2RlbHMvSGlzdG9yeXMudHMiLCJpbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xyXG5cclxuaW1wb3J0IHsgcXdlc3QgfSBmcm9tICcuLi91dGlscy9xd2VzdCc7XHJcbmltcG9ydCB7IFR1cm4gfSBmcm9tICcuL1R1cm5zJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHVybnNBcGkge1xyXG4gIHJlYWRRKGhpc3RvcnlJZDogc3RyaW5nKTogUS5Qcm9taXNlPFR1cm4+O1xyXG4gIHJlYWRHYW1lc1R1cm5RKGdhbWVJZDogc3RyaW5nLCB0dXJuTnVtYmVyOiBudW1iZXIpOiBRLlByb21pc2U8VHVybj47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHVybiB7XHJcbiAgX2lkOiBzdHJpbmc7XHJcbiAgZ2FtZUlkOiBzdHJpbmc7XHJcbiAgcGxheWVyVHVybnM6IHtcclxuICAgIFtwbGF5ZXJOdW06IHN0cmluZ106IHtcclxuICAgICAgYWN0aW9uczogYW55W107XHJcbiAgICAgIGRhdGVTdWJtaXR0ZWQ6IERhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFR1cm5zQXBpKGNvbnRleHRQYXRoOiBzdHJpbmcpOiBUdXJuc0FwaSB7XHJcbiAgY29uc3QgdGhhdDogYW55ID0ge307XHJcblxyXG4gIHRoYXQucmVhZFEgPSBmdW5jdGlvbiAodHVybklkOiBzdHJpbmcpOiBRLlByb21pc2U8VHVybj4ge1xyXG4gICAgcmV0dXJuIHF3ZXN0LmdldChjb250ZXh0UGF0aCArICd0dXJucy8nICsgdHVybklkKTtcclxuICB9O1xyXG5cclxuICB0aGF0LnJlYWRHYW1lc1R1cm5RID0gZnVuY3Rpb24gKGdhbWVJZDogc3RyaW5nLCB0dXJuTnVtYmVyOiBudW1iZXIpOiBRLlByb21pc2U8VHVybj4ge1xyXG4gICAgcmV0dXJuIHF3ZXN0LmdldChjb250ZXh0UGF0aCArICdnYW1lcy8nICsgZ2FtZUlkICsgJy9oaXN0b3J5LycgKyB0dXJuTnVtYmVyKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gdGhhdCBhcyBUdXJuc0FwaTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWxzL1R1cm5zLnRzIiwiaW1wb3J0ICogYXMgUSBmcm9tICdxJztcclxuXHJcbmltcG9ydCB7IHF3ZXN0IH0gZnJvbSAnLi4vdXRpbHMvcXdlc3QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQbGF5VHVybkFwaSB7XHJcbiAgc2VuZFEocGFyYW1zOiBhbnkpOiBRLlByb21pc2U8YW55PjtcclxuICBzZW5kR2FtZVR1cm5RKGdhbWVJZDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IFEuUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFBsYXlUdXJuQXBpKGNvbnRleHRQYXRoOiBzdHJpbmcpOiBQbGF5VHVybkFwaSB7XHJcbiAgY29uc3QgdGhhdDogYW55ID0ge307XHJcblxyXG4gIHRoYXQuc2VuZFEgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkpOiBRLlByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gcXdlc3QucG9zdChjb250ZXh0UGF0aCArICdwbGF5VHVybicsIHBhcmFtcyk7XHJcbiAgfTtcclxuXHJcbiAgdGhhdC5zZW5kR2FtZVR1cm5RID0gZnVuY3Rpb24gKGdhbWVJZDogc3RyaW5nLCBwYXJhbXM6IGFueSk6IFEuUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBxd2VzdC5wb3N0KGNvbnRleHRQYXRoICsgJ2dhbWVzLycgKyBnYW1lSWQgKyAnL3BsYXlUdXJuJywgcGFyYW1zKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gdGhhdDtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWV0aG9kcy9QbGF5VHVybi50cyJdLCJzb3VyY2VSb290IjoiIn0=