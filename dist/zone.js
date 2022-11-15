var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Subscriber } from 'rxjs';
import { getZone } from './utils';
export var zoneOperator = function (zone) { return function (source) { return source.lift(new ZoneOperator(zone || getZone())); }; };
var ZoneOperator = /** @class */ (function () {
    function ZoneOperator(zone) {
        this.zone = zone;
    }
    ZoneOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ZoneSubscriber(subscriber, this.zone));
    };
    return ZoneOperator;
}());
var ZoneSubscriber = /** @class */ (function (_super) {
    __extends(ZoneSubscriber, _super);
    function ZoneSubscriber(destination, zone) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.zone = zone;
        return _this;
    }
    ZoneSubscriber.prototype._next = function (value) {
        var _this = this;
        this.zone.run(function () {
            _this.destination.next(value);
        });
    };
    ZoneSubscriber.prototype._complete = function () {
        var _this = this;
        this.zone.run(function () {
            _this.destination.complete();
        });
    };
    ZoneSubscriber.prototype._error = function (err) {
        var _this = this;
        this.zone.run(function () {
            _this.destination.error(err);
        });
    };
    return ZoneSubscriber;
}(Subscriber));
//# sourceMappingURL=zone.js.map