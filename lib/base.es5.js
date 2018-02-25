function Base(){
  this.events = {}
}

function merge(target){
  var args = Array.prototype.slice.call(arguments, 1);
  args.forEach(function(arg){
    for (var key in arg){
      // for in 中会将对象本身以及原型链中的所有属性都会遍历
      // hasOwnProperty用来判断是否是对象本身属性，而不是原型链中的属性
      if(arg.hasOwnProperty(key)){
        target[key] = arg[key];
      }
    }
  })
}

Base.extend = function(proto, staticObj){
  var Super = this
  function Cur(){
    Super.call(this)
  }
  var Pile = function(){}
  Pile.prototype = this.prototype
  Cur.prototype = new Pile()
  merge(Cur.prototype,proto)
  merge(Cur,Super,staticObj)
  return Cur
}

merge(Base.prototype,{
  on: function(event, fn){
    (this.events[event] = this.events[event] || []).push(fn)
  },
  trigger: function(event){
    var args = Array.prototype.slice.call(arguments, 1);
    var _this = this;
    (this.events[event] = this.events[event] || []).forEach(function(fn){
      fn.apply(_this, args)
    })
  }
})

module.exports = Base
