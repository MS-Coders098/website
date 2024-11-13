import "./index.css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all";

const frames = {
    currentIndex: 1,
    maxIndex: 520
}
let allImagesLoaded = false
let loadedImage = 0
let images = []
const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d")
const cards = document.querySelectorAll('.card');
const projects = document.querySelectorAll('.project');

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e
    gsap.to("#cursor", {
        x: clientX,
        y: clientY,
        duration: 0.8,
        ease: "power2.out"
    })
})

const text = [
    "With extensive expertise in HTML, CSS, and JS, I'm excel at crafting seamless websites.",

    "My proficiency in the MERN stack (MongoDB, Express.js, React.js, and Node.js) enables you to develop comprehensive web applications.",

    "I'm also specialize in building efficient, server-rendered web applications using Node.js, Express.js, and EJS.",

    "I'm leverage Next.js to create high-performance, server-side rendered applications.",

    "My ability to integrate JS animation libraries like Framer Motion, GSAP, and Locomotive.js further enriches UX with engaging animations.",

    "Socket.io is my go-to library for real-time web applications."
]
text.forEach((item) => {
    document.querySelector("#text").innerHTML += `<span class="down-text opacity-0">${item}</span>`
})

function preloadImage() {
    for (let i = 0; i <= frames.maxIndex; i++) {
        const img = new Image();
        img.src = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;

        img.onload = () => {
            loadedImage++;
            console.log(loadedImage)
            if (loadedImage === frames.maxIndex) {
                allImagesLoaded = true
                drawImage(frames.currentIndex);
                startAnimation();
            }
        }

        images.push(img);
    }
}

function drawImage(index) {
    if (!allImagesLoaded || !images[index]) return

    const currentImage = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hScale = canvas.width / currentImage?.width
    const yScale = canvas.height / currentImage?.height
    const scale = Math.max(hScale, yScale)

    const myWidth = currentImage?.width * scale
    const myHeight = currentImage?.height * scale

    const offsetX = (canvas.width - myWidth) / 2
    const offsetY = (canvas.height - myHeight) / 2

    context.clearRect(0, 0, canvas.width, canvas.height);
    Object.assign(context, { imageSmoothingEnabled: true, imageSmoothingQuality: "high" });
    context.drawImage(currentImage, offsetX, offsetY, myWidth, myHeight);
    frames.currentIndex = index
}

window.addEventListener("resize", () => {
    if (allImagesLoaded) {
        drawImage(frames.currentIndex)
    }
})

function landingAnimation() {
    gsap.from(".down-text", {
        x: "-100",
        ease: "power4.inOut",
        opacity: 0,
        stagger: 0.25,
        willChange: "transform"
    })

    gsap.from(".up-text", {
        rotateX: "100deg",
        ease: "power4.inOut",
        delay: 0.5,
        opacity: 0,
        y: "100%",
        stagger: 0.25,
        duration: 1,
        transformOrigin: "center center"
    })
}

function startAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5
        }
    })

    function updateFrames(index) {
        return {
            currentIndex: index,
            ease: "linear",
            onUpdate: () => {
                drawImage(Math.floor(frames.currentIndex))
            }
        }
    }

    tl
        .to(frames, updateFrames(50), "first")
        .to("#section1-down", { x: "100%", ease: "linear", opacity: 0 }, "first")
        .to("#section1-up", { y: "-100%", opacity: 0, rotateX: "100deg", ease: "linear" }, "first")

        .to(frames, updateFrames(100), "second")
        .to("#section2", { opacity: 1, ease: "linear" }, "second")

        .to(frames, updateFrames(130), "third")
        .to("#section2", { opacity: 1, ease: "linear" }, "third")

        .to(frames, updateFrames(170), "fourth")
        .to("#section2", { opacity: 0, ease: "linear" }, "fourth")

        .to(frames, updateFrames(220), "fifth")
        .to("#section3", { opacity: 1, ease: "linear" }, "fifth")
        .to("#text .down-text", { opacity: 1, ease: "linear", stagger: 0.025 }, "fifth")

        .to(frames, updateFrames(260), "sixth")
        .to("#section3", { opacity: 1, ease: "linear" }, "sixth")
        .to("#text .down-text", { opacity: 1, ease: "linear" }, "sixth")

        .to(frames, updateFrames(310), "seventh")
        .to("#section3", { opacity: 0, ease: "linear" }, "seventh")
        .to("#text .down-text", { opacity: 0, ease: "linear", stagger: 0.025 }, "seventh")
        .to("#section4", { opacity: 1, ease: "linear" }, "seventh")

        .to(frames, updateFrames(365), "eight")
        .to(canvas, { scale: 0, ease: "circ.in" }, "eight")
        .to("#section5", { opacity: 1, ease: "linear", zIndex: 10 }, "eight")

        .to(frames, updateFrames(400), "ninth")
        .to(canvas, { scale: 0, ease: "circ.out" }, "ninth")

        .to(frames, updateFrames(450), "tenth")
        .to(canvas, { scale: 1, ease: "circ.out" }, "tenth")
        .to("#section4", { opacity: 0, ease: "linear" }, "tenth")
        .to("#section5", { opacity: 0, ease: "linear", zIndex: -1 }, "tenth")

        .to(frames, updateFrames(460), "eleventh")

        .to(frames, updateFrames(525), "twelfth")
        .to("#section6", { opacity: 1, ease: "linear" }, "twelfth")

}

cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            scale: 2,
            duration: 0.5,
            ease: "power2.out"
        })
        card.style.zIndex = "10"
        cards.forEach((otherCard) => {
            if (otherCard !== card) {
                gsap.to(otherCard, {
                    filter: "blur(5px)",
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    })
    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        })
        card.style.zIndex = "1"
        cards.forEach((otherCard) => {
            gsap.to(otherCard, {
                filter: "blur(0px)",
                duration: 0.5,
                ease: "power2.out"
            });
        });
    })
})

projects.forEach(project => {
    project.addEventListener("mousemove", (dets) => {
        const { width, left, top, height } = project.getBoundingClientRect()
        const { clientX, clientY } = dets
        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)
        gsap.to(project, {
            x: x / 3,
            y: y / 3,
        })
    })
    project.addEventListener("mouseleave", () => {
        gsap.to(project, {
            x: 0,
            y: 0
        })
    })
})

landingAnimation()
preloadImage()