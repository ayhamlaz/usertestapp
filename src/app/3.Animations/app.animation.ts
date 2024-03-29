import { trigger, state, style, animate, transition } from '@angular/animations';

export function visibility() {
   return trigger('visibility', [
      transition(':enter', [
         style({ transform: 'scale(0.85)', opacity: 0, display: 'none' }),
         animate('200ms 400ms ease-out', style({ display: 'block', transform: 'scale(1.0)', opacity: 1 }))
      ]),
      transition(':leave', [
         animate('200ms', style({ transform: 'scale(0.85)', opacity: 0 }))
      ])
   ]);
}

export function flyInOut() {
   return trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
         style({ transform: 'translateY(-10%)', opacity: 0 }),
         animate(300)
      ]),
      transition('* => void', [
         animate(300, style({ transform: 'translateY(10%)', opacity: 0 }))
      ])
   ])
}

export function flyIn() {
   return trigger('flyIn', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
         style({ transform: 'translateY(-40%)', opacity: 0 }),
         animate(200)
      ]),
      transition('* => void', [
         animate(200, style({ transform: 'translateY(-40%)', opacity: 0 }))
      ])
   ])
}