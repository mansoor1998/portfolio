// definition of animations times (default datatype: number).
// all times are in ms (milliseconds).

// every other animation is dependent on splashAnimationDelay  and splashAnimation time/duration
export const splashAnimationDelay = 3200; // default value: 3200. changing the value of this variable is not recommended
export const splashAnimation = 400; // default value: 400
// after the execution of splash animation other elements animate.
// so the delay time for that has to be defined.
export const totalSplashAnimationDelay = splashAnimation + splashAnimationDelay;

export const navlistAnimation = 300;

export const defaultAnimation = 300;
