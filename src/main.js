import Lenis from '@studio-freight/lenis'
import {
    gsap,
    Back
} from "gsap"
import {
    ScrollTrigger
} from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

let lenis = new Lenis({
    duration: .8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://w-ww.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false
})

let object = {
    y: 0
}

let ySetter = gsap.quickSetter(".title", "y", "px")
let clamp = gsap.utils.clamp(-600, 600)

ScrollTrigger.create({
    onUpdate: (self) => {
        let y = clamp(self.getVelocity() / -100)
        if (Math.abs(y) > Math.abs(object.y)) {
            object.y = y
            gsap.to(object, {
                y: 0,
                duration: 1.2,
                ease: Back.easeOut,
                overwrite: true,
                onUpdate: () => ySetter(object.y)
            })
        }
    }
})

gsap.set(".title", {
    transformOrigin: "center center",
    force3D: true
});

const getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight)
/*
* Reference: Simple parallax sections - ScrollTrigger
* @see https://codepen.io/GreenSock/pen/QWjjYEw
*/
const sections = document.querySelectorAll("section")
sections.forEach((section, i) => {
    const img = section.querySelector("img")
    let obj  = {
        scale: 1,
        y: 0,
        contrast: 1,
        brightness: 1
    }
    let maxOffset = window.innerHeight * .3
    gsap.fromTo(obj, {
        y: () => i ? `${-maxOffset * getRatio(section)}px` : "0px",
        scale: () => i ? 2 : 1,
        brightness: () => i ? 1 : .35,
        contrast: () => i ? 1 : 2
    }, {
        y: () => `${maxOffset * (1 - getRatio(section))}px`,
        ease: "none",
        duration: .35,
        brightness: () => i ? .35 : 1,
        contrast: () => i ? 2 : 1,
        scale: () => i ? 1 : 2,
        scrollTrigger: {
            trigger: section,
            start: () => i ? "top bottom" : "top top",
            end: "bottom center",
            scrub: true,
            onUpdate: () => {
                gsap.to(img, {
                    filter: `contrast(${obj.contrast}) brightness(${obj.brightness})`,
                    duration: .15,
                    ease: "none",
                    y: obj.y,
                    scaleX: obj.scale,
                    scaleY: obj.scale
                })
            },
            invalidateOnRefresh: true // to make it responsive
        }
    });

});

function animate(time) {
    requestAnimationFrame(animate)
    lenis.raf(time)
}

animate()