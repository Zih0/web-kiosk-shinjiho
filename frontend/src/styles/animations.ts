import { keyframes } from 'styled-components'

export const animations = {
  skeletonLoading: keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(200%);
  }
`,
 slideUp: keyframes`
 from {
 
   transform: translateY(20px);
 }
 to {
   transform: translateY(0);
 }`,
  fadeIn: keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`,
  fadeOut: keyframes`
  from {
    opacity:1;
  }
  to {
    opacity:0;
  }
`,
}
