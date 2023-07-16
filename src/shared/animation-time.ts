// declaration of animations times (default datatype: number).
// all times are in ms (milliseconds).

// every other animation is dependent on splashAnimationDelay  and splashAnimation time/duration
export const splashAnimationDelay = 2100; // default value: 3200. changing the value of this variable is not recommended
export const splashAnimation = 400; // default value: 400
export const dashAnimationTime = 1000;
export const fadeTextAnimationTime = 500;
export const scaleOutAnimationTime = 500;
// after the execution of splash animation other elements animate.
// so the delay time for that has to be defined.
export const totalSplashAnimationDelay =  dashAnimationTime + fadeTextAnimationTime + scaleOutAnimationTime;

export const navlistAnimation = 300;

export const defaultAnimation = 300;
