import type { Variants } from 'framer-motion'

// Fade animations
export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 }
}

export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
}

export const fadeInLeft: Variants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
}

export const fadeInRight: Variants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
}

// Scale animations
export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
}

export const scaleInBounce: Variants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20
        }
    },
    exit: { opacity: 0, scale: 0.5 }
}

// Stagger container
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

export const staggerContainerFast: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05
        }
    }
}

// Card hover animations
export const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -5,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 17
        }
    }
}

// Float animation
export const float: Variants = {
    initial: { y: 0 },
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
}

// Pulse animation
export const pulse: Variants = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
}

// Rotate animation
export const rotate: Variants = {
    initial: { rotate: 0 },
    animate: {
        rotate: 360,
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
        }
    }
}

// Slide animations
export const slideInFromBottom: Variants = {
    initial: { y: '100%', opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20
        }
    },
    exit: { y: '100%', opacity: 0 }
}

// Page transition
export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut'
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: 'easeIn'
        }
    }
}

// Text reveal animation
export const textReveal: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: 'easeOut'
        }
    })
}

// Blur in animation
export const blurIn: Variants = {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5
        }
    }
}

// Transition presets
export const springTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30
}

export const smoothTransition = {
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1]
}

export const bounceTransition = {
    type: 'spring',
    stiffness: 500,
    damping: 25
}
