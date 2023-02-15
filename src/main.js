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
    skewSetter = gsap.quickSetter(".big-title", "y", "px"), // fast
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


gsap.utils.toArray(".lorem").forEach((lorem, i) => {
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
            invalidateOnRefresh: true // to make it responsive
        }
    })
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".big-title", {
    transformOrigin: "right center",
    force3D: true
});

let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

gsap.utils.toArray("section").forEach((section, i) => {
    gsap.fromTo(section, {
        backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
    }, {
        backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
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