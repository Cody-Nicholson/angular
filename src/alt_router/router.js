'use strict';"use strict";
var core_1 = require('angular2/core');
var lang_1 = require('angular2/src/facade/lang');
var recognize_1 = require('./recognize');
var segments_1 = require('./segments');
var lifecycle_reflector_1 = require('./lifecycle_reflector');
var RouterOutletMap = (function () {
    function RouterOutletMap() {
        /** @internal */
        this._outlets = {};
    }
    RouterOutletMap.prototype.registerOutlet = function (name, outlet) { this._outlets[name] = outlet; };
    return RouterOutletMap;
}());
exports.RouterOutletMap = RouterOutletMap;
var Router = (function () {
    function Router(_componentType, _componentResolver, _urlParser, _routerOutletMap) {
        this._componentType = _componentType;
        this._componentResolver = _componentResolver;
        this._urlParser = _urlParser;
        this._routerOutletMap = _routerOutletMap;
    }
    Router.prototype.navigateByUrl = function (url) {
        var _this = this;
        var urlSegmentTree = this._urlParser.parse(url.substring(1));
        return recognize_1.recognize(this._componentResolver, this._componentType, urlSegmentTree)
            .then(function (currTree) {
            var prevRoot = lang_1.isPresent(_this.prevTree) ? _this.prevTree.root : null;
            _loadSegments(currTree, currTree.root, _this.prevTree, prevRoot, _this, _this._routerOutletMap);
            _this.prevTree = currTree;
        });
    };
    return Router;
}());
exports.Router = Router;
function _loadSegments(currTree, curr, prevTree, prev, router, parentOutletMap) {
    var outlet = parentOutletMap._outlets[curr.outlet];
    var outletMap;
    if (segments_1.equalSegments(curr, prev)) {
        outletMap = outlet.outletMap;
    }
    else {
        outletMap = new RouterOutletMap();
        var resolved = core_1.ReflectiveInjector.resolve([core_1.provide(RouterOutletMap, { useValue: outletMap }), core_1.provide(segments_1.RouteSegment, { useValue: curr })]);
        var ref = outlet.load(segments_1.routeSegmentComponentFactory(curr), resolved, outletMap);
        if (lifecycle_reflector_1.hasLifecycleHook("routerOnActivate", ref.instance)) {
            ref.instance.routerOnActivate(curr, prev, currTree, prevTree);
        }
    }
    if (lang_1.isPresent(currTree.firstChild(curr))) {
        var cc = currTree.firstChild(curr);
        var pc = lang_1.isBlank(prevTree) ? null : prevTree.firstChild(prev);
        _loadSegments(currTree, cc, prevTree, pc, router, outletMap);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1nSjlEM0JPRy50bXAvYW5ndWxhcjIvc3JjL2FsdF9yb3V0ZXIvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBNkQsZUFBZSxDQUFDLENBQUE7QUFFN0UscUJBQXVDLDBCQUEwQixDQUFDLENBQUE7QUFFbEUsMEJBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLHlCQUE4RSxZQUFZLENBQUMsQ0FBQTtBQUMzRixvQ0FBK0IsdUJBQXVCLENBQUMsQ0FBQTtBQUV2RDtJQUFBO1FBQ0UsZ0JBQWdCO1FBQ2hCLGFBQVEsR0FBbUMsRUFBRSxDQUFDO0lBRWhELENBQUM7SUFEQyx3Q0FBYyxHQUFkLFVBQWUsSUFBWSxFQUFFLE1BQW9CLElBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzVGLHNCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSx1QkFBZSxrQkFJM0IsQ0FBQTtBQUVEO0lBRUUsZ0JBQW9CLGNBQW9CLEVBQVUsa0JBQXFDLEVBQ25FLFVBQTJCLEVBQVUsZ0JBQWlDO1FBRHRFLG1CQUFjLEdBQWQsY0FBYyxDQUFNO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNuRSxlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7SUFBRyxDQUFDO0lBRTlGLDhCQUFhLEdBQWIsVUFBYyxHQUFXO1FBQXpCLGlCQVNDO1FBUkMsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxxQkFBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQzthQUN6RSxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osSUFBSSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3BFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFJLEVBQ3RELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLGNBQU0sU0FlbEIsQ0FBQTtBQUVELHVCQUF1QixRQUE0QixFQUFFLElBQWtCLEVBQ2hELFFBQTRCLEVBQUUsSUFBa0IsRUFBRSxNQUFjLEVBQ2hFLGVBQWdDO0lBQ3JELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRW5ELElBQUksU0FBUyxDQUFDO0lBQ2QsRUFBRSxDQUFDLENBQUMsd0JBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLFNBQVMsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ2xDLElBQUksUUFBUSxHQUFHLHlCQUFrQixDQUFDLE9BQU8sQ0FDckMsQ0FBQyxjQUFPLENBQUMsZUFBZSxFQUFFLEVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBQyxDQUFDLEVBQUUsY0FBTyxDQUFDLHVCQUFZLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEcsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyx1Q0FBNEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0UsRUFBRSxDQUFDLENBQUMsc0NBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxHQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDSCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxFQUFFLEdBQUcsY0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlELGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwcm92aWRlLCBSZWZsZWN0aXZlSW5qZWN0b3IsIENvbXBvbmVudFJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Um91dGVyT3V0bGV0fSBmcm9tICcuL2RpcmVjdGl2ZXMvcm91dGVyX291dGxldCc7XG5pbXBvcnQge1R5cGUsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7Um91dGVyVXJsUGFyc2VyfSBmcm9tICcuL3JvdXRlcl91cmxfcGFyc2VyJztcbmltcG9ydCB7cmVjb2duaXplfSBmcm9tICcuL3JlY29nbml6ZSc7XG5pbXBvcnQge2VxdWFsU2VnbWVudHMsIHJvdXRlU2VnbWVudENvbXBvbmVudEZhY3RvcnksIFJvdXRlU2VnbWVudCwgVHJlZX0gZnJvbSAnLi9zZWdtZW50cyc7XG5pbXBvcnQge2hhc0xpZmVjeWNsZUhvb2t9IGZyb20gJy4vbGlmZWN5Y2xlX3JlZmxlY3Rvcic7XG5cbmV4cG9ydCBjbGFzcyBSb3V0ZXJPdXRsZXRNYXAge1xuICAvKiogQGludGVybmFsICovXG4gIF9vdXRsZXRzOiB7W25hbWU6IHN0cmluZ106IFJvdXRlck91dGxldH0gPSB7fTtcbiAgcmVnaXN0ZXJPdXRsZXQobmFtZTogc3RyaW5nLCBvdXRsZXQ6IFJvdXRlck91dGxldCk6IHZvaWQgeyB0aGlzLl9vdXRsZXRzW25hbWVdID0gb3V0bGV0OyB9XG59XG5cbmV4cG9ydCBjbGFzcyBSb3V0ZXIge1xuICBwcml2YXRlIHByZXZUcmVlOiBUcmVlPFJvdXRlU2VnbWVudD47XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbXBvbmVudFR5cGU6IFR5cGUsIHByaXZhdGUgX2NvbXBvbmVudFJlc29sdmVyOiBDb21wb25lbnRSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdXJsUGFyc2VyOiBSb3V0ZXJVcmxQYXJzZXIsIHByaXZhdGUgX3JvdXRlck91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwKSB7fVxuXG4gIG5hdmlnYXRlQnlVcmwodXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdXJsU2VnbWVudFRyZWUgPSB0aGlzLl91cmxQYXJzZXIucGFyc2UodXJsLnN1YnN0cmluZygxKSk7XG4gICAgcmV0dXJuIHJlY29nbml6ZSh0aGlzLl9jb21wb25lbnRSZXNvbHZlciwgdGhpcy5fY29tcG9uZW50VHlwZSwgdXJsU2VnbWVudFRyZWUpXG4gICAgICAgIC50aGVuKGN1cnJUcmVlID0+IHtcbiAgICAgICAgICBsZXQgcHJldlJvb3QgPSBpc1ByZXNlbnQodGhpcy5wcmV2VHJlZSkgPyB0aGlzLnByZXZUcmVlLnJvb3QgOiBudWxsO1xuICAgICAgICAgIF9sb2FkU2VnbWVudHMoY3VyclRyZWUsIGN1cnJUcmVlLnJvb3QsIHRoaXMucHJldlRyZWUsIHByZXZSb290LCB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyT3V0bGV0TWFwKTtcbiAgICAgICAgICB0aGlzLnByZXZUcmVlID0gY3VyclRyZWU7XG4gICAgICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9sb2FkU2VnbWVudHMoY3VyclRyZWU6IFRyZWU8Um91dGVTZWdtZW50PiwgY3VycjogUm91dGVTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICBwcmV2VHJlZTogVHJlZTxSb3V0ZVNlZ21lbnQ+LCBwcmV2OiBSb3V0ZVNlZ21lbnQsIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRPdXRsZXRNYXA6IFJvdXRlck91dGxldE1hcCk6IHZvaWQge1xuICBsZXQgb3V0bGV0ID0gcGFyZW50T3V0bGV0TWFwLl9vdXRsZXRzW2N1cnIub3V0bGV0XTtcblxuICBsZXQgb3V0bGV0TWFwO1xuICBpZiAoZXF1YWxTZWdtZW50cyhjdXJyLCBwcmV2KSkge1xuICAgIG91dGxldE1hcCA9IG91dGxldC5vdXRsZXRNYXA7XG4gIH0gZWxzZSB7XG4gICAgb3V0bGV0TWFwID0gbmV3IFJvdXRlck91dGxldE1hcCgpO1xuICAgIGxldCByZXNvbHZlZCA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlKFxuICAgICAgICBbcHJvdmlkZShSb3V0ZXJPdXRsZXRNYXAsIHt1c2VWYWx1ZTogb3V0bGV0TWFwfSksIHByb3ZpZGUoUm91dGVTZWdtZW50LCB7dXNlVmFsdWU6IGN1cnJ9KV0pO1xuICAgIGxldCByZWYgPSBvdXRsZXQubG9hZChyb3V0ZVNlZ21lbnRDb21wb25lbnRGYWN0b3J5KGN1cnIpLCByZXNvbHZlZCwgb3V0bGV0TWFwKTtcbiAgICBpZiAoaGFzTGlmZWN5Y2xlSG9vayhcInJvdXRlck9uQWN0aXZhdGVcIiwgcmVmLmluc3RhbmNlKSkge1xuICAgICAgcmVmLmluc3RhbmNlLnJvdXRlck9uQWN0aXZhdGUoY3VyciwgcHJldiwgY3VyclRyZWUsIHByZXZUcmVlKTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXNQcmVzZW50KGN1cnJUcmVlLmZpcnN0Q2hpbGQoY3VycikpKSB7XG4gICAgbGV0IGNjID0gY3VyclRyZWUuZmlyc3RDaGlsZChjdXJyKTtcbiAgICBsZXQgcGMgPSBpc0JsYW5rKHByZXZUcmVlKSA/IG51bGwgOiBwcmV2VHJlZS5maXJzdENoaWxkKHByZXYpO1xuICAgIF9sb2FkU2VnbWVudHMoY3VyclRyZWUsIGNjLCBwcmV2VHJlZSwgcGMsIHJvdXRlciwgb3V0bGV0TWFwKTtcbiAgfVxufSJdfQ==