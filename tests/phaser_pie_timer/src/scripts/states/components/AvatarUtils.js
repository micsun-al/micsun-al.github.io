export default class {
    addOverScaling(obj, targetScale){
        let originalScaleX = obj.scale.x
        let originalScaleY = obj.scale.y

        if(!targetScale){
            targetScale = 1.05
        }

        if (Array.isArray(obj)) {
            for (let t of obj) {
                overScaling.call(this, t)
            }
        } else {
            overScaling.call(this, obj)
        }

        function overScaling(target) {
            target.inputEnabled = true
            let negativeX = target.scale.x < 0 ? -1 : 1
            let negativeY = target.scale.y < 0 ? -1 : 1
            let scaleTween = null

            target.onInputOver.add(() => {
                if (scaleTween) {
                    scaleTween.stop()
                }

                scaleTween = game.add.tween(target.scale)
                    .to({
                        x: targetScale * negativeX,
                        y: targetScale * negativeY
                    }, 400, Phaser.Easing.Back.Out, true)
            })

            target.onInputOut.add(() => {
                if (scaleTween) {
                    scaleTween.stop()
                }

                scaleTween = game.add.tween(target.scale)
                    .to({
                        x: originalScaleX * negativeX,
                        y: originalScaleY * negativeY
                    }, 200, Phaser.Easing.Quadratic.InOut, true)
            })
        }
    }

    anchorAll(obj, anchorX, anchorY){
        if(typeof(anchorX) === 'undefined'){
            anchorX = 0.5
        }

        if(typeof(anchorY === 'undefined')){
            anchorY = anchorX
        }

        if(Array.isArray(obj)){
            for(let o of obj){
                o.anchor.set(anchorX, anchorY)
            }
        }else{
            obj.anchor.set(anchorX, anchorY)
        }
    }

    scaleAll(obj, scaleX, scaleY){
        if(typeof(scaleX) === 'undefined'){
            scaleX = 2
        }

        if(typeof(scaleY === 'undefined')){
            scaleY = scaleX
        }

        if(Array.isArray(obj)){
            for(let o of obj){
                o.scale.set(scaleX, scaleY)
            }
        }else{
            obj.scale.set(scaleX, scaleY)
        }
    }

    groupAdd(group, obj){
        if(Array.isArray(obj)){
            for(let o of obj){
                group.add(o)
            }
        }else{
            group.add(obj)
        }
    }
}
