// Fix for React v19 JSX compatibility issues
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
