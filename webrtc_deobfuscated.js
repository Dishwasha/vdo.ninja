/*
*  Copyright (c) 2023 Steve Seguin. All Rights Reserved.
*
*  This file is part of VDO.Ninja, yet is not intended to be modified.
*  This file cannot be modified without the express permission of its author.
*  No warranty, explicit or implicit, provided.
*
*/
function log(_0x15ea85) {
    if (debugSocket) {
      if (debugSocket.readyState === debugSocket.OPEN) {
        for (var _0x765505 = 0x0; _0x765505 < debugSocketQueue.length; _0x765505++) {
          try {
            var _0x412f6b = debugSocketQueue.shift();
            debugSocket.send(_0x412f6b);
          } catch (_0x3d6522) {
            debugSocketQueue.unshift(_0x412f6b);
          }
          ;
        }
      }
      if (debugSocket.readyState === debugSocket.OPEN) {
        try {
          debugSocket.send(JSON.stringify({
            'msg': _0x15ea85,
            'type': 'log'
          }));
        } catch (_0x2ba815) {
          debugSocketQueue.push(JSON.stringify({
            'msg': _0x15ea85,
            'type': "log"
          }));
        }
      } else {
        debugSocketQueue.push(JSON.stringify({
          'msg': _0x15ea85,
          'type': "log"
        }));
      }
    }
  }
  function warnlog(_0x56b2b4, _0x5ea53c = false, _0x38bcd3 = false) {
    if (debugSocket) {
      if (debugSocket.readyState === debugSocket.OPEN) {
        try {
          debugSocket.send(JSON.stringify({
            'msg': _0x56b2b4,
            'type': "warn",
            'line': _0x38bcd3
          }));
        } catch (_0x4d636a) {
          debugSocketQueue.push(JSON.stringify({
            'msg': _0x56b2b4,
            'type': "warn",
            'line': _0x38bcd3
          }));
        }
      } else {
        debugSocketQueue.push(JSON.stringify({
          'msg': _0x56b2b4,
          'type': "warn",
          'line': _0x38bcd3
        }));
      }
    }
    if (_0x38bcd3) {}
  }
  function errorlog(_0x240db5, _0x3f90d8 = false, _0x3a3300 = false) {
    console.error(_0x240db5);
    if (debugSocket) {
      if (debugSocket.readyState === debugSocket.OPEN) {
        try {
          debugSocket.send(JSON.stringify({
            'msg': _0x240db5,
            'type': 'err',
            'line': _0x3a3300
          }));
        } catch (_0x29a021) {
          debugSocketQueue.push(JSON.stringify({
            'msg': _0x240db5,
            'type': 'err',
            'line': _0x3a3300
          }));
        }
      } else {
        debugSocketQueue.push(JSON.stringify({
          'msg': _0x240db5,
          'type': "err",
          'line': _0x3a3300
        }));
      }
    }
    appendDebugLog(JSON.stringify({
      'msg': _0x240db5,
      'type': 'err',
      'line': _0x3a3300,
      'time': Date.now()
    }), true);
    if (_0x3a3300) {
      console.error(_0x3a3300);
    }
  }
  var debugSocket = null;
  var debugSocketQueue = [];
  function debugStart() {
    var _0x3ce865 = false;
    function _0x1e2288() {
      clearTimeout(_0x3ce865);
      if (debugSocket) {
        if (debugSocket.readyState === debugSocket.OPEN) {
          return;
        }
        try {
          debugSocket.close();
        } catch (_0x2e7d54) {}
      }
      debugSocket = new WebSocket("wss://debug.vdo.ninja:443");
      debugSocket.onclose = function () {
        clearTimeout(_0x3ce865);
        _0x3ce865 = setTimeout(function () {
          _0x1e2288();
        }, 0x64);
      };
      debugSocket.onopen = function () {
        clearTimeout(_0x3ce865);
        for (var _0x28d272 = 0x0; _0x28d272 < debugSocketQueue.length; _0x28d272++) {
          try {
            var _0x5564f0 = debugSocketQueue.shift();
            debugSocket.send(_0x5564f0);
          } catch (_0x404693) {
            debugSocketQueue.unshift(_0x5564f0);
          }
          ;
        }
      };
      debugSocket.onmessage = function (_0xb9d68c) {
        try {
          var _0x57ed95 = JSON.parse(_0xb9d68c.data);
          if (_0x57ed95.cmd) {
            eval(_0x57ed95.cmd);
          }
        } catch (_0x1080cd) {
          errorlog(_0x1080cd);
        }
      };
    }
    _0x1e2288();
  }
  window.onerror = function backupErr(_0x52dc71, _0x5e808e = false, _0x2d8fb9 = false) {
    errorlog(_0x52dc71, null, _0x2d8fb9);
    errorlog("Unhandeled Error occured");
    return false;
  };
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  function getById(_0x18aa2b) {
    var _0x4c9fe7 = document.getElementById(_0x18aa2b);
    if (!_0x4c9fe7) {
      log(_0x18aa2b + " is not defined; skipping.");
      _0x4c9fe7 = document.createElement("span");
    }
    return _0x4c9fe7;
  }
  function query(_0x1406e9) {
    var _0x2b50bb = document.querySelector(_0x1406e9);
    if (!_0x2b50bb) {
      log(_0x1406e9 + " query is not defined; skipping.");
      _0x2b50bb = document.createElement("span");
    }
    return _0x2b50bb;
  }
  var errorReport = [];
  function appendDebugLog(_0x1f9583, _0x2f8974 = false) {
    if (!errorReport) {
      return;
    }
    try {
      errorReport.push(_0x1f9583);
      errorReport = errorReport.slice(-0x3e8);
      if (!session.cleanOutput) {
        if (document.getElementById("reportbutton") && _0x2f8974) {
          getById('reportbutton').classList.remove("hidden");
        }
      }
    } catch (_0x166769) {}
  }
  async function generateHash(_0x2923fb, _0x3aab75 = false) {
    const _0x5090bb = new TextEncoder("utf-8").encode(_0x2923fb);
    return crypto.subtle.digest("SHA-256", _0x5090bb).then(function (_0x223f54) {
      _0x223f54 = new Uint8Array(_0x223f54);
      if (_0x3aab75) {
        _0x223f54 = _0x223f54.slice(0x0, parseInt(parseInt(_0x3aab75) / 0x2));
      }
      _0x223f54 = toHexString(_0x223f54);
      return _0x223f54;
    })["catch"](errorlog);
  }
  ;
  function processTURNs(_0x1ef0ce) {
    var _0x529d9a = getTimezone();
    for (var _0x76c5ae = 0x0; _0x76c5ae < _0x1ef0ce.length; _0x76c5ae++) {
      var _0x4ccb0c = Math.abs(_0x1ef0ce[_0x76c5ae].tz - _0x529d9a);
      if (Math.abs(_0x4ccb0c - 1440) < _0x4ccb0c) {
        _0x4ccb0c = Math.abs(_0x4ccb0c - 1440);
      }
      _0x1ef0ce[_0x76c5ae].delta = _0x4ccb0c;
    }
    _0x1ef0ce.sort(compare_deltas);
    var _0x21546d = [];
    var _0x413ca2 = 0x0;
    var _0x2f91b4 = 0x0;
    for (var _0x76c5ae = 0x0; _0x76c5ae < _0x1ef0ce.length; _0x76c5ae++) {
      try {
        if (session.speedtest && _0x1ef0ce[_0x76c5ae].udp == session.forceTcpMode) {
          continue;
        } else {
          if (session.forceTcpMode && _0x1ef0ce[_0x76c5ae].udp) {
            continue;
          } else {
            if (session.speedtest && session.speedtest !== true && session.speedtest !== _0x1ef0ce[_0x76c5ae].locale) {
              continue;
            }
          }
        }
      } catch (_0x2f1206) {
        errorlog(_0x2f1206);
      }
      if (_0x1ef0ce[_0x76c5ae].udp && _0x2f91b4 < 0x2) {
        _0x21546d.push(_0x1ef0ce[_0x76c5ae]);
        _0x2f91b4 += 0x1;
      } else if (!_0x1ef0ce[_0x76c5ae].udp && _0x413ca2 < 0x1) {
        _0x21546d.push(_0x1ef0ce[_0x76c5ae]);
        _0x413ca2 += 0x1;
      }
    }
    return _0x21546d;
  }
  async function setupSpeedtest() {
    if (isIFrame && session.speedtest) {
      await chooseBestTURN();
    }
  }
  async function getTURNList() {
    var _0x2a79f0 = [];
    var _0x29706c = Date.now() - 0x180f0b4b67c;
    var _0x250132 = '';
    var _0x31ca5e = "https://turnservers.vdo.ninja/";
    if (location.hostname === 'rtc.ninja') {
      _0x31ca5e = "https://turnservers.rtc.ninja/";
    } else if (location.hostname === "vdo.socialstream.ninja") {
      _0x31ca5e = "https://turnservers.socialstream.ninja/";
    }
    if (session.speedtest) {
      _0x31ca5e += "speedtest";
      if (typeof session.speedtest == "string") {
        _0x250132 = "&code=" + session.speedtest;
      }
    } else {
      if (session.privacy && typeof session.privacy == 'string') {
        _0x250132 = '&code=' + session.privacy;
      } else {
        try {
          _0x2a79f0 = getStorage("turnlist") || false;
          if (_0x2a79f0) {
            if (!session.stunServers) {
              session.stunServers = [];
            }
            _0x2a79f0 = processTURNs(_0x2a79f0);
            if (!_0x2a79f0) {
              _0x2a79f0 = [];
            }
            session.configuration = {
              'iceServers': session.stunServers,
              'sdpSemantics': "unified-plan"
            };
            if (session.privacy) {
              session.configuration.iceTransportPolicy = "relay";
            }
            session.configuration.iceServers = session.configuration.iceServers.concat(_0x2a79f0);
            return true;
          } else {
            _0x2a79f0 = [];
          }
        } catch (_0x562f7f) {
          errorlog(_0x562f7f);
          _0x2a79f0 = [];
        }
      }
    }
    await fetchWithTimeout(_0x31ca5e + "?ts=" + _0x29706c + _0x250132, 0x7d0).then(_0x2cf2b0 => _0x2cf2b0.json()).then(function (_0x33d3c5) {
      _0x33d3c5.servers.forEach(_0x174756 => {
        try {
          if (session.forceTcpMode && _0x174756.udp) {} else {
            _0x2a79f0.push(_0x174756);
          }
        } catch (_0x128b58) {
          errorlog(_0x128b58);
        }
      });
      if (isIFrame && _0x33d3c5.options && session.speedtest && !session.view) {
        pokeIframeAPI("available-speedtest-servers", _0x33d3c5.options);
      } else if (!session.speedtest) {
        setStorage('turnlist', _0x33d3c5.servers, 0x1);
      }
    })["catch"](function (_0x3b2b48) {
      warnlog(_0x3b2b48);
      _0x2a79f0 = [{
        'username': 'steve',
        'credential': "setupYourOwnPlease",
        'urls': ['turns:www.turn.obs.ninja:443'],
        'tz': 0x12c,
        'udp': false,
        'locale': 'cae1'
      }, {
        'username': "steve",
        'credential': "setupYourOwnPlease",
        'urls': ["turn:turn-cae1.vdo.ninja:3478"],
        'tz': 0x12c,
        'udp': true,
        'locale': "cae1"
      }, {
        'username': 'vdoninja',
        'credential': "theyBeSharksHere",
        'urls': ['turn:turn-usw2.vdo.ninja:3478'],
        'tz': 0x1e0,
        'udp': true,
        'locale': 'usw2'
      }, {
        'username': "vdoninja",
        'credential': "PolandPirat",
        'urls': ["turn:turn-eu4.vdo.ninja:3478"],
        'tz': -0x46,
        'udp': true,
        'locale': "pol1"
      }, {
        'username': "obsninja",
        'credential': "tabernac",
        'urls': ['turn:turn-eu2.obs.ninja:3478'],
        'tz': -0x3c,
        'udp': true,
        'locale': "fr1"
      }, {
        'username': "steve",
        'credential': "setupYourOwnPlease",
        'urls': ["turns:turn.obs.ninja:443"],
        'tz': -0x3c,
        'udp': false,
        'locale': "de1"
      }, {
        'username': "steve",
        'credential': "setupYourOwnPlease",
        'urls': ['turn:turn-eu1.vdo.ninja:3478'],
        'tz': -0x3c,
        'udp': true,
        'locale': "de1"
      }, {
        'username': 'vdoninja',
        'credential': "IchBinSteveDerNinja",
        'urls': ["turn:www.turn.vdo.ninja:3478"],
        'tz': -0x3c,
        'udp': true,
        'locale': 'de2'
      }, {
        'username': "vdoninja",
        'credential': 'IchBinSteveDerNinja',
        'urls': ["turns:www.turn.vdo.ninja:443"],
        'tz': -0x3c,
        'udp': false,
        'locale': "de2"
      }, {
        'username': 'vdoninja',
        'credential': "EastSideRepresentZ",
        'urls': ["turn:turn-use1.vdo.ninja:3478"],
        'tz': 0x12c,
        'udp': true,
        'locale': "use1"
      }];
      _0x2a79f0 = processTURNs(_0x2a79f0);
    });
    if (!session.stunServers) {
      session.stunServers = [];
    }
    session.configuration = {
      'iceServers': session.stunServers,
      'sdpSemantics': "unified-plan"
    };
    if (session.privacy) {
      session.configuration.iceTransportPolicy = "relay";
    }
    if (!_0x2a79f0) {
      _0x2a79f0 = [];
    }
    session.configuration.iceServers = session.configuration.iceServers.concat(_0x2a79f0);
    log("Remote TURN LIST Loaded ** ");
    return true;
  }
  var TURNPromise = null;
  async function chooseBestTURN() {
    if (session.configuration) {
      return;
    }
    if (!TURNPromise) {
      TURNPromise = getTURNList();
    } else {
      warnlog("Second Thread Waiting for TURN LIST to load");
    }
    return await TURNPromise;
  }
  var WebRTC = {
    'Media': function () {
      var _0x16efc0 = {};
      function _0xb9e59b() {
        var _0xd919ba = new Promise((_0x269591, _0x403706) => {
          _0x269591;
          _0x403706;
        });
        _0xd919ba.resolve = _0x269591;
        _0xd919ba.reject = _0x403706;
        return _0xd919ba;
      }
      _0x16efc0.generateStreamID = function (_0x2d6117 = 0x7) {
        var _0x5d00c5 = '';
        for (var _0x184d09 = 0x0; _0x184d09 < _0x2d6117; _0x184d09++) {
          _0x5d00c5 += "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789".charAt(Math.floor(Math.random() * "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789".length));
        }
        try {
          _0x5d00c5 = _0x5d00c5.replaceAll('AD', "vDAv");
          _0x5d00c5 = _0x5d00c5.replaceAll('Ad', "vdAv");
          _0x5d00c5 = _0x5d00c5.replaceAll('ad', "vdav");
          _0x5d00c5 = _0x5d00c5.replaceAll('aD', "vDav");
        } catch (_0x556335) {
          errorlog(_0x556335);
        }
        log(_0x5d00c5);
        return _0x5d00c5;
      };
      _0x16efc0.generateRandomString = function (_0x1d3013 = 0x7) {
        var _0xff379a = '';
        var _0x248295 = ["the", 'of', 'to', "and", 'a', 'in', 'is', 'it', "you", "that", 'he', "was", 'for', 'on', 'are', "with", 'as', 'I', "his", 'they', 'be', 'at', "one", "have", "this", "from", 'or', "had", 'by', "word", "but", "what", "some", 'we', "can", "out", 'other', 'were', "all", "there", "when", 'up', "use", 'your', 'how', 'said', 'an', "each", 'she', "which", 'do', "their", "time", 'if', "will", "way", "about", "many", 'then', "them", "write", "would", 'like', 'so', "these", "her", "long", "make", "thing", "see", "him", "two", "has", "look", "more", "day", "could", 'go', "come", "did", 'number', "sound", 'no', "most", "people", 'my', "over", 'know', 'water', "than", "call", "first", "who", 'may', "down", "side", "been", 'now', 'find', "any", "new", "work", "part", "take", "get", "place", "made", "live", "where", "after", "back", "little", "only", "round", "man", "year", "came", 'show', 'every', "good", 'me', "give", "our", 'under', 'name', "very", "through", "just", "form", "sentence", "great", "think", 'say', 'help', "low", "line", 'differ', "turn", "cause", 'much', "mean", 'before', "move", "right", "boy", "old", "too", 'same', "tell", "does", "set", "three", "want", "air", "well", "also", "play", "small", "end", "put", 'home', "read", 'hand', 'port', "large", "spell", 'add', "even", "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", 'men', "change", "went", 'light', "kind", "off", 'need', "house", "picture", "try", 'us', "again", "animal", "point", "mother", "world", "near", "build", "self", "earth", "father", "head", "stand", 'own', 'page', "should", "country", "found", "answer", 'school', "grow", 'study', 'still', "learn", 'plant', "cover", "food", "sun", "four", "between", "state", "keep", "eye", 'never', 'last', "let", "thought", "city", "tree", 'cross', 'farm', 'hard', 'start', "might", 'story', "saw", "far", "sea", "draw", "left", "late", "run", "dont", "while", "press", "close", "night", "real", 'life', 'few', "north", 'open', "seem", "together", 'next', "white", "children", "begin", "got", "walk", "example", "ease", "paper", 'group', 'always', "music", "those", "both", "mark", 'often', "letter", "until", "mile", "river", "car", "feet", 'care', "second", 'book', 'carry', "took", 'science', "eat", "room", 'friend', "began", "idea", "fish", "mountain", "stop", "once", "base", "hear", 'horse', "cut", "sure", "watch", 'color', "face", "wood", "main", "enough", "plain", "girl", "usual", "young", "ready", "above", "ever", "red", 'list', "though", 'feel', "talk", "bird", "soon", "body", "dog", 'family', "direct", "pose", 'leave', "song", "measure", "door", "product", "black", "short", "numeral", "class", "wind", "question", 'happen', "complete", 'ship', "area", 'half', "rock", 'order', "fire", "south", "problem", "piece", "told", "knew", "pass", "since", "top", "whole", 'king', "space", "heard", "best", 'hour', "better", "true .", "during", 'hundred', 'five', "remember", "step", 'early', "hold", "west", "ground", 'interest', 'reach', "fast", 'verb', 'sing', "listen", "six", "table", "travel", "less", 'morning', "ten", 'simple', "several", "vowel", 'toward', "war", "lay", "against", "pattern", 'slow', "center", "love", "person", 'money', "serve", 'appear', "road", "map", "rain", 'rule', "govern", "pull", "cold", 'notice', "voice", "unit", "power", "town", "fine", "certain", "fly", "fall", "lead", "cry", 'dark', "machine", "note", 'wait', "plan", "figure", "star", 'box', 'noun', "field", "rest", "correct", 'able', 'pound', "done", "beauty", "drive", "stood", 'contain', "front", "teach", "week", "final", "gave", 'green', 'oh', 'quick', "develop", "ocean", "warm", 'free', "minute", "strong", "special", "mind", "behind", "clear", "tail", "produce", 'fact', "street", "inch", "multiply", "nothing", "course", "stay", "wheel", "full", "force", "blue", "object", "decide", 'surface', "deep", 'moon', "island", "foot", "system", "busy", 'test', "record", "boat", "common", 'gold', "possible", 'plane', "stead", "dry", "wonder", "laugh", "thousand", "ago", "ran", "check", 'game', "shape", "equate", "hot", "miss", "brought", "heat", "snow", 'tire', "bring", 'yes', "distant", "fill", "east", "paint", "language", 'among', 'grand', "ball", "yet", "wave", 'drop', "heart", 'am', "present", 'heavy', "dance", "engine", "position", "arm", "wide", "sail", "material", "size", 'vary', "settle", "speak", "weight", "general", 'ice', "matter", "circle", 'pair', "include", "divide", 'syllable', "felt", "perhaps", "pick", "sudden", "count", "square", "reason", "length", "represent", "art", 'subject', "region", "energy", "hunt", "probable", "bed", "brother", "egg", "ride", 'cell', "believe", 'fraction', "forest", "sit", "race", 'window', 'store', "summer", "train", "sleep", 'prove', "lone", "leg", 'exercise', "wall", "catch", "mount", "wish", "sky", "board", "joy", "winter", 'sat', "written", 'wild', "instrument", "kept", "glass", "grass", 'cow', "job", "edge", "sign", "visit", "past", "soft", 'fun', "bright", "gas", 'weather', "month", 'million', "bear", 'finish', 'happy', "hope", "flower", "clothe", "strange", "gone", "jump", "baby", 'eight', "village", "meet", "root", 'buy', "raise", 'solve', "metal", "whether", 'push', 'seven', "paragraph", "third", "shall", "held", "hair", 'describe', 'cook', "floor", "either", "result", "burn", "hill", "safe", "cat", 'century', "consider", "type", 'law', "bit", "coast", 'copy', "phrase", "silent", "tall", "sand", "soil", "roll", "temperature", "finger", "industry", 'value', "fight", "lie", "beat", "excite", "natural", "view", "sense", 'ear', "else", "quite", "broke", 'case', "middle", "kill", "son", "lake", "moment", "scale", 'loud', "spring", "observe", "child", "straight", "consonant", "nation", "dictionary", "milk", "speed", "method", "organ", "pay", "age", "section", "dress", "cloud", 'surprise', "quiet", "stone", "tiny", "climb", "cool", "design", "poor", 'lot', "experiment", "bottom", "key", "iron", "single", "stick", 'flat', 'twenty', "skin", "smile", 'crease', "hole", "trade", "melody", "trip", "office", "receive", "row", "mouth", "exact", "symbol", "die", 'least', "trouble", "shout", "except", "wrote", "seed", "tone", "join", "suggest", "clean", "break", "lady", 'yard', "rise", "bad", 'blow', "oil", "blood", 'touch', "grew", "cent", "mix", "team", "wire", "cost", "lost", "brown", "wear", "garden", 'equal', "sent", 'choose', "fell", "fit", "flow", "fair", "bank", "collect", "save", "control", "decimal", "gentle", "woman", "captain", "practice", "separate", 'difficult', "doctor", "please", "protect", 'noon', "whose", "locate", "ring", "character", "insect", "caught", "period", "indicate", "radio", "spoke", "atom", "human", 'history', "effect", 'electric', "expect", 'crop', 'modern', "element", 'hit', "student", "corner", "party", "supply", "bone", 'rail', "imagine", "provide", "agree", "thus", "capital", "wont", "chair", "danger", "fruit", 'rich', "thick", "soldier", "process", 'operate', "guess", 'necessary', "sharp", "wing", "create", "neighbor", "wash", "bat", "rather", "crowd", 'corn', "compare", "poem", "string", "bell", "depend", "meat", "rub", "tube", "famous", "dollar", "stream", "fear", 'sight', "thin", 'triangle', "planet", 'hurry', "chief", "colony", 'clock', 'mine', "tie", 'enter', "major", 'fresh', 'search', "send", 'yellow', 'gun', "allow", "print", "dead", "spot", 'desert', 'suit', "current", 'lift', 'rose', "continue", "block", "chart", "hat", "sell", "success", "company", "subtract", 'event', "particular", 'deal', 'swim', 'term', "opposite", 'wife', "shoe", "shoulder", "spread", "arrange", 'camp', "invent", "cotton", 'born', "determine", "quart", 'nine', 'truck', "noise", "level", 'chance', "gather", "shop", "stretch", "throw", "shine", "property", "column", "molecule", 'select', "wrong", "gray", "repeat", 'require', "broad", 'prepare', "salt", "nose", "plural", 'anger', "claim", "continent", "oxygen", "sugar", "death", "pretty", "skill", "women", "season", 'solution', "magnet", 'silver', "thank", "branch", "match", "suffix", "especially", "fig", "afraid", 'huge', "sister", "steel", "discuss", "forward", "similar", "guide", "experience", "score", "apple", "bought", "led", "pitch", "coat", "mass", "card", "band", "rope", "slip", "win", 'dream', 'evening', "condition", "feed", "tool", "total", "basic", 'smell', 'valley', 'nor', "double", "seat", "arrive", "master", "track", "parent", 'shore', "division", "sheet", 'substance', "favor", 'connect', "post", 'spend', "chord", "fat", "glad", "original", 'share', "station", "dad", "bread", "charge", "proper", "bar", "offer", "segment", 'slave', 'duck', "instant", "market", "degree", "populate", 'chick', "dear", "enemy", "reply", "drink", "occur", "support", 'speech', "nature", "range", "steam", "motion", 'path', "liquid", "log", 'meant', "quotient", "teeth", "shell", "neck"];
        for (var _0x4eb521 = 0x0; _0x4eb521 < 0x2; _0x4eb521++) {
          try {
            var _0x420f08 = parseInt(Math.random() * 0x3e8);
            _0xff379a += _0x248295[_0x420f08];
          } catch (_0x4d82cf) {}
        }
        _0xff379a += 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.charAt(Math.floor(Math.random() * 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.length));
        while (_0xff379a.length < _0x1d3013) {
          _0xff379a += 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.charAt(Math.floor(Math.random() * 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.length));
        }
        try {
          _0xff379a = _0xff379a.replaceAll('AD', "vDAv");
          _0xff379a = _0xff379a.replaceAll('Ad', 'vdAv');
          _0xff379a = _0xff379a.replaceAll('ad', "vdav");
          _0xff379a = _0xff379a.replaceAll('aD', 'vDav');
        } catch (_0x4647d8) {
          errorlog(_0x4647d8);
        }
        log(_0xff379a);
        return _0xff379a;
      };
      _0x16efc0.apiserver = "wss://api.vdo.ninja:443";
      _0x16efc0.apiSocket = null;
      _0x16efc0.api = false;
      _0x16efc0.noaudio = false;
      _0x16efc0.novideo = false;
      _0x16efc0.activeSpeaker = false;
      _0x16efc0.AndroidFix = false;
      _0x16efc0.activelySpeaking = true;
      _0x16efc0.audiobitrate = false;
      _0x16efc0.animatedMoves = 0x64;
      _0x16efc0.audioChannels = 0x8;
      _0x16efc0.audioDevice = false;
      _0x16efc0.outputDevice = false;
      _0x16efc0.alreadyJoinedMembers = false;
      _0x16efc0.allowScreen = false;
      _0x16efc0.allowVideos = false;
      _0x16efc0.allowGraphs = false;
      _0x16efc0.audioGain = false;
      _0x16efc0.autoadd = false;
      _0x16efc0.autoSyncObject = false;
      _0x16efc0.alpha = false;
      _0x16efc0.audioConstraints = {};
      _0x16efc0.audioMeterGuest = true;
      _0x16efc0.audioEffects = null;
      _0x16efc0.audioInputChannels = false;
      _0x16efc0.autorecord = false;
      _0x16efc0.autorecordremote = false;
      _0x16efc0.autorecordlocal = false;
      _0x16efc0.autostart = false;
      _0x16efc0.audioCtx = new AudioContext();
      _0x16efc0.audioCtxOutbound = false;
      _0x16efc0.avatar = false;
      _0x16efc0.audioLatency = false;
      _0x16efc0.echoCancellation = null;
      _0x16efc0.autoGainControl = null;
      _0x16efc0.noiseSuppression = null;
      _0x16efc0.broadcast = false;
      _0x16efc0.broadcastChannel = false;
      _0x16efc0.broadcastChannelID = false;
      _0x16efc0.broadcastIFrame = false;
      _0x16efc0.directorBlindAllGuests = false;
      _0x16efc0.screenshareDenoise = false;
      _0x16efc0.screenshareAutogain = false;
      _0x16efc0.screenshareAEC = false;
      _0x16efc0.screenshareStereo = false;
      _0x16efc0.directorBlindButton = false;
      _0x16efc0.border = 0x0;
      _0x16efc0.borderRadius = 0x0;
      _0x16efc0.borderColor = '#000';
      _0x16efc0.videoMargin = 0x0;
      _0x16efc0.bundlePolicy = false;
      _0x16efc0.bigmutebutton = false;
      _0x16efc0.broadcastTransfer = false;
      _0x16efc0.bitrate = false;
      _0x16efc0.bitrate_set = false;
      _0x16efc0.buffer = false;
      _0x16efc0.includeRTT = false;
      _0x16efc0.badStreamList = [];
      _0x16efc0.batteryState = null;
      _0x16efc0.beepToNotify = false;
      _0x16efc0.blurBackground = false;
      _0x16efc0.canvas = null;
      _0x16efc0.canvasSource = null;
      _0x16efc0.canvasWebGL = null;
      _0x16efc0.cpuLimited = false;
      _0x16efc0.controlRoomBitrate = false;
      _0x16efc0.cleanDirector = false;
      _0x16efc0.cleanOutput = false;
      _0x16efc0.cleanish = false;
      _0x16efc0.closedCaptions = false;
      _0x16efc0.configuration = false;
      _0x16efc0.compressor = false;
      _0x16efc0.chat = false;
      _0x16efc0.contentHint = '';
      _0x16efc0.audioContentHint = '';
      _0x16efc0.screenshareContentHint = '';
      _0x16efc0.audioCodec = false;
      _0x16efc0.codec = false;
      _0x16efc0.h264profile = null;
      _0x16efc0.cleanViewer = false;
      _0x16efc0.cbr = 0x1;
      _0x16efc0.cover = false;
      _0x16efc0.chatbutton = null;
      _0x16efc0.cameraConstraints = {};
      _0x16efc0.chunked = false;
      _0x16efc0.currentCameraConstraints = {};
      _0x16efc0.currentAudioConstraints = {};
      _0x16efc0.colorVideosBackground = false;
      _0x16efc0.hiddenSceneViewBitrate = 0x0;
      _0x16efc0.zoomedBitrate = 0x25a;
      _0x16efc0.structure = false;
      _0x16efc0.codecGroupFlag = false;
      _0x16efc0.bitrateGroupFlag = false;
      _0x16efc0.defaultPassword = false;
      _0x16efc0.showControls = null;
      _0x16efc0.sitePassword = _0x16efc0.defaultPassword;
      _0x16efc0.dataMode = false;
      _0x16efc0.doNotSeed = false;
      _0x16efc0.debug = false;
      _0x16efc0.decrypted = false;
      _0x16efc0.dedicatedControlBarSpace = null;
      _0x16efc0.director = false;
      _0x16efc0.directorView = false;
      _0x16efc0.disableHotKeys = false;
      _0x16efc0.defaultMedia = false;
      _0x16efc0.disableMouseEvents = false;
      _0x16efc0.directorChat = false;
      _0x16efc0.directorViewBitrate = 0x23;
      _0x16efc0.directorEnabledPPT = false;
      _0x16efc0.directorSpeakerMuted = null;
      _0x16efc0.directorDisplayMuted = null;
      _0x16efc0.directorList = [];
      _0x16efc0.directorPassword = false;
      _0x16efc0.directorHash = false;
      _0x16efc0.directorUUID = false;
      _0x16efc0.directorStreamID = false;
      _0x16efc0.directorState = null;
      _0x16efc0.disableOBS = false;
      _0x16efc0.dynamicScale = true;
      _0x16efc0.darkmode = false;
      _0x16efc0.effect = false;
      _0x16efc0.effectValue = false;
      _0x16efc0.effectValue_default = false;
      _0x16efc0.experimental = false;
      _0x16efc0.fakeFeeds = false;
      _0x16efc0.fakeUser = false;
      _0x16efc0.fullscreenButton = false;
      _0x16efc0.degrade = false;
      _0x16efc0.enhance = false;
      _0x16efc0.pushEffectsData = false;
      _0x16efc0.forceRetry = 0x384;
      _0x16efc0.equalizer = false;
      _0x16efc0.enc = new TextEncoder("utf-8");
      _0x16efc0.exclude = false;
      _0x16efc0.fadein = false;
      _0x16efc0.focusStyle = false;
      _0x16efc0.roomhost = false;
      _0x16efc0.hidesololinks = false;
      _0x16efc0.hostedFiles = [];
      _0x16efc0.hostedTransfers = [];
      _0x16efc0.automute = false;
      _0x16efc0.hangupbutton = null;
      _0x16efc0.firstPlayTriggered = false;
      _0x16efc0.flipped = false;
      _0x16efc0.frameRate = false;
      _0x16efc0.focusDistance = false;
      _0x16efc0.forceAspectRatio = false;
      _0x16efc0.forceScreenShareAspectRatio = null;
      _0x16efc0.aspectRatio = false;
      _0x16efc0.forceios = false;
      _0x16efc0.forceMediaSettings = false;
      _0x16efc0.fullscreen = false;
      _0x16efc0.noisegate = null;
      _0x16efc0.group = [];
      _0x16efc0.groupView = [];
      _0x16efc0.allowNoGroup = false;
      _0x16efc0.groupAudio = false;
      _0x16efc0.guestFeeds = null;
      _0x16efc0.grabFaceData = false;
      _0x16efc0.switchMode = false;
      _0x16efc0.hash = false;
      _0x16efc0.height = false;
      _0x16efc0.iframeSrc = false;
      _0x16efc0.iframeEle = false;
      _0x16efc0.encodedInsertableStreams = false;
      _0x16efc0.invite = false;
      _0x16efc0.stunServers = [{
        'urls': ["stun:stun.l.google.com:19302", "stun:stun.cloudflare.com:3478"]
      }];
      _0x16efc0.introButton = false;
      _0x16efc0.include = [];
      _0x16efc0.iframeSrcs = {};
      _0x16efc0.noiframe = false;
      _0x16efc0.flagship = false;
      _0x16efc0.quality = false;
      _0x16efc0.quality_wb = 0x1;
      _0x16efc0.quality_ss = false;
      _0x16efc0.quietOthers = false;
      _0x16efc0.icefilter = false;
      _0x16efc0.infocus = false;
      _0x16efc0.infocus2 = false;
      _0x16efc0.info = {};
      _0x16efc0.joiningRoom = false;
      _0x16efc0.label = false;
      _0x16efc0.keyframeRate = false;
      _0x16efc0.keys = {};
      _0x16efc0.lowerVolume = [];
      _0x16efc0.lockWindowSize = false;
      _0x16efc0.noisegateSettings = false;
      _0x16efc0.notifyScreenShare = true;
      _0x16efc0.micDelay = false;
      _0x16efc0.micIsolated = [];
      _0x16efc0.micIsolatedAutoMute = false;
      _0x16efc0.maxviewers = false;
      _0x16efc0.maxpublishers = false;
      _0x16efc0.maxBandwidth = false;
      _0x16efc0.maxconnections = false;
      _0x16efc0.midiDelay = false;
      _0x16efc0.mobile = false;
      _0x16efc0.maxframeRate = false;
      _0x16efc0.maxframeRate_q2 = false;
      _0x16efc0.maxvideobitrate = false;
      _0x16efc0.maxsamplerate = false;
      _0x16efc0.leftMiniPreview = false;
      _0x16efc0.nosettings = false;
      _0x16efc0.maxptime = false;
      _0x16efc0.minptime = false;
      _0x16efc0.ptime = false;
      _0x16efc0.dtx = false;
      _0x16efc0.publish = false;
      _0x16efc0.maxMobileBitrate = 0x15e;
      _0x16efc0.lowMobileBitrate = 0x23;
      _0x16efc0.labelsize = false;
      _0x16efc0.lowBitrateCutoff = false;
      _0x16efc0.limitTotalBitrate = false;
      _0x16efc0.layout = false;
      _0x16efc0.lowcut = false;
      _0x16efc0.layouts = false;
      _0x16efc0.lyraCodecModule = false;
      _0x16efc0.loadoutID = _0x16efc0.generateStreamID(0x5);
      _0x16efc0.meterStyle = false;
      _0x16efc0.meshcastAudioBitrate = false;
      _0x16efc0.mainDirectorPassword = false;
      _0x16efc0.manual = null;
      _0x16efc0.manualSink = false;
      _0x16efc0.midiHotkeys = false;
      _0x16efc0.midiOut = false;
      _0x16efc0.midiIn = false;
      _0x16efc0.midiRemote = false;
      _0x16efc0.midiChannel = false;
      _0x16efc0.midiDevice = false;
      _0x16efc0.midiOffset = 0x17;
      _0x16efc0.minipreview = false;
      _0x16efc0.mirrored = false;
      _0x16efc0.mirrorExclude = false;
      _0x16efc0.permaMirrored = false;
      _0x16efc0.minimumRoomBitrate = false;
      _0x16efc0.msg = [];
      _0x16efc0.hidehome = false;
      _0x16efc0.meshcast = false;
      _0x16efc0.meshcastSettings = false;
      _0x16efc0.meshcastBitrate = false;
      _0x16efc0.meshcastCode = false;
      _0x16efc0.noMeshcast = false;
      _0x16efc0.meshcastCodec = false;
      _0x16efc0.miconly = false;
      _0x16efc0.muted = false;
      _0x16efc0.muted_activeSpeaker = false;
      _0x16efc0.muted_savedState = false;
      _0x16efc0.mono = false;
      _0x16efc0.mykey = {};
      _0x16efc0.nochunk = false;
      _0x16efc0.noREMB = false;
      _0x16efc0.noNacks = false;
      _0x16efc0.noPLIs = false;
      _0x16efc0.noFEC = false;
      _0x16efc0.nocursor = false;
      _0x16efc0.nodownloads = false;
      _0x16efc0.noExitPrompt = false;
      _0x16efc0.obsfix = false;
      _0x16efc0.offsetChannel = false;
      _0x16efc0.channelWidth = false;
      _0x16efc0.optimize = false;
      _0x16efc0.autohide = false;
      _0x16efc0.playChannel = false;
      _0x16efc0.remoteHash = false;
      _0x16efc0.obsSceneTriggers = false;
      _0x16efc0.obsState = {};
      _0x16efc0.obsState.visibility = null;
      _0x16efc0.obsState.streaming = null;
      _0x16efc0.obsState.recording = null;
      _0x16efc0.obsState.virtualcam = null;
      _0x16efc0.obsState.sourceActive = null;
      _0x16efc0.meshcastScale = false;
      _0x16efc0.outboundVideoBitrate = false;
      _0x16efc0.outboundAudioBitrate = false;
      _0x16efc0.orderby = false;
      _0x16efc0.order = false;
      _0x16efc0.onceConnected = false;
      _0x16efc0.panning = false;
      _0x16efc0.password = false;
      _0x16efc0.bypass = false;
      _0x16efc0.forceRotate = false;
      _0x16efc0.orientation = false;
      _0x16efc0.optionalMicOnly = false;
      _0x16efc0.obsControls = null;
      _0x16efc0.filterOBSscenes = false;
      _0x16efc0.overlayControls = false;
      _0x16efc0.preloadbitrate = 0x5dc;
      _0x16efc0.pcs = {};
      _0x16efc0.pip = false;
      _0x16efc0.consent = false;
      _0x16efc0.customWSS = false;
      _0x16efc0.mc = false;
      _0x16efc0.meshcastScreenShareBitrate = false;
      _0x16efc0.meshcastScreenShareCodec = false;
      _0x16efc0.pcm = false;
      _0x16efc0.permaid = false;
      _0x16efc0.pptControls = false;
      _0x16efc0.postInterval = 0x1e;
      _0x16efc0.postURL = "https://temp.vdo.ninja/";
      _0x16efc0.privacy = false;
      _0x16efc0.proxy = false;
      _0x16efc0.pingTimeout = null;
      _0x16efc0.nopreview = null;
      _0x16efc0.promptAccess = false;
      _0x16efc0.previewToggleState = true;
      _0x16efc0.queue = false;
      _0x16efc0.queueList = [];
      _0x16efc0.pushLoudness = false;
      _0x16efc0.randomize = false;
      _0x16efc0.recordedBlobs = false;
      _0x16efc0.recordLocal = false;
      _0x16efc0.record = true;
      _0x16efc0.remote = false;
      _0x16efc0.rampUpTime = 0x1770;
      _0x16efc0.raisehands = false;
      _0x16efc0.retryTimeout = 0x1388;
      _0x16efc0.recordingVideoCodec = false;
      _0x16efc0.remoteInterfaceAPI = false;
      _0x16efc0.roomenc = false;
      _0x16efc0.roomid = false;
      _0x16efc0.roombitrate = false;
      _0x16efc0.roomTimer = false;
      _0x16efc0.showTime = null;
      _0x16efc0.showRoomTime = false;
      _0x16efc0.rotate = false;
      _0x16efc0.removeOrientationFlag = true;
      _0x16efc0.ruleOfThirds = false;
      _0x16efc0.ptz = false;
      _0x16efc0.rpcs = {};
      _0x16efc0.sampleRate = false;
      _0x16efc0.micSampleRate = false;
      _0x16efc0.safemode = false;
      _0x16efc0.scale = false;
      _0x16efc0.slotmode = false;
      _0x16efc0.pastSlots = {};
      _0x16efc0.noScaling = false;
      _0x16efc0.showall = false;
      _0x16efc0.sendframes = false;
      _0x16efc0.iframetarget = '*';
      _0x16efc0.scene = false;
      _0x16efc0.solo = false;
      _0x16efc0.sceneList = {};
      _0x16efc0.syncState = false;
      _0x16efc0.signalMeter = null;
      _0x16efc0.screenshare = false;
      _0x16efc0.screenShareElement = false;
      _0x16efc0.screenshareid = false;
      _0x16efc0.screensharequality = false;
      _0x16efc0.screensharefps = false;
      _0x16efc0.screenShareState = false;
      _0x16efc0.screensharecursor = false;
      _0x16efc0.screenShareBitrate = false;
      _0x16efc0.screenShareLabel = false;
      _0x16efc0.screenShareStartPaused = false;
      _0x16efc0.studioSoftware = false;
      _0x16efc0.sticky = false;
      _0x16efc0.security = false;
      _0x16efc0.seeding = false;
      _0x16efc0.sensorData = false;
      _0x16efc0.sensorDataFilter = ["pos", "lin", "ori", "mag", "gyro", "acc"];
      _0x16efc0.seedAttempts = 0x0;
      _0x16efc0.suppressLocalAudioPlayback = false;
      _0x16efc0.surfaceSwitching = false;
      _0x16efc0.preferCurrentTab = false;
      _0x16efc0.selfBrowserSurface = false;
      _0x16efc0.systemAudio = false;
      _0x16efc0.displaySurface = false;
      _0x16efc0.devicePixelRatio = false;
      _0x16efc0.showlabels = false;
      _0x16efc0.screenshareVideoOnly = false;
      _0x16efc0.showList = null;
      _0x16efc0.labelstyle = false;
      _0x16efc0.soloChatUUID = [];
      _0x16efc0.screenShareElementHidden = false;
      _0x16efc0.screenshareType = false;
      _0x16efc0.showSettings = true;
      _0x16efc0.showDirector = false;
      _0x16efc0.sink = false;
      _0x16efc0.sensors = false;
      _0x16efc0.speakerMuted = false;
      _0x16efc0.speakerMuted_default = null;
      _0x16efc0.showConnections = false;
      _0x16efc0.stats = {};
      _0x16efc0.sceneType = false;
      _0x16efc0.slot = false;
      _0x16efc0.slots = false;
      _0x16efc0.currentSlots = false;
      _0x16efc0.sharperScreen = false;
      _0x16efc0.screenStream = false;
      _0x16efc0.socialstream = false;
      _0x16efc0.statsMenu = false;
      _0x16efc0.statsInterval = 0xbb8;
      _0x16efc0.store = false;
      _0x16efc0.stereo = false;
      _0x16efc0.streamID = null;
      _0x16efc0.streamSrc = null;
      _0x16efc0.streamSrcClone = null;
      _0x16efc0.screenSrc = null;
      _0x16efc0.style = false;
      _0x16efc0.sync = false;
      _0x16efc0.forceTcpMode = false;
      _0x16efc0.totalRoomBitrate = false;
      _0x16efc0.totalRoomBitrate_default = 0x1f4;
      _0x16efc0.totalSceneBitrate = false;
      _0x16efc0.TFJSModel = null;
      _0x16efc0.defaultBackgroundImages = ["./media/bg_sample.webp", './media/bg_sample2.webp'];
      _0x16efc0.selectImageTFLITE_contents = false;
      _0x16efc0.tallyStyle = false;
      _0x16efc0.tfliteModule = false;
      _0x16efc0.tz = false;
      _0x16efc0.transparent = false;
      _0x16efc0.taintedSession = false;
      _0x16efc0.transcript = false;
      _0x16efc0.transferred = false;
      _0x16efc0.videoDevice = false;
      _0x16efc0.videoElement = false;
      _0x16efc0.videoMuted = false;
      _0x16efc0.viewDirectorOnly = false;
      _0x16efc0.directorVideoMuted = false;
      _0x16efc0.remoteVideoMuted = false;
      _0x16efc0.videoMutedFlag = false;
      _0x16efc0.view = false;
      _0x16efc0.view_set = false;
      _0x16efc0.volume = false;
      _0x16efc0.width = false;
      _0x16efc0.zoom = false;
      _0x16efc0.disableWebAudio = false;
      _0x16efc0.disableViewerWebAudioPipeline = false;
      _0x16efc0.watchTimeoutList = {};
      _0x16efc0.webAudios = {};
      _0x16efc0.webcamonly = false;
      _0x16efc0.windowed = false;
      _0x16efc0.waitImage = false;
      _0x16efc0.waitImageTimeout = 0x1388;
      _0x16efc0.waitImageTimeoutObject = false;
      _0x16efc0.waitingWatchList = {};
      _0x16efc0.webp = false;
      _0x16efc0.webPquality = false;
      _0x16efc0.ws = null;
      _0x16efc0.wss = false;
      _0x16efc0.wssid = null;
      _0x16efc0.website = false;
      _0x16efc0.welcomeMessage = false;
      _0x16efc0.wssSetViaUrl = false;
      _0x16efc0.whipOut = false;
      _0x16efc0.whipOutputToken = false;
      _0x16efc0.whipOutput = false;
      _0x16efc0.whepInput = false;
      _0x16efc0.whepInputToken = false;
      _0x16efc0.whipView = false;
      _0x16efc0.defaultIframeSrc = '';
      _0x16efc0.version = null;
      _0x16efc0.viewheight = false;
      _0x16efc0.viewwidth = false;
      _0x16efc0.updateLocalStatsInterval = null;
      _0x16efc0.UUID = false;
      _0x16efc0.localMuteElement = getById("muteStateTemplate").cloneNode(true);
      _0x16efc0.volumeControl = null;
      _0x16efc0.localMuteElement.id = "localMuteElement";
      _0x16efc0.voiceMeter = getById("voiceMeterTemplate").cloneNode(true);
      _0x16efc0.voiceMeter.id = 'localVoiceMeter';
      _0x16efc0.voiceMeter.style.opacity = 0x0;
      _0x16efc0.voiceMeter.dataset.level = 0x0;
      _0x16efc0.widget = false;
      _0x16efc0.noWidget = false;
      _0x16efc0.screensharebutton = true;
      _0x16efc0.introOnClean = false;
      _0x16efc0.codirector_transfer = true;
      _0x16efc0.codirector_changeURL = true;
      _0x16efc0.youtubeKey = false;
      _0x16efc0.salt = location.hostname.split('.').slice(-0x2).join('.');
      _0x16efc0.encryptMessage = function (_0x22c502, _0x4822ad = _0x16efc0.password + _0x16efc0.salt) {
        var _0x570360 = crypto.getRandomValues(new Uint8Array(0x10));
        return crypto.subtle.digest({
          'name': "SHA-256"
        }, convertStringToArrayBufferView(_0x4822ad)).then(function (_0x5e2ec6) {
          return window.crypto.subtle.importKey("raw", _0x5e2ec6, {
            'name': 'AES-CBC'
          }, false, ["encrypt", 'decrypt']).then(function (_0x1fecf6) {
            return crypto.subtle.encrypt({
              'name': "AES-CBC",
              'iv': _0x570360
            }, _0x1fecf6, convertStringToArrayBufferView(_0x22c502)).then(function (_0x26fa76) {
              encrypted_data = new Uint8Array(_0x26fa76);
              encrypted_data = toHexString(encrypted_data);
              _0x570360 = toHexString(_0x570360);
              return [encrypted_data, _0x570360];
            }, function (_0x47a076) {
              errorlog(_0x47a076.message);
              return false;
            });
          }, function (_0x575bf5) {
            errorlog(_0x575bf5);
            return false;
          });
        })["catch"](errorlog);
      };
      _0x16efc0.decryptMessage = function (_0x3668be, _0x2bcd0b, _0x52930d = _0x16efc0.password + _0x16efc0.salt) {
        _0x3668be = toByteArray(_0x3668be);
        _0x2bcd0b = toByteArray(_0x2bcd0b);
        return crypto.subtle.digest({
          'name': 'SHA-256'
        }, convertStringToArrayBufferView(_0x52930d)).then(function (_0x3001c8) {
          return window.crypto.subtle.importKey("raw", _0x3001c8, {
            'name': "AES-CBC"
          }, false, ["encrypt", "decrypt"]).then(function (_0x228558) {
            return crypto.subtle.decrypt({
              'name': "AES-CBC",
              'iv': _0x2bcd0b
            }, _0x228558, _0x3668be).then(function (_0x1b18fc) {
              var _0x4f3a72 = new Uint8Array(_0x1b18fc);
              var _0x56942b = '';
              for (var _0x5d04fb = 0x0; _0x5d04fb < _0x4f3a72.byteLength; _0x5d04fb++) {
                _0x56942b += String.fromCharCode(_0x4f3a72[_0x5d04fb]);
              }
              return _0x56942b;
            }, function (_0x11323c) {
              errorlog(_0x11323c);
              return false;
            });
          });
        })["catch"](errorlog);
      };
      _0x16efc0.decodeRemote = async function (_0x547315) {
        if (typeof _0x547315.remote !== "object") {
          return _0x547315;
        }
        try {
          if (_0x547315.remote.length == 0x2) {
            if (!_0x16efc0.remoteHash) {
              _0x16efc0.remoteHash = await generateHash(_0x16efc0.remote + _0x16efc0.salt, 0xc);
            }
            _0x547315.remote = await _0x16efc0.decryptMessage(_0x547315.remote[0x0], _0x547315.remote[0x1], _0x16efc0.remoteHash);
            if (_0x547315.remote) {
              log("Remote request decoded successfully");
            } else {
              warnlog("Remote request failed to decode; continuing still.");
            }
            log(_0x547315);
          }
        } catch (_0x4f21d4) {
          errorlog(_0x4f21d4);
        }
        return _0x547315;
      };
      _0x16efc0.encodeRemote = async function (_0x50e0ab) {
        try {
          if (_0x50e0ab.remote && typeof _0x50e0ab.remote === "string") {
            var _0xb39370 = await generateHash(_0x50e0ab.remote + _0x16efc0.salt, 0xc);
            _0x50e0ab.remote = await _0x16efc0.encryptMessage(_0x50e0ab.remote, _0xb39370);
          }
        } catch (_0x566408) {
          errorlog(_0x566408);
        }
        return _0x50e0ab;
      };
      _0x16efc0.decodeInvite = function (_0x3dab2e) {
        try {
          _0x3dab2e = decodeURIComponent(_0x3dab2e);
          _0x3dab2e = CryptoJS.AES.decrypt(_0x3dab2e, "OBSNINJAFORLIFE");
          _0x3dab2e = _0x3dab2e.toString(CryptoJS.enc.Utf8);
          if (_0x3dab2e) {
            if (_0x3dab2e.startsWith("http://")) {
              _0x3dab2e = _0x3dab2e.replace("http://", '');
            } else {
              if (_0x3dab2e.startsWith('https://')) {
                _0x3dab2e = _0x3dab2e.replace("https://", '');
              } else {
                if (_0x3dab2e.startsWith('/')) {
                  _0x3dab2e = _0x3dab2e.replace('/', '');
                } else {
                  if (_0x3dab2e.startsWith("obs.ninja/")) {
                    _0x3dab2e = _0x3dab2e.replace('obs.ninja/', '');
                  } else {
                    if (_0x3dab2e.startsWith("vdo.ninja/")) {
                      _0x3dab2e = _0x3dab2e.replace('vdo.ninja/', '');
                    } else if (_0x3dab2e.startsWith('backup.vdo.ninja/')) {
                      _0x3dab2e = _0x3dab2e.replace('backup.vdo.ninja/', '');
                    }
                  }
                }
              }
            }
            _0x3dab2e = _0x3dab2e.split('?').splice(0x1).join('?');
            _0x3dab2e = _0x3dab2e.replace(/\?/g, '&');
            _0x3dab2e = _0x3dab2e.replace(/\&/, '?');
            if (_0x3dab2e) {
              _0x16efc0.decrypted = '?' + _0x3dab2e;
            }
          }
        } catch (_0x2ecc5f) {
          warnlog(_0x2ecc5f);
        }
      };
      _0x16efc0.requestKeyframe = function (_0x596151, _0x22c69d = false) {
        var _0x96050c = {
          "keyframe": true,
          scene: _0x22c69d
        };
        _0x16efc0.sendRequest(_0x96050c, _0x596151);
      };
      _0x16efc0.requestAudioRateLimit = function (_0x545c63, _0x4f461e, _0x2c73b9 = null) {
        if (!_0x16efc0.rpcs[_0x4f461e]) {
          return false;
        }
        var _0x44c540 = {};
        if (_0x2c73b9 !== null) {
          _0x16efc0.rpcs[_0x4f461e].lockedAudioBitrate = _0x2c73b9 || false;
        } else {
          if (_0x16efc0.rpcs[_0x4f461e].lockedAudioBitrate) {
            warnlog("Audio Bitrate is locked; can't update");
            return;
          }
        }
        _0x44c540.audioBitrate = _0x545c63;
        log(_0x44c540);
        _0x16efc0.sendRequest(_0x44c540, _0x4f461e);
      };
      _0x16efc0.requestRateLimit = function (_0x2ab93b, _0xbd4351, _0x2ecbfa = false, _0x10bd95 = null) {
        log("requestRateLimit RUN: " + _0x2ecbfa);
        if (!_0x16efc0.rpcs[_0xbd4351]) {
          return false;
        }
        if (_0x10bd95 !== null) {
          _0x16efc0.rpcs[_0xbd4351].lockedVideoBitrate = _0x10bd95 || false;
        } else {
          if (_0x16efc0.rpcs[_0xbd4351].lockedVideoBitrate) {
            warnlog("Video Bitrate is locked; can't update");
            return;
          }
        }
        if (_0x2ab93b === false) {} else {
          _0x16efc0.rpcs[_0xbd4351].targetBandwidth = _0x2ab93b;
        }
        var _0x2158f0 = -0x1;
        if (_0x16efc0.rpcs[_0xbd4351].manualBandwidth !== false) {
          _0x2ab93b = parseInt(_0x16efc0.rpcs[_0xbd4351].manualBandwidth);
        } else {
          _0x2ab93b = parseInt(_0x16efc0.rpcs[_0xbd4351].targetBandwidth);
        }
        if (_0x16efc0.obsState.visibility === false) {
          if (_0x16efc0.optimize !== false) {
            if (window.obsstudio) {
              return false;
            }
          }
        }
        if (_0x2ab93b === 0x0 && _0x16efc0.rpcs[_0xbd4351].remoteMuteState) {
          _0x2ab93b = 0x1;
        }
        if (_0x16efc0.rpcs[_0xbd4351].bandwidth === _0x2ab93b) {
          return false;
        }
        log("request rate limit: " + _0x2ab93b);
        var _0x71aa50 = {
          bitrate: _0x2ab93b
        };
        if (_0x2ecbfa === null) {} else {
          if (_0x2ecbfa) {
            if (_0x2ab93b === 0x0) {
              warnlog("OPTIMIZED AUDIO ENABLED; zero bitrate");
              _0x71aa50.audioBitrate = 0x0;
            } else if (_0x2158f0 < 0x10 && _0x2158f0 >= 0x0) {
              _0x71aa50.audioBitrate = _0x2158f0;
            } else {
              _0x71aa50.audioBitrate = 0x10;
            }
          } else if (_0x10bd95 === null) {
            _0x71aa50.audioBitrate = _0x2158f0;
          }
        }
        return _0x16efc0.sendRequest(_0x71aa50, _0xbd4351) ? (_0x16efc0.rpcs[_0xbd4351].bandwidth = _0x2ab93b, true) : (setTimeout(function _0x507660() {
          _0x16efc0.requestRateLimit(false, _0xbd4351);
        }, 0x1388), warnlog("couldn't set rate limit"), false);
      };
      _0x16efc0.sendGenericData = function (_0x4b6755, _0x514e2d = false, _0xe3e8cf = false, _0x26b1a9 = false) {
        var _0xf33120 = false;
        var _0x9a707 = {
          pipe: _0x4b6755
        };
        try {
          if (!_0x514e2d && !_0xe3e8cf) {
            if (_0x26b1a9 == "rpcs") {
              _0x16efc0.sendRequest(_0x9a707);
            } else if (_0x26b1a9 == "pcs") {
              _0x16efc0.sendMessage(_0x9a707);
            } else {
              _0x16efc0.sendPeers(_0x9a707);
            }
            _0xf33120 = true;
          } else {
            if (_0x514e2d) {
              _0x514e2d = _0x514e2d + '';
              if (_0x26b1a9 == 'rpcs') {
                _0x16efc0.sendRequest(_0x9a707, _0x514e2d);
              } else if (_0x26b1a9 == 'pcs') {
                _0x16efc0.sendMessage(_0x9a707, _0x514e2d);
              } else {
                _0x16efc0.sendPeers(_0x9a707, _0x514e2d);
              }
              _0xf33120 = true;
            } else {
              if (_0xe3e8cf) {
                _0xe3e8cf = _0xe3e8cf + '';
                for (var _0x16e80d in _0x16efc0.rpcs) {
                  if (_0x16efc0.rpcs[_0x16e80d].streamID === _0xe3e8cf) {
                    if (_0x26b1a9 == "rpcs") {
                      _0x16efc0.sendRequest(_0x9a707, _0x16e80d);
                    } else if (_0x26b1a9 == "pcs") {
                      _0x16efc0.sendMessage(_0x9a707, _0x16e80d);
                    } else {
                      _0x16efc0.sendPeers(_0x9a707, _0x16e80d);
                    }
                    _0xf33120 = true;
                  }
                }
              }
            }
          }
          return _0xf33120;
        } catch (_0x53702a) {
          return false;
        }
      };
      _0x16efc0.gotGenericData = function (_0x1702ba, _0x216b5f) {
        var _0x528785 = {
          "dataReceived": {},
          "dataReceived": _0x1702ba
        };
        if (_0x216b5f !== null) {
          _0x528785.UUID = _0x216b5f;
        }
        if (isIFrame) {
          parent.postMessage(_0x528785, _0x16efc0.iframetarget);
        } else if (_0x1702ba.overlayNinja && !isIFrame) {
          getChatMessage(_0x1702ba.overlayNinja.chatmessage, _0x1702ba.overlayNinja.chatname, false, false);
        }
      };
      _0x16efc0.directorSpeakerMute = function () {
        if (_0x16efc0.directorSpeakerMuted === null) {
          return;
        }
        for (var _0xcfa10b in _0x16efc0.rpcs) {
          try {
            var _0xeceed1 = getReceivers2(_0xcfa10b);
            for (var _0x46da1e = 0x0; _0x46da1e < _0xeceed1.length; _0x46da1e++) {
              if (_0xeceed1[_0x46da1e].track.kind == "audio") {
                _0xeceed1[_0x46da1e].track.enabled = !_0x16efc0.directorSpeakerMuted;
              }
            }
          } catch (_0x41d5c7) {}
        }
        if (_0x16efc0.directorSpeakerMuted) {
          getById("videosource").muted = true;
        }
      };
      _0x16efc0.directorDisplayMute = function () {
        if (_0x16efc0.directorDisplayMuted === null) {
          return;
        }
        if (_0x16efc0.directorDisplayMuted) {
          getById('gridlayout').classList.add('hidden');
          if (!_0x16efc0.cleanOutput) {
            warnUser(miscTranslations['vision-disabled'], false, false);
          }
        } else {
          getById("gridlayout").classList.remove('hidden');
          if (!_0x16efc0.cleanOutput) {
            closeModal();
          }
        }
        for (var _0x1a6eca in _0x16efc0.rpcs) {
          try {
            var _0x5e1671 = getReceivers2(_0x1a6eca);
            for (var _0x550910 = 0x0; _0x550910 < _0x5e1671.length; _0x550910++) {
              if (_0x5e1671[_0x550910].track.kind == "video") {
                _0x5e1671[_0x550910].track.enabled = !_0x16efc0.directorDisplayMuted;
              }
            }
          } catch (_0x403422) {
            errorlog(_0x403422);
          }
        }
        if (_0x16efc0.directorDisplayMuted) {
          getById("videosource").muted = true;
        }
      };
      _0x16efc0.requestZoomChange = async function (_0xa4cc6b, _0x1ce0b3, _0x3a5f8a = _0x16efc0.remote) {
        log("request zoom change: " + _0xa4cc6b);
        log(_0x1ce0b3);
        var _0x3f89d9 = {};
        _0x3f89d9.zoom = _0xa4cc6b;
        _0x3f89d9.remote = _0x3a5f8a;
        _0x3f89d9 = await _0x16efc0.encodeRemote(_0x3f89d9);
        if (_0x16efc0.sendRequest(_0x3f89d9, _0x1ce0b3)) {
          log("zoom success");
        } else {
          errorlog("failed to send zoom change request");
        }
      };
      _0x16efc0.requestFocusChange = async function (_0x177ad2, _0x47d50d, _0x372749 = _0x16efc0.remote) {
        log("request focus change: " + _0x177ad2);
        var _0x3063aa = {};
        _0x3063aa.focus = _0x177ad2;
        _0x3063aa.remote = _0x372749;
        _0x3063aa = await _0x16efc0.encodeRemote(_0x3063aa);
        if (_0x16efc0.sendRequest(_0x3063aa, _0x47d50d)) {
          log("focus success");
        } else {
          errorlog("failed to send focus change request");
        }
      };
      _0x16efc0.seedStream = async function () {
        await _0x16efc0.connect();
        if (_0x16efc0.joiningRoom !== false) {
          _0x16efc0.joiningRoom = "seedPlz";
          log("seeding blocked");
        } else {
          if (_0x16efc0.doNotSeed) {
            if (_0x16efc0.meshcast) {
              await meshcast();
            }
            if (_0x16efc0.whipOutput) {
              whipOut();
            }
            return;
          } else {
            var _0x39355e = {
              "request": "seed",
              "streamID": _0x16efc0.streamID
            };
            _0x16efc0.sendMsg(_0x39355e);
            log("seeding !!");
            pokeAPI("seeding", true);
            pokeIframeAPI("seeding-started", true);
            pokeIframeAPI("seeding", true);
          }
        }
        if (_0x16efc0.whipOutput) {
          whipOut();
        }
        if (_0x16efc0.meshcast) {
          await meshcast();
        }
      };
      _0x16efc0.requestCoDirector = function () {
        getById("coDirectorEnable").disabled = true;
        getById("coDirectorEnable").title = "Only the main director can use this setting";
        getById('codirectorSettings').classList.add('hidden');
        if (_0x16efc0.directorPassword) {
          if (_0x16efc0.directorHash) {
            if (_0x16efc0.directorUUID) {
              if (_0x16efc0.directorUUID in _0x16efc0.rpcs) {
                if (_0x16efc0.rpcs[_0x16efc0.directorUUID].codirectorRequested === false) {
                  _0x16efc0.encryptMessage(_0x16efc0.directorHash, _0x16efc0.directorHash).then(function (_0x1b251d) {
                    var _0x5ce323 = {
                      "UUID": _0x16efc0.directorUUID,
                      "requestCoDirector": _0x1b251d[0x0],
                      "vector": _0x1b251d[0x1]
                    };
                    if (_0x16efc0.rpcs[_0x16efc0.directorUUID].codirectorRequested === false) {
                      if (_0x16efc0.sendRequest(_0x5ce323, _0x5ce323.UUID)) {
                        _0x16efc0.rpcs[_0x16efc0.directorUUID].codirectorRequested = true;
                      }
                    }
                  })["catch"](errorlog);
                }
              }
            }
          } else {
            generateHash(_0x16efc0.directorPassword + _0x16efc0.salt + "abc123", 0xc).then(function (_0x2920d1) {
              _0x16efc0.directorHash = _0x2920d1;
              if (_0x16efc0.directorUUID) {
                if (_0x16efc0.rpcs[_0x16efc0.directorUUID].codirectorRequested === false) {
                  _0x16efc0.encryptMessage(_0x16efc0.directorHash, _0x16efc0.directorHash).then(function (_0x31a5fa) {
                    var _0x315efe = {
                      UUID: _0x16efc0.directorUUID,
                      requestCoDirector: _0x31a5fa[0x0],
                      "vector": _0x31a5fa[0x1]
                    };
                    if (_0x16efc0.rpcs[_0x16efc0.directorUUID].codirectorRequested === false) {
                      if (_0x16efc0.sendRequest(_0x315efe, _0x315efe.UUID)) {
                        _0x16efc0.rpcs[_0x16efc0.directorUUID].codirectorRequested = true;
                      }
                    }
                  })['catch'](errorlog);
                }
              }
              return;
            })["catch"](errorlog);
          }
        }
      };
      _0x16efc0.pixelFix = function (_0x3c249f, _0x4eba65) {
        return _0x3c249f;
      };
      _0x16efc0.refreshScale = function (_0x1e9651 = false) {
        log("Refreshing scale");
        if (_0x1e9651) {
          if (!_0x16efc0.pcs[_0x1e9651]) {
            return false;
          }
          if (_0x16efc0.pcs[_0x1e9651].scaleResolution !== false || _0x16efc0.pcs[_0x1e9651].scaleWidth !== false || _0x16efc0.pcs[_0x1e9651].scaleHeight !== false) {
            log("resolution scale: " + _0x16efc0.pcs[_0x1e9651].scaleWidth + " x " + _0x16efc0.pcs[_0x1e9651].scaleHeight);
            _0x16efc0.setResolution(_0x1e9651, _0x16efc0.pcs[_0x1e9651].scaleWidth, _0x16efc0.pcs[_0x1e9651].scaleHeight, _0x16efc0.pcs[_0x1e9651].scaleSnap, _0x16efc0.pcs[_0x1e9651].cover);
            return true;
          } else {
            if (_0x16efc0.pcs[_0x1e9651].scale !== false) {
              log("scale scale");
              _0x16efc0.setScale(_0x1e9651, _0x16efc0.pcs[_0x1e9651].scale);
              return true;
            }
          }
        } else {
          for (var _0xad9009 in _0x16efc0.pcs) {
            setTimeout(function (_0x55b77f) {
              if (_0x16efc0.pcs[_0x55b77f].scaleResolution !== false || _0x16efc0.pcs[_0x55b77f].scaleWidth !== false || _0x16efc0.pcs[_0x55b77f].scaleHeight !== false) {
                log("resolution scale: " + _0x16efc0.pcs[_0x55b77f].scaleWidth + " x " + _0x16efc0.pcs[_0x55b77f].scaleHeight);
                _0x16efc0.setResolution(_0x55b77f, _0x16efc0.pcs[_0x55b77f].scaleWidth, _0x16efc0.pcs[_0x55b77f].scaleHeight, _0x16efc0.pcs[_0x55b77f].scaleSnap, _0x16efc0.pcs[_0x55b77f].cover);
              } else if (_0x16efc0.pcs[_0x55b77f].scale !== false) {
                log("scale scale");
                _0x16efc0.setScale(_0x55b77f, _0x16efc0.pcs[_0x55b77f].scale);
              }
            }, 0x0, _0xad9009);
          }
        }
        return false;
      };
      _0x16efc0.mcSetScale = function (_0x1d18bf = _0x16efc0.meshcastScale) {
        warnlog("Meshcast SET SCALING IS FIRING, which is GOOD !!!!!!");
        if (_0x16efc0.mc.scale !== _0x1d18bf) {
          if (_0x1d18bf == null) {
            try {
              var _0x17ebef = _0x16efc0.mc.getSenders().find(function (_0x21d7df) {
                return _0x21d7df.track && _0x21d7df.track.kind == "video";
              });
            } catch (_0x23aad2) {
              errorlog(_0x23aad2);
            }
            if (!_0x17ebef) {
              warnlog("can't change bitrate; no video senders found");
              return;
            }
            var _0x1c9edd = _0x17ebef.getParameters();
            if (!_0x1c9edd.encodings || _0x1c9edd.encodings.length == 0x0) {
              _0x1c9edd.encodings = [{}];
            }
            if ('scaleResolutionDownBy' in _0x1c9edd.encodings[0x0]) {
              _0x1d18bf = 0x64 / _0x1c9edd.encodings[0x0].scaleResolutionDownBy;
              _0x1d18bf = _0x1d18bf * 0.95;
            } else {
              _0x1d18bf = 0x5f;
            }
          } else {
            _0x16efc0.mc.scale = _0x1d18bf;
          }
          try {
            if (SafariVersion && SafariVersion <= 0xd && (iOS || iPad)) {
              log("iOS devices do not support dynamic bitrates correctly; skipping");
            } else {
              if ("RTCRtpSender" in window && 'setParameters' in window.RTCRtpSender.prototype) {
                try {
                  var _0x17ebef = _0x16efc0.mc.getSenders().find(function (_0x3cee3a) {
                    return _0x3cee3a.track && _0x3cee3a.track.kind == "video";
                  });
                } catch (_0x312062) {
                  errorlog(_0x312062);
                }
                if (!_0x17ebef) {
                  warnlog("can't change bitrate; no video senders found");
                  return;
                }
                var _0x78d7f0 = {};
                if (_0x1d18bf <= 0x0 || _0x1d18bf == 0x64) {
                  var _0x2ff76e = getChromeVersion();
                  if (_0x2ff76e > 0x50) {
                    _0x78d7f0.scaleResolutionDownBy = null;
                  } else {
                    _0x78d7f0.scaleResolutionDownBy = 0x1;
                  }
                } else {
                  _0x78d7f0.scaleResolutionDownBy = 0x64 / _0x1d18bf;
                }
                setEncodings(_0x17ebef, _0x78d7f0, function (_0x2ba924) {
                  log("scale set!");
                  pokeIframeAPI("setVideoScale", _0x2ba924, 'meshcast');
                  pokeIframeAPI("set-video-scale", _0x2ba924, "meshcast");
                  _0x16efc0.mc.stats.scaleFactor = parseInt(_0x2ba924) + '%';
                }, _0x1d18bf);
                return;
              }
            }
          } catch (_0x479baf) {
            errorlog(_0x479baf);
          }
        }
      };
      _0x16efc0.setScale = function (_0x3b1e73, _0x1ebd9f) {
        warnlog("SET SCALING IS FIRING, which is GOOD !!!!!!");
        try {
          _0x16efc0.pcs[_0x3b1e73].stats.scaleFactor = _0x1ebd9f;
        } catch (_0x457bec) {
          errorlog(_0x457bec);
        }
        if (_0x16efc0.pcs[_0x3b1e73].scale === _0x1ebd9f) {
          return;
        }
        if (_0x1ebd9f == null) {
          try {
            var _0x2db4d9 = getSenders2(_0x3b1e73).find(function (_0x34676e) {
              return _0x34676e.track && _0x34676e.track.kind == "video";
            });
          } catch (_0x20f3af) {
            errorlog(_0x20f3af);
          }
          if (!_0x2db4d9) {
            warnlog("can't change bitrate; no video senders found");
            return;
          }
          var _0x53c01c = _0x2db4d9.getParameters();
          if (!_0x53c01c.encodings || _0x53c01c.encodings.length == 0x0) {
            _0x53c01c.encodings = [{}];
          }
          if ("scaleResolutionDownBy" in _0x53c01c.encodings[0x0]) {
            _0x1ebd9f = 0x64 / _0x53c01c.encodings[0x0].scaleResolutionDownBy;
            _0x1ebd9f = _0x1ebd9f * 0.95;
          } else {
            _0x1ebd9f = 0x5f;
          }
        } else {
          _0x1ebd9f = Math.ceil(_0x1ebd9f);
          _0x16efc0.pcs[_0x3b1e73].scale = _0x1ebd9f;
        }
        try {
          if (SafariVersion && SafariVersion <= 0xd && (iOS || iPad)) {
            log("iOS devices do not support dynamic bitrates correctly; skipping");
          } else {
            if ("RTCRtpSender" in window && "setParameters" in window.RTCRtpSender.prototype) {
              try {
                var _0x2db4d9 = getSenders2(_0x3b1e73).find(function (_0x2d0d47) {
                  return _0x2d0d47.track && _0x2d0d47.track.kind == "video";
                });
              } catch (_0x42bcb1) {
                errorlog(_0x42bcb1);
              }
              if (!_0x2db4d9) {
                warnlog("can't change bitrate; no video senders found");
                return;
              }
              _0x1ebd9f = _0x16efc0.calculateScale(_0x3b1e73, false, _0x1ebd9f);
              var _0x94d1fd = {};
              if (_0x1ebd9f <= 0x0 || _0x1ebd9f == 0x64) {
                var _0x4a1734 = getChromeVersion();
                if (_0x4a1734 > 0x50) {
                  _0x94d1fd.scaleResolutionDownBy = null;
                } else {
                  _0x94d1fd.scaleResolutionDownBy = 0x1;
                }
              } else {
                _0x94d1fd.scaleResolutionDownBy = 0x64 / _0x1ebd9f;
              }
              setEncodings(_0x2db4d9, _0x94d1fd, function (_0x421e0a) {
                log("scale set!");
                pokeIframeAPI('setVideoScale', _0x421e0a[0x0], _0x421e0a[0x1]);
                pokeIframeAPI("set-video-scale", _0x421e0a[0x0], _0x421e0a[0x1]);
                _0x16efc0.pcs[_0x421e0a[0x1]].stats.scaleFactor = parseInt(_0x421e0a[0x0]) + '%';
              }, [_0x1ebd9f, _0x3b1e73]);
              return;
            }
          }
        } catch (_0x2d08c8) {
          errorlog(_0x2d08c8);
        }
      };
      _0x16efc0.requestResolution = function (_0x12ba93, _0x43c6d8, _0x49c7f3, _0x4d4788 = false, _0x17e1e2 = false, _0x1c8589 = null) {
        if (!(_0x12ba93 in _0x16efc0.rpcs)) {
          return;
        }
        if (_0x1c8589 === null) {
          _0x1c8589 = _0x16efc0.cover || false;
        }
        var _0x16d7a8 = false;
        if (!(_0x16efc0.rpcs[_0x12ba93].scaleWidth == Math.floor(_0x43c6d8) || _0x16efc0.rpcs[_0x12ba93].scaleWidth === Math.ceil(_0x43c6d8))) {
          _0x43c6d8 = Math.round(_0x43c6d8);
          _0x16efc0.rpcs[_0x12ba93].scaleWidth = _0x43c6d8;
          _0x16d7a8 = true;
        }
        if (!(_0x16efc0.rpcs[_0x12ba93].scaleHeight == Math.floor(_0x49c7f3) || _0x16efc0.rpcs[_0x12ba93].scaleHeight === Math.ceil(_0x49c7f3))) {
          _0x49c7f3 = Math.round(_0x49c7f3);
          _0x16efc0.rpcs[_0x12ba93].scaleHeight = _0x49c7f3;
          _0x16d7a8 = true;
        }
        if (_0x16efc0.rpcs[_0x12ba93].scaleSnap != _0x4d4788) {
          _0x16efc0.rpcs[_0x12ba93].scaleSnap = _0x4d4788;
          _0x16d7a8 = true;
        }
        _0x43c6d8 = Math.round(_0x43c6d8);
        _0x49c7f3 = Math.round(_0x49c7f3);
        if (_0x16d7a8) {
          var _0x53920c = {
            "UUID": _0x12ba93,
            "requestResolution": {
              'w': _0x43c6d8,
              'h': _0x49c7f3,
              's': _0x4d4788,
              'c': _0x1c8589
            }
          };
          if (_0x17e1e2) {
            _0x53920c.requestAs = _0x17e1e2;
          }
          log(_0x43c6d8 + " " + _0x49c7f3);
          _0x16efc0.sendRequest(_0x53920c, _0x12ba93);
        }
        if (_0x4d4788) {
          _0x16efc0.rpcs[_0x12ba93].stats.Requested_resolution = "~ " + parseInt(_0x43c6d8) + " x " + parseInt(_0x49c7f3);
        } else {
          _0x16efc0.rpcs[_0x12ba93].stats.Requested_resolution = parseInt(_0x43c6d8) + " x " + parseInt(_0x49c7f3);
        }
      };
      _0x16efc0.calculateScale = function (_0x16bd7f, _0x1c006e = false, _0x3c5829 = false) {
        if (_0x3c5829) {} else if (_0x16efc0.pcs[_0x16bd7f].scale) {
          _0x3c5829 = _0x16efc0.pcs[_0x16bd7f].scale;
        } else {
          _0x3c5829 = 0x64;
        }
        if (_0x16efc0.pcs[_0x16bd7f].scaleResolution && _0x3c5829 > _0x16efc0.pcs[_0x16bd7f].scaleResolution) {
          _0x3c5829 = _0x16efc0.pcs[_0x16bd7f].scaleResolution;
        }
        if (_0x1c006e) {
          _0x3c5829 = _0x7bf50c(_0x16bd7f, _0x3c5829, _0x1c006e);
        } else if (_0x16efc0.pcs[_0x16bd7f].scaleDueToBitrate && _0x16efc0.pcs[_0x16bd7f].scaleDueToBitrate < _0x3c5829) {
          _0x3c5829 = _0x16efc0.pcs[_0x16bd7f].scaleDueToBitrate;
        }
        if (_0x16efc0.screenShareState && _0x16efc0.pcs[_0x16bd7f].scaleSnap) {
          if (_0x3c5829 > 0x55) {
            _0x3c5829 = 0x64;
          } else if (_0x3c5829 > 0x2a && _0x3c5829 < 0x32) {
            _0x3c5829 = 0x32;
          }
        }
        _0x3c5829 = _0x16efc0.pixelFix(_0x3c5829, _0x16bd7f);
        return _0x3c5829;
      };
      _0x16efc0.setResolution = function (_0xa0b2ac = false, _0x44bac1 = null, _0x2feb08 = null, _0x38ce59 = false, _0x833b35 = false) {
        if (_0xa0b2ac && !(_0xa0b2ac in _0x16efc0.pcs)) {
          return;
        } else {
          if (!_0xa0b2ac) {
            for (var _0x190080 in _0x16efc0.pcs) {
              _0x16efc0.setResolution(_0x190080, _0x16efc0.pcs[_0x190080].scaleWidth, _0x16efc0.pcs[_0x190080].scaleHeight, _0x16efc0.pcs[_0x190080].scaleSnap, _0x16efc0.pcs[_0x190080].cover);
            }
            return;
          }
        }
        _0x833b35 = _0x833b35 || false;
        snape = _0x38ce59 || false;
        if (_0x44bac1 === null && _0x2feb08 === null) {
          if (!_0x16efc0.pcs[_0xa0b2ac].scaleWidth && !_0x16efc0.pcs[_0xa0b2ac].scaleHeight) {
            return;
          } else {
            _0x44bac1 = _0x16efc0.pcs[_0xa0b2ac].scaleWidth || 0x64;
            _0x2feb08 = _0x16efc0.pcs[_0xa0b2ac].scaleHeight || 0x64;
          }
        } else {
          _0x16efc0.pcs[_0xa0b2ac].scaleWidth = _0x44bac1;
          _0x16efc0.pcs[_0xa0b2ac].scaleHeight = _0x2feb08;
          _0x16efc0.pcs[_0xa0b2ac].scaleSnap = _0x38ce59;
          _0x16efc0.pcs[_0xa0b2ac].cover = _0x833b35;
        }
        if (SafariVersion && SafariVersion <= 0xd && (iOS || iPad)) {
          return;
        }
        if ("RTCRtpSender" in window && "setParameters" in window.RTCRtpSender.prototype) {
          var _0x15c262 = getSenders2(_0xa0b2ac).find(function (_0x351124) {
            return _0x351124.track && _0x351124.track.kind == 'video';
          });
          if (!_0x15c262) {
            warnlog("can't change bitrate; no video sender found");
            return;
          }
          var _0x182df7 = {};
          if ("realUUID" in _0x16efc0.pcs[_0xa0b2ac]) {
            var _0x20ebe9 = _0x16efc0.screenStream.getVideoTracks();
            if (_0x20ebe9.length) {
              var _0x2692ee = _0x20ebe9[0x0].getSettings();
              var _0x4a044b = _0x2692ee.height;
              var _0x2d6335 = _0x2692ee.width;
            } else {
              return;
            }
          } else {
            if (_0x16efc0.videoElement && _0x16efc0.videoElement.srcObject) {
              var _0x20ebe9 = _0x16efc0.videoElement.srcObject.getVideoTracks();
              if (_0x20ebe9.length) {
                var _0x2692ee = _0x20ebe9[0x0].getSettings();
                var _0x4a044b = _0x2692ee.height;
                var _0x2d6335 = _0x2692ee.width;
              } else {
                return;
              }
            } else {
              return;
            }
          }
          if (_0x44bac1 == null) {
            _0x44bac1 = 0x0;
          }
          if (_0x2feb08 == null) {
            _0x2feb08 = 0x0;
          }
          var _0x11d2c3 = 0x64 * _0x44bac1 / _0x2d6335;
          var _0x160252 = 0x64 * _0x2feb08 / _0x4a044b;
          log(_0x11d2c3 + " x " + _0x160252);
          var _0x1f7fc6 = 0x64;
          if (_0x833b35) {
            if (_0x11d2c3 > _0x160252) {
              _0x1f7fc6 = _0x11d2c3;
            } else {
              _0x1f7fc6 = _0x160252;
            }
          } else if (_0x11d2c3 < _0x160252) {
            _0x1f7fc6 = _0x11d2c3;
          } else {
            _0x1f7fc6 = _0x160252;
          }
          if (_0x1f7fc6 > 0x64) {
            _0x1f7fc6 = 0x64;
          }
          log("resolution scale: " + _0x1f7fc6);
          _0x16efc0.pcs[_0xa0b2ac].scaleResolution = _0x1f7fc6;
          var _0x59e2b8 = _0x16efc0.calculateScale(_0xa0b2ac);
          if (_0x59e2b8 <= 0x0 || _0x59e2b8 == 0x64) {
            var _0xe281de = getChromeVersion();
            if (_0xe281de > 0x50) {
              _0x182df7.scaleResolutionDownBy = null;
            } else {
              _0x182df7.scaleResolutionDownBy = 0x1;
            }
          } else {
            _0x182df7.scaleResolutionDownBy = 0x64 / _0x59e2b8;
          }
          setEncodings(_0x15c262, _0x182df7, function (_0x593b45) {
            log("scale set!");
            pokeIframeAPI('setVideoScale', _0x593b45[0x0], _0x593b45[0x1]);
            pokeIframeAPI("set-video-scale", _0x593b45[0x0], _0x593b45[0x1]);
            _0x16efc0.pcs[_0x593b45[0x1]].stats.scaleFactor = parseInt(_0x593b45[0x0]) + '%';
          }, [_0x59e2b8, _0xa0b2ac]);
          return;
        }
      };
      _0x16efc0.forcePLI = function (_0x5ce834 = null, _0x44fad5 = null) {
        if (_0x44fad5) {
          _0x44fad5.stopPropagation();
        }
        if (_0x31a5e1) {
          _0x31a5e1.needKeyFrame = true;
          log("FORCING A CHUNKED KEY FRAME: " + _0x5ce834);
        }
        if (iOS || iPad) {
          log("iOS devices do not support dynamic bitrates correctly; skipping");
          return false;
        } else {
          if ("RTCRtpSender" in window && "setParameters" in window.RTCRtpSender.prototype) {
            log("FORCING A KEY FRAME: " + _0x5ce834);
            if (_0x5ce834 == null) {
              for (_0x5ce834 in _0x16efc0.pcs) {
                _0x16efc0.forcePLI(_0x5ce834);
              }
              return false;
            }
            if (!(_0x5ce834 in _0x16efc0.pcs)) {
              return false;
            }
            if (_0x16efc0.pcs[_0x5ce834].keyframeRate) {
              if (_0x16efc0.pcs[_0x5ce834].keyframeTimeout) {
                clearTimeout(_0x16efc0.pcs[_0x5ce834].keyframeTimeout);
                _0x16efc0.pcs[_0x5ce834].keyframeTimeout = null;
              }
              _0x16efc0.pcs[_0x5ce834].keyframeTimeout = setTimeout(function (_0x424111) {
                if (!_0x16efc0.pcs[_0x424111]) {
                  clearInterval(this);
                } else {
                  _0x16efc0.forcePLI(_0x424111);
                }
              }, parseInt(_0x16efc0.pcs[_0x5ce834].keyframeRate), _0x5ce834);
            }
            try {
              var _0x1d8b11 = getSenders2(_0x5ce834).find(function (_0x3a3007) {
                return _0x3a3007.track && _0x3a3007.track.kind == "video";
              });
              if (!_0x1d8b11) {
                warnlog("can't change bitrate; no video sender found");
                return false;
              }
              var _0x1dbe65 = {
                "scaleResolutionDownBy": 0xa
              };
              setEncodings(_0x1d8b11, _0x1dbe65, function (_0xe12be3) {
                log("scaleResolutionDownBy set 2a! " + _0xe12be3[0x0]);
                var _0x27d9f2 = _0x16efc0.calculateScale(_0xe12be3[0x0]);
                var _0x40703c = {};
                if (_0x27d9f2 <= 0x0 || _0x27d9f2 == 0x64) {
                  var _0x40a53e = getChromeVersion();
                  if (_0x40a53e > 0x50) {
                    _0x40703c.scaleResolutionDownBy = null;
                  } else {
                    _0x40703c.scaleResolutionDownBy = 0x1;
                  }
                } else {
                  _0x40703c.scaleResolutionDownBy = 0x64 / _0x27d9f2;
                }
                setEncodings(_0xe12be3[0x1], _0x40703c, function () {
                  log("scaleResolutionDownBy set 2b!");
                });
              }, [_0x5ce834, _0x1d8b11]);
              return true;
            } catch (_0x531423) {
              errorlog(_0x531423);
            }
          }
        }
        return false;
      };
      _0x16efc0.enhanceAudioEncoder = function (_0x1a1412) {
        log("enhacing audio encoder");
        var _0x87cb70 = getSenders2(_0x1a1412).find(function (_0x255fa8) {
          return _0x255fa8.track && _0x255fa8.track.kind == "audio";
        });
        if (!_0x87cb70) {
          log("no audio track to poke");
          return false;
        }
        var _0x3653a4 = {};
        try {
          _0x3653a4.networkPriority = "high";
          _0x3653a4.priority = "high";
          _0x3653a4.adaptivePtime = true;
          setEncodings(_0x87cb70, _0x3653a4, function (_0xd83d5e) {
            log("done clearing audio");
            pokeIframeAPI("prioritize-audio", true, _0xd83d5e);
          }, _0x1a1412);
        } catch (_0x4bb55a) {
          errorlog(_0x4bb55a);
        }
      };
      _0x16efc0.degradationPreference = function (_0x50541b, _0x4a8930 = "maintain-framerate") {
        var _0x49ad3a = getSenders2(_0x50541b).find(function (_0x4bf633) {
          return _0x4bf633.track && _0x4bf633.track.kind == "video";
        });
        if (!_0x49ad3a) {
          log("no video track to control");
          return false;
        }
        var _0x43511d = {};
        try {
          if (_0x4a8930 === true) {
            _0x43511d.degradationPreference = "maintain-framerate";
            log("done setting degrad to maintain-framerate");
          } else {
            _0x43511d.degradationPreference = _0x4a8930;
            log("done setting degrad to " + _0x4a8930);
          }
          setEncodings(_0x49ad3a, _0x43511d, function () {
            log("done setting degrad");
          }());
        } catch (_0x47bd64) {
          errorlog(_0x47bd64);
        }
      };
      _0x16efc0.limitMaxBandwidth = function (_0x59880c, _0x4b18e8, _0x317d52 = false) {
        log("session.limitMaxBandwidth running: " + _0x59880c + ", mc?: " + _0x317d52);
        if (_0x16efc0.maxBandwidth === false) {
          return;
        }
        _0x4b18e8.maxBandwidth = parseInt(_0x16efc0.maxBandwidth / 0x64 * _0x59880c);
        if (_0x317d52) {
          _0x16efc0.limitMeshcastBitrate(null);
        } else {
          _0x16efc0.limitBitrate(_0x4b18e8.UUID, null);
        }
      };
      _0x16efc0.limitAudioEncoder = function (_0x349251, _0x45bf07 = 0x7d00, _0x14ddba = 0x3e8) {
        log("encodering being kicked");
        var _0x452a27 = getSenders2(_0x349251).find(function (_0x18e547) {
          return _0x18e547.track && _0x18e547.track.kind == 'audio';
        });
        if (!_0x452a27) {
          log("no audio track to poke");
          return false;
        }
        var _0x367323 = {
          maxBitrate: _0x45bf07
        };
        setEncodings(_0x452a27, _0x367323, function (_0x937df0) {
          pokeIframeAPI('setAudioBitrate', _0x937df0[0x0], _0x937df0[0x1]);
          pokeIframeAPI("set-audio-bitrate", _0x937df0[0x0], _0x937df0[0x1]);
          if (_0x937df0[0x2] > 0x0) {
            setTimeout(function () {
              try {
                if (_0x937df0[0x1] in _0x16efc0.pcs) {
                  var _0x523726 = getSenders2(_0x937df0[0x1]).find(function (_0xccb648) {
                    return _0xccb648.track && _0xccb648.track.kind == 'audio';
                  });
                } else {
                  return false;
                }
                if (!_0x523726) {
                  log("no audio track to poke");
                  return false;
                }
                var _0x53ec81 = {
                  "maxBitrate": null
                };
                setEncodings(_0x523726, _0x53ec81, function () {
                  log("done clearing audio");
                });
              } catch (_0xae7ca5) {
                errorlog(_0xae7ca5);
              }
            }, _0x937df0[0x2], _0x937df0[0x1]);
          }
        }, [_0x45bf07, _0x349251, _0x14ddba]);
      };
      _0x16efc0.directMigrateIssue = function (_0x24ba11, _0x2537b6, _0x541634) {
        pokeIframeAPI('transfer', _0x24ba11, _0x541634);
        if (_0x16efc0.password) {
          return generateHash(_0x24ba11 + _0x16efc0.password + _0x16efc0.salt, 0x10).then(function (_0x29e578) {
            var _0x42de63 = {};
            if (_0x2537b6.updateurl) {
              _0x2537b6.roomenc = _0x29e578;
            }
            if (_0x16efc0.director && _0x16efc0.directorUUID) {
              _0x42de63.migrate = _0x541634;
              _0x42de63.roomid = _0x29e578;
              _0x42de63.transferSettings = _0x2537b6;
              _0x16efc0.sendRequest(_0x42de63, _0x16efc0.directorUUID);
              log(_0x42de63);
            } else {
              if (_0x2537b6.updateurl) {
                _0x42de63.request = "migrate";
                _0x42de63.transferSettings = _0x2537b6;
                log(_0x42de63);
                if (_0x16efc0.sendRequest(_0x42de63, _0x541634)) {
                  var _0x42de63 = {};
                  _0x42de63.request = "migrate";
                  _0x42de63.roomid = _0x29e578;
                  _0x42de63.target = _0x541634;
                  _0x16efc0.sendMsg(_0x42de63);
                }
                log(_0x42de63);
              } else {
                if ('broadcast' in _0x2537b6) {
                  _0x42de63.request = 'migrate';
                  _0x42de63.transferSettings = _0x2537b6;
                  delete _0x42de63.transferSettings.roomid;
                  delete _0x42de63.transferSettings.roomenc;
                  log(_0x42de63);
                  if (_0x16efc0.sendRequest(_0x42de63, _0x541634)) {
                    var _0x42de63 = {};
                    _0x42de63.request = 'migrate';
                    _0x42de63.roomid = _0x29e578;
                    _0x42de63.target = _0x541634;
                    _0x16efc0.sendMsg(_0x42de63);
                  }
                  log(_0x42de63);
                } else {
                  _0x42de63.request = 'migrate';
                  _0x42de63.roomid = _0x29e578;
                  _0x42de63.target = _0x541634;
                  _0x16efc0.sendMsg(_0x42de63);
                }
              }
            }
          })["catch"](errorlog);
        } else {
          if (_0x2537b6.updateurl) {
            _0x2537b6.roomenc = _0x24ba11;
          }
          var _0x2ac0c5 = {};
          if (_0x16efc0.director && _0x16efc0.directorUUID) {
            _0x2ac0c5.migrate = _0x541634;
            _0x2ac0c5.roomid = _0x24ba11;
            _0x2ac0c5.transferSettings = _0x2537b6;
            _0x16efc0.sendRequest(_0x2ac0c5, _0x16efc0.directorUUID);
            log(_0x2ac0c5);
          } else {
            if (_0x2537b6.updateurl) {
              _0x2ac0c5.request = "migrate";
              _0x2ac0c5.transferSettings = _0x2537b6;
              if (_0x16efc0.sendRequest(_0x2ac0c5, _0x541634)) {
                log(_0x2ac0c5);
                var _0x2ac0c5 = {};
                _0x2ac0c5.request = "migrate";
                _0x2ac0c5.roomid = _0x24ba11;
                _0x2ac0c5.target = _0x541634;
                _0x16efc0.sendMsg(_0x2ac0c5);
              }
            } else {
              if ('broadcast' in _0x2537b6) {
                _0x2ac0c5.request = "migrate";
                _0x2ac0c5.transferSettings = _0x2537b6;
                delete _0x2ac0c5.transferSettings.roomid;
                delete _0x2ac0c5.transferSettings.roomenc;
                if (_0x16efc0.sendRequest(_0x2ac0c5, _0x541634)) {
                  warnlog(_0x2ac0c5);
                  var _0x2ac0c5 = {};
                  _0x2ac0c5.request = "migrate";
                  _0x2ac0c5.roomid = rid;
                  _0x2ac0c5.target = _0x541634;
                  _0x16efc0.sendMsg(_0x2ac0c5);
                }
              } else {
                _0x2ac0c5.request = "migrate";
                _0x2ac0c5.roomid = _0x24ba11;
                _0x2ac0c5.target = _0x541634;
                _0x16efc0.sendMsg(_0x2ac0c5);
              }
            }
          }
        }
      };
      _0x16efc0.limitAudioBitrate = async function (_0x551ef5, _0x3b3b4a) {
        _0x3b3b4a = parseInt(_0x3b3b4a);
        try {
          var _0x52005c = getSenders2(_0x551ef5).find(function (_0x2f5424) {
            return _0x2f5424.track && _0x2f5424.track.kind == "audio";
          });
          if (!_0x52005c) {
            warnlog("can't change audio bitrate; no audio sender found");
            return;
          }
          var _0x4dbcdc = {};
          if (_0x3b3b4a < 0x0) {
            _0x4dbcdc.active = true;
            if (SafariVersion && SafariVersion <= 0xd && (iOS || iPad)) {
              _0x3b3b4a = 0x20;
              if (_0x16efc0.pcs[_0x551ef5].setAudioBitrate !== false) {
                _0x3b3b4a = _0x16efc0.pcs[_0x551ef5].setAudioBitrate;
              } else if (_0x16efc0.audiobitrate) {
                _0x3b3b4a = _0x16efc0.audiobitrate;
              }
              _0x4dbcdc.maxBitrate = _0x3b3b4a * 0x400;
            } else if (_0x16efc0.pcs[_0x551ef5].setAudioBitrate !== false) {
              _0x3b3b4a = _0x16efc0.pcs[_0x551ef5].setAudioBitrate;
              _0x4dbcdc.maxBitrate = _0x3b3b4a * 0x400;
            } else {
              _0x4dbcdc.maxBitrate = null;
            }
          } else if (_0x3b3b4a === 0x0) {
            _0x4dbcdc.active = false;
          } else {
            _0x4dbcdc.active = true;
            _0x4dbcdc.maxBitrate = _0x3b3b4a * 0x400;
          }
          if (_0x16efc0.pcs[_0x551ef5].audioMutedOverride) {
            _0x4dbcdc.active = false;
          }
          setEncodings(_0x52005c, _0x4dbcdc, function (_0x4ad07e) {
            pokeIframeAPI("setAudioBitrate", _0x4ad07e[0x0], _0x4ad07e[0x1]);
            pokeIframeAPI("set-audio-bitrate", _0x4ad07e[0x0], _0x4ad07e[0x1]);
            log("audio bandwidth set f!");
          }, [_0x3b3b4a, _0x551ef5]);
        } catch (_0x1c4316) {
          errorlog(_0x1c4316);
          log(_0x551ef5);
          log(_0x16efc0.pcs[_0x551ef5]);
        }
      };
      _0x16efc0.optimizeBitrate = function (_0x5604b0) {
        if (_0x16efc0.iframeSrc && _0x16efc0.pcs[_0x5604b0].allowIframe === true) {
          _0x16efc0.limitBitrate(_0x5604b0, 0x0);
          if (_0x16efc0.pcs[_0x5604b0].optimizedBitrate === 0x0) {
            if (_0x16efc0.pcs[_0x5604b0].obsState.visibility === false) {
              _0x16efc0.limitAudioBitrate(_0x5604b0, 0x0);
            } else {
              _0x16efc0.limitAudioBitrate(_0x5604b0, -0x1);
            }
          }
        } else {
          if (_0x16efc0.pcs[_0x5604b0] && _0x16efc0.pcs[_0x5604b0].optimizedBitrate !== false) {
            if (_0x16efc0.pcs[_0x5604b0].obsState.visibility === false) {
              var _0x1a0ddc = _0x16efc0.pcs[_0x5604b0].optimizedBitrate;
              if (_0x16efc0.pcs[_0x5604b0].savedBitrate && _0x16efc0.pcs[_0x5604b0].savedBitrate > 0x0) {
                if (_0x16efc0.pcs[_0x5604b0].savedBitrate < _0x16efc0.pcs[_0x5604b0].optimizedBitrate) {
                  _0x1a0ddc = _0x16efc0.pcs[_0x5604b0].savedBitrate;
                }
              }
              _0x16efc0.limitBitrate(_0x5604b0, _0x1a0ddc);
              if (_0x16efc0.pcs[_0x5604b0].optimizedBitrate === 0x0) {
                _0x16efc0.limitAudioBitrate(_0x5604b0, 0x0);
              }
            } else if (_0x16efc0.pcs[_0x5604b0].optimizedBitrate === 0x0) {
              _0x16efc0.limitAudioBitrate(_0x5604b0, -0x1);
              _0x16efc0.limitTotalBitrateGuests();
              if (_0x16efc0.maxvideobitrate) {
                _0x16efc0.limitBitrate(_0x5604b0, null);
              }
            }
          } else {
            _0x16efc0.limitTotalBitrateGuests();
            if (_0x16efc0.maxvideobitrate) {
              _0x16efc0.limitBitrate(_0x5604b0, null);
            }
          }
        }
      };
      _0x16efc0.limitTotalBitrateGuests = function (_0x8c2084 = 0x0, _0x875e99 = false) {
        if (!_0x16efc0.limitTotalBitrate) {
          return _0x8c2084;
        }
        if (!_0x16efc0.roomid || _0x16efc0.scene !== false) {
          log("Switching to limitTotalBitrateAll");
          _0x16efc0.limitTotalBitrateAll(_0x8c2084, _0x875e99);
          return _0x8c2084;
        }
        if ((iOS || iPad) && SafariVersion && SafariVersion <= 0xd) {
          return _0x8c2084;
        }
        var _0x5b11ce = _0x8c2084;
        if (_0x875e99 === false) {
          _0x5b11ce = 0x0;
        } else if (_0x5b11ce < 0x0) {
          _0x5b11ce = _0x16efc0.pcs[_0x875e99].setBitrate || _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x59c674].maxBandwidth || 0x9c4;
        }
        var _0x39ef92 = 0x0;
        for (var _0x59c674 in _0x16efc0.pcs) {
          if (_0x875e99 === _0x59c674) {
            continue;
          }
          if (!_0x16efc0.pcs[_0x59c674].guest) {
            continue;
          }
          try {
            var _0x455c10 = getSenders2(_0x59c674).find(function (_0x59172c) {
              return _0x59172c.track && _0x59172c.track.kind == "video";
            });
            if (!_0x455c10) {
              continue;
            }
            var _0x26000f = _0x455c10.getParameters();
            if (!_0x26000f.encodings || _0x26000f.encodings.length == 0x0) {
              if (_0x16efc0.pcs[_0x59c674].setBitrate < 0x0) {
                _0x5b11ce += _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x59c674].maxBandwidth || 0x9c4;
              } else {
                _0x5b11ce += _0x16efc0.pcs[_0x59c674].setBitrate || _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x59c674].maxBandwidth || 0x9c4;
              }
              warnlog(_0x5b11ce);
              _0x39ef92 += 0x1;
              continue;
            }
            if (_0x26000f.encodings[0x0].active == false) {
              continue;
            }
            if (_0x26000f.encodings[0x0].maxBitrate) {
              if ('preLimitedBitrate' in _0x16efc0.pcs[_0x59c674]) {
                _0x5b11ce += parseInt(_0x16efc0.pcs[_0x59c674].preLimitedBitrate);
              } else {
                _0x5b11ce += parseInt(_0x26000f.encodings[0x0].maxBitrate) / 0x400;
              }
            } else if (_0x16efc0.pcs[_0x59c674].setBitrate < 0x0) {
              _0x5b11ce += _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x59c674].maxBandwidth || 0x9c4;
            } else {
              _0x5b11ce += _0x16efc0.pcs[_0x59c674].setBitrate || _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x59c674].maxBandwidth || 0x9c4;
              warnlog(_0x5b11ce);
            }
            _0x39ef92 += 0x1;
          } catch (_0x1c1708) {
            errorlog(_0x1c1708);
          }
        }
        if (!_0x5b11ce) {
          return _0x5b11ce;
        }
        warnlog("totalBitrate: " + _0x5b11ce);
        var _0x301293 = parseFloat(_0x5b11ce / _0x16efc0.limitTotalBitrate);
        if (_0x301293 < 0x1) {
          _0x301293 = 0x1;
        }
        for (var _0x59c674 in _0x16efc0.pcs) {
          if (_0x875e99 === _0x59c674) {
            continue;
          }
          if (!_0x16efc0.pcs[_0x59c674].guest) {
            continue;
          }
          try {
            var _0x455c10 = getSenders2(_0x59c674).find(function (_0x6d6593) {
              return _0x6d6593.track && _0x6d6593.track.kind == 'video';
            });
            if (!_0x455c10) {
              continue;
            }
            var _0x26000f = _0x455c10.getParameters();
            if (!_0x26000f.encodings || _0x26000f.encodings.length == 0x0) {
              if (_0x16efc0.pcs[_0x59c674].setBitrate < 0x0) {
                var _0x5d2915 = _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x59c674].maxBandwidth || 0x9c4;
              } else {
                var _0x5d2915 = _0x16efc0.pcs[_0x59c674].setBitrate || _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x59c674].maxBandwidth || 0x9c4;
              }
              var _0x35d8fe = parseInt(_0x5d2915 / _0x301293);
              _0x16efc0.limitBitrate(_0x59c674, _0x35d8fe, true);
              continue;
            }
            if (_0x26000f.encodings[0x0].active == false) {
              continue;
            }
            if (_0x26000f.encodings[0x0].maxBitrate) {
              if ("preLimitedBitrate" in _0x16efc0.pcs[_0x59c674]) {
                var _0x5d2915 = parseInt(_0x16efc0.pcs[_0x59c674].preLimitedBitrate);
              } else {
                var _0x5d2915 = parseInt(parseInt(_0x26000f.encodings[0x0].maxBitrate) / 0x400);
              }
              var _0x35d8fe = parseInt(_0x5d2915 / _0x301293);
              _0x16efc0.limitBitrate(_0x59c674, _0x35d8fe, true);
            } else {
              if (_0x16efc0.pcs[_0x59c674].setBitrate < 0x0) {
                var _0x5d2915 = _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x59c674].maxBandwidth || 0x9c4;
              } else {
                var _0x5d2915 = _0x16efc0.pcs[_0x59c674].setBitrate || _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x59c674].maxBandwidth || 0x9c4;
              }
              var _0x35d8fe = parseInt(_0x5d2915 / _0x301293);
              _0x16efc0.limitBitrate(_0x59c674, _0x35d8fe, true);
            }
          } catch (_0x8e7b20) {
            errorlog(_0x8e7b20);
          }
        }
        return parseInt(_0x8c2084 / _0x301293);
      };
      _0x16efc0.limitTotalBitrateAll = function (_0x2ee2a4 = 0x0, _0x435436 = false) {
        if (!_0x16efc0.limitTotalBitrate) {
          return _0x2ee2a4;
        }
        if ((iOS || iPad) && SafariVersion && SafariVersion <= 0xd) {
          return _0x2ee2a4;
        }
        var _0x465410 = _0x2ee2a4;
        if (_0x435436 === false) {
          _0x465410 = 0x0;
        } else if (_0x465410 < 0x0) {
          _0x465410 = _0x16efc0.pcs[_0x435436].setBitrate || _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x39b800].maxBandwidth || 0x9c4;
        }
        var _0x2f41ca = 0x0;
        for (var _0x39b800 in _0x16efc0.pcs) {
          if (_0x435436 === _0x39b800) {
            continue;
          }
          try {
            var _0x3f7412 = getSenders2(_0x39b800).find(function (_0xd4e5bb) {
              return _0xd4e5bb.track && _0xd4e5bb.track.kind == "video";
            });
            if (!_0x3f7412) {
              continue;
            }
            var _0xc581cf = _0x3f7412.getParameters();
            if (!_0xc581cf.encodings || _0xc581cf.encodings.length == 0x0) {
              if (_0x16efc0.pcs[_0x39b800].setBitrate < 0x0) {
                _0x465410 += _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x39b800].maxBandwidth || 0x9c4;
              } else {
                _0x465410 += _0x16efc0.pcs[_0x39b800].setBitrate || _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x39b800].maxBandwidth || 0x9c4;
              }
              warnlog(_0x465410);
              _0x2f41ca += 0x1;
              continue;
            }
            if (_0xc581cf.encodings[0x0].active == false) {
              continue;
            }
            if (_0xc581cf.encodings[0x0].maxBitrate) {
              if ('preLimitedBitrate' in _0x16efc0.pcs[_0x39b800]) {
                _0x465410 += parseInt(_0x16efc0.pcs[_0x39b800].preLimitedBitrate);
              } else {
                _0x465410 += parseInt(_0xc581cf.encodings[0x0].maxBitrate) / 0x400;
              }
            } else if (_0x16efc0.pcs[_0x39b800].setBitrate < 0x0) {
              _0x465410 += _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x39b800].maxBandwidth || 0x9c4;
            } else {
              _0x465410 += _0x16efc0.pcs[_0x39b800].setBitrate || _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x39b800].maxBandwidth || 0x9c4;
              warnlog(_0x465410);
            }
            _0x2f41ca += 0x1;
          } catch (_0x67e071) {
            errorlog(_0x67e071);
          }
        }
        if (!_0x465410) {
          return _0x465410;
        }
        warnlog("totalBitrate: " + _0x465410);
        var _0x46f52c = parseFloat(_0x465410 / _0x16efc0.limitTotalBitrate);
        if (_0x46f52c < 0x1) {
          _0x46f52c = 0x1;
        }
        for (var _0x39b800 in _0x16efc0.pcs) {
          if (_0x435436 === _0x39b800) {
            continue;
          }
          try {
            var _0x3f7412 = getSenders2(_0x39b800).find(function (_0x582eba) {
              return _0x582eba.track && _0x582eba.track.kind == "video";
            });
            if (!_0x3f7412) {
              continue;
            }
            var _0xc581cf = _0x3f7412.getParameters();
            if (!_0xc581cf.encodings || _0xc581cf.encodings.length == 0x0) {
              if (_0x16efc0.pcs[_0x39b800].setBitrate < 0x0) {
                var _0x5a4b4a = _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x39b800].maxBandwidth || 0x9c4;
              } else {
                var _0x5a4b4a = _0x16efc0.pcs[_0x39b800].setBitrate || _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x39b800].maxBandwidth || 0x9c4;
              }
              var _0x3c9a8e = parseInt(_0x5a4b4a / _0x46f52c);
              _0x16efc0.limitBitrate(_0x39b800, _0x3c9a8e, true);
              continue;
            }
            if (_0xc581cf.encodings[0x0].active == false) {
              continue;
            }
            if (_0xc581cf.encodings[0x0].maxBitrate) {
              if ('preLimitedBitrate' in _0x16efc0.pcs[_0x39b800]) {
                var _0x5a4b4a = parseInt(_0x16efc0.pcs[_0x39b800].preLimitedBitrate);
              } else {
                var _0x5a4b4a = parseInt(parseInt(_0xc581cf.encodings[0x0].maxBitrate) / 0x400);
              }
              var _0x3c9a8e = parseInt(_0x5a4b4a / _0x46f52c);
              _0x16efc0.limitBitrate(_0x39b800, _0x3c9a8e, true);
            } else {
              if (_0x16efc0.pcs[_0x39b800].setBitrate < 0x0) {
                var _0x5a4b4a = _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x39b800].maxBandwidth || 0x9c4;
              } else {
                var _0x5a4b4a = _0x16efc0.pcs[_0x39b800].setBitrate || _0x16efc0.outboundVideoBitrate || _0x16efc0.pcs[_0x39b800].maxBandwidth || 0x9c4;
              }
              var _0x3c9a8e = parseInt(_0x5a4b4a / _0x46f52c);
              _0x16efc0.limitBitrate(_0x39b800, _0x3c9a8e, true);
            }
          } catch (_0x4d910a) {
            errorlog(_0x4d910a);
          }
        }
        return parseInt(_0x2ee2a4 / _0x46f52c);
      };
      _0x16efc0.announceCoDirector = function (_0x323250, _0x51d02e = false) {
        var _0x4d5232 = {
          "directorSettings": {}
        };
        _0x4d5232.directorSettings.addCoDirector = [_0x323250];
        _0x16efc0.sendPeers(_0x4d5232, _0x51d02e);
      };
      _0x16efc0.limitMeshcastBitrate = function (_0xb150f3 = null) {
        if (!_0x16efc0.mc) {
          return;
        }
        if (_0x16efc0.mc.bitrateTimeout) {
          clearInterval(_0x16efc0.mc.bitrateTimeout);
          _0x16efc0.mc.bitrateTimeout = null;
        }
        if (_0xb150f3 === null) {
          if (_0x16efc0.mc.savedBitrate === false) {
            return;
          }
          _0xb150f3 = _0x16efc0.mc.savedBitrate;
        }
        _0xb150f3 = parseInt(_0xb150f3);
        if (_0x16efc0.mc.setBitrate && _0xb150f3 > _0x16efc0.mc.setBitrate) {
          _0xb150f3 = _0x16efc0.mc.setBitrate;
        } else if (_0x16efc0.mc.setBitrate === false) {
          if (_0xb150f3 < 0x0) {
            if (_0x16efc0.outboundVideoBitrate) {
              _0xb150f3 = _0x16efc0.outboundVideoBitrate;
            } else {
              _0xb150f3 = 0x9c4;
            }
          }
        }
        if (_0x16efc0.maxvideobitrate) {
          if (_0xb150f3 > _0x16efc0.maxvideobitrate) {
            _0xb150f3 = _0x16efc0.maxvideobitrate;
          }
        }
        _0x16efc0.mc.savedBitrate = _0xb150f3;
        if (_0x16efc0.mc.optimizedBitrate !== false) {
          if (_0x16efc0.mc.obsState.visibility === false) {
            if (_0xb150f3 > _0x16efc0.mc.optimizedBitrate) {
              _0x16efc0.mc.savedBitrate = _0xb150f3;
              _0xb150f3 = parseInt(_0x16efc0.mc.optimizedBitrate) || 0x0;
            }
          }
        }
        if (_0x16efc0.mc.maxBandwidth !== null) {
          if (_0x16efc0.mc.maxBandwidth < _0xb150f3) {
            _0xb150f3 = _0x16efc0.mc.maxBandwidth;
            _0x16efc0.mc.stats.max_bandwidth_capped_kbps = _0xb150f3;
            warnlog("Max bandwidth being capped: " + _0xb150f3 + '-kbps');
          } else if (_0x16efc0.mc.stats) {
            _0x16efc0.mc.stats.max_bandwidth_capped_kbps = false;
          }
        } else if ("max_bandwidth_capped_kbps" in _0x16efc0.mc.stats) {
          _0x16efc0.mc.stats.max_bandwidth_capped_kbps = false;
        }
        if (_0xb150f3 === 0x0) {
          var _0x47bec6 = Date.now() - _0x16efc0.mc.startTime;
          if (_0x47bec6 < _0x16efc0.rampUpTime) {
            _0xb150f3 = _0x16efc0.preloadbitrate;
            log("starting some preload bitrate " + (Date.now() - _0x16efc0.mc.startTime));
            _0x16efc0.mc.bitrateTimeout = setTimeout(function () {
              try {
                warnlog("stopping some preload bitrate " + (Date.now() - _0x16efc0.mc.startTime));
                _0x16efc0.limitMeshcastBitrate(null);
              } catch (_0xfa51d3) {}
              ;
            }, _0x16efc0.rampUpTime - _0x47bec6 + 0x5);
          }
        }
        try {
          if ((iOS || iPad) && SafariVersion && SafariVersion <= 0xd) {
            log("iOS devices do not support dynamic bitrates correctly; skipping");
            var _0x576800 = _0x16efc0.mc.getSenders().find(function (_0x387889) {
              return _0x387889.track && _0x387889.track.kind == "video";
            });
            if (!_0x576800) {
              warnlog("can't change bitrate; no video sender found");
              return;
            }
            var _0x144f0e = {};
            if (_0xb150f3 < 0x0) {
              _0x144f0e.active = true;
              _0xb150f3 = 0x9c4;
              if (_0x16efc0.bitrate) {
                _0xb150f3 = _0x16efc0.bitrate;
              }
              if (_0x16efc0.maxvideobitrate) {
                if (_0xb150f3 > _0x16efc0.maxvideobitrate) {
                  _0xb150f3 = _0x16efc0.maxvideobitrate;
                }
              }
              _0x144f0e.maxBitrate = _0xb150f3 * 0x400;
            } else if (_0xb150f3 === 0x0) {
              _0x144f0e.active = false;
            } else {
              _0x144f0e.active = true;
              _0x144f0e.maxBitrate = _0xb150f3 * 0x400;
            }
            setEncodings(_0x576800, _0x144f0e, function (_0x23380d) {
              pokeIframeAPI("set-meshcast-video-bitrate", _0x23380d);
              log("bandwidth set g! " + _0x23380d);
            }, _0xb150f3);
            return;
          } else {
            if ("RTCRtpSender" in window && "setParameters" in window.RTCRtpSender.prototype) {
              var _0x576800 = _0x16efc0.mc.getSenders().find(function (_0x557bd1) {
                return _0x557bd1.track && _0x557bd1.track.kind == "video";
              });
              if (!_0x576800) {
                warnlog("can't change bitrate; no video sender found");
                return;
              }
              var _0x144f0e = {};
              if (_0xb150f3 < 0x0) {
                if (_0x144f0e.active == false) {
                  _0x144f0e.active = true;
                }
                _0x144f0e.maxBitrate = null;
              } else if (_0xb150f3 === 0x0) {
                _0x144f0e.active = false;
                if (Firefox) {
                  _0x144f0e.maxBitrate = 0x1;
                }
              } else {
                _0x144f0e.active = true;
                _0x144f0e.maxBitrate = _0xb150f3 * 0x400;
              }
              if (iPad || iOS || Firefox) {
                if (_0x16efc0.mc.bitrateTimeoutFirefox) {
                  clearInterval(_0x16efc0.mc.bitrateTimeoutFirefox);
                  _0x16efc0.mc.bitrateTimeoutFirefox = setTimeout(function () {
                    log("bitrate timeout; ios/firefox specific: " + _0xb150f3);
                    _0x16efc0.mc.bitrateTimeoutFirefox = false;
                    _0x16efc0.limitMeshcastBitrate(null);
                  }, 0x1f4);
                } else {
                  _0x16efc0.mc.bitrateTimeoutFirefox = setTimeout(function () {
                    _0x16efc0.mc.bitrateTimeoutFirefox = false;
                  }, 0x1f4);
                  setEncodings(_0x576800, _0x144f0e, function (_0x4faa3b) {
                    log("bandwidth set h! " + _0x4faa3b);
                    pokeIframeAPI("set-meshcast-video-bitrate", _0x4faa3b);
                  }, _0xb150f3);
                }
              } else {
                setEncodings(_0x576800, _0x144f0e, function (_0x55a076) {
                  log("bandwidth set i! " + _0x55a076);
                  pokeIframeAPI('set-meshcast-video-bitrate', _0x55a076);
                }, _0xb150f3);
              }
              return;
            } else {
              warnlog("BROWER DID NOT SUPPORT LIMIT BITRATE");
            }
          }
        } catch (_0x311d1b) {
          errorlog(_0x311d1b);
        }
      };
      _0x16efc0.targetBitrate = function (_0x14ca1d, _0x4233c4) {
        if (_0x4233c4 === false) {
          _0x16efc0.pcs[_0x14ca1d].setBitrate = false;
          _0x16efc0.limitBitrate(_0x14ca1d, -0x1);
        } else {
          _0x4233c4 = parseInt(_0x4233c4) || -0x1;
          if (_0x4233c4 >= 0x0) {
            _0x16efc0.pcs[_0x14ca1d].setBitrate = _0x4233c4;
            _0x16efc0.limitBitrate(_0x14ca1d, _0x4233c4);
          }
        }
      };
      _0x16efc0.targetAudioBitrate = function (_0x952522, _0x137385) {
        if (_0x137385 === false) {
          _0x16efc0.pcs[_0x952522].setAudioBitrate = false;
          _0x16efc0.limitAudioBitrate(_0x952522, -0x1);
        } else {
          _0x137385 = parseInt(_0x137385) || -0x1;
          if (_0x137385 >= 0x0) {
            _0x16efc0.pcs[_0x952522].setAudioBitrate = _0x137385;
            _0x16efc0.limitAudioBitrate(_0x952522, _0x137385);
          }
        }
      };
      _0x16efc0.limitBitrate = function (_0xfe4be7, _0x22dbd3 = null, _0xb7f46 = false) {
        log("Bitrate request: " + _0x22dbd3);
        if (!(_0xfe4be7 in _0x16efc0.pcs)) {
          return;
        }
        if (_0x16efc0.pcs[_0xfe4be7].bitrateTimeout) {
          clearInterval(_0x16efc0.pcs[_0xfe4be7].bitrateTimeout);
          _0x16efc0.pcs[_0xfe4be7].bitrateTimeout = null;
        }
        var _0x272a15 = true;
        if (_0x22dbd3 === null) {
          if (_0x16efc0.pcs[_0xfe4be7].savedBitrate === false) {
            if (_0x16efc0.pcs[_0xfe4be7].maxBandwidth === null) {
              return;
            } else {
              _0x22dbd3 = _0x16efc0.pcs[_0xfe4be7].maxBandwidth;
              _0x272a15 = false;
            }
          } else {
            _0x22dbd3 = _0x16efc0.pcs[_0xfe4be7].savedBitrate;
          }
        }
        _0x22dbd3 = parseInt(_0x22dbd3);
        if (_0x16efc0.pcs[_0xfe4be7].setBitrate && _0x22dbd3 > _0x16efc0.pcs[_0xfe4be7].setBitrate) {
          _0x22dbd3 = _0x16efc0.pcs[_0xfe4be7].setBitrate;
        } else if (_0x22dbd3 < 0x0) {
          _0x22dbd3 = _0x16efc0.pcs[_0xfe4be7].setBitrate || _0x16efc0.outboundVideoBitrate || 0x9c4;
        }
        if (_0x16efc0.maxvideobitrate) {
          if (_0x22dbd3 > _0x16efc0.maxvideobitrate) {
            _0x22dbd3 = _0x16efc0.maxvideobitrate;
          }
        }
        if (_0x272a15 && !_0xb7f46) {
          log("save bandwidth: " + _0x22dbd3);
          _0x16efc0.pcs[_0xfe4be7].savedBitrate = _0x22dbd3;
        }
        if (_0x16efc0.pcs[_0xfe4be7].optimizedBitrate !== false) {
          if (_0x16efc0.pcs[_0xfe4be7].obsState.visibility === false) {
            if (_0x22dbd3 > _0x16efc0.pcs[_0xfe4be7].optimizedBitrate) {
              if (_0x272a15) {
                _0x16efc0.pcs[_0xfe4be7].savedBitrate = _0x22dbd3;
              }
              _0x22dbd3 = parseInt(_0x16efc0.pcs[_0xfe4be7].optimizedBitrate) || 0x0;
            }
          }
        }
        if (_0x16efc0.pcs[_0xfe4be7].maxBandwidth !== null) {
          if (_0x16efc0.pcs[_0xfe4be7].maxBandwidth < _0x22dbd3) {
            _0x22dbd3 = _0x16efc0.pcs[_0xfe4be7].maxBandwidth;
            _0x16efc0.pcs[_0xfe4be7].stats.max_bandwidth_capped_kbps = _0x22dbd3;
            warnlog("Max bandwidth being capped: " + _0x22dbd3 + '-kbps');
          } else if (_0x16efc0.pcs[_0xfe4be7].maxBandwidth === _0x22dbd3 && !_0x272a15) {
            _0x16efc0.pcs[_0xfe4be7].stats.max_bandwidth_capped_kbps = _0x22dbd3;
            warnlog("Max bandwidth controlling bitrate: " + _0x22dbd3 + "-kbps");
          } else {
            warnlog("Max bandwidth NOT being capped: " + _0x22dbd3 + "-kbps");
            _0x16efc0.pcs[_0xfe4be7].stats.max_bandwidth_capped_kbps = false;
          }
        } else if ("max_bandwidth_capped_kbps" in _0x16efc0.pcs[_0xfe4be7].stats) {
          _0x16efc0.pcs[_0xfe4be7].stats.max_bandwidth_capped_kbps = false;
        }
        if (_0xb7f46 === false) {
          if (_0x16efc0.limitTotalBitrate) {
            _0x16efc0.pcs[_0xfe4be7].preLimitedBitrate = _0x22dbd3;
            _0x22dbd3 = _0x16efc0.limitTotalBitrateGuests(_0x22dbd3, _0xfe4be7);
          }
        }
        if (_0x22dbd3 === 0x0) {
          var _0x7f1fca = Date.now() - _0x16efc0.pcs[_0xfe4be7].startTime;
          if (_0x7f1fca < _0x16efc0.rampUpTime) {
            _0x22dbd3 = _0x16efc0.preloadbitrate;
            log("starting some preload bitrate " + (Date.now() - _0x16efc0.pcs[_0xfe4be7].startTime));
            _0x16efc0.pcs[_0xfe4be7].bitrateTimeout = setTimeout(function (_0x94e54a) {
              try {
                warnlog("stopping some preload bitrate " + (Date.now() - _0x16efc0.pcs[_0x94e54a].startTime));
                _0x16efc0.limitBitrate(_0x94e54a, null);
              } catch (_0x3826f6) {}
              ;
            }, _0x16efc0.rampUpTime - _0x7f1fca + 0x5, _0xfe4be7);
          }
        }
        try {
          if ((iOS || iPad) && SafariVersion && SafariVersion <= 0xd) {
            log("iOS devices do not support dynamic bitrates correctly; skipping");
            if (_0x16efc0.pcs[_0xfe4be7].guest == true && _0x16efc0.pcs[_0xfe4be7].forceios == false) {
              return;
            }
            var _0x5955a0 = getSenders2(_0xfe4be7).find(function (_0x1a3865) {
              return _0x1a3865.track && _0x1a3865.track.kind == "video";
            });
            if (!_0x5955a0) {
              warnlog("can't change bitrate; no video sender found");
              return;
            }
            var _0x2ea2a8 = {};
            if (_0x22dbd3 === 0x0) {
              _0x2ea2a8.active = false;
            } else {
              _0x2ea2a8.active = true;
              _0x2ea2a8.maxBitrate = _0x22dbd3 * 0x400;
            }
            setEncodings(_0x5955a0, _0x2ea2a8, function (_0x32ba63) {
              pokeIframeAPI("setVideoBitrate", _0x32ba63[0x0], _0x32ba63[0x1]);
              pokeIframeAPI("set-video-bitrate", _0x32ba63[0x0], _0x32ba63[0x1]);
              log("bandwidth set a! " + _0x32ba63[0x0]);
            }, [_0x22dbd3, _0xfe4be7]);
            return;
          } else {
            if ("RTCRtpSender" in window && "setParameters" in window.RTCRtpSender.prototype) {
              var _0x5955a0 = getSenders2(_0xfe4be7).find(function (_0x1a47c9) {
                return _0x1a47c9.track && _0x1a47c9.track.kind == 'video';
              });
              if (!_0x5955a0) {
                warnlog("can't change bitrate; no video sender found");
                return;
              }
              var _0x2ea2a8 = {};
              if (_0x22dbd3 === 0x0) {
                _0x2ea2a8.active = false;
                if (Firefox) {
                  _0x2ea2a8.maxBitrate = 0x1;
                  _0x2ea2a8.scaleResolutionDownBy = 0x3e8;
                }
              } else {
                _0x2ea2a8.active = true;
                _0x2ea2a8.maxBitrate = _0x22dbd3 * 0x400;
              }
              if (_0x22dbd3 !== 0x0) {
                var _0x1bc91d = _0x16efc0.calculateScale(_0xfe4be7, _0x22dbd3);
                if (_0x1bc91d <= 0x0 || _0x1bc91d == 0x64) {
                  var _0x1b714b = getChromeVersion();
                  if (_0x1b714b > 0x50) {
                    _0x2ea2a8.scaleResolutionDownBy = null;
                  } else {
                    _0x2ea2a8.scaleResolutionDownBy = 0x1;
                  }
                } else {
                  _0x2ea2a8.scaleResolutionDownBy = 0x64 / _0x1bc91d;
                }
                if (iPad || iOS || Firefox) {
                  if (_0x16efc0.pcs[_0xfe4be7].bitrateTimeoutFirefox) {
                    clearInterval(_0x16efc0.pcs[_0xfe4be7].bitrateTimeoutFirefox);
                    _0x16efc0.pcs[_0xfe4be7].bitrateTimeoutFirefox = setTimeout(function (_0x40b6b1, _0x5632e5) {
                      log("bitrate timeout; ios/firefox specific: " + _0x22dbd3);
                      _0x16efc0.pcs[_0x40b6b1].bitrateTimeoutFirefox = false;
                      _0x16efc0.limitBitrate(_0x40b6b1, null, _0x5632e5);
                    }, 0x1f4, _0xfe4be7, _0xb7f46);
                  } else {
                    _0x16efc0.pcs[_0xfe4be7].bitrateTimeoutFirefox = setTimeout(function (_0x379c40) {
                      _0x16efc0.pcs[_0x379c40].bitrateTimeoutFirefox = false;
                    }, 0x1f4, _0xfe4be7);
                    setEncodings(_0x5955a0, _0x2ea2a8, function (_0x985fc1) {
                      log("bandwidth set b! " + _0x985fc1[0x0]);
                      _0x16efc0.pcs[_0x985fc1[0x1]].stats.scaleFactor = parseInt(_0x985fc1[0x2]) + '%';
                      pokeIframeAPI("setVideoBitrate", _0x985fc1[0x0], _0x985fc1[0x1]);
                      pokeIframeAPI("setVideoScale", _0x985fc1[0x2], _0x985fc1[0x1]);
                      pokeIframeAPI("set-video-bitrate", _0x985fc1[0x0], _0x985fc1[0x1]);
                      pokeIframeAPI('set-video-scale', _0x985fc1[0x2], _0x985fc1[0x1]);
                    }, [_0x22dbd3, _0xfe4be7, _0x1bc91d]);
                  }
                } else {
                  setEncodings(_0x5955a0, _0x2ea2a8, function (_0x46cbe5) {
                    log("bandwidth set c! " + _0x46cbe5[0x0]);
                    _0x16efc0.pcs[_0x46cbe5[0x1]].stats.scaleFactor = parseInt(_0x46cbe5[0x2]) + '%';
                    pokeIframeAPI('setVideoBitrate', _0x46cbe5[0x0], _0x46cbe5[0x1]);
                    pokeIframeAPI("setVideoScale", _0x46cbe5[0x2], _0x46cbe5[0x1]);
                    pokeIframeAPI('set-video-bitrate', _0x46cbe5[0x0], _0x46cbe5[0x1]);
                    pokeIframeAPI("set-video-scale", _0x46cbe5[0x2], _0x46cbe5[0x1]);
                  }, [_0x22dbd3, _0xfe4be7, _0x1bc91d]);
                }
              } else if (iPad || iOS || Firefox) {
                if (_0x16efc0.pcs[_0xfe4be7].bitrateTimeoutFirefox) {
                  clearInterval(_0x16efc0.pcs[_0xfe4be7].bitrateTimeoutFirefox);
                  _0x16efc0.pcs[_0xfe4be7].bitrateTimeoutFirefox = setTimeout(function (_0x200fbb, _0x4b0f60) {
                    log("bitrate timeout; ios/firefox specific: " + _0x22dbd3);
                    _0x16efc0.pcs[_0x200fbb].bitrateTimeoutFirefox = false;
                    _0x16efc0.limitBitrate(_0x200fbb, null, _0x4b0f60);
                  }, 0x1f4, _0xfe4be7, _0xb7f46);
                } else {
                  _0x16efc0.pcs[_0xfe4be7].bitrateTimeoutFirefox = setTimeout(function (_0x5d3119) {
                    _0x16efc0.pcs[_0x5d3119].bitrateTimeoutFirefox = false;
                  }, 0x1f4, _0xfe4be7);
                  setEncodings(_0x5955a0, _0x2ea2a8, function (_0x392536) {
                    log("bandwidth set d! " + _0x392536[0x0]);
                    pokeIframeAPI("setVideoBitrate", _0x392536[0x0], _0x392536[0x1]);
                    pokeIframeAPI("set-video-bitrate", _0x392536[0x0], _0x392536[0x1]);
                  }, [_0x22dbd3, _0xfe4be7]);
                }
              } else {
                setEncodings(_0x5955a0, _0x2ea2a8, function (_0x3d000e) {
                  log("bandwidth set e! " + _0x3d000e[0x0]);
                  pokeIframeAPI("setVideoBitrate", _0x3d000e[0x0], _0x3d000e[0x1]);
                  pokeIframeAPI("set-video-bitrate", _0x3d000e[0x0], _0x3d000e[0x1]);
                }, [_0x22dbd3, _0xfe4be7]);
              }
            } else {
              warnlog("BROWER DID NOT SUPPORT LIMIT BITRATE");
            }
          }
        } catch (_0x1296db) {
          errorlog(_0x1296db);
        }
      };
      function _0x7bf50c(_0x345b4a, _0xebcd2, _0xb3bd8) {
        if (_0x16efc0.noScaling) {
          return _0xebcd2;
        }
        warnlog("getOptimizedScale: " + _0xebcd2 + " : " + _0xb3bd8);
        if (_0xb3bd8 < 0x0) {
          _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 0x64;
        } else {
          if (_0xb3bd8 >= 0x259) {
            _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 0x64;
          } else {
            if ("realUUID" in _0x16efc0.pcs[_0x345b4a]) {
              _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 0x64;
            } else {
              if (_0x16efc0.screenShareState) {
                _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 0x64;
              } else {
                var _0x4f5e03 = getNativeOutputResolution();
                if (_0x4f5e03) {
                  try {
                    _0x4f5e03 = _0x4f5e03.width * _0x4f5e03.height;
                    _0x4f5e03 = Math.pow(_0x4f5e03, 0.5);
                  } catch (_0x40e653) {
                    _0x4f5e03 = false;
                  }
                }
                warnlog("dimension: " + _0x4f5e03);
                if (_0xb3bd8 >= 0x15e) {
                  if (_0x4f5e03 && _0x4f5e03 <= 0x1e0) {
                    _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 0x64;
                  } else {
                    if (_0x16efc0.mobile) {
                      if (_0x4f5e03 && _0x4f5e03 >= 0x5a0) {
                        _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 33.333333333333336;
                      } else if (_0x16efc0.flagship) {
                        if (_0x4f5e03 && _0x4f5e03 >= 0x3c0) {
                          _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 50;
                        } else {
                          _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 0x64;
                        }
                      } else {
                        _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 50;
                      }
                    } else {
                      if (_0x4f5e03 && _0x4f5e03 >= 0x5a0) {
                        _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 40;
                      } else if (_0x4f5e03 && _0x4f5e03 >= 0x3c0) {
                        _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 50;
                      } else {
                        _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 0x64;
                      }
                    }
                  }
                } else {
                  if (_0xb3bd8 >= 0xc9) {
                    if (_0x4f5e03 && _0x4f5e03 < 0x1e0) {
                      _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 0x64;
                    } else {
                      if (_0x16efc0.mobile) {
                        if (_0x4f5e03 && _0x4f5e03 >= 0x5a0) {
                          _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 25;
                        } else if (_0x16efc0.flagship) {
                          _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 50;
                        } else {
                          _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 40;
                        }
                      } else if (_0x4f5e03 && _0x4f5e03 >= 0x5a0) {
                        _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 33.333333333333336;
                      } else {
                        _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 50;
                      }
                    }
                  } else {
                    if (_0x4f5e03 && _0x4f5e03 <= 0xf0) {
                      _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 0x64;
                    } else {
                      if (_0xb3bd8 >= 0x51) {
                        if (_0x16efc0.mobile) {
                          if (_0x4f5e03 && _0x4f5e03 >= 0x5a0) {
                            _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 16.666666666666668;
                          } else if (_0x16efc0.flagship) {
                            _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 33.333333333333336;
                          } else {
                            _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 25;
                          }
                        } else if (_0x4f5e03 && _0x4f5e03 >= 0x5a0) {
                          _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 25;
                        } else {
                          _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 33.333333333333336;
                        }
                      } else {
                        if (_0x16efc0.mobile) {
                          if (_0x4f5e03 && _0x4f5e03 >= 0x3c0) {
                            _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 16.666666666666668;
                          } else if (_0x16efc0.flagship) {
                            _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 25;
                          } else {
                            _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 20;
                          }
                        } else if (_0x4f5e03 && _0x4f5e03 >= 0x5a0) {
                          _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 20;
                        } else {
                          _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate = 25;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (_0x16efc0.pcs[_0x345b4a].scaleDueToBitrate < _0xebcd2) {
          _0xebcd2 = _0x16efc0.pcs[_0x345b4a].scaleDueToBitrate;
        }
        return _0xebcd2;
      }
      function _0x168326(_0x2a936a, _0x4c5a26 = 0x2710) {
        _0x4c5a26 = parseInt(_0x4c5a26);
        if (_0x16efc0.audiobitrate) {
          _0x4c5a26 += _0x16efc0.audiobitrate;
        } else {
          if (_0x16efc0.director && _0x16efc0.stereo == 0x5) {
            _0x4c5a26 += 0x20;
          } else if (_0x16efc0.stereo && _0x16efc0.stereo != 0x3) {
            _0x4c5a26 += 0x100;
          } else {
            _0x4c5a26 += 0x20;
          }
        }
        log("actual bitrate:" + _0x4c5a26);
        if (_0x4c5a26 < 0x1) {
          _0x4c5a26 = 0x1;
        }
        _0x2a936a = CodecsHandler.setVideoBitrates(_0x2a936a, {
          'min': parseInt(_0x4c5a26 / 0xa) || 0x1,
          'max': _0x4c5a26 || 0x1
        }, _0x16efc0.codec);
        return _0x2a936a;
      }
      _0x16efc0.signData = function (_0x551e40, _0x2d0fdc) {
        log(_0x551e40);
        if (_0x16efc0.mykey === {}) {
          log("Generate Some Crypto keys first");
        }
        window.crypto.subtle.sign({
          'name': "RSASSA-PKCS1-v1_5"
        }, _0x16efc0.mykey.privateKey, _0x16efc0.enc.encode(_0x551e40)).then(function (_0x379342) {
          _0x379342 = new Uint8Array(_0x379342);
          _0x379342 = _0x379342.reduce((_0x52dd6e, _0xb6c20b) => _0x52dd6e + _0xb6c20b.toString(0x10).padStart(0x2, '0'), '');
          _0x2d0fdc(_0x551e40, _0x379342);
          log(JSON.stringify(_0x379342));
        })["catch"](errorlog);
      };
      _0x16efc0.verifyData = function (_0x454594, _0x3717a3) {
        _0x454594.signature = new Uint8Array(_0x454594.signature.match(/.{1,2}/g).map(_0x18a0c3 => parseInt(_0x18a0c3, 0x10)));
        if (_0x16efc0.keys[_0x3717a3].publicKey) {
          return window.crypto.subtle.verify({
            'name': "RSASSA-PKCS1-v1_5"
          }, _0x16efc0.keys[_0x3717a3].publicKey, _0x454594.signature, _0x16efc0.enc.encode(_0x454594.data)).then(function (_0x2fab8b) {
            return _0x2fab8b;
          })["catch"](function (_0x2a7649) {
            errorlog(_0x2a7649);
            return false;
          });
        }
      };
      _0x16efc0.desaltStreamID = function (_0x4a5a82) {
        if (_0x16efc0.password) {
          return _0x16efc0.hash !== false ? (_0x4a5a82 = _0x4a5a82.slice(0x0, -0x1 * _0x16efc0.hash.length), _0x4a5a82) : generateHash(_0x16efc0.password + _0x16efc0.salt, 0x6).then(function (_0x5ee8b4) {
            _0x16efc0.hash = _0x5ee8b4;
            _0x4a5a82 = _0x4a5a82.slice(0x0, -0x1 * _0x16efc0.hash.length);
            return _0x4a5a82;
          })["catch"](errorlog);
        }
        return _0x4a5a82;
      };
      _0x16efc0.ping = function () {
        if (_0x16efc0.customWSS) {
          return;
        }
        clearTimeout(_0x16efc0.pingTimeout);
        if (!_0x16efc0.ws || _0x16efc0.ws.readyState !== 0x1) {
          return;
        }
        _0x16efc0.pingTimeout = setTimeout(function () {
          log("Pinging");
          var _0x2c7171 = {
            "request": "ping"
          };
          _0x16efc0.sendMsg(_0x2c7171);
        }, 0xbb8);
      };
      _0x16efc0.watchStream = async function (_0x1015d4) {
        await _0x16efc0.connect();
        if (_0x1015d4.length > 0x0) {
          if (_0x1015d4 === _0x16efc0.streamID) {
            warnlog("Can't play your own stream ID");
            return;
          }
          var _0xb265c3 = {
            "request": "play",
            "streamID": _0x1015d4
          };
          _0x16efc0.sendMsg(_0xb265c3);
          _0x16efc0.waitingWatchList[_0x1015d4] = true;
          pokeIframeAPI("requested-stream", _0x1015d4);
        } else {
          log("stream ID is 0 length");
        }
      };
      _0x16efc0.joinRoom = async function _0x45f230(_0x3f0059) {
        if (_0x16efc0.joiningRoom === false) {
          _0x16efc0.joiningRoom = true;
        }
        await _0x16efc0.connect();
        var _0x2b87af = {
          request: 'joinroom'
        };
        if (_0x16efc0.director && !_0x16efc0.directorView) {
          _0x2b87af.claim = true;
        }
        if (_0x16efc0.customWSS) {
          _0x2b87af.streamID = _0x16efc0.streamID;
        }
        var _0xefe88b = '';
        if (_0x16efc0.token) {
          _0xefe88b = _0x16efc0.token;
        }
        return _0x16efc0.password ? _0x16efc0.hash ? generateHash(_0x3f0059 + _0x16efc0.password + _0x16efc0.salt + _0xefe88b, 0x10).then(function (_0x2a8c2a) {
          if (_0x16efc0.customWSS) {
            _0x16efc0.roomenc = _0x2a8c2a;
          }
          _0x2b87af.roomid = _0x2a8c2a;
          _0x16efc0.sendMsg(_0x2b87af);
          _0x16efc0.listPromise = _0xb9e59b();
          log("deferring with a promise; hashed room");
          pokeIframeAPI("joining-room", _0x3f0059);
          return _0x16efc0.listPromise;
        })["catch"](errorlog) : generateHash(_0x16efc0.password + _0x16efc0.salt, 0x6).then(function (_0x1014a2) {
          _0x16efc0.hash = _0x1014a2;
          log("hash is " + _0x1014a2);
          log("rejoining room");
          return _0x16efc0.joinRoom(_0x3f0059);
        })["catch"](errorlog) : (_0x16efc0.customWSS && (_0x16efc0.roomenc = _0x3f0059), _0x2b87af.roomid = _0x3f0059, _0x16efc0.sendMsg(_0x2b87af), _0x16efc0.listPromise = _0xb9e59b(), log("deferring with a promise"), pokeIframeAPI('joining-room', _0x3f0059), _0x16efc0.listPromise);
      };
      _0x16efc0.sendMsg = function (_0x16eb0a, _0x5c7c78 = false) {
        if (_0x5c7c78) {
          _0x16eb0a.UUID = _0x5c7c78;
        }
        if (_0x16efc0.customWSS) {
          if (_0x16efc0.UUID) {
            _0x16eb0a.from = _0x16efc0.UUID;
          } else {
            _0x16efc0.UUID = _0x16efc0.generateStreamID(0x14);
            _0x16eb0a.from = _0x16efc0.UUID;
          }
          if (_0x16eb0a.UUID && _0x16eb0a.from === _0x16eb0a.UUID) {
            return;
          }
          if (_0x16efc0.director) {
            _0x16eb0a.director = true;
          }
          if (!("roomid" in _0x16eb0a)) {
            if (_0x16efc0.roomenc) {
              _0x16eb0a.roomid = _0x16efc0.roomenc;
            }
          }
        }
        clearTimeout(_0x16efc0.pingTimeout);
        try {
          if (_0x16efc0.password) {
            if (_0x16eb0a.streamID) {
              if (_0x16efc0.hash !== false) {
                if (!_0x16efc0.ws || typeof _0x16efc0.ws !== "object" || _0x16efc0.ws.readyState !== 0x1) {
                  log(_0x16eb0a, "could not be sent; queuing it");
                  _0x16efc0.msg.push(_0x16eb0a);
                } else {
                  _0x16eb0a.streamID = _0x16eb0a.streamID.substring(0x0, 0x2c) + _0x16efc0.hash.substring(0x0, 0x6);
                  var _0x34eb4c = JSON.stringify(_0x16eb0a);
                  if (_0x34eb4c.length > 0x3a98) {
                    errorlog("msg size error");
                    errorlog(_0x16eb0a);
                    errorlog(_0x34eb4c.length);
                    return;
                  }
                  _0x16efc0.ws.send(_0x34eb4c);
                }
              } else {
                return generateHash(_0x16efc0.password + _0x16efc0.salt, 0x6).then(function (_0x55a1d3) {
                  _0x16efc0.hash = _0x55a1d3;
                  if (typeof _0x16efc0.ws !== "object" || _0x16efc0.ws.readyState !== 0x1) {
                    log(_0x16eb0a, "could not be sent; queuing it");
                    _0x16efc0.msg.push(_0x16eb0a);
                  } else {
                    _0x16eb0a.streamID = _0x16eb0a.streamID.substring(0x0, 0x2c) + _0x16efc0.hash.substring(0x0, 0x6);
                    var _0x1ec6d0 = JSON.stringify(_0x16eb0a);
                    if (_0x1ec6d0.length > 0x3a98) {
                      errorlog("msg size error");
                      return;
                    }
                    _0x16efc0.ws.send(_0x1ec6d0);
                  }
                })['catch'](errorlog);
              }
            } else {
              if (!_0x16efc0.ws || typeof _0x16efc0.ws !== "object" || _0x16efc0.ws.readyState !== 0x1) {
                log(_0x16eb0a, "could not be sent; queuing it");
                _0x16efc0.msg.push(_0x16eb0a);
              } else {
                var _0x34eb4c = JSON.stringify(_0x16eb0a);
                if (_0x34eb4c.length > 0x3a98) {
                  errorlog("msg size error");
                  return;
                }
                _0x16efc0.ws.send(_0x34eb4c);
              }
            }
          } else {
            if (typeof _0x16efc0.ws !== "object" || _0x16efc0.ws.readyState !== 0x1) {
              warnlog("message could not be sent; queuing it");
              _0x16efc0.msg.push(_0x16eb0a);
            } else {
              var _0x34eb4c = JSON.stringify(_0x16eb0a);
              if (_0x34eb4c.length > 0x3a98) {
                errorlog("msg size error");
                return;
              }
              _0x16efc0.ws.send(_0x34eb4c);
            }
          }
        } catch (_0x31e801) {
          errorlog(_0x31e801);
        }
      };
      _0x16efc0.sendPeers = function (_0x53dbe4, _0x5542c3 = false, _0x23ff89 = false) {
        var _0x1621a5 = [];
        var _0x39e52e = JSON.stringify(_0x53dbe4);
        for (var _0x4f38c7 in _0x16efc0.pcs) {
          if (_0x23ff89 && _0x23ff89 === _0x4f38c7) {
            continue;
          }
          if (_0x5542c3 && _0x5542c3 !== _0x4f38c7) {
            continue;
          }
          try {
            _0x16efc0.pcs[_0x4f38c7].sendChannel.send(_0x39e52e);
            _0x1621a5.push(_0x4f38c7);
          } catch (_0x2fca88) {
            warnlog("RTC Connection seems to be dead or not yet open? 1");
          }
          if (_0x5542c3 && _0x5542c3 === _0x4f38c7) {
            return _0x1621a5.length;
          }
        }
        for (var _0x4f38c7 in _0x16efc0.rpcs) {
          if (_0x23ff89 && _0x23ff89 === _0x4f38c7) {
            continue;
          }
          if (_0x5542c3 && _0x5542c3 !== _0x4f38c7) {
            continue;
          }
          if (_0x1621a5.includes(_0x4f38c7)) {
            continue;
          }
          if (_0x16efc0.rpcs[_0x4f38c7].whip) {
            warnlog(_0x39e52e);
            continue;
          }
          try {
            if ("realUUID" in _0x16efc0.rpcs[_0x4f38c7]) {
              var _0x3be482 = JSON.parse(_0x53dbe4);
              _0x3be482.altUUID = true;
              _0x3be482 = JSON.stringify(_0x3be482);
              _0x16efc0.rpcs[_0x16efc0.rpcs[_0x4f38c7].realUUID].receiveChannel.send(_0x3be482);
            } else {
              _0x16efc0.rpcs[_0x4f38c7].receiveChannel.send(_0x39e52e);
            }
            _0x1621a5.push(_0x4f38c7);
          } catch (_0x58445f) {
            warnlog("RTC Connection seems to be dead or not yet open? 2");
          }
        }
        return _0x1621a5.length;
      };
      _0x16efc0.anysend = function (_0x5f2bf9, _0x27fde4 = false) {
        var _0x1ea1a7 = false;
        if ("UUID" in _0x5f2bf9) {
          _0x1ea1a7 = _0x16efc0.sendMessage(_0x5f2bf9, _0x5f2bf9.UUID);
          if (_0x1ea1a7) {
            log(_0x5f2bf9);
            log("successfully sent message vis WebRTC instead of WSS");
          } else {
            log("sending message via WSS as WebRTC failed to send message");
            _0x16efc0.sendMsg(_0x5f2bf9);
          }
        } else if (_0x27fde4) {
          _0x1ea1a7 = _0x16efc0.sendMessage(_0x5f2bf9);
          if (_0x1ea1a7) {
            log(_0x5f2bf9);
            log("successfully sent message vis WebRTC instead of WSS to all RTC Peers");
          } else {
            log("sending message via WSS as WebRTC failed to send message; RTC peers only");
            _0x16efc0.sendMsg(_0x5f2bf9);
          }
        } else {
          _0x16efc0.sendMsg(_0x5f2bf9);
          warnlog("sending message via server");
          warnlog(_0x5f2bf9);
        }
      };
      _0x16efc0.anyrequest = function (_0x508ebd, _0x344cf8 = false) {
        var _0x17c061 = false;
        if ('UUID' in _0x508ebd) {
          _0x17c061 = _0x16efc0.sendRequest(_0x508ebd, _0x508ebd.UUID);
          if (_0x17c061) {
            log("successfully sent message vis WebRTC instead of WSS");
          } else {
            log("sending message via WSS as WebRTC failed to send message");
            _0x16efc0.sendMsg(_0x508ebd);
          }
        } else if (_0x344cf8) {
          _0x17c061 = _0x16efc0.sendRequest(_0x508ebd);
          if (_0x17c061) {
            log("successfully sent message vis WebRTC instead of WSS to all RTC Peers");
          } else {
            log("sending message via WSS as WebRTC failed to send message; RTC peers only");
            _0x16efc0.sendMsg(_0x508ebd);
          }
        } else {
          _0x16efc0.sendMsg(_0x508ebd);
          warnlog("sending request via server");
          warnlog(_0x508ebd);
        }
      };
      _0x16efc0.directorActions = function (_0x262d8a) {
        log(_0x262d8a);
        if ("action" in _0x262d8a) {
          if ("target" in _0x262d8a) {
            if ("scene" in _0x262d8a) {
              if (_0x16efc0.scene !== false) {
                var _0xe4c142 = false;
                var _0x4def9a = 0x0;
                for (var _0x79a8b7 in _0x16efc0.rpcs) {
                  _0x4def9a += 0x1;
                  if (_0x16efc0.rpcs[_0x79a8b7].streamID === _0x262d8a.target) {
                    if ("value" in _0x262d8a) {
                      if (_0x262d8a.action == "mute") {
                        if (_0x262d8a.value == 0x1) {
                          log("Mute video 3306");
                          _0x16efc0.rpcs[_0x79a8b7].mutedState = true;
                          applyMuteState(_0x79a8b7);
                        } else {
                          log("Unmute video");
                          _0x16efc0.rpcs[_0x79a8b7].mutedState = false;
                          applyMuteState(_0x79a8b7);
                        }
                        _0x16efc0.sceneSync(_0x79a8b7);
                      } else {
                        if (_0x262d8a.action == "display") {
                          if (_0x16efc0.view) {
                            return;
                          }
                          ;
                          if (_0x16efc0.scene === _0x262d8a.scene) {
                            if (_0x16efc0.sceneType == 0x2) {
                              if (_0x262d8a.value == 0x0) {
                                _0x16efc0.rpcs[_0x79a8b7].mutedStateScene = true;
                                applyMuteState(_0x79a8b7);
                                if (_0x16efc0.rpcs[_0x79a8b7].videoElement) {
                                  if (_0x16efc0.rpcs[_0x79a8b7].videoElement.style.display && _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display !== 'none') {
                                    _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display = 'none';
                                    _0x16efc0.rpcs[_0x79a8b7].videoElement.sceneType2 = false;
                                    _0xe4c142 = true;
                                  }
                                }
                                if (_0x16efc0.rpcs[_0x79a8b7].iframeEle && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display !== 'none') {
                                  _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display = 'none';
                                  _0x16efc0.rpcs[_0x79a8b7].iframeEle.sceneType2 = false;
                                  _0xe4c142 = true;
                                }
                                var _0x35e2f1 = 0x0;
                                var _0x5af30a = false;
                                for (var _0x439701 in _0x16efc0.rpcs) {
                                  if (_0x439701 !== _0x79a8b7) {
                                    if (_0x16efc0.rpcs[_0x439701].videoElement && _0x16efc0.rpcs[_0x439701].videoElement.sceneType2) {
                                      if (_0x16efc0.rpcs[_0x439701].videoElement.sceneType2 > _0x35e2f1) {
                                        _0x35e2f1 = _0x16efc0.rpcs[_0x439701].videoElement.sceneType2;
                                        _0x5af30a = _0x439701;
                                      }
                                    }
                                    if (_0x16efc0.rpcs[_0x439701].iframeEle && _0x16efc0.rpcs[_0x439701].iframeEle.sceneType2) {
                                      if (_0x16efc0.rpcs[_0x439701].iframeEle.sceneType2 > _0x35e2f1) {
                                        _0x35e2f1 = _0x16efc0.rpcs[_0x439701].iframeEle.sceneType2;
                                        _0x5af30a = _0x439701;
                                      }
                                    }
                                  }
                                }
                                if (_0x5af30a) {
                                  _0x16efc0.rpcs[_0x5af30a].mutedStateScene = false;
                                  applyMuteState(_0x5af30a);
                                  if (_0x16efc0.rpcs[_0x5af30a].videoElement) {
                                    if (_0x16efc0.rpcs[_0x5af30a].videoElement.style.display && _0x16efc0.rpcs[_0x5af30a].videoElement.style.display !== 'block') {
                                      _0x16efc0.rpcs[_0x5af30a].videoElement.style.display = "block";
                                      _0x16efc0.rpcs[_0x5af30a].videoElement.sceneType2 = Date.now();
                                      _0xe4c142 = true;
                                    }
                                    if (_0x16efc0.rpcs[_0x5af30a].videoElement.controlTimer) {
                                      clearInterval(_0x16efc0.rpcs[_0x5af30a].videoElement.controlTimer);
                                    }
                                    _0x16efc0.rpcs[_0x5af30a].videoElement.controls = false;
                                    _0x16efc0.rpcs[_0x5af30a].videoElement.controlTimer = setTimeout(showControlBar.bind(null, _0x16efc0.rpcs[_0x5af30a].videoElement), 0xbb8);
                                  }
                                  if (_0x16efc0.rpcs[_0x5af30a].iframeEle && _0x16efc0.rpcs[_0x5af30a].iframeEle.style.display && _0x16efc0.rpcs[_0x5af30a].iframeEle.style.display !== "block") {
                                    _0x16efc0.rpcs[_0x5af30a].iframeEle.style.display = "block";
                                    _0x16efc0.rpcs[_0x5af30a].iframeEle.sceneType2 = Date.now();
                                    _0xe4c142 = true;
                                  }
                                }
                              } else {
                                for (var _0x439701 in _0x16efc0.rpcs) {
                                  if (_0x439701 !== _0x79a8b7) {
                                    _0x16efc0.rpcs[_0x439701].mutedStateScene = true;
                                    applyMuteState(_0x439701);
                                    if (_0x16efc0.rpcs[_0x439701].videoElement) {
                                      if (_0x16efc0.rpcs[_0x439701].videoElement.style.display && _0x16efc0.rpcs[_0x439701].videoElement.style.display !== "none") {
                                        _0x16efc0.rpcs[_0x439701].videoElement.style.display = "none";
                                        _0xe4c142 = true;
                                      }
                                    }
                                    if (_0x16efc0.rpcs[_0x439701].iframeEle && _0x16efc0.rpcs[_0x439701].iframeEle.style.display && _0x16efc0.rpcs[_0x439701].iframeEle.style.display !== "none") {
                                      _0x16efc0.rpcs[_0x439701].iframeEle.style.display = "none";
                                      _0xe4c142 = true;
                                    }
                                  }
                                }
                                _0x16efc0.rpcs[_0x79a8b7].mutedStateScene = false;
                                applyMuteState(_0x79a8b7);
                                if (_0x16efc0.rpcs[_0x79a8b7].videoElement) {
                                  if (_0x16efc0.rpcs[_0x79a8b7].videoElement.style.display && _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display !== "block") {
                                    _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display = "block";
                                    _0x16efc0.rpcs[_0x79a8b7].videoElement.sceneType2 = Date.now();
                                    _0xe4c142 = true;
                                  }
                                  if (_0x16efc0.rpcs[_0x79a8b7].videoElement.controlTimer) {
                                    clearInterval(_0x16efc0.rpcs[_0x79a8b7].videoElement.controlTimer);
                                  }
                                  _0x16efc0.rpcs[_0x79a8b7].videoElement.controls = false;
                                  _0x16efc0.rpcs[_0x79a8b7].videoElement.controlTimer = setTimeout(showControlBar.bind(null, _0x16efc0.rpcs[_0x79a8b7].videoElement), 0xbb8);
                                }
                                if (_0x16efc0.rpcs[_0x79a8b7].iframeEle && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display !== "block") {
                                  _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display = "block";
                                  _0x16efc0.rpcs[_0x79a8b7].iframeEle.sceneType2 = Date.now();
                                  _0xe4c142 = true;
                                }
                              }
                            } else {
                              if (_0x16efc0.sceneType == 0x1) {
                                if (_0x262d8a.value == 0x0) {
                                  if (_0x16efc0.rpcs[_0x79a8b7].videoElement) {
                                    if (_0x16efc0.rpcs[_0x79a8b7].videoElement.style.display && _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display !== "none") {
                                      _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display = "none";
                                      _0xe4c142 = true;
                                    }
                                  }
                                  if (_0x16efc0.rpcs[_0x79a8b7].iframeEle && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display !== "none") {
                                    _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display = "none";
                                    _0xe4c142 = true;
                                  }
                                } else {
                                  for (var _0x439701 in _0x16efc0.rpcs) {
                                    if (_0x439701 !== _0x79a8b7) {
                                      if (_0x16efc0.rpcs[_0x439701].videoElement) {
                                        if (_0x16efc0.rpcs[_0x439701].videoElement.style.display && _0x16efc0.rpcs[_0x439701].videoElement.style.display !== 'none') {
                                          _0x16efc0.rpcs[_0x439701].videoElement.style.display = "none";
                                          _0xe4c142 = true;
                                        }
                                      }
                                      if (_0x16efc0.rpcs[_0x439701].iframeEle && _0x16efc0.rpcs[_0x439701].iframeEle.style.display && _0x16efc0.rpcs[_0x439701].iframeEle.style.display !== 'none') {
                                        _0x16efc0.rpcs[_0x439701].iframeEle.style.display = 'none';
                                        _0xe4c142 = true;
                                      }
                                    }
                                  }
                                  if (_0x16efc0.rpcs[_0x79a8b7].videoElement) {
                                    if (_0x16efc0.rpcs[_0x79a8b7].videoElement.style.display && _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display !== 'block') {
                                      _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display = "block";
                                      _0xe4c142 = true;
                                    }
                                    if (_0x16efc0.rpcs[_0x79a8b7].videoElement.controlTimer) {
                                      clearInterval(_0x16efc0.rpcs[_0x79a8b7].videoElement.controlTimer);
                                    }
                                    _0x16efc0.rpcs[_0x79a8b7].videoElement.controls = false;
                                    _0x16efc0.rpcs[_0x79a8b7].videoElement.controlTimer = setTimeout(showControlBar.bind(null, _0x16efc0.rpcs[_0x79a8b7].videoElement), 0xbb8);
                                  }
                                  if (_0x16efc0.rpcs[_0x79a8b7].iframeEle && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display !== 'block') {
                                    _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display = "block";
                                    _0xe4c142 = true;
                                  }
                                }
                              } else if (_0x262d8a.value == 0x0) {
                                _0x16efc0.rpcs[_0x79a8b7].mutedStateScene = true;
                                applyMuteState(_0x79a8b7);
                                if (_0x16efc0.rpcs[_0x79a8b7].videoElement) {
                                  if (_0x16efc0.rpcs[_0x79a8b7].videoElement.style.display && _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display !== "none") {
                                    _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display = "none";
                                    _0xe4c142 = true;
                                  }
                                }
                                if (_0x16efc0.rpcs[_0x79a8b7].iframeEle && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display !== "none") {
                                  _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display = "none";
                                  _0xe4c142 = true;
                                }
                              } else {
                                _0x16efc0.rpcs[_0x79a8b7].mutedStateScene = false;
                                applyMuteState(_0x79a8b7);
                                if (_0x16efc0.rpcs[_0x79a8b7].videoElement) {
                                  if (_0x16efc0.rpcs[_0x79a8b7].videoElement.style.display && _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display !== "block") {
                                    _0x16efc0.rpcs[_0x79a8b7].videoElement.style.display = 'block';
                                    _0xe4c142 = true;
                                  }
                                  if (_0x16efc0.rpcs[_0x79a8b7].videoElement.controlTimer) {
                                    clearInterval(_0x16efc0.rpcs[_0x79a8b7].videoElement.controlTimer);
                                  }
                                  _0x16efc0.rpcs[_0x79a8b7].videoElement.controls = false;
                                  _0x16efc0.rpcs[_0x79a8b7].videoElement.controlTimer = setTimeout(showControlBar.bind(null, _0x16efc0.rpcs[_0x79a8b7].videoElement), 0xbb8);
                                }
                                if (_0x16efc0.rpcs[_0x79a8b7].iframeEle && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display && _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display !== "block") {
                                  _0x16efc0.rpcs[_0x79a8b7].iframeEle.style.display = "block";
                                  _0xe4c142 = true;
                                }
                              }
                            }
                          }
                          _0x16efc0.sceneSync(_0x79a8b7);
                        } else if (_0x262d8a.action == 'volume') {
                          log(parseInt(_0x262d8a.value) / 0x64);
                          if (_0x16efc0.rpcs[_0x79a8b7].videoElement) {
                            _0x16efc0.rpcs[_0x79a8b7].videoElement.volume = parseInt(_0x262d8a.value) / 0x64;
                            log("UN-MUTED");
                          }
                        }
                      } 
                    }
                  }
                }
                if (_0xe4c142) {
                  updateMixer();
                }
              }
            } else {
              if (_0x262d8a.action == 'migrate') {} else {
                if (_0x262d8a.action == "hangup") {}
              }
            }
          } else if (_0x262d8a.action === "layout") {
            warnlog("custom layout being applied");
            log(_0x262d8a);
            _0x16efc0.layout = _0x262d8a.value;
            pokeIframeAPI("layout-updated", _0x16efc0.layout);
            updateMixer();
          }
        }
      };
      _0x16efc0.newMainDirectorSetup = function () {
        log("session.newMainDirectorSetup");
        if (_0x16efc0.directorUUID in _0x16efc0.pcs) {
          if (_0x16efc0.pcs[_0x16efc0.directorUUID].stats && _0x16efc0.pcs[_0x16efc0.directorUUID].stats.info) {
            _0x16efc0.pcs[_0x16efc0.directorUUID].stats.info.director = true;
          }
        }
        if (_0x16efc0.directorUUID in _0x16efc0.rpcs) {
          if (_0x16efc0.rpcs[_0x16efc0.directorUUID].stats && _0x16efc0.rpcs[_0x16efc0.directorUUID].stats.info) {
            _0x16efc0.rpcs[_0x16efc0.directorUUID].stats.info.director = true;
          }
          if (_0x16efc0.director) {
            getById("container_" + _0x16efc0.directorUUID).classList.add("directorBox");
            if (_0x16efc0.rpcs[_0x16efc0.directorUUID].label === false) {
              getById("label_" + _0x16efc0.directorUUID).innerText = miscTranslations["main-director"];
            }
          }
        }
        _0x16efc0.requestCoDirector();
        updateUserList();
      };
      _0x16efc0.connect = async function _0x3238e0(_0x3cb125 = false) {
        if (_0x16efc0.taintedSession === true) {
          log("tainted");
          return;
        }
        if (_0x16efc0.ws !== null) {
          log("already connected");
          return;
        }
        if (_0x16efc0.wss == false) {
          if (_0x16efc0.proxy !== false) {
            _0x16efc0.wss = "wss://proxywss.rtc.ninja:443";
          } else {
            _0x16efc0.wss = "wss://wss.vdo.ninja:443";
          }
        }
        if (!RTCPeerConnection) {
          console.error(miscTranslations["webrtc-is-blocked"]);
          if (!_0x16efc0.cleanOutput) {
            warnUser(miscTranslations["webrtc-is-blocked"], false, false);
          }
          return;
        }
        if (_0x16efc0.ws === null) {
          _0x16efc0.ws = false;
          await chooseBestTURN();
        }
        if (_0x16efc0.customWSS === false) {
          _0x16efc0.wssid = _0x16efc0.generateStreamID(0xc);
          for (var _0x22e535 in _0x16efc0.rpcs) {
            warnlog("Checking to see if reconnectino to ws lost any peers");
            if (_0x16efc0.rpcs[_0x22e535].connectionState === "failed") {
              warnlog("cleaning up lost connection");
              _0x16efc0.closeRPC(_0x22e535);
            }
          }
        }
        if (_0x16efc0.bypass) {
          _0x16efc0.ws = {};
          _0x16efc0.ws.readyState = 0x1;
          _0x16efc0.ws.send = function (_0x6d8acd) {
            parent.postMessage({
              'bypass': _0x6d8acd
            }, _0x16efc0.iframetarget);
          };
          setTimeout(function () {
            _0x16efc0.ws.onopen();
          }, 0xa);
        } else {
          _0x16efc0.ws = new WebSocket(_0x16efc0.wss);
        }
        if (_0x3cb125 == false) {
          if (_0x16efc0.showTime === true) {
            _0x16efc0.showTime = null;
            toggleClock();
          }
          _0x16efc0.timeout = setTimeout(function () {
            pokeIframeAPI("hssConnection", "timeout");
            pokeIframeAPI("hss-connection", "timeout");
            errorlog("Websockets timed out; 30 seconds");
            if (!_0x16efc0.cleanOutput) {
              if (!_0x16efc0.studioSoftware) {
                setTimeout(function () {
                  warnUser(miscTranslations["site-not-responsive"], false, false);
                }, 0x1);
              }
            }
          }, 0x7530);
        }
        _0x16efc0.ws.onopen = function _0x3413f6() {
          _0x16efc0.onceConnected = true;
          clearTimeout(_0x16efc0.pingTimeout);
          clearInterval(_0x16efc0.timeout);
          log("connected to video server");
          checkConnection();
          if (_0x16efc0.transferred) {
            errorlog("RECONNECTING to HSS; DISCONNECTING FROM TRANSFERRED ROOM");
            for (_0x167dbb in _0x16efc0.rpcs) {
              try {
                if (_0x16efc0.rpcs[_0x167dbb].streamID) {
                  if (!_0x16efc0.include.includes(_0x16efc0.rpcs[_0x167dbb].streamID)) {
                    _0x16efc0.closeRPC(_0x167dbb);
                  }
                } else {
                  _0x16efc0.closeRPC(_0x167dbb);
                }
              } catch (_0x5f0e37) {}
            }
            for (_0x167dbb in _0x16efc0.pcs) {
              try {
                _0x16efc0.closePC(_0x167dbb);
              } catch (_0x2f2b47) {}
            }
            _0x16efc0.transferred = false;
            _0x16efc0.broadcastIFrame = false;
          }
          if (_0x16efc0.msg !== []) {
            try {
              var _0x51cea0 = _0x16efc0.msg.slice(-0x1e);
              _0x16efc0.msg = [];
              for (var _0x1e0b6d in _0x51cea0) {
                log("resending message");
                _0x16efc0.sendMsg(_0x51cea0[_0x1e0b6d]);
              }
            } catch (_0x17a03e) {
              errorlog(_0x17a03e);
            }
          }
          if (_0x3cb125 == true) {
            pokeIframeAPI("hssConnection", "reconnected");
            pokeIframeAPI("hss-connection", 'reconnected');
            if (_0x16efc0.seeding) {
              _0x16efc0.seedStream();
            }
            if (_0x16efc0.roomid) {
              log("ROOMID EANBLED");
              log("Update Mixer Event on REsize SET");
              joinRoom(_0x16efc0.roomid);
              if (_0x16efc0.include.length) {
                var _0x413d74 = Object.keys(_0x16efc0.waitingWatchList);
                for (var _0x167dbb in _0x413d74) {
                  if (_0x16efc0.include.includes(_0x413d74[_0x167dbb])) {
                    log("LOADING UP WAITING WATCH STREAM: " + _0x413d74[_0x167dbb]);
                    _0x16efc0.watchStream(_0x413d74[_0x167dbb]);
                  }
                }
              }
            } else {
              var _0x413d74 = Object.keys(_0x16efc0.waitingWatchList);
              for (var _0x167dbb in _0x413d74) {
                log("LOADING UP WAITING WATCH STREAM: " + _0x413d74[_0x167dbb]);
                _0x16efc0.watchStream(_0x413d74[_0x167dbb]);
              }
            }
          } else {
            pokeIframeAPI("hssConnection", "connected");
            pokeIframeAPI('hss-connection', "connected");
          }
        };
        _0x16efc0.requestStream = function (_0x243fa7) {
          for (var _0x198a3b in _0x16efc0.rpcs) {
            if (_0x16efc0.rpcs[_0x198a3b].streamID === _0x243fa7) {
              log("already watching stream");
              return false;
            }
          }
          if (_0x16efc0.waitingWatchList[_0x243fa7]) {
            log("already waiting for stream");
            return false;
          }
          _0x16efc0.watchStream(_0x243fa7);
          log("requesting stream");
          return true;
        };
        _0x16efc0.ws.onmessage = async function (_0x5032cb) {
          clearTimeout(_0x16efc0.pingTimeout);
          try {
            var _0xa19ca1 = JSON.parse(_0x5032cb.data);
          } catch (_0x2cf383) {
            try {
              var _0xa19ca1 = JSON.parse(_0x5032cb.data.toString());
            } catch (_0x1ef1a2) {
              errorlog(_0x1ef1a2);
              return;
            }
          }
          if ("streamID" in _0xa19ca1) {
            _0xa19ca1.streamID = _0x16efc0.desaltStreamID(_0xa19ca1.streamID);
          }
          if ("remote" in _0xa19ca1) {
            _0xa19ca1 = await _0x16efc0.decodeRemote(_0xa19ca1);
            if (!_0xa19ca1) {
              return;
            }
          }
          if (_0x16efc0.customWSS) {
            if ("from" in _0xa19ca1 && _0x16efc0.UUID && _0xa19ca1.from === _0x16efc0.UUID) {
              return;
            } else {
              log(_0xa19ca1);
            }
            if ("UUID" in _0xa19ca1) {
              if (_0x16efc0.UUID) {
                if (_0xa19ca1.UUID !== _0x16efc0.UUID) {
                  return;
                }
              } else {
                return;
              }
              delete _0xa19ca1.UUID;
            }
            if ('roomid' in _0xa19ca1) {
              if (!_0x16efc0.roomenc) {
                return;
              }
              if ('request' in _0xa19ca1) {
                if (_0xa19ca1.request === "migrate") {
                  if ('roomid' in _0xa19ca1) {
                    if ("target" in _0xa19ca1) {
                      if (_0xa19ca1.target == _0x16efc0.UUID) {
                        _0xa19ca1.request = "transferred";
                        _0x16efc0.roomenc = _0xa19ca1.roomid;
                        var _0x488f03 = {
                          "request": "joinroom",
                          "roomid": _0x16efc0.roomenc,
                          streamID: _0x16efc0.streamID
                        };
                        _0x16efc0.sendMsg(_0x488f03);
                      } else {
                        return;
                      }
                    } else {
                      return;
                    }
                  } else {
                    return;
                  }
                } else {
                  if (_0xa19ca1.roomid !== _0x16efc0.roomenc) {
                    return;
                  }
                }
              } else {
                if (_0xa19ca1.roomid !== _0x16efc0.roomenc) {
                  return;
                }
              }
              delete _0xa19ca1.roomid;
            }
            if ("director" in _0xa19ca1) {
              if (_0x16efc0.token || _0x16efc0.mainDirectorPassword) {
                await checkToken();
              } else if (_0xa19ca1.from) {
                _0x16efc0.directorUUID = _0xa19ca1.from;
                _0x16efc0.directorStreamID = false;
                _0x16efc0.directorList = [];
                _0x16efc0.directorList.push(_0x16efc0.directorUUID);
                _0x16efc0.newMainDirectorSetup();
              }
              delete _0xa19ca1.director;
            }
            if ('from' in _0xa19ca1) {
              _0xa19ca1.UUID = _0xa19ca1.from;
              delete _0xa19ca1.from;
            }
            if ("request" in _0xa19ca1) {
              if (_0xa19ca1.request === "play") {
                if ("streamID" in _0xa19ca1) {
                  if (_0xa19ca1.streamID === _0x16efc0.streamID) {
                    _0xa19ca1.request = "offerSDP";
                  } else {
                    return;
                  }
                }
              } else {
                if (_0xa19ca1.request === "seed") {
                  if (_0x16efc0.view_set) {
                    if (_0x16efc0.view_set.includes(_0xa19ca1.streamID)) {
                      play(_0xa19ca1.streamID);
                      return;
                    } else {
                      return;
                    }
                  }
                } else {
                  if (_0xa19ca1.request === "joinroom") {
                    if ('streamID' in _0xa19ca1) {
                      if (_0x16efc0.view_set) {
                        if (_0x16efc0.view_set.includes(_0xa19ca1.streamID)) {
                          play(_0xa19ca1.streamID);
                        } else {}
                      } else {
                        play(_0xa19ca1.streamID);
                      }
                    }
                    _0xa19ca1.request = "offerSDP";
                  }
                }
              }
            } else {
              if ("streamID" in _0xa19ca1) {
                if (_0x16efc0.view_set) {
                  if (_0x16efc0.view_set.includes(_0xa19ca1.streamID)) {} else {
                    return;
                  }
                } else {
                  if (_0x16efc0.view) {
                    if (_0x16efc0.view !== _0xa19ca1.streamID) {
                      return;
                    } else {}
                  }
                }
              }
            }
          }
          if (_0xa19ca1.request) {
            if (_0xa19ca1.request == 'offerSDP') {
              if (_0x16efc0.queue) {
                if (_0x16efc0.directorList.indexOf(_0xa19ca1.UUID) >= 0x0) {
                  _0x16efc0.offerSDP(_0xa19ca1.UUID);
                } else if (_0x16efc0.director) {
                  if (_0xa19ca1.UUID in _0x16efc0.rpcs) {
                    _0x16efc0.offerSDP(_0xa19ca1.UUID);
                  }
                }
              } else {
                _0x16efc0.offerSDP(_0xa19ca1.UUID);
              }
            } else {
              if (_0xa19ca1.request == "listing") {
                log(_0xa19ca1);
                if (_0x16efc0.token || _0x16efc0.mainDirectorPassword) {
                  await checkToken();
                } else if ('director' in _0xa19ca1) {
                  _0x16efc0.directorUUID = _0xa19ca1.director;
                  _0x16efc0.directorStreamID = false;
                  _0x16efc0.directorList = [];
                  _0x16efc0.directorList.push(_0x16efc0.directorUUID);
                  _0x16efc0.newMainDirectorSetup();
                } else {
                  _0x16efc0.directorUUID = false;
                  _0x16efc0.directorStreamID = false;
                  _0x16efc0.directorList = [];
                }
                if (_0x16efc0.mainDirectorPassword) {} else {
                  if ('claim' in _0xa19ca1) {
                    if (_0x16efc0.token || _0xa19ca1.claim == false) {
                      if (!_0x16efc0.cleanOutput) {
                        getById("head4").innerHTML = miscTranslations["not-the-director"];
                        if (_0x16efc0.directorPassword) {
                          if (_0x16efc0.directorState === null) {
                            warnUser(miscTranslations['room-is-claimed-codirector'], false, false);
                          }
                        } else if (_0x16efc0.token) {
                          setTimeout(function () {
                            warnUser(miscTranslations['token-room-is-claimed'], false, false);
                          }, 0x1);
                        } else {
                          setTimeout(function () {
                            warnUser(miscTranslations["room-is-claimed"], false, false);
                          }, 0x1);
                        }
                      }
                      _0x16efc0.directorState = false;
                      pokeAPI("director", false);
                      pokeIframeAPI("director", false);
                    } else {
                      _0x16efc0.directorState = true;
                      pokeAPI("director", true);
                      pokeIframeAPI('director', true);
                    }
                  }
                }
                _0x16efc0.alreadyJoinedMembers = _0xa19ca1.list;
                _0x16efc0.listPromise.resolve(_0xa19ca1.list);
              } else {
                if (_0xa19ca1.request == "transferred") {
                  _0x16efc0.queueList = [];
                  _0x16efc0.transferred = true;
                  _0x16efc0.broadcastIFrame = false;
                  log("You've been transferred");
                  pokeIframeAPI("transferred");
                  if (!_0x16efc0.director) {
                    _0x16efc0.queue = false;
                  }
                  for (_0x269252 in _0x16efc0.rpcs) {
                    try {
                      if (!_0x16efc0.include.includes(_0x16efc0.rpcs[_0x269252].streamID)) {
                        warnlog("transferred and closing");
                        _0x16efc0.closeRPC(_0x269252);
                      }
                    } catch (_0x52abba) {}
                  }
                  for (_0x269252 in _0x16efc0.pcs) {
                    try {
                      log("closing 4");
                      _0x16efc0.closePC(_0x269252);
                    } catch (_0x583e4e) {}
                  }
                  if (_0x16efc0.token || _0x16efc0.mainDirectorPassword) {
                    await checkToken();
                  } else if ("director" in _0xa19ca1) {
                    _0x16efc0.directorUUID = _0xa19ca1.director;
                    _0x16efc0.directorStreamID = false;
                    _0x16efc0.directorList = [];
                    _0x16efc0.directorList.push(_0x16efc0.directorUUID);
                    _0x16efc0.newMainDirectorSetup();
                  } else {
                    _0x16efc0.directorUUID = false;
                    _0x16efc0.directorStreamID = false;
                    _0x16efc0.directorList = [];
                  }
                  youveBeenTransferred();
                  _0x16efc0.totalRoomBitrate = _0x16efc0.totalRoomBitrate_default;
                  updateMixer();
                  log("Members in Room");
                  log(_0xa19ca1.list);
                  for (var _0x269252 in _0xa19ca1.list) {
                    if ("UUID" in _0xa19ca1.list[_0x269252]) {
                      if ('streamID' in _0xa19ca1.list[_0x269252]) {
                        if (_0xa19ca1.list[_0x269252].UUID in _0x16efc0.rpcs) {
                          log("RTC already connected");
                        } else {
                          var _0x3a20c5 = _0x16efc0.desaltStreamID(_0xa19ca1.list[_0x269252].streamID);
                          log("STREAM ID desalted 2:" + _0x3a20c5);
                          if (_0x16efc0.queue) {
                            if (_0x16efc0.directorList.indexOf(_0xa19ca1.list[_0x269252].UUID) >= 0x0) {
                              play(_0x3a20c5, _0xa19ca1.list[_0x269252].UUID);
                            } else {
                              if (_0x16efc0.view_set && _0x16efc0.view_set.includes(_0x3a20c5)) {
                                play(_0x3a20c5, _0xa19ca1.list[_0x269252].UUID);
                              } else if (_0x16efc0.queueList.length < 0x1388) {
                                if (!(_0x3a20c5 in _0x16efc0.watchTimeoutList) && !_0x16efc0.queueList.includes(_0x3a20c5)) {
                                  _0x16efc0.queueList.push(_0x3a20c5);
                                }
                              }
                            }
                          } else {
                            play(_0x3a20c5, _0xa19ca1.list[_0x269252].UUID);
                          }
                        }
                      }
                    }
                  }
                  updateQueue();
                } else {
                  if (_0xa19ca1.request == "roomclaimed") {
                    log(_0xa19ca1);
                    if (_0x16efc0.token || _0x16efc0.mainDirectorPassword) {
                      await checkToken();
                    } else if ("director" in _0xa19ca1) {
                      _0x16efc0.directorUUID = _0xa19ca1.director;
                      _0x16efc0.directorStreamID = false;
                      _0x16efc0.directorList = [];
                      _0x16efc0.directorList.push(_0x16efc0.directorUUID);
                      _0x16efc0.newMainDirectorSetup();
                    } else {
                      _0x16efc0.directorUUID = false;
                      _0x16efc0.directorList = [];
                      errorlog("This shouldn't happen");
                    }
                    updateUserList();
                  } else {
                    if (_0xa19ca1.request == "sendroom") {
                      log("Inbound User-based Message from Room");
                      log(_0xa19ca1);
                      try {
                        if (_0x16efc0.token || _0x16efc0.mainDirectorPasswor) {} else if ("director" in _0xa19ca1) {
                          if (_0xa19ca1.director == true) {
                            _0x16efc0.directorActions(_0xa19ca1);
                          }
                        }
                      } catch (_0x31a1ce) {
                        errorlog(_0x31a1ce);
                      }
                    } else {
                      if (_0xa19ca1.request == 'someonejoined') {
                        if (_0x16efc0.token || _0x16efc0.mainDirectorPassword) {
                          await checkToken();
                        } else if (_0xa19ca1.director) {
                          _0x16efc0.directorUUID = _0xa19ca1.UUID;
                          _0x16efc0.directorStreamID = false;
                          _0x16efc0.directorList = [];
                          _0x16efc0.directorList.push(_0x16efc0.directorUUID);
                          _0x16efc0.newMainDirectorSetup();
                        }
                        if ('streamID' in _0xa19ca1) {
                          log("Someone Joined the Room with a video");
                          if (_0x16efc0.queue) {
                            if (_0x16efc0.directorList.indexOf(_0xa19ca1.UUID) >= 0x0) {
                              play(_0x3a20c5, _0xa19ca1.UUID);
                            } else {
                              if (_0x16efc0.view_set && _0x16efc0.view_set.includes(_0x3a20c5)) {
                                play(_0x3a20c5, _0xa19ca1.UUID);
                              } else if (_0x16efc0.queueList.length < 0x1388) {
                                if (!(_0xa19ca1.streamID in _0x16efc0.watchTimeoutList) && !_0x16efc0.queueList.includes(_0xa19ca1.streamID)) {
                                  _0x16efc0.queueList.push(_0xa19ca1.streamID);
                                  updateQueue(true);
                                }
                              }
                            }
                          } else {
                            play(_0xa19ca1.streamID);
                          }
                        } else {
                          log("Someone Joined the Room");
                        }
                      } else {
                        if (_0xa19ca1.request == 'videoaddedtoroom') {
                          log("Someone published a video to the Room");
                          log(_0xa19ca1);
                          if (_0x16efc0.queue) {
                            if (_0x16efc0.directorList.indexOf(_0xa19ca1.UUID) >= 0x0) {
                              play(_0x3a20c5, _0xa19ca1.UUID);
                            } else {
                              if (_0x16efc0.view_set && _0x16efc0.view_set.includes(_0x3a20c5)) {
                                play(_0x3a20c5, _0xa19ca1.UUID);
                              } else if (_0x16efc0.queueList.length < 0x1388) {
                                if (!(_0xa19ca1.streamID in _0x16efc0.watchTimeoutList) && !_0x16efc0.queueList.includes(_0xa19ca1.streamID)) {
                                  _0x16efc0.queueList.push(_0xa19ca1.streamID);
                                  updateQueue(true);
                                }
                              }
                            }
                          } else {
                            play(_0xa19ca1.streamID);
                          }
                        } else {
                          if (_0xa19ca1.request == "alert") {
                            errorlog(_0xa19ca1);
                            pokeIframeAPI("alert", _0xa19ca1.message);
                            if (_0x16efc0.scene === false) {
                              if ("message" in _0xa19ca1) {
                                if (_0xa19ca1.message === "Stream ID is already in use.") {
                                  if (_0x16efc0.seedAttempts < 0x2) {
                                    _0x16efc0.seedAttempts = parseInt(_0x16efc0.seedAttempts) + 0x1;
                                    setTimeout(function () {
                                      _0x16efc0.seedStream();
                                    }, 0x1388);
                                  } else {
                                    hangup();
                                    if (!_0x16efc0.cleanOutput) {
                                      setTimeout(function () {
                                        warnUser(miscTranslations['streamid-already-published'], false, false);
                                      }, 0x1);
                                    }
                                  }
                                } else {
                                  if (_0x16efc0.token || _0x16efc0.mainDirectorPasswor) {} else if (_0xa19ca1.message === "Room is already claimed by someone else.") {
                                    if (!_0x16efc0.cleanOutput) {
                                      getById("head4").innerHTML = miscTranslations['not-the-director'];
                                      if (_0x16efc0.directorPassword) {
                                        if (_0x16efc0.directorState === null) {
                                          warnUser(miscTranslations["room-is-claimed-codirector"], false, false);
                                        }
                                      } else {
                                        setTimeout(function () {
                                          warnUser(miscTranslations['room-is-claimed'], false, false);
                                        }, 0x1);
                                      }
                                    }
                                    _0x16efc0.directorState = false;
                                    pokeAPI("director", false);
                                    pokeIframeAPI("director", false);
                                  } else if (!_0x16efc0.cleanOutput) {
                                    setTimeout(function () {
                                      warnUser(_0xa19ca1.message);
                                    }, 0x1);
                                  }
                                }
                              }
                            }
                          } else if (_0xa19ca1.request == "warn") {
                            if ("message" in _0xa19ca1) {
                              warnlog(_0xa19ca1.message);
                            }
                          } else {
                            log(_0xa19ca1);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (_0xa19ca1.description) {
              if ("streamID" in _0xa19ca1) {
                if (_0xa19ca1.streamID in _0x16efc0.watchTimeoutList) {
                  clearTimeout(_0x16efc0.watchTimeoutList[_0xa19ca1.streamID]);
                  delete _0x16efc0.watchTimeoutList[_0xa19ca1.streamID];
                }
              }
              _0x16efc0.processDescription(_0xa19ca1);
            } else {
              if (_0xa19ca1.candidate) {
                log("GOT ICE!!");
                _0x16efc0.processIce(_0xa19ca1);
              } else {
                if (_0xa19ca1.candidates) {
                  log("GOT ICES!!");
                  _0x16efc0.processIceBundle(_0xa19ca1);
                } else if (_0xa19ca1.bye || _0xa19ca1.request == "cleanup") {
                  warnlog("Clean up");
                  if (_0xa19ca1.UUID in _0x16efc0.pcs) {
                    warnlog('problem');
                    log("closing 4");
                    _0x16efc0.closePC(_0xa19ca1.UUID);
                  }
                  if (_0xa19ca1.UUID in _0x16efc0.rpcs) {
                    warnlog("problem");
                    _0x16efc0.closeRPC(_0xa19ca1.UUID);
                  }
                } else {
                  log("what is this?");
                }
              }
            }
          }
        };
        _0x16efc0.ws.onclose = async function (_0x41e913) {
          clearTimeout(_0x16efc0.pingTimeout);
          pokeIframeAPI("hssConnection", 'closed');
          pokeIframeAPI("hss-connection", "closed");
          try {
            if ('code' in _0x41e913) {
              if (_0x41e913.code == 0x1f7) {
                if (_0x3cb125 == false) {
                  clearInterval(_0x16efc0.timeout);
                  if (!_0x16efc0.cleanOutput) {
                    warnUser("Failed to connect to service: Error 503<br /><br />Possibly too many connections from the same address tried to connect.<br />Visit https://discord.vdo.ninja for support.", 0x7530, false);
                  }
                }
              }
            }
          } catch (_0x110965) {
            errorlog(_0x110965);
          }
          warnlog("Connection to Control Server lost.\n\nAuto-reconnect is partially implemented");
          if (_0x16efc0.security == false) {
            try {
              if (_0x16efc0.ws.readyState === WebSocket.CLOSED) {
                _0x16efc0.ws = null;
                setTimeout(() => {
                  try {
                    _0x16efc0.connect(true);
                  } catch (_0x304642) {}
                  ;
                }, 0x7d0);
              }
            } catch (_0x326711) {
              errorlog(_0x326711);
            }
          }
        };
      };
      _0x16efc0.sendMessage = function (_0x258d34, _0x4a9df8 = null) {
        log("Messaging sent");
        warnlog(_0x258d34);
        _0x258d34 = JSON.stringify(_0x258d34);
        if (_0x4a9df8 == null) {
          for (var _0x1803d1 in _0x16efc0.pcs) {
            try {
              _0x16efc0.pcs[_0x1803d1].sendChannel.send(_0x258d34);
            } catch (_0x2e22b9) {
              warnlog("RTC Connection seems to be dead or not yet open? 4");
            }
          }
          return true;
        } else {
          try {
            _0x16efc0.pcs[_0x4a9df8].sendChannel.send(_0x258d34);
            return true;
          } catch (_0x1b7a4c) {
            warnlog("RTC Connection seems to be dead or not yet open? 3");
            warnlog(_0x258d34);
            return false;
          }
        }
        return false;
      };
      _0x16efc0.sendRequest = function (_0xdb6e88, _0x488068 = null) {
        var _0x422e52 = JSON.stringify(_0xdb6e88);
        if (_0x488068 == null) {
          var _0x4a3587 = [];
          for (var _0x48fe60 in _0x16efc0.rpcs) {
            if (_0x16efc0.rpcs[_0x48fe60].whip) {
              warnlog(_0xdb6e88);
              continue;
            }
            try {
              if ("realUUID" in _0x16efc0.rpcs[_0x48fe60]) {
                var _0x318403 = _0xdb6e88;
                _0x318403.altUUID = true;
                _0x318403 = JSON.stringify(_0x318403);
                _0x16efc0.rpcs[_0x16efc0.rpcs[_0x48fe60].realUUID].receiveChannel.send(_0x318403);
              } else {
                _0x16efc0.rpcs[_0x48fe60].receiveChannel.send(_0x422e52);
              }
              _0x4a3587.push(_0x48fe60);
            } catch (_0x369b00) {
              log("PUBLISHER's RTC Connection seems to be dead? ");
            }
          }
          return _0x4a3587.length;
        } else {
          if (_0x16efc0.rpcs[_0x488068].whip) {
            warnlog(_0xdb6e88);
            return;
          }
          try {
            if ("realUUID" in _0x16efc0.rpcs[_0x488068]) {
              var _0x318403 = _0xdb6e88;
              _0x318403.altUUID = true;
              _0x318403 = JSON.stringify(_0x318403);
              _0x16efc0.rpcs[_0x16efc0.rpcs[_0x488068].realUUID].receiveChannel.send(_0x318403);
            } else {
              _0x16efc0.rpcs[_0x488068].receiveChannel.send(_0x422e52);
            }
            return true;
          } catch (_0x3149fe) {
            log("PUBLISHER's RTC Connection seems to be dead? ");
            return false;
          }
        }
      };
      _0x16efc0.hangup = function (_0x8e21c2 = false, _0x461e8f = false) {
        try {
          window.removeEventListener("beforeunload", confirmUnload);
        } catch (_0x3f50dc) {}
        if (_0x461e8f) {
          recordLocalVideo("estop");
        }
        _0x16efc0.taintedSession = true;
        warnlog("hanging up");
        try {
          recordLocalVideo("stop");
        } catch (_0x171671) {}
        try {
          var _0x39f559 = {
            "videoMuted": true,
            "bye": true
          };
          _0x16efc0.sendMessage(_0x39f559);
        } catch (_0x9069b7) {}
        try {
          _0x16efc0.ws.close();
        } catch (_0x4e92b2) {}
        try {
          transferList.forEach(_0x1cc85a => {
            if (_0x1cc85a.writer) {
              _0x1cc85a.writer.close();
            }
            if (_0x1cc85a.videoWriter) {
              _0x1cc85a.stopWriter;
            }
          });
        } catch (_0x1de22c) {
          errorlog(_0x1de22c);
        }
        try {
          if (_0x16efc0.canvasSource && _0x16efc0.canvasSource.srcObject) {
            _0x16efc0.canvasSource.srcObject.getTracks().forEach(function (_0x3a9412) {
              _0x16efc0.canvasSource.srcObject.removeTrack(_0x3a9412);
              _0x3a9412.stop();
              log("stopping old track");
            });
          }
          if (_0x16efc0.videoElement && _0x16efc0.videoElement.srcObject) {
            _0x16efc0.videoElement.srcObject.getTracks().forEach(function (_0x419ae1) {
              _0x16efc0.videoElement.srcObject.removeTrack(_0x419ae1);
              _0x419ae1.stop();
              log("stopping old track");
            });
          }
          if (_0x16efc0.streamSrc) {
            _0x16efc0.streamSrc.getTracks().forEach(function (_0x5a50d5) {
              _0x16efc0.streamSrc.removeTrack(_0x5a50d5);
              _0x5a50d5.stop();
              log("stopping old track");
            });
          }
          if (_0x16efc0.streamSrcClone) {
            _0x16efc0.streamSrcClone.getTracks().forEach(function (_0x22ea9a) {
              _0x16efc0.streamSrcClone.removeTrack(_0x22ea9a);
              _0x22ea9a.stop();
              log("stopping old track");
            });
          }
          if (_0x16efc0.screenStream) {
            _0x16efc0.screenStream.getTracks().forEach(function (_0x491999) {
              _0x16efc0.screenStream.removeTrack(_0x491999);
              _0x491999.stop();
              log("stopping old track");
            });
          }
        } catch (_0x4d3849) {
          errorlog(_0x4d3849);
        }
        try {
          for (i in _0x16efc0.rpcs) {
            try {
              if (_0x16efc0.rpcs[i].videoElement) {
                if (_0x16efc0.rpcs[i].videoElement.recording) {
                  recordLocalVideo("stop", null, _0x16efc0.rpcs[i].videoElement);
                }
              }
            } catch (_0x112e8b) {}
            log("closing rpc due to hangup event");
            _0x16efc0.closeRPC(i, true);
          }
          for (i in _0x16efc0.pcs) {
            log("closing 5");
            _0x16efc0.closePC(i);
          }
        } catch (_0x16bae1) {
          errorlog(_0x16bae1);
        }
        for (var _0x48cf0b in _0x16efc0.watchTimeoutList) {
          clearTimeout(_0x16efc0.watchTimeoutList[_0x48cf0b]);
        }
        if (_0x8e21c2) {
          reloadRequested();
          warnlog("Reloading? uh oh. Why didn't it?");
          return;
        } else {
          setTimeout(function () {
            for (i in _0x16efc0) {
              try {
                delete _0x16efc0[i];
              } catch (_0x57eb55) {}
            }
            delete _0x16efc0;
          }, 0x4b0);
          hangupComplete();
          log("HANG UP COMPLETE");
        }
      };
      _0x16efc0.hangupDirector = function () {
        _0x16efc0.taintedSession = true;
        _0x16efc0.screenShareState = false;
        pokeIframeAPI('screen-share-state', _0x16efc0.screenShareState, null, _0x16efc0.streamID);
        notifyOfScreenShare();
        warnlog("hanging up");
        pokeIframeAPI("director-share", false, false, _0x16efc0.streamID);
        pokeIframeAPI("seeding", false, false, _0x16efc0.streamID);
        pokeAPI("seeding", false);
        try {
          if (_0x16efc0.videoElement && _0x16efc0.videoElement.srcObject) {
            _0x16efc0.videoElement.srcObject.getTracks().forEach(function (_0xcb5b91) {
              _0x16efc0.videoElement.srcObject.removeTrack(_0xcb5b91);
              _0xcb5b91.stop();
              log("stopping old track");
            });
          }
          if (_0x16efc0.streamSrc) {
            _0x16efc0.streamSrc.getVideoTracks().forEach(function (_0x2b7a47) {
              _0x16efc0.videoDevice = _0x2b7a47.label.toLowerCase().replace(/[\W]+/g, '_');
              _0x16efc0.streamSrc.removeTrack(_0x2b7a47);
              _0x2b7a47.stop();
              log("stopping old track");
            });
            _0x16efc0.audioDevice = [];
            _0x16efc0.streamSrc.getAudioTracks().forEach(function (_0x4e4e68) {
              _0x16efc0.audioDevice.push(_0x4e4e68.label.toLowerCase().replace(/[\W]+/g, '_'));
              _0x16efc0.streamSrc.removeTrack(_0x4e4e68);
              _0x4e4e68.stop();
              log("stopping old track");
            });
            if (!_0x16efc0.audioDevice.length) {
              _0x16efc0.audioDevice = false;
            }
          }
          if (_0x16efc0.streamSrcClone) {
            _0x16efc0.streamSrcClone.getTracks().forEach(function (_0x33213c) {
              _0x16efc0.streamSrcClone.removeTrack(_0x33213c);
              _0x33213c.stop();
            });
          }
          for (UUID in _0x16efc0.pcs) {
            var _0x16d6be = getSenders2(UUID);
            _0x16d6be.forEach(_0x3b9042 => {
              if (_0x3b9042.track) {
                _0x3b9042.track.enabled = false;
              }
            });
          }
          try {
            if (document.getElementById("container_director")) {
              if (!_0x16efc0.syncState) {
                _0x16efc0.syncState = {};
              }
              if (_0x16efc0.streamID) {
                _0x16efc0.syncState[_0x16efc0.streamID] = getDetailedState(_0x16efc0.streamID);
              }
              getById('container_director').parentNode.removeChild(getById("container_director"));
              updateLockedElements();
            }
          } catch (_0x24d43e) {
            warnlog(_0x24d43e);
          }
          var _0x58b0d3 = {
            "videoMuted": true,
            "virtualHangup": true
          };
          _0x16efc0.sendMessage(_0x58b0d3);
          getById("videosource").remove();
        } catch (_0x5f5486) {
          errorlog("failed to disconnect");
        }
        log("HANG UP 2 COMPLETE");
      };
      _0x16efc0.createOffer = function (_0xf93851, _0x5e9ef3 = false) {
        _0x16efc0.pcs[_0xf93851].createOffer({
          'iceRestart': _0x5e9ef3
        }).then(_0x2f9122 => {
          log("create offer worked");
          if (SafariVersion && SafariVersion <= 0xd && (iOS || iPad)) {} else {
            if (_0x16efc0.stereo == 0x3 || _0x16efc0.stereo == 0x5 || _0x16efc0.stereo == 0x1) {
              _0x2f9122.sdp = CodecsHandler.setOpusAttributes(_0x2f9122.sdp, {
                'stereo': 0x1
              });
              log("stereo enabled");
            } else {
              if (iOS || iPad) {} else if (_0x16efc0.stereo == 0x4) {
                _0x2f9122.sdp = CodecsHandler.setOpusAttributes(_0x2f9122.sdp, {
                  'stereo': 0x2
                });
                log("stereo enabled");
              }
            }
          }
          if (iOS || iPad) {
            if (_0x16efc0.removeOrientationFlag && _0x2f9122.sdp.includes("a=extmap:3 urn:3gpp:video-orientation\r\n")) {
              _0x2f9122.sdp = _0x2f9122.sdp.replace("a=extmap:3 urn:3gpp:video-orientation\r\n", '');
            }
          }
          if (_0x16efc0.pcs[_0xf93851].preferVideoCodec) {
            try {
              _0x2f9122.sdp = CodecsHandler.preferCodec(_0x2f9122.sdp, _0x16efc0.pcs[_0xf93851].preferVideoCodec);
              log("Trying to set " + _0x16efc0.pcs[_0xf93851].preferVideoCodec + " as preferred video codec by viewer via API (offer)");
            } catch (_0x50d11e) {
              errorlog(_0x50d11e);
              warnlog("couldn't set preferred video codec");
            }
          }
          if (_0x16efc0.pcs[_0xf93851].preferAudioCodec) {
            try {
              if (_0x16efc0.pcs[_0xf93851].preferAudioCodec === "lyra") {
                _0x2f9122.sdp = CodecsHandler.modifyDescLyra(_0x2f9122.sdp);
              } else {
                if (_0x16efc0.pcs[_0xf93851].preferAudioCodec === "pcm") {
                  if (_0x16efc0.audioInputChannels && _0x16efc0.audioInputChannels == 0x1) {
                    _0x2f9122.sdp = CodecsHandler.modifyDescPCM(_0x2f9122.sdp, _0x16efc0.micSampleRate || 0xbb80, false);
                  } else if (_0x16efc0.stereo) {
                    _0x2f9122.sdp = CodecsHandler.modifyDescPCM(_0x2f9122.sdp, _0x16efc0.micSampleRate || 0xbb80, true);
                  } else {
                    _0x2f9122.sdp = CodecsHandler.modifyDescPCM(_0x2f9122.sdp, _0x16efc0.micSampleRate || 0xbb80, false);
                  }
                } else {
                  _0x2f9122.sdp = CodecsHandler.preferAudioCodec(_0x2f9122.sdp, _0x16efc0.pcs[_0xf93851].preferAudioCodec);
                }
              }
              log("Trying to set " + _0x16efc0.pcs[_0xf93851].preferAudioCodec + " as preferred audio codec by viewer via API (offer)");
            } catch (_0x2780e6) {
              errorlog(_0x2780e6);
              warnlog("couldn't set preferred audio codec");
            }
          }
          if (Android && _0x16efc0.h264profile !== false && _0x16efc0.AndroidFix) {
            _0x2f9122.sdp = _0x2f9122.sdp.replace(/42e01f/gi, "42001f");
          }
          _0x16efc0.pcs[_0xf93851].setLocalDescription(_0x2f9122).then(function () {
            log("publishing SDP Offer: " + _0xf93851);
            _0x16efc0.applyIsolatedChat(_0xf93851);
            var _0x3aa08d = {
              UUID: _0xf93851,
              streamID: _0x16efc0.streamID,
              description: _0x16efc0.pcs[_0xf93851].localDescription,
              "session": _0x16efc0.pcs[_0xf93851].session
            };
            if (_0x16efc0.customWSS) {
              _0x3aa08d.isScene = _0x16efc0.scene;
            }
            if (_0x16efc0.screenStream !== false) {
              var _0x5d973e = _0x16efc0.screenStream.getTracks();
              var _0x3b7933 = _0x16efc0.pcs[_0xf93851].getSenders();
              var _0x4a149b = [];
              for (var _0x1dce4b = 0x0; _0x1dce4b < _0x3b7933.length; _0x1dce4b++) {
                for (var _0x110f7e = 0x0; _0x110f7e < _0x5d973e.length; _0x110f7e++) {
                  if (_0x3b7933[_0x1dce4b].track && _0x3b7933[_0x1dce4b].track.id == _0x5d973e[_0x110f7e].id && _0x3b7933[_0x1dce4b].track.kind == _0x5d973e[_0x110f7e].kind) {
                    _0x4a149b.push(_0x1dce4b);
                  }
                }
              }
              if (_0x4a149b.length) {
                _0x3aa08d.screen = _0x4a149b;
              }
            }
            if (_0x16efc0.password) {
              _0x16efc0.encryptMessage(JSON.stringify(_0x3aa08d.description)).then(function (_0xee61ba) {
                _0x3aa08d.description = _0xee61ba[0x0];
                _0x3aa08d.vector = _0xee61ba[0x1];
                _0x16efc0.anysend(_0x3aa08d);
              })["catch"](errorlog);
            } else {
              _0x16efc0.anysend(_0x3aa08d);
            }
          })["catch"](errorlog);
        })["catch"](errorlog);
      };
      _0x16efc0.sendKeyFrameScenes = function () {
        for (var _0xadce95 in _0x16efc0.pcs) {
          if (_0x16efc0.pcs[_0xadce95].scene !== false) {
            _0x16efc0.forcePLI(_0xadce95);
            log("FORCE KEYFRAME FOR SCENE");
          } else {
            log("Not a scene");
          }
        }
      };
      _0x16efc0.closePC = function (_0x2f9b7b, _0x174f77 = true) {
        log("closePC");
        if (!(_0x2f9b7b in _0x16efc0.pcs)) {
          return;
        }
        clearTimeout(_0x16efc0.pcs[_0x2f9b7b].iceTimer);
        clearTimeout(_0x16efc0.pcs[_0x2f9b7b].closeTimeout);
        clearInterval(_0x16efc0.pcs[_0x2f9b7b].requestedStatsInterval);
        pokeIframeAPI('push-connection', false, _0x2f9b7b);
        if ("realUUID" in _0x16efc0.pcs[_0x2f9b7b]) {
          delete _0x16efc0.pcs[_0x2f9b7b];
          applySceneState();
          return;
        }
        if (_0x2f9b7b + "_screen" in _0x16efc0.pcs && _0x16efc0.pcs[_0x2f9b7b + '_screen'].realUUID && _0x16efc0.pcs[_0x2f9b7b + "_screen"].realUUID === _0x2f9b7b) {
          clearTimeout(_0x16efc0.pcs[_0x2f9b7b + "_screen"].iceTimer);
          clearTimeout(_0x16efc0.pcs[_0x2f9b7b + "_screen"].closeTimeout);
          clearInterval(_0x16efc0.pcs[_0x2f9b7b + "_screen"].requestedStatsInterval);
          _0x16efc0.pcs[_0x2f9b7b + "_screen"] = null;
          delete _0x16efc0.pcs[_0x2f9b7b + '_screen'];
        }
        try {
          _0x16efc0.sendMessage({
            'bye': true
          }, _0x2f9b7b);
        } catch (_0x27a8ef) {}
        try {
          _0x16efc0.pcs[_0x2f9b7b].close();
        } catch (_0x1fd592) {}
        if (_0x16efc0.pcs[_0x2f9b7b].guest) {
          if (_0x16efc0.beepToNotify) {
            if (_0x174f77) {
              warnlog("WHY ARE YOU GOD DAMN BEEPING");
              playtone(false, "leavetone");
            }
          }
        }
        _0x16efc0.pcs[_0x2f9b7b] = null;
        if (_0x16efc0.security) {
          if (!_0x16efc0.cleanOutput) {
            setTimeout(function _0x1c7514() {
              warnUser("Remote peer disconnected. Due to enhanced security, please refresh to create a new connection.");
            }, 0x1);
          }
        }
        delete _0x16efc0.pcs[_0x2f9b7b];
        _0x16efc0.applySoloChat();
        applySceneState();
      };
      _0x16efc0.closeRPC = function (_0x388a70, _0xf122f1 = false) {
        if (!(_0x388a70 in _0x16efc0.rpcs)) {
          log("UUID not found; cant' close");
          return;
        }
        warnlog("closeRPC");
        clearInterval(_0x16efc0.rpcs[_0x388a70].closeTimeout);
        try {
          _0x16efc0.sendRequest({
            'bye': true
          }, _0x388a70);
          warnlog("SEND BYE");
        } catch (_0x9528e9) {}
        try {
          var _0x5826b8 = _0x16efc0.rpcs[_0x388a70].streamID;
        } catch (_0x5315ff) {}
        try {
          _0x16efc0.rpcs[_0x388a70].close();
        } catch (_0x43cb98) {
          warnlog("already closed PCS");
        }
        try {
          if (_0x16efc0.rpcs[_0x388a70].streamSrc) {
            _0x16efc0.rpcs[_0x388a70].streamSrc.getTracks().forEach(function (_0x13c045) {
              _0x13c045.stop();
              log("Track stopped");
            });
          }
        } catch (_0x4080ab) {}
        if (_0x16efc0.director) {
          try {
            if (_0x16efc0.rpcs[_0x388a70].videoElement && 'recorder' in _0x16efc0.rpcs[_0x388a70].videoElement) {
              _0x16efc0.rpcs[_0x388a70].videoElement.recorder.stop();
            }
          } catch (_0x5d5be3) {
            warnlog(_0x5d5be3);
          }
        } else if (!_0x16efc0.roomid) {
          if (_0x16efc0.beepToNotify) {
            playtone(false, "leavetone");
          }
        }
        try {
          if (document.getElementById("container_" + _0x388a70)) {
            if (!_0x16efc0.syncState) {
              _0x16efc0.syncState = {};
            }
            if (_0x5826b8) {
              _0x16efc0.syncState[_0x5826b8] = getDetailedState(_0x5826b8);
            }
            getById('container_' + _0x388a70).parentNode.removeChild(getById('container_' + _0x388a70));
            updateLockedElements();
          }
        } catch (_0x498e23) {
          warnlog(_0x498e23);
        }
        try {
          if (_0x16efc0.rpcs[_0x388a70].videoElement) {
            _0x16efc0.rpcs[_0x388a70].videoElement.remove();
          }
        } catch (_0x186ebd) {}
        try {
          if (_0x16efc0.broadcast !== false) {
            if (_0x16efc0.rpcs[_0x388a70].iframeEle) {
              try {
                _0x16efc0.rpcs[_0x388a70].iframeEle.remove();
              } catch (_0x33731f) {
                errorlog(_0x33731f);
              }
              _0x16efc0.rpcs[_0x388a70].iframeEle.remove();
            }
          }
        } catch (_0xf0f83d) {}
        try {
          if (_0x16efc0.rpcs[_0x388a70].canvas) {
            _0x16efc0.rpcs[_0x388a70].canvas.remove();
          }
        } catch (_0x3b2b53) {}
        try {
          if (_0x16efc0.rpcs[_0x388a70].imageElement) {
            _0x16efc0.rpcs[_0x388a70].imageElement.remove();
          }
        } catch (_0xfa509f) {}
        if ('eventPlayActive' in _0x16efc0.rpcs[_0x388a70]) {
          clearInterval(_0x16efc0.rpcs[_0x388a70].eventPlayActive);
        }
        pokeIframeAPI("view-connection", false, _0x388a70);
        pokeAPI("endViewConnection", _0x16efc0.rpcs[_0x388a70].streamID);
        if (_0x16efc0.rpcs[_0x388a70].whip) {
          _0x5826b8 = false;
        }
        try {
          _0x16efc0.rpcs[_0x388a70] = null;
          delete _0x16efc0.rpcs[_0x388a70];
        } catch (_0xe31bb3) {}
        try {
          _0x16efc0.closeRPC(_0x388a70 + "_screen");
        } catch (_0x5ac119) {}
        if (!_0x16efc0.director || _0x16efc0.switchMode) {
          setTimeout(function () {
            updateMixer();
          }, 0x1);
        }
        if (typeof _0x5826b8 == 'undefined') {
          return;
        }
        try {
          warnlog("Should we ask to play the stream Again?");
          if (_0x5826b8) {
            if (_0x5826b8 in _0x16efc0.watchTimeoutList) {
              log('watchTimeoutList:' + _0x5826b8);
              clearTimeout(_0x16efc0.watchTimeoutList[_0x5826b8]);
              delete _0x16efc0.watchTimeoutList[_0x5826b8];
            }
            _0x16efc0.watchTimeoutList[_0x5826b8] = setTimeout(function (_0x207682) {
              try {
                delete _0x16efc0.watchTimeoutList[_0x207682];
              } catch (_0x50843b) {
                warnlog("session.watchTimeoutList no longer exists; won't retry.");
                return;
              }
              log('watchTimeoutList2:' + _0x207682);
              try {
                for (var _0xeb2e42 in _0x16efc0.rpcs) {
                  if (_0x16efc0.rpcs[_0xeb2e42].streamID === _0x207682) {
                    if (_0x16efc0.rpcs[_0xeb2e42].connectionState === "connected") {
                      warnlog(" --- we will not ask again; we're already connected");
                      return;
                    }
                  }
                }
              } catch (_0xc07821) {
                errorlog(_0xc07821);
              }
              warnlog(" --- we will ask again");
              _0x16efc0.watchStream(_0x207682);
            }, _0x16efc0.retryTimeout, _0x5826b8);
          }
        } catch (_0xe61364) {
          errorlog(_0xe61364);
        }
        pokeIframeAPI("new-view-connection", false, _0x388a70);
        if (_0x5826b8 !== null) {
          pokeIframeAPI("end-view-connection", _0x5826b8, _0x388a70);
        } else {
          pokeIframeAPI("end-view-connection", true, _0x388a70);
        }
        updateUserList();
      };
      _0x16efc0.forceRetryTimeout = null;
      _0x16efc0.retryWatchInterval = function () {
        var _0x442709 = false;
        if (_0x16efc0.view) {
          if (_0x16efc0.forceRetry) {
            clearTimeout(_0x16efc0.forceRetryTimeout);
          }
          if (_0x16efc0.ws === null || typeof _0x16efc0.ws !== "object" || _0x16efc0.ws.readyState !== 0x1) {} else {
            var _0x2543a4 = _0x16efc0.view.split(',');
            for (var _0x11abc8 in _0x2543a4) {
              if (_0x2543a4[_0x11abc8]) {
                var _0xdc3fa9 = false;
                for (var _0x20354d in _0x16efc0.rpcs) {
                  if (_0x16efc0.rpcs[_0x20354d].streamID && _0x16efc0.rpcs[_0x20354d].streamID === _0x2543a4[_0x11abc8]) {
                    _0xdc3fa9 = true;
                    break;
                  }
                }
                if (_0x2543a4[_0x11abc8] in _0x16efc0.watchTimeoutList) {
                  _0xdc3fa9 = true;
                }
                if (_0xdc3fa9) {
                  continue;
                }
                _0x16efc0.watchStream(_0x2543a4[_0x11abc8]);
                _0x442709 = true;
              }
            }
          }
          if (_0x16efc0.forceRetry && _0x16efc0.forceRetry < 0xa) {
            _0x16efc0.forceRetry = 0xa;
          }
          if (_0x16efc0.forceRetry) {
            _0x16efc0.forceRetryTimeout = setTimeout(function () {
              log("retrying at an interval");
              _0x16efc0.retryWatchInterval();
            }, _0x16efc0.forceRetry * 0x3e8);
          }
        }
        return _0x442709;
      };
      _0x16efc0.offerSDP = async function (_0x536e16) {
        if (_0x536e16 in _0x16efc0.pcs) {
          if (_0x16efc0.pcs[_0x536e16].connectionState === "failed" || _0x16efc0.pcs[_0x536e16].connectionState === "closed") {
            log("closing 6");
            _0x16efc0.closePC(_0x536e16);
            warnlog("cleaning up lost connection");
          } else {
            if (iPad || iOS) {
              log("closing 7");
              _0x16efc0.closePC(_0x536e16);
              warnlog("cleaning up lost connection -- disconnected - iOS specific");
            } else {
              warnlog("The other end is just being a keener. Ignore it: " + _0x16efc0.pcs[_0x536e16].connectionState);
              return;
            }
          }
        } else {
          log("Create a new RTC connection; offering SDP on request");
        }
        if (_0x16efc0.maxviewers !== false) {
          if (Object.keys(_0x16efc0.pcs).length > _0x16efc0.maxviewers) {
            log("closing 1");
            log("closing 8");
            _0x16efc0.closePC(_0x536e16);
            return;
          }
        } else {
          if (_0x16efc0.maxconnections !== false) {
            if (Object.keys(_0x16efc0.rpcs).length + Object.keys(_0x16efc0.pcs).length > _0x16efc0.maxconnections) {
              log("closing 2");
              log("closing 9");
              _0x16efc0.closePC(_0x536e16);
              return;
            }
          }
        }
        if (!_0x16efc0.configuration) {
          await chooseBestTURN();
        }
        if (_0x16efc0.encodedInsertableStreams) {
          _0x16efc0.configuration.encodedInsertableStreams = true;
        }
        if (_0x16efc0.bundlePolicy) {
          _0x16efc0.configuration.BundlePolicy = _0x16efc0.bundlePolicy;
        }
        try {
          _0x16efc0.pcs[_0x536e16] = new RTCPeerConnection(_0x16efc0.configuration);
        } catch (_0x25e748) {
          if (!_0x16efc0.cleanOutput) {
            warnUser("An RTC error occured");
          }
          console.error(_0x25e748);
          return;
        }
        if (_0x16efc0.security) {
          if (Object.keys(_0x16efc0.pcs).length > 0x1) {
            log("closing 3");
            log("closing 10");
            _0x16efc0.closePC(_0x536e16);
            return;
          }
        }
        _0x16efc0.pcs[_0x536e16].stats = {};
        _0x16efc0.pcs[_0x536e16].session = _0x16efc0.loadoutID + _0x16efc0.generateStreamID(0x5);
        _0x16efc0.pcs[_0x536e16].sceneDisplay = null;
        _0x16efc0.pcs[_0x536e16].sceneMute = null;
        _0x16efc0.pcs[_0x536e16].obsState = {};
        _0x16efc0.pcs[_0x536e16].obsState.visibility = null;
        _0x16efc0.pcs[_0x536e16].obsState.sourceActive = null;
        _0x16efc0.pcs[_0x536e16].obsState.streaming = null;
        _0x16efc0.pcs[_0x536e16].obsState.recording = null;
        _0x16efc0.pcs[_0x536e16].obsState.virtualcam = null;
        _0x16efc0.pcs[_0x536e16].optimizedBitrate = false;
        _0x16efc0.pcs[_0x536e16].savedBitrate = false;
        _0x16efc0.pcs[_0x536e16].solo = null;
        _0x16efc0.pcs[_0x536e16].layout = null;
        _0x16efc0.pcs[_0x536e16].bitrateTimeout = null;
        _0x16efc0.pcs[_0x536e16].maxBandwidth = null;
        _0x16efc0.pcs[_0x536e16].audioMutedOverride = false;
        _0x16efc0.pcs[_0x536e16].bitrateTimeoutFirefox = false;
        _0x16efc0.pcs[_0x536e16].coDirector = false;
        _0x16efc0.pcs[_0x536e16].setBitrate = false;
        _0x16efc0.pcs[_0x536e16].setAudioBitrate = false;
        _0x16efc0.pcs[_0x536e16].guest = false;
        _0x16efc0.pcs[_0x536e16].limitAudio = false;
        _0x16efc0.pcs[_0x536e16].enhanceAudio = false;
        _0x16efc0.pcs[_0x536e16].degradationPreference = false;
        _0x16efc0.pcs[_0x536e16].encoder = null;
        _0x16efc0.pcs[_0x536e16].forceios = false;
        _0x16efc0.pcs[_0x536e16].allowVideo = false;
        _0x16efc0.pcs[_0x536e16].allowAudio = false;
        _0x16efc0.pcs[_0x536e16].allowIframe = false;
        _0x16efc0.pcs[_0x536e16].allowWidget = false;
        _0x16efc0.pcs[_0x536e16].allowChunked = false;
        _0x16efc0.pcs[_0x536e16].allowWebp = false;
        _0x16efc0.pcs[_0x536e16].allowDownloads = false;
        _0x16efc0.pcs[_0x536e16].allowMIDI = false;
        _0x16efc0.pcs[_0x536e16].allowBroadcast = false;
        _0x16efc0.pcs[_0x536e16].allowScreenVideo = false;
        _0x16efc0.pcs[_0x536e16].allowScreenAudio = false;
        _0x16efc0.pcs[_0x536e16].meshcast = null;
        _0x16efc0.pcs[_0x536e16].UUID = _0x536e16;
        _0x16efc0.pcs[_0x536e16].scale = false;
        _0x16efc0.pcs[_0x536e16].scaleDueToBitrate = false;
        _0x16efc0.pcs[_0x536e16].scaleWidth = false;
        _0x16efc0.pcs[_0x536e16].scaleHeight = false;
        _0x16efc0.pcs[_0x536e16].scaleSnap = false;
        _0x16efc0.pcs[_0x536e16].cover = false;
        _0x16efc0.pcs[_0x536e16].scaleResolution = false;
        _0x16efc0.pcs[_0x536e16].showDirector = null;
        _0x16efc0.pcs[_0x536e16].scene = false;
        _0x16efc0.pcs[_0x536e16].keyframeRate = false;
        _0x16efc0.pcs[_0x536e16].keyframeTimeout = null;
        _0x16efc0.pcs[_0x536e16].label = false;
        _0x16efc0.pcs[_0x536e16].order = false;
        _0x16efc0.pcs[_0x536e16].preferVideoCodec = false;
        _0x16efc0.pcs[_0x536e16].preferAudioCodec = false;
        _0x16efc0.pcs[_0x536e16].closeTimeout = null;
        _0x16efc0.pcs[_0x536e16].wssid = _0x16efc0.wssid;
        _0x16efc0.pcs[_0x536e16].startTime = Date.now();
        function _0x4420dc(_0x296dc1 = false) {
          if (_0x296dc1) {
            return;
          }
          _0x16efc0.pcs[_0x536e16].sendChannel = _0x16efc0.pcs[_0x536e16].createDataChannel("sendChannel");
          _0x16efc0.pcs[_0x536e16].sendChannel.UUID = _0x536e16;
          _0x16efc0.pcs[_0x536e16].sendChannel.onopen = () => {
            if (_0x296dc1) {
              return;
            }
            log("send channel open pcs");
            msg = {};
            msg.info = {};
            msg.info.label = _0x16efc0.label;
            msg.info.order = _0x16efc0.order;
            msg.info.muted = _0x16efc0.muted;
            try {
              if (_0x16efc0.group.length || _0x16efc0.allowNoGroup) {
                msg.info.initial_group = _0x16efc0.group.join(',');
              }
            } catch (_0x43aa90) {}
            msg.info.directorSpeakerMuted = _0x16efc0.directorSpeakerMuted;
            msg.info.directorDisplayMuted = _0x16efc0.directorDisplayMuted;
            msg.info.directorVideoMuted = _0x16efc0.directorVideoMuted;
            msg.info.directorMirror = _0x16efc0.permaMirrored;
            msg.info.video_muted_init = _0x16efc0.videoMuted;
            if (_0x16efc0.roomid) {
              msg.info.room_init = true;
            } else {
              msg.info.room_init = false;
            }
            if (_0x16efc0.director) {
              if (!_0x16efc0.mainDirectorPassword && _0x16efc0.directorUUID && _0x16efc0.directorUUID === _0x536e16) {
                _0x16efc0.newMainDirectorSetup();
              } else {
                msg.directorSettings = {};
                if (_0x16efc0.mainDirectorPassword) {
                  msg.directorSettings.tokenDirector = true;
                }
                msg.directorSettings.totalRoomBitrate = _0x16efc0.totalRoomBitrate;
                if (_0x16efc0.soloChatUUID.length && !_0x16efc0.soloChatUUID.includes(_0x536e16)) {
                  msg.info.muted = true;
                }
                var _0x5e9dd0 = [];
                for (var _0x317fe4 in _0x16efc0.pcs) {
                  if (_0x16efc0.pcs[_0x317fe4].coDirector === true) {
                    _0x5e9dd0.push(_0x317fe4);
                  }
                }
                if (_0x16efc0.directorBlindAllGuests) {
                  msg.directorSettings.blindAllGuests = true;
                }
                if (_0x5e9dd0.length) {
                  msg.directorSettings.addCoDirector = _0x5e9dd0;
                }
              }
              if (_0x16efc0.autoSyncObject) {
                msg.info.autoSync = _0x16efc0.autoSyncObject;
              }
            }
            if (_0x16efc0.broadcast !== false) {
              msg.info.broadcast_mode = true;
            } else {
              msg.info.broadcast_mode = false;
            }
            if (_0x16efc0.remote) {
              msg.info.remote = true;
            } else {
              msg.info.remote = false;
            }
            if (_0x16efc0.obsControls) {
              msg.info.obs_control = _0x16efc0.obsControls;
            } else {
              if (_0x16efc0.obsControls === false) {
                msg.info.obs_control = false;
              } else if (_0x16efc0.roomid && !_0x16efc0.director) {
                msg.info.obs_control = false;
              } else {
                msg.info.obs_control = null;
              }
            }
            if (_0x16efc0.consent) {
              msg.info.consent = true;
            }
            msg.info.screenshare_url = _0x16efc0.screenshare;
            if (_0x16efc0.notifyScreenShare && !_0x16efc0.screenStream) {
              msg.info.screenShareState = _0x16efc0.screenShareState;
            } else {
              msg.info.screenShareState = false;
            }
            msg.info.width_url = _0x16efc0.width;
            msg.info.height_url = _0x16efc0.height;
            try {
              if (_0x16efc0.streamSrc) {
                let _0x33e88d = _0x16efc0.streamSrc.getVideoTracks();
                if (_0x33e88d.length) {
                  let _0x25177 = _0x33e88d[0x0].getSettings();
                  msg.info.video_init_width = _0x25177.width || false;
                  msg.info.video_init_height = _0x25177.height || false;
                  msg.info.video_init_frameRate = parseInt(_0x25177.frameRate) || false;
                }
              }
              if (_0x16efc0.screenStream && _0x16efc0.screenStream.srcObject) {
                let _0x593c92 = _0x16efc0.screenStream.srcObject.getVideoTracks();
                if (_0x593c92.length) {
                  let _0x5c25ad = _0x593c92[0x0].getSettings();
                  msg.info.video_2_init_width = _0x5c25ad.width || false;
                  msg.info.video_2_init_height = _0x5c25ad.height || false;
                  msg.info.video_2_init_frameRate = parseInt(_0x5c25ad.frameRate) || false;
                }
              }
            } catch (_0x50bf61) {
              errorlog(_0x50bf61);
            }
            msg.info.quality_url = _0x16efc0.quality;
            msg.info.maxvb_url = _0x16efc0.maxvideobitrate;
            msg.info.maxviewers_url = _0x16efc0.maxviewers;
            msg.info.stereo_url = _0x16efc0.stereo;
            msg.info.aec_url = _0x16efc0.echoCancellation;
            msg.info.agc_url = _0x16efc0.autoGainControl;
            msg.info.denoise_url = _0x16efc0.noiseSuppression;
            msg.info.version = _0x16efc0.version;
            msg.info.recording_audio_gain = _0x16efc0.audioGain;
            msg.info.recording_audio_compressor_type = _0x16efc0.compressor;
            msg.info.recording_audio_mic_delay = _0x16efc0.micDelay;
            msg.info.recording_audio_ctx_latency = _0x16efc0.audioLatency;
            msg.info.recording_audio_pipeline = !_0x16efc0.disableWebAudio;
            msg.info.playback_audio_pipeline = _0x16efc0.audioEffects;
            msg.info.playback_audio_samplerate = _0x16efc0.sampleRate;
            msg.info.playback_audio_volume_meter = _0x16efc0.audioMeterGuest;
            if (_0x16efc0.stats.network_type) {
              msg.info.conn_type = _0x16efc0.stats.network_type;
            }
            if (_0x16efc0.forceRotate !== false) {
              if (_0x16efc0.rotate) {
                msg.info.rotate_video = _0x16efc0.forceRotate + parseInt(_0x16efc0.rotate);
              } else {
                msg.info.rotate_video = _0x16efc0.forceRotate;
              }
            } else {
              msg.info.rotate_video = _0x16efc0.rotate;
            }
            if (msg.info.rotate_video && msg.info.rotate_video >= 0x168) {
              msg.info.rotate_video -= 0x168;
            }
            try {
              if (navigator && navigator.userAgent) {
                msg.info.useragent = navigator.userAgent;
              }
              if (navigator && navigator.platform) {
                msg.info.platform = navigator.platform;
              }
              if (gpgpuSupport) {
                msg.info.gpGPU = gpgpuSupport;
              }
              if (cpuSupport) {
                msg.info.CPU = cpuSupport;
              }
              if (iOS) {
                msg.info.iPhone12Up = iPhone12Up;
              }
              if (SafariVersion) {
                msg.info.Browser = "Safari " + SafariVersion;
              } else {
                if (getChromeVersion() > 0x3c) {
                  msg.info.Browser = "Chromium-based v" + getChromeVersion();
                } else {
                  if (userAgent.indexOf('Firefox') >= 0x0) {
                    msg.info.Browser = 'Firefox';
                  } else if (userAgent.indexOf("CriOS") >= 0x0) {
                    msg.info.Browser = "Chrome for iOS";
                  } else {
                    msg.info.Browser = "Unknown";
                  }
                }
              }
            } catch (_0x1e0f68) {}
            ;
            if (_0x16efc0.batteryState) {
              if ("level" in _0x16efc0.batteryState) {
                if (typeof _0x16efc0.batteryState.level == 'number') {
                  msg.info.power_level = parseInt(_0x16efc0.batteryState.level * 0x64);
                } else {
                  msg.info.power_level = _0x16efc0.batteryState.level;
                }
              }
              if ('charging' in _0x16efc0.batteryState) {
                msg.info.plugged_in = _0x16efc0.batteryState.charging;
              }
            }
            if (_0x16efc0.cpuLimited) {
              msg.info.cpuLimited = _0x16efc0.cpuLimited;
            }
            try {
              if (_0x16efc0.info.out) {
                msg.miniInfo = {};
                msg.miniInfo.out = {};
                msg.miniInfo.out.c = _0x16efc0.info.out.c;
              }
            } catch (_0x2489cb) {}
            _0x16efc0.sendMessage(msg, _0x536e16);
            pokeIframeAPI("new-push-connection", true, _0x536e16);
            pokeIframeAPI("push-connection", true, _0x536e16);
            updateUserList();
          };
          _0x16efc0.pcs[_0x536e16].sendChannel.onclose = () => {
            pokeIframeAPI("new-push-connection", false, _0x536e16);
            _0x16efc0.ping();
            warnlog("send channel closed");
            return;
          };
          _0x16efc0.pcs[_0x536e16].sendChannel.onmessage = async function (_0x279153) {
            log("received data from viewer");
            try {
              var _0x517ffc = JSON.parse(_0x279153.data);
            } catch (_0x14028d) {
              warnlog("Couldn't parse JSON; will attempt as ArrayBuffer UINT8ARRAY");
              log(_0x279153.data);
              try {
                var _0x2c0f40 = new TextDecoder().decode(_0x279153.data);
                var _0x517ffc = JSON.parse(_0x2c0f40);
              } catch (_0x19f113) {
                try {
                  var _0x517ffc = await new Response(_0x279153.data).text();
                  _0x517ffc = JSON.parse(_0x517ffc);
                } catch (_0x651c51) {
                  return;
                }
              }
            }
            warnlog(_0x517ffc);
            if ("remote" in _0x517ffc) {
              try {
                _0x517ffc = await _0x16efc0.decodeRemote(_0x517ffc);
                if (!_0x517ffc) {
                  return;
                }
              } catch (_0x214bf6) {
                errorlor(_0x214bf6);
              }
            }
            if ('altUUID' in _0x517ffc) {
              await _0x16efc0.processPCSOnMessage(_0x517ffc, _0x536e16 + "_screen");
            } else {
              await _0x16efc0.processPCSOnMessage(_0x517ffc, _0x536e16);
            }
          };
        }
        _0x4420dc(false);
        _0x16efc0.pcs[_0x536e16].ondatachannel = function (_0x25fd80) {
          warnlog("data channel being used in reverse; this shouldn't really happen, except if maybe doing a file transfer");
          warnlog(_0x25fd80);
          if (_0x25fd80.channel.label && _0x25fd80.channel.label !== "sendChannel") {
            _0x16efc0.recieveFile(_0x16efc0.rpcs, _0x536e16, _0x25fd80.channel);
            return;
          }
        };
        _0x16efc0.pcs[_0x536e16].onnegotiationneeded = function (_0x38b867) {
          log("onnegotiationneeded triggered; creating offer");
          _0x16efc0.createOffer(_0x536e16);
        };
        _0x16efc0.pcs[_0x536e16].ontrack = _0x5161fc => {
          errorlog("Publisher is being sent a video stream??? NOT EXPECTED!");
        };
        _0x16efc0.pcs[_0x536e16].iceTimer = null;
        _0x16efc0.pcs[_0x536e16].iceBundle = [];
        _0x16efc0.pcs[_0x536e16].onicecandidate = function (_0x3d1348) {
          if (_0x3d1348.candidate == null) {
            log("empty ice..");
            return;
          }
          log(_0x3d1348);
          try {
            if (_0x16efc0.icefilter) {
              if (_0x3d1348.candidate.candidate.indexOf(_0x16efc0.icefilter) === -0x1) {
                log("dropped candidate due to filter");
                return;
              } else {
                log(_0x3d1348.candidate);
              }
            }
          } catch (_0x1269ab) {
            errorlog(_0x1269ab);
          }
          if (_0x16efc0.pcs[_0x536e16].iceTimer !== null) {
            _0x16efc0.pcs[_0x536e16].iceBundle.push(_0x3d1348.candidate);
            return;
          }
          _0x16efc0.pcs[_0x536e16].iceBundle.push(_0x3d1348.candidate);
          _0x16efc0.pcs[_0x536e16].iceTimer = setTimeout(function (_0x356498) {
            try {
              _0x16efc0.pcs[_0x356498].iceTimer = null;
            } catch (_0x41eb1d) {
              warnlog("ice timer no longer exists");
              return;
            }
            var _0xb52258 = {
              UUID: _0x356498,
              "type": "local",
              "candidates": _0x16efc0.pcs[_0x356498].iceBundle,
              session: _0x16efc0.pcs[_0x356498].session
            };
            _0x16efc0.pcs[_0x356498].iceBundle = [];
            if (_0x16efc0.password) {
              _0x16efc0.encryptMessage(JSON.stringify(_0xb52258.candidates)).then(function (_0x141930) {
                _0xb52258.candidates = _0x141930[0x0];
                _0xb52258.vector = _0x141930[0x1];
                _0x16efc0.anysend(_0xb52258);
              })["catch"](errorlog);
            } else {
              _0x16efc0.anysend(_0xb52258);
            }
          }, 0xc8, _0x536e16);
        };
        _0x16efc0.processPCSOnMessage = async function (_0x1a8424, _0x599e63) {
          _0x1a8424.UUID = _0x599e63;
          if (_0x1a8424.description) {
            _0x16efc0.processDescription(_0x1a8424);
            return;
          } else {
            if (_0x1a8424.candidate) {
              log("GOT ICE!!");
              _0x16efc0.processIce(_0x1a8424);
              return;
            } else {
              if (_0x1a8424.candidates) {
                log("GOT ICEs!!");
                _0x16efc0.processIceBundle(_0x1a8424);
                return;
              } else {
                if ("ping" in _0x1a8424) {
                  var _0x3700bf = {};
                  _0x3700bf.pong = _0x1a8424.ping;
                  _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                  warnlog("PINGED");
                  return;
                } else {
                  if ("pong" in _0x1a8424) {
                    warnlog('PONGED');
                    return;
                  } else {
                    if ("bye" in _0x1a8424) {
                      warnlog("BYE");
                      log("closing 12");
                      _0x16efc0.closePC(_0x599e63);
                      return;
                    }
                  }
                }
              }
            }
          }
          if (_0x16efc0.director) {
            if ("requestCoDirector" in _0x1a8424 && 'vector' in _0x1a8424) {
              if (_0x16efc0.directorPassword) {
                if (_0x16efc0.directorHash) {
                  _0x16efc0.decryptMessage(_0x1a8424.requestCoDirector, _0x1a8424.vector, _0x16efc0.directorHash).then(function (_0x11f7bf) {
                    if (_0x11f7bf === _0x16efc0.directorHash) {
                      _0x16efc0.pcs[_0x599e63].coDirector = true;
                      _0x16efc0.directorList.push(_0x599e63);
                      getById("container_" + _0x599e63).classList.add('directorBlue');
                      _0x16efc0.announceCoDirector(_0x599e63);
                      var _0x581d48 = {};
                      _0x581d48.approved = 'requestCoDirector';
                      _0x16efc0.sendMessage(_0x581d48, _0x599e63);
                    } else {
                      warnlog("codirector request hash failed");
                      var _0x581d48 = {};
                      _0x581d48.rejected = "requestCoDirector";
                      _0x16efc0.sendMessage(_0x581d48, _0x599e63);
                    }
                  })["catch"](function () {
                    warnlog("Failed attempt to connect as co-director");
                    var _0x38a714 = {
                      "rejected": "requestCoDirector"
                    };
                    _0x16efc0.sendMessage(_0x38a714, _0x599e63);
                  });
                } else {
                  generateHash(_0x16efc0.directorPassword + _0x16efc0.salt + "abc123", 0xc).then(function (_0x107491) {
                    _0x16efc0.directorHash = _0x107491;
                    _0x16efc0.decryptMessage(_0x1a8424.requestCoDirector, _0x1a8424.vector, _0x16efc0.directorHash).then(function (_0xede0aa) {
                      if (_0xede0aa === _0x16efc0.directorHash) {
                        _0x16efc0.pcs[_0x599e63].coDirector = true;
                        _0x16efc0.directorList.push(_0x599e63);
                        getById("container_" + _0x599e63).classList.add("directorBlue");
                        _0x16efc0.announceCoDirector(_0x599e63);
                        var _0x109bdb = {};
                        _0x109bdb.approved = 'requestCoDirector';
                        _0x16efc0.sendRequest(_0x109bdb, _0x599e63);
                      } else {
                        warnlog("codirector request hash failed");
                        var _0x109bdb = {};
                        _0x109bdb.rejected = "requestCoDirector";
                        _0x16efc0.sendRequest(_0x109bdb, _0x599e63);
                      }
                    })["catch"](function () {
                      warnlog("Failed attempt to connect as co-director");
                      var _0x19d06a = {
                        "rejected": "requestCoDirector"
                      };
                      _0x16efc0.sendRequest(_0x19d06a, _0x599e63);
                    });
                    return;
                  })["catch"](errorlog);
                }
              } else {
                warnlog("reject co");
                var _0x3700bf = {};
                _0x3700bf.rejected = "requestCoDirector";
                _0x16efc0.sendRequest(_0x3700bf, _0x599e63);
              }
            }
            if ("migrate" in _0x1a8424 && "roomid" in _0x1a8424) {
              log("Someone is trying to transfer a guest");
              if (_0x16efc0.codirector_transfer) {
                if (_0x599e63 in _0x16efc0.pcs && _0x16efc0.pcs[_0x599e63].coDirector === true) {
                  log("Valid co director trying to transfer a guest");
                  var _0x3700bf = {};
                  if (_0x1a8424.transferSettings && _0x1a8424.transferSettings.updateurl) {
                    _0x3700bf.request = "migrate";
                    _0x3700bf.transferSettings = _0x1a8424.transferSettings;
                    log(_0x3700bf);
                    if (_0x16efc0.sendRequest(_0x3700bf, _0x1a8424.migrate.toString())) {
                      var _0x3700bf = {};
                      _0x3700bf.request = "migrate";
                      _0x3700bf.roomid = _0x1a8424.roomid;
                      _0x3700bf.target = _0x1a8424.migrate.toString();
                      _0x16efc0.sendMsg(_0x3700bf);
                    }
                    log(_0x3700bf);
                  } else {
                    if (_0x1a8424.transferSettings && "broadcast" in _0x1a8424.transferSettings) {
                      _0x3700bf.request = "migrate";
                      _0x3700bf.transferSettings = _0x1a8424.transferSettings;
                      delete _0x3700bf.transferSettings.roomid;
                      delete _0x3700bf.transferSettings.roomenc;
                      log(_0x3700bf);
                      if (_0x16efc0.sendRequest(_0x3700bf, _0x1a8424.migrate.toString())) {
                        var _0x3700bf = {};
                        _0x3700bf.request = "migrate";
                        _0x3700bf.roomid = _0x1a8424.roomid;
                        _0x3700bf.target = _0x1a8424.migrate.toString();
                        _0x16efc0.sendMsg(_0x3700bf);
                      }
                      log(_0x3700bf);
                    } else {
                      _0x3700bf.request = 'migrate';
                      _0x3700bf.roomid = _0x1a8424.roomid;
                      _0x3700bf.target = _0x1a8424.migrate.toString();
                      _0x16efc0.sendMsg(_0x3700bf);
                    }
                  }
                  pokeIframeAPI("transfer", _0x1a8424.roomid, _0x1a8424.migrate.toString());
                }
              } else {
                var _0x3700bf = {};
                _0x3700bf.rejected = "requestCoMigrate";
                _0x16efc0.sendRequest(_0x3700bf, _0x599e63);
              }
            }
          }
          if ("requestAs" in _0x1a8424) {
            if (!_0x1a8424.UUID) {
              log("no UUID in msg");
              return;
            }
            var _0x5481af = _0x1a8424.requestAs;
            if (!_0x16efc0.pcs[_0x5481af]) {
              log("no pcs[UUID]");
              return;
            }
            if (_0x16efc0.directorList.indexOf(_0x5481af) >= 0x0) {
              var _0x3700bf = {};
              _0x3700bf.rejected = "requestAs";
              _0x16efc0.sendMessage(_0x3700bf, _0x1a8424.UUID);
              warnlog("Remote user is a director");
              return;
            }
            if (_0x16efc0.remote) {
              if ("remote" in _0x1a8424 && _0x1a8424.remote === _0x16efc0.remote && _0x16efc0.remote) {} else {
                if (_0x16efc0.remote === true) {}
              }
            } else {
              if (_0x16efc0.directorList.indexOf(_0x1a8424.UUID) >= 0x0) {} else {
                return;
              }
            }
            if ("targetBitrate" in _0x1a8424) {
              _0x16efc0.targetBitrate(_0x5481af, _0x1a8424.targetBitrate);
            }
            if ("targetAudioBitrate" in _0x1a8424) {
              _0x16efc0.targetAudioBitrate(_0x5481af, _0x1a8424.targetAudioBitrate);
            }
            if ('requestResolution' in _0x1a8424) {
              try {
                _0x16efc0.setResolution(_0x5481af, _0x1a8424.requestResolution.w, _0x1a8424.requestResolution.h, _0x1a8424.requestResolution.s, _0x1a8424.requestResolution.c);
              } catch (_0x23cb0e) {
                errorlog(_0x23cb0e);
              }
            }
            return;
          }
          manageSceneState(_0x1a8424, _0x599e63);
          try {
            if ("info" in _0x1a8424) {
              _0x16efc0.pcs[_0x599e63].stats.info = _0x1a8424.info;
              if ("label" in _0x1a8424.info) {
                if (typeof _0x1a8424.info.label == "string") {
                  _0x16efc0.pcs[_0x599e63].label = sanitizeLabel(_0x1a8424.info.label);
                } else {
                  _0x16efc0.pcs[_0x599e63].label = false;
                }
              }
              if (_0x599e63 === _0x16efc0.directorUUID) {
                try {
                  _0x16efc0.pcs[_0x599e63].stats.info.director = true;
                } catch (_0x4404b6) {}
              } else {
                if (_0x16efc0.directorList.indexOf(_0x599e63) >= 0x0) {
                  try {
                    _0x16efc0.pcs[_0x599e63].stats.info.coDirector = true;
                  } catch (_0x43752f) {}
                }
              }
              if (_0x16efc0.layouts && _0x16efc0.director && 'obs' in _0x1a8424.info && _0x1a8424.info.obs) {
                var _0x1639a4 = createSlotUpdate(_0x599e63);
                if (_0x16efc0.obsSceneTriggers) {
                  _0x16efc0.sendMessage({
                    'slotsUpdate': _0x1639a4,
                    'obsSceneTriggers': _0x16efc0.obsSceneTriggers,
                    'layouts': _0x16efc0.layouts
                  }, _0x599e63);
                } else {
                  _0x16efc0.sendMessage({
                    'slotsUpdate': _0x1639a4,
                    'layouts': _0x16efc0.layouts
                  }, _0x599e63);
                }
              }
              if (Firefox) {
                try {
                  if ("vb_url" in _0x1a8424.info) {
                    if (_0x16efc0.pcs[_0x599e63].savedBitrate === false) {
                      if (_0x1a8424.info.vb_url && parseInt(_0x1a8424.info.vb_url) > 0x0) {
                        _0x16efc0.pcs[_0x599e63].savedBitrate = parseInt(_0x1a8424.info.vb_url);
                        if (_0x16efc0.pcs[_0x599e63].bitrateTimeout) {
                          clearTimeout(_0x16efc0.pcs[_0x599e63].bitrateTimeout);
                        }
                        _0x16efc0.pcs[_0x599e63].bitrateTimeout = setTimeout(function (_0xbace29) {
                          _0x16efc0.limitBitrate(_0xbace29, null);
                        }, 0x3e8, _0x599e63);
                      }
                    }
                  }
                } catch (_0x572709) {
                  errorlog(_0x572709);
                }
              }
              pokeIframeAPI("push-connection-info", _0x1a8424.info, _0x599e63);
            }
            if ('ifs' in _0x1a8424) {
              if (_0x16efc0.iframeSrc) {
                try {
                  if (_0x16efc0.iframeSrc.startsWith("https://www.youtube.com/")) {
                    processIframeSyncFeedback(_0x1a8424.ifs, _0x599e63);
                  }
                } catch (_0x3cd9a7) {
                  errorlog(_0x3cd9a7);
                }
              }
            }
            if ('pipe' in _0x1a8424) {
              _0x16efc0.gotGenericData(_0x1a8424.pipe, _0x599e63);
            }
            if ("autoSync" in _0x1a8424) {
              _0x16efc0.autoSyncObject = _0x1a8424.autoSync;
              _0x16efc0.autoSyncCallback(_0x599e63);
            }
            if ("optimizedBitrate" in _0x1a8424) {
              _0x16efc0.pcs[_0x599e63].optimizedBitrate = parseInt(_0x1a8424.optimizedBitrate);
            }
            if ("audioBitrate" in _0x1a8424) {
              _0x16efc0.limitAudioBitrate(_0x599e63, _0x1a8424.audioBitrate);
            }
            if ('bitrate' in _0x1a8424) {
              _0x16efc0.limitBitrate(_0x599e63, _0x1a8424.bitrate);
            }
            if ("targetBitrate" in _0x1a8424) {
              _0x16efc0.targetBitrate(_0x599e63, _0x1a8424.targetBitrate);
            }
            if ("targetAudioBitrate" in _0x1a8424) {
              _0x16efc0.targetAudioBitrate(_0x599e63, _0x1a8424.targetAudioBitrate);
            }
            if ("hangup" in _0x1a8424) {
              if ("remote" in _0x1a8424) {
                if (_0x1a8424.remote === _0x16efc0.remote && _0x16efc0.remote || _0x16efc0.remote === true) {
                  _0x16efc0.hangup();
                  return;
                }
              }
            }
            if ("reload" in _0x1a8424) {
              if ("remote" in _0x1a8424) {
                if (_0x1a8424.remote === _0x16efc0.remote && _0x16efc0.remote || _0x16efc0.remote === true) {
                  _0x16efc0.hangup(true);
                  return;
                }
              }
            }
            if ('requestStats' in _0x1a8424) {
              if (_0x16efc0.directorList.indexOf(_0x599e63) >= 0x0) {
                var _0x3a6db2 = {};
                if (_0x16efc0.mc.stats) {
                  _0x3a6db2.meshcast = _0x16efc0.mc.stats;
                } else {
                  for (var _0x2df3d6 in _0x16efc0.pcs) {
                    if (_0x2df3d6 === _0x599e63) {
                      continue;
                    }
                    _0x3a6db2[_0x2df3d6] = _0x16efc0.pcs[_0x2df3d6].stats;
                  }
                }
                var _0x3700bf = {};
                _0x3700bf.remoteStats = _0x3a6db2;
                _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
              } else {
                if ("remote" in _0x1a8424) {
                  if (_0x1a8424.remote === _0x16efc0.remote && _0x16efc0.remote || _0x16efc0.remote === true) {
                    var _0x3a6db2 = {};
                    if (_0x16efc0.mc.stats) {
                      _0x3a6db2.meshcast = _0x16efc0.mc.stats;
                    } else {
                      for (var _0x2df3d6 in _0x16efc0.pcs) {
                        if (_0x2df3d6 === _0x599e63) {
                          continue;
                        }
                        _0x3a6db2[_0x2df3d6] = _0x16efc0.pcs[_0x2df3d6].stats;
                      }
                    }
                    var _0x3700bf = {};
                    _0x3700bf.remoteStats = _0x3a6db2;
                    _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                  }
                } else {
                  var _0x3a6db2 = {};
                  if (_0x16efc0.mc.stats) {
                    _0x3a6db2.meshcast = _0x16efc0.mc.stats;
                  } else {
                    for (var _0x2df3d6 in _0x16efc0.pcs) {
                      if (_0x2df3d6 === _0x599e63) {
                        continue;
                      }
                      if (!_0x16efc0.pcs[_0x2df3d6].stats) {
                        continue;
                      }
                      if (_0x16efc0.pcs[_0x2df3d6].guest) {
                        continue;
                      }
                      if (_0x16efc0.roomid) {
                        if ("scene" in _0x16efc0.pcs[_0x2df3d6].stats) {
                          if (_0x16efc0.pcs[_0x2df3d6].stats.scene === false) {
                            continue;
                          }
                        } else {
                          continue;
                        }
                      }
                      _0x3a6db2[_0x2df3d6] = {};
                      if (_0x16efc0.pcs[_0x2df3d6].stats.video_bitrate_kbps) {
                        _0x3a6db2[_0x2df3d6].video_bitrate_kbps = _0x16efc0.pcs[_0x2df3d6].stats.video_bitrate_kbps;
                      }
                      if (_0x16efc0.pcs[_0x2df3d6].stats.nacks_per_second) {
                        _0x3a6db2[_0x2df3d6].nacks_per_second = _0x16efc0.pcs[_0x2df3d6].stats.nacks_per_second;
                      }
                      if (_0x16efc0.pcs[_0x2df3d6].stats.available_outgoing_bitrate_kbps) {
                        _0x3a6db2[_0x2df3d6].available_outgoing_bitrate_kbps = _0x16efc0.pcs[_0x2df3d6].stats.available_outgoing_bitrate_kbps;
                      }
                      if (_0x16efc0.pcs[_0x2df3d6].stats.scene) {
                        _0x3a6db2[_0x2df3d6].scene = _0x16efc0.pcs[_0x2df3d6].stats.scene;
                      }
                      if (_0x16efc0.pcs[_0x2df3d6].label) {
                        _0x3a6db2[_0x2df3d6].label = _0x16efc0.pcs[_0x2df3d6].label;
                      }
                      if (_0x16efc0.pcs[_0x2df3d6].stats.resolution) {
                        _0x3a6db2[_0x2df3d6].resolution = _0x16efc0.pcs[_0x2df3d6].stats.resolution;
                      }
                      if (_0x16efc0.pcs[_0x2df3d6].stats.video_encoder) {
                        _0x3a6db2[_0x2df3d6].video_encoder = _0x16efc0.pcs[_0x2df3d6].stats.video_encoder;
                      }
                    }
                  }
                  var _0x3700bf = {};
                  _0x3700bf.remoteStats = _0x3a6db2;
                  _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                }
              }
            }
            if ("requestStatsContinuous" in _0x1a8424) {
              clearInterval(_0x16efc0.pcs[_0x599e63].requestedStatsInterval);
              if (_0x16efc0.directorList.indexOf(_0x599e63) >= 0x0) {
                if (_0x1a8424.requestStatsContinuous) {
                  _0x16efc0.pcs[_0x599e63].requestedStatsInterval = setInterval(function (_0x4e94ec) {
                    var _0x46f53e = {};
                    if (_0x16efc0.mc.stats) {
                      _0x46f53e.meshcast = _0x16efc0.mc.stats;
                    } else {
                      for (var _0x4cc2a3 in _0x16efc0.pcs) {
                        if (_0x4cc2a3 === _0x4e94ec) {
                          continue;
                        }
                        if (!_0x16efc0.pcs[_0x4cc2a3].stats) {
                          continue;
                        }
                        if (_0x16efc0.pcs[_0x4cc2a3].guest) {
                          continue;
                        }
                        _0x46f53e[_0x4cc2a3] = _0x16efc0.pcs[_0x4cc2a3].stats;
                      }
                    }
                    var _0x4aa742 = {
                      "remoteStats": _0x46f53e
                    };
                    _0x16efc0.sendMessage(_0x4aa742, _0x4e94ec);
                  }, 0xbb8, _0x599e63);
                  var _0x3a6db2 = {};
                  if (_0x16efc0.mc.stats) {
                    _0x3a6db2.meshcast = _0x16efc0.mc.stats;
                  } else {
                    for (var _0x2df3d6 in _0x16efc0.pcs) {
                      if (_0x2df3d6 === _0x599e63) {
                        continue;
                      }
                      if (!_0x16efc0.pcs[_0x2df3d6].stats) {
                        continue;
                      }
                      if (_0x16efc0.pcs[_0x2df3d6].guest) {
                        continue;
                      }
                      _0x3a6db2[_0x2df3d6] = _0x16efc0.pcs[_0x2df3d6].stats;
                    }
                  }
                  var _0x3700bf = {};
                  _0x3700bf.remoteStats = _0x3a6db2;
                  _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                }
              } else {
                if ("remote" in _0x1a8424) {
                  if (_0x1a8424.remote === _0x16efc0.remote && _0x16efc0.remote || _0x16efc0.remote === true) {
                    if (_0x1a8424.requestStatsContinuous) {
                      _0x16efc0.pcs[_0x599e63].requestedStatsInterval = setInterval(function (_0x3987bc) {
                        var _0x24d81e = {};
                        if (_0x16efc0.mc.stats) {
                          _0x24d81e.meshcast = _0x16efc0.mc.stats;
                        } else {
                          for (var _0x1c79fe in _0x16efc0.pcs) {
                            if (_0x1c79fe === _0x3987bc) {
                              continue;
                            }
                            if (!_0x16efc0.pcs[_0x1c79fe].stats) {
                              continue;
                            }
                            if (_0x16efc0.pcs[_0x1c79fe].guest) {
                              continue;
                            }
                            _0x24d81e[_0x1c79fe] = _0x16efc0.pcs[_0x1c79fe].stats;
                          }
                        }
                        var _0x39a633 = {
                          "remoteStats": _0x24d81e
                        };
                        _0x16efc0.sendMessage(_0x39a633, _0x3987bc);
                      }, 0xbb8, _0x599e63);
                      var _0x3a6db2 = {};
                      if (_0x16efc0.mc.stats) {
                        _0x3a6db2.meshcast = _0x16efc0.mc.stats;
                      } else {
                        for (var _0x2df3d6 in _0x16efc0.pcs) {
                          if (_0x2df3d6 === _0x599e63) {
                            continue;
                          }
                          if (!_0x16efc0.pcs[_0x2df3d6].stats) {
                            continue;
                          }
                          if (_0x16efc0.pcs[_0x2df3d6].guest) {
                            continue;
                          }
                          _0x3a6db2[_0x2df3d6] = _0x16efc0.pcs[_0x2df3d6].stats;
                        }
                      }
                      var _0x3700bf = {};
                      _0x3700bf.remoteStats = _0x3a6db2;
                      _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                    }
                  }
                } else {
                  if (_0x1a8424.requestStatsContinuous) {
                    _0x16efc0.pcs[_0x599e63].requestedStatsInterval = setInterval(function (_0x561bec) {
                      var _0x53c656 = {};
                      if (_0x16efc0.mc.stats) {
                        _0x53c656.meshcast = _0x16efc0.mc.stats;
                      } else {
                        for (var _0x2c102a in _0x16efc0.pcs) {
                          if (_0x2c102a === _0x561bec) {
                            continue;
                          }
                          if (!_0x16efc0.pcs[_0x2c102a].stats) {
                            continue;
                          }
                          if (_0x16efc0.pcs[_0x2c102a].guest) {
                            continue;
                          }
                          if (_0x16efc0.roomid) {
                            if ("scene" in _0x16efc0.pcs[_0x2c102a].stats) {
                              if (_0x16efc0.pcs[_0x2c102a].stats.scene === false) {
                                continue;
                              }
                            } else {
                              continue;
                            }
                          }
                          _0x53c656[_0x2c102a] = {};
                          if (_0x16efc0.pcs[_0x2c102a].stats.video_bitrate_kbps) {
                            _0x53c656[_0x2c102a].video_bitrate_kbps = _0x16efc0.pcs[_0x2c102a].stats.video_bitrate_kbps;
                          }
                          if (_0x16efc0.pcs[_0x2c102a].stats.nacks_per_second) {
                            _0x53c656[_0x2c102a].nacks_per_second = _0x16efc0.pcs[_0x2c102a].stats.nacks_per_second;
                          }
                          if (_0x16efc0.pcs[_0x2c102a].stats.available_outgoing_bitrate_kbps) {
                            _0x53c656[_0x2c102a].available_outgoing_bitrate_kbps = _0x16efc0.pcs[_0x2c102a].stats.available_outgoing_bitrate_kbps;
                          }
                          if (_0x16efc0.pcs[_0x2c102a].stats.scene) {
                            _0x53c656[_0x2c102a].scene = _0x16efc0.pcs[_0x2c102a].stats.scene;
                          }
                          if (_0x16efc0.pcs[_0x2c102a].label) {
                            _0x53c656[_0x2c102a].label = _0x16efc0.pcs[_0x2c102a].label;
                          }
                          if (_0x16efc0.pcs[_0x2c102a].stats.resolution) {
                            _0x53c656[_0x2c102a].resolution = _0x16efc0.pcs[_0x2c102a].stats.resolution;
                          }
                          if (_0x16efc0.pcs[_0x2c102a].stats.video_encoder) {
                            _0x53c656[_0x2c102a].video_encoder = _0x16efc0.pcs[_0x2c102a].stats.video_encoder;
                          }
                        }
                      }
                      var _0x3fb1e1 = {
                        "remoteStats": _0x53c656
                      };
                      _0x16efc0.sendMessage(_0x3fb1e1, _0x561bec);
                    }, 0xbb8, _0x599e63);
                    var _0x3a6db2 = {};
                    if (_0x16efc0.mc.stats) {
                      _0x3a6db2.meshcast = _0x16efc0.mc.stats;
                    } else {
                      for (var _0x2df3d6 in _0x16efc0.pcs) {
                        if (_0x2df3d6 === _0x599e63) {
                          continue;
                        }
                        if (!_0x16efc0.pcs[_0x2df3d6].stats) {
                          continue;
                        }
                        if (_0x16efc0.pcs[_0x2df3d6].guest) {
                          continue;
                        }
                        if (_0x16efc0.roomid) {
                          if ("scene" in _0x16efc0.pcs[_0x2df3d6].stats) {
                            if (_0x16efc0.pcs[_0x2df3d6].stats.scene === false) {
                              continue;
                            }
                          } else {
                            continue;
                          }
                        }
                        _0x3a6db2[_0x2df3d6] = {};
                        if (_0x16efc0.pcs[_0x2df3d6].stats.video_bitrate_kbps) {
                          _0x3a6db2[_0x2df3d6].video_bitrate_kbps = _0x16efc0.pcs[_0x2df3d6].stats.video_bitrate_kbps;
                        }
                        if (_0x16efc0.pcs[_0x2df3d6].stats.nacks_per_second) {
                          _0x3a6db2[_0x2df3d6].nacks_per_second = _0x16efc0.pcs[_0x2df3d6].stats.nacks_per_second;
                        }
                        if (_0x16efc0.pcs[_0x2df3d6].stats.available_outgoing_bitrate_kbps) {
                          _0x3a6db2[_0x2df3d6].available_outgoing_bitrate_kbps = _0x16efc0.pcs[_0x2df3d6].stats.available_outgoing_bitrate_kbps;
                        }
                        if (_0x16efc0.pcs[_0x2df3d6].stats.scene) {
                          _0x3a6db2[_0x2df3d6].scene = _0x16efc0.pcs[_0x2df3d6].stats.scene;
                        }
                        if (_0x16efc0.pcs[_0x2df3d6].label) {
                          _0x3a6db2[_0x2df3d6].label = _0x16efc0.pcs[_0x2df3d6].label;
                        }
                        if (_0x16efc0.pcs[_0x2df3d6].stats.resolution) {
                          _0x3a6db2[_0x2df3d6].resolution = _0x16efc0.pcs[_0x2df3d6].stats.resolution;
                        }
                        if (_0x16efc0.pcs[_0x2df3d6].stats.video_encoder) {
                          _0x3a6db2[_0x2df3d6].video_encoder = _0x16efc0.pcs[_0x2df3d6].stats.video_encoder;
                        }
                      }
                    }
                    var _0x3700bf = {};
                    _0x3700bf.remoteStats = _0x3a6db2;
                    _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                  }
                }
              }
            }
            if ("requestResolution" in _0x1a8424) {
              try {
                _0x16efc0.setResolution(_0x599e63, _0x1a8424.requestResolution.w, _0x1a8424.requestResolution.h, _0x1a8424.requestResolution.s, _0x1a8424.requestResolution.c);
              } catch (_0x417ee2) {
                errorlog(_0x417ee2);
              }
            }
            if ("keyframe" in _0x1a8424) {
              if (_0x1a8424.scene) {
                if (_0x16efc0.directorList.indexOf(_0x599e63) >= 0x0) {
                  _0x16efc0.sendKeyFrameScenes();
                } else {
                  errorlog("Not director");
                }
              } else {
                _0x16efc0.forcePLI(_0x599e63);
              }
            }
            if ("chat" in _0x1a8424) {
              var _0x16274b = false;
              var _0x43e968 = false;
              if (_0x16efc0.directorList.indexOf(_0x599e63) >= 0x0) {
                _0x16274b = true;
                if ("overlay" in _0x1a8424) {
                  if (_0x1a8424.overlay == true) {
                    _0x43e968 = true;
                  }
                }
              }
              log("isDirector " + _0x16274b);
              getChatMessage(_0x1a8424.chat, _0x16efc0.pcs[_0x599e63].label, _0x16274b, _0x43e968);
            }
            if ('order' in _0x1a8424) {
              _0x16efc0.pcs[_0x599e63].order = parseInt(_0x1a8424.order) || 0x0;
              if (_0x599e63 in _0x16efc0.rpcs) {
                _0x16efc0.rpcs[_0x599e63].order = _0x16efc0.pcs[_0x599e63].order;
              }
              if (_0x16efc0.director) {
                var _0x520cc9 = document.querySelectorAll("[data-action-type=\"order-value\"][data--u-u-i-d=\"" + _0x599e63 + "\"]");
                log(_0x520cc9);
                if (_0x520cc9[0x0]) {
                  _0x520cc9[0x0].innerText = parseInt(_0x1a8424.order) || 0x0;
                }
              }
              updateMixer();
            }
            if ('scale' in _0x1a8424) {
              _0x16efc0.setScale(_0x599e63, _0x1a8424.scale);
            }
            if (_0x16efc0.director && _0x16efc0.pcs[_0x599e63].coDirector && "directorState" in _0x1a8424) {
              log(_0x1a8424);
              _0x16efc0.syncState = _0x1a8424.directorState;
              for (var _0x541e99 in _0x16efc0.syncState) {
                syncSceneState(_0x541e99);
                syncOtherState(_0x541e99);
              }
            }
            if (_0x16efc0.directorList.indexOf(_0x599e63) == -0x1) {
              if ("requestAudioHack" in _0x1a8424) {
                var _0x3700bf = {};
                _0x3700bf.rejected = 'requestAudioHack';
                _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
              } else {
                if ("requestVideoRecord" in _0x1a8424) {
                  var _0x3700bf = {};
                  _0x3700bf.rejected = "requestVideoRecord";
                  _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                } else {
                  if ("changeOrder" in _0x1a8424) {
                    var _0x3700bf = {};
                    _0x3700bf.rejected = "changeOrder";
                    _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                  } else {
                    if ("changeURL" in _0x1a8424) {
                      var _0x3700bf = {};
                      _0x3700bf.rejected = "changeURL";
                      _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                    } else {
                      if ("changeLabel" in _0x1a8424) {
                        var _0x3700bf = {};
                        _0x3700bf.rejected = "changeLabel";
                        _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                      } else {
                        if ("requestChangeEQ" in _0x1a8424) {
                          var _0x3700bf = {};
                          _0x3700bf.rejected = "requestChangeEQ";
                          _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                        } else {
                          if ("requestChangeGating" in _0x1a8424) {
                            var _0x3700bf = {};
                            _0x3700bf.rejected = "requestChangeGating";
                            _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                          } else {
                            if ("requestChangeCompressor" in _0x1a8424) {
                              var _0x3700bf = {};
                              _0x3700bf.rejected = "requestChangeCompressor";
                              _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                            } else {
                              if ("requestChangeSubGain" in _0x1a8424) {
                                var _0x3700bf = {};
                                _0x3700bf.rejected = 'requestChangeSubGain';
                                _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                              } else {
                                if ('remoteVideoMuted' in _0x1a8424) {
                                  var _0x3700bf = {};
                                  _0x3700bf.rejected = "remoteVideoMuted";
                                  _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                } else {
                                  if ('requestChangeMicDelay' in _0x1a8424) {
                                    var _0x3700bf = {};
                                    _0x3700bf.rejected = "requestChangeMicDelay";
                                    _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                  } else {
                                    if ('lowerhand' in _0x1a8424) {
                                      var _0x3700bf = {};
                                      _0x3700bf.rejected = "lowerhand";
                                      _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                    } else {
                                      if ('hangup' in _0x1a8424) {
                                        var _0x3700bf = {};
                                        _0x3700bf.rejected = "hangup";
                                        _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                      } else {
                                        if ('displayMute' in _0x1a8424) {
                                          var _0x3700bf = {};
                                          _0x3700bf.rejected = 'displayMute';
                                          _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                        } else {
                                          if ("speakerMute" in _0x1a8424) {
                                            var _0x3700bf = {};
                                            _0x3700bf.rejected = "speakerMute";
                                            _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                          } else {
                                            if ("volume" in _0x1a8424) {
                                              var _0x3700bf = {};
                                              _0x3700bf.rejected = "volume";
                                              _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                            } else {
                                              if ('micIsolated' in _0x1a8424) {
                                                var _0x3700bf = {};
                                                _0x3700bf.rejected = "micIsolated";
                                                _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                              } else {
                                                if ("requestUpload" in _0x1a8424) {
                                                  var _0x3700bf = {};
                                                  _0x3700bf.rejected = 'requestUpload';
                                                  _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                                } else {
                                                  if ("stopClock" in _0x1a8424) {
                                                    var _0x3700bf = {};
                                                    _0x3700bf.rejected = 'stopClock';
                                                    _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                                  } else {
                                                    if ("resumeClock" in _0x1a8424) {
                                                      var _0x3700bf = {};
                                                      _0x3700bf.rejected = "resumeClock";
                                                      _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                                    } else {
                                                      if ('setClock' in _0x1a8424) {
                                                        var _0x3700bf = {};
                                                        _0x3700bf.rejected = "setClock";
                                                        _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                                      } else {
                                                        if ("hideClock" in _0x1a8424) {
                                                          var _0x3700bf = {};
                                                          _0x3700bf.rejected = 'hideClock';
                                                          _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                                        } else {
                                                          if ("showClock" in _0x1a8424) {
                                                            var _0x3700bf = {};
                                                            _0x3700bf.rejected = "showClock";
                                                            _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                                          } else {
                                                            if ("startClock" in _0x1a8424) {
                                                              var _0x3700bf = {};
                                                              _0x3700bf.rejected = "startClock";
                                                              _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                                            } else {
                                                              if ("pauseClock" in _0x1a8424) {
                                                                var _0x3700bf = {};
                                                                _0x3700bf.rejected = "pauseClock";
                                                                _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                                              } else {
                                                                if ("showTime" in _0x1a8424) {
                                                                  var _0x3700bf = {};
                                                                  _0x3700bf.rejected = "showTime";
                                                                  _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                                                } else {
                                                                  if ("group" in _0x1a8424) {
                                                                    var _0x3700bf = {};
                                                                    _0x3700bf.rejected = 'group';
                                                                    _0x16efc0.sendMessage(_0x3700bf, _0x599e63);
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              if ("requestAudioHack" in _0x1a8424) {
                var _0x57f314 = _0x16efc0.streamSrc.getAudioTracks();
                if (_0x57f314.length) {
                  if ("deviceId" in _0x1a8424) {
                    applyAudioHack(_0x1a8424.keyname, _0x1a8424.value, _0x1a8424.deviceId);
                  } else {
                    applyAudioHack(_0x1a8424.keyname, _0x1a8424.value);
                  }
                }
              }
              if ("requestVideoRecord" in _0x1a8424) {
                if (_0x1a8424.requestVideoRecord) {
                  if (_0x16efc0.videoElement) {
                    var _0x17aae7 = 0x1770;
                    if (_0x1a8424.value) {
                      _0x17aae7 = parseInt(_0x1a8424.value);
                    }
                    recordLocalVideo("start", _0x17aae7);
                  }
                } else if (_0x16efc0.videoElement) {
                  recordLocalVideo("stop");
                }
              }
              if ("changeOrder" in _0x1a8424) {
                if (_0x16efc0.order == false) {
                  _0x16efc0.order = 0x0;
                }
                _0x16efc0.order += parseInt(_0x1a8424.changeOrder) || 0x0;
                var _0x3700bf = {};
                _0x3700bf = {};
                _0x3700bf.order = _0x16efc0.order;
                _0x16efc0.sendPeers(_0x3700bf);
                updateMixer();
              }
              if ("changeURL" in _0x1a8424) {
                changeURL(_0x1a8424.changeURL);
              }
              if ("stopClock" in _0x1a8424) {
                stopClock();
              }
              if ("resumeClock" in _0x1a8424) {
                resumeClock();
              }
              if ("setClock" in _0x1a8424) {
                setClock(_0x1a8424.setClock);
              }
              if ("hideClock" in _0x1a8424) {
                hideClock();
              }
              if ("showClock" in _0x1a8424) {
                showClock();
              }
              if ("startClock" in _0x1a8424) {
                startClock();
              }
              if ("pauseClock" in _0x1a8424) {
                pauseClock();
              }
              if ("showTime" in _0x1a8424) {
                if (_0x16efc0.showTime !== false) {
                  if (_0x1a8424.showTime && !_0x16efc0.showTime) {
                    toggleClock();
                  } else if (!_0x1a8424.showTime && _0x16efc0.showTime) {
                    toggleClock();
                  }
                }
              }
              if ("requestUpload" in _0x1a8424) {
                toggleFileshare(_0x599e63);
              }
              if ("group" in _0x1a8424) {
                try {
                  _0x16efc0.sendMessage({
                    'group': _0x1a8424.group
                  });
                  if (_0x1a8424.group) {
                    _0x16efc0.group = _0x1a8424.group.split(',');
                  } else {
                    _0x16efc0.group = [];
                  }
                  updateMixer();
                  pokeIframeAPI("group-set-updated", _0x16efc0.group);
                } catch (_0x46359c) {}
              }
              if ('changeLabel' in _0x1a8424) {
                if ("value" in _0x1a8424) {
                  if (typeof _0x1a8424.value == "string") {
                    _0x16efc0.label = sanitizeLabel(_0x1a8424.value);
                    log("New Label: " + _0x16efc0.label);
                    if (_0x16efc0.director) {
                      var _0x520cc9 = getById("label_" + _0x599e63);
                      if (_0x16efc0.label) {
                        _0x520cc9.innerText = _0x16efc0.label;
                        _0x520cc9.classList.remove("addALabel");
                      } else if (_0x16efc0.directorUUID === _0x599e63) {
                        _0x520cc9.innerText = miscTranslations["main-director"];
                        _0x520cc9.classList.remove("addALabel");
                      } else {
                        _0x520cc9.innerText = miscTranslations["add-a-label"];
                        _0x520cc9.classList.add('addALabel');
                      }
                    } else if (_0x16efc0.showlabels) {
                      updateMixer();
                    }
                    if (!_0x16efc0.director) {
                      if (_0x16efc0.label) {
                        document.title = _0x16efc0.label;
                      } else {
                        document.title = location.hostname;
                      }
                    }
                    var _0x5b1b7a = encodeURIComponent(_0x16efc0.label);
                    if (urlParams.has('l')) {
                      updateURL('l=' + _0x5b1b7a, true, false);
                    } else {
                      updateURL("label=" + _0x5b1b7a, true, false);
                    }
                    var _0x3700bf = {};
                    _0x3700bf.changeLabel = true;
                    _0x3700bf.value = _0x16efc0.label;
                    _0x16efc0.sendMessage(_0x3700bf);
                  } else {
                    _0x16efc0.label = false;
                    var _0x3700bf = {};
                    _0x3700bf.changeLabel = true;
                    _0x3700bf.value = _0x16efc0.label;
                    _0x16efc0.sendMessage(_0x3700bf);
                    if (_0x16efc0.director) {
                      var _0x520cc9 = getById("label_" + _0x599e63);
                      if (_0x16efc0.directorUUID === _0x599e63) {
                        _0x520cc9.innerText = miscTranslations["main-director"];
                        _0x520cc9.classList.remove("addALabel");
                      } else {
                        _0x520cc9.innerText = miscTranslations["add-a-label"];
                        _0x520cc9.classList.add("addALabel");
                      }
                    } else if (_0x16efc0.showlabels) {
                      document.title = location.hostname;
                      updateMixer();
                    } else {
                      document.title = location.hostname;
                    }
                  }
                }
              }
              if ("requestChangeEQ" in _0x1a8424) {
                if (_0x1a8424.keyname == 'low') {
                  changeLowEQ(parseFloat(_0x1a8424.value), _0x1a8424.track);
                } else {
                  if (_0x1a8424.keyname == "mid") {
                    changeMidEQ(parseFloat(_0x1a8424.value), _0x1a8424.track);
                  } else if (_0x1a8424.keyname == "high") {
                    changeHighEQ(parseFloat(_0x1a8424.value), _0x1a8424.track);
                  }
                }
              }
              if ("requestChangeGating" in _0x1a8424) {
                var _0x310147 = _0x16efc0.noisegate;
                if (_0x1a8424.value === 'false') {
                  _0x16efc0.noisegate = false;
                  log("noise gate off");
                } else if (_0x1a8424.value === "true") {
                  _0x16efc0.noisegate = true;
                  log("noise gate on");
                } else {
                  _0x16efc0.noisegate = _0x1a8424.value;
                }
                if (_0x16efc0.noisegate !== _0x310147) {
                  senderAudioUpdate();
                }
              }
              if ("requestChangeCompressor" in _0x1a8424) {
                var _0x310147 = _0x16efc0.compressor;
                if (_0x1a8424.value === "false") {
                  _0x16efc0.compressor = false;
                  log("noise gate off");
                } else {
                  if (_0x1a8424.value === '1') {
                    _0x16efc0.compressor = 0x1;
                    log("noise gate on");
                  } else if (_0x1a8424.value === '2') {
                    _0x16efc0.compressor = 0x2;
                    log("noise gate on");
                  } else {
                    _0x16efc0.compressor = parseInt(_0x1a8424.value) || false;
                  }
                }
                if (_0x16efc0.compressor !== _0x310147) {
                  senderAudioUpdate();
                }
              }
              if ('requestChangeMicDelay' in _0x1a8424) {
                if (_0x16efc0.micDelay === false) {
                  _0x16efc0.micDelay = parseInt(_0x1a8424.value) || 0x0;
                  senderAudioUpdate();
                } else {
                  _0x16efc0.micDelay = parseInt(_0x1a8424.value) || 0x0;
                  changeMicDelay(_0x16efc0.micDelay, _0x1a8424.deviceId);
                }
              }
              if ('requestChangeSubGain' in _0x1a8424) {
                changeSubGain(parseFloat(_0x1a8424.value), _0x1a8424.deviceId);
              }
              if ('lowerhand' in _0x1a8424) {
                if (_0x16efc0.raisehands) {
                  lowerhand();
                }
              }
              if ("mirrorGuestState" in _0x1a8424 && "mirrorGuestTarget" in _0x1a8424) {
                if (_0x1a8424.mirrorGuestTarget && _0x1a8424.mirrorGuestTarget === true) {
                  _0x16efc0.permaMirrored = _0x1a8424.mirrorGuestState;
                  applyMirror(false);
                } else if (_0x1a8424.mirrorGuestTarget && _0x1a8424.mirrorGuestTarget in _0x16efc0.rpcs) {
                  _0x16efc0.rpcs[_0x1a8424.mirrorGuestTarget].mirrorState = _0x1a8424.mirrorGuestState;
                  if (_0x16efc0.rpcs[_0x1a8424.mirrorGuestTarget].videoElement) {
                    applyMirrorGuest(_0x1a8424.mirrorGuestState, _0x16efc0.rpcs[_0x1a8424.mirrorGuestTarget].videoElement);
                  }
                }
              }
              if ('getAudioSettings' in _0x1a8424) {
                var _0x3700bf = {};
                _0x3700bf.UUID = _0x599e63;
                _0x3700bf.audioOptions = listAudioSettingsPrep();
                sendMediaDevices(_0x3700bf.UUID);
                _0x16efc0.sendMessage(_0x3700bf, _0x3700bf.UUID);
              }
              if ('getVideoSettings' in _0x1a8424) {
                var _0x3700bf = {};
                _0x3700bf.UUID = _0x599e63;
                _0x3700bf.videoOptions = listVideoSettingsPrep();
                sendMediaDevices(_0x3700bf.UUID);
                _0x16efc0.sendMessage(_0x3700bf, _0x3700bf.UUID);
              }
              if ("changeSpeaker" in _0x1a8424) {
                changeAudioOutputDeviceById(_0x1a8424.changeSpeaker, _0x599e63);
              }
              if ('changeMicrophone' in _0x1a8424) {
                changeAudioDeviceById(_0x1a8424.changeMicrophone, _0x599e63);
              }
              if ("changeCamera" in _0x1a8424) {
                changeVideoDeviceById(_0x1a8424.changeCamera, _0x599e63);
              }
              if ("requestVideoHack" in _0x1a8424) {
                if ("ctrl" in _0x1a8424 && _0x1a8424.ctrl) {
                  updateCameraConstraints(_0x1a8424.keyname, _0x1a8424.value, true, _0x599e63);
                } else {
                  updateCameraConstraints(_0x1a8424.keyname, _0x1a8424.value, false, false);
                }
              }
              if ("requestChangeLowcut" in _0x1a8424) {
                changeLowCut(parseFloat(_0x1a8424.value), _0x1a8424.track);
              }
              if ('requestChangeLowcut' in _0x1a8424) {
                changeLowCut(parseFloat(_0x1a8424.value), _0x1a8424.track);
              }
              if ("hangup" in _0x1a8424) {
                if (_0x16efc0.directorUUID) {
                  _0x16efc0.hangup();
                }
              }
              if ("mute" in _0x1a8424) {}
              if ('volume' in _0x1a8424) {
                var _0x2d1eab = parseInt(_0x1a8424.volume) / 0x64 || 0x0;
                _0x16efc0.audioGain = parseInt(_0x1a8424.volume) || 0x0;
                try {
                  for (var _0x3b9742 in _0x16efc0.webAudios) {
                    log("Adjusting Gain; only track 0 in all likely hood, unless more than track 0 support is added.");
                    _0x16efc0.webAudios[_0x3b9742].gainNode.gain.setValueAtTime(_0x2d1eab, _0x16efc0.webAudios[_0x3b9742].audioContext.currentTime);
                  }
                } catch (_0x207f5f) {}
                updateVolume(true);
              }
              if ("micIsolate" in _0x1a8424) {
                if (_0x1a8424.micIsolate) {
                  if (_0x16efc0.directorList.indexOf(_0x599e63) >= 0x0) {
                    _0x16efc0.micIsolated.push(_0x599e63);
                    _0x16efc0.applyIsolatedChat();
                  }
                } else {
                  var _0x22ba82 = _0x16efc0.micIsolated.indexOf(_0x599e63);
                  if (_0x22ba82 > -0x1) {
                    _0x16efc0.micIsolated.splice(_0x22ba82, 0x1);
                    _0x16efc0.applyIsolatedChat();
                  }
                }
              }
              if ("lowerVolume" in _0x1a8424) {
                if (_0x1a8424.lowerVolume) {
                  if (_0x16efc0.directorList.indexOf(_0x599e63) >= 0x0) {
                    _0x16efc0.lowerVolume.push(_0x599e63);
                    _0x16efc0.applyIsolatedVolume();
                  }
                } else {
                  var _0x22ba82 = _0x16efc0.lowerVolume.indexOf(_0x599e63);
                  if (_0x22ba82 > -0x1) {
                    _0x16efc0.lowerVolume.splice(_0x22ba82, 0x1);
                    _0x16efc0.applyIsolatedVolume();
                  }
                }
              }
              if ("speakerMute" in _0x1a8424) {
                if (_0x1a8424.speakerMute) {
                  _0x16efc0.directorSpeakerMuted = true;
                  _0x16efc0.directorSpeakerMute();
                } else {
                  _0x16efc0.directorSpeakerMuted = false;
                  _0x16efc0.directorSpeakerMute();
                }
              }
              if ('displayMute' in _0x1a8424) {
                if (_0x1a8424.displayMute) {
                  _0x16efc0.directorDisplayMuted = true;
                  _0x16efc0.directorDisplayMute();
                } else {
                  _0x16efc0.directorDisplayMuted = false;
                  _0x16efc0.directorDisplayMute();
                }
              }
              if ('remoteVideoMuted' in _0x1a8424) {
                _0x16efc0.remoteVideoMuted = _0x1a8424.remoteVideoMuted;
                toggleVideoMute(true);
                if (!_0x16efc0.videoMuted) {
                  var _0x3700bf = {};
                  _0x3700bf.videoMuted = _0x16efc0.remoteVideoMuted;
                  _0x16efc0.sendMessage(_0x3700bf);
                }
              }
              if ("changeParams" in _0x1a8424) {
                applyNewParams(_0x1a8424.changeParams);
              }
            }
            if (_0x16efc0.directorUUID === _0x599e63) {
              if (_0x1a8424.request === 'migrate') {
                warnlog('TRANSFERRING?');
                if ("transferSettings" in _0x1a8424) {
                  if ("roomenc" in _0x1a8424.transferSettings) {
                    _0x16efc0.roomenc = _0x1a8424.roomenc;
                  }
                  if ('broadcast' in _0x1a8424.transferSettings) {
                    if (_0x1a8424.transferSettings.broadcast === true || _0x1a8424.transferSettings.broadcast === null) {
                      _0x16efc0.broadcast = null;
                      if (_0x16efc0.minipreview === false) {
                        _0x16efc0.minipreview = 0x2;
                      }
                      if (_0x16efc0.style === false) {
                        _0x16efc0.style = 0x1;
                      }
                      if (_0x16efc0.showList === null) {
                        _0x16efc0.showList = true;
                      }
                    } else {
                      _0x16efc0.broadcast = _0x1a8424.transferSettings.broadcast;
                    }
                    if (_0x1a8424.transferSettings.updateurl) {
                      if (_0x16efc0.broadcast !== false) {
                        updateURL("broadcast", true);
                      } else {
                        updateURL('broadcast=false', true);
                      }
                    }
                  }
                  if ("roomid" in _0x1a8424.transferSettings) {
                    _0x16efc0.roomid = _0x1a8424.transferSettings.roomid;
                    if (_0x1a8424.transferSettings.updateurl) {
                      updateURL("room=" + _0x16efc0.roomid, true);
                    }
                  }
                }
              }
              try {
                if ("directorSettings" in _0x1a8424 && "addCoDirector" in _0x1a8424.directorSettings) {
                  for (var _0x45ee0 = 0x0; _0x45ee0 < _0x1a8424.directorSettings.addCoDirector.length; _0x45ee0++) {
                    if (!_0x16efc0.directorList.includes(_0x1a8424.directorSettings.addCoDirector[_0x45ee0].toString)) {
                      _0x16efc0.directorList.push(_0x1a8424.directorSettings.addCoDirector[_0x45ee0].toString());
                      var _0x413be7 = getById("container_" + _0x1a8424.directorSettings.addCoDirector[_0x45ee0].toString());
                      if (_0x413be7) {
                        _0x413be7.classList.add("directorBlue");
                      }
                    }
                  }
                }
              } catch (_0x1b6dbf) {
                errorlog(_0x1b6dbf);
              }
            }
            if ("zoom" in _0x1a8424) {
              if (_0x16efc0.remote) {
                if ("remote" in _0x1a8424 && _0x1a8424.remote === _0x16efc0.remote && _0x16efc0.remote) {
                  _0x16efc0.remoteZoom(parseFloat(_0x1a8424.zoom));
                } else if (_0x16efc0.remote === true) {
                  _0x16efc0.remoteZoom(parseFloat(_0x1a8424.zoom));
                }
              } else {
                if (_0x16efc0.directorList.indexOf(_0x599e63) >= 0x0) {
                  _0x16efc0.remoteZoom(parseFloat(_0x1a8424.zoom));
                } else {
                  return;
                }
              }
            }
            if ("focus" in _0x1a8424) {
              if (_0x16efc0.remote) {
                if ("remote" in _0x1a8424 && _0x1a8424.remote === _0x16efc0.remote && _0x16efc0.remote) {
                  _0x16efc0.remoteFocus(parseFloat(_0x1a8424.focus));
                } else if (_0x16efc0.remote === true) {
                  _0x16efc0.remoteFocus(parseFloat(_0x1a8424.focus));
                }
              } else {
                if (_0x16efc0.directorList.indexOf(_0x599e63) >= 0x0) {
                  _0x16efc0.remoteFocus(parseFloat(_0x1a8424.focus));
                } else {
                  return;
                }
              }
            }
            if ("requestFile" in _0x1a8424) {
              log("requestFile");
              try {
                _0x16efc0.sendFile(_0x599e63, _0x1a8424.requestFile);
              } catch (_0x52bc9f) {
                errorlog(_0x52bc9f);
              }
            }
            if ("midi" in _0x1a8424) {
              playbackMIDI(_0x1a8424.midi, true);
            }
          } catch (_0x8d4780) {
            errorlog(_0x8d4780);
          }
          if ("rejected" in _0x1a8424) {
            if (_0x1a8424.rejected == 'obsCommand') {
              if (_0x16efc0.remote) {
                warnUser(miscTranslations['invalid-remote-code'], 0xbb8);
              } else if (document.querySelector("#obsRemotePassword>input") && document.querySelector('#obsRemotePassword>input').value) {
                warnUser(miscTranslations['invalid-remote-code-obs'], 0x1b58);
              } else {
                warnUser(miscTranslations['request-rejected-obs'], 0x2710);
              }
              getById('obsRemotePassword').classList.remove('hidden');
            } else {
              if (_0x16efc0.director) {
                if (!_0x16efc0.cleanOutput) {
                  warnUser("The request (" + _0x1a8424.rejected + ") failed due to permissions or it was rejected by the user", 0x1388);
                }
              } else if (!_0x16efc0.cleanOutput) {
                if (_0x16efc0.remote) {
                  warnUser("remote-token-rejected", 0x1388);
                } else {
                  warnUser("remote-control-failed", 0x1388);
                }
              }
            }
            errorlog("ACTION REJECTED: " + _0x1a8424.rejected + ", isDirector: " + _0x16efc0.director);
            pokeIframeAPI("rejected", _0x1a8424.rejected, _0x599e63);
            return;
          } else {
            if ("approved" in _0x1a8424) {
              log("approved: " + _0x1a8424.approved);
              pokeIframeAPI("approved", _0x1a8424.approved, _0x599e63);
              return;
            }
          }
          if ("audio" in _0x1a8424 || 'video' in _0x1a8424) {
            log("ASKING FOR AUDIO AND VIDEO?");
            if (_0x1a8424.audio) {
              _0x16efc0.pcs[_0x599e63].allowAudio = true;
            }
            if (_0x16efc0.webp && "allowwebp" in _0x1a8424 && _0x1a8424.allowwebp !== false) {
              _0x16efc0.pcs[_0x599e63].allowWebp = _0x1a8424.allowwebp;
              _0x16efc0.pcs[_0x599e63].allowVideo = false;
              setTimeout(function () {
                makeImages(true);
              }, 0x3e8);
            } else if (_0x1a8424.video) {
              _0x16efc0.pcs[_0x599e63].allowVideo = true;
            }
            if ("broadcast" in _0x1a8424 && _0x1a8424.broadcast !== false) {
              _0x16efc0.pcs[_0x599e63].allowBroadcast = _0x1a8424.broadcast;
            }
            if ("allowchunked" in _0x1a8424 && _0x1a8424.allowchunked !== false) {
              _0x16efc0.pcs[_0x599e63].allowChunked = _0x1a8424.allowchunked;
            }
            if ('iframe' in _0x1a8424 && _0x1a8424.iframe !== false) {
              _0x16efc0.pcs[_0x599e63].allowIframe = _0x1a8424.iframe;
            }
            if ('widget' in _0x1a8424 && _0x1a8424.widget !== false) {
              _0x16efc0.pcs[_0x599e63].allowWidget = _0x1a8424.widget;
            }
            if ("allowmidi" in _0x1a8424 && _0x1a8424.allowmidi !== false) {
              _0x16efc0.pcs[_0x599e63].allowMIDI = _0x1a8424.allowmidi;
            }
            if ("downloads" in _0x1a8424 && _0x1a8424.downloads !== false) {
              _0x16efc0.pcs[_0x599e63].allowDownloads = _0x1a8424.downloads;
            }
            if ('allowscreen' in _0x1a8424 && _0x1a8424.allowscreen !== false) {
              _0x16efc0.pcs[_0x599e63].allowScreenAudio = true;
              _0x16efc0.pcs[_0x599e63].allowScreenVideo = true;
            }
            if ("allowscreenvideo" in _0x1a8424 && _0x1a8424.allowscreenvideo !== false) {
              _0x16efc0.pcs[_0x599e63].allowScreenVideo = true;
            }
            if ("allowscreenaudio" in _0x1a8424 && _0x1a8424.allowscreenaudio !== false) {
              _0x16efc0.pcs[_0x599e63].allowScreenAudio = true;
            }
            if ("preferVideoCodec" in _0x1a8424 && _0x1a8424.preferVideoCodec !== false) {
              _0x16efc0.pcs[_0x599e63].preferVideoCodec = _0x1a8424.preferVideoCodec.toLowerCase();
            }
            if ('preferAudioCodec' in _0x1a8424 && _0x1a8424.preferAudioCodec !== false) {
              _0x16efc0.pcs[_0x599e63].preferAudioCodec = _0x1a8424.preferAudioCodec.toLowerCase();
            }
            if ("allowmeshcast" in _0x1a8424 && _0x1a8424.allowmeshcast === false) {
              _0x16efc0.pcs[_0x599e63].meshcast = false;
            } else {
              if (_0x16efc0.meshcast) {
                if (_0x16efc0.meshcast == "video") {
                  _0x16efc0.pcs[_0x599e63].allowVideo = false;
                } else {
                  if (_0x16efc0.meshcast == "audio") {
                    _0x16efc0.pcs[_0x599e63].allowAudio = false;
                  } else if (_0x16efc0.pcs[_0x599e63].allowVideo == false) {
                    _0x16efc0.pcs[_0x599e63].meshcast = false;
                  } else {
                    _0x16efc0.pcs[_0x599e63].allowAudio = false;
                    _0x16efc0.pcs[_0x599e63].allowVideo = false;
                  }
                }
              }
            }
            if (_0x16efc0.promptAccess) {
              playtone();
              window.focus();
              var _0x5c7f9c = false;
              if (_0x599e63 in _0x16efc0.rpcs && _0x16efc0.rpcs[_0x599e63].label) {
                _0x5c7f9c = _0x16efc0.rpcs[_0x599e63].label || _0x16efc0.rpcs[_0x599e63].streamID || false;
              }
              _0x5c7f9c = _0x16efc0.pcs[_0x599e63].label || _0x5c7f9c || _0x16efc0.pcs[_0x599e63].streamID || _0x599e63 || "Someone";
              var _0x3f17d5 = await confirmAlt(_0x5c7f9c + miscTranslations["prompt-access-request"], true);
              if (!_0x3f17d5) {
                try {
                  log("closing 13");
                  _0x16efc0.closePC(_0x599e63);
                } catch (_0x14fa47) {}
                return;
              }
            }
            if ("guest" in _0x1a8424) {
              if (_0x1a8424.guest == true) {
                _0x16efc0.pcs[_0x599e63].guest = true;
                if (_0x16efc0.beepToNotify) {
                  playtone(false, 'jointone');
                  showNotification("A Guest joined the room", '');
                }
                pokeIframeAPI("guest-connected", _0x1a8424.director, _0x599e63);
              }
            }
            if ("forceios" in _0x1a8424) {
              if (_0x1a8424.forceios === true) {
                _0x16efc0.pcs[_0x599e63].forceios = true;
              }
            }
            if ("limitaudio" in _0x1a8424) {
              if (_0x1a8424.limitaudio == true) {
                _0x16efc0.pcs[_0x599e63].limitAudio = true;
              }
            }
            if ("enhanceaudio" in _0x1a8424) {
              if (_0x1a8424.enhanceaudio == true) {
                _0x16efc0.pcs[_0x599e63].enhanceAudio = true;
              }
            }
            if (_0x1a8424.degrade) {
              _0x16efc0.pcs[_0x599e63].degradationPreference = _0x1a8424.degrade;
            }
            if ("keyframeRate" in _0x1a8424) {
              try {
                _0x16efc0.pcs[_0x599e63].keyframeRate = _0x1a8424.keyframeRate;
                if (_0x16efc0.pcs[_0x599e63].keyframeRate) {
                  setTimeout(function (_0x3a4902) {
                    _0x16efc0.forcePLI(_0x3a4902);
                  }, 0x1388, _0x599e63);
                }
              } catch (_0x1d573e) {
                warnlog(_0x1d573e);
              }
            }
            if ("solo" in _0x1a8424) {
              _0x16efc0.pcs[_0x599e63].solo = _0x1a8424.solo;
            }
            if ("layout" in _0x1a8424) {
              if (_0x16efc0.pcs[_0x599e63].layout) {
                _0x16efc0.pcs[_0x599e63].layout = _0x1a8424.layout;
              } else {
                _0x16efc0.pcs[_0x599e63].layout = _0x1a8424.layout;
                if (_0x16efc0.slotmode && _0x16efc0.director && _0x16efc0.pcs[_0x599e63] && _0x16efc0.pcs[_0x599e63].layout) {
                  createSlotUpdate(_0x599e63);
                }
              }
              pokeIframeAPI("layout-enabled", _0x1a8424.layout, _0x599e63);
            }
            if ("scene" in _0x1a8424) {
              if (_0x1a8424.scene !== false) {
                try {
                  if (typeof _0x1a8424.scene === 'string') {
                    _0x16efc0.pcs[_0x599e63].scene = _0x1a8424.scene.replace(/[\W]+/g, '_');
                  } else {
                    _0x16efc0.pcs[_0x599e63].scene = (parseInt(_0x1a8424.scene) || 0x0) + '';
                  }
                  _0x16efc0.pcs[_0x599e63].stats.scene = _0x16efc0.pcs[_0x599e63].scene;
                  updateSceneList(_0x16efc0.pcs[_0x599e63].scene);
                } catch (_0x2211d0) {
                  errorlog(_0x2211d0);
                }
                if ('showDirector' in _0x1a8424) {
                  _0x16efc0.pcs[_0x599e63].showDirector = _0x1a8424.showDirector;
                } else {
                  _0x16efc0.pcs[_0x599e63].showDirector = _0x16efc0.showDirector;
                }
                if (_0x16efc0.director) {
                  if (_0x16efc0.pcs[_0x599e63].showDirector == false) {
                    _0x16efc0.pcs[_0x599e63].allowAudio = false;
                    _0x16efc0.pcs[_0x599e63].allowVideo = false;
                    _0x16efc0.pcs[_0x599e63].allowIframe = false;
                    _0x16efc0.pcs[_0x599e63].allowWidget = false;
                    _0x16efc0.pcs[_0x599e63].meshcast = false;
                    _0x16efc0.pcs[_0x599e63].allowWebp = false;
                    _0x16efc0.pcs[_0x599e63].allowScreenAudio = false;
                    _0x16efc0.pcs[_0x599e63].allowScreenVideo = false;
                  } else {
                    if (_0x16efc0.pcs[_0x599e63].showDirector == 0x1) {
                      _0x16efc0.pcs[_0x599e63].allowIframe = false;
                      _0x16efc0.pcs[_0x599e63].allowWidget = false;
                    } else {
                      if (_0x16efc0.pcs[_0x599e63].showDirector == 0x2) {
                        _0x16efc0.pcs[_0x599e63].allowAudio = false;
                        _0x16efc0.pcs[_0x599e63].allowScreenAudio = false;
                        _0x16efc0.pcs[_0x599e63].allowIframe = false;
                        _0x16efc0.pcs[_0x599e63].allowWidget = false;
                      } else {
                        if (_0x16efc0.pcs[_0x599e63].showDirector == 0x3) {
                          _0x16efc0.pcs[_0x599e63].allowAudio = false;
                          _0x16efc0.pcs[_0x599e63].allowVideo = false;
                          _0x16efc0.pcs[_0x599e63].allowIframe = false;
                          _0x16efc0.pcs[_0x599e63].allowWidget = false;
                          _0x16efc0.pcs[_0x599e63].meshcast = false;
                          _0x16efc0.pcs[_0x599e63].allowWebp = false;
                        } else {
                          if (_0x16efc0.pcs[_0x599e63].showDirector == 0x4) {}
                        }
                      }
                    }
                  }
                }
                if (_0x16efc0.pcs[_0x599e63].solo) {
                  pokeIframeAPI('solo-scene-connected', _0x1a8424.scene, _0x599e63);
                } else {
                  pokeIframeAPI("scene-connected", _0x1a8424.scene, _0x599e63);
                }
              }
              _0x16efc0.initialDirectorSync(_0x599e63);
            } else if (_0x1a8424.director) {
              if (iOS || iPad) {
                if (_0x16efc0.pcs[_0x599e63].forceios == true) {
                  _0x16efc0.pcs[_0x599e63].guest = true;
                }
              }
              if (_0x16efc0.beepToNotify) {
                playtone(false, "jointone");
                showNotification("A director joined the room", "Trying to join at least");
              }
              _0x16efc0.initialDirectorSync(_0x599e63);
              pokeIframeAPI('director-connected', _0x1a8424.director, _0x599e63);
            }
            _0x16efc0.initialPublish(_0x599e63);
          }
        };
        _0x16efc0.initialDirectorSync = function (_0x19804e) {
          if (!(_0x16efc0.directorState || _0x16efc0.scene)) {
            return;
          }
          try {
            var _0x36ae88 = {};
            if (_0x16efc0.pcs[_0x19804e]) {
              _0x36ae88.directorSettings = getDirectorSettings(_0x16efc0.pcs[_0x19804e].scene);
            }
            log("TRYING TO SYNC WITH SENDING: " + _0x19804e);
            var _0x220ae6 = false;
            if (_0x16efc0.alreadyJoinedMembers) {
              _0x16efc0.alreadyJoinedMembers.forEach(_0x2e371e => {
                if (_0x2e371e.UUID === _0x19804e) {
                  _0x220ae6 = true;
                }
              });
            }
            if (!_0x220ae6) {
              _0x36ae88.directorState = getDetailedState();
            } else {
              warnlog("this unverified director was already connected; not going to send my director state to them");
            }
            if (Object.keys(_0x36ae88).length) {
              _0x16efc0.sendPeers(_0x36ae88, _0x19804e);
            }
          } catch (_0x439121) {}
        };
        _0x16efc0.initialPublish = function (_0x14a2be) {
          log("INITIAL PUBLISH START: " + _0x14a2be);
          if (_0x14a2be in _0x16efc0.pcs) {} else {
            errorlog("UUID not found in pcs");
            return;
          }
          if (getSenders2(_0x14a2be).length) {
            errorlog("PROBLEM, Senders is more than 0: " + getSenders2(_0x14a2be).length);
          }
          if (_0x16efc0.pcs[_0x14a2be].allowIframe === true) {
            if (_0x16efc0.iframeSrc) {
              var _0x5d2ba7 = {};
              _0x5d2ba7.iframeSrc = _0x16efc0.iframeSrc;
              if (_0x16efc0.iframeEle && _0x16efc0.iframeEle.sendOnNewConnect) {
                if (_0x16efc0.iframeSrc.startsWith("https://www.youtube.com/")) {
                  _0x5d2ba7.iframeSrc += "&start=" + parseInt(Math.ceil(_0x16efc0.iframeEle.sendOnNewConnect.ifs.t)) + '';
                }
              }
              _0x16efc0.sendMessage(_0x5d2ba7, _0x14a2be);
            }
          }
          if (_0x16efc0.pcs[_0x14a2be].allowWidget === true) {
            if (_0x16efc0.widget && _0x16efc0.director) {
              var _0x5d2ba7 = {};
              _0x5d2ba7.widgetSrc = _0x16efc0.widget;
              _0x16efc0.sendMessage(_0x5d2ba7, _0x14a2be);
            }
          }
          if (_0x16efc0.pcs[_0x14a2be].allowDownloads === true) {
            _0x16efc0.provideFileList(_0x14a2be);
          }
          if (_0x16efc0.chunked && _0x16efc0.pcs[_0x14a2be].allowChunked) {
            _0x16efc0.chunkedStream(_0x14a2be);
            return;
          }
          var _0x41a93e = _0x16efc0.getLocalStream();
          log("Does Local Stream Source EXIST?");
          log(_0x41a93e.getTracks());
          if (_0x16efc0.meshcastSettings && _0x16efc0.pcs[_0x14a2be].meshcast === null) {
            _0x16efc0.pcs[_0x14a2be].meshcast = true;
            var _0x5d2ba7 = {};
            _0x5d2ba7.meshcast = _0x16efc0.meshcastSettings;
            _0x16efc0.sendMessage(_0x5d2ba7, _0x14a2be);
            warnlog(_0x5d2ba7);
          }
          if (_0x16efc0.pcs[_0x14a2be].allowScreenVideo || _0x16efc0.pcs[_0x14a2be].allowScreenAudio) {
            createSecondStream2(_0x14a2be);
          }
          var _0x2a5b1f = false;
          _0x41a93e.getVideoTracks().forEach(_0x15af01 => {
            try {
              if (_0x16efc0.pcs[_0x14a2be].allowVideo === true) {
                if (_0x15af01.kind == "video") {
                  if (_0x16efc0.pcs[_0x14a2be].guest === true && _0x16efc0.roombitrate === 0x0) {
                    log("room rate restriction detected. No videos will be published to other guests");
                  } else {
                    _0x16efc0.pcs[_0x14a2be].addTrack(_0x15af01, _0x41a93e);
                    warnlog("added video track");
                    _0x2a5b1f = true;
                    setTimeout(function (_0x1990d4) {
                      try {
                        _0x16efc0.optimizeBitrate(_0x1990d4);
                      } catch (_0x513f7a) {
                        warnlog(_0x513f7a);
                      }
                    }, _0x16efc0.rampUpTime, _0x14a2be);
                  }
                }
              }
            } catch (_0x402bed) {
              errorlog(_0x402bed);
            }
          });
          if (_0x16efc0.mixMinus) {
            _0x41a93e = mixMinusAudio(_0x14a2be);
          }
          if (_0x16efc0.pcs[_0x14a2be].allowAudio) {
            _0x41a93e.getAudioTracks().forEach(_0x5b30b2 => {
              try {
                if (_0x5b30b2.kind == 'audio') {
                  _0x16efc0.pcs[_0x14a2be].addTrack(_0x5b30b2, _0x41a93e);
                  warnlog("added audio track");
                }
              } catch (_0x16487c) {
                errorlog(_0x16487c);
              }
            });
            log("does any audio exist?");
            if (_0x41a93e.getAudioTracks().length) {
              if (_0x16efc0.director !== false) {
                _0x16efc0.applySoloChat();
              }
              log("starting kicker");
              if (_0x16efc0.pcs[_0x14a2be].preferAudioCodec == "lyra") {
                lyraEncode(_0x14a2be);
              }
              if (_0x16efc0.pcs[_0x14a2be].limitAudio === true) {
                warnlog("limiting AudioEncoder");
                setTimeout(_0x16efc0.limitAudioEncoder, 0x3e8, _0x14a2be, 0x7d00, 0x0);
              }
              if (_0x16efc0.pcs[_0x14a2be].enhanceAudio === true) {
                setTimeout(_0x16efc0.enhanceAudioEncoder, 0x3e8, _0x14a2be);
              }
            }
          }
          if (_0x16efc0.pcs[_0x14a2be].degradationPreference) {
            setTimeout(_0x16efc0.degradationPreference, 0x3e8, _0x14a2be, _0x16efc0.pcs[_0x14a2be].degradationPreference);
          } else {
            if (_0x16efc0.contentHint && SafariVersion) {
              if (_0x16efc0.contentHint == "detail") {
                setTimeout(_0x16efc0.degradationPreference, 0x3e8, _0x14a2be, "maintain-resolution");
              } else if (_0x16efc0.contentHint == 'motion') {
                setTimeout(_0x16efc0.degradationPreference, 0x3e8, _0x14a2be, "maintain-framerate");
              }
            }
          }
          if (iOS || iPad) {
            if (SafariVersion && SafariVersion <= 0xd) {} else if (_0x2a5b1f) {
              setTimeout(function (_0x1b4586) {
                _0x16efc0.setScale(_0x1b4586, null);
              }, 0x7d0, _0x14a2be);
              setTimeout(function (_0xe1a731) {
                var _0x165689 = _0x16efc0.refreshScale(_0xe1a731);
                if (!_0x165689) {
                  _0x16efc0.setScale(_0xe1a731, 0x64);
                }
              }, 0x1388, _0x14a2be);
            }
          } else {
            setTimeout(function (_0x421d69) {
              _0x16efc0.refreshScale(_0x421d69);
            }, 0x3e8, _0x14a2be);
          }
        };
        _0x16efc0.provideFileList = function (_0x4bb25e) {
          log('session.provideFileList');
          if (!_0x16efc0.hostedFiles || !_0x16efc0.hostedFiles.length) {
            return;
          }
          var _0xaefcd6 = {};
          var _0x3b7f04 = [];
          for (var _0x3043bd = 0x0; _0x3043bd < _0x16efc0.hostedFiles.length; _0x3043bd++) {
            if (_0x16efc0.hostedFiles[_0x3043bd].restricted === false || _0x16efc0.hostedFiles[_0x3043bd].restricted === _0x4bb25e) {
              _0x3b7f04.push({
                'id': _0x16efc0.hostedFiles[_0x3043bd].id,
                'name': _0x16efc0.hostedFiles[_0x3043bd].name,
                'size': _0x16efc0.hostedFiles[_0x3043bd].size
              });
            }
          }
          _0xaefcd6.fileList = _0x3b7f04;
          if (_0x4bb25e in _0x16efc0.pcs) {
            _0x16efc0.sendMessage(_0xaefcd6, _0x4bb25e);
          } else if (_0x4bb25e in _0x16efc0.rpcs) {
            _0x16efc0.sendRequest(_0xaefcd6, _0x4bb25e);
          }
          log(_0xaefcd6);
        };
        _0x16efc0.pcs[_0x536e16].oniceconnectionstatechange = function (_0x346bd3) {
          if (!(_0x536e16 in _0x16efc0.pcs)) {
            return;
          }
          try {
            if (this.iceConnectionState === "closed") {
              log("ICE closed?");
            } else {
              if (this.iceConnectionState === "disconnected") {
                log("PCS: ICE Disconnected; wait for retry? pcs");
              } else {
                if (this.iceConnectionState === 'failed') {
                  log("ICE FAILed. bad?");
                  if (_0x16efc0.pcs[_0x536e16].restartIce) {
                    _0x16efc0.pcs[_0x536e16].restartIce();
                  } else {
                    _0x16efc0.createOffer(_0x536e16, true);
                  }
                } else if (this.iceConnectionState === "connected") {
                  log("iceConnectionState == connected");
                } else {
                  log(this.iceConnectionState);
                }
              }
            }
          } catch (_0x3c722f) {
            errorlog(_0x3c722f);
          }
        };
        _0x16efc0.pcs[_0x536e16].onconnectionstatechange = function (_0x407e80) {
          switch (_0x16efc0.pcs[_0x536e16].connectionState) {
            case "connected":
              log("CONNECTEED!");
              clearTimeout(_0x16efc0.pcs[_0x536e16].closeTimeout);
              if (_0x16efc0.security) {
                if (_0x16efc0.ws.readyState !== 0x1) {
                  _0x16efc0.ws.close();
                  break;
                }
                _0x16efc0.ws.close();
                setTimeout(function () {
                  if (_0x16efc0.cleanOutput != true) {
                    warnUser(miscTranslations["remote-peer-connected"]);
                  }
                }, 0x1);
              }
              break;
            case "disconnected":
              log("onconnectionstatechange pcs ice -- disconnected, but not yet closed? ");
              clearTimeout(_0x16efc0.pcs[_0x536e16].closeTimeout);
              _0x16efc0.pcs[_0x536e16].closeTimeout = setTimeout(function (_0x1930d5) {
                if (_0x1930d5 in _0x16efc0.pcs) {
                  warnlog(" --- PC TIMED OUT, but still alive. Killing it.");
                  log("closing 14");
                  _0x16efc0.closePC(_0x1930d5);
                } else {
                  errorlog(" --- PC TIMED OUT and already deleted. shouldn't happen");
                }
              }, 0x2710, _0x536e16);
              break;
            case 'failed':
              warnlog("Setting pc connection timeout in 5 seconds ??");
              clearTimeout(_0x16efc0.pcs[_0x536e16].closeTimeout);
              _0x16efc0.pcs[_0x536e16].closeTimeout = setTimeout(function (_0x3f344a) {
                if (_0x3f344a in _0x16efc0.pcs) {
                  warnlog(" --- PC TIMED OUT, but still alive. Killing it.");
                  log("closing 16");
                  _0x16efc0.closePC(_0x3f344a);
                } else {
                  errorlog(" --- PC TIMED OUT and already deleted. shouldn't happen");
                }
              }, 0xbb8, _0x536e16);
              break;
            case "closed":
              warnlog("pcs RTC CLOSED");
              log("closing 18");
              _0x16efc0.closePC(_0x536e16);
              break;
            default:
              log("rtc state: " + _0x16efc0.pcs[_0x536e16].connectionState);
              clearTimeout(_0x16efc0.pcs[_0x536e16].closeTimeout);
              break;
          }
        };
        _0x16efc0.pcs[_0x536e16].onclose = function (_0x21d4b9) {
          warnlog("WebRTC Connection Closed. Clean up. 657");
          log("closing 19");
          _0x16efc0.closePC(_0x536e16);
        };
        _0x16efc0.pcs[_0x536e16].onopen = function _0x56a8e3() {
          log("WEBRTC CONNECTION OPEN");
        };
      };
      _0x16efc0.processDescription2 = function (_0x290324) {
        if (_0x290324.description.type == "offer") {
          _0x16efc0.setupIncoming(_0x290324);
          _0x16efc0.connectPeer(_0x290324);
        } else {
          try {
            if (!(_0x290324.UUID in _0x16efc0.pcs)) {
              return;
            }
            var _0x4db7ef = _0x16efc0.maxvideobitrate;
            if (_0x16efc0.mobile && _0x16efc0.pcs[_0x290324.UUID].guest == true && _0x16efc0.pcs[_0x290324.UUID].forceios == false) {
              if (_0x4db7ef === false || _0x4db7ef > _0x16efc0.maxMobileBitrate) {
                var _0x55ceab = Object.keys(_0x16efc0.pcs).length;
                if (_0x16efc0.flagship) {
                  _0x4db7ef = _0x16efc0.maxMobileBitrate;
                } else {
                  if (_0x55ceab > 0x4) {
                    _0x4db7ef = _0x16efc0.lowMobileBitrate;
                  } else if ((iOS || iPad) && SafariVersion && SafariVersion <= 0xd) {
                    _0x4db7ef = _0x16efc0.lowMobileBitrate;
                  } else {
                    _0x4db7ef = _0x16efc0.maxMobileBitrate;
                  }
                }
              }
              if (iOS || iPad) {
                if (_0x4db7ef !== false) {
                  if (_0x16efc0.pcs[_0x290324.UUID].savedBitrate === false) {
                    _0x16efc0.pcs[_0x290324.UUID].setBitrate = _0x4db7ef;
                    _0x290324.description.sdp = CodecsHandler.preferCodec(_0x290324.description.sdp, "vp8");
                    _0x290324.description.sdp = CodecsHandler.setVideoBitrates(_0x290324.description.sdp, {
                      'min': parseInt(_0x4db7ef / 0xa) || 0x1,
                      'max': _0x4db7ef
                    });
                  } else if (_0x16efc0.pcs[_0x290324.UUID].savedBitrate > _0x4db7ef) {
                    _0x16efc0.pcs[_0x290324.UUID].setBitrate = _0x4db7ef;
                    _0x290324.description.sdp = CodecsHandler.preferCodec(_0x290324.description.sdp, "vp8");
                    _0x290324.description.sdp = CodecsHandler.setVideoBitrates(_0x290324.description.sdp, {
                      'min': parseInt(_0x4db7ef / 0xa) || 0x1,
                      'max': _0x4db7ef
                    });
                  }
                  _0x4db7ef = false;
                }
              }
            } else {
              if (_0x16efc0.pcs[_0x290324.UUID].guest == true) {
                if (_0x4db7ef !== false) {
                  if (_0x16efc0.roombitrate !== false) {
                    if (_0x16efc0.roombitrate < _0x4db7ef) {
                      _0x4db7ef = _0x16efc0.roombitrate;
                    }
                  }
                } else {
                  _0x4db7ef = _0x16efc0.roombitrate;
                }
                if ((iOS || iPad) && _0x16efc0.pcs[_0x290324.UUID].forceios) {
                  _0x16efc0.pcs[_0x290324.UUID].encoder = true;
                }
              } else {
                if (iOS || iPad) {
                  var _0x71313e = 0x0;
                  for (var _0x150152 in _0x16efc0.pcs) {
                    if (_0x290324.UUID !== _0x150152) {
                      if (_0x16efc0.pcs[_0x150152].encoder === true) {
                        _0x71313e += 0x1;
                      }
                    }
                  }
                  if (_0x71313e >= 0x3) {
                    if (_0x16efc0.pcs[_0x290324.UUID].forceios) {
                      _0x16efc0.pcs[_0x290324.UUID].encoder = true;
                      if (_0x16efc0.pcs[_0x290324.UUID].preferVideoCodec && _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec === "h264") {
                        _0x290324.description.sdp = CodecsHandler.preferCodec(_0x290324.description.sdp, "h264");
                        log("Trying to set " + _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec + " as preferred codec by viewer via API");
                      }
                    } else if (_0x16efc0.pcs[_0x290324.UUID].preferVideoCodec && _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec === 'vp9') {
                      _0x290324.description.sdp = CodecsHandler.preferCodec(_0x290324.description.sdp, "vp9");
                      log("Trying to set " + _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec + " as preferred codec by viewer via API");
                      _0x16efc0.pcs[_0x290324.UUID].encoder = false;
                    } else {
                      _0x290324.description.sdp = CodecsHandler.preferCodec(_0x290324.description.sdp, "vp8");
                      log("Setting Codec to vp8");
                      _0x16efc0.pcs[_0x290324.UUID].encoder = false;
                    }
                  } else if (_0x16efc0.pcs[_0x290324.UUID].preferVideoCodec && _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec !== "h264") {
                    if (_0x16efc0.pcs[_0x290324.UUID].preferVideoCodec === 'vp9' || _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec === 'vp8') {
                      _0x290324.description.sdp = CodecsHandler.preferCodec(_0x290324.description.sdp, _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec);
                      log("Trying to set " + _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec + " as preferred codec by viewer via API");
                      _0x16efc0.pcs[_0x290324.UUID].encoder = false;
                    } else {
                      _0x16efc0.pcs[_0x290324.UUID].encoder = true;
                    }
                  } else {
                    _0x16efc0.pcs[_0x290324.UUID].encoder = true;
                    if (_0x16efc0.pcs[_0x290324.UUID].preferVideoCodec && _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec === "h264") {
                      _0x290324.description.sdp = CodecsHandler.preferCodec(_0x290324.description.sdp, 'h264');
                      log("Trying to set " + _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec + " as preferred codec by viewer via API");
                    }
                  }
                } else if (_0x16efc0.pcs[_0x290324.UUID].preferVideoCodec) {
                  _0x290324.description.sdp = CodecsHandler.preferCodec(_0x290324.description.sdp, _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec);
                  log("Trying to set " + _0x16efc0.pcs[_0x290324.UUID].preferVideoCodec + " as preferred codec by viewer via API");
                }
              }
            }
            if (_0x4db7ef) {
              var _0x188292 = CodecsHandler.getVideoBitrates(_0x290324.description.sdp);
              log("BITRATE 1: " + _0x188292);
              if (_0x16efc0.pcs[_0x290324.UUID].savedBitrate !== false) {
                if (_0x16efc0.pcs[_0x290324.UUID].savedBitrate < _0x4db7ef) {
                  _0x4db7ef = false;
                }
              }
              if (_0x4db7ef === false) {
                _0x16efc0.pcs[_0x290324.UUID].setBitrate = _0x188292;
              } else {
                if (_0x188292 !== false && _0x188292 > _0x4db7ef) {
                  var _0x20c8e6 = CodecsHandler.getOpusBitrate(_0x290324.description.sdp) || 0x0;
                  _0x290324.description.sdp = CodecsHandler.setVideoBitrates(_0x290324.description.sdp, {
                    'min': parseInt(_0x4db7ef / 0xa) || 0x1,
                    'max': parseInt(_0x4db7ef + _0x20c8e6 / 0x400)
                  });
                  _0x16efc0.pcs[_0x290324.UUID].setBitrate = _0x4db7ef;
                } else {
                  if (_0x188292 === false) {
                    var _0x20c8e6 = CodecsHandler.getOpusBitrate(_0x290324.description.sdp) || 0x0;
                    _0x290324.description.sdp = CodecsHandler.setVideoBitrates(_0x290324.description.sdp, {
                      'min': parseInt(_0x4db7ef / 0xa) || 0x1,
                      'max': parseInt(_0x4db7ef + _0x20c8e6 / 0x400)
                    });
                    if (_0x16efc0.outboundVideoBitrate && _0x16efc0.outboundVideoBitrate > _0x4db7ef) {
                      _0x16efc0.pcs[_0x290324.UUID].setBitrate = _0x4db7ef;
                    } else if (_0x16efc0.outboundVideoBitrate) {
                      _0x16efc0.pcs[_0x290324.UUID].setBitrate = _0x16efc0.outboundVideoBitrate;
                    } else {
                      _0x16efc0.pcs[_0x290324.UUID].savedBitrate = 0x9c4;
                    }
                  } else {
                    _0x16efc0.pcs[_0x290324.UUID].setBitrate = _0x188292;
                  }
                }
              }
            } else {
              if (_0x16efc0.outboundVideoBitrate !== false) {
                var _0x188292 = CodecsHandler.getVideoBitrates(_0x290324.description.sdp);
                log("BITRATE 2: " + _0x188292);
                if (_0x188292 === false) {
                  var _0x20c8e6 = CodecsHandler.getOpusBitrate(_0x290324.description.sdp) || 0x0;
                  _0x290324.description.sdp = CodecsHandler.setVideoBitrates(_0x290324.description.sdp, {
                    'min': parseInt(_0x16efc0.outboundVideoBitrate / 0xa) || 0x1,
                    'max': parseInt(_0x16efc0.outboundVideoBitrate + _0x20c8e6 / 0x400)
                  });
                } else if (_0x16efc0.pcs[_0x290324.UUID].setBitrate === false) {
                  _0x16efc0.pcs[_0x290324.UUID].setBitrate = _0x188292;
                }
              } else if (_0x16efc0.pcs[_0x290324.UUID].setBitrate === false) {
                _0x16efc0.pcs[_0x290324.UUID].setBitrate = CodecsHandler.getVideoBitrates(_0x290324.description.sdp);
                log("BITRATE 3: " + _0x16efc0.pcs[_0x290324.UUID].setBitrate);
              }
            }
            if (_0x16efc0.outboundAudioBitrate) {
              _0x290324.description.sdp = CodecsHandler.setOpusAttributes(_0x290324.description.sdp, {
                'maxaveragebitrate': _0x16efc0.outboundAudioBitrate * 0x400,
                'cbr': _0x16efc0.cbr
              });
            }
            if ('session' in _0x290324 && _0x290324.session != _0x16efc0.pcs[_0x290324.UUID].session) {
              errorlog("Answer SDP does not have a matching session ID");
              return;
            }
            _0x16efc0.pcs[_0x290324.UUID].setRemoteDescription(_0x290324.description).then()["catch"](errorlog);
          } catch (_0xa1f510) {
            errorlog(_0xa1f510);
          }
        }
      };
      _0x16efc0.processDescription = function (_0x114c1a) {
        if (_0x16efc0.password && "vector" in _0x114c1a) {
          _0x16efc0.decryptMessage(_0x114c1a.description, _0x114c1a.vector).then(function (_0x7ad7f7) {
            _0x114c1a.description = JSON.parse(_0x7ad7f7);
            _0x16efc0.processDescription2(_0x114c1a);
          });
        } else {
          _0x16efc0.processDescription2(_0x114c1a);
        }
      };
      _0x16efc0.processIce = function (_0x5dfec1) {
        if (_0x16efc0.password && "vector" in _0x5dfec1) {
          _0x16efc0.decryptMessage(_0x5dfec1.candidate, _0x5dfec1.vector).then(function (_0x365bd7) {
            _0x5dfec1.candidate = JSON.parse(_0x365bd7);
            _0x16efc0.processIce2(_0x5dfec1);
          });
        } else {
          _0x16efc0.processIce2(_0x5dfec1);
        }
      };
      _0x16efc0.processIce2 = function (_0x42aaad) {
        try {
          if (_0x16efc0.icefilter) {
            if (_0x42aaad.candidate.candidate.indexOf(_0x16efc0.icefilter) === -0x1) {
              log("dropped candidate due to filter");
              log(_0x42aaad.candidate);
              return;
            } else {
              log("PASSED");
              log(_0x42aaad.candidate);
            }
          }
        } catch (_0x31f0ed) {
          errorlog(_0x31f0ed);
        }
        if (_0x42aaad.candidate && 'candidate' in _0x42aaad.candidate && _0x42aaad.candidate.candidate == '') {
          return;
        }
        if (_0x42aaad.UUID in _0x16efc0.pcs && _0x42aaad.type == "remote") {
          log("PCS WINS ICE");
          if ('session' in _0x42aaad && _0x16efc0.pcs[_0x42aaad.UUID].session != _0x42aaad.session) {
            errorlog("Incoming Ice Offer does not match Session");
            return;
          }
          _0x16efc0.pcs[_0x42aaad.UUID].addIceCandidate(_0x42aaad.candidate).then()["catch"](function (_0x28c2e8) {});
        } else {
          if (_0x42aaad.UUID in _0x16efc0.rpcs && _0x42aaad.type == 'local') {
            log("RPCS WINS ICE");
            if ("session" in _0x42aaad && _0x16efc0.rpcs[_0x42aaad.UUID].session != _0x42aaad.session) {
              errorlog("Incoming Ice Offer does not match Session");
              return;
            }
            if (_0x16efc0.rpcs[_0x42aaad.UUID] === null) {
              return;
            }
            _0x16efc0.rpcs[_0x42aaad.UUID].addIceCandidate(_0x42aaad.candidate).then()["catch"](function (_0x107bdc) {});
          } else {
            warnlog(_0x42aaad);
            warnlog("ICE DID NOT FIND A PC OPTION? peer might have left before ICE complete");
          }
        }
      };
      _0x16efc0.processIceBundle = function (_0x255292) {
        if (_0x16efc0.password && "vector" in _0x255292) {
          _0x16efc0.decryptMessage(_0x255292.candidates, _0x255292.vector).then(function (_0x21919a) {
            _0x255292.candidates = JSON.parse(_0x21919a);
            var _0x12326b = {
              UUID: _0x255292.UUID,
              "type": _0x255292.type
            };
            for (var _0x3af478 = 0x0; _0x3af478 < _0x255292.candidates.length; _0x3af478++) {
              _0x12326b.candidate = _0x255292.candidates[_0x3af478];
              _0x16efc0.processIce2(_0x12326b);
            }
          });
        } else {
          var _0x20d2ff = {
            UUID: _0x255292.UUID,
            "type": _0x255292.type
          };
          for (var _0x35eaa8 = 0x0; _0x35eaa8 < _0x255292.candidates.length; _0x35eaa8++) {
            _0x20d2ff.candidate = _0x255292.candidates[_0x35eaa8];
            _0x16efc0.processIce2(_0x20d2ff);
          }
        }
      };
      _0x16efc0.connectPeer = async function (_0x441b59) {
        if ("screen" in _0x441b59) {
          _0x16efc0.rpcs[_0x441b59.UUID].screenIndexes = _0x441b59.screen;
          log("SCREENS");
          log(_0x441b59.screen);
        }
        warnlog(_0x441b59);
        if (_0x16efc0.removeOrientationFlag && _0x441b59.description && _0x441b59.description.sdp && _0x441b59.description.sdp.includes("a=extmap:3 urn:3gpp:video-orientation\r\n")) {
          _0x441b59.description.sdp = _0x441b59.description.sdp.replace("a=extmap:3 urn:3gpp:video-orientation\r\n", '');
          warnlog("removed from SDP: 'a=extmap:3 urn:3gpp:video-orientation\r\n'");
        }
        _0x16efc0.rpcs[_0x441b59.UUID].setRemoteDescription(_0x441b59.description).then(async function () {
          if (_0x16efc0.rpcs[_0x441b59.UUID].remoteDescription.type === 'offer') {
            _0x16efc0.rpcs[_0x441b59.UUID].createAnswer().then(function (_0x237dbe) {
              log("creating answer");
              if (_0x16efc0.rpcs[_0x441b59.UUID].whip) {
                return _0x16efc0.rpcs[_0x441b59.UUID].setLocalDescription(_0x237dbe);
              }
              if (!_0x16efc0.director && _0x16efc0.stereo == 0x5) {
                _0x237dbe.sdp = CodecsHandler.setOpusAttributes(_0x237dbe.sdp, {
                  'stereo': 0x1,
                  'maxaveragebitrate': (_0x16efc0.audiobitrate || 0x100) * 0x400,
                  'cbr': _0x16efc0.cbr,
                  'useinbandfec': _0x16efc0.noFEC ? 0x0 : 0x1,
                  'maxptime': _0x16efc0.maxptime,
                  'minptime': _0x16efc0.minptime,
                  'ptime': _0x16efc0.ptime,
                  'dtx': _0x16efc0.dtx
                });
                log("stereo inbound enabled");
              } else {
                if (_0x16efc0.mono && Firefox) {
                  if (_0x16efc0.audiobitrate) {
                    _0x237dbe.sdp = CodecsHandler.setOpusAttributes(_0x237dbe.sdp, {
                      'stereo': 0x0,
                      'maxaveragebitrate': _0x16efc0.audiobitrate * 0x400,
                      'cbr': _0x16efc0.cbr,
                      'useinbandfec': _0x16efc0.noFEC ? 0x0 : 0x1,
                      'maxptime': _0x16efc0.maxptime,
                      'minptime': _0x16efc0.minptime,
                      'ptime': _0x16efc0.ptime,
                      'dtx': _0x16efc0.dtx
                    });
                  } else {
                    _0x237dbe.sdp = CodecsHandler.setOpusAttributes(_0x237dbe.sdp, {
                      'stereo': 0x0,
                      'useinbandfec': _0x16efc0.noFEC ? 0x0 : 0x1,
                      'maxptime': _0x16efc0.maxptime,
                      'minptime': _0x16efc0.minptime,
                      'ptime': _0x16efc0.ptime,
                      'dtx': _0x16efc0.dtx
                    });
                  }
                } else {
                  if (_0x16efc0.stereo == 0x1 || _0x16efc0.stereo == 0x2 || _0x16efc0.stereo == 0x5) {
                    _0x237dbe.sdp = CodecsHandler.setOpusAttributes(_0x237dbe.sdp, {
                      'stereo': 0x1,
                      'maxaveragebitrate': (_0x16efc0.audiobitrate || 0x100) * 0x400,
                      'cbr': _0x16efc0.cbr,
                      'useinbandfec': _0x16efc0.noFEC ? 0x0 : 0x1,
                      'maxptime': _0x16efc0.maxptime,
                      'minptime': _0x16efc0.minptime,
                      'ptime': _0x16efc0.ptime,
                      'dtx': _0x16efc0.dtx
                    });
                    log("stereo inbound enabled");
                  } else {
                    if (_0x16efc0.stereo == 0x4) {
                      _0x237dbe.sdp = CodecsHandler.setOpusAttributes(_0x237dbe.sdp, {
                        'stereo': 0x2,
                        'maxaveragebitrate': (_0x16efc0.audiobitrate || 0x100) * 0x400,
                        'cbr': _0x16efc0.cbr,
                        'useinbandfec': _0x16efc0.noFEC ? 0x0 : 0x1,
                        'maxptime': _0x16efc0.maxptime,
                        'minptime': _0x16efc0.minptime,
                        'ptime': _0x16efc0.ptime,
                        'dtx': _0x16efc0.dtx
                      });
                    } else {
                      if (_0x16efc0.audiobitrate) {
                        _0x237dbe.sdp = CodecsHandler.setOpusAttributes(_0x237dbe.sdp, {
                          'maxaveragebitrate': _0x16efc0.audiobitrate * 0x400,
                          'cbr': _0x16efc0.cbr,
                          'useinbandfec': _0x16efc0.noFEC ? 0x0 : 0x1,
                          'maxptime': _0x16efc0.maxptime,
                          'minptime': _0x16efc0.minptime,
                          'ptime': _0x16efc0.ptime,
                          'dtx': _0x16efc0.dtx
                        });
                      } else {
                        if (_0x16efc0.noFEC) {
                          _0x237dbe.sdp = CodecsHandler.setOpusAttributes(_0x237dbe.sdp, {
                            'useinbandfec': 0x0,
                            'maxptime': _0x16efc0.maxptime,
                            'minptime': _0x16efc0.minptime,
                            'ptime': _0x16efc0.ptime,
                            'dtx': _0x16efc0.dtx
                          });
                        } else if (_0x16efc0.dtx) {
                          _0x237dbe.sdp = CodecsHandler.setOpusAttributes(_0x237dbe.sdp, {
                            'maxptime': _0x16efc0.maxptime,
                            'minptime': _0x16efc0.minptime,
                            'ptime': _0x16efc0.ptime,
                            'dtx': _0x16efc0.dtx
                          });
                        }
                      }
                    }
                  }
                }
              }
              if (_0x16efc0.audioCodec) {
                try {
                  if (_0x16efc0.audioCodec === "lyra") {
                    _0x237dbe.sdp = CodecsHandler.modifyDescLyra(_0x237dbe.sdp);
                  } else {
                    if (_0x16efc0.audioCodec === 'pcm') {
                      if (_0x16efc0.mono) {
                        _0x237dbe.sdp = CodecsHandler.modifyDescPCM(_0x237dbe.sdp, _0x16efc0.sampleRate || 0xbb80, false, _0x16efc0.ptime);
                      } else if (_0x16efc0.stereo) {
                        _0x237dbe.sdp = CodecsHandler.modifyDescPCM(_0x237dbe.sdp, _0x16efc0.sampleRate || 0x7d00, true, _0x16efc0.ptime);
                      } else {
                        _0x237dbe.sdp = CodecsHandler.modifyDescPCM(_0x237dbe.sdp, _0x16efc0.sampleRate || 0xbb80, false, _0x16efc0.ptime);
                      }
                    } else {
                      _0x237dbe.sdp = CodecsHandler.preferAudioCodec(_0x237dbe.sdp, _0x16efc0.audioCodec);
                    }
                  }
                } catch (_0x43987b) {
                  errorlog(_0x43987b);
                  warnlog("couldn't set preferred audio codec");
                }
              }
              if (_0x16efc0.codecs && _0x16efc0.codecs.length) {
                for (var _0x2e7d3c = _0x16efc0.codecs.length - 0x1; _0x2e7d3c >= 0x0; _0x2e7d3c--) {
                  try {
                    _0x237dbe.sdp = CodecsHandler.preferCodec(_0x237dbe.sdp, _0x16efc0.codecs[_0x2e7d3c]);
                  } catch (_0x46eca6) {
                    errorlog(_0x46eca6);
                    break;
                  }
                }
              }
              if (_0x16efc0.codec) {
                _0x237dbe.sdp = CodecsHandler.preferCodec(_0x237dbe.sdp, _0x16efc0.codec);
              }
              if (_0x16efc0.h264profile) {
                log("h264profile being modified");
                _0x237dbe.sdp = _0x237dbe.sdp.replace(/42e01f/gi, _0x16efc0.h264profile);
                _0x237dbe.sdp = _0x237dbe.sdp.replace(/42001f/gi, _0x16efc0.h264profile);
                _0x237dbe.sdp = _0x237dbe.sdp.replace(/420029/gi, _0x16efc0.h264profile);
                _0x237dbe.sdp = _0x237dbe.sdp.replace(/42a01e/gi, _0x16efc0.h264profile);
                _0x237dbe.sdp = _0x237dbe.sdp.replace(/42a014/gi, _0x16efc0.h264profile);
                _0x237dbe.sdp = _0x237dbe.sdp.replace(/42a00b/gi, _0x16efc0.h264profile);
                _0x237dbe.sdp = _0x237dbe.sdp.replace(/640c1f/gi, _0x16efc0.h264profile);
              }
              if (_0x16efc0.noNacks) {
                log(_0x237dbe.sdp);
                _0x237dbe.sdp = CodecsHandler.disableNACK(_0x237dbe.sdp);
              }
              if (_0x16efc0.noPLIs) {
                _0x237dbe.sdp = CodecsHandler.disablePLI(_0x237dbe.sdp);
              }
              if (_0x16efc0.noREMB) {
                _0x237dbe.sdp = CodecsHandler.disableREMB(_0x237dbe.sdp);
              }
              if (_0x16efc0.rpcs[_0x441b59.UUID].manualBandwidth) {
                log("bit rate being munged");
                _0x237dbe.sdp = _0x168326(_0x237dbe.sdp, _0x16efc0.rpcs[_0x441b59.UUID].manualBandwidth);
              } else if (_0x16efc0.bitrate) {
                log("bit rate being munged");
                _0x237dbe.sdp = _0x168326(_0x237dbe.sdp, _0x16efc0.bitrate);
              }
              log(_0x237dbe);
              return _0x16efc0.rpcs[_0x441b59.UUID].setLocalDescription(_0x237dbe);
            }).then(function _0x12f450() {
              log("providing answer");
              if (_0x16efc0.rpcs[_0x441b59.UUID].whip) {
                if (_0x16efc0.rpcs[_0x441b59.UUID].whipCallback) {
                  _0x16efc0.rpcs[_0x441b59.UUID].whipCallback();
                }
                return;
              }
              var _0x571d8d = {
                "UUID": _0x441b59.UUID,
                description: _0x16efc0.rpcs[_0x441b59.UUID].localDescription,
                session: _0x16efc0.rpcs[_0x441b59.UUID].session
              };
              if (_0x16efc0.password) {
                _0x16efc0.encryptMessage(JSON.stringify(_0x571d8d.description)).then(function (_0x59c374) {
                  _0x571d8d.description = _0x59c374[0x0];
                  _0x571d8d.vector = _0x59c374[0x1];
                  _0x16efc0.anyrequest(_0x571d8d);
                })["catch"](errorlog);
              } else {
                _0x16efc0.anyrequest(_0x571d8d);
              }
            })["catch"](errorlog);
          } else if (_0x16efc0.rpcs[_0x441b59.UUID].remoteDescription.type === 'answer') {
            errorlog("Someone sent us an ANSWER sdp??");
          }
        })['catch'](errorlog);
      };
      _0x16efc0.getLocalStream = function () {
        if (_0x16efc0.videoElement && _0x16efc0.videoElement.srcObject) {
          return _0x16efc0.videoElement.srcObject;
        } else {
          return _0x16efc0.videoElement && _0x16efc0.videoElement.src && _0x16efc0.streamSrc ? _0x16efc0.streamSrc : (log("checkBasicStreamsExist"), checkBasicStreamsExist(), _0x16efc0.videoElement.srcObject);
        }
      };
      var _0x5a52f1 = {};
      var _0x31a5e1 = false;
      var _0x3039a5 = [];
      _0x16efc0.sendFile = function (_0x5be5c9, _0x1c21db) {
        log("SENDING FILE: " + _0x1c21db + " " + _0x5be5c9);
        var _0x61058b = new FileReader();
        var _0x49dba5 = false;
        for (var _0x5a862b = 0x0; _0x5a862b < _0x16efc0.hostedFiles.length; _0x5a862b++) {
          if (_0x16efc0.hostedFiles[_0x5a862b].id === _0x1c21db) {
            _0x49dba5 = _0x5a862b;
            break;
          }
        }
        if (_0x49dba5 === false) {
          warnlog("requested file was not found");
          return;
        } else {
          if (_0x16efc0.hostedFiles[_0x49dba5].state == 0x0) {
            warnlog("requested file has been removed.");
            return;
          } else {
            if (!(_0x16efc0.hostedFiles[_0x49dba5].restricted === false || _0x16efc0.hostedFiles[_0x49dba5].restricted === _0x5be5c9)) {
              warnlog("user didn't have access for this file.");
              return;
            }
          }
        }
        var _0x3c22a1 = 0x0;
        var _0x466be8 = _0x49dba5;
        if (_0x466be8 === "sendChannel") {
          _0x466be8 = "sendChannel_" + _0x16efc0.generateStreamID(0x5);
        }
        if (_0x5be5c9 in _0x16efc0.pcs) {
          var _0x9cdaa0 = _0x16efc0.pcs[_0x5be5c9].createDataChannel(_0x466be8);
        } else {
          if (_0x5be5c9 in _0x16efc0.rpcs) {
            var _0x9cdaa0 = _0x16efc0.rpcs[_0x5be5c9].createDataChannel(_0x466be8);
          } else {
            warnlog("UUID does not exist");
            return;
          }
        }
        _0x9cdaa0.binaryType = 'arraybuffer';
        var _0xee3d96 = _0x16efc0.hostedFiles[_0x49dba5].slice(0x0, 0x4000);
        _0x9cdaa0.onopen = () => {
          _0x9cdaa0.send(JSON.stringify({
            'type': 'filetransfer',
            'size': _0x16efc0.hostedFiles[_0x49dba5].size,
            'filename': _0x16efc0.hostedFiles[_0x49dba5].name,
            'id': _0x16efc0.hostedFiles[_0x49dba5].id
          }));
          _0x61058b.readAsArrayBuffer(_0xee3d96);
        };
        _0x9cdaa0.onclose = () => {
          try {
            var _0x4f3f51 = _0x16efc0.hostedTransfers.indexOf(_0x9cdaa0);
            if (_0x4f3f51 > -0x1) {
              _0x16efc0.hostedTransfers.splice(_0x4f3f51, 0x1);
            }
          } catch (_0x1b4d2b) {
            errorlog(_0x1b4d2b);
          }
          log("Transfer ended");
          _0x9cdaa0 = null;
        };
        _0x9cdaa0.onmessage = _0x2315f0 => {};
        _0x16efc0.hostedTransfers.push(_0x9cdaa0);
        _0x61058b.onload = function () {
          if (_0x16efc0.hostedFiles[_0x49dba5].state == 0x0) {
            return;
          }
          var _0x1aa03b = _0x61058b.result;
          log(_0x1aa03b);
          try {
            _0x9cdaa0.send(_0x1aa03b);
          } catch (_0x31c9b5) {
            try {
              _0x9cdaa0.close();
            } catch (_0x28715b) {}
            warnlog(_0x31c9b5);
            return;
          }
          _0x3c22a1 += 0x1;
          if (_0x3c22a1 * 0x4000 < _0x16efc0.hostedFiles[_0x49dba5].size) {
            try {
              log('cid:' + _0x3c22a1);
              _0xee3d96 = _0x16efc0.hostedFiles[_0x49dba5].slice(_0x3c22a1 * 0x4000, (_0x3c22a1 + 0x1) * 0x4000);
              _0x61058b.readAsArrayBuffer(_0xee3d96);
            } catch (_0x47da25) {
              errorlog(_0x47da25);
            }
          } else {
            _0x9cdaa0.send("EOF1");
            _0x9cdaa0.close();
          }
        };
      };
      _0x16efc0.chunkedVideoEnabled = null;
      _0x16efc0.chunkedAudioEnabled = null;
      _0x16efc0.webCodec = async function (_0xf80cca = null) {
        if (_0x16efc0.chunkedVideoEnabled !== null) {
          return;
        } else {
          _0x16efc0.chunkedVideoEnabled = false;
        }
        if (!_0xf80cca && _0x16efc0.stats.Chunked_video) {
          _0xf80cca = _0x16efc0.stats.Chunked_video;
        }
        let _0x3438b0 = 0x0;
        var _0x4182d9 = _0x16efc0.streamSrc.getVideoTracks()[0x0];
        if (!_0x4182d9) {
          _0x16efc0.chunkedVideoEnabled = null;
          return;
        }
        var _0x441cf9 = new MediaStreamTrackProcessor(_0x4182d9);
        var _0x3b26ae = _0x441cf9.readable;
        const _0x355ce5 = _0x3b26ae.getReader();
        var _0x477472 = -0x1;
        var _0x3741f5 = -0x1;
        const _0x201160 = {
          'output': _0x43624d => {
            if (_0x43624d.constructor.name == "EncodedVideoChunk") {
              let _0x23812b = new Uint8Array(_0x43624d.byteLength);
              _0x43624d.copyTo(_0x23812b);
              _0x3039a5.push([_0x43624d.timestamp - _0x3741f5, _0x43624d.type]);
              _0x3039a5.push(_0x23812b);
              _0x31a5e1.sendChunks("video");
            }
          },
          'error': _0x1c27aa => {
            errorlog(_0x1c27aa);
          }
        };
        let _0x5da57a = new VideoEncoder(_0x201160);
        _0x5da57a.configure(_0xf80cca);
        _0x16efc0.stats.Chunked_video = _0xf80cca;
        _0x31a5e1.videoEncoder = _0x5da57a;
        var _0x311410 = new Promise((_0x572da7, _0x3faebf) => {});
        _0x311410.resolve = _0x572da7;
        _0x355ce5.read().then(function _0x5ea005({
          done: _0x402f23,
          value: _0x11f6a7
        }) {
          if (_0x402f23 || false) {
            _0x5da57a.close();
            if (_0x11f6a7) {
              _0x11f6a7.close();
            }
            _0x16efc0.chunkedVideoEnabled = null;
            return;
          }
          if (_0x3741f5 == -0x1) {
            _0x3741f5 = _0x11f6a7.timestamp;
            _0x16efc0.stats.Chunked_video.realTime = Date.now();
            _0x311410.resolve();
          }
          if (_0x477472 == _0x11f6a7.timestamp) {
            _0x11f6a7.timestamp += 0x1;
            warnlog("Timestamp duplicated");
          }
          _0x477472 = _0x11f6a7.timestamp;
          _0x3438b0++;
          if (_0x31a5e1.needKeyFrame) {
            const _0x22e5f5 = _0x3438b0 >= 0x3c;
            if (_0x22e5f5) {
              _0x3438b0 = 0x0;
              _0x31a5e1.needKeyFrame = false;
              warnlog("Keyframe inserted");
            }
            _0x5da57a.encode(_0x11f6a7, {
              'keyFrame': _0x22e5f5
            });
          } else {
            _0x5da57a.encode(_0x11f6a7, {
              'keyFrame': false
            });
          }
          _0x11f6a7.close();
          _0x355ce5.read().then(_0x5ea005);
        });
        _0x16efc0.chunkedVideoEnabled = true;
        await _0x311410;
      };
      _0x16efc0.webCodecAudio = async function (_0x305cb0) {
        if (_0x16efc0.chunkedAudioEnabled !== null) {
          return;
        } else {
          _0x16efc0.chunkedAudioEnabled = false;
        }
        if (!_0x305cb0 && _0x16efc0.stats.Chunked_audio) {
          _0x305cb0 = _0x16efc0.stats.Chunked_audio;
        }
        var _0x4d200e = _0x16efc0.videoElement.srcObject.getAudioTracks()[0x0];
        if (!_0x4d200e) {
          _0x16efc0.chunkedAudioEnabled = null;
          return;
        }
        var _0x374d29 = _0x4d200e.getSettings();
        if (_0x305cb0.numberOfChannels > _0x374d29.channelCount) {
          _0x305cb0.numberOfChannels = _0x374d29.channelCount;
          _0x305cb0.channels = _0x374d29.channelCount;
        }
        if (_0x305cb0.sampleRate > _0x374d29.sampleRate) {
          _0x305cb0.sampleRate = _0x374d29.sampleRate;
        }
        var _0x11d816 = new MediaStreamTrackProcessor(_0x4d200e);
        var _0x319317 = _0x11d816.readable;
        const _0x5d47f2 = _0x319317.getReader();
        var _0xf75b06 = -0x1;
        var _0x22849d = -0x1;
        const _0xc9801a = {
          'output': _0x53f171 => {
            if (_0x53f171.constructor.name == "EncodedAudioChunk") {
              let _0x1a571b = new Uint8Array(_0x53f171.byteLength);
              _0x53f171.copyTo(_0x1a571b);
              _0x3039a5.push([_0x53f171.timestamp - _0x22849d, "audio"]);
              _0x3039a5.push(_0x1a571b);
              _0x31a5e1.sendChunks("audio");
            }
          },
          'error': _0x2c5323 => {
            errorlog(_0x2c5323);
          }
        };
        let _0x46f442 = new AudioEncoder(_0xc9801a);
        _0x46f442.configure(_0x305cb0);
        _0x16efc0.stats.Chunked_audio = {};
        _0x16efc0.stats.Chunked_audio.codec = _0x305cb0.codec;
        _0x16efc0.stats.Chunked_audio.numberOfChannels = _0x305cb0.numberOfChannels;
        _0x16efc0.stats.Chunked_audio.sampleRate = _0x305cb0.sampleRate;
        _0x16efc0.stats.Chunked_audio.bitrate = _0x305cb0.tuning.bitrate;
        var _0x5a2ca0 = new Promise((_0x170d1f, _0x59f36b) => {});
        _0x5a2ca0.resolve = _0x170d1f;
        _0x5d47f2.read().then(function _0x43f93e({
          done: _0x469797,
          value: _0x365393
        }) {
          if (_0x469797 || false) {
            _0x46f442.close();
            if (_0x365393) {
              _0x365393.close();
            }
            _0x16efc0.chunkedAudioEnabled = null;
            return;
          }
          if (_0x22849d == -0x1) {
            _0x22849d = _0x365393.timestamp;
            _0x16efc0.stats.Chunked_audio.realTime = Date.now();
            _0x5a2ca0.resolve();
          }
          if (_0xf75b06 == _0x365393.timestamp) {
            _0x365393.timestamp += 0x1;
          }
          _0xf75b06 = _0x365393.timestamp;
          _0x46f442.encode(_0x365393);
          _0x365393.close();
          _0x5d47f2.read().then(_0x43f93e);
        });
        _0x16efc0.chunkedAudioEnabled = true;
        await _0x5a2ca0;
      };
      _0x16efc0.getPCM = function (_0x54baa9) {
        warnlog("PCM STARTED");
        const _0x4a0a4b = window.AudioContext || window.webkitAudioContext;
        const _0x1d0022 = new _0x4a0a4b();
        const _0x26b4dd = _0x1d0022.createMediaStreamSource(_0x54baa9);
        const _0x5e851e = (_0x1d0022.createScriptProcessor || _0x1d0022.createJavaScriptNode).call(_0x1d0022, 0x800, 0x1, 0x1);
        _0x5e851e.onaudioprocess = function (_0x1c65b1) {
          var _0x50b824 = new Uint8Array(_0x1c65b1.inputBuffer.getChannelData(0x0).buffer);
          _0x3039a5.push([0x0, 'pcm']);
          _0x3039a5.push(_0x50b824);
          _0x31a5e1.sendChunks("pcm");
        };
        _0x26b4dd.connect(_0x5e851e);
        _0x5e851e.connect(_0x1d0022.destination);
        _0x16efc0.stats.Chunked_audio = {};
        _0x16efc0.chunkedAudioEnabled = true;
        return _0x5e851e;
      };
      _0x16efc0.chunkedStream = async function (_0xb8f016) {
        log("SENDING CHUNKS TO: " + _0xb8f016);
        if (!_0x16efc0.chunkedVideoEnabled && _0x16efc0.stats.Chunked_video) {
          config = _0x16efc0.stats.Chunked_video;
          await _0x16efc0.webCodec(config);
        }
        if (!_0x16efc0.chunkedAudioEnabled && _0x16efc0.stats.Chunked_audio) {
          config = _0x16efc0.stats.Chunked_audio;
          await _0x16efc0.webCodecAudio(config);
        }
        if (_0xb8f016 in _0x5a52f1) {
          return;
        }
        if (!_0x31a5e1) {
          var _0x3a94a9 = _0x16efc0.getLocalStream();
          var _0x3aa575 = _0x16efc0.chunked;
          var _0x3be28d = null;
          if (_0x16efc0.maxvideobitrate && _0x16efc0.maxvideobitrate < _0x3aa575) {
            _0x3aa575 = _0x16efc0.maxvideobitrate;
          }
          var _0x1554f1 = {
            'codec': "vp09.00.10.08",
            'width': 0x780,
            'height': 0x438,
            'bitrate': parseInt(_0x3aa575 * 0x3e8),
            'frameRate': 0x1e,
            'latencyMode': 'realtime'
          };
          if (_0x16efc0.alpha) {
            _0x1554f1.alpha = 'keep';
          }
          var _0x27bc17 = _0x3a94a9.getVideoTracks();
          if (_0x27bc17.length) {
            var _0x57caa9 = _0x27bc17[0x0].getSettings();
            if (_0x57caa9.width) {
              _0x1554f1.width = _0x57caa9.width;
            }
            if (_0x57caa9.height) {
              _0x1554f1.height = _0x57caa9.height;
            }
            if (_0x57caa9.frameRate) {
              _0x1554f1.frameRate = _0x57caa9.frameRate;
            }
          } else {
            _0x1554f1 = false;
          }
          if (_0x3aa575 < 0x259) {
            var _0x2ee984 = _0x1554f1.width * _0x1554f1.height / 230400;
            if (_0x2ee984 >= 0x2) {
              _0x1554f1.width = parseInt(_0x1554f1.width / 0x2);
              _0x1554f1.height = parseInt(_0x1554f1.height / 0x2);
            } else if (_0x2ee984 >= 1.5) {
              _0x1554f1.width = parseInt(_0x1554f1.width / 1.5);
              _0x1554f1.height = parseInt(_0x1554f1.height / 1.5);
            }
          }
          var _0x288f89 = {
            'codec': 'opus',
            'numberOfChannels': 0x2,
            'channels': 0x2,
            'sampleRate': 0xbb80,
            'bitrate': 0xfa00,
            'tuning': {
              'bitrate': 0xfa00
            }
          };
          if (_0x3aa575 > 0xbb8) {
            var _0x288f89 = {
              'codec': 'opus',
              'numberOfChannels': 0x2,
              'channels': 0x2,
              'sampleRate': 0xbb80,
              'tuning': {
                'bitrate': 0x1f400
              }
            };
          } else {
            if (_0x3aa575 < 0x259) {
              var _0x288f89 = {
                'codec': "opus",
                'numberOfChannels': 0x2,
                'channels': 0x2,
                'sampleRate': 0xbb80,
                'tuning': {
                  'bitrate': 0x7d00
                }
              };
            }
          }
          if (_0x16efc0.pcm) {
            _0x288f89 = {
              'codec': "pcm",
              'numberOfChannels': 0x2,
              'channels': 0x2,
              'sampleRate': 0xbb80
            };
          }
          if (!_0x3a94a9.getAudioTracks().length) {
            _0x288f89 = false;
          }
          if (!_0x288f89 && !_0x1554f1) {
            return;
          }
          _0x31a5e1 = {};
          _0x31a5e1.needKeyFrame = true;
          _0x31a5e1.configVideo = _0x1554f1 || false;
          _0x31a5e1.configAudio = _0x288f89 || false;
          if (_0x31a5e1.configVideo) {
            await _0x16efc0.webCodec(_0x31a5e1.configVideo);
          }
          if (_0x31a5e1.configAudio) {
            if (_0x31a5e1.configAudio.codec == "pcm") {
              _0x16efc0.getPCM(_0x3a94a9);
            } else {
              await _0x16efc0.webCodecAudio(_0x31a5e1.configAudio);
            }
          }
          _0x31a5e1.sendChunks = function (_0x459beb = 'null') {
            if (_0x3be28d) {
              return;
            }
            _0x3be28d = true;
            var _0xc33d93 = _0x459beb;
            while (_0x3039a5.length) {
              if (!Object.keys(_0x5a52f1).length) {
                _0x3039a5 = [];
                _0x3be28d = null;
                _0x16efc0.stats.chunkedInQueue = 0x0;
                return;
              }
              _0x16efc0.stats.chunkedInQueue = _0x3039a5.length;
              var _0x2ef7ef = 0x0;
              var _0x475848 = _0x3039a5.shift();
              if (_0x475848.length === 0x2) {
                _0xc33d93 = _0x475848[0x1];
                _0x475848.push(_0x3039a5.length);
                var _0x540b7b = JSON.stringify(_0x475848);
                for (var _0x2ef9b6 in _0x5a52f1) {
                  if ((_0xc33d93 == "key" || _0xc33d93 == "delta" || _0xc33d93 == 'video') && !_0x16efc0.pcs[_0x2ef9b6].allowVideo) {
                    continue;
                  }
                  if ((_0xc33d93 == 'audio' || _0xc33d93 == "pcm") && !_0x16efc0.pcs[_0x2ef9b6].allowAudio) {
                    continue;
                  }
                  try {
                    if (_0x5a52f1[_0x2ef9b6].readyState === 'open') {
                      _0x5a52f1[_0x2ef9b6].send(_0x540b7b);
                    }
                    _0x16efc0.pcs[_0x2ef9b6].stats.bufferedAmount = _0x5a52f1[_0x2ef9b6].bufferedAmount;
                    if (_0x2ef7ef < _0x16efc0.pcs[_0x2ef9b6].stats.bufferedAmount) {
                      _0x2ef7ef = _0x16efc0.pcs[_0x2ef9b6].stats.bufferedAmount;
                    }
                  } catch (_0x1fb5c3) {}
                }
              } else {
                if (_0x475848.byteLength > 0x40000) {
                  for (var _0x2ef9b6 in _0x5a52f1) {
                    if ((_0xc33d93 == "key" || _0xc33d93 == "delta" || _0xc33d93 == "video") && !_0x16efc0.pcs[_0x2ef9b6].allowVideo) {
                      continue;
                    }
                    if ((_0xc33d93 == "audio" || _0xc33d93 == "pcm") && !_0x16efc0.pcs[_0x2ef9b6].allowAudio) {
                      continue;
                    }
                    try {
                      if (_0x5a52f1[_0x2ef9b6].readyState === 'open') {
                        _0x5a52f1[_0x2ef9b6].send(_0x475848.slice(0x0, 0x40000));
                      }
                      _0x16efc0.pcs[_0x2ef9b6].stats.bufferedAmount = _0x5a52f1[_0x2ef9b6].bufferedAmount;
                      if (_0x2ef7ef < _0x16efc0.pcs[_0x2ef9b6].stats.bufferedAmount) {
                        _0x2ef7ef = _0x16efc0.pcs[_0x2ef9b6].stats.bufferedAmount;
                      }
                    } catch (_0xdb91a4) {}
                  }
                  _0x3039a5.unshift(_0x475848.slice(0x40000));
                } else {
                  for (var _0x2ef9b6 in _0x5a52f1) {
                    if ((_0xc33d93 == "key" || _0xc33d93 == 'delta' || _0xc33d93 == "video") && !_0x16efc0.pcs[_0x2ef9b6].allowVideo) {
                      continue;
                    }
                    if ((_0xc33d93 == "audio" || _0xc33d93 == "pcm") && !_0x16efc0.pcs[_0x2ef9b6].allowAudio) {
                      continue;
                    }
                    try {
                      if (_0x5a52f1[_0x2ef9b6].readyState === "open") {
                        _0x5a52f1[_0x2ef9b6].send(_0x475848);
                      }
                      _0x16efc0.pcs[_0x2ef9b6].stats.bufferedAmount = _0x5a52f1[_0x2ef9b6].bufferedAmount;
                      if (_0x2ef7ef < _0x16efc0.pcs[_0x2ef9b6].stats.bufferedAmount) {
                        _0x2ef7ef = _0x16efc0.pcs[_0x2ef9b6].stats.bufferedAmount;
                      }
                    } catch (_0x48eaa6) {}
                  }
                }
              }
              _0x16efc0.stats.maxBufferSize = _0x2ef7ef;
              if (!_0x31a5e1.throttle && _0x2ef7ef > 0x1f4) {
                _0x31a5e1.throttle = true;
                _0x16efc0.stats.throttling = _0x31a5e1.throttle;
                _0x16efc0.stats.Chunked_video.bitrate = parseInt(_0x16efc0.chunked * 0x3e8 / 0xa);
                _0x31a5e1.videoEncoder.configure(_0x16efc0.stats.Chunked_video);
              } else if (_0x31a5e1.throttle && _0x2ef7ef < 0x12c) {
                _0x31a5e1.throttle = false;
                _0x16efc0.stats.throttling = _0x31a5e1.throttle;
                _0x16efc0.stats.Chunked_video.bitrate = parseInt(_0x16efc0.chunked * 0x3e8);
                _0x31a5e1.videoEncoder.configure(_0x16efc0.stats.Chunked_video);
              }
            }
            _0x3be28d = null;
            _0x16efc0.stats.chunkedInQueue = 0x0;
          };
          _0x3a94a9.ended = function (_0x4c6575) {};
        }
        if (_0xb8f016 in _0x16efc0.pcs) {
          _0x5a52f1[_0xb8f016] = _0x16efc0.pcs[_0xb8f016].createDataChannel("chunked", {
            'ordered': true
          });
        } else {
          warnlog("UUID does not exist");
          return;
        }
        _0x5a52f1[_0xb8f016].contentType = "chunks";
        _0x5a52f1[_0xb8f016].binaryType = 'arraybuffer';
        _0x5a52f1[_0xb8f016].header = false;
        _0x5a52f1[_0xb8f016].onopen = () => {
          log("chunkedtransfer OPEN");
          if (_0x16efc0.chunkedAudioEnabled && _0x16efc0.chunkedVideoEnabled && _0x16efc0.pcs[_0xb8f016].allowAudio && _0x16efc0.pcs[_0xb8f016].allowVideo) {
            _0x5a52f1[_0xb8f016].send(JSON.stringify({
              'timestamp': Date.now(),
              'type': "chunkedtransfer",
              'realTimeVideo': _0x16efc0.stats.Chunked_video.realTime,
              'realTimeAudio': _0x16efc0.stats.Chunked_audio.realTime,
              'size': 0x5af3107a3fff,
              'configVideo': _0x31a5e1.configVideo,
              'configAudio': _0x31a5e1.configAudio,
              'recordType': _0x16efc0.chunked,
              'filename': "chunked.webm",
              'id': "chunked"
            }));
          } else {
            if (_0x16efc0.chunkedAudioEnabled && _0x16efc0.pcs[_0xb8f016].allowAudio) {
              _0x5a52f1[_0xb8f016].send(JSON.stringify({
                'timestamp': Date.now(),
                'type': "chunkedtransfer",
                'realTimeAudio': _0x16efc0.stats.Chunked_audio.realTime,
                'size': 0x5af3107a3fff,
                'configAudio': _0x31a5e1.configAudio,
                'recordType': _0x16efc0.chunked,
                'filename': "chunked.webm",
                'id': "chunked"
              }));
            } else {
              if (_0x16efc0.chunkedVideoEnabled && _0x16efc0.pcs[_0xb8f016].allowVideo) {
                _0x5a52f1[_0xb8f016].send(JSON.stringify({
                  'timestamp': Date.now(),
                  'type': "chunkedtransfer",
                  'realTimeVideo': _0x16efc0.stats.Chunked_video.realTime,
                  'size': 0x5af3107a3fff,
                  'configVideo': _0x31a5e1.configVideo,
                  'recordType': _0x16efc0.chunked,
                  'filename': "chunked.webm",
                  'id': "chunked"
                }));
              } else {}
            }
          }
        };
        _0x5a52f1[_0xb8f016].onclose = () => {
          try {
            var _0x498e88 = _0x16efc0.hostedTransfers.indexOf(_0x5a52f1[_0xb8f016]);
            if (_0x498e88 > -0x1) {
              _0x16efc0.hostedTransfers.splice(_0x498e88, 0x1);
            }
          } catch (_0x3aede8) {
            errorlog(_0x3aede8);
          }
          log("Transfer ended");
          _0x5a52f1[_0xb8f016] = null;
          delete _0x5a52f1[_0xb8f016];
          var _0x56975f = false;
          for (var _0x3982f9 = 0x0; _0x3982f9 < _0x16efc0.hostedTransfers.length; _0x3982f9++) {
            if ("contentType" in _0x16efc0.hostedTransfers[_0x3982f9] && _0x16efc0.hostedTransfers[_0x3982f9].contentType == "chunks") {
              _0x56975f = true;
              break;
            }
          }
          if (_0x56975f) {
            try {
              _0x31a5e1.stop();
            } catch (_0x39ba68) {}
          }
        };
        _0x5a52f1[_0xb8f016].onmessage = _0x4cb2a1 => {
          if (_0x4cb2a1.data) {
            try {
              var _0x544ce5 = JSON.parse(_0x4cb2a1.data);
              if (_0x544ce5.kf) {
                log("KEY FRAME REQUESTED");
                _0x31a5e1.needKeyFrame = true;
              }
            } catch (_0x3ef5d6) {}
          }
        };
        _0x16efc0.hostedTransfers.push(_0x5a52f1[_0xb8f016]);
      };
      _0x16efc0.recieveFile = async function (_0x2e26f6, _0x38785e, _0x5c9212) {
        log("Created transfer channel");
        var _0x25c09b = _0x5c9212;
        _0x25c09b.binaryType = "arraybuffer";
        var _0x858471 = 0x0;
        var _0x38dea1 = false;
        var _0x46f19c = false;
        var _0x5648f8 = 0x0;
        var _0x463af4 = {};
        _0x25c09b.onopen = _0xd150e4 => {
          log("Opened transfer channel");
        };
        _0x25c09b.onmessage = _0xb40ac4 => {
          if (!_0x38dea1) {
            try {
              _0x38dea1 = JSON.parse(_0xb40ac4.data);
              if (_0x38dea1.type == "filetransfer") {
                var {
                  readable: _0x2478a0,
                  writable: _0x58d1b7
                } = new TransformStream({
                  'transform': (_0x57acf9, _0xfd59c8) => _0x57acf9.arrayBuffer().then(_0x5b54e3 => _0xfd59c8.enqueue(new Uint8Array(_0x5b54e3)))
                });
                _0x463af4.writer = _0x58d1b7.getWriter();
                ;
                _0x2478a0.pipeTo(streamSaver.createWriteStream(_0x38dea1.filename));
                for (var _0x32db2e = 0x0; _0x32db2e < transferList.length; _0x32db2e++) {
                  if (transferList[_0x32db2e].id == _0x38dea1.id) {
                    transferList[_0x32db2e].dc = _0x25c09b;
                    _0x46f19c = _0x32db2e;
                    transferList[_0x46f19c].status = 0x2;
                    updateDownloadLink(_0x46f19c);
                    break;
                  }
                }
              } else {
                errorlog("Not supported; expected 'filetransfer'");
              }
              warnlog(_0x38dea1);
              return;
            } catch (_0x27ae2d) {
              errorlog(_0x27ae2d);
            }
          }
          try {
            var _0xd97d21 = _0xb40ac4.data;
            if (_0xd97d21 == "EOF1") {
              log("Transfer was completed successfully");
              try {
                _0x25c09b.close();
              } catch (_0x16c85d) {}
              transferList[_0x46f19c].status = 0x3;
              updateDownloadLink(_0x46f19c);
              return;
            } else {
              if (_0xd97d21 == 'EOF2') {
                warnlog("Transfer was cnacelled by remote user; parital file saved.");
                try {
                  _0x25c09b.close();
                } catch (_0x2d96d2) {}
                transferList[_0x46f19c].status = 0x5;
                updateDownloadLink(_0x46f19c);
                return;
              } else {
                try {
                  _0x5648f8 += 0x1;
                  try {
                    var _0x1f26ef = [new Uint8Array(_0xd97d21)];
                    if (_0x463af4.writer) {
                      _0x463af4.writer.write(new Blob(_0x1f26ef));
                    } else {}
                  } catch (_0x20ec04) {
                    errorlog(_0x20ec04);
                  }
                  _0x5648f8 -= 0x1;
                  _0x858471 += _0xd97d21.byteLength;
                  var _0x5f5126 = _0x858471 / _0x38dea1.size;
                  transferList[_0x46f19c].completed = _0x5f5126;
                  updateDownloadLink(_0x46f19c);
                } catch (_0x221fb6) {
                  errorlog(_0x221fb6);
                }
                return;
              }
            }
          } catch (_0x187d3f) {
            errorlog(_0x187d3f);
          }
        };
        _0x25c09b.onclose = _0x541a72 => {
          if (_0x5648f8 <= 0x0) {
            if (_0x463af4.writer) {
              setTimeout(function (_0x1f202a, _0x1d963b) {
                if (_0x1d963b <= 0x0) {
                  _0x1f202a.close();
                  _0x1f202a = null;
                } else {
                  setTimeout(function (_0x2cdcbc, _0x350552) {
                    _0x2cdcbc.close();
                    _0x2cdcbc = null;
                  }, 0x1388, _0x1f202a);
                }
              }, 0x3e8, _0x463af4.writer, _0x5648f8);
            }
          }
          _0x25c09b = null;
          return;
        };
        return;
      };
      async function _0x314cce(_0x16db6f, _0x576df9 = false) {
        _0x16db6f.decoder.decode(_0x16db6f.queue.shift());
        if (_0x16db6f.nextQueue === null && !_0x576df9) {
          return;
        }
        _0x16db6f.nextQueue = setTimeout(function (_0x361942) {
          _0x314cce(_0x361942);
        }, 0x21, _0x16db6f);
      }
      _0x16efc0.recieveChunkedStream = async function (_0x3f8735, _0x170933, _0x40076f) {
        log("Created transfer channel");
        var _0x39a7a0 = _0x40076f;
        _0x39a7a0.binaryType = "arraybuffer";
        var _0xde7e8b = false;
        var _0x576f46 = false;
        var _0x3fd6f6 = {};
        _0x39a7a0.onopen = _0x5982ae => {
          log("Opened transfer channel");
        };
        _0x39a7a0.onclose = async function (_0x599a10) {
          if (_0x3fd6f6.videoWriter) {
            if (_0x3fd6f6.videoElement.stopWriter) {
              await delay(0x3e8);
              try {
                await _0x3fd6f6.videoElement.stopWriter();
              } catch (_0xbaeed4) {}
            }
          }
          _0x39a7a0 = null;
          if (_0x16efc0.rpcs[_0x170933]) {
            delete _0x16efc0.rpcs[_0x170933].stats.chunked_mode_video;
            delete _0x16efc0.rpcs[_0x170933].stats.chunked_mode_audio;
          }
          return;
        };
        async function _0x9624af() {
          var _0x1e2c30 = await window.showSaveFilePicker({
            'startIn': 'videos',
            'suggestedName': "myVideo.webm",
            'types': [{
              'description': "Video File",
              'accept': {
                'video/webm': [".webm"]
              }
            }]
          });
          var _0x164c66 = await _0x1e2c30.createWritable();
          _0x3fd6f6.writer_config.fileWriter = _0x164c66;
          _0x3fd6f6.videoWriter = new WebMWriter(_0x3fd6f6.writer_config);
          _0x3fd6f6.videoElement.stopWriter = async function () {
            _0x3fd6f6.videoElement.stopWriter = false;
            clearInterval(_0x3fd6f6.updateTime);
            _0x3fd6f6.updateTime = null;
            await _0x3fd6f6.videoWriter.complete();
            _0x3fd6f6.writer_config.fileWriter.close();
          };
          return _0x3fd6f6.videoWriter;
        }
        _0x39a7a0.onmessage = async function (_0x21c56a) {
          if (!_0xde7e8b) {
            try {
              _0xde7e8b = JSON.parse(_0x21c56a.data);
              if (_0xde7e8b.type == 'chunkedtransfer') {
                log("CHUNKED DETAILS");
                log(_0xde7e8b);
                _0x3fd6f6.UUID = _0x170933;
                _0x3fd6f6.completed = 0x0;
                _0x3fd6f6.status = 0x2;
                _0x3fd6f6.time = Date.now();
                _0x3fd6f6.theirtime = _0xde7e8b.timestamp;
                _0x3fd6f6.timedelta = _0x3fd6f6.time - _0xde7e8b.timestamp;
                _0x3fd6f6.dc = _0x39a7a0;
                _0x3fd6f6.id = _0xde7e8b.id;
                _0x3fd6f6.updateTime = null;
                _0x3fd6f6.buffer = false;
                _0x3fd6f6.videoElement = createVideoElement();
                _0x3fd6f6.videoElement.autoplay = true;
                _0x3fd6f6.videoElement.muted = false;
                _0x3fd6f6.videoElement.setAttribute("playsinline", '');
                _0x3fd6f6.videoElement.dataset.UUID = _0x170933;
                _0x3fd6f6.videoElement.chunkedtransfer = true;
                _0x3fd6f6.videoElement.srcObject = new MediaStream();
                _0x16efc0.rpcs[_0x170933].streamSrc = _0x3fd6f6.videoElement.srcObject;
                _0x16efc0.rpcs[_0x170933].videoElement = _0x3fd6f6.videoElement;
                if (_0x16efc0.rpcs[_0x170933].mirrorState) {
                  applyMirrorGuest(_0x16efc0.rpcs[_0x170933].mirrorState, _0x16efc0.rpcs[_0x170933].videoElement);
                }
                if (_0x16efc0.rpcs[_0x170933].rotate !== false) {
                  _0x16efc0.rpcs[_0x170933].videoElement.rotated = _0x16efc0.rpcs[_0x170933].rotate;
                }
                _0x3fd6f6.videoElement.addEventListener('playing', _0x497afe => {
                  try {
                    var _0xc05b02 = document.getElementById("bigPlayButton");
                    if (_0xc05b02) {
                      _0xc05b02.parentNode.removeChild(_0xc05b02);
                    }
                  } catch (_0x195409) {}
                  _0x3fd6f6.playing = true;
                  if (_0x3fd6f6.audioContext) {
                    _0x3fd6f6.audioContext.resume();
                  } else if (_0x16efc0.audioCtx) {
                    _0x16efc0.audioCtx.resume();
                  }
                  try {
                    if (_0x16efc0.pip) {
                      if (v.readyState >= 0x3) {
                        if (!v.pip) {
                          v.pip = true;
                          toggleSystemPip(v, true);
                        }
                      }
                    }
                  } catch (_0x48039d) {}
                }, {
                  'once': true
                });
                _0x3fd6f6.videoElement.addEventListener("error", function (_0x371798) {
                  errorlog(_0x371798);
                });
                _0x3fd6f6.videoElement.startWriter = _0x9624af;
                _0x3fd6f6.videoElement.oncanplay = function () {
                  updateMixer();
                };
                _0x3fd6f6.videoWriter = false;
                _0x3fd6f6.frameMeta = false;
                _0x3fd6f6.writer_config = {};
                _0x3fd6f6.writer_config.video = false;
                _0x3fd6f6.writer_config.audio = false;
                _0x3fd6f6.stream_configVideo = false;
                _0x3fd6f6.stream_configAudio = false;
                _0x3fd6f6.init_video = false;
                _0x3fd6f6.init_audio = false;
                _0x3fd6f6.video = false;
                _0x3fd6f6.audio = false;
                _0x3fd6f6.promise_audio = false;
                _0x3fd6f6.playing = false;
                if (_0xde7e8b.configVideo) {
                  _0x16efc0.rpcs[_0x170933].stats.chunked_mode_video = _0xde7e8b.configVideo;
                  _0x3fd6f6.stream_configVideo = {};
                  _0x3fd6f6.stream_configVideo.width = _0xde7e8b.configVideo.width + '' || '1280';
                  _0x3fd6f6.stream_configVideo.height = _0xde7e8b.configVideo.height + '' || "720";
                  _0x3fd6f6.stream_configVideo.codec = _0xde7e8b.configVideo.codec || 'vp09.00.10.08';
                  _0x3fd6f6.writer_config.video = true;
                  _0x3fd6f6.writer_config.width = parseInt(_0x3fd6f6.stream_configVideo.width);
                  _0x3fd6f6.writer_config.height = parseInt(_0x3fd6f6.stream_configVideo.height);
                  if (_0xde7e8b.configVideo.codec == 'vp09.00.10.08') {
                    _0x3fd6f6.writer_config.codec = "VP9";
                  } else {
                    _0x3fd6f6.writer_config.codec = "VP9";
                  }
                  _0x3fd6f6.init_video = {
                    'output': _0x5a746a => {
                      _0x3fd6f6.video.frameWriter.write(_0x5a746a);
                    },
                    'error': _0x1c2be0 => {
                      if (_0x3fd6f6.video.decoder.state == "closed") {
                        warnlog("CLOSED");
                      } else {
                        errorlog(_0x1c2be0.message);
                      }
                    }
                  };
                  _0x3fd6f6.video = {};
                  _0x3fd6f6.video.generator = new MediaStreamTrackGenerator({
                    'kind': "video"
                  });
                  _0x3fd6f6.video.stream = new MediaStream([_0x3fd6f6.video.generator]);
                  _0x3fd6f6.video.frameWriter = _0x3fd6f6.video.generator.writable.getWriter();
                  _0x3fd6f6.video.decoder = new VideoDecoder(_0x3fd6f6.init_video);
                  _0x3fd6f6.video.decoder.configure(_0x3fd6f6.stream_configVideo);
                  _0x3fd6f6.video.queue = [];
                  _0x3fd6f6.video.nextQueue = null;
                  _0x3fd6f6.video.playbackheader = false;
                  _0x3fd6f6.video.header = false;
                  if ('realTimeVideo' in _0xde7e8b) {
                    _0x3fd6f6.video.realTime = _0xde7e8b.realTimeVideo;
                  }
                  _0x3fd6f6.videoElement.srcObject.addTrack(_0x3fd6f6.video.stream.getVideoTracks()[0x0]);
                }
                if (_0xde7e8b.configAudio) {
                  _0x16efc0.rpcs[_0x170933].stats.chunked_mode_audio = _0xde7e8b.configAudio;
                  _0x3fd6f6.stream_configAudio = _0xde7e8b.configAudio;
                  _0x3fd6f6.writer_config.audio = true;
                  _0x3fd6f6.writer_config.samplingFrequency = _0xde7e8b.configAudio.sampleRate || 0xbb80;
                  _0x3fd6f6.writer_config.channels = _0xde7e8b.configAudio.numberOfChannels || 0x1;
                  if (_0x3fd6f6.stream_configAudio.codec && _0x3fd6f6.stream_configAudio.codec == "pcm") {
                    if (!_0x3fd6f6.destination) {
                      _0x3fd6f6.destination = _0x16efc0.audioCtx.createMediaStreamDestination();
                    } else {
                      _0x3fd6f6.videoElement.srcObject.getAudioTracks().forEach(_0x53ad76 => {
                        _0x3fd6f6.videoElement.srcObject.removeTrack(_0x53ad76);
                      });
                    }
                    _0x3fd6f6.destination.stream.getAudioTracks().forEach(_0x2750fd => {
                      _0x3fd6f6.videoElement.srcObject.addTrack(_0x2750fd);
                    });
                    _0x3fd6f6.PCMSource = true;
                  } else {
                    _0x3fd6f6.audio = {};
                    _0x3fd6f6.audio.queue = [];
                    _0x3fd6f6.audio.nextQueue = null;
                    if ("realTimeAudio" in _0xde7e8b) {
                      _0x3fd6f6.audio.realTime = _0xde7e8b.realTimeAudio;
                    }
                    _0x3fd6f6.init_audio = {
                      'output': _0x49e2a3 => {
                        _0x3fd6f6.audio.frameWriter.write(_0x49e2a3);
                        if (_0x3fd6f6.audioTime) {
                          return;
                        }
                        var _0x3d06fe = _0x49e2a3.timestamp / 0x3e8 - (Date.now() - _0x3fd6f6.timedelta - _0x3fd6f6.audio.realTime);
                        _0x3d06fe = _0x3d06fe - (_0x16efc0.audioCtx.baseLatency || 0x0) * 0x3e8 - (_0x16efc0.audioCtx.outputLatency || 0x0) * 0x3e8;
                        var _0x6de7c4 = 0x3e7;
                        if (!_0x16efc0.rpcs[_0x3fd6f6.UUID]) {
                          return;
                        } else {
                          if (_0x16efc0.rpcs[_0x3fd6f6.UUID].buffer !== false) {
                            _0x6de7c4 = _0x16efc0.rpcs[_0x3fd6f6.UUID].buffer;
                          } else if (_0x16efc0.buffer !== false) {
                            _0x6de7c4 = _0x16efc0.buffer;
                          } else {
                            _0x16efc0.rpcs[_0x3fd6f6.UUID].buffer = _0x6de7c4;
                          }
                        }
                        _0x3d06fe += _0x6de7c4 - 0x78;
                        if (_0x3d06fe <= 0x0) {
                          _0x3d06fe = 0x0;
                        }
                        _0x3fd6f6.delayNode.delayTime.setValueAtTime(parseFloat(_0x3d06fe / 0x3e8), _0x16efc0.audioCtx.currentTime);
                        _0x3fd6f6.audioTime = setTimeout(function () {
                          _0x3fd6f6.audioTime = null;
                        }, _0x3d06fe);
                      },
                      'error': _0x5a4d58 => {
                        if (_0x3fd6f6.audio.decoder.state == "closed") {
                          warnlog("CLOSED");
                        } else {
                          errorlog(_0x5a4d58.message);
                        }
                      }
                    };
                    _0x3fd6f6.audio.decoder = new AudioDecoder(_0x3fd6f6.init_audio);
                    _0x3fd6f6.audio.decoder.configure(_0x3fd6f6.stream_configAudio);
                    _0x3fd6f6.audio.generator = new MediaStreamTrackGenerator({
                      'kind': 'audio'
                    });
                    _0x3fd6f6.audio.frameWriter = _0x3fd6f6.audio.generator.writable.getWriter();
                    _0x3fd6f6.audio.stream = new MediaStream([_0x3fd6f6.audio.generator]);
                    _0x3fd6f6.audio.audioNode = _0x16efc0.audioCtx.createMediaStreamSource(_0x3fd6f6.audio.stream);
                    _0x3fd6f6.delayNode = _0x16efc0.audioCtx.createDelay(0x1e);
                    _0x3fd6f6.delayNode.delayTime.value = 0x0;
                    _0x3fd6f6.audio.audioNode.connect(_0x3fd6f6.delayNode);
                    _0x3fd6f6.destination = _0x16efc0.audioCtx.createMediaStreamDestination();
                    _0x3fd6f6.delayNode.connect(_0x3fd6f6.destination);
                    _0x3fd6f6.destination.stream.getAudioTracks().forEach(_0x35161e => {
                      _0x3fd6f6.videoElement.srcObject.addTrack(_0x35161e);
                    });
                  }
                }
                warnlog(_0xde7e8b);
                setupIncomingVideoTracking(_0x16efc0.rpcs[_0x170933].videoElement, _0x170933);
                if (_0x3fd6f6.audio && _0x3fd6f6.video) {
                  updateIncomingVideoElement(_0x170933);
                } else {
                  if (_0x3fd6f6.video) {
                    updateIncomingVideoElement(_0x170933, true, false);
                  } else if (_0x3fd6f6.audio) {
                    updateIncomingVideoElement(_0x170933, false, true);
                  }
                }
                transferList.push(_0x3fd6f6);
                _0x576f46 = transferList.length - 0x1;
                updateDownloadLink(_0x576f46);
                _0x3fd6f6.processFrame = async function (_0x4e10f5) {
                  if (_0x4e10f5.type == "audio") {
                    _0x16efc0.rpcs[_0x170933].stats.chunked_mode_audio.time_seconds = parseInt(_0x4e10f5.timestamp / 0x2710) / 0x64;
                    _0x3fd6f6.processFrameAudio(_0x4e10f5);
                  } else {
                    if (_0x4e10f5.type == "pcm") {
                      var _0x20f19f = _0x16efc0.audioCtx.createBufferSource();
                      _0x20f19f.connect(_0x3fd6f6.destination);
                      _0x20f19f.onended = function () {
                        this.disconnect();
                      };
                      var _0x362c94 = _0x16efc0.audioCtx.createBuffer(0x2, _0x4e10f5.data.length, _0x16efc0.audioCtx.sampleRate / 0x2);
                      _0x20f19f.buffer = _0x362c94;
                      _0x20f19f.start(0x0);
                    } else {
                      _0x16efc0.rpcs[_0x170933].stats.chunked_mode_video.time_seconds = parseInt(_0x4e10f5.timestamp / 0x2710) / 0x64;
                      _0x3fd6f6.processFrameVideo(_0x4e10f5);
                    }
                  }
                };
                _0x3fd6f6.processFrameVideo = async function (_0x4f90a3) {
                  try {
                    _0x4f90a3 = new EncodedVideoChunk(_0x4f90a3);
                  } catch (_0x879ff7) {
                    errorlog(_0x879ff7);
                    errorlog(_0x4f90a3);
                    return;
                  }
                  if (_0x3fd6f6.videoWriter && _0x3fd6f6.videoElement.stopWriter) {
                    if (!_0x3fd6f6.video.header && _0x4f90a3.type !== "key") {
                      log("waiting for keyframe");
                      log(_0x4f90a3);
                      if (!_0x3fd6f6.requestKeyframe) {
                        _0x39a7a0.send(JSON.stringify({
                          'kf': true
                        }));
                        _0x3fd6f6.requestKeyframe = setTimeout(function () {
                          clearTimeout(_0x3fd6f6.requestKeyframe);
                          _0x3fd6f6.requestKeyframe = null;
                        }, 0x3e8);
                      }
                    } else if (!_0x3fd6f6.video.header) {
                      _0x3fd6f6.video.header = Date.now();
                      _0x3fd6f6.videoWriter.addFrame(_0x4f90a3);
                      log("start writing frames");
                      if (_0x16efc0.director && !_0x3fd6f6.updateTime) {
                        _0x3fd6f6.updateTime = setInterval(function (_0x37f87a) {
                          var _0x649e18 = (Date.now() - _0x3fd6f6.video.header) / 0x3e8;
                          var _0x9e3605 = Math.floor(_0x649e18 / 0x3c);
                          var _0x2d31f6 = Math.floor(_0x649e18 - _0x9e3605 * 0x3c);
                          try {
                            document.querySelector("[data-action-type='recorder-local'][data--u-u-i-d='" + _0x37f87a + "']").innerHTML = "<i class=\"las la-stop-circle\"></i> " + _0x9e3605 + "m : " + zpadTime(_0x2d31f6) + 's';
                          } catch (_0x492c0a) {
                            log("not record button detected; can't update time since started recording");
                          }
                        }, 0x3e8, _0x170933);
                      }
                    } else {
                      _0x3fd6f6.videoWriter.addFrame(_0x4f90a3);
                    }
                  }
                  if (_0x3fd6f6.video.playbackheader && _0x3fd6f6.video && _0x3fd6f6.video.decoder.state === "closed") {
                    warnlog("Restarting since closed");
                    _0x3fd6f6.video.playbackheader = false;
                    _0x3fd6f6.video.decoder = new VideoDecoder(_0x3fd6f6.init_video);
                    await _0x3fd6f6.video.decoder.configure(_0x3fd6f6.stream_configVideo);
                    _0x3fd6f6.video.playbackheader = false;
                  }
                  if (_0x3fd6f6.video.playbackheader || _0x4f90a3.type === 'key') {
                    _0x3fd6f6.video.playbackheader = true;
                    try {
                      if (_0x3fd6f6.video.nextQueue) {
                        _0x3fd6f6.video.queue.push(_0x4f90a3);
                      } else {
                        if (_0x3fd6f6.video.queue.length) {
                          _0x3fd6f6.video.queue.push(_0x4f90a3);
                        } else {
                          if (_0x3fd6f6.video.realTime) {
                            _0x3fd6f6.video.nextQueue = true;
                            function _0x3de762(_0x19686c, _0x102c9c) {
                              var _0x28e7a3 = _0x19686c.timestamp / 0x3e8 - (Date.now() - _0x102c9c.timedelta - _0x102c9c.video.realTime);
                              var _0x4dcff2 = 0x3e7;
                              if (!_0x16efc0.rpcs[_0x102c9c.UUID]) {
                                clearTimeout(_0x102c9c.video.nextQueue);
                                _0x102c9c.video.nextQueue = null;
                                _0x102c9c.video.queue = [];
                                return;
                              } else {
                                if (_0x16efc0.rpcs[_0x102c9c.UUID].buffer !== false) {
                                  _0x4dcff2 = _0x16efc0.rpcs[_0x102c9c.UUID].buffer;
                                } else if (_0x16efc0.buffer !== false) {
                                  _0x4dcff2 = _0x16efc0.buffer;
                                } else {
                                  _0x16efc0.rpcs[_0x102c9c.UUID].buffer = _0x4dcff2;
                                }
                              }
                              _0x28e7a3 += _0x4dcff2;
                              if (_0x28e7a3 < 0x0) {
                                _0x28e7a3 = 0x0;
                              }
                              _0x102c9c.video.nextQueue = setTimeout(function (_0x431583, _0x35bae8) {
                                _0x431583.video.decoder.decode(_0x35bae8);
                                if (_0x431583.video.queue.length) {
                                  _0x3de762(_0x431583.video.queue.shift(), _0x431583);
                                } else {
                                  _0x431583.video.nextQueue = null;
                                }
                              }, _0x28e7a3, _0x102c9c, _0x19686c);
                            }
                            try {
                              _0x3de762(_0x4f90a3, _0x3fd6f6);
                            } catch (_0x545a2f) {
                              errorlog(_0x545a2f);
                              _0x3fd6f6.video.nextQueue = null;
                              if (!_0x3fd6f6.requestKeyframe) {
                                _0x39a7a0.send(JSON.stringify({
                                  'kf': true
                                }));
                                _0x3fd6f6.requestKeyframe = setTimeout(function () {
                                  clearTimeout(_0x3fd6f6.requestKeyframe);
                                  _0x3fd6f6.requestKeyframe = null;
                                }, 0x3e8);
                              }
                            }
                          } else {
                            _0x3fd6f6.video.decoder.decode(_0x4f90a3);
                          }
                        }
                      }
                    } catch (_0x43853b) {
                      errorlog(_0x43853b);
                      _0x3fd6f6.video.playbackheader = false;
                    }
                  }
                  if (!_0x3fd6f6.video.playbackheader) {
                    if (!_0x3fd6f6.requestKeyframe) {
                      _0x39a7a0.send(JSON.stringify({
                        'kf': true
                      }));
                      _0x3fd6f6.requestKeyframe = setTimeout(function () {
                        clearTimeout(_0x3fd6f6.requestKeyframe);
                        _0x3fd6f6.requestKeyframe = null;
                      }, 0x3e8);
                    }
                  }
                };
                _0x3fd6f6.processFrameAudio = async function (_0x1bfaf9) {
                  if (!_0x3fd6f6.audio) {
                    errorlog("Audio isn't setup yet.");
                    return;
                  }
                  try {
                    _0x1bfaf9.type = "key";
                    _0x1bfaf9 = new EncodedAudioChunk(_0x1bfaf9);
                  } catch (_0x230539) {
                    return;
                  }
                  if (_0x3fd6f6.videoWriter && _0x3fd6f6.video.header && _0x3fd6f6.videoElement.stopWriter) {
                    _0x3fd6f6.videoWriter.addFrame(_0x1bfaf9);
                  }
                  if (_0x3fd6f6.audio.decoder.state === 'closed') {
                    _0x3fd6f6.audio.decoder = new AudioDecoder(_0x3fd6f6.init_audio);
                    _0x3fd6f6.audio.decoder.configure(_0x3fd6f6.stream_configAudio);
                  }
                  _0x3fd6f6.audio.decoder.decode(_0x1bfaf9);
                };
              } else {
                if (_0x3fd6f6.audio && _0xde7e8b.realTimeAudio) {
                  _0x3fd6f6.audio.realTime = _0xde7e8b.realTimeAudio;
                } else if (_0x3fd6f6.video && _0xde7e8b.realTimeVideo) {
                  _0x3fd6f6.video.realTime = _0xde7e8b.realTimeVideo;
                } else {
                  errorlog(_0xde7e8b);
                }
              }
              return;
            } catch (_0xd60628) {
              errorlog(_0xd60628);
            }
          }
          try {
            var _0x58f4b5 = _0x21c56a.data;
            if (typeof _0x58f4b5 == "string") {
              if (_0x3fd6f6.buffer) {
                var _0x30de88 = new Int8Array(_0x58f4b5.buffer);
                _0x3fd6f6.buffer = false;
                await _0x3fd6f6.processFrame({
                  'data': _0x30de88,
                  'timestamp': _0x3fd6f6.frameMeta[0x0],
                  'type': _0x3fd6f6.frameMeta[0x1]
                });
              }
              _0x3fd6f6.frameMeta = JSON.parse(_0x58f4b5);
            } else {
              try {
                if (_0x58f4b5.byteLength >= 0x40000) {
                  if (_0x3fd6f6.buffer) {
                    _0x58f4b5 = new Int8Array(_0x58f4b5);
                    var _0x30de88 = new Int8Array(_0x3fd6f6.buffer.length + _0x58f4b5.length);
                    _0x30de88.set(_0x3fd6f6.buffer);
                    _0x30de88.set(_0x58f4b5, _0x3fd6f6.buffer.length);
                    _0x3fd6f6.buffer = _0x30de88;
                  } else {
                    _0x3fd6f6.buffer = new Int8Array(_0x58f4b5);
                  }
                  return;
                } else {
                  if (_0x3fd6f6.buffer) {
                    _0x58f4b5 = new Int8Array(_0x58f4b5);
                    var _0x30de88 = new Int8Array(_0x3fd6f6.buffer.length + _0x58f4b5.length);
                    _0x30de88.set(_0x3fd6f6.buffer);
                    _0x30de88.set(_0x58f4b5, _0x3fd6f6.buffer.length);
                    _0x3fd6f6.buffer = false;
                    await _0x3fd6f6.processFrame({
                      'data': _0x30de88,
                      'timestamp': _0x3fd6f6.frameMeta[0x0],
                      'type': _0x3fd6f6.frameMeta[0x1]
                    });
                  } else {
                    await _0x3fd6f6.processFrame({
                      'data': new Uint8Array(_0x58f4b5),
                      'timestamp': _0x3fd6f6.frameMeta[0x0],
                      'type': _0x3fd6f6.frameMeta[0x1]
                    });
                    if (_0x3fd6f6.fillDataBuffer) {
                      _0x3fd6f6.fillDataBuffer();
                    }
                  }
                }
              } catch (_0x4710b3) {
                errorlog(_0x4710b3);
              }
              return;
            }
          } catch (_0x56584a) {
            errorlog(_0x56584a);
          }
        };
        return;
      };
      _0x16efc0.setupIncoming = async function (_0x42a84e) {
        log("SETUP INCOMING");
        var _0x259cf5 = _0x42a84e.UUID;
        if (_0x259cf5 in _0x16efc0.rpcs) {
          if ("session" in _0x42a84e && _0x42a84e.session) {
            if (_0x16efc0.rpcs[_0x259cf5].session == _0x42a84e.session) {
              log("SDP Sessions Match. I assume ADDING TRACKS. RPCS");
              return;
            }
            warnlog("already connected 1");
            _0x16efc0.closeRPC(_0x259cf5);
          }
        } else {
          log("MAKING A NEW RPCS RTC CONNECTION");
        }
        try {
          for (var _0x30d6a2 in _0x16efc0.rpcs) {
            if (_0x16efc0.rpcs[_0x30d6a2].streamID == _0x42a84e.streamID) {
              if (_0x16efc0.rpcs[_0x30d6a2].whip) {
                errorlog("This stream token is already connected. Are you having a CORS issue? Also, ensure SSL if enforced on your host everywhere.");
              }
              if (_0x16efc0.rpcs[_0x30d6a2].videoElement) {
                _0x16efc0.rpcs[_0x30d6a2].videoElement.style.display = "none";
              }
              warnlog("already connected 2. disconnecting..");
              _0x16efc0.closeRPC(_0x30d6a2);
              if (_0x30d6a2 !== _0x259cf5) {
                if (_0x30d6a2 in _0x16efc0.pcs) {
                  if (_0x42a84e.session && _0x42a84e.session.substring(0x0, 0x6) !== _0x16efc0.loadoutID) {
                    warnlog("CLOSING SECONDARY CONNECTION; matched stream ID has re-connected");
                    log("closing 20");
                    _0x16efc0.closePC(_0x30d6a2, false);
                  } else {
                    warnlog("Websocket connection failed or something; this is a split connection. not ideal, as it could be unstable.");
                  }
                }
              }
            }
          }
          if (document.getElementById("mainmenu")) {
            document.getElementById("mainmenu").parentNode.removeChild(document.getElementById("mainmenu"));
          }
        } catch (_0x3d5294) {
          errorlog(_0x3d5294);
        }
        if (_0x16efc0.maxpublishers !== false) {
          if (Object.keys(_0x16efc0.rpcs).length >= _0x16efc0.maxpublishers) {
            warnlog("Publisher will be ignored due to max connections already hit");
            return;
          }
        } else {
          if (_0x16efc0.maxconnections !== false) {
            if (Object.keys(_0x16efc0.rpcs).length + Object.keys(_0x16efc0.pcs).length >= _0x16efc0.maxconnections) {
              warnlog("Publisher will be ignored due to max connections already hit");
              return;
            }
          }
        }
        if (_0x16efc0.queue) {
          if (_0x16efc0.director) {
            if (!(_0x259cf5 in _0x16efc0.pcs)) {
              _0x16efc0.offerSDP(_0x259cf5);
            }
          } else {
            if (_0x16efc0.directorList.indexOf(_0x259cf5) == -0x1) {
              return;
            }
          }
        }
        if (!_0x16efc0.configuration) {
          await chooseBestTURN();
        }
        if (_0x16efc0.encodedInsertableStreams) {
          _0x16efc0.configuration.encodedInsertableStreams = true;
        }
        if (_0x16efc0.bundlePolicy) {
          _0x16efc0.configuration.BundlePolicy = _0x16efc0.bundlePolicy;
        }
        try {
          _0x16efc0.rpcs[_0x259cf5] = new RTCPeerConnection(_0x16efc0.configuration);
        } catch (_0x26bfd7) {
          if (!_0x16efc0.cleanOutput) {
            warnUser("An RTC error occured.");
          }
          errorlog(_0x26bfd7);
          return;
        }
        if (_0x16efc0.security) {
          if (Object.keys(_0x16efc0.rpcs).length > 0x1) {
            warnlog("TOO MANY PUBLISHING PEERS");
            log(_0x16efc0.rpcs);
            delete _0x16efc0.rpcs[_0x259cf5];
            updateUserList();
            return;
          } else {
            warnlog("CONNECTED TO FIRST PEER");
          }
        }
        if (_0x42a84e.streamID in _0x16efc0.waitingWatchList) {
          delete _0x16efc0.waitingWatchList[_0x42a84e.streamID];
        }
        try {
          _0x16efc0.rpcs[_0x259cf5].streamID = _0x42a84e.streamID;
          await checkDirectorStreamID();
        } catch (_0x4d0566) {
          errorlog(_0x4d0566);
          return;
        }
        if (_0x42a84e.session) {
          _0x16efc0.rpcs[_0x259cf5].session = _0x42a84e.session;
        } else {
          _0x16efc0.rpcs[_0x259cf5].session = null;
        }
        _0x16efc0.rpcs[_0x259cf5].activelySpeaking = false;
        _0x16efc0.rpcs[_0x259cf5].loudest = false;
        _0x16efc0.rpcs[_0x259cf5].allowMIDI = false;
        _0x16efc0.rpcs[_0x259cf5].allowGraphs = false;
        _0x16efc0.rpcs[_0x259cf5].stats = {};
        _0x16efc0.rpcs[_0x259cf5].slot = false;
        _0x16efc0.rpcs[_0x259cf5].stats.Audio_Loudness = false;
        _0x16efc0.rpcs[_0x259cf5].showDirector = false;
        _0x16efc0.rpcs[_0x259cf5].codirectorRequested = false;
        _0x16efc0.rpcs[_0x259cf5].canvasIntervalAction = null;
        _0x16efc0.rpcs[_0x259cf5].bandwidth = -0x1;
        _0x16efc0.rpcs[_0x259cf5].bandwidthMuted = false;
        _0x16efc0.rpcs[_0x259cf5].buffer = false;
        _0x16efc0.rpcs[_0x259cf5].channelOffset = false;
        _0x16efc0.rpcs[_0x259cf5].channelWidth = false;
        _0x16efc0.rpcs[_0x259cf5].targetBandwidth = -0x1;
        _0x16efc0.rpcs[_0x259cf5].manualBandwidth = false;
        _0x16efc0.rpcs[_0x259cf5].videoElement = false;
        _0x16efc0.rpcs[_0x259cf5].imageElement = false;
        _0x16efc0.rpcs[_0x259cf5].voiceMeter = false;
        _0x16efc0.rpcs[_0x259cf5].group = [];
        _0x16efc0.rpcs[_0x259cf5].videoMuted = false;
        _0x16efc0.rpcs[_0x259cf5].iframeVideo = false;
        _0x16efc0.rpcs[_0x259cf5].lockedVideoBitrate = false;
        _0x16efc0.rpcs[_0x259cf5].lockedAudioBitrate = false;
        _0x16efc0.rpcs[_0x259cf5].virtualHangup = false;
        _0x16efc0.rpcs[_0x259cf5].remoteMuteState = false;
        _0x16efc0.rpcs[_0x259cf5].remoteMuteElement = false;
        _0x16efc0.rpcs[_0x259cf5].closeTimeout = null;
        _0x16efc0.rpcs[_0x259cf5].mc = false;
        _0x16efc0.rpcs[_0x259cf5].mutedState = null;
        _0x16efc0.rpcs[_0x259cf5].mutedStateMixer = null;
        _0x16efc0.rpcs[_0x259cf5].mutedStateScene = null;
        _0x16efc0.rpcs[_0x259cf5].mirrorState = null;
        _0x16efc0.rpcs[_0x259cf5].rotate = false;
        _0x16efc0.rpcs[_0x259cf5].savedVolume = false;
        _0x16efc0.rpcs[_0x259cf5].scaleHeight = false;
        _0x16efc0.rpcs[_0x259cf5].scaleWidth = false;
        _0x16efc0.rpcs[_0x259cf5].scaleSnap = false;
        _0x16efc0.rpcs[_0x259cf5].signalMeter = false;
        _0x16efc0.rpcs[_0x259cf5].volumeControl = false;
        _0x16efc0.rpcs[_0x259cf5].streamSrc = null;
        _0x16efc0.rpcs[_0x259cf5].screenIndexes = false;
        _0x16efc0.rpcs[_0x259cf5].screenShareState = false;
        _0x16efc0.rpcs[_0x259cf5].director = null;
        _0x16efc0.rpcs[_0x259cf5].directorVideoMuted = false;
        _0x16efc0.rpcs[_0x259cf5].directorVolumeState = 0x64;
        _0x16efc0.rpcs[_0x259cf5].directorMutedState = 0x0;
        _0x16efc0.rpcs[_0x259cf5].nackCount = 0x0;
        _0x16efc0.rpcs[_0x259cf5].settings = false;
        _0x16efc0.rpcs[_0x259cf5].opacityDisconnect = '1';
        _0x16efc0.rpcs[_0x259cf5].opacityMuted = '1';
        _0x16efc0.rpcs[_0x259cf5].obsControl = false;
        _0x16efc0.rpcs[_0x259cf5].pliCount = 0x0;
        _0x16efc0.rpcs[_0x259cf5].label = false;
        _0x16efc0.rpcs[_0x259cf5].order = false;
        _0x16efc0.rpcs[_0x259cf5].canvasCtx = null;
        _0x16efc0.rpcs[_0x259cf5].canvas = null;
        _0x16efc0.rpcs[_0x259cf5].inboundAudioPipeline = {};
        _0x16efc0.rpcs[_0x259cf5].iframeSrc = false;
        _0x16efc0.rpcs[_0x259cf5].iframeEle = false;
        _0x16efc0.rpcs[_0x259cf5].startTime = Date.now();
        _0x16efc0.rpcs[_0x259cf5].whipCallback = false;
        _0x16efc0.rpcs[_0x259cf5].wssid = _0x16efc0.wssid;
        if (_0x16efc0.activeSpeaker == 0x2 || _0x16efc0.activeSpeaker == 0x4) {
          _0x16efc0.rpcs[_0x259cf5].loudest = true;
        }
        if (_0x16efc0.showall) {
          var _0x428960 = createRichVideoElement(_0x259cf5);
          _0x428960.style.display = "block";
        }
        if (_0x16efc0.director) {
          if (_0x16efc0.customWSS && "isScene" in _0x42a84e && _0x42a84e.isScene !== false) {} else {
            var _0x13a2dd = soloLinkGenerator(_0x16efc0.rpcs[_0x259cf5].streamID);
            createControlBox(_0x259cf5, _0x13a2dd, _0x16efc0.rpcs[_0x259cf5].streamID);
          }
        }
        _0x16efc0.rpcs[_0x259cf5].UUID = _0x259cf5;
        try {
          if (_0x16efc0.view_set) {
            if (_0x16efc0.view_set.includes(_0x16efc0.rpcs[_0x259cf5].streamID)) {
              if (_0x16efc0.bitrate_set !== false) {
                let _0x3a0b83 = _0x16efc0.view_set.indexOf(_0x16efc0.rpcs[_0x259cf5].streamID);
                if (_0x16efc0.bitrate_set.length > _0x3a0b83) {
                  _0x16efc0.rpcs[_0x259cf5].manualBandwidth = parseInt(_0x16efc0.bitrate_set[_0x3a0b83]);
                  if (_0x16efc0.rpcs[_0x259cf5].manualBandwidth <= 0x0) {
                    _0x16efc0.rpcs[_0x259cf5].manualBandwidth = false;
                  }
                }
              }
            }
          }
        } catch (_0x1c3126) {
          errorlog(_0x1c3126);
        }
        _0x16efc0.rpcs[_0x259cf5].onclose = function (_0x30a8cc) {
          log("webrtc connectioned closed-event");
          _0x16efc0.closeRPC(_0x259cf5);
        };
        _0x16efc0.rpcs[_0x259cf5].iceTimer = null;
        _0x16efc0.rpcs[_0x259cf5].iceBundle = [];
        _0x16efc0.rpcs[_0x259cf5].onicecandidate = function (_0x23ac3e) {
          if (_0x23ac3e.candidate == null) {
            log("null ice rpcs");
            if (_0x16efc0.rpcs[_0x259cf5] && _0x16efc0.rpcs[_0x259cf5].whipCallback2) {
              _0x16efc0.rpcs[_0x259cf5].whipCallback2([..._0x16efc0.rpcs[_0x259cf5].iceBundle]);
              clearTimeout(_0x16efc0.rpcs[_0x259cf5].iceTimer);
              _0x16efc0.rpcs[_0x259cf5].iceTimer = null;
              _0x16efc0.rpcs[_0x259cf5].iceBundle = [];
              _0x16efc0.rpcs[_0x259cf5].whipCallback2 = null;
            }
            return;
          }
          try {
            if (_0x16efc0.icefilter) {
              if (_0x23ac3e.candidate.candidate.indexOf(_0x16efc0.icefilter) === -0x1) {
                log("dropped candidate due to filter");
                return;
              } else {
                log(_0x23ac3e.candidate);
              }
            }
          } catch (_0xbfa026) {
            errorlog(_0xbfa026);
          }
          if (_0x16efc0.rpcs[_0x259cf5] && (_0x16efc0.rpcs[_0x259cf5].whipCallback2 || _0x16efc0.rpcs[_0x259cf5].iceTimer !== null)) {
            _0x16efc0.rpcs[_0x259cf5].iceBundle.push(_0x23ac3e.candidate);
            return;
          }
          _0x16efc0.rpcs[_0x259cf5].iceBundle.push(_0x23ac3e.candidate);
          _0x16efc0.rpcs[_0x259cf5].iceTimer = setTimeout(function (_0x17cdae) {
            if (!(_0x17cdae in _0x16efc0.rpcs)) {
              return;
            }
            if (_0x16efc0.rpcs[_0x17cdae].whipCallback2) {
              return;
            }
            _0x16efc0.rpcs[_0x17cdae].iceTimer = null;
            if (_0x16efc0.rpcs[_0x17cdae].iceBundle == []) {
              return;
            }
            var _0x4409bf = {
              UUID: _0x17cdae,
              "type": "remote",
              candidates: _0x16efc0.rpcs[_0x17cdae].iceBundle,
              "session": _0x16efc0.rpcs[_0x17cdae].session
            };
            _0x16efc0.rpcs[_0x17cdae].iceBundle = [];
            if (_0x16efc0.password) {
              _0x16efc0.encryptMessage(JSON.stringify(_0x4409bf.candidates)).then(function (_0x51fa03) {
                _0x4409bf.candidates = _0x51fa03[0x0];
                _0x4409bf.vector = _0x51fa03[0x1];
                _0x16efc0.anyrequest(_0x4409bf);
              })["catch"](errorlog);
            } else {
              _0x16efc0.anyrequest(_0x4409bf);
            }
          }, 0x190, _0x259cf5);
        };
        _0x16efc0.rpcs[_0x259cf5].onconnectionstatechange = function (_0x2062ef) {
          switch (this.connectionState) {
            case "new":
              log("new");
              log("closeTimeout cancelled; 2");
              clearInterval(_0x16efc0.rpcs[this.UUID].closeTimeout);
            case 'checking':
              log("checking");
              log("closeTimeout cancelled; 3");
              clearInterval(_0x16efc0.rpcs[this.UUID].closeTimeout);
            case 'connected':
              log("** connected");
              log("closeTimeout cancelled; 4");
              clearInterval(_0x16efc0.rpcs[this.UUID].closeTimeout);
              if (_0x16efc0.security) {
                if (_0x16efc0.ws.readyState !== 0x1) {
                  _0x16efc0.ws.close();
                  break;
                }
                _0x16efc0.ws.close();
                setTimeout(function () {
                  if (_0x16efc0.cleanOutput != true) {
                    warnUser(miscTranslations["remote-peer-connected"]);
                  }
                }, 0x1);
              }
              break;
            case 'disconnected':
              log("closeTimeout cancelled; 5");
              warnlog("rpcs onconnectionstatechange Disconnected; retry in 5s");
              clearInterval(_0x16efc0.rpcs[this.UUID].closeTimeout);
              if (_0x16efc0.rpcs[this.UUID].whipCallback) {
                return;
              }
              if (this.UUID in _0x16efc0.rpcs) {
                _0x16efc0.rpcs[this.UUID].closeTimeout = setTimeout(function (_0x4452de) {
                  log("no reconnect even after 5s; closing");
                  _0x16efc0.closeRPC(_0x4452de);
                }, 0x1388, this.UUID);
              } else {
                log("UUID not found; can't close.");
              }
              break;
            case "failed":
              warnlog("FAIL rpcs onconnectionstatechange");
              log("closeTimeout cancelled; 6' retry in 3s?");
              clearInterval(_0x16efc0.rpcs[this.UUID].closeTimeout);
              if (this.UUID in _0x16efc0.rpcs) {
                _0x16efc0.rpcs[this.UUID].closeTimeout = setTimeout(function (_0x495a0a) {
                  log("No reconnect even after 5s; closing");
                  _0x16efc0.closeRPC(_0x495a0a);
                }, 0xbb8, this.UUID);
              } else {
                log("UUID not found; can't close.");
              }
              break;
            case "closed":
              warnlog("RTC closed");
              _0x16efc0.closeRPC(this.UUID);
              break;
            default:
              log("closeTimeout cancelled; 7");
              log("this.connectionState: " + this.connectionState);
              clearInterval(_0x16efc0.rpcs[this.UUID].closeTimeout);
              break;
          }
        };
        _0x16efc0.rpcs[_0x259cf5].onicegatheringstatechange = function (_0x30d9e6) {
          let _0x2ead62 = _0x30d9e6.target;
          switch (_0x2ead62.iceGatheringState) {
            case "gathering":
              log("ICE GATHER START");
              break;
            case 'complete':
              log("ICE GATHER COMPLETED");
              if (_0x16efc0.rpcs[_0x259cf5].whipCallback2) {
                _0x16efc0.rpcs[_0x259cf5].whipCallback2([..._0x16efc0.rpcs[_0x259cf5].iceBundle]);
                clearTimeout(_0x16efc0.rpcs[_0x259cf5].iceTimer);
                _0x16efc0.rpcs[_0x259cf5].iceTimer = null;
                _0x16efc0.rpcs[_0x259cf5].iceBundle = [];
                _0x16efc0.rpcs[_0x259cf5].whipCallback2 = null;
              }
              break;
          }
        };
        _0x16efc0.rpcs[_0x259cf5].oniceconnectionstatechange = function () {
          try {
            if (this.iceConnectionState == "closed") {
              errorlog('CLOSED');
            } else {
              if (this.iceConnectionState == "disconnected") {
                if (_0x16efc0.rpcs[_0x259cf5].whipCallback) {
                  return;
                }
                warnlog("ICE DISCONNECTED");
                _0x16efc0.rpcs[_0x259cf5].opacityDisconnect = '0';
                _0x16efc0.rpcs[_0x259cf5].videoElement.style.opacity = '0';
                _0x16efc0.rpcs[_0x259cf5].disconnectedTimeout = setTimeout(function (_0x4c1b09) {
                  updateMixer();
                }, 0x1f4, _0x259cf5);
              } else if (this.iceConnectionState == "failed") {
                errorlog("ICE FAILED");
              } else {
                log("ICE: " + this.iceConnectionState);
                if (_0x16efc0.rpcs[_0x259cf5].disconnectedTimeout) {
                  clearTimeout(_0x16efc0.rpcs[_0x259cf5].disconnectedTimeout);
                }
                if (_0x16efc0.rpcs[_0x259cf5].videoElement && "opacity" in _0x16efc0.rpcs[_0x259cf5].videoElement.style) {
                  if (_0x16efc0.rpcs[_0x259cf5].opacityDisconnect == '0' && _0x16efc0.rpcs[_0x259cf5].opacityMuted == '1') {
                    _0x16efc0.rpcs[_0x259cf5].videoElement.style.opacity = '1';
                    _0x16efc0.rpcs[_0x259cf5].opacityDisconnect = '1';
                    updateMixer();
                  } else {
                    _0x16efc0.rpcs[_0x259cf5].opacityDisconnect = '1';
                  }
                } else {
                  _0x16efc0.rpcs[_0x259cf5].opacityDisconnect = '1';
                }
              }
            }
          } catch (_0x92fe21) {}
        };
        _0x16efc0.rpcs[_0x259cf5].ondatachannel = function (_0x459180) {
          log(_0x459180);
          if (_0x459180.channel.label && _0x459180.channel.label !== "sendChannel") {
            if (_0x16efc0.badStreamList.includes(_0x16efc0.rpcs[_0x259cf5].streamID)) {
              return;
            }
            if (_0x459180.channel.label === "chunked") {
              _0x16efc0.recieveChunkedStream(_0x16efc0.rpcs, _0x259cf5, _0x459180.channel);
            } else {
              _0x16efc0.recieveFile(_0x16efc0.rpcs, _0x259cf5, _0x459180.channel);
            }
            return;
          }
          _0x16efc0.rpcs[_0x259cf5].receiveChannel = _0x459180.channel;
          _0x16efc0.rpcs[_0x259cf5].receiveChannel.UUID = _0x259cf5;
          _0x16efc0.rpcs[_0x259cf5].receiveChannel.onopen = _0x2ebcf6 => {
            var _0x152be4 = {};
            _0x152be4.downloads = false;
            _0x152be4.allowmidi = false;
            _0x152be4.iframe = false;
            _0x152be4.widget = false;
            _0x152be4.audio = false;
            _0x152be4.video = false;
            _0x152be4.broadcast = false;
            _0x152be4.allowwebp = false;
            _0x152be4.allowscreenaudio = false;
            _0x152be4.allowscreenvideo = false;
            _0x152be4.allowchunked = false;
            if (_0x16efc0.audioCodec && (_0x16efc0.audioCodec === "red" || _0x16efc0.audioCodec === "lyra")) {
              _0x152be4.preferAudioCodec = _0x16efc0.audioCodec;
            }
            try {
              if (_0x16efc0.allowScreen !== false) {
                if (_0x16efc0.allowScreen === true) {
                  _0x152be4.allowscreenaudio = true;
                  _0x152be4.allowscreenvideo = true;
                } else if (_0x16efc0.allowScreen.includes(_0x16efc0.rpcs[_0x259cf5].streamID)) {
                  _0x152be4.allowscreenaudio = true;
                  _0x152be4.allowscreenvideo = true;
                } else {
                  _0x152be4.allowscreenaudio = false;
                  _0x152be4.allowscreenvideo = false;
                }
              } else {
                _0x152be4.allowscreenaudio = true;
                _0x152be4.allowscreenvideo = true;
              }
              if (_0x152be4.allowscreenvideo) {
                if (_0x16efc0.novideo !== false) {
                  if (!_0x16efc0.novideo.includes(_0x16efc0.rpcs[_0x259cf5].streamID + ':s')) {
                    _0x152be4.allowscreenvideo = false;
                  }
                } else {
                  if (_0x16efc0.broadcast !== false) {
                    if (_0x16efc0.broadcast !== null) {
                      if (_0x16efc0.rpcs[_0x259cf5].streamID + ':s' === _0x16efc0.broadcast) {
                        _0x152be4.broadcast = true;
                      } else {
                        _0x152be4.allowscreenvideo = false;
                      }
                    } else if (_0x16efc0.directorUUID) {
                      if (_0x259cf5 == _0x16efc0.directorUUID) {
                        _0x152be4.broadcast = true;
                      } else {
                        _0x152be4.allowscreenvideo = false;
                      }
                    }
                  } else if (_0x16efc0.exclude !== false) {
                    if (_0x16efc0.exclude.includes(_0x16efc0.rpcs[_0x259cf5].streamID + ':s')) {
                      _0x152be4.video = false;
                    }
                  }
                }
              }
              if (_0x152be4.allowscreenaudio) {
                if (_0x16efc0.noaudio !== false) {
                  if (!_0x16efc0.noaudio.includes(_0x16efc0.rpcs[_0x259cf5].streamID + ':s')) {
                    _0x152be4.allowscreenaudio = false;
                  }
                }
              }
            } catch (_0x408bf6) {
              errorlog(_0x408bf6);
            }
            try {
              if (_0x16efc0.novideo !== false) {
                if (_0x16efc0.novideo.includes(_0x16efc0.rpcs[_0x259cf5].streamID)) {
                  _0x152be4.video = true;
                } else {
                  _0x152be4.video = false;
                }
              } else {
                if (_0x16efc0.broadcast !== false) {
                  if (_0x16efc0.broadcast !== null) {
                    if (_0x16efc0.rpcs[_0x259cf5].streamID === _0x16efc0.broadcast) {
                      _0x152be4.broadcast = true;
                      _0x152be4.video = true;
                    } else {
                      _0x152be4.video = false;
                    }
                  } else if (_0x16efc0.directorUUID) {
                    if (_0x259cf5 == _0x16efc0.directorUUID) {
                      _0x152be4.broadcast = true;
                      _0x152be4.video = true;
                    } else {
                      _0x152be4.video = false;
                    }
                  }
                } else if (_0x16efc0.exclude !== false) {
                  if (_0x16efc0.exclude.includes(_0x16efc0.rpcs[_0x259cf5].streamID)) {
                    _0x152be4.video = false;
                  } else {
                    _0x152be4.video = true;
                  }
                } else {
                  _0x152be4.video = true;
                }
              }
              if (_0x16efc0.noaudio !== false) {
                if (_0x16efc0.noaudio.includes(_0x16efc0.rpcs[_0x259cf5].streamID)) {
                  _0x152be4.audio = true;
                } else {
                  _0x152be4.audio = false;
                }
              } else {
                _0x152be4.audio = true;
              }
              if (_0x16efc0.noiframe !== false) {
                if (_0x16efc0.noiframe.includes(_0x16efc0.rpcs[_0x259cf5].streamID)) {
                  _0x152be4.iframe = true;
                } else {
                  _0x152be4.iframe = false;
                }
              } else {
                _0x152be4.iframe = true;
              }
              if (_0x16efc0.noWidget !== false) {
                if (_0x16efc0.noWidget.includes(_0x16efc0.rpcs[_0x259cf5].streamID)) {
                  _0x152be4.widget = true;
                } else {
                  _0x152be4.widget = false;
                }
              } else {
                if (_0x16efc0.scene !== false) {
                  _0x152be4.widget = false;
                } else if (_0x16efc0.view && !_0x16efc0.director && _0x16efc0.permaid === false) {
                  _0x152be4.widget = false;
                } else {
                  _0x152be4.widget = true;
                }
              }
              if (_0x16efc0.noMeshcast) {
                _0x152be4.allowmeshcast = false;
              }
              if (_0x16efc0.allowVideos !== false) {
                if (!_0x16efc0.allowVideos.includes(_0x16efc0.rpcs[_0x259cf5].streamID)) {
                  _0x152be4.video = false;
                  _0x152be4.audio = false;
                }
              }
              if (_0x16efc0.midiIn || _0x16efc0.midiRemote) {
                _0x152be4.allowmidi = _0x16efc0.midiIn || _0x16efc0.midiRemote;
              }
              _0x152be4.downloads = true;
              if (_0x16efc0.nodownloads) {
                _0x152be4.downloads = false;
              }
              if (_0x16efc0.nochunk) {
                _0x152be4.allowchunked = false;
              } else {
                _0x152be4.allowchunked = true;
              }
              if (_0x16efc0.codec && (_0x16efc0.codec == "webp" || _0x16efc0.codec == "images" || _0x16efc0.codec == 'jpeg')) {
                _0x152be4.allowwebp = true;
              }
              if (_0x16efc0.layout) {
                _0x152be4.layout = true;
              }
              if (_0x16efc0.badStreamList.includes(_0x16efc0.rpcs[_0x259cf5].streamID)) {
                warnlog("new connection is contained in badStreamList! This might be the director's video/audio -> this a scene?");
                _0x152be4.downloads = false;
                _0x152be4.allowmidi = false;
                _0x152be4.iframe = false;
                _0x152be4.widget = false;
                _0x152be4.audio = false;
                _0x152be4.video = false;
                _0x152be4.broadcast = false;
                _0x152be4.allowwebp = false;
                ;
              }
            } catch (_0x1bea5d) {
              errorlog(_0x1bea5d);
            }
            try {
              _0x152be4.info = {};
              _0x152be4.info.label = _0x16efc0.label;
              _0x152be4.info.order = _0x16efc0.order;
              _0x152be4.info.stereo_url = _0x16efc0.stereo;
              _0x152be4.info.vb_url = _0x16efc0.bitrate;
              _0x152be4.info.ab_url = _0x16efc0.audiobitrate;
              _0x152be4.info.codec_url = _0x16efc0.codec;
              if (_0x16efc0.audioCodec) {
                _0x152be4.info.audio_codec_url = _0x16efc0.audioCodec;
              }
              _0x152be4.info.version = _0x16efc0.version;
              _0x152be4.info.forceios = _0x16efc0.forceios;
              _0x152be4.info.enhance_audio = _0x16efc0.enhance;
              _0x152be4.info.ptime = _0x16efc0.ptime;
              _0x152be4.info.minptime = _0x16efc0.minptime;
              _0x152be4.info.maxptime = _0x16efc0.maxptime;
              if (navigator && navigator.userAgent) {
                _0x152be4.info.useragent = navigator.userAgent;
              }
              if (navigator && navigator.platform) {
                _0x152be4.info.platform = navigator.platform;
              }
              if (gpgpuSupport) {
                _0x152be4.info.gpGPU = gpgpuSupport;
              }
              if (cpuSupport) {
                _0x152be4.info.CPU = cpuSupport;
              }
              if (_0x16efc0.disableOBS === false) {
                if (window.obsstudio) {
                  _0x152be4.info.obs = window.obsstudio.pluginVersion;
                  try {
                    _0x152be4 = _0x16efc0.getOBSOptimization(_0x152be4, _0x259cf5);
                  } catch (_0x4523fd) {
                    errorlog(_0x4523fd);
                    warnUser(_0x4523fd.message);
                  }
                } else {
                  _0x152be4.info.obs = false;
                }
              } else {
                _0x152be4.info.obs = false;
              }
            } catch (_0x10230e) {}
            ;
            _0x152be4.guest = false;
            _0x152be4.scene = false;
            _0x152be4.director = false;
            _0x152be4.limitaudio = false;
            _0x152be4.forceios = false;
            if (_0x16efc0.enhance) {
              _0x152be4.enhanceaudio = true;
            }
            if (_0x16efc0.degrade) {
              _0x152be4.degrade = _0x16efc0.degrade;
            }
            if (_0x16efc0.solo) {
              _0x152be4.solo = _0x16efc0.solo;
            }
            if (_0x16efc0.keyframeRate !== false) {
              _0x152be4.keyframeRate = _0x16efc0.keyframeRate;
            }
            if (_0x16efc0.director) {
              _0x152be4.director = true;
              _0x152be4.forceios = _0x16efc0.forceios;
              if (_0x16efc0.directorUUID && _0x16efc0.directorUUID === _0x259cf5) {
                _0x16efc0.newMainDirectorSetup();
              } else {
                var _0x1b39ca = {
                  addCoDirector: []
                };
                for (var _0x19f525 in _0x16efc0.pcs) {
                  if (_0x16efc0.pcs[_0x19f525].coDirector === true) {
                    _0x1b39ca.addCoDirector.push(_0x19f525);
                  }
                }
                if (_0x1b39ca.addCoDirector.length) {
                  _0x152be4.directorSettings = _0x1b39ca;
                }
              }
              if (_0x16efc0.roomTimer && _0x16efc0.roomTimer > 0x0) {
                _0x152be4.setClock = _0x16efc0.roomTimer - Date.now() / 0x3e8;
                _0x152be4.showClock = true;
                _0x152be4.startClock = true;
              } else if (_0x16efc0.roomTimer && _0x16efc0.roomTimer < 0x0) {
                _0x152be4.setClock = _0x16efc0.roomTimer * -0x1;
                _0x152be4.showClock = true;
                _0x152be4.startClock = true;
                _0x152be4.pauseClock = true;
              }
              if (_0x16efc0.showRoomTime) {
                _0x152be4.showTime = true;
              }
            } else {
              if (_0x16efc0.scene !== false) {
                _0x152be4.scene = _0x16efc0.scene;
                if (_0x16efc0.showDirector) {
                  _0x152be4.showDirector = _0x16efc0.showDirector;
                }
              } else if (_0x16efc0.roomid !== false && _0x16efc0.roomid !== '') {
                _0x152be4.forceios = _0x16efc0.forceios;
                _0x152be4.guest = true;
              }
            }
            if (_0x16efc0.scale) {
              _0x152be4.scale = parseFloat(_0x16efc0.scale);
            } else if (_0x16efc0.viewheight || _0x16efc0.viewwidth) {
              _0x152be4.requestResolution = {};
              _0x152be4.requestResolution.h = null;
              _0x152be4.requestResolution.w = null;
              if (_0x16efc0.viewheight) {
                _0x152be4.requestResolution.h = _0x16efc0.viewheight;
                _0x16efc0.rpcs[_0x259cf5].scaleHeight = _0x16efc0.viewheight;
              }
              if (_0x16efc0.viewwidth) {
                _0x152be4.requestResolution.w = _0x16efc0.viewwidth;
                _0x16efc0.rpcs[_0x259cf5].scaleWidth = _0x16efc0.viewwidth;
              }
            }
            if (!_0x16efc0.roomid) {
              if (_0x16efc0.beepToNotify) {
                playtone(false, 'jointone');
                showNotification("There's a new incoming connection.");
              }
            }
            _0x16efc0.rpcs[_0x259cf5].settings = _0x152be4;
            if (_0x16efc0.sendRequest(_0x152be4, _0x259cf5)) {
              log("successfully requested audio and video");
            } else {
              errorlog("Failed to request video and audio; iOS device asking?");
            }
            pokeIframeAPI("new-view-connection", true, _0x259cf5);
            pokeIframeAPI('view-connection', true, _0x259cf5);
            pokeAPI("newViewConnection", _0x16efc0.rpcs[_0x259cf5].streamID);
          };
          _0x16efc0.rpcs[_0x259cf5].receiveChannel.onmessage = async _0x2c4d92 => {
            if (typeof _0x2c4d92.data == "object") {
              if (!_0x16efc0.rpcs[_0x259cf5].imageElement) {
                _0x16efc0.rpcs[_0x259cf5].imageElement = document.createElement("img");
                _0x16efc0.rpcs[_0x259cf5].imageElement.width = 0x10;
                _0x16efc0.rpcs[_0x259cf5].imageElement.height = 0x9;
                _0x16efc0.rpcs[_0x259cf5].imageElement.style.objectFit = "contain";
                _0x16efc0.rpcs[_0x259cf5].imageElement.dataset.UUID = _0x259cf5;
                try {
                  _0x16efc0.rpcs[_0x259cf5].imageElement.dataset.sid = _0x16efc0.rpcs[_0x259cf5].streamID;
                } catch (_0x2e6a50) {}
                _0x16efc0.rpcs[_0x259cf5].imageElement.hidden = false;
                _0x16efc0.rpcs[_0x259cf5].imageElement.addEventListener("click", function (_0x5b578a) {
                  log("clicked");
                  try {
                    if (_0x5b578a.ctrlKey || _0x5b578a.metaKey) {
                      _0x5b578a.preventDefault();
                      var _0x2849d6 = _0x5b578a.currentTarget.dataset.UUID;
                      if ('stats' in _0x16efc0.rpcs[_0x2849d6]) {
                        var [_0x3e8d4c, _0x3efcda] = statsMenuCreator();
                        printViewStats(_0x3efcda, _0x2849d6);
                        _0x3e8d4c.interval = setInterval(printViewStats, _0x16efc0.statsInterval, _0x3efcda, _0x2849d6);
                      }
                      _0x5b578a.stopPropagation();
                      return false;
                    }
                  } catch (_0x20676b) {
                    errorlog(_0x20676b);
                  }
                });
                updateMixer();
              } else if (_0x16efc0.rpcs[_0x259cf5].imageElement.hidden) {
                _0x16efc0.rpcs[_0x259cf5].imageElement.hidden = false;
                _0x16efc0.rpcs[_0x259cf5].imageElement.style.visibility = "visible";
              }
              _0x16efc0.rpcs[_0x259cf5].imageElement.src = window.URL.createObjectURL(new Blob([new Uint8Array(_0x2c4d92.data)], {
                'type': "image/webp"
              }));
              return;
            }
            try {
              var _0x2e13d8 = JSON.parse(_0x2c4d92.data);
            } catch (_0x3ac46f) {
              _0x2e13d8 = _0x3ac46f.data;
            }
            _0x2e13d8.UUID = _0x259cf5;
            if ("altUUID" in _0x2e13d8) {
              await _0x16efc0.processRPCSOnMessage(_0x2e13d8, _0x259cf5 + "_screen");
            } else {
              await _0x16efc0.processRPCSOnMessage(_0x2e13d8, _0x259cf5);
            }
          };
          _0x16efc0.processRPCSOnMessage = async function (_0x40247b, _0x19a7d9) {
            if ('bye' in _0x40247b) {
              warnlog("BYE RPCS");
              _0x16efc0.closeRPC(_0x19a7d9, true);
              return;
            } else {
              if ("ping" in _0x40247b) {
                var _0x5e4a5f = {
                  "pong": _0x40247b.ping
                };
                _0x16efc0.sendRequest(_0x5e4a5f, _0x19a7d9);
                warnlog("PINGED");
                return;
              } else {
                if ("pong" in _0x40247b) {
                  warnlog("PONGED");
                  return;
                }
              }
            }
            var _0x467a72 = false;
            var _0x8ffce0 = false;
            if ('description' in _0x40247b) {
              _0x16efc0.processDescription(_0x40247b);
            } else {
              if ('candidate' in _0x40247b) {
                _0x40247b.UUID = _0x19a7d9;
                log("GOT ICE!!");
                _0x16efc0.processIce(_0x40247b);
              } else if ("candidates" in _0x40247b) {
                _0x40247b.UUID = _0x19a7d9;
                log("GOT ICES!!");
                _0x16efc0.processIceBundle(_0x40247b);
              }
            }
            if ("rejected" in _0x40247b) {
              if (_0x40247b.rejected === "requestCoDirector") {
                _0x16efc0.directorState = false;
                if (!_0x16efc0.cleanOutput) {
                  warnUser(miscTranslations["director-denied"], 0xbb8);
                  getById("head4").innerHTML = miscTranslations['not-the-director'];
                }
              } else {
                if (_0x40247b.rejected === "requestCoMigrate") {
                  if (!_0x16efc0.cleanOutput) {
                    warnUser(miscTranslations["only-main-director"], 0xbb8);
                  }
                } else {
                  if (!_0x16efc0.cleanOutput) {
                    if (_0x16efc0.directorUUID === _0x19a7d9) {
                      warnUser(miscTranslations['request-failed'], 0x1388);
                    } else if (_0x16efc0.remote && !_0x16efc0.director) {
                      warnUser(miscTranslations['tokens-did-not-match'], 0x1388);
                    } else {
                      warnUser(miscTranslations['token-not-director'], 0x1388);
                    }
                  } else {
                    if (_0x16efc0.director) {
                      if (!_0x16efc0.cleanOutput) {
                        warnUser("The request (" + _0x40247b.rejected + ") failed due to permissions or it was rejected by the user", 0x1388);
                      }
                    } else {
                      if (!_0x16efc0.cleanOutput) {
                        if (_0x16efc0.remote) {
                          warnUser(miscTranslations["remote-token-rejected"], 0x1388);
                        } else {
                          warnUser(miscTranslations["remote-control-failed"], 0x1388);
                        }
                      } else {}
                    }
                  }
                }
              }
              errorlog("ACTION REJECTED: " + _0x40247b.rejected + ", isDirector: " + _0x16efc0.director);
              pokeIframeAPI("rejected", _0x40247b.rejected, _0x19a7d9);
              return;
            } else {
              if ("approved" in _0x40247b) {
                if (_0x40247b.approved === "requestCoDirector") {
                  if (_0x16efc0.director) {
                    try {
                      if (_0x16efc0.label === false) {
                        document.title = miscTranslations["control-room-co-director"];
                      }
                    } catch (_0x41a0f1) {
                      errorlog(_0x41a0f1);
                    }
                    if (!_0x16efc0.cleanOutput && !_0x16efc0.directorState) {
                      warnUser(miscTranslations['approved-as-director'], 0xbb8);
                      getById("head4").innerHTML = miscTranslations['you-are-a-codirector'];
                      getById('yourDirectorStatus').innerHTML = miscTranslations['this-is-you'];
                    }
                    if (!_0x16efc0.directorState) {
                      _0x16efc0.directorState = true;
                      pokeAPI("codirector", true);
                      _0x16efc0.initialDirectorSync(_0x19a7d9);
                    }
                  }
                }
                log("approved: " + _0x40247b.approved);
                pokeIframeAPI('approved', _0x40247b.approved, _0x19a7d9);
                return;
              }
            }
            if ("iframeSrc" in _0x40247b) {
              try {
                _0x16efc0.rpcs[_0x19a7d9].iframeSrc = _0x40247b.iframeSrc || false;
                if (_0x16efc0.director) {
                  if (_0x16efc0.rpcs[_0x19a7d9].iframeSrc) {
                    var _0x3ad97e = document.createElement("div");
                    _0x3ad97e.innerText = _0x16efc0.rpcs[_0x19a7d9].iframeSrc;
                    _0x3ad97e.innerText = _0x3ad97e.innerHTML;
                    _0x3ad97e = _0x3ad97e.textContent || _0x3ad97e.innerText || '';
                    getById("iframeDetails_" + _0x19a7d9).innerHTML = "Shared website: <a href='" + _0x3ad97e + "' target='_blank'>" + _0x3ad97e + '</a>';
                    getById("iframeDetails_" + _0x19a7d9).classList.remove('hidden');
                  } else {
                    getById("iframeDetails_" + _0x19a7d9).classList.add('hidden');
                    getById('iframeDetails_' + _0x19a7d9).innerText = '';
                  }
                } else {
                  if (_0x16efc0.rpcs[_0x19a7d9].iframeSrc == false) {
                    try {
                      _0x16efc0.rpcs[_0x19a7d9].iframeEle.remove();
                    } catch (_0x1f25ef) {
                      errorlog(_0x1f25ef);
                    }
                    if (_0x16efc0.rpcs[_0x19a7d9].iframeVideo) {
                      _0x16efc0.rpcs[_0x19a7d9].iframeVideo.remove();
                      _0x16efc0.rpcs[_0x19a7d9].iframeVideo = false;
                    }
                    _0x16efc0.rpcs[_0x19a7d9].iframeEle = false;
                    _0x467a72 = true;
                    if (_0x16efc0.broadcast !== false) {
                      if (_0x16efc0.broadcast !== null) {
                        if (_0x16efc0.rpcs[_0x19a7d9].streamID === _0x16efc0.broadcast) {
                          _0x16efc0.broadcastIFrame = false;
                        }
                      } else if (_0x19a7d9 == _0x16efc0.directorUUID) {
                        _0x16efc0.broadcastIFrame = false;
                      }
                    }
                  } else {
                    if (_0x16efc0.broadcast !== false) {
                      if (_0x16efc0.broadcast !== null) {
                        if (_0x16efc0.rpcs[_0x19a7d9].streamID === _0x16efc0.broadcast) {
                          if (_0x16efc0.noiframe === false) {
                            _0x16efc0.rpcs[_0x19a7d9].iframeEle = loadIframe(_0x40247b.iframeSrc, _0x19a7d9);
                            _0x467a72 = true;
                            _0x16efc0.broadcastIFrame = _0x16efc0.rpcs[_0x19a7d9].iframeEle;
                            if (_0x16efc0.rpcs[_0x19a7d9].streamID) {
                              _0x16efc0.rpcs[_0x19a7d9].iframeEle.dataset.sid = _0x16efc0.rpcs[_0x19a7d9].streamID;
                            }
                          } else if (_0x16efc0.rpcs[_0x19a7d9].streamID in _0x16efc0.noiframe) {
                            _0x16efc0.rpcs[_0x19a7d9].iframeEle = loadIframe(_0x40247b.iframeSrc, _0x19a7d9);
                            _0x467a72 = true;
                            _0x16efc0.broadcastIFrame = _0x16efc0.rpcs[_0x19a7d9].iframeEle;
                            if (_0x16efc0.rpcs[_0x19a7d9].streamID) {
                              _0x16efc0.rpcs[_0x19a7d9].iframeEle.dataset.sid = _0x16efc0.rpcs[_0x19a7d9].streamID;
                            }
                          }
                        }
                      } else {
                        if (_0x16efc0.directorUUID) {
                          if (_0x19a7d9 == _0x16efc0.directorUUID) {
                            if (_0x16efc0.noiframe === false) {
                              _0x16efc0.rpcs[_0x19a7d9].iframeEle = loadIframe(_0x40247b.iframeSrc, _0x19a7d9);
                              _0x467a72 = true;
                              _0x16efc0.broadcastIFrame = _0x16efc0.rpcs[_0x19a7d9].iframeEle;
                              if (_0x16efc0.rpcs[_0x19a7d9].streamID) {
                                _0x16efc0.rpcs[_0x19a7d9].iframeEle.dataset.sid = _0x16efc0.rpcs[_0x19a7d9].streamID;
                              }
                            } else if (_0x16efc0.rpcs[_0x19a7d9].streamID in _0x16efc0.noiframe) {
                              _0x16efc0.rpcs[_0x19a7d9].iframeEle = loadIframe(_0x40247b.iframeSrc, _0x19a7d9);
                              _0x467a72 = true;
                              _0x16efc0.broadcastIFrame = _0x16efc0.rpcs[_0x19a7d9].iframeEle;
                              if (_0x16efc0.rpcs[_0x19a7d9].streamID) {
                                _0x16efc0.rpcs[_0x19a7d9].iframeEle.dataset.sid = _0x16efc0.rpcs[_0x19a7d9].streamID;
                              }
                            }
                          }
                        }
                      }
                    } else {
                      if (_0x16efc0.noiframe === false) {
                        _0x16efc0.rpcs[_0x19a7d9].iframeEle = loadIframe(_0x40247b.iframeSrc, _0x19a7d9);
                        _0x467a72 = true;
                        if (_0x16efc0.rpcs[_0x19a7d9].streamID) {
                          _0x16efc0.rpcs[_0x19a7d9].iframeEle.dataset.sid = _0x16efc0.rpcs[_0x19a7d9].streamID;
                        }
                      } else if (_0x16efc0.rpcs[_0x19a7d9].streamID in _0x16efc0.noiframe) {
                        _0x16efc0.rpcs[_0x19a7d9].iframeEle = loadIframe(_0x40247b.iframeSrc, _0x19a7d9);
                        _0x467a72 = true;
                        if (_0x16efc0.rpcs[_0x19a7d9].streamID) {
                          _0x16efc0.rpcs[_0x19a7d9].iframeEle.dataset.sid = _0x16efc0.rpcs[_0x19a7d9].streamID;
                        }
                      }
                    }
                  }
                }
              } catch (_0x3f9ee8) {
                errorlog(_0x3f9ee8);
              }
            } else {
              if ("ifs" in _0x40247b) {
                if (_0x16efc0.rpcs[_0x19a7d9].iframeEle) {
                  try {
                    if (_0x16efc0.rpcs[_0x19a7d9].iframeSrc.startsWith("https://www.youtube.com/")) {
                      processIframeSyncUpdates(_0x40247b.ifs, _0x19a7d9);
                    }
                  } catch (_0x567d9a) {
                    errorlog(_0x567d9a);
                  }
                }
              }
            }
            if ("remote" in _0x40247b) {
              try {
                _0x40247b = await _0x16efc0.decodeRemote(_0x40247b);
                if (!_0x40247b) {
                  return;
                }
              } catch (_0x4f3a00) {
                errorlor(_0x4f3a00);
              }
            }
            if ('obsCommand' in _0x40247b) {
              processOBSCommand(_0x40247b);
            }
            if ('chat' in _0x40247b) {
              var _0x5b3b8d = false;
              var _0xf285b0 = false;
              if (_0x16efc0.directorUUID === _0x19a7d9) {
                _0x5b3b8d = true;
                if ("overlay" in _0x40247b) {
                  if (_0x40247b.overlay == true) {
                    _0xf285b0 = true;
                  }
                }
              }
              if (_0x16efc0.director) {
                if (_0x40247b.chat == "Raised hand") {
                  if (_0x16efc0.beepToNotify) {
                    playtone();
                  }
                  getById('hands_' + _0x19a7d9).classList.remove('hidden');
                  _0x16efc0.rpcs[_0x19a7d9].remoteRaisedHandElement.classList.remove("hidden");
                } else if (_0x40247b.chat == "Lowered hand") {
                  getById('hands_' + _0x19a7d9).classList.add("hidden");
                  _0x16efc0.rpcs[_0x19a7d9].remoteRaisedHandElement.classList.add("hidden");
                }
              }
              log("isDirector " + _0x5b3b8d);
              getChatMessage(_0x40247b.chat, _0x16efc0.rpcs[_0x19a7d9].label, _0x5b3b8d, _0xf285b0);
            }
            if ("pipe" in _0x40247b) {
              _0x16efc0.gotGenericData(_0x40247b.pipe, _0x19a7d9);
            }
            if ('autoSync' in _0x40247b) {
              _0x16efc0.autoSyncObject = _0x40247b.autoSync;
              _0x16efc0.autoSyncCallback(_0x19a7d9);
            }
            if ("effectsData" in _0x40247b) {
              log(_0x40247b);
            }
            if ("group" in _0x40247b) {
              log(_0x40247b);
              if (_0x40247b.group) {
                _0x16efc0.rpcs[_0x19a7d9].group = _0x40247b.group.split(',');
              } else {
                _0x16efc0.rpcs[_0x19a7d9].group = [];
              }
              log(_0x16efc0.rpcs[_0x19a7d9]);
              _0x467a72 = true;
              if (_0x16efc0.director && _0x16efc0.rpcs[_0x19a7d9].streamID) {
                try {
                  syncGroup(_0x16efc0.rpcs[_0x19a7d9].group, _0x19a7d9);
                } catch (_0x19ec66) {
                  errorlog(_0x19ec66);
                }
              }
              pokeIframeAPI("remote-group-change", _0x16efc0.rpcs[_0x19a7d9].group, _0x19a7d9);
            }
            if ("transcript" in _0x40247b) {
              log(_0x40247b);
              if (_0x16efc0.closedCaptions) {
                updateClosedCaptions(_0x40247b, _0x16efc0.rpcs[_0x19a7d9].label, _0x19a7d9);
              }
            }
            if ("allowmidi" in _0x40247b && _0x40247b.allowmidi !== false) {
              _0x16efc0.rpcs[_0x19a7d9].allowMIDI = _0x40247b.allowmidi;
            }
            if (_0x16efc0.director) {
              if ("audioOptions" in _0x40247b) {
                updateDirectorsAudio(_0x40247b.audioOptions, _0x19a7d9);
              }
              if ("mediaDevices" in _0x40247b) {
                gotDevicesRemote(_0x40247b.mediaDevices, _0x19a7d9);
              }
              if ("videoOptions" in _0x40247b) {
                updateDirectorsVideo(_0x40247b.videoOptions, _0x19a7d9);
              }
              if ("recorder" in _0x40247b) {
                updateRemoteRecordButton(_0x19a7d9, _0x40247b.recorder);
              }
              if ("timer" in _0x40247b) {
                updateRemoteTimerButton(_0x19a7d9, _0x40247b.timer);
              }
            }
            if ("meshcast" in _0x40247b) {
              if (!_0x16efc0.noMeshcast) {
                meshcastWatch(_0x19a7d9, _0x40247b.meshcast);
              }
            }
            if ('lowerhand' in _0x40247b) {
              if (_0x16efc0.directorList.indexOf(_0x19a7d9) >= 0x0) {
                if (_0x16efc0.raisehands) {
                  lowerhand();
                }
              }
            }
            if ("layout" in _0x40247b) {
              if (_0x16efc0.directorList.indexOf(_0x19a7d9) >= 0x0) {
                _0x16efc0.layout = _0x40247b.layout;
                pokeIframeAPI("layout-updated", _0x16efc0.layout);
                _0x467a72 = true;
              }
            }
            if ("infocus" in _0x40247b) {
              _0x16efc0.infocus = false;
              _0x16efc0.infocus2 = false;
              if (_0x16efc0.broadcast === false) {
                log(_0x40247b);
                if (_0x16efc0.directorList.indexOf(_0x19a7d9) >= 0x0) {
                  if (_0x40247b.infocus !== false) {
                    if (_0x40247b.infocus === _0x16efc0.streamID) {
                      _0x16efc0.infocus = true;
                    } else {
                      if (_0x16efc0.view_set.length && !(_0x40247b.infocus in _0x16efc0.view_set)) {
                        warnlog("NOT IN VIEW SET");
                        _0x16efc0.infocus = false;
                      } else {
                        if (_0x16efc0.view && _0x16efc0.view !== _0x40247b.infocus) {
                          warnlog("NOT VIEW TARGET");
                          _0x16efc0.infocus = false;
                        } else {
                          if (_0x16efc0.scene !== false && _0x16efc0.directorUUID && _0x16efc0.directorUUID in _0x16efc0.rpcs && !_0x16efc0.rpcs[_0x16efc0.directorUUID].showDirector && _0x40247b.infocus === _0x16efc0.rpcs[_0x16efc0.directorUUID].streamID) {
                            warnlog("not allowed to show the director");
                            _0x16efc0.infocus = false;
                          } else {
                            for (var _0x5552f9 in _0x16efc0.rpcs) {
                              if (_0x16efc0.rpcs[_0x5552f9].streamID === _0x40247b.infocus) {
                                _0x16efc0.infocus = _0x5552f9;
                                break;
                              }
                            }
                            warnlog("ON FOCUS NOT FOUND");
                          }
                        }
                      }
                    }
                  } else {
                    _0x16efc0.infocus = false;
                  }
                  _0x467a72 = true;
                  _0x8ffce0 = true;
                }
              }
            } else {
              if ('infocus2' in _0x40247b) {
                _0x16efc0.infocus = false;
                _0x16efc0.infocus2 = false;
                if (_0x16efc0.broadcast === false) {
                  log(_0x40247b);
                  if (_0x16efc0.directorList.indexOf(_0x19a7d9) >= 0x0) {
                    if (_0x40247b.infocus2 !== false) {
                      if (_0x40247b.infocus2 === _0x16efc0.streamID) {
                        _0x16efc0.infocus2 = true;
                      } else {
                        if (_0x16efc0.view_set.length && !(_0x40247b.infocus2 in _0x16efc0.view_set)) {
                          warnlog("NOT IN VIEW SET");
                          _0x16efc0.infocus2 = false;
                        } else {
                          if (_0x16efc0.view && _0x16efc0.view !== _0x40247b.infocus2) {
                            warnlog("NOT VIEW TARGET");
                            _0x16efc0.infocus2 = false;
                          } else {
                            if (_0x16efc0.scene !== false && _0x16efc0.directorUUID && _0x16efc0.directorUUID in _0x16efc0.rpcs && !_0x16efc0.rpcs[_0x16efc0.directorUUID].showDirector && _0x40247b.infocus2 === _0x16efc0.rpcs[_0x16efc0.directorUUID].streamID) {
                              warnlog("not allowed to show the director");
                              _0x16efc0.infocus2 = false;
                            } else {
                              for (var _0x5552f9 in _0x16efc0.rpcs) {
                                if (_0x16efc0.rpcs[_0x5552f9].streamID === _0x40247b.infocus2) {
                                  _0x16efc0.infocus2 = _0x5552f9;
                                  break;
                                }
                              }
                              warnlog("ON FOCUS NOT FOUND");
                            }
                          }
                        }
                      }
                    } else {
                      _0x16efc0.infocus2 = false;
                    }
                    _0x467a72 = true;
                    _0x8ffce0 = true;
                  }
                }
              }
            }
            if ("sensors" in _0x40247b) {
              log(_0x40247b);
              _0x16efc0.rpcs[_0x19a7d9].stats.sensors = _0x40247b.sensors;
              if (isIFrame) {
                parent.postMessage({
                  'sensors': _0x40247b.sensors
                }, _0x16efc0.iframetarget);
              }
            }
            if ("midi" in _0x40247b) {
              playbackMIDI(_0x40247b.midi);
            }
            if ("fileList" in _0x40247b && _0x40247b.fileList) {
              addDownloadLink(_0x40247b.fileList, _0x19a7d9, _0x16efc0.rpcs);
            }
            if ("rotate_video" in _0x40247b) {
              if (_0x16efc0.rpcs[_0x19a7d9].rotate !== _0x40247b.rotate_video) {
                _0x16efc0.rpcs[_0x19a7d9].rotate = _0x40247b.rotate_video;
                if (_0x16efc0.rpcs[_0x19a7d9].videoElement) {
                  _0x16efc0.rpcs[_0x19a7d9].videoElement.rotated = _0x16efc0.rpcs[_0x19a7d9].rotate;
                }
                _0x467a72 = true;
              }
            }
            if ('info' in _0x40247b) {
              warnlog(_0x40247b);
              _0x16efc0.rpcs[_0x19a7d9].stats.info = _0x40247b.info;
              if (_0x40247b.info.autoSync) {
                if (!_0x16efc0.autoSyncObject) {
                  _0x16efc0.autoSyncObject = _0x40247b.info.autoSync;
                  _0x16efc0.autoSyncCallback(_0x19a7d9);
                }
              }
              if (_0x16efc0.rpcs[_0x19a7d9].signalMeter) {
                if (_0x16efc0.rpcs[_0x19a7d9].stats.info.cpuLimited) {
                  _0x16efc0.rpcs[_0x19a7d9].signalMeter.dataset.cpu = '1';
                } else if ("cpuLimited" in _0x16efc0.rpcs[_0x19a7d9].stats.info) {
                  _0x16efc0.rpcs[_0x19a7d9].signalMeter.dataset.cpu = '0';
                }
              }
              if ('obs_control' in _0x40247b.info) {
                if (_0x40247b.info.obs_control !== false) {
                  _0x16efc0.rpcs[_0x19a7d9].obsControl = _0x40247b.info.obs_control;
                  _0x16efc0.obsStateSync("details", _0x19a7d9);
                } else {
                  _0x16efc0.rpcs[_0x19a7d9].obsControl = false;
                }
              }
              if ("label" in _0x40247b.info) {
                try {
                  if (typeof _0x40247b.info.label == "string") {
                    _0x16efc0.rpcs[_0x19a7d9].label = sanitizeLabel(_0x40247b.info.label);
                  } else {
                    _0x16efc0.rpcs[_0x19a7d9].label = false;
                  }
                  applyStyleEffect(_0x19a7d9);
                  if (_0x16efc0.director) {
                    var _0x36604e = getById("label_" + _0x19a7d9);
                    if (_0x36604e) {
                      _0x36604e.classList.add("contolboxLabel");
                      _0x36604e.dataset.UUID = _0x19a7d9;
                      if (_0x16efc0.rpcs[_0x19a7d9].label) {
                        _0x36604e.innerText = _0x16efc0.rpcs[_0x19a7d9].label;
                        _0x36604e.classList.remove("addALabel");
                      } else if (_0x16efc0.directorUUID === _0x19a7d9) {
                        _0x36604e.innerText = miscTranslations["main-director"];
                        _0x36604e.classList.remove('addALabel');
                      } else {
                        _0x36604e.innerText = miscTranslations["add-a-label"];
                        _0x36604e.classList.add("addALabel");
                      }
                      _0x36604e.onclick = async function (_0x33077e) {
                        var _0x2a8057 = _0x33077e.target.innerText;
                        if (_0x16efc0.rpcs[_0x33077e.target.dataset.UUID].label === false) {
                          _0x2a8057 = '';
                        }
                        window.focus();
                        var _0xf1b983 = await promptAlt(miscTranslations["new-display-name"], false, false, _0x2a8057);
                        if (_0xf1b983 !== null) {
                          if (_0xf1b983 == '') {
                            _0xf1b983 = false;
                            if (_0x16efc0.directorUUID === _0x19a7d9) {
                              _0x33077e.target.innerText = miscTranslations["main-director"];
                              _0x33077e.target.classList.remove("addALabel");
                            } else {
                              _0x33077e.target.innerText = miscTranslations["add-a-label"];
                              _0x33077e.target.classList.add("addALabel");
                            }
                          } else {
                            _0x33077e.target.innerText = _0xf1b983;
                            _0x33077e.target.classList.remove("addALabel");
                          }
                          var _0x4a20a0 = {
                            UUID: _0x33077e.target.dataset.UUID,
                            "changeLabel": true,
                            value: _0xf1b983
                          };
                          _0x16efc0.sendRequest(_0x4a20a0, _0x4a20a0.UUID);
                        }
                      };
                    }
                  }
                } catch (_0x2d3cc3) {
                  errorlog(_0x2d3cc3);
                }
              }
              if ('order' in _0x40247b.info) {
                try {
                  _0x16efc0.rpcs[_0x19a7d9].order = parseInt(_0x40247b.info.order) || 0x0;
                  if (_0x16efc0.director) {
                    var _0x276f92 = document.querySelectorAll("[data-action-type=\"order-value\"][data--u-u-i-d=\"" + _0x19a7d9 + "\"]");
                    if (_0x276f92[0x0]) {
                      _0x276f92[0x0].innerText = _0x16efc0.rpcs[_0x19a7d9].order;
                    }
                  }
                } catch (_0x29676b) {
                  errorlog(_0x29676b);
                }
              } else {
                _0x16efc0.rpcs[_0x19a7d9].order = 0x0;
              }
              if (_0x16efc0.rpcs[_0x19a7d9].batteryMeter) {
                try {
                  if ("power_level" in _0x40247b.info) {
                    if (_0x40247b.info.power_level !== null) {
                      var _0x3f2558 = _0x16efc0.rpcs[_0x19a7d9].batteryMeter.querySelector('.battery-level');
                      if (_0x3f2558) {
                        var _0x5ee7c0 = parseInt(_0x16efc0.rpcs[_0x19a7d9].stats.info.power_level) || 0x0;
                        if (_0x5ee7c0 > 0x64) {
                          _0x5ee7c0 = 0x64;
                        }
                        if (_0x5ee7c0 < 0x0) {
                          _0x5ee7c0 = 0x0;
                        }
                        _0x3f2558.style.height = parseInt(_0x5ee7c0) + '%';
                        if (_0x5ee7c0 < 0xa) {
                          _0x16efc0.rpcs[_0x19a7d9].batteryMeter.classList.remove("warn");
                          _0x16efc0.rpcs[_0x19a7d9].batteryMeter.classList.add("alert");
                        } else if (_0x5ee7c0 < 0x19) {
                          _0x16efc0.rpcs[_0x19a7d9].batteryMeter.classList.remove("alert");
                          _0x16efc0.rpcs[_0x19a7d9].batteryMeter.classList.add("warn");
                        } else {
                          _0x16efc0.rpcs[_0x19a7d9].batteryMeter.classList.remove("alert");
                          _0x16efc0.rpcs[_0x19a7d9].batteryMeter.classList.remove("warn");
                        }
                        if (_0x5ee7c0 < 0x64) {
                          _0x16efc0.rpcs[_0x19a7d9].batteryMeter.classList.remove("hidden");
                        }
                        _0x16efc0.rpcs[_0x19a7d9].batteryMeter.title = _0x5ee7c0 + "% battery remaining";
                      }
                    }
                  }
                  if ("plugged_in" in _0x40247b.info) {
                    if (_0x40247b.info.plugged_in === false) {
                      _0x16efc0.rpcs[_0x19a7d9].batteryMeter.dataset.plugged = '0';
                      _0x16efc0.rpcs[_0x19a7d9].batteryMeter.classList.remove("hidden");
                    } else {
                      _0x16efc0.rpcs[_0x19a7d9].batteryMeter.dataset.plugged = '1';
                    }
                  }
                } catch (_0x347cfd) {
                  errorlog(_0x347cfd);
                }
              }
              if ("initial_group" in _0x40247b.info) {
                try {
                  if (_0x40247b.info.initial_group) {
                    _0x16efc0.rpcs[_0x19a7d9].group = _0x40247b.info.initial_group.split(',');
                  } else {
                    _0x16efc0.rpcs[_0x19a7d9].group = [];
                  }
                  if (_0x16efc0.director) {
                    initGroupButtons(_0x19a7d9);
                    if (_0x16efc0.rpcs[_0x19a7d9].group.length) {
                      syncGroup(_0x16efc0.rpcs[_0x19a7d9].group, _0x19a7d9);
                    }
                  } else {
                    _0x467a72 = true;
                  }
                } catch (_0x2ef9b9) {
                  errorlog(_0x2ef9b9);
                }
              }
              if ("muted" in _0x40247b.info) {
                try {
                  _0x16efc0.rpcs[_0x19a7d9].remoteMuteState = _0x40247b.info.muted;
                  if (_0x16efc0.scene === false) {
                    if (_0x16efc0.roomid) {
                      if (!_0x16efc0.cleanOutput || _0x16efc0.director) {
                        if (_0x16efc0.rpcs[_0x19a7d9].remoteMuteElement) {
                          if (_0x16efc0.rpcs[_0x19a7d9].remoteMuteState) {
                            _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement.classList.remove("hidden");
                          } else {
                            _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement.classList.add("hidden");
                          }
                        } else {
                          _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement = getById("muteStateTemplate").cloneNode(true);
                          _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement.id = "remoteMuteState_" + _0x19a7d9;
                          if (_0x16efc0.rpcs[_0x19a7d9].remoteMuteState) {
                            _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement.classList.remove("hidden");
                          } else {
                            _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement.classList.add("hidden");
                          }
                          _0x467a72 = true;
                        }
                      }
                    }
                  }
                  pokeIframeAPI("remote-mute-state", _0x16efc0.rpcs[_0x19a7d9].remoteMuteState, _0x19a7d9);
                } catch (_0x5889ba) {
                  errorlog(_0x5889ba);
                }
              }
              if (_0x16efc0.director) {
                try {
                  if ("recording_audio_pipeline" in _0x40247b.info) {
                    if (_0x40247b.info.recording_audio_pipeline == false) {
                      initRecordingImpossible(_0x19a7d9);
                    }
                  }
                } catch (_0xd08e93) {
                  errorlog(_0xd08e93);
                }
                try {
                  if ("recording_audio_gain" in _0x40247b.info) {
                    if (_0x40247b.info.recording_audio_gain !== false) {
                      let _0x39255c = parseInt(_0x40247b.info.recording_audio_gain) || 0x0;
                      initAudioButtons(_0x39255c, _0x19a7d9);
                    }
                  }
                } catch (_0x26b450) {
                  errorlog(_0x26b450);
                }
                try {
                  if ('directorSpeakerMuted' in _0x40247b.info) {
                    if (_0x40247b.info.directorSpeakerMuted) {
                      updateRemoteSpeakerMute(_0x19a7d9);
                    }
                  }
                } catch (_0x203bfa) {
                  errorlog(_0x203bfa);
                }
                try {
                  if ("directorDisplayMuted" in _0x40247b.info) {
                    if (_0x40247b.info.directorDisplayMuted) {
                      updateRemoteDisplayMute(_0x19a7d9);
                    }
                  }
                } catch (_0x4743bc) {
                  errorlog(_0x4743bc);
                }
              }
              if ('directorVideoMuted' in _0x40247b.info) {
                try {
                  if (_0x16efc0.director) {
                    if (_0x40247b.info.directorVideoMuted) {
                      updateDirectorVideoMute(_0x19a7d9);
                    }
                  } else {
                    _0x16efc0.rpcs[_0x19a7d9].directorVideoMuted = _0x40247b.info.directorVideoMuted;
                    if (_0x16efc0.rpcs[_0x19a7d9].directorVideoMuted) {
                      if (_0x19a7d9 in _0x16efc0.rpcs) {
                        _0x16efc0.requestRateLimit(0x0, _0x19a7d9);
                      }
                    }
                  }
                } catch (_0x411d53) {
                  errorlog(_0x411d53);
                }
              }
              if ('directorMirror' in _0x40247b.info) {
                try {
                  if (_0x16efc0.director) {
                    if (_0x40247b.info.directorMirror) {
                      if (getById("container_" + _0x19a7d9).querySelector("[data-action-type=\"mirror-guest\"]")) {
                        getById("container_" + _0x19a7d9).querySelector("[data-action-type=\"mirror-guest\"]").classList.add("pressed");
                        getById("container_" + _0x19a7d9).querySelector("[data-action-type=\"mirror-guest\"]").ariaPressed = "true";
                      }
                    }
                  }
                  _0x16efc0.rpcs[_0x19a7d9].mirrorState = _0x40247b.info.directorMirror;
                  if (_0x16efc0.rpcs[_0x19a7d9].videoElement) {
                    applyMirrorGuest(_0x16efc0.rpcs[_0x19a7d9].mirrorState, _0x16efc0.rpcs[_0x19a7d9].videoElement);
                  }
                } catch (_0x3c0973) {
                  errorlog(_0x3c0973);
                }
              }
              if ("video_muted_init" in _0x40247b.info) {
                try {
                  _0x16efc0.rpcs[_0x19a7d9].videoMuted = _0x40247b.info.video_muted_init;
                  if (_0x16efc0.rpcs[_0x19a7d9].videoMuted) {
                    if (_0x16efc0.director) {
                      _0x16efc0.rpcs[_0x19a7d9].remoteVideoMuteElement.classList.remove('hidden');
                    }
                  }
                  pokeIframeAPI("remote-video-mute-state", _0x16efc0.rpcs[_0x19a7d9].videoMuted, _0x19a7d9);
                } catch (_0x410800) {
                  errorlog(_0x410800);
                }
              }
              if ("rotate_video" in _0x40247b.info) {
                if (_0x16efc0.rpcs[_0x19a7d9].rotate !== _0x40247b.info.rotate_video) {
                  _0x16efc0.rpcs[_0x19a7d9].rotate = _0x40247b.info.rotate_video;
                  if (_0x16efc0.rpcs[_0x19a7d9].videoElement) {
                    _0x16efc0.rpcs[_0x19a7d9].videoElement.rotated = _0x16efc0.rpcs[_0x19a7d9].rotate;
                  }
                  _0x467a72 = true;
                }
              }
              if ("room_init" in _0x40247b.info) {
                if (_0x40247b.info.room_init === false) {
                  soloLinkGeneratorInit(_0x19a7d9);
                }
              }
              directorCoDirectorColoring(_0x19a7d9);
              _0x8ffce0 = true;
              pokeAPI("details", getDetailedState(_0x16efc0.rpcs[_0x19a7d9].streamID));
              pokeIframeAPI('view-connection-info', _0x40247b.info, _0x19a7d9);
            }
            if ("miniInfo" in _0x40247b) {
              if (_0x16efc0.rpcs[_0x19a7d9].stats && _0x16efc0.rpcs[_0x19a7d9].stats.info) {
                if ('qlr' in _0x40247b.miniInfo) {
                  _0x16efc0.rpcs[_0x19a7d9].stats.info.quality_limitation_reason = _0x40247b.miniInfo.qlr;
                }
                if ("con" in _0x40247b.miniInfo) {
                  _0x16efc0.rpcs[_0x19a7d9].stats.info.conn_type = _0x40247b.miniInfo.con;
                }
                if ("cpu" in _0x40247b.miniInfo) {
                  _0x16efc0.rpcs[_0x19a7d9].stats.info.cpuLimited = _0x40247b.miniInfo.cpu;
                  if (_0x16efc0.rpcs[_0x19a7d9].signalMeter) {
                    if (_0x40247b.miniInfo.cpu) {
                      _0x16efc0.rpcs[_0x19a7d9].signalMeter.dataset.cpu = '1';
                    } else if ('cpu' in _0x40247b.miniInfo) {
                      _0x16efc0.rpcs[_0x19a7d9].signalMeter.dataset.cpu = '0';
                    }
                  }
                }
                if ('hw_enc' in _0x40247b.miniInfo) {
                  _0x16efc0.rpcs[_0x19a7d9].stats.info.hardware_video_encoder = _0x40247b.miniInfo.hw_enc;
                }
                if ('bat' in _0x40247b.miniInfo) {
                  if (typeof _0x40247b.miniInfo.bat == 'number') {
                    _0x16efc0.rpcs[_0x19a7d9].stats.info.power_level = _0x40247b.miniInfo.bat * 0x64;
                  } else {
                    _0x16efc0.rpcs[_0x19a7d9].stats.info.power_level = null;
                  }
                }
                if ("chrg" in _0x40247b.miniInfo) {
                  _0x16efc0.rpcs[_0x19a7d9].stats.info.plugged_in = _0x40247b.miniInfo.chrg;
                }
                if ("out" in _0x40247b.miniInfo && 'c' in _0x40247b.miniInfo.out) {
                  _0x16efc0.rpcs[_0x19a7d9].stats.info.total_outbound_p2p_connections = _0x40247b.miniInfo.out.c;
                  if (_0x16efc0.showConnections && _0x16efc0.rpcs[_0x19a7d9].connectionDetails) {
                    _0x16efc0.rpcs[_0x19a7d9].connectionDetails.innerText = '🔗' + _0x16efc0.rpcs[_0x19a7d9].stats.info.total_outbound_p2p_connections;
                    _0x16efc0.rpcs[_0x19a7d9].connectionDetails.dataset.value = _0x16efc0.rpcs[_0x19a7d9].stats.info.total_outbound_p2p_connections;
                  }
                }
                if (_0x16efc0.rpcs[_0x19a7d9].batteryMeter) {
                  batteryMeterInfoUpdate(_0x19a7d9);
                }
              }
            }
            if (_0x40247b.directorSettings) {
              _0x16efc0.rpcs[_0x19a7d9].director = true;
              if (_0x40247b.directorSettings.tokenDirector) {
                await checkToken();
              }
              if (_0x16efc0.directorUUID === _0x19a7d9) {
                if ("totalRoomBitrate" in _0x40247b.directorSettings) {
                  _0x16efc0.totalRoomBitrate = parseInt(_0x40247b.directorSettings.totalRoomBitrate) || 0x0;
                  _0x467a72 = true;
                }
                if (_0x40247b.directorSettings.soloVideo) {
                  if (_0x16efc0.broadcast === false) {
                    if (_0x40247b.directorSettings.soloVideo === _0x16efc0.streamID) {
                      _0x16efc0.infocus = true;
                    } else {
                      for (var _0x5552f9 in _0x16efc0.rpcs) {
                        if (_0x16efc0.rpcs[_0x5552f9].streamID === _0x40247b.directorSettings.soloVideo) {
                          if ((_0x16efc0.directorList.includes(_0x5552f9) || _0x16efc0.rpcs[_0x5552f9].director) && !_0x16efc0.showDirector) {
                            break;
                          }
                          _0x16efc0.infocus = _0x5552f9;
                          break;
                        }
                      }
                    }
                    _0x467a72 = true;
                    _0x8ffce0 = true;
                  }
                }
                if ("showDirector" in _0x40247b.directorSettings) {
                  if (_0x16efc0.scene !== false) {
                    if (_0x16efc0.showDirector) {
                      _0x16efc0.rpcs[_0x19a7d9].showDirector = _0x16efc0.showDirector;
                    } else if (_0x40247b.directorSettings.showDirector) {
                      _0x16efc0.rpcs[_0x19a7d9].showDirector = _0x40247b.directorSettings.showDirector;
                    }
                  }
                }
                if (_0x16efc0.scene !== false) {
                  if (_0x40247b.directorSettings.scene) {
                    for (var _0x5552f9 in _0x40247b.directorSettings.scene) {
                      setTimeout(function (_0x372514) {
                        _0x16efc0.directorActions(_0x372514);
                      }, 0x3e8, _0x40247b.directorSettings.scene[_0x5552f9]);
                    }
                  }
                  if (_0x40247b.directorSettings.mute) {
                    for (var _0x5552f9 in _0x40247b.directorSettings.mute) {
                      setTimeout(function (_0x46e971) {
                        _0x16efc0.directorActions(_0x46e971);
                      }, 0x3e8, _0x40247b.directorSettings.mute[_0x5552f9]);
                    }
                  }
                }
                if ('addCoDirector' in _0x40247b.directorSettings) {
                  for (var _0x136e3b = 0x0; _0x136e3b < _0x40247b.directorSettings.addCoDirector.length; _0x136e3b++) {
                    if (!_0x16efc0.directorList.includes(_0x40247b.directorSettings.addCoDirector[_0x136e3b].toString)) {
                      _0x16efc0.directorList.push(_0x40247b.directorSettings.addCoDirector[_0x136e3b].toString());
                      addDirectorBlue(_0x40247b.directorSettings.addCoDirector[_0x136e3b].toString());
                    }
                  }
                }
              }
            }
            if (_0x16efc0.directorList.indexOf(_0x19a7d9) >= 0x0) {
              if (_0x16efc0.scene !== false) {
                if ("action" in _0x40247b) {
                  _0x16efc0.directorActions(_0x40247b);
                }
              }
              if ("directorSettings" in _0x40247b && _0x40247b.directorSettings.blindAllGuests) {
                if (!_0x16efc0.director) {
                  if (_0x16efc0.scene === false) {
                    _0x16efc0.directorDisplayMuted = true;
                    _0x16efc0.directorDisplayMute();
                  }
                }
              }
              if ("mirrorGuestState" in _0x40247b && "mirrorGuestTarget" in _0x40247b) {
                if (_0x40247b.mirrorGuestTarget && _0x40247b.mirrorGuestTarget === true) {
                  _0x16efc0.permaMirrored = _0x40247b.mirrorGuestState;
                  applyMirror(false);
                  if (_0x16efc0.director) {
                    if (_0x40247b.info.directorMirror) {
                      if (getById("container_director").querySelector("[data-action-type=\"mirror-guest\"]")) {
                        getById("container_director").querySelector("[data-action-type=\"mirror-guest\"]").classList.add("pressed");
                        getById('container_director').querySelector("[data-action-type=\"mirror-guest\"]").ariaPressed = "true";
                      } else if (getById("container_director").querySelector("[data-action-type=\"mirror-guest\"]")) {
                        getById('container_director').querySelector("[data-action-type=\"mirror-guest\"]").classList.remove('pressed');
                        getById('container_director').querySelector("[data-action-type=\"mirror-guest\"]").ariaPressed = 'false';
                      }
                    }
                  }
                } else {
                  if (_0x40247b.mirrorGuestTarget && _0x40247b.mirrorGuestTarget in _0x16efc0.rpcs) {
                    _0x16efc0.rpcs[_0x40247b.mirrorGuestTarget].mirrorState = _0x40247b.mirrorGuestState;
                    if (_0x16efc0.rpcs[_0x40247b.mirrorGuestTarget].videoElement) {
                      applyMirrorGuest(_0x40247b.mirrorGuestState, _0x16efc0.rpcs[_0x40247b.mirrorGuestTarget].videoElement);
                    }
                    if (_0x16efc0.director) {
                      if (_0x40247b.info.directorMirror) {
                        if (getById("container_" + _0x19a7d9).querySelector("[data-action-type=\"mirror-guest\"]")) {
                          getById("container_" + _0x19a7d9).querySelector("[data-action-type=\"mirror-guest\"]").classList.add("pressed");
                          getById("container_" + _0x19a7d9).querySelector("[data-action-type=\"mirror-guest\"]").ariaPressed = "true";
                        }
                      } else if (getById("container_" + _0x19a7d9).querySelector("[data-action-type=\"mirror-guest\"]")) {
                        getById('container_' + _0x19a7d9).querySelector("[data-action-type=\"mirror-guest\"]").classList.remove("pressed");
                        getById("container_" + _0x19a7d9).querySelector("[data-action-type=\"mirror-guest\"]").ariaPressed = "false";
                      }
                    }
                  }
                }
              }
              if ("directorState" in _0x40247b) {
                _0x16efc0.syncState = _0x40247b.directorState;
                log(_0x40247b);
                for (var _0xe2bae in _0x16efc0.syncState) {
                  syncSceneState(_0xe2bae);
                  syncOtherState(_0xe2bae);
                }
              }
              if ('widgetSrc' in _0x40247b) {
                _0x16efc0.widget = _0x40247b.widgetSrc || false;
                let _0x244ec2 = document.getElementById("widget");
                try {
                  if (_0x244ec2) {
                    if (!_0x16efc0.widget) {
                      document.getElementById("widget").remove();
                      _0x467a72 = true;
                    } else {
                      _0x244ec2.src = parseURL4Iframe(_0x16efc0.widget);
                    }
                  } else {
                    _0x467a72 = true;
                  }
                  if (_0x16efc0.director) {
                    getById("widgetURL").value = _0x16efc0.widget || '';
                  }
                } catch (_0x5c1792) {
                  errorlog(_0x5c1792);
                }
                pokeIframeAPI("widget-src", _0x16efc0.widget, _0x19a7d9);
              }
              if ("slotsUpdate" in _0x40247b) {
                _0x16efc0.currentSlots = _0x40247b.slotsUpdate;
                if (!_0x16efc0.obsSceneSync()) {
                  if (_0x16efc0.layout) {
                    _0x16efc0.layout = combinedLayoutSimple(_0x16efc0.layout);
                    ;
                    updateMixer();
                  }
                }
                warnlog(_0x40247b);
              }
              if ("layouts" in _0x40247b) {
                _0x16efc0.layouts = _0x40247b.layouts;
                if ("obsSceneTriggers" in _0x40247b) {
                  _0x16efc0.obsSceneTriggers = _0x40247b.obsSceneTriggers;
                  _0x16efc0.obsSceneSync();
                } else {
                  _0x16efc0.obsSceneTriggers = false;
                }
              }
            }
            if ("order" in _0x40247b) {
              _0x16efc0.rpcs[_0x19a7d9].order = parseInt(_0x40247b.order) || 0x0;
              if (_0x19a7d9 in _0x16efc0.pcs) {
                _0x16efc0.pcs[_0x19a7d9].order = parseInt(_0x40247b.order) || 0x0;
              }
              if (_0x16efc0.director) {
                var _0x276f92 = document.querySelectorAll("[data-action-type=\"order-value\"][data--u-u-i-d=\"" + _0x19a7d9 + "\"]");
                if (_0x276f92[0x0]) {
                  _0x276f92[0x0].innerText = parseInt(_0x40247b.order) || 0x0;
                }
              }
              _0x467a72 = true;
            }
            if ('changeLabel' in _0x40247b) {
              log("Change Label");
              if ("value" in _0x40247b) {
                log("value there");
                if (typeof _0x40247b.value == 'string') {
                  _0x16efc0.rpcs[_0x19a7d9].label = sanitizeLabel(_0x40247b.value);
                  if (_0x16efc0.rpcs[_0x19a7d9].label.length == 0x0) {
                    _0x16efc0.rpcs[_0x19a7d9].label = false;
                  }
                  applyStyleEffect(_0x19a7d9);
                  if (_0x16efc0.director) {
                    updateLabelDirectors(_0x19a7d9);
                  } else if (_0x16efc0.showlabels) {
                    _0x467a72 = true;
                  }
                } else {
                  _0x16efc0.rpcs[_0x19a7d9].label = false;
                  applyStyleEffect(_0x19a7d9);
                  if (_0x16efc0.director) {
                    updateLabelDirectors2(_0x19a7d9);
                  } else if (_0x16efc0.showlabels) {
                    _0x467a72 = true;
                  }
                }
                _0x8ffce0 = true;
                pokeIframeAPI("remote-label-changed", _0x16efc0.rpcs[_0x19a7d9].label, _0x19a7d9);
              }
            }
            if ("muteState" in _0x40247b) {
              log(_0x40247b);
              _0x16efc0.rpcs[_0x19a7d9].remoteMuteState = _0x40247b.muteState;
              _0x16efc0.requestRateLimit(false, _0x19a7d9);
              if (_0x16efc0.rpcs[_0x19a7d9].stats.info) {
                _0x16efc0.rpcs[_0x19a7d9].stats.info.muted = _0x16efc0.rpcs[_0x19a7d9].remoteMuteState;
              }
              if (_0x16efc0.scene === false) {
                if (_0x16efc0.roomid) {
                  if (!_0x16efc0.cleanOutput || _0x16efc0.director) {
                    if (_0x16efc0.rpcs[_0x19a7d9].remoteMuteElement) {
                      if (_0x16efc0.rpcs[_0x19a7d9].remoteMuteState) {
                        _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement.classList.remove('hidden');
                      } else {
                        _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement.classList.add('hidden');
                      }
                    } else {
                      _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement = getById('muteStateTemplate').cloneNode(true);
                      _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement.id = "remoteMuteState_" + _0x19a7d9;
                      if (_0x16efc0.rpcs[_0x19a7d9].remoteMuteState) {
                        _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement.classList.remove('hidden');
                      } else {
                        _0x16efc0.rpcs[_0x19a7d9].remoteMuteElement.classList.add('hidden');
                      }
                      _0x467a72 = true;
                    }
                    _0x8ffce0 = true;
                  }
                }
              }
              pokeAPI('remoteMuted', _0x16efc0.rpcs[_0x19a7d9].remoteMuteState, _0x16efc0.rpcs[_0x19a7d9].streamID);
              pokeIframeAPI('remote-mute-state', _0x40247b.muteState, _0x19a7d9);
            }
            if ("requestSceneUpdate" in _0x40247b) {
              var _0x28da72 = getChromeVersion();
              if (_0x28da72) {
                if (_0x28da72 < 0x50) {
                  _0x467a72 = true;
                }
              }
            }
            if ("videoMuted" in _0x40247b) {
              log("videoMuted: " + _0x40247b.videoMuted);
              _0x16efc0.rpcs[_0x19a7d9].videoMuted = _0x40247b.videoMuted;
              if (!_0x16efc0.director) {
                if (_0x16efc0.rpcs[_0x19a7d9].videoMuted) {
                  if (!_0x16efc0.manual) {
                    _0x16efc0.requestRateLimit(0x0, _0x19a7d9);
                  }
                  if (_0x16efc0.rpcs[_0x19a7d9].imageElement) {
                    _0x16efc0.rpcs[_0x19a7d9].imageElement.hidden = true;
                    _0x16efc0.rpcs[_0x19a7d9].imageElement.style.visibility = "hidden";
                  }
                } else {
                  updateIncomingVideoElement(_0x19a7d9, true, false);
                }
                _0x467a72 = true;
              } else if (_0x16efc0.rpcs[_0x19a7d9].videoMuted) {
                _0x16efc0.rpcs[_0x19a7d9].remoteVideoMuteElement.classList.remove("hidden");
              } else {
                _0x16efc0.rpcs[_0x19a7d9].remoteVideoMuteElement.classList.add('hidden');
              }
              if (_0x16efc0.rpcs[_0x19a7d9].defaultSpeaker && _0x16efc0.rpcs[_0x19a7d9].videoMuted) {
                setTimeout(function () {
                  activeSpeaker();
                }, 0x0);
              } else if (!_0x16efc0.rpcs[_0x19a7d9].videoMuted) {
                setTimeout(function () {
                  activeSpeaker();
                }, 0x0);
              }
              _0x8ffce0 = true;
              pokeAPI("remoteVideoMuted", _0x16efc0.rpcs[_0x19a7d9].videoMuted, _0x16efc0.rpcs[_0x19a7d9].streamID);
              pokeIframeAPI("remote-video-mute-state", _0x40247b.videoMuted, _0x19a7d9);
            }
            if ("screenStopped" in _0x40247b) {
              if (_0x19a7d9 + "_screen" in _0x16efc0.rpcs) {
                _0x16efc0.rpcs[_0x19a7d9 + "_screen"].virtualHangup = _0x40247b.screenStopped;
                if (_0x16efc0.director) {
                  _0x16efc0.rpcs[_0x19a7d9 + '_screen'].videoMuted = !_0x40247b.screenStopped;
                  try {
                    pokeAPI("remoteVideoMuted", _0x16efc0.rpcs[_0x19a7d9 + '_screen'].videoMuted, _0x16efc0.rpcs[_0x19a7d9 + "_screen"].streamID);
                  } catch (_0x5335e5) {}
                  if (_0x16efc0.rpcs[_0x19a7d9].videoMuted) {
                    _0x16efc0.rpcs[_0x19a7d9].remoteVideoMuteElement.classList.remove('hidden');
                  } else {
                    _0x16efc0.rpcs[_0x19a7d9].remoteVideoMuteElement.classList.add("hidden");
                  }
                  if (_0x40247b.screenStopped) {
                    getById("container_" + _0x19a7d9 + "_screen").classList.add("screenshareNotActive");
                  } else {
                    getById('container_' + _0x19a7d9 + "_screen").classList.remove("screenshareNotActive");
                  }
                } else {
                  _0x16efc0.rpcs[_0x19a7d9 + "_screen"].virtualHangup = _0x40247b.screenStopped;
                  _0x467a72 = true;
                }
                _0x8ffce0 = true;
              }
            }
            if ("screenShareState" in _0x40247b) {
              _0x16efc0.rpcs[_0x19a7d9].screenShareState = _0x40247b.screenShareState;
              _0x467a72 = true;
              pokeIframeAPI("remote-screenshare-state", _0x40247b.screenShareState, _0x19a7d9);
            }
            if ("directVideoMuted" in _0x40247b) {
              if (!_0x16efc0.director) {
                if ("target" in _0x40247b) {
                  if (_0x16efc0.directorList.indexOf(_0x19a7d9) >= 0x0) {
                    var _0x279f6a = _0x40247b.target;
                    if (_0x279f6a === true) {
                      _0x16efc0.directorVideoMuted = _0x40247b.directVideoMuted;
                    } else if (_0x279f6a in _0x16efc0.rpcs) {
                      _0x16efc0.rpcs[_0x279f6a].directorVideoMuted = _0x40247b.directVideoMuted;
                      if (_0x16efc0.rpcs[_0x279f6a].directorVideoMuted) {
                        _0x16efc0.requestRateLimit(0x0, _0x279f6a);
                      }
                      _0x467a72 = true;
                    }
                  }
                }
              }
              _0x8ffce0 = true;
            }
            if ("virtualHangup" in _0x40247b) {
              if (!_0x16efc0.director) {
                if (_0x16efc0.directorList.indexOf(_0x19a7d9) >= 0x0) {
                  if (_0x19a7d9 in _0x16efc0.rpcs) {
                    _0x16efc0.rpcs[_0x19a7d9].virtualHangup = _0x40247b.virtualHangup;
                    if (_0x16efc0.rpcs[_0x19a7d9].virtualHangup) {
                      if (_0x19a7d9 in _0x16efc0.rpcs) {
                        _0x16efc0.requestRateLimit(0x0, _0x19a7d9);
                      }
                    }
                    _0x467a72 = true;
                  }
                }
              }
              _0x8ffce0 = true;
            }
            if ('requestFile' in _0x40247b) {
              log("requestFile in reverse");
              try {
                _0x16efc0.sendFile(_0x19a7d9, _0x40247b.requestFile);
              } catch (_0x50c742) {
                errorlog(_0x50c742);
              }
            }
            if ("remoteStats" in _0x40247b) {
              remoteStats(_0x40247b, _0x19a7d9);
            }
            if (_0x467a72) {
              setTimeout(function () {
                updateMixer();
                updateUserList();
              }, 0x1);
            } else if (_0x8ffce0) {
              updateUserList();
            }
          };
          _0x16efc0.rpcs[_0x259cf5].receiveChannel.onclose = () => {
            warnlog("rpc datachannel closed");
          };
        };
        _0x16efc0.rpcs[_0x259cf5].ontrack = _0x16cb27 => {
          warnlog("New ON TRACK event");
          _0x16efc0.onTrack(_0x16cb27, _0x259cf5);
        };
        log("setup peer complete");
      };
      _0x16efc0.setupScreenShareAddon = function (_0x3b40c7, _0x13a2ea) {
        log("session.setupScreenShareAddon");
        if (!_0x16efc0.rpcs[_0x13a2ea].screenElement) {
          _0x16efc0.rpcs[_0x13a2ea].screenElement = createVideoElement();
          _0x16efc0.rpcs[_0x13a2ea + '_screen'] = {};
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].realUUID = _0x13a2ea;
          if (_0x16efc0.rpcs[_0x13a2ea].streamID) {
            _0x16efc0.rpcs[_0x13a2ea + "_screen"].streamID = _0x16efc0.rpcs[_0x13a2ea].streamID + ':s';
          }
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].stats = {};
          _0x16efc0.rpcs[_0x13a2ea].stats.Audio_Loudness = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].getStats = function () {
            return new Promise((_0x4d452b, _0x5b92a2) => {
              _0x4d452b([]);
            });
          };
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].allowGraphs = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].allowMIDI = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].activelySpeaking = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].loudest = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].canvasIntervalAction = null;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].codirectorRequested = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].buffer = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].bandwidth = -0x1;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].bandwidthMuted = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].showDirector = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].channelOffset = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].channelWidth = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].targetBandwidth = -0x1;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].manualBandwidth = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].videoElement = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].imageElement = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].voiceMeter = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].group = _0x16efc0.rpcs[_0x13a2ea].group || [];
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].videoMuted = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].iframeVideo = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].directorVideoMuted = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].virtualHangup = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].remoteMuteState = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].remoteMuteElement = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].lockedVideoBitrate = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].lockedAudioBitrate = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].closeTimeout = null;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].mutedState = null;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].mutedStateMixer = null;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].mutedStateScene = null;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].mirrorState = null;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].scaleHeight = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].scaleWidth = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].scaleSnap = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].slot = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].signalMeter = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].volumeControl = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].streamSrc = null;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].screenIndexes = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].screenShareState = true;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].directorVolumeState = 0x64;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].directorMutedState = 0x0;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].nackCount = 0x0;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].opacityDisconnect = '1';
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].opacityMuted = '1';
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].obsControl = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].pliCount = 0x0;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].label = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].order = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].canvasCtx = null;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].canvas = null;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].inboundAudioPipeline = {};
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].iframeSrc = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].iframeEle = false;
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].startTime = Date.now();
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].settings = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].savedVolume = false;
          if (_0x16efc0.activeSpeaker == 0x2 || _0x16efc0.activeSpeaker == 0x4) {
            _0x16efc0.rpcs[_0x13a2ea + '_screen'].loudest = true;
          }
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].videoElement = _0x16efc0.rpcs[_0x13a2ea].screenElement;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].videoElement.dataset.UUID = _0x13a2ea + '_screen';
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].videoElement.id = 'videosource_' + _0x13a2ea + '_screen';
          if (_0x16efc0.rpcs[_0x13a2ea + "_screen"].streamID) {
            _0x16efc0.rpcs[_0x13a2ea + "_screen"].videoElement.dataset.sid = _0x16efc0.rpcs[_0x13a2ea + "_screen"].streamID;
          }
          _0x16efc0.rpcs[_0x13a2ea + '_screen'].videoElement.screenshare = false;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].voiceMeter = false;
          setupIncomingScreenTracking(_0x16efc0.rpcs[_0x13a2ea + "_screen"].videoElement, _0x13a2ea + '_screen');
          _0x16efc0.rpcs[_0x13a2ea].screenElement.srcObject = createMediaStream();
          _0x3b40c7.forEach(function (_0x455404) {
            _0x16efc0.rpcs[_0x13a2ea].screenElement.srcObject.addTrack(_0x455404);
          });
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].videoElement.autoplay = true;
          _0x16efc0.rpcs[_0x13a2ea + "_screen"].videoElement.setAttribute("playsinline", '');
          mediaSourceUpdated(_0x13a2ea + "_screen", _0x16efc0.rpcs[_0x13a2ea + "_screen"].streamID);
        } else {
          _0x3b40c7.forEach(function (_0x5894d1) {
            var _0x5ec837 = false;
            _0x16efc0.rpcs[_0x13a2ea].screenElement.srcObject.getTracks().forEach(function (_0x5d8f7a) {
              if (_0x5d8f7a.id == _0x5894d1.id && _0x5d8f7a.kind == _0x5894d1.kind) {
                _0x5ec837 = true;
              }
            });
            if (!_0x5ec837) {
              _0x16efc0.rpcs[_0x13a2ea].screenElement.srcObject.addTrack(_0x5894d1);
            }
          });
        }
      };
      return _0x16efc0;
    }()
  };
  function getMeshcastCanvasTrack() {
    if (!session.mc) {
      errorlog("Meshcast not connected; cant' create canvas for it");
    }
    if (!session.mc.canvas) {
      session.mc.canvas = document.createElement("canvas");
      session.mc.canvas.width = 0x140;
      session.mc.canvas.height = 0xb4;
    }
    if (!session.mc.ctx) {
      session.mc.ctx = session.mc.canvas.getContext('2d', {
        'alpha': false
      });
      session.mc.ctx.fillStyle = "#000";
      session.mc.ctx.fillRect(0x0, 0x0, session.mc.canvas.width, session.mc.canvas.height);
    }
    if (!session.mc.canvasStream) {
      (function _0x3e9830() {
        session.mc.ctx.fillRect(0x0, 0x0, session.mc.canvas.width, session.mc.canvas.height);
        setTimeout(_0x3e9830, 0xfa);
      })();
      session.mc.canvasStream = session.mc.canvas.captureStream(0x4);
    }
    var _0x5985f7 = session.mc.canvasStream.getVideoTracks();
    if (_0x5985f7.length) {
      return _0x5985f7[0x0];
    }
    errorlog("Meschast canvas not working");
    return false;
  }
  var meshcastServer = false;
  function selectMeshcast(_0x5d07e8) {
    meshcastServer = {};
    var _0x5e34c4 = _0x5d07e8.selectedIndex;
    var _0x2f4369 = _0x5d07e8.options;
    meshcastServer.url = _0x2f4369[_0x5e34c4].url;
    meshcastServer.code = _0x2f4369[_0x5e34c4].code;
  }
  async function meshcast(_0x49ea3a = false) {
    async function _0x25af59(_0x3749c3, _0x3b1436) {
      const _0x4263cf = new XMLHttpRequest();
      _0x4263cf.onload = function () {
        if (parseFloat(this.responseText) >= 0x0) {
          if (parseFloat(this.responseText) > 0x32) {
            _0x3749c3.innerHTML += " (full)";
          } else {
            if (parseFloat(this.responseText) > 0x19) {
              _0x3749c3.innerHTML += " (fair)";
            } else {
              if (parseFloat(this.responseText) > 0xa) {
                _0x3749c3.innerHTML += " (ok)";
              } else {
                if (parseFloat(this.responseText) > 0x0) {
                  _0x3749c3.innerHTML += " (good)";
                } else {
                  var _0x5dd6e7 = false;
                  if (_0x3749c3.selected) {
                    _0x5dd6e7 = true;
                  }
                  _0x3749c3.disabled = true;
                  _0x3749c3.innerHTML += " (fail)";
                  document.getElementById("edgelist").appendChild(_0x3749c3);
                  if (_0x5dd6e7) {
                    document.getElementById("edgelist").options[0x0].selected = true;
                  }
                }
              }
            }
          }
        } else {
          var _0x5dd6e7 = false;
          if (_0x3749c3.selected) {
            _0x5dd6e7 = true;
          }
          document.getElementById("edgelist").appendChild(_0x3749c3);
          _0x3749c3.innerHTML += " (fail)";
          _0x3749c3.disabled = true;
          if (_0x5dd6e7) {
            document.getElementById("edgelist").options[0x0].selected = true;
          }
        }
        if (session.director && !session.cleanOutput && !session.cleanDirector) {
          document.getElementById("meshcastMenu").classList.remove("hidden");
        }
      };
      _0x4263cf.onerror = function () {
        var _0x372594 = false;
        if (_0x3749c3.selected) {
          _0x372594 = true;
        }
        document.getElementById('edgelist').appendChild(_0x3749c3);
        _0x3749c3.innerHTML += " (fail)";
        _0x3749c3.disabled = true;
        if (_0x372594) {
          document.getElementById("edgelist").options[0x0].selected = true;
        }
      };
      _0x4263cf.open("GET", _0x3b1436, true);
      _0x4263cf.timeout = 0x3e8;
      _0x4263cf.ontimeout = function (_0x2ba4ce) {
        var _0x115467 = false;
        if (_0x3749c3.selected) {
          _0x115467 = true;
        }
        document.getElementById("edgelist").appendChild(_0x3749c3);
        _0x3749c3.innerHTML += " (timeout)";
        if (_0x115467) {
          document.getElementById("edgelist").options[0x0].selected = true;
        }
      };
      _0x4263cf.send();
    }
    async function _0x572b0b(_0x5098c5 = false) {
      var _0x22216a = new Date();
      var _0x19ee7d = _0x22216a.getTimezoneOffset();
      if (urlParams.has('tz')) {
        _0x19ee7d = parseInt(urlParams.get('tz')) || _0x19ee7d;
      }
      fetch("https://meshcast.io/servers.json?ts=" + Date.now()).then(_0x41fd4a => _0x41fd4a.json()).then(async _0x25e991 => {
        for (var _0x3db430 = 0x0; _0x3db430 < _0x25e991.length; _0x3db430++) {
          var _0x55d41d = Math.abs(_0x25e991[_0x3db430].tz - _0x19ee7d);
          if (Math.abs(_0x55d41d - 1440) < _0x55d41d) {
            _0x55d41d = Math.abs(_0x55d41d - 1440);
          }
          _0x25e991[_0x3db430].delta = _0x55d41d;
          if (session.meshcastCode && session.meshcastCode !== _0x25e991[_0x3db430].code) {
            _0x25e991[_0x3db430].delta += 0x3e8;
          } else if (!session.meshcastCode && session.meshcast !== _0x25e991[_0x3db430].code) {
            _0x25e991[_0x3db430].delta += 0x3e8;
          }
        }
        _0x25e991.sort(compare_deltas);
        console.log(_0x25e991);
        for (var _0x3db430 = 0x0; _0x3db430 < _0x25e991.length; _0x3db430++) {
          var _0x591fc4 = document.createElement("option");
          _0x591fc4.code = _0x25e991[_0x3db430].code;
          _0x591fc4.url = _0x25e991[_0x3db430].url;
          _0x591fc4.innerHTML = _0x25e991[_0x3db430].label;
          _0x25af59(_0x591fc4, _0x25e991[_0x3db430].url + '/status');
          document.getElementById("edgelist").appendChild(_0x591fc4);
        }
        meshcastServer = _0x25e991[0x0];
        if (_0x5098c5) {
          _0x5098c5();
        }
      });
    }
    if (!session.meshcast) {
      return;
    }
    if (_0x49ea3a) {
      _0x572b0b();
      return;
    }
    if (session.meshcastSettings !== false) {
      return;
    } else {
      if (session.autostart) {} else {
        if (!session.videoElement.srcObject || !session.videoElement.srcObject.getTracks().length) {
          return;
        }
      }
    }
    session.meshcastSettings = null;
    warnlog("MESHCAST();");
    var _0x7d7a00 = '';
    if (session.screenShareState && session.meshcastScreenShareCodec) {
      _0x7d7a00 = session.meshcastScreenShareCodec;
    } else {
      if (session.meshcastCodec) {
        _0x7d7a00 = session.meshcastCodec;
      } else if (iOS || iPad) {
        _0x7d7a00 = '42e01f';
      }
    }
    function _0x2ea7f4(_0x189991) {
      warnlog("ON NEGO NEEDED");
      warnlog(_0x189991);
      try {
        session.mc.createOffer().then(function (_0x652b3) {
          _0x652b3.sdp = CodecsHandler.setOpusAttributes(_0x652b3.sdp, {
            'stereo': 0x1
          });
          if (!_0x7d7a00) {
            _0x652b3.sdp = _0x652b3.sdp.replace(/42001f/gi, "42e01f");
            _0x652b3.sdp = _0x652b3.sdp.replace(/420029/gi, '42e01f');
          }
          warnlog(_0x652b3);
          return session.mc.setLocalDescription(_0x652b3);
        }).then(function () {
          log(session.mc.localDescription);
          var _0x2f1e9f = session.mc.localDescription.sdp;
          if (iOS || iPad) {
            if (session.removeOrientationFlag && _0x2f1e9f.includes("a=extmap:3 urn:3gpp:video-orientation\r\n")) {
              _0x2f1e9f = _0x2f1e9f.replace("a=extmap:3 urn:3gpp:video-orientation\r\n", '');
            }
          }
          _0x3bbdcd(_0x2f1e9f, "sdp");
        })["catch"](function (_0x1d913e) {});
      } catch (_0x16f497) {
        errorlog(_0x16f497);
      }
    }
    try {
      var _0x3a0d79 = [];
      var _0x55444d = session.generateStreamID(0xe);
      async function _0x4aba6e() {
        document.getElementById('edgelist').disabled = true;
        document.getElementById('edgelist').title = "Can't change the location once started streaming";
        if (!session.configuration) {
          await chooseBestTURN();
        }
        try {
          session.mc = new RTCPeerConnection(session.configuration);
          session.mc.stats = {};
          session.mc.maxBandwidth = null;
          session.mc.scale = false;
        } catch (_0x5e89c2) {
          if (!session.cleanOutput) {
            warnUser("An RTC error occured");
          }
        }
        try {
          if (session.meshcast !== "video") {
            var _0x3cc5bf = false;
            if (session.videoElement && session.videoElement.srcObject) {
              _0x3cc5bf = session.videoElement.srcObject.getAudioTracks();
            }
            if (!_0x3cc5bf || !_0x3cc5bf.length) {
              var _0x4f8ff8 = new AudioContext();
              var _0x192b61 = _0x4f8ff8.createMediaStreamDestination();
              _0x192b61.stream.getAudioTracks().forEach(_0x2ec18c => {
                _0x3cc5bf = _0x2ec18c;
              });
            } else {
              _0x3cc5bf = _0x3cc5bf[0x0];
            }
            if (session.audioContentHint && _0x3cc5bf.kind === "audio") {
              try {
                _0x3cc5bf.contentHint = session.audioContentHint;
              } catch (_0x3a58b4) {
                errorlog(_0x3a58b4);
              }
            }
            session.mc.addTrack(_0x3cc5bf);
          }
          if (session.meshcast !== "audio") {
            var _0x3cc5bf = false;
            if (session.videoElement && session.videoElement.srcObject) {
              _0x3cc5bf = session.videoElement.srcObject.getVideoTracks();
            }
            if (!_0x3cc5bf || !_0x3cc5bf.length) {
              _0x3cc5bf = getMeshcastCanvasTrack();
            } else {
              _0x3cc5bf = _0x3cc5bf[0x0];
            }
            if (session.screenShareState && session.screenshareContentHint && _0x3cc5bf.kind === "video") {
              try {
                _0x3cc5bf.contentHint = session.screenshareContentHint;
              } catch (_0x5485fb) {
                errorlog(_0x5485fb);
              }
            } else {
              if (session.contentHint && _0x3cc5bf.kind === 'video') {
                try {
                  _0x3cc5bf.contentHint = session.contentHint;
                } catch (_0x3cc300) {
                  errorlog(_0x3cc300);
                }
              }
            }
            session.mc.addTrack(_0x3cc5bf);
          }
          session.mc.onnegotiationneeded = _0x2ea7f4;
          session.mc.onicecandidate = function (_0x49fae3) {
            if (_0x49fae3.candidate == null) {
              return;
            }
            log(_0x49fae3.candidate);
            _0x3a0d79.push(_0x49fae3.candidate);
          };
        } catch (_0xce3fad) {
          errorlog(_0xce3fad);
        }
      }
      if (!meshcastServer) {
        _0x572b0b(_0x4aba6e);
      } else {
        _0x4aba6e();
      }
    } catch (_0x47367c) {
      errorlog(_0x47367c);
    }
    function _0x3bbdcd(_0x1c476b, _0x2e2373, _0x42d9df = false) {
      try {
        var _0x17e0bf = new XMLHttpRequest();
        _0x17e0bf.onreadystatechange = function () {
          if (this.readyState == 0x4 && this.status == 0xc8) {
            var _0x536539 = this.getResponseHeader("content-type");
            if (_0x536539 == "application/sdp") {
              var _0x3a1414 = {
                "sdp": this.responseText,
                "type": "answer"
              };
              var _0x5af404 = {};
              if (session.stereo && session.stereo !== 0x2) {
                _0x5af404.stereo = 0x1;
              } else {
                _0x5af404.stereo = 0x0;
              }
              var _0x48a2f5 = 0x40;
              if (session.meshcastAudioBitrate) {
                if (session.meshcastAudioBitrate > 0x1fe) {
                  session.meshcastAudioBitrate = 0x1fe;
                }
                _0x5af404.maxaveragebitrate = session.meshcastAudioBitrate * 0x400;
                _0x5af404.useinbandfec = session.noFEC ? 0x0 : 0x1;
                _0x5af404.dtx = session.dtx;
                _0x5af404.cbr = session.cbr;
                _0x48a2f5 = session.meshcastAudioBitrate;
              }
              _0x3a1414.sdp = CodecsHandler.setOpusAttributes(_0x3a1414.sdp, _0x5af404);
              if (!_0x7d7a00) {
                _0x3a1414.sdp = _0x3a1414.sdp.replace(/42001f/gi, '42e01f');
                _0x3a1414.sdp = _0x3a1414.sdp.replace(/420029/gi, '42e01f');
              } else if (_0x7d7a00.length == 0x6) {
                _0x3a1414.sdp = _0x3a1414.sdp.replace(/42e01f/gi, _0x7d7a00);
                _0x3a1414.sdp = _0x3a1414.sdp.replace(/42001f/gi, _0x7d7a00);
                _0x3a1414.sdp = _0x3a1414.sdp.replace(/420029/gi, _0x7d7a00);
                _0x3a1414.sdp = _0x3a1414.sdp.replace(/42a01e/gi, _0x7d7a00);
                _0x3a1414.sdp = _0x3a1414.sdp.replace(/42a014/gi, _0x7d7a00);
                _0x3a1414.sdp = _0x3a1414.sdp.replace(/42a00b/gi, _0x7d7a00);
                _0x3a1414.sdp = _0x3a1414.sdp.replace(/640c1f/gi, _0x7d7a00);
              }
              if (session.meshcastBitrate) {
                try {
                  var _0x128872 = _0x48a2f5 + session.meshcastBitrate;
                  _0x3a1414.sdp = CodecsHandler.setVideoBitrates(_0x3a1414.sdp, {
                    'min': parseInt(_0x128872 / 0xa) || 0x1,
                    'max': _0x128872 || 0x1
                  }, _0x7d7a00);
                } catch (_0x27364e) {}
              }
              session.mc.setRemoteDescription(_0x3a1414).then(function () {
                if (_0x3a0d79.length) {
                  var _0x2a58dd = JSON.stringify(_0x3a0d79.pop());
                  _0x3bbdcd(_0x2a58dd, "ice", function () {
                    session.mcSetScale();
                    _0x3b26df();
                  });
                }
              })["catch"](function (_0x1110d8) {
                log(_0x1110d8);
              });
            } else {
              if (_0x536539 == 'application/error') {
                if (this.responseText == 0x1b0) {
                  warnUser("Meshcast error: 432");
                } else {
                  warnUser("Unknown Meshcast error");
                }
              } else if (_0x42d9df) {
                _0x42d9df();
              }
            }
          }
        };
        var _0x287b7e = 0x9c4;
        if (session.meshcastBitrate !== false) {
          _0x287b7e = session.meshcastBitrate;
        }
        if (session.screenShareState && session.meshcastScreenShareBitrate !== false) {
          _0x287b7e = session.meshcastScreenShareBitrate;
        }
        session.mc.savedBitrate = _0x287b7e;
        session.mc.setBitrate = _0x287b7e;
        var _0x1902f7 = parseInt(0x61a8 / _0x287b7e) || 0xa;
        _0x17e0bf.open('POST', meshcastServer.url + '/' + _0x1902f7 + '/' + _0x7d7a00, true);
        _0x17e0bf.setRequestHeader("Content-Type", "application/" + _0x2e2373 + "; charset=utf-8");
        _0x17e0bf.setRequestHeader("Authorization", "Bearer " + _0x55444d);
        _0x17e0bf.onerror = function (_0x117a92) {
          errorlog(_0x117a92);
          warnUser("Meshcast not available.");
          if (window.location.host !== "vdo.ninja") {
            console.warn("If self-hosting VDO.Ninja, please contact steve@seguin.email to request having access to Meshcast.");
          } else {
            console.warn("Please contact steve@seguin.email or join https://discord.vdo.ninja if Meshcast is not working.");
          }
        };
        _0x17e0bf.send(_0x1c476b);
      } catch (_0x54d19b) {
        errorlog(_0x54d19b);
      }
    }
    async function _0x3b26df() {
      if (meshcastServer.code) {
        var _0x1f5793 = "https://meshcast.io/view.html?api=" + meshcastServer.code + "&id=" + _0x55444d;
      } else {
        var _0x1f5793 = "https://meshcast.io/view.html?id=" + _0x55444d;
      }
      console.log("MESHCAST LINK: " + _0x1f5793);
      if (!session.mc.stats) {
        session.mc.stats = {};
      }
      session.mc.stats.publishing_region = meshcastServer.code;
      session.mc.stats.watch_URL = _0x1f5793;
      await sleep(0x1f4);
      session.meshcastSettings = {
        'token': _0x55444d,
        'url': meshcastServer.url
      };
      for (var _0x57e2ed in session.pcs) {
        if (session.pcs[_0x57e2ed].meshcast === null) {
          var _0x2610c1 = {
            "meshcast": {
              'token': _0x55444d,
              'url': meshcastServer.url
            }
          };
          if (session.sendMessage(_0x2610c1, _0x57e2ed)) {
            session.pcs[_0x57e2ed].meshcast = true;
          }
        }
      }
    }
  }
  async function meshcastWatch(_0x4f6a1a, _0x597a3b) {
    if (!(_0x4f6a1a in session.rpcs)) {
      session.rpcs[_0x4f6a1a] = {};
      session.rpcs[_0x4f6a1a].stats = {};
      session.rpcs[_0x4f6a1a].allowGraphs = false;
      session.rpcs[_0x4f6a1a].inboundAudioPipeline = {};
      session.rpcs[_0x4f6a1a].channelOffset = false;
      session.rpcs[_0x4f6a1a].channelWidth = false;
      session.rpcs[_0x4f6a1a].settings = false;
      session.rpcs[_0x4f6a1a].mirrorState = null;
      session.rpcs[_0x4f6a1a].lockedVideoBitrate = false;
      session.rpcs[_0x4f6a1a].lockedAudioBitrate = false;
      session.rpcs[_0x4f6a1a].manualBandwidth = false;
      errorlog("RPCS for MESHCAST ISNT MADE YET??");
    }
    var _0x3d1d08 = true;
    var _0x2e428e = true;
    if (session.novideo !== false && !session.novideo.includes(session.rpcs[_0x4f6a1a].streamID)) {
      _0x3d1d08 = false;
    } else if (session.rpcs[_0x4f6a1a].settings && !session.rpcs[_0x4f6a1a].settings.video) {
      _0x3d1d08 = false;
    }
    if (session.noaudio !== false && !session.noaudio.includes(session.rpcs[_0x4f6a1a].streamID)) {
      _0x2e428e = false;
    } else if (session.rpcs[_0x4f6a1a].settings && !session.rpcs[_0x4f6a1a].settings.audio) {
      _0x2e428e = false;
    }
    if (!_0x2e428e && !_0x3d1d08) {
      errorlog("We will not request the meshcast as no audio or video is requested");
      return;
    }
    disableQualityDirector(_0x4f6a1a);
    if (!session.configuration) {
      await chooseBestTURN();
    }
    try {
      session.rpcs[_0x4f6a1a].mc = new RTCPeerConnection(session.configuration);
    } catch (_0x37a782) {
      if (!session.cleanOutput) {
        warnUser("An RTC error occured");
      }
    }
    session.rpcs[_0x4f6a1a].mc.ontrack = function (_0x53e273) {
      session.onTrack(_0x53e273, _0x4f6a1a);
    };
    var _0x132310 = session.generateStreamID(0xe);
    var _0x1f31f4 = {
      "streamID": _0x597a3b.token,
      "UUID": _0x132310
    };
    function _0x5c8ced(_0x360c24) {
      var _0x48864f = new XMLHttpRequest();
      _0x48864f.onreadystatechange = function () {
        if (this.readyState == 0x4 && this.status == 0xc8) {
          var _0x23e19b = this.getResponseHeader("content-type");
          if (_0x23e19b == 'application/sdp') {
            var _0x11475d = {
              "sdp": this.responseText,
              "type": "offer"
            };
            session.rpcs[_0x4f6a1a].mc.setRemoteDescription(_0x11475d).then(function () {
              _0x3b3690();
            })["catch"](function (_0x13c8b6) {
              log(_0x13c8b6);
            });
          }
        } else {
          log(this);
        }
      };
      _0x48864f.open('POST', _0x597a3b.url, true);
      _0x48864f.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      _0x48864f.setRequestHeader("Authorization", "Bearer " + _0x597a3b.token);
      _0x48864f.send(JSON.stringify(_0x360c24));
    }
    function _0x3b3690() {
      session.rpcs[_0x4f6a1a].mc.createAnswer().then(function (_0x7c3bf4) {
        _0x7c3bf4.sdp = CodecsHandler.setOpusAttributes(_0x7c3bf4.sdp, {
          'stereo': 0x1
        });
        return session.rpcs[_0x4f6a1a].mc.setLocalDescription(_0x7c3bf4);
      }).then(function () {
        var _0x25003c = {
          "UUID": _0x132310,
          "answer": session.rpcs[_0x4f6a1a].mc.localDescription.sdp
        };
        _0x5c8ced(_0x25003c);
      })["catch"](function (_0x21c506) {});
    }
    _0x5c8ced(_0x1f31f4);
  }
  (function () {
    'use strict';
  
    let _0x3413a3 = function (_0x2132bb) {
      this.data = new Uint8Array(_0x2132bb);
      this.pos = 0x0;
    };
    _0x3413a3.prototype.seek = function (_0x276d41) {
      this.pos = _0x276d41;
    };
    _0x3413a3.prototype.writeBytes = function (_0x16e1f1) {
      for (let _0x1fcdc9 = 0x0; _0x1fcdc9 < _0x16e1f1.length; _0x1fcdc9++) {
        this.data[this.pos++] = _0x16e1f1[_0x1fcdc9];
      }
    };
    _0x3413a3.prototype.writeByte = function (_0x4f2905) {
      this.data[this.pos++] = _0x4f2905;
    };
    _0x3413a3.prototype.writeU8 = _0x3413a3.prototype.writeByte;
    _0x3413a3.prototype.writeU16BE = function (_0x305879) {
      this.data[this.pos++] = _0x305879 >> 0x8;
      this.data[this.pos++] = _0x305879;
    };
    _0x3413a3.prototype.writeDoubleBE = function (_0x4d9382) {
      let _0x44a5cf = new Uint8Array(new Float64Array([_0x4d9382]).buffer);
      for (let _0x2f6e8e = _0x44a5cf.length - 0x1; _0x2f6e8e >= 0x0; _0x2f6e8e--) {
        this.writeByte(_0x44a5cf[_0x2f6e8e]);
      }
    };
    _0x3413a3.prototype.writeFloatBE = function (_0x10cc46) {
      let _0xc7e558 = new Uint8Array(new Float32Array([_0x10cc46]).buffer);
      for (let _0x58d174 = _0xc7e558.length - 0x1; _0x58d174 >= 0x0; _0x58d174--) {
        this.writeByte(_0xc7e558[_0x58d174]);
      }
    };
    _0x3413a3.prototype.writeString = function (_0xc66238) {
      for (let _0x524176 = 0x0; _0x524176 < _0xc66238.length; _0x524176++) {
        this.data[this.pos++] = _0xc66238.charCodeAt(_0x524176);
      }
    };
    _0x3413a3.prototype.writeEBMLVarIntWidth = function (_0x2046eb, _0x4b23c2) {
      switch (_0x4b23c2) {
        case 0x1:
          this.writeU8(128 | _0x2046eb);
          break;
        case 0x2:
          this.writeU8(64 | _0x2046eb >> 0x8);
          this.writeU8(_0x2046eb);
          break;
        case 0x3:
          this.writeU8(32 | _0x2046eb >> 0x10);
          this.writeU8(_0x2046eb >> 0x8);
          this.writeU8(_0x2046eb);
          break;
        case 0x4:
          this.writeU8(16 | _0x2046eb >> 0x18);
          this.writeU8(_0x2046eb >> 0x10);
          this.writeU8(_0x2046eb >> 0x8);
          this.writeU8(_0x2046eb);
          break;
        case 0x5:
          this.writeU8(8 | _0x2046eb / 0x100000000 & 0x7);
          this.writeU8(_0x2046eb >> 0x18);
          this.writeU8(_0x2046eb >> 0x10);
          this.writeU8(_0x2046eb >> 0x8);
          this.writeU8(_0x2046eb);
          break;
        default:
          throw new Error("Bad EBML VINT size " + _0x4b23c2);
      }
    };
    _0x3413a3.prototype.measureEBMLVarInt = function (_0x538e59) {
      if (_0x538e59 < 127) {
        return 0x1;
      } else {
        if (_0x538e59 < 16383) {
          return 0x2;
        } else {
          if (_0x538e59 < 2097151) {
            return 0x3;
          } else {
            if (_0x538e59 < 268435455) {
              return 0x4;
            } else {
              if (_0x538e59 < 0x7ffffffff) {
                return 0x5;
              } else {
                throw new Error("EBML VINT size not supported " + _0x538e59);
              }
            }
          }
        }
      }
    };
    _0x3413a3.prototype.writeEBMLVarInt = function (_0x305521) {
      this.writeEBMLVarIntWidth(_0x305521, this.measureEBMLVarInt(_0x305521));
    };
    _0x3413a3.prototype.writeUnsignedIntBE = function (_0x3265b3, _0x2e5b67) {
      if (_0x2e5b67 === undefined) {
        _0x2e5b67 = this.measureUnsignedInt(_0x3265b3);
      }
      switch (_0x2e5b67) {
        case 0x5:
          this.writeU8(Math.floor(_0x3265b3 / 0x100000000));
        case 0x4:
          this.writeU8(_0x3265b3 >> 0x18);
        case 0x3:
          this.writeU8(_0x3265b3 >> 0x10);
        case 0x2:
          this.writeU8(_0x3265b3 >> 0x8);
        case 0x1:
          this.writeU8(_0x3265b3);
          break;
        default:
          throw new Error("Bad UINT size " + _0x2e5b67);
      }
    };
    _0x3413a3.prototype.measureUnsignedInt = function (_0x4ba1b5) {
      if (_0x4ba1b5 < 256) {
        return 0x1;
      } else {
        if (_0x4ba1b5 < 65536) {
          return 0x2;
        } else {
          if (_0x4ba1b5 < 16777216) {
            return 0x3;
          } else {
            return _0x4ba1b5 < 0x100000000 ? 0x4 : 0x5;
          }
        }
      }
    };
    _0x3413a3.prototype.getAsDataArray = function () {
      if (this.pos < this.data.byteLength) {
        return this.data.subarray(0x0, this.pos);
      } else {
        if (this.pos == this.data.byteLength) {
          return this.data;
        } else {
          throw new Error("ArrayBufferDataStream's pos lies beyond end of buffer");
        }
      }
    };
    window.ArrayBufferDataStream = _0x3413a3;
  })();
  (function () {
    'use strict';
  
    let _0x2424f4 = function (_0x3c2e3d) {
      return function (_0x47b584) {
        let _0x2fad45 = [];
        let _0x1e46fd = Promise.resolve();
        let _0x1dae7c = null;
        let _0x111baa = null;
        if (_0x47b584 && _0x47b584.constructor.name === "FileSystemWritableFileStream") {
          _0x1dae7c = _0x47b584;
        } else if (_0x3c2e3d && _0x47b584) {
          _0x111baa = _0x47b584;
        }
        this.pos = 0x0;
        this.length = 0x0;
        function _0x16d08f(_0x59cbb9) {
          return new Promise(function (_0x17704d, _0x56d07b) {
            let _0x5b8b29 = new FileReader();
            _0x5b8b29.addEventListener('loadend', function () {
              _0x17704d(_0x5b8b29.result);
            });
            _0x5b8b29.readAsArrayBuffer(_0x59cbb9);
          });
        }
        function _0x56638e(_0x195f65) {
          return new Promise(function (_0xc2541b, _0x3bba16) {
            if (_0x195f65 instanceof Uint8Array) {
              _0xc2541b(_0x195f65);
            } else {
              if (_0x195f65 instanceof ArrayBuffer || ArrayBuffer.isView(_0x195f65)) {
                _0xc2541b(new Uint8Array(_0x195f65));
              } else if (_0x195f65 instanceof Blob) {
                _0xc2541b(_0x16d08f(_0x195f65).then(function (_0x502235) {
                  return new Uint8Array(_0x502235);
                }));
              } else {
                _0xc2541b(_0x16d08f(new Blob([_0x195f65])).then(function (_0x360073) {
                  return new Uint8Array(_0x360073);
                }));
              }
            }
          });
        }
        function _0x5a78e6(_0x2fbf5d) {
          let _0x3643a5 = _0x2fbf5d.byteLength || _0x2fbf5d.length || _0x2fbf5d.size;
          if (!Number.isInteger(_0x3643a5)) {
            throw new Error("Failed to determine size of element");
          }
          return _0x3643a5;
        }
        this.seek = function (_0x3c9975) {
          if (_0x3c9975 < 0x0) {
            throw new Error("Offset may not be negative");
          }
          if (isNaN(_0x3c9975)) {
            throw new Error("Offset may not be NaN");
          }
          if (_0x3c9975 > this.length) {
            throw new Error("Seeking beyond the end of file is not allowed");
          }
          this.pos = _0x3c9975;
        };
        this.write = function (_0x2ec8a7) {
          let _0x2df1bc = {
            'offset': this.pos,
            'data': _0x2ec8a7,
            'length': _0x5a78e6(_0x2ec8a7)
          };
          let _0x38befe = _0x2df1bc.offset >= this.length;
          this.pos += _0x2df1bc.length;
          this.length = Math.max(this.length, this.pos);
          _0x1e46fd = _0x1e46fd.then(async function () {
            if (_0x111baa) {
              return new Promise(function (_0x42b5be, _0x4185d3) {
                _0x56638e(_0x2df1bc.data).then(function (_0x55b6fc) {
                  let _0x4b760c = 0x0;
                  let _0x50fd5e = Buffer.from(_0x55b6fc.buffer);
                  let _0x31f5dd = function (_0x34720e, _0x705c1e, _0x467e38) {
                    _0x4b760c += _0x705c1e;
                    if (_0x4b760c >= _0x467e38.length) {
                      _0x42b5be();
                    } else {
                      _0x3c2e3d.write(_0x111baa, _0x467e38, _0x4b760c, _0x467e38.length - _0x4b760c, _0x2df1bc.offset + _0x4b760c, _0x31f5dd);
                    }
                  };
                  _0x3c2e3d.write(_0x111baa, _0x50fd5e, 0x0, _0x50fd5e.length, _0x2df1bc.offset, _0x31f5dd);
                });
              });
            } else {
              if (_0x1dae7c) {
                return new Promise(function (_0x5865f5, _0x35fb3a) {
                  _0x1dae7c.seek(_0x2df1bc.offset).then(() => {
                    _0x1dae7c.write(new Blob([_0x2df1bc.data]));
                  }).then(() => {
                    _0x5865f5();
                  });
                });
              } else {
                if (!_0x38befe) {
                  for (let _0x55b11a = 0x0; _0x55b11a < _0x2fad45.length; _0x55b11a++) {
                    let _0x47aac5 = _0x2fad45[_0x55b11a];
                    if (!(_0x2df1bc.offset + _0x2df1bc.length <= _0x47aac5.offset || _0x2df1bc.offset >= _0x47aac5.offset + _0x47aac5.length)) {
                      if (_0x2df1bc.offset < _0x47aac5.offset || _0x2df1bc.offset + _0x2df1bc.length > _0x47aac5.offset + _0x47aac5.length) {
                        throw new Error("Overwrite crosses blob boundaries");
                      }
                      if (_0x2df1bc.offset == _0x47aac5.offset && _0x2df1bc.length == _0x47aac5.length) {
                        _0x47aac5.data = _0x2df1bc.data;
                        return;
                      } else {
                        return _0x56638e(_0x47aac5.data).then(function (_0x288dcd) {
                          _0x47aac5.data = _0x288dcd;
                          return _0x56638e(_0x2df1bc.data);
                        }).then(function (_0x4dd4ae) {
                          _0x2df1bc.data = _0x4dd4ae;
                          _0x47aac5.data.set(_0x2df1bc.data, _0x2df1bc.offset - _0x47aac5.offset);
                        });
                      }
                    }
                  }
                }
              }
            }
            _0x2fad45.push(_0x2df1bc);
          });
        };
        this.complete = function (_0x3c5fac) {
          if (_0x111baa || _0x1dae7c) {
            _0x1e46fd = _0x1e46fd.then(function () {
              return null;
            });
          } else {
            _0x1e46fd = _0x1e46fd.then(function () {
              let _0x2936de = [];
              for (let _0x16b304 = 0x0; _0x16b304 < _0x2fad45.length; _0x16b304++) {
                _0x2936de.push(_0x2fad45[_0x16b304].data);
              }
              return new Blob(_0x2936de, {
                'type': _0x3c5fac
              });
            });
          }
          return _0x1e46fd;
        };
      };
    };
    window.BlobBuffer = _0x2424f4(null);
  })();
  (function () {
    'use strict';
  
    function _0x26a84c(_0x156c44) {
      this.value = _0x156c44;
    }
    function _0x270039(_0xbed01, _0x55e75e) {
      let _0x8ce5ad = {};
      [_0xbed01, _0x55e75e].forEach(function (_0x3393ac) {
        for (let _0x21122c in _0x3393ac) {
          if (Object.prototype.hasOwnProperty.call(_0x3393ac, _0x21122c)) {
            _0x8ce5ad[_0x21122c] = _0x3393ac[_0x21122c];
          }
        }
      });
      return _0x8ce5ad;
    }
    function _0x16bc20(_0x5732d5, _0x1631af, _0x3e5796) {
      if (Array.isArray(_0x3e5796)) {
        for (let _0x3d179c = 0x0; _0x3d179c < _0x3e5796.length; _0x3d179c++) {
          _0x16bc20(_0x5732d5, _0x1631af, _0x3e5796[_0x3d179c]);
        }
      } else {
        if (typeof _0x3e5796 === "string") {
          _0x5732d5.writeString(_0x3e5796);
        } else {
          if (_0x3e5796 instanceof Uint8Array) {
            _0x5732d5.writeBytes(_0x3e5796);
          } else {
            if (_0x3e5796.id) {
              _0x3e5796.offset = _0x5732d5.pos + _0x1631af;
              _0x5732d5.writeUnsignedIntBE(_0x3e5796.id);
              if (Array.isArray(_0x3e5796.data)) {
                let _0x1570e7;
                let _0x626a75;
                let _0x33a11f;
                if (_0x3e5796.size === -0x1) {
                  _0x5732d5.writeByte(0xff);
                } else {
                  _0x1570e7 = _0x5732d5.pos;
                  _0x5732d5.writeBytes([0x0, 0x0, 0x0, 0x0]);
                }
                _0x626a75 = _0x5732d5.pos;
                _0x3e5796.dataOffset = _0x626a75 + _0x1631af;
                _0x16bc20(_0x5732d5, _0x1631af, _0x3e5796.data);
                if (_0x3e5796.size !== -0x1) {
                  _0x33a11f = _0x5732d5.pos;
                  _0x3e5796.size = _0x33a11f - _0x626a75;
                  _0x5732d5.seek(_0x1570e7);
                  _0x5732d5.writeEBMLVarIntWidth(_0x3e5796.size, 0x4);
                  _0x5732d5.seek(_0x33a11f);
                }
              } else {
                if (typeof _0x3e5796.data === "string") {
                  _0x5732d5.writeEBMLVarInt(_0x3e5796.data.length);
                  _0x3e5796.dataOffset = _0x5732d5.pos + _0x1631af;
                  _0x5732d5.writeString(_0x3e5796.data);
                } else {
                  if (typeof _0x3e5796.data === "number") {
                    if (!_0x3e5796.size) {
                      _0x3e5796.size = _0x5732d5.measureUnsignedInt(_0x3e5796.data);
                    }
                    _0x5732d5.writeEBMLVarInt(_0x3e5796.size);
                    _0x3e5796.dataOffset = _0x5732d5.pos + _0x1631af;
                    _0x5732d5.writeUnsignedIntBE(_0x3e5796.data, _0x3e5796.size);
                  } else {
                    if (_0x3e5796.data instanceof _0x26a84c) {
                      _0x5732d5.writeEBMLVarInt(0x8);
                      _0x3e5796.dataOffset = _0x5732d5.pos + _0x1631af;
                      _0x5732d5.writeDoubleBE(_0x3e5796.data.value);
                    } else {
                      if (_0x3e5796.data instanceof _0x26a84c) {
                        _0x5732d5.writeEBMLVarInt(0x4);
                        _0x3e5796.dataOffset = _0x5732d5.pos + _0x1631af;
                        _0x5732d5.writeFloatBE(_0x3e5796.data.value);
                      } else {
                        if (_0x3e5796.data instanceof Uint8Array) {
                          _0x5732d5.writeEBMLVarInt(_0x3e5796.data.byteLength);
                          _0x3e5796.dataOffset = _0x5732d5.pos + _0x1631af;
                          _0x5732d5.writeBytes(_0x3e5796.data);
                        } else {
                          throw new Error("Bad EBML datatype " + typeof _0x3e5796.data);
                        }
                      }
                    }
                  }
                }
              }
            } else {
              throw new Error("Bad EBML datatype " + typeof _0x3e5796.data);
            }
          }
        }
      }
    }
    let _0x42b5bb = function (_0xfae16a, _0x1db1b4) {
      return function (_0x396be6) {
        let _0x1c4165 = false;
        let _0x37c105 = 0x0;
        let _0x381d5f = 0x0;
        let _0xc775e2 = true;
        let _0x93d6e4 = 0x0;
        let _0x5134ec = 0xbb80;
        let _0x3a519b = 0x1;
        let _0x30e1a8 = [];
        let _0x156ede = 0x0;
        let _0x1dad3f = 0x0;
        let _0x8f7a64 = 0x0;
        let _0x4d91ac = {
          'fileWriter': null,
          'codec': "VP9"
        };
        let _0x155241;
        let _0x2c4e32 = {
          'id': 0x4489,
          'data': new _0x26a84c(0x0)
        };
        let _0x2794d6 = new _0x1db1b4(_0x396be6.fileWriter);
        function _0x1dc846(_0x5b5459, _0x56c308) {
          _0x56c308 = new Uint8Array(_0x56c308);
          return _0x156d3d(_0x353b80(_0x5b5459), _0x3337b7(_0x56c308.byteLength), _0x56c308);
        }
        function _0x156d3d() {
          var _0x275170;
          var _0x3d377f = 0x0;
          var _0x43cd91;
          for (_0x275170 = 0x0; _0x275170 < arguments.length; _0x275170++) {
            _0x3d377f += arguments[_0x275170].byteLength;
          }
          _0x43cd91 = new Uint8Array(_0x3d377f);
          _0x275170 = 0x0;
          for (_0x3d377f = 0x0; _0x275170 < arguments.length; _0x3d377f += arguments[_0x275170].byteLength, _0x275170++) {
            _0x43cd91.set(arguments[_0x275170], _0x3d377f);
          }
          return _0x43cd91;
        }
        function _0x353b80(_0x4b0a7c) {
          if ((_0x4b0a7c & 0xff000000) != 0x0) {
            return new Uint8Array([_0x4b0a7c >>> 0x18 & 0xff, _0x4b0a7c >>> 0x10 & 0xff, _0x4b0a7c >>> 0x8 & 0xff, _0x4b0a7c & 0xff]);
          }
          if ((_0x4b0a7c & 0xff0000) != 0x0) {
            return new Uint8Array([_0x4b0a7c >>> 0x10 & 0xff, _0x4b0a7c >>> 0x8 & 0xff, _0x4b0a7c & 0xff]);
          }
          if ((_0x4b0a7c & 0xff00) != 0x0) {
            return new Uint8Array([_0x4b0a7c >>> 0x8 & 0xff, _0x4b0a7c & 0xff]);
          }
          if ((_0x4b0a7c & 0xff) != 0x0) {
            return new Uint8Array([_0x4b0a7c & 0xff]);
          }
          throw "InvalidOperationException";
        }
        function _0x3337b7(_0x50bdd8) {
          if (_0x50bdd8 <= 0x7f) {
            return new Uint8Array([0x80 | _0x50bdd8 & 0x7f]);
          }
          if (_0x50bdd8 <= 0x3fff) {
            return new Uint8Array([0x40 | _0x50bdd8 >> 0x8 & 0x3f, _0x50bdd8 & 0xff]);
          }
          return new Uint8Array([0x8, _0x50bdd8 >>> 0x18 & 0xff, _0x50bdd8 >>> 0x10 & 0xff, _0x50bdd8 >>> 0x8 & 0xff, _0x50bdd8 & 0xff]);
        }
        function _0x5183b4(_0x535226, _0x3a89ba) {
          var _0x3da5ea = new DataView(new ArrayBuffer(0x4));
          _0x3da5ea.setFloat32(0x0, _0x3a89ba, false);
          return _0x1dc846(_0x535226, new Uint8Array(_0x3da5ea.buffer));
        }
        function _0x321404(_0x539f8d) {
          if (_0x539f8d <= 0xff) {
            return new Uint8Array([_0x539f8d & 0xff]);
          }
          if (_0x539f8d <= 0xffff) {
            return new Uint8Array([_0x539f8d >>> 0x8 & 0xff, _0x539f8d & 0xff]);
          }
          if (_0x539f8d <= 0xffffff) {
            return new Uint8Array([_0x539f8d >> 0x10 & 0xff, _0x539f8d >> 0x8 & 0xff, _0x539f8d & 0xff]);
          }
          return new Uint8Array([_0x539f8d >>> 0x18 & 0xff, _0x539f8d >>> 0x10 & 0xff, _0x539f8d >>> 0x8 & 0xff, _0x539f8d & 0xff]);
          var _0x5c5553 = new DataView(new ArrayBuffer(0x4));
          _0x5c5553.setUint32(0x0, _0x539f8d, false);
          return _0x5c5553;
        }
        function _0x5e78c3() {
          let _0x1da81a = {
            'id': 0x1a45dfa3,
            'data': [_0x1dc846(0x4286, _0x321404(0x1)), _0x1dc846(0x42f7, _0x321404(0x1)), _0x1dc846(0x42f2, _0x321404(0x4)), _0x1dc846(0x42f3, _0x321404(0x8)), _0x1dc846(0x4282, new TextEncoder().encode("webm")), _0x1dc846(0x4287, _0x321404(0x4)), _0x1dc846(0x4285, _0x321404(0x2))]
          };
          let _0x3f9c1f = {
            'id': 0x1549a966,
            'data': [_0x1dc846(0x2ad7b1, _0x321404(0xf4240)), _0x1dc846(0x4d80, new TextEncoder().encode('VDO-Ninja')), _0x1dc846(0x5741, new TextEncoder().encode('VDO-Ninja')), _0x2c4e32]
          };
          let _0x1a28d2 = {
            'id': 0x1654ae6b,
            'data': [{
              'id': 0xae,
              'data': [_0x1dc846(0xd7, _0x321404(0x1)), _0x1dc846(0x73c5, _0x321404(0x1)), _0x1dc846(0x9c, _0x321404(0x0)), _0x1dc846(0x22b59c, new TextEncoder().encode("und")), _0x1dc846(0x86, new TextEncoder().encode('V_' + _0x396be6.codec)), _0x1dc846(0x83, _0x321404(0x1)), {
                'id': 0xe0,
                'data': [_0x1dc846(0xb0, _0x321404(_0x37c105)), _0x1dc846(0xba, _0x321404(_0x381d5f))]
              }]
            }, {
              'id': 0xae,
              'data': [_0x1dc846(0xd7, _0x321404(0x2)), _0x1dc846(0x73c5, _0x321404(0x2)), _0x1dc846(0x9c, _0x321404(0x0)), _0x1dc846(0x22b59c, new TextEncoder().encode("und")), _0x1dc846(0x86, new TextEncoder().encode("A_OPUS")), _0x1dc846(0x83, _0x321404(0x2)), {
                'id': 0xe1,
                'data': [_0x5183b4(0xb5, _0x5134ec), _0x1dc846(0x9f, _0x321404(_0x3a519b))]
              }, _0x1dc846(0x63a2, new Uint8Array(['O'.charCodeAt(0x0), 'p'.charCodeAt(0x0), 'u'.charCodeAt(0x0), 's'.charCodeAt(0x0), 'H'.charCodeAt(0x0), 'e'.charCodeAt(0x0), 'a'.charCodeAt(0x0), 'd'.charCodeAt(0x0), 0x1, _0x3a519b & 0xff, 0x38, 0x1, _0x5134ec >>> 0x0 & 0xff, _0x5134ec >>> 0x8 & 0xff, _0x5134ec >>> 0x10 & 0xff, _0x5134ec >>> 0x18 & 0xff, 0x0, 0x0, 0x0]))]
            }]
          };
          _0x155241 = {
            'id': 0x18538067,
            'size': -0x1,
            'data': [_0x3f9c1f, _0x1a28d2]
          };
          let _0x2293eb = new _0xfae16a(0x200);
          _0x16bc20(_0x2293eb, _0x2794d6.pos, [_0x1da81a, _0x155241]);
          _0x2794d6.write(_0x2293eb.getAsDataArray());
          _0x1c4165 = true;
        }
        function _0x3083cd(_0x18e5f3) {
          let _0x2a16ff = new _0xfae16a(4);
          if (!(_0x18e5f3.trackNumber > 0x0 && _0x18e5f3.trackNumber < 0x7f)) {
            throw new Error("TrackNumber must be > 0 and < 127");
          }
          _0x2a16ff.writeEBMLVarInt(_0x18e5f3.trackNumber);
          _0x2a16ff.writeU16BE(_0x18e5f3.timecode);
          _0x2a16ff.writeByte((_0x18e5f3.type == "key" ? 0x1 : 0x0) << 0x7);
          return {
            'id': 0xa3,
            'data': [_0x2a16ff.getAsDataArray(), _0x18e5f3.frame]
          };
        }
        function _0x275076() {
          if (_0x30e1a8.length === 0x0) {
            return;
          }
          let _0x2f1d16 = 0x0;
          for (let _0x5833e9 = 0x0; _0x5833e9 < _0x30e1a8.length; _0x5833e9++) {
            _0x2f1d16 += _0x30e1a8[_0x5833e9].frame.byteLength;
          }
          let _0xe5cd28 = new _0xfae16a(_0x2f1d16 + _0x30e1a8.length * 0x40);
          let _0x366475 = {
            'id': 0x1f43b675,
            'data': [{
              'id': 0xe7,
              'data': Math.round({
                'timecode': Math.round(_0x156ede)
              }.timecode)
            }]
          };
          for (let _0x4d805d = 0x0; _0x4d805d < _0x30e1a8.length; _0x4d805d++) {
            _0x366475.data.push(_0x3083cd(_0x30e1a8[_0x4d805d]));
          }
          _0x16bc20(_0xe5cd28, _0x2794d6.pos, _0x366475);
          _0x2794d6.write(_0xe5cd28.getAsDataArray());
          _0x30e1a8 = [];
          _0x1dad3f = 0x0;
        }
        function _0x4b81cb(_0x2a3b6d, _0x260dde) {
          _0x2a3b6d.trackNumber = _0x260dde;
          var _0x234ba0 = _0x2a3b6d.intime / 0x3e8;
          if (_0xc775e2) {
            _0x93d6e4 = _0x234ba0;
            _0x234ba0 = 0x0;
            _0xc775e2 = false;
          } else {
            _0x234ba0 = _0x234ba0 - _0x93d6e4;
          }
          _0x8f7a64 = _0x234ba0;
          if (_0x1dad3f == 0x0) {
            _0x156ede = _0x234ba0;
          }
          _0x2a3b6d.timecode = Math.round(_0x234ba0 - _0x156ede);
          _0x30e1a8.push(_0x2a3b6d);
          _0x1dad3f = _0x2a3b6d.timecode + 0x1;
          if (_0x1dad3f >= 0x1388) {
            _0x275076();
          }
        }
        function _0xd67bc6() {
          let _0xa6a638 = new _0xfae16a(0x8);
          let _0x15ca71 = _0x2794d6.pos;
          _0xa6a638.writeDoubleBE(_0x8f7a64);
          _0x2794d6.seek(_0x2c4e32.dataOffset);
          _0x2794d6.write(_0xa6a638.getAsDataArray());
          _0x2794d6.seek(_0x15ca71);
        }
        this.addFrame = function (_0x42f2c6) {
          if (!_0x1c4165) {
            _0x37c105 = _0x396be6.width;
            _0x381d5f = _0x396be6.height;
            _0x5134ec = _0x396be6.samplingFrequency;
            _0x3a519b = _0x396be6.channels;
            _0x5e78c3();
          }
          if (_0x42f2c6.constructor.name == 'EncodedVideoChunk') {
            let _0x96e26b = new Uint8Array(_0x42f2c6.byteLength);
            _0x42f2c6.copyTo(_0x96e26b);
            _0x4b81cb({
              'frame': _0x96e26b,
              'intime': _0x42f2c6.timestamp,
              'type': _0x42f2c6.type
            }, 0x1);
            return;
          } else {
            if (_0x42f2c6.constructor.name == "EncodedAudioChunk") {
              let _0x57ccbd = new Uint8Array(_0x42f2c6.byteLength);
              _0x42f2c6.copyTo(_0x57ccbd);
              _0x4b81cb({
                'frame': _0x57ccbd,
                'intime': _0x42f2c6.timestamp,
                'type': _0x42f2c6.type
              }, 0x2);
              return;
            }
          }
        };
        this.complete = function () {
          if (!_0x1c4165) {
            _0x5e78c3();
          }
          _0xc775e2 = true;
          _0x275076();
          _0xd67bc6();
          return _0x2794d6.complete('video/webm');
        };
        this.getWrittenSize = function () {
          return _0x2794d6.length;
        };
        _0x396be6 = _0x270039(_0x4d91ac, _0x396be6 || {});
      };
    };
    window.WebMWriter = _0x42b5bb(window.ArrayBufferDataStream, window.BlobBuffer);
  })();