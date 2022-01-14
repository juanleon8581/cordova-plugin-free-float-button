exports.FloatFreeButton = class {
  shiftX;
  shiftY;

  constructor(elm, zIndex, corner){
    this.elm = elm;
    this.zIndex = zIndex;
    this.corner = corner;
  }

  moveAt(pageX, pageY, ref) {
    ref.elm.style.left = pageX - ref.shiftX + "px";
    ref.elm.style.top = pageY - ref.shiftY + "px";
  }

  mainMovement(event, ref) {
    function initPosition(){
      ref.shiftX = event.touches[0].clientX - ref.elm.getBoundingClientRect().left;
      ref.shiftY = event.touches[0].clientY - ref.elm.getBoundingClientRect().top;
    }

    function shiftProperties(){
      ref.elm.style.position = "absolute";
      ref.elm.style.zIndex = ref.zIndex;
      document.body.append(ref.elm);
    }

    function onTouchmove(e) {
      ref.moveAt(e.touches[0].pageX, e.touches[0].pageY, ref);
    }

    function onTouchend() {
      if(ref.corner){
        let elmLeft = parseInt(ref.elm.style.left);
        let halfScreen = (window.screen.width - ref.elm.getBoundingClientRect().left) / 2;
        if(elmLeft < halfScreen){
          ref.elm.style.left = '0px';
        }else{
          ref.elm.style.left = (window.screen.width - ref.elm.offsetWidth)+'px';
        }
      }
      
      document.removeEventListener("ontouchmove", ref.onTouchmove);
      initPosition();

      ref.elm.ontouchend = null;
    };

    function onDragstart() {
      return false;
    };

  
    initPosition(event);
    shiftProperties();
    ref.moveAt(event.touches[0].pageX, event.touches[0].pageY, ref)
    this.elm.addEventListener("touchmove", onTouchmove);
    this.elm.ontouchend = onTouchend;
    this.elm.ondragstart = onDragstart;
  }

  goMoveIt(ref){
    this.elm.ontouchstart = function (e) {
      ref.mainMovement(e, ref);
    };
  }
}

// $('body').append('<div id="hello" style="width: 50px; height: 50px; position: absolute; background: black;">hello</div>');  
// let ball = document.getElementById('hello')
// let azucar = new cordova.plugins.freeFloatButton.FloatFreeButton(ball,1000)
// azucar.goMoveIt(azucar)
// $('#hello').on('click',function(){showAlertButton('','','')})