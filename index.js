var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var mongoose = require('mongoose');
var models = require('./mongoModels');
var app = express();
var HTTPS_PORT = 8080;
var STATUS_OK = 200;
;
app.use(express.json());
app.set('view engine', 'hbs');
app.get('/', function (req, res, err) {
    res.render('index');
});
app.get('/find', function (req, res, err) {
    res.render('find');
});
mongoose.connect('mongodb://localhost:50000/myproject', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.post('/users/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var name, email, pass, newId, _a, data, counterData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.body);
                name = req.body.name;
                email = req.body.email;
                pass = req.body.pass;
                return [4 /*yield*/, models.mongoCounterModel.find({})];
            case 1:
                if (!((_b.sent()).length == 0)) return [3 /*break*/, 2];
                _a = 0;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, models.mongoCounterModel.find({})];
            case 3:
                _a = (_b.sent()).length;
                _b.label = 4;
            case 4:
                newId = _a;
                console.log(newId);
                data = new models.mongoModel({
                    id: newId,
                    name: name,
                    email: email,
                    pass: pass
                });
                console.log(data);
                data.save();
                counterData = new models.mongoCounterModel({
                    id: newId
                });
                counterData.save();
                res.send('ok').status(STATUS_OK);
                return [2 /*return*/];
        }
    });
}); });
app.get('/users/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('FIND ALL');
                return [4 /*yield*/, models.mongoModel.find({})];
            case 1:
                userData = _a.sent();
                console.log(userData);
                res.send(userData).status(STATUS_OK);
                return [2 /*return*/];
        }
    });
}); });
app.get('/users/:name', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var name, email, userData, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.params.name;
                email = req.query.email;
                console.log('finding: ', name);
                console.log(email);
                if (!(email == undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, models.mongoModel.find({ name: name })];
            case 1:
                userData = _a.sent();
                console.log(userData);
                res.send(userData).status(STATUS_OK);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, models.mongoModel.find({ email: email })];
            case 3:
                userData = _a.sent();
                console.log(userData);
                res.send(userData).status(STATUS_OK);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/users/:name/:email', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var name, email, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.params.name;
                email = req.params.email;
                console.log('finding: ', name + ' ' + email);
                return [4 /*yield*/, models.mongoModel.find({ name: name, email: email })];
            case 1:
                userData = _a.sent();
                console.log(userData);
                res.send(userData).status(STATUS_OK);
                return [2 /*return*/];
        }
    });
}); });
app.listen(HTTPS_PORT, function (req, res, err) {
    if (err) {
        console.error(err);
    }
    console.log('listening on port: ' + HTTPS_PORT);
});
