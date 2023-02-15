import {
    gsap,
    Power2
} from "gsap"

import {
    ScrollTrigger
} from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

let proxy = {
        y: 0
    },
    skewSetter = gsap.quickSetter(".title", "y", "px"), // fast
    clamp = gsap.utils.clamp(-100, 100); // don't let the skew go beyond 20 degrees. 

ScrollTrigger.create({
    onUpdate: (self) => {
        let y = clamp(self.getVelocity() / -300);
        if (Math.abs(y) > Math.abs(proxy.y)) {
            proxy.y = y;
            gsap.to(proxy, {
                y: 0,
                duration: 0.8,
                ease: Power2.easeOut,
                overwrite: true,
                onUpdate: () => skewSetter(proxy.y)
            });
        }
    }
})

gsap.utils.toArray(".sub-title").forEach((lorem, i) => {
    gsap.fromTo(lorem, {
        y: 60,
        opacity: 0,
        overwrite: true,
    }, {
        y: 0,
        opacity: 1,
        overwrite: true,
        scrollTrigger: {
            trigger: lorem,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: () => skewSetter(proxy.y)
        }
    })
});

gsap.set(".title", {
    transformOrigin: "center center",
    force3D: true
});

let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

gsap.utils.toArray("section").forEach((section, i) => {
    const img = section.querySelector("img")
    gsap.fromTo(img, {
        y: () => i ? `${-window.innerHeight * getRatio(section)}px` : "0px"
    }, {
        y: () => `${window.innerHeight * (1 - getRatio(section))}px`,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: () => i ? "top bottom" : "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true // to make it responsive
        }
    });

});