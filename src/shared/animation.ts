import { trigger, transition, query, style, stagger, animate, state } from "@angular/animations";
import { navlistAnimation, defaultAnimation, totalSplashAnimationDelay } from "./animation-time";

export function listTrigger(position: string, animationTimeDelay: number, animationName?: string) {
    return trigger(animationName ? animationName : 'list', [
        transition(':enter', [
            listTriggerQuery(position, animationTimeDelay)
        ])
    ])
}
// animation query realted to trigger.
export function listTriggerQuery(position: string, animationTimeDelay: number) {
    return query('.item', [
        style({ opacity: 0, transform: `translateY(${position})` }),
        stagger(100, [
            animate(`${defaultAnimation}ms ${animationTimeDelay}ms cubic-bezier(0.35, 0, 0.25, 1)`,
                style({ opacity: 1, transform: 'none' }))
        ])
    ], { optional: true })
}

export function fadeTrigger(animationName?: string, delay?: number) {
    return trigger(animationName || 'fade', [
        state('void', style({ 'margin-top': '10px', opacity: '0' })),
        state('*', style({ 'margin-top': '0px', opacity: '1' })),
        transition(':enter', [
            animate(`0.3s ${delay || 0}ms ease-out`, style({ opacity: '1', 'margin-top': '0px' }))
        ])
    ])
}