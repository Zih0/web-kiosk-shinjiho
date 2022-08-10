import { keyframes } from 'styled-components'

export const animations = {
  skeletonLoading: keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(312px);
  }
`,
}
