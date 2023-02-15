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
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

let object = {
    y: 0
}
let ySetter = gsap.quickSetter(".title", "y", "px")
let clamp = gsap.utils.clamp(-60, 60)
// const setScaleX = gsap.quickSetter(".title", "scaleX")
// const setScaleY = gsap.quickSetter(".title", "scaleY")

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
                scrub: true,
                onUpdate: () => ySetter(object.y)
                // onUpdate: () => ySetter(object.y)
            })
        }
    }
})

gsap.set(".title", {
    transformOrigin: "center center",
    force3D: true
});

let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

gsap.utils.toArray("section").forEach((section, i) => {
    const img = section.querySelector("img")
    gsap.fromTo(img, {
        y: () => i ? `${-window.innerHeight * getRatio(section)}px` : "0px",
        scaleX: 2,
        scaleY: 2
    }, {
        y: () => `${window.innerHeight * (1 - getRatio(section))}px`,
        ease: "none",
        scaleX: 1,
        scaleY: 1,
        scrollTrigger: {
            trigger: section,
            start: () => i ? "top bottom" : "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true // to make it responsive
        }
    });

});

function animate(time) {
    requestAnimationFrame(animate)
    lenis.raf(time)
}

animate()