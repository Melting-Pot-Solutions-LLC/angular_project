/* global angular, beforeEach, describe, expect, inject, it, module */

describe('Unit testing background image directive', function () {
  var $compile,
    $rootScope;

  beforeEach(module('sb-background-image'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('sets the element\'s background image', function () {
    var element = $compile('<div sb-background-image="./cats.jpg"></div>')($rootScope);

    $rootScope.$digest();
    expect(element.css('background-image')).toEqual('url("./cats.jpg")');
  });
});