System.register(['angular2/core', 'angular2/router', 'string'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, string_1;
    var FrontpageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (string_1_1) {
                string_1 = string_1_1;
            }],
        execute: function() {
            FrontpageComponent = (function () {
                function FrontpageComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                FrontpageComponent.prototype.ngOnInit = function () {
                    this.eventSlug = this._routeParams.get('event');
                    this.eventName = "ASSEMBLY " + string_1.default(this.eventSlug).capitalize();
                };
                FrontpageComponent = __decorate([
                    core_1.Component({
                        selector: 'asm-frontpage',
                        templateUrl: '/app/pages/frontpage/frontpage.template.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], FrontpageComponent);
                return FrontpageComponent;
            })();
            exports_1("FrontpageComponent", FrontpageComponent);
        }
    }
});
//# sourceMappingURL=frontpage.component.js.map